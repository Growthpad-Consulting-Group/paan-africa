/**
 * Re-host blog images from ImageKit (and other URLs) into Sanity assets.
 *
 *   node scripts/migrate-images-to-sanity.mjs           # DRY RUN: downloads every image, reports, uploads nothing
 *   node scripts/migrate-images-to-sanity.mjs --write   # uploads + patches posts
 *
 * For each published post:
 *   - `mainImageUrl`            -> `mainImage` (Sanity image), mainImageUrl unset
 *   - body `imageUrl` blocks    -> body `image` blocks (Sanity image)
 * Images that cannot be downloaded are left as URLs and reported (nothing is lost).
 * Uploads are content-hashed by Sanity, so re-running never duplicates assets.
 * `rawHtml` is not modified. Unedited Studio drafts are patched too; edited drafts are left alone.
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'

const WRITE = process.argv.includes('--write')
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
  perspective: 'raw',
})
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif', 'image/svg+xml': 'svg' }

const cache = new Map() // url -> { ref } | { error }
const stats = { downloaded: 0, bytes: 0, failed: [], uploaded: 0 }

async function fetchImage(url) {
  if (url.startsWith('data:')) {
    const m = url.match(/^data:([^;,]+)(;base64)?,(.*)$/s)
    if (!m) throw new Error('bad data URI')
    return { buf: m[2] ? Buffer.from(m[3], 'base64') : Buffer.from(decodeURIComponent(m[3])), type: m[1] }
  }
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const type = (res.headers.get('content-type') || '').split(';')[0]
  if (!type.startsWith('image/')) throw new Error(`not an image (${type})`)
  return { buf: Buffer.from(await res.arrayBuffer()), type }
}

async function asset(url) {
  if (cache.has(url)) return cache.get(url)
  const job = (async () => {
    try {
      const { buf, type } = await fetchImage(url)
      stats.downloaded++; stats.bytes += buf.length
      const base = url.startsWith('data:') ? `inline-${buf.length}` : decodeURIComponent(new URL(url).pathname.split('/').pop() || 'image').replace(/\.[a-z0-9]+$/i, '')
      const filename = `${base}.${EXT[type] ?? 'jpg'}`
      if (!WRITE) return { ref: 'dry-run' }
      const doc = await sanity.assets.upload('image', buf, { filename, contentType: type })
      stats.uploaded++
      return { ref: doc._id }
    } catch (e) {
      stats.failed.push(`${url.slice(0, 110)} -> ${e.message}`)
      return { error: e.message }
    }
  })()
  cache.set(url, job)
  return job
}

const looksLikeFilename = (s) => !s || /\.(jpe?g|png|webp|gif|avif|svg)$/i.test(s) || /^[\w-]+$/.test(s) && s.length < 4
const imgRef = (ref) => ({ _type: 'image', asset: { _type: 'reference', _ref: ref } })

async function migratePost(p) {
  const patch = {}, unset = []
  let swapped = 0
  if (p.mainImageUrl) {
    const a = await asset(p.mainImageUrl)
    if (a.ref) { patch.mainImage = { ...imgRef(a.ref), alt: p.mainImage?.alt || p.title }; unset.push('mainImageUrl'); swapped++ }
  }
  if (p.body?.some((b) => b._type === 'imageUrl')) {
    const body = []
    for (const b of p.body) {
      if (b._type !== 'imageUrl') { body.push(b); continue }
      const a = await asset(b.url)
      if (!a.ref) { body.push(b); continue }
      body.push({ ...imgRef(a.ref), _key: b._key || key(), alt: looksLikeFilename(b.alt) ? p.title : b.alt, ...(b.caption ? { caption: b.caption } : {}) })
      swapped++
    }
    patch.body = body
  }
  return { patch, unset, swapped }
}

const posts = await sanity.fetch(`*[_type=="post" && !(_id in path("drafts.**"))]{_id,title,"slug":slug.current,mainImageUrl,mainImage,body}`)
const drafts = Object.fromEntries((await sanity.fetch(`*[_type=="post" && _id in path("drafts.**")]{_id,body,mainImageUrl}`)).map((d) => [d._id, d]))
console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | ${posts.length} posts`)

let totalSwapped = 0
const queue = [...posts]
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const p = queue.shift()
    const { patch, unset, swapped } = await migratePost(p)
    totalSwapped += swapped
    if (WRITE && swapped) {
      await sanity.patch(p._id).set(patch).unset(unset).commit()
      const d = drafts[`drafts.${p._id}`]
      if (d) {
        if (JSON.stringify(d.body ?? null) === JSON.stringify(p.body ?? null)) await sanity.patch(d._id).set(patch).unset(unset).commit()
        else console.log(`WARNING ${d._id}: draft differs from published; not touched`)
      }
    }
    console.log(`${swapped ? 'ok  ' : 'skip'} ${p.slug} (${swapped} images)`)
  }
}))
console.log(`\nimages handled: ${totalSwapped} | unique downloads: ${stats.downloaded} (${(stats.bytes / 1048576).toFixed(1)} MB) | uploaded: ${stats.uploaded} | failed: ${stats.failed.length}`)
for (const f of stats.failed) console.log('  FAILED', f)
if (!WRITE) console.log('Dry run only (nothing uploaded). Re-run with --write.')
