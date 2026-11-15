/**
 * Seed Sanity `exhibitorBooth` documents from the 40-booth table that was hardcoded in
 * pages/summit/exhibitors.js (extracted to scripts/data/booths-extracted.json).
 *
 *   node scripts/migrate-booths-to-sanity.mjs           # DRY RUN
 *   node scripts/migrate-booths-to-sanity.mjs --write   # create docs (existing docs kept)
 *   node scripts/migrate-booths-to-sanity.mjs --write --force   # overwrite (loses Studio edits!)
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'

const WRITE = process.argv.includes('--write'), FORCE = process.argv.includes('--force')
const EDITION = 2026
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const i = l.indexOf('='); if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
const sanity = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN })
const booths = JSON.parse(readFileSync(new URL('./data/booths-extracted.json', import.meta.url), 'utf8'))
const docs = booths.map((b) => ({ _id: `exhibitor-booth-${EDITION}-${b.number}`, _type: 'exhibitorBooth', number: b.number, status: b.status, type: b.type, size: b.size, price: b.price, edition: EDITION }))
const count = (k) => Object.entries(docs.reduce((a, d) => ((a[d[k]] = (a[d[k]] || 0) + 1), a), {})).map(([x, n]) => `${x}:${n}`).join(' ')
console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | ${docs.length} booths | status ${count('status')} | type ${count('type')}`)
if (!WRITE) process.exit(0)
const tx = sanity.transaction()
for (const d of docs) FORCE ? tx.createOrReplace(d) : tx.createIfNotExists(d)
await tx.commit()
console.log('committed', docs.length, 'booths')
