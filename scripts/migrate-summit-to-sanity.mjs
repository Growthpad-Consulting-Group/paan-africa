/**
 * Seed Sanity summit documents (speakers, sessions/experiences, tracks) from the old data files
 * (kept in scripts/data/summit-*.source.js).
 *
 *   node scripts/migrate-summit-to-sanity.mjs           # DRY RUN
 *   node scripts/migrate-summit-to-sanity.mjs --write   # upload images + create docs (existing docs kept)
 *   node scripts/migrate-summit-to-sanity.mjs --write --force   # overwrite (loses Studio edits!)
 */
import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { speakers } from './data/summit-speakers.source.js'
import { sessions } from './data/summit-sessions.source.js'
import { tracks } from './data/summit-tracks.source.js'

const WRITE = process.argv.includes('--write'), FORCE = process.argv.includes('--force')
const EDITION = 2026
for (const l of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split('\n')) {
  const i = l.indexOf('='); if (i > 0 && !l.startsWith('#')) process.env[l.slice(0, i).trim()] ??= l.slice(i + 1).trim().replace(/^['"]|['"]$/g, '')
}
const sanity = createClient({ projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: '2025-01-01', useCdn: false, token: process.env.SANITY_WRITE_TOKEN })
const problems = [], cache = new Map()
function image(url, alt) {
  if (!url) return undefined
  if (!cache.has(url)) cache.set(url, (async () => {
    try {
      const res = await fetch(url); if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const type = (res.headers.get('content-type') || '').split(';')[0]; if (!type.startsWith('image/')) throw new Error(`not an image (${type})`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (!WRITE) return 'dry-run'
      return (await sanity.assets.upload('image', buf, { filename: decodeURIComponent(new URL(url).pathname.split('/').pop()), contentType: type }))._id
    } catch (e) { problems.push(`${url} -> ${e.message}`); return null }
  })())
  return cache.get(url).then((ref) => (ref ? { _type: 'image', asset: { _type: 'reference', _ref: ref }, ...(alt ? { alt } : {}) } : undefined))
}

const docs = []
for (const [i, s] of speakers.entries()) docs.push({ _id: `summit-speaker-${EDITION}-${s.id}`, _type: 'summitSpeaker', name: s.name, title: s.title, image: await image(s.image, s.name), linkedin: s.linkedin, order: i + 1, edition: EDITION })
for (const [i, s] of sessions.entries()) docs.push({ _id: `summit-session-${EDITION}-${s.id}`, _type: 'summitSession', title: s.title, description: s.description, image: await image(s.image, s.title), icon: s.icon, category: s.category, order: i + 1, edition: EDITION })
for (const [i, t] of tracks.entries()) docs.push({ _id: `summit-track-${EDITION}-${t.id}`, _type: 'summitTrack', title: t.title, description: t.description, image: await image(t.image, t.title), features: t.features, order: i + 1, edition: EDITION })

console.log(`${WRITE ? 'WRITE' : 'DRY RUN'} | speakers ${speakers.length}, sessions ${sessions.length}, tracks ${tracks.length} | image problems: ${problems.length}`)
problems.forEach((p) => console.log('  PROBLEM', p))
if (!WRITE) process.exit(0)
if (problems.length) { console.log('Refusing to write while images fail.'); process.exit(1) }
for (const d of JSON.parse(JSON.stringify(docs))) { const r = FORCE ? await sanity.createOrReplace(d) : await sanity.createIfNotExists(d); console.log('  ', r._id) }
