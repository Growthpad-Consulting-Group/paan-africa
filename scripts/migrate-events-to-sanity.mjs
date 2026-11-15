/**
 * Seed Sanity `event` documents from src/data/eventsData.js.
 *
 *   node scripts/migrate-events-to-sanity.mjs            # DRY RUN
 *   node scripts/migrate-events-to-sanity.mjs --write    # upload images + create docs (existing docs are kept)
 *   node scripts/migrate-events-to-sanity.mjs --write --force   # overwrite existing docs (loses Studio edits!)
 *
 * Mapping notes:
 *  - upcoming/past lists -> derived from `date` on the site (no status field stored)
 *  - for past events the old `registrationUrl` was the recording link -> stored as `recordingUrl`
 *  - `speakers` number -> `speakerCount`; `speakers` array -> `speakers` (names)
 *  - "#" placeholder links are dropped; dates like 2025-10-1 are zero-padded
 *  - event 12 is dated 2025-02-04 in the source (probably 2026-02-04); copied as-is, confirm and fix in Studio
 */
import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'fs'
import { randomUUID } from 'crypto'
import { eventsData } from './data/eventsData.source.js'

const WRITE = process.argv.includes('--write'), FORCE = process.argv.includes('--force')
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const i = l.indexOf('=')
  if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
const sanity = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN })
const PUBLIC = new URL('../public', import.meta.url).pathname
const pad = (d) => d.replace(/^(\d{4})-(\d{1,2})-(\d{1,2})$/, (_, y, m, day) => `${y}-${m.padStart(2, '0')}-${day.padStart(2, '0')}`) // '2025-10-1' -> '2025-10-01'
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80).replace(/-+$/, '')
const EXT = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/avif': 'avif' }

async function loadImage(src) {
  if (/^https?:\/\//.test(src)) {
    const res = await fetch(src)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const type = (res.headers.get('content-type') || '').split(';')[0]
    if (!type.startsWith('image/')) throw new Error(`not an image (${type})`)
    return { buf: Buffer.from(await res.arrayBuffer()), type, name: decodeURIComponent(new URL(src).pathname.split('/').pop()) }
  }
  const abs = PUBLIC + src
  if (!existsSync(abs)) throw new Error('file not found')
  const ext = abs.split('.').pop().toLowerCase()
  return { buf: readFileSync(abs), type: { webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml' }[ext] ?? 'image/png', name: abs.split('/').pop() }
}

const all = [...eventsData.upcoming.map((e) => ({ ...e, _status: 'upcoming' })), ...eventsData.past.map((e) => ({ ...e, _status: 'past' }))]
const used = new Set(), docs = [], problems = []
for (const e of all) {
  let slug = slugify(e.title); if (used.has(slug)) slug = `${slug}-${e.id}`; used.add(slug)
  let imageField
  try {
    const { buf, type, name } = await loadImage(e.image)
    imageField = WRITE
      ? { _type: 'image', asset: { _type: 'reference', _ref: (await sanity.assets.upload('image', buf, { filename: /\.\w+$/.test(name) ? name : `${name}.${EXT[type] ?? 'jpg'}`, contentType: type }))._id }, alt: e.title }
      : { _type: 'image' }
  } catch (err) { problems.push(`#${e.id} image ${e.image} -> ${err.message}`) }
  const link = e.registrationUrl && e.registrationUrl !== '#' ? e.registrationUrl : undefined
  const isPast = e._status === 'past'
  docs.push({
    _id: `event-${e.id}`, _type: 'event', legacyId: e.id, title: e.title, slug: { _type: 'slug', current: slug },
    date: pad(e.date), time: e.time, category: e.category, location: e.location, venue: e.venue, price: e.price,
    description: e.description, image: imageField, featured: !!e.featured,
    ...(isPast ? { recordingUrl: link && /^https?:\/\//.test(link) ? link : undefined } : { registrationUrl: link }),
    zoomPasscode: e.zoomPasscode, attendees: e.attendees,
    ...(Array.isArray(e.speakers) ? { speakers: e.speakers } : { speakerCount: e.speakers }),
  })
}
console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | ${docs.length} events | image problems: ${problems.length}`)
problems.forEach((p) => console.log('  PROBLEM', p))
console.table(docs.map((d) => ({ id: d.legacyId, slug: d.slug.current.slice(0, 44), date: d.date, link: d.registrationUrl ? 'register' : d.recordingUrl ? 'recording' : '-', pass: d.zoomPasscode ? 'y' : '', spk: d.speakers?.length ?? d.speakerCount ?? '' })))
if (!WRITE) process.exit(0)
if (problems.length) { console.log('Refusing to write while images fail.'); process.exit(1) }
for (const d of JSON.parse(JSON.stringify(docs))) {
  const r = FORCE ? await sanity.createOrReplace(d) : await sanity.createIfNotExists(d)
  console.log('  ', r._id, FORCE ? 'written' : 'ok')
}
