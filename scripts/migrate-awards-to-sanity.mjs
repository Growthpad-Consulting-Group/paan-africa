/**
 * Seed Sanity `awardGroup` documents from the award data that was hardcoded in
 * pages/paan-awards.js and pages/paan-awards/categories.js (extracted to scripts/data/awards-extracted.json).
 *
 *   node scripts/migrate-awards-to-sanity.mjs           # DRY RUN
 *   node scripts/migrate-awards-to-sanity.mjs --write   # create docs (existing docs kept)
 *   node scripts/migrate-awards-to-sanity.mjs --write --force   # overwrite (loses Studio edits!)
 *
 * The two pages kept separate copies that had drifted by one description; the categories-page copy
 * (the full list, with "(Top Overall Award)") is used. The main page's hardcoded "selected" id lists
 * become the `featured` flag on each award.
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const WRITE = process.argv.includes('--write'), FORCE = process.argv.includes('--force')
const EDITION = 2026
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const i = l.indexOf('='); if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
const sanity = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN })
const { agency, freelancer, featuredAgency, featuredFreelancer } = JSON.parse(readFileSync(new URL('./data/awards-extracted.json', import.meta.url), 'utf8'))

const build = (groups, audience, featured) => groups.map((g, i) => ({
  _id: `award-group-${EDITION}-${g.id}`, _type: 'awardGroup', audience, groupId: g.id, name: g.name, description: g.description, order: i + 1, edition: EDITION,
  awards: g.subcategories.map((s) => ({
    _key: s.id, _type: 'award', awardId: s.id, name: s.name ?? s.title, description: s.description,
    ...(s.icon ? { icon: s.icon } : {}), featured: featured.includes(s.id),
  })),
}))
const docs = [...build(agency, 'agency', featuredAgency), ...build(freelancer, 'freelancer', featuredFreelancer)]
console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | ${docs.length} groups | awards: ${docs.reduce((a, d) => a + d.awards.length, 0)} | featured: ${docs.reduce((a, d) => a + d.awards.filter((x) => x.featured).length, 0)}`)
console.table(docs.map((d) => ({ audience: d.audience, group: d.groupId, awards: d.awards.length, featured: d.awards.filter((x) => x.featured).length })))
if (!WRITE) process.exit(0)
for (const d of docs) { const r = FORCE ? await sanity.createOrReplace(d) : await sanity.createIfNotExists(d); console.log('  ', r._id) }
