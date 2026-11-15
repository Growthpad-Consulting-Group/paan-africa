/**
 * Seed Sanity `jobPosting` documents from the positions hardcoded in src/pages/careers.js (git history) —
 * data extracted to scripts/data/careers-extracted.json.
 *
 *   node scripts/migrate-careers-to-sanity.mjs            # DRY RUN: converts + verifies, writes nothing
 *   node scripts/migrate-careers-to-sanity.mjs --write    # create documents (existing ones are kept)
 *   node scripts/migrate-careers-to-sanity.mjs --write --force   # overwrite (loses Studio edits!)
 *
 * The long role description (HTML) is converted to Portable Text. HTML <h4>/<h5> become Studio H3/H4.
 * A position is only written if the converted text, headings and list items match the original.
 */
import { createClient } from '@sanity/client'
import { htmlToBlocks } from '@sanity/block-tools'
import { Schema } from '@sanity/schema'
import { JSDOM } from 'jsdom'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'

const WRITE = process.argv.includes('--write'), FORCE = process.argv.includes('--force')
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const i = l.indexOf('='); if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
const sanity = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN })
const positions = JSON.parse(readFileSync(new URL('./data/careers-extracted.json', import.meta.url), 'utf8'))
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

const compiled = Schema.compile({ name: 'paan', types: [{ type: 'object', name: 'doc', fields: [{ name: 'body', type: 'array', of: [{
  type: 'block',
  styles: [{ title: 'Normal', value: 'normal' }, { title: 'H1', value: 'h1' }, { title: 'H2', value: 'h2' }, { title: 'H3', value: 'h3' }, { title: 'H4', value: 'h4' }, { title: 'Quote', value: 'blockquote' }],
  lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
  marks: { decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }, { title: 'Underline', value: 'underline' }, { title: 'Code', value: 'code' }],
    annotations: [{ name: 'link', type: 'object', title: 'URL', fields: [{ name: 'href', type: 'url', title: 'URL' }, { name: 'blank', type: 'boolean', title: 'Open in new tab' }] }] },
}] }] }] })
const bodyType = compiled.get('doc').fields[0].type
const parseHtml = (h) => new JSDOM(h).window.document
/** h4 -> h3 and h5 -> h4 (order matters), so section titles / sub-titles map onto Studio's H3 / H4 styles. */
const shiftHeadings = (h) => h.replace(/<(\/?)h4\b/g, '<$1h3').replace(/<(\/?)h5\b/g, '<$1h4')
/** Blank lines between tags become empty paragraphs, which also split bullet lists apart: drop them. */
const dropEmpty = (blocks) => blocks.filter((b) => b.listItem || b.children?.some((c) => c.text?.trim()))
const convert = (html) => dropEmpty(htmlToBlocks(`<div>${shiftHeadings(html)}</div>`, bodyType, { parseHtml }))

const decode = (s) => s.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
const text = (h) => decode(h.replace(/<[^>]*>/g, '')).replace(/\s+/g, '')
/** Render converted blocks as simple HTML-ish tokens just for comparison */
function describe(blocks) {
  const out = { text: '', headings: 0, li: 0, p: 0, lists: 0, empty: 0 }
  let prevList = false
  for (const b of blocks) {
    out.text += b.children.map((c) => c.text).join('')
    if (!b.children.some((c) => c.text?.trim())) out.empty++
    if (b.listItem && !prevList) out.lists++
    prevList = !!b.listItem
    if (/^h\d$/.test(b.style)) out.headings++
    else if (b.listItem) out.li++
    else out.p++
  }
  out.text = out.text.replace(/\s+/g, '')
  return out
}
const original = (html) => ({ text: text(html), headings: (html.match(/<h[45][\s>]/g) || []).length, li: (html.match(/<li[\s>]/g) || []).length, lists: (html.match(/<ul[\s>]/g) || []).length })

const docs = [], failures = []
positions.forEach((p, i) => {
  const blocks = convert(p.detailedDescription).map((b) => ({ ...b, _key: b._key || key() }))
  const a = original(p.detailedDescription), b = describe(blocks)
  const problems = []
  if (a.text !== b.text) problems.push(`text differs (${a.text.length} vs ${b.text.length})`)
  if (a.headings !== b.headings) problems.push(`headings ${a.headings} -> ${b.headings}`)
  if (a.li !== b.li) problems.push(`list items ${a.li} -> ${b.li}`)
  if (a.lists !== b.lists) problems.push(`bullet lists ${a.lists} -> ${b.lists} (items split apart?)`)
  if (b.empty) problems.push(`${b.empty} empty blocks`)
  if (blocks.some((x) => x._type !== 'block' || x.children.some((c) => c._type !== 'span'))) problems.push('non-text block found')
  if (problems.length) failures.push(`${p.title}: ${problems.join('; ')}`)
  const slug = slugify(p.title)
  docs.push({
    _id: `job-${slug}`, _type: 'jobPosting', title: p.title, slug: { _type: 'slug', current: slug }, isOpen: true, order: i + 1,
    department: p.department, location: p.location, employmentType: p.employmentType, duration: p.duration,
    summary: p.description, requirements: p.requirements, details: blocks,
    applyByEmail: true, applyEmail: 'careers@paan.africa', applyEmailSubject: `${p.title} – PAAN`,
  })
  console.log(`${p.title}: ${blocks.length} blocks | text ${a.text === b.text ? 'identical' : 'DIFFERS'} | headings ${a.headings}/${b.headings} | list items ${a.li}/${b.li} | lists ${a.lists}/${b.lists}`)
})
console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | ${docs.length} positions | verification failures: ${failures.length}`)
failures.forEach((f) => console.log('  FAIL', f))
if (!WRITE) process.exit(0)
if (failures.length) { console.log('Refusing to write failing conversions.'); process.exit(1) }
for (const d of docs) { const r = FORCE ? await sanity.createOrReplace(d) : await sanity.createIfNotExists(d); console.log('  ', r._id) }
