/**
 * Seed Sanity `masterclass`, `masterclassSeries` documents from the hardcoded pages
 * (data extracted to scripts/data/masterclasses-extracted.json: { detail, list, series }).
 *
 *   node scripts/migrate-masterclasses-to-sanity.mjs           # DRY RUN
 *   node scripts/migrate-masterclasses-to-sanity.mjs --write   # upload images + create docs (existing docs kept)
 *   node scripts/migrate-masterclasses-to-sanity.mjs --write --force   # overwrite (loses Studio edits!)
 *
 * The DETAIL page data is canonical (it is what checkout charges). From the listing copy we only
 * take what the detail page lacks: the shorter card description (`listingDescription`) and `featured`.
 * Numeric ids are kept as `masterclassId` (payment references + promo codes depend on them).
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { randomUUID } from 'crypto'

const WRITE = process.argv.includes('--write'), FORCE = process.argv.includes('--force')
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const i = l.indexOf('='); if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
const sanity = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN })
const { detail, list, series } = JSON.parse(readFileSync(new URL('./data/masterclasses-extracted.json', import.meta.url), 'utf8'))
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80).replace(/-+$/, '')
const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
const toISO = (s) => { const m = s.match(/^([A-Za-z]+)\s+(\d{1,2})(?:st|nd|rd|th)?,\s*(\d{4})$/); if (!m) throw new Error(`cannot parse date "${s}"`); return `${m[3]}-${String(MONTHS.indexOf(m[1].toLowerCase()) + 1).padStart(2, '0')}-${m[2].padStart(2, '0')}` }

const cache = new Map(), problems = [], deadPhotos = []
function image(url, alt, optional = false) {
  if (!url) return undefined
  if (!cache.has(url)) cache.set(url, (async () => {
    try {
      const res = await fetch(url); if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const type = (res.headers.get('content-type') || '').split(';')[0]; if (!type.startsWith('image/')) throw new Error(`not an image (${type})`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (!WRITE) return 'dry-run'
      return (await sanity.assets.upload('image', buf, { filename: decodeURIComponent(new URL(url).pathname.split('/').pop()), contentType: type }))._id
    } catch (e) { (optional ? deadPhotos : problems).push(`${url} -> ${e.message}`); return null }
  })())
  return cache.get(url).then((ref) => (ref ? { _type: 'image', asset: { _type: 'reference', _ref: ref }, ...(alt ? { alt } : {}) } : undefined))
}

const SERIES = [
  { _id: 'masterclass-series-mastering-agency-growth', title: series.title, subtitle: series.subtitle, description: series.description, dates: series.dates, time: series.time, format: series.format,
    instructorName: series.instructor, instructorTitle: series.instructorTitle, instructorBio: series.instructorBio, whyAttend: series.whyAttend, whoShouldAttend: series.whoShouldAttend, imageUrl: series.image, featuredOnListing: true },
  { _id: 'masterclass-series-agency-growth-leadership', title: 'Agency Growth & Leadership Masterclass Series', featuredOnListing: false },
]
const seriesId = (title) => SERIES.find((s) => s.title === title)?._id

const docs = []
for (const s of SERIES) {
  const { imageUrl, ...rest } = s
  docs.push({ ...rest, _type: 'masterclassSeries', slug: { _type: 'slug', current: slugify(s.title) }, image: await image(imageUrl, s.title) })
}
const used = new Set()
for (const [id, m] of Object.entries(detail)) {
  const l = list.find((x) => String(x.id) === id)
  let slug = slugify(m.title); if (used.has(slug)) slug = `${slug}-${id}`; used.add(slug)
  const ref = m.series ? seriesId(m.series) : undefined
  if (m.series && !ref) problems.push(`#${id}: unknown series "${m.series}"`)
  docs.push({
    _id: `masterclass-${id}`, _type: 'masterclass', masterclassId: Number(id), title: m.title, slug: { _type: 'slug', current: slug },
    date: toISO(m.date), time: m.time, format: m.format, category: m.category, level: m.level, partnership: m.partnership,
    featured: !!l?.featured, hideFromListing: !l, // 3, 4, 8 only ever existed on their detail pages, never in the listing
    seriesDescription: series.subMasterclasses.find((x) => String(x.id) === id && x.description !== m.description)?.description, bookingsClosed: m.status === 'not-accepting-bookings',
    currency: m.currency, memberPrice: m.memberPrice, memberOriginalPrice: m.memberOriginalPrice, nonMemberPrice: m.nonMemberPrice, nonMemberOriginalPrice: m.nonMemberOriginalPrice,
    image: await image(m.image, m.title),
    instructor: { name: m.instructor.name, title: m.instructor.title, bio: m.instructor.bio, expertise: m.instructor.expertise, image: await image(m.instructor.image, m.instructor.name, true) },
    description: m.description, listingDescription: l && l.description !== m.description ? l.description : undefined, fullDescription: m.fullDescription,
    benefits: m.benefits, whoShouldAttend: m.whoShouldAttend, learningOutcomes: m.learningOutcomes, courseObjectives: m.courseObjectives, whyAttend: m.whyAttend, outcome: m.outcome,
    ...(ref ? { series: { _type: 'reference', _ref: ref } } : {}), seriesOrder: m.seriesOrder, moduleNumber: m.moduleNumber, takeawayToolkit: m.takeawayToolkit,
  })
}
const mcs = docs.filter((d) => d._type === 'masterclass')
console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | ${mcs.length} masterclasses + ${docs.length - mcs.length} series | image problems: ${problems.length}`)
problems.forEach((p) => console.log('  PROBLEM', p))
if (deadPhotos.length) console.log(`  ${deadPhotos.length} instructor photos are already 404 on ImageKit and were skipped (upload them in Studio)`)
console.table(mcs.map((d) => ({ id: d.masterclassId, slug: d.slug.current.slice(0, 40), date: d.date, prices: `${d.memberPrice}/${d.nonMemberPrice}`, short: d.listingDescription ? 'y' : '', series: d.series ? 'y' : '', instr: d.instructor.name, instrImg: d.instructor.image ? 'y' : '-' })))
if (!WRITE) process.exit(0)
if (problems.length) { console.log('Refusing to write while there are problems.'); process.exit(1) }
for (const d of JSON.parse(JSON.stringify(docs))) { const r = FORCE ? await sanity.createOrReplace(d) : await sanity.createIfNotExists(d); console.log('  ', r._id) }
