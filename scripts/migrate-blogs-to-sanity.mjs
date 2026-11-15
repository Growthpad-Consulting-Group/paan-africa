/**
 * Supabase -> Sanity blog migration (PAAN).
 *
 *   node scripts/migrate-blogs-to-sanity.mjs            # DRY RUN (default): reads Supabase, prints a report, writes nothing
 *   node scripts/migrate-blogs-to-sanity.mjs --write    # writes to Sanity (createOrReplace, idempotent)
 *
 * Migrates hr_users -> author, blog_categories -> category, blog_tags -> post.tags (strings),
 * blogs -> post. HTML body is kept losslessly in `rawHtml`; run convert-html-to-pt.mjs afterwards.
 * Slugs and publish dates are preserved. `legacyId` keeps the Supabase blog id for comments.
 */
import { createClient as createSupabase } from '@supabase/supabase-js'
import { createClient as createSanity } from '@sanity/client'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const WRITE = process.argv.includes('--write')
const __dirname = dirname(fileURLToPath(import.meta.url))

for (const line of readFileSync(join(__dirname, '..', '.env.local'), 'utf8').split('\n')) {
  const t = line.trim()
  if (!t || t.startsWith('#')) continue
  const i = t.indexOf('=')
  if (i === -1) continue
  const k = t.slice(0, i).trim()
  const v = t.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
  if (!process.env[k]) process.env[k] = v
}

const supabase = createSupabase(process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const sanity = createSanity({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
const id = (type, src) => `migrated-${type}-${String(src).replace(/[^a-zA-Z0-9_-]/g, '-')}`
const must = (r, what) => { if (r.error) throw new Error(`${what}: ${r.error.message}`); return r.data ?? [] }

async function main() {
  console.log(`Mode: ${WRITE ? 'WRITE' : 'DRY RUN'} | Sanity ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}`)

  const blogs = must(await supabase.from('blogs').select('*, category:blog_categories(id, name, slug)').order('id'), 'blogs')
  const users = must(await supabase.from('hr_users').select('id, name'), 'hr_users')
  const postTags = must(await supabase.from('blog_post_tags').select('blog_id, tag:blog_tags(name)'), 'blog_post_tags')

  const tagsByBlog = {}
  for (const pt of postTags) if (pt.tag?.name) (tagsByBlog[pt.blog_id] ??= []).push(pt.tag.name)

  const usedAuthorIds = new Set(blogs.map((b) => b.author).filter(Boolean))
  const authors = users.filter((u) => usedAuthorIds.has(u.id))
  const categories = new Map()
  for (const b of blogs) if (b.category?.name) categories.set(b.category.id, b.category)

  const docs = []
  for (const a of authors) {
    docs.push({ _id: id('author', a.id), _type: 'author', name: a.name, slug: { _type: 'slug', current: slugify(a.name) } })
  }
  for (const c of categories.values()) {
    docs.push({ _id: id('category', c.id), _type: 'category', name: c.name, slug: { _type: 'slug', current: c.slug || slugify(c.name) } })
  }
  for (const b of blogs) {
    docs.push({
      _id: id('post', b.id),
      _type: 'post',
      legacyId: b.id,
      title: b.article_name || 'Untitled',
      slug: { _type: 'slug', current: b.slug || slugify(b.article_name || `post-${b.id}`) },
      rawHtml: b.article_body || '',
      ...(b.article_image ? { mainImageUrl: b.article_image } : {}),
      ...(b.meta_description ? { excerpt: b.meta_description.slice(0, 300), metaDescription: b.meta_description } : {}),
      isPublished: !!b.is_published,
      isFeatured: !!b.is_featured,
      publishedAt: new Date(b.publish_date || b.created_at).toISOString(),
      metaTitle: b.meta_title || undefined,
      focusKeyword: b.focus_keyword || undefined,
      metaKeywords: b.meta_keywords || undefined,
      twitterCard: 'summary_large_image',
      noIndex: false,
      ...(b.author ? { author: { _type: 'reference', _ref: id('author', b.author) } } : {}),
      ...(b.category?.id ? { categories: [{ _key: `cat-${b.id}`, _type: 'reference', _ref: id('category', b.category.id) }] } : {}),
      tags: tagsByBlog[b.id] ?? [],
    })
  }

  const slugs = docs.filter((d) => d._type === 'post').map((d) => d.slug.current)
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i)
  console.log(`Authors: ${authors.length} | Categories: ${categories.size} | Posts: ${blogs.length} (published: ${blogs.filter((b) => b.is_published).length}, featured: ${blogs.filter((b) => b.is_featured).length})`)
  console.log(`Posts without author: ${blogs.filter((b) => !b.author || !usedAuthorIds.has(b.author)).length} | without image: ${blogs.filter((b) => !b.article_image).length} | duplicate slugs: ${dupes.length ? dupes.join(', ') : 'none'}`)
  console.log(`Blog columns seen: ${Object.keys(blogs[0] ?? {}).join(', ')}`)

  if (!WRITE) return console.log('\nDry run only. Re-run with --write to import.')
  if (!process.env.SANITY_WRITE_TOKEN) throw new Error('SANITY_WRITE_TOKEN missing')
  // order matters for references: authors, categories, then posts; one post per request (large bodies)
  for (let i = 0; i < docs.length; i++) {
    await sanity.createOrReplace(docs[i])
    if (docs[i]._type === 'post') console.log(`  [${i + 1}/${docs.length}] ${docs[i].title}`)
  }
  console.log('Done. Next: node scripts/convert-html-to-pt.mjs')
}

main().catch((e) => { console.error('Failed:', e.message); process.exit(1) })
