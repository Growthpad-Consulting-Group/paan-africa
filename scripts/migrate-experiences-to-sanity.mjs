/**
 * Seed Sanity `summitExperience` documents from the 11 experiences that were hardcoded in
 * pages/summit/travel-guide.js (extracted to scripts/data/experiences-extracted.json).
 *
 *   node scripts/migrate-experiences-to-sanity.mjs           # DRY RUN
 *   node scripts/migrate-experiences-to-sanity.mjs --write   # upload images + create docs (existing docs kept)
 *   node scripts/migrate-experiences-to-sanity.mjs --write --force   # overwrite (loses Studio edits!)
 *
 * The string `id` is kept exactly: it is the URL and the payment/booking key.
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const WRITE = process.argv.includes('--write'), FORCE = process.argv.includes('--force')
const EDITION = 2026
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const i = l.indexOf('='); if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
const sanity = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN })
const experiences = JSON.parse(readFileSync(new URL('./data/experiences-extracted.json', import.meta.url), 'utf8'))
const problems = []
async function image(url, alt) {
  try {
    const res = await fetch(url); if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const type = (res.headers.get('content-type') || '').split(';')[0]; if (!type.startsWith('image/')) throw new Error(`not an image (${type})`)
    if (!WRITE) return { _type: 'image' }
    const buf = Buffer.from(await res.arrayBuffer())
    const up = await sanity.assets.upload('image', buf, { filename: `${alt.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`, contentType: type })
    return { _type: 'image', asset: { _type: 'reference', _ref: up._id }, alt }
  } catch (e) { problems.push(`${url} -> ${e.message}`); return undefined }
}
const docs = []
for (const [i, e] of experiences.entries()) docs.push({
  _id: `summit-experience-${EDITION}-${e.id}`, _type: 'summitExperience', experienceId: e.id, title: e.title, subtitle: e.subtitle, category: e.category,
  description: e.description, highlights: e.highlights, duration: e.duration, availability: e.availability,
  price: e.price, priceUnit: e.priceUnit, priceNote: e.priceNote, image: await image(e.image, e.title), order: i + 1, edition: EDITION,
})
console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | ${docs.length} experiences | image problems: ${problems.length}`)
problems.forEach((p) => console.log('  PROBLEM', p))
console.table(docs.map((d) => ({ id: d.experienceId, price: `${d.priceUnit} ${d.price}`, highlights: d.highlights.length })))
if (!WRITE) process.exit(0)
if (problems.length) { console.log('Refusing to write while images fail.'); process.exit(1) }
for (const d of JSON.parse(JSON.stringify(docs))) { const r = FORCE ? await sanity.createOrReplace(d) : await sanity.createIfNotExists(d); console.log('  ', r._id) }
