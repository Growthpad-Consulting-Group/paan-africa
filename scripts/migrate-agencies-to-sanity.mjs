/**
 * Seed Sanity `agency` documents from the 7 hardcoded certified-agency pages
 * (content extracted to scripts/data/agencies-extracted.json) + 3 logo-only agencies.
 *
 *   node scripts/migrate-agencies-to-sanity.mjs           # DRY RUN: validates files, prints what would be created
 *   node scripts/migrate-agencies-to-sanity.mjs --write   # uploads assets + creates documents (skips ones that already exist)
 *   node scripts/migrate-agencies-to-sanity.mjs --write --force   # overwrite existing documents (loses Studio edits!)
 *
 * Deliberate fixes vs the old pages: placeholder "#" social links are dropped; Nitro's LinkedIn
 * (which pointed at Instagram) and its commented-out Facebook link are dropped; Xperia's clients heading ("Aquila…") falls back to the default.
 */
import { createClient } from '@sanity/client'
import { createReadStream, existsSync, readFileSync, statSync } from 'fs'
import { basename, extname } from 'path'
import { randomUUID } from 'crypto'

const WRITE = process.argv.includes('--write'), FORCE = process.argv.includes('--force')
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const i = l.indexOf('=')
  if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
const sanity = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN })
const data = JSON.parse(readFileSync(new URL('./data/agencies-extracted.json', import.meta.url), 'utf8'))
const PUBLIC = new URL('../public', import.meta.url).pathname
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)

const TIER = { aquila: 'associate', liftup: 'full', media_seal: 'full', nitro121: 'associate', 'omni-options': 'full', penquin: 'gold', xperia_agency: 'associate' }
// homepage-strip logo + order (matches the old AgencyLogosMarquee)
const STRIP = { aquila: ['aquila.svg', 1], liftup: ['lyftup.png', 2], media_seal: ['media-seal.png', 3], nitro121: ['nitro-21.png', 4], penquin: ['penquin.png', 5], xperia_agency: ['Xperia-agency.png', 6], 'omni-options': ['omni-options.avif', 7] }
const LOGO_ONLY = [
  { slug: 'ingenium', name: 'Ingenium Concept Ltd', file: 'ingenium.png', order: 8 },
  { slug: 'talking-drum-comms', name: 'Talking Drum Comms', file: 'TDC_Logo.webp', order: 9 },
  { slug: 'growthpad-consulting-group', name: 'Growthpad Consulting Group', file: 'gcg.png', order: 10 },
]

const loc = (v) => (v && v.en ? { _type: 'localizedString', en: v.en, ...(v.fr ? { fr: v.fr } : {}) } : undefined)
const locText = (v) => (v && v.en ? { _type: 'localizedText', en: v.en, ...(v.fr ? { fr: v.fr } : {}) } : undefined)
const url = (u) => (u && u !== '#' && /^https?:\/\//.test(u) ? u : undefined)

const stats = { files: 0, bytes: 0, uploaded: 0, missing: [] }
const cache = new Map()
async function upload(kind, publicPath) {
  const abs = PUBLIC + publicPath
  if (!existsSync(abs)) { stats.missing.push(publicPath); return null }
  if (!cache.has(publicPath)) cache.set(publicPath, (async () => {
    stats.files++; stats.bytes += statSync(abs).size
    if (!WRITE) return 'dry-run'
    const doc = await sanity.assets.upload(kind, createReadStream(abs), { filename: basename(abs) })
    stats.uploaded++
    return doc._id
  })())
  return cache.get(publicPath)
}
const imageField = async (publicPath, alt) => {
  const ref = await upload('image', publicPath)
  return ref ? { _type: 'image', asset: { _type: 'reference', _ref: ref }, ...(alt ? { alt } : {}) } : undefined
}

const docs = []
for (const [slug, a] of Object.entries(data)) {
  const name = a.name.en
  const doc = {
    _id: `agency-${slug}`, _type: 'agency', name, slug: { _type: 'slug', current: slug },
    hasProfilePage: true, membershipLevel: TIER[slug], memberSince: Number(a.memberSince) || 2025,
    order: STRIP[slug][1], websiteUrl: url(a.website),
    logo: await imageField(a.logo, `${name} logo`),
    marqueeLogo: await imageField(`/assets/images/agencies/${STRIP[slug][0]}`, `${name} logo`),
    countries: a.countries.map((c) => ({ _type: 'country', _key: key(), name: loc(c.name), code: c.code })),
    aboutTitle: loc(a.aboutTitle), aboutDescription: locText(a.aboutDescription),
    specializations: a.specializations.map((s) => ({ ...loc(s), _key: key() })),
    clientsTitle: slug === 'xperia_agency' ? undefined : loc(a.clients.title),
    clientLogos: [],
    testimonialQuote: locText(a.testimonial.quote), testimonialName: a.testimonial.name?.en, testimonialRole: a.testimonial.title?.en,
    contactDescription: loc(a.modal?.description),
    seoTitle: loc(a.seo.title), seoDescription: locText(a.seo.description), seoKeywords: loc(a.seo.keywords),
  }
  const social = Object.fromEntries(a.socials.map(([k, v]) => [k, v]))
  doc.linkedinUrl = slug === 'nitro121' ? undefined : url(social.LinkedIn)
  doc.instagramUrl = url(social.Instagram); doc.facebookUrl = slug === 'nitro121' ? undefined : url(social.Facebook); doc.xUrl = url(social.X) // nitro's Facebook link was commented out on the old page
  if (slug === 'penquin') doc.testimonialName = 'Penquin Team' // markup the extractor could not parse
  for (let n = 1; n <= a.clients.count; n++) {
    const img = await imageField(`/assets/images/certified-members/${a.clients.folder}/${n}.${a.clients.ext}`, `${name} client ${n}`)
    if (img) doc.clientLogos.push({ ...img, _key: key() })
  }
  // video: local file -> Sanity file asset; otherwise keep the external URL
  if (a.video?.startsWith('/')) {
    const ref = await upload('file', a.video)
    if (ref) doc.videoFile = { _type: 'file', asset: { _type: 'reference', _ref: ref } }
  } else doc.videoUrl = a.video
  docs.push(doc)
}
for (const l of LOGO_ONLY) {
  docs.push({
    _id: `agency-${l.slug}`, _type: 'agency', name: l.name, slug: { _type: 'slug', current: l.slug }, hasProfilePage: false, order: l.order,
    logo: await imageField(`/assets/images/agencies/${l.file}`, `${l.name} logo`),
  })
}
const clean = (o) => JSON.parse(JSON.stringify(o)) // drop undefined

console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | ${docs.length} agencies | assets: ${stats.files} files (${(stats.bytes / 1048576).toFixed(1)} MB) | missing files: ${stats.missing.length}`)
stats.missing.forEach((m) => console.log('  MISSING', m))
console.table(docs.map((d) => ({ slug: d.slug.current, level: d.membershipLevel ?? '-', page: d.hasProfilePage, countries: d.countries?.length ?? 0, spec: d.specializations?.length ?? 0, clients: d.clientLogos?.length ?? 0, video: d.videoFile ? 'file' : d.videoUrl ? 'url' : '-', social: ['linkedinUrl', 'instagramUrl', 'facebookUrl', 'xUrl'].filter((k) => d[k]).length })))
if (!WRITE) process.exit(0)
for (const d of clean(docs)) {
  const res = FORCE ? await sanity.createOrReplace(d) : await sanity.createIfNotExists(d)
  console.log(`  ${res._id} ${FORCE ? 'written' : res._createdAt === res._updatedAt || Date.now() - Date.parse(res._createdAt) < 60000 ? 'created' : 'already existed (kept)'}`)
}
