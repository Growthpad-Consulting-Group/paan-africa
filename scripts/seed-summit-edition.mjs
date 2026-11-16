/**
 * Create the 2026 `summitEdition` document (dates + venue) from the values that were hardcoded
 * across the summit pages.   node scripts/seed-summit-edition.mjs [--write] [--force]
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
const WRITE = process.argv.includes('--write'), FORCE = process.argv.includes('--force')
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const i = l.indexOf('='); if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
const sanity = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN })
const doc = {
  _id: 'summit-edition-2026', _type: 'summitEdition', year: 2026,
  startDate: '2026-10-28T09:00:00+03:00', endDate: '2026-10-29T17:00:00+03:00', displayDates: '28 - 29 October 2026',
  venueName: 'TBC', streetAddress: 'TBC', city: 'Nairobi', region: 'Nairobi County', postalCode: '00100', country: 'KE',
  latitude: '-1.2921', longitude: '36.8219', inPersonLabel: '500+ In Person', streamingLabel: '2,000+ Streaming',
}
console.log(WRITE ? 'WRITE' : 'DRY RUN', doc)
if (!WRITE) process.exit(0)
const r = FORCE ? await sanity.createOrReplace(doc) : await sanity.createIfNotExists(doc)
console.log('done', r._id)
