/**
 * Convert legacy `rawHtml` -> Portable Text `body`, with a fidelity check.
 *
 *   node scripts/convert-html-to-pt.mjs                # DRY RUN: convert + verify every post, write nothing
 *   node scripts/convert-html-to-pt.mjs --write        # patch `body` ONLY on posts that pass verification
 *   node scripts/convert-html-to-pt.mjs --slug=my-post # limit to one post
 *
 * `rawHtml` is never modified or removed, so a post can be reverted by unsetting `body`.
 * A post passes when the rendered result has identical text, link targets and counts of
 * headings / list items / images / tables / bold text as what the site renders today.
 */
import { createClient } from '@sanity/client'
import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import { JSDOM } from 'jsdom'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'
import { renderPortableText } from '../src/lib/portableText.ts'
import { sanitizeBlogHtml } from '../src/utils/sanitizeBlogHtml.js'

const WRITE = process.argv.includes('--write')
const ONLY = process.argv.find((a) => a.startsWith('--slug='))?.split('=')[1]

for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const i = l.indexOf('=')
  if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

// ── Compiled schema (mirrors src/sanity/schemaTypes/blockContent.ts) ─────────
const textBlock = (extra = {}) => ({
  type: 'block',
  styles: [
    { title: 'Normal', value: 'normal' }, { title: 'H1', value: 'h1' }, { title: 'H2', value: 'h2' },
    { title: 'H3', value: 'h3' }, { title: 'H4', value: 'h4' }, { title: 'Quote', value: 'blockquote' },
  ],
  lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
  marks: {
    decorators: [
      { title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' },
      { title: 'Underline', value: 'underline' }, { title: 'Code', value: 'code' },
    ],
    annotations: [{ name: 'link', type: 'object', title: 'URL', fields: [{ name: 'href', type: 'url', title: 'URL' }, { name: 'blank', type: 'boolean', title: 'Open in new tab' }] }],
  },
  ...extra,
})
const compiled = Schema.compile({
  name: 'paan',
  types: [
    { type: 'object', name: 'doc', fields: [
      { name: 'body', type: 'array', of: [
        textBlock(),
        { type: 'object', name: 'imageUrl', fields: [{ name: 'url', type: 'url' }, { name: 'alt', type: 'string' }, { name: 'caption', type: 'string' }] },
        { type: 'object', name: 'tableBlock', fields: [{ name: 'rows', type: 'array', of: [{ type: 'object', name: 'tableRow', fields: [{ name: 'cells', type: 'array', of: [{ type: 'object', name: 'tableCell', fields: [{ name: 'content', type: 'array', of: [textBlock()] }] }] }] }] }] },
      ] },
      { name: 'cell', type: 'array', of: [textBlock()] },
    ] },
  ],
})
const doc = compiled.get('doc')
const bodyType = doc.fields.find((f) => f.name === 'body').type
const cellType = doc.fields.find((f) => f.name === 'cell').type
const parseHtml = (html) => new JSDOM(html).window.document
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)

const rules = [
  {
    deserialize(el) {
      if (el.tagName?.toLowerCase() !== 'img') return undefined
      return { _type: 'imageUrl', _key: key(), url: el.getAttribute('src') ?? '', alt: el.getAttribute('alt') ?? '' }
    },
  },
  {
    deserialize(el) {
      if (el.tagName?.toLowerCase() !== 'table') return undefined
      const rows = [...el.querySelectorAll('tr')].map((tr) => ({
        _type: 'tableRow', _key: key(),
        cells: [...tr.children].filter((c) => /^t[dh]$/i.test(c.tagName)).map((td) => ({
          _type: 'tableCell', _key: key(),
          content: htmlToBlocks(`<div>${td.innerHTML}</div>`, cellType, { parseHtml }),
        })),
      }))
      return { _type: 'tableBlock', _key: key(), rows }
    },
  },
]
const convert = (html) => htmlToBlocks(`<div>${html}</div>`, bodyType, { parseHtml, rules })

// ── Verification ─────────────────────────────────────────────────────────────
const decode = (s) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
const text = (h) => decode(h.replace(/<[^>]*>/g, '')).replace(/\s+/g, '')
const count = (h, re) => (h.match(re) || []).length
// only anchors with visible text count; blank-space anchors are copy-paste junk and are dropped on purpose
const hrefs = (h) => [...h.matchAll(/<a\b[^>]*?href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].filter((m) => text(m[2]).length > 0 || /<img/i.test(m[2])).map((m) => m[1])
// text covered by a mark (tag-count independent: adjacent bold runs may legitimately merge)
const marked = (h, tag) => text([...h.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, 'g'))].map((m) => m[1]).join(''))
const metrics = (h) => ({
  h1: count(h, /<h1[\s>]/g), h2: count(h, /<h2[\s>]/g), h3: count(h, /<h3[\s>]/g), h4: count(h, /<h4[\s>]/g),
  li: count(h, /<li[\s>]/g), img: count(h, /<img[\s>]/g), table: count(h, /<table[\s>]/g),
  tr: count(h, /<tr[\s>]/g), td: count(h, /<td[\s>]/g), strong: marked(h, 'strong'), em: marked(h, 'em'), u: marked(h, 'u'),
})
function verify(origHtml, newHtml) {
  const problems = []
  if (text(origHtml) !== text(newHtml)) problems.push(`text differs (orig ${text(origHtml).length} chars vs new ${text(newHtml).length})`)
  const a = metrics(origHtml), b = metrics(newHtml)
  for (const k of Object.keys(a)) if (a[k] !== b[k]) problems.push(`${k}: ${a[k]} -> ${b[k]}`)
  if (JSON.stringify(hrefs(origHtml)) !== JSON.stringify(hrefs(newHtml))) problems.push('link hrefs differ')
  return problems
}

// ── Main ─────────────────────────────────────────────────────────────────────
const posts = await sanity.fetch(
  `*[_type=="post" && defined(rawHtml) && rawHtml != "" ${ONLY ? '&& slug.current == $s' : ''}]{_id,title,"slug":slug.current,rawHtml,body}`,
  ONLY ? { s: ONLY } : {}
)
console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | ${posts.length} post(s)`)
let pass = 0, fail = 0, skipped = 0
for (const p of posts) {
  if (p.body?.length) { skipped++; continue }
  try {
    const blocks = convert(p.rawHtml)
    const problems = verify(sanitizeBlogHtml(p.rawHtml), sanitizeBlogHtml(renderPortableText(blocks)))
    if (problems.length) { fail++; console.log(`FAIL ${p.slug}\n     ${problems.join('\n     ')}`); continue }
    pass++
    if (WRITE) { await sanity.patch(p._id).set({ body: blocks }).commit(); console.log(`WROTE ${p.slug} (${blocks.length} blocks)`) }
  } catch (e) { fail++; console.log(`ERROR ${p.slug}: ${e.message}`) }
}
console.log(`\npass: ${pass}  fail: ${fail}  already-converted: ${skipped}${WRITE ? '' : '  (nothing written)'}`)
