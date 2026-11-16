import { sanityFetch } from '@/sanity/client'

export type EventItem = {
  id: number | null
  sanityId: string
  slug: string
  title: string
  date: string
  time: string | null
  location: string | null
  venue: string | null
  description: string
  image: string
  category: string
  price: string | null
  /** Register link while upcoming; recording link once past (matches how the cards use it). */
  registrationUrl: string | null
  zoomPasscode: string | null
  attendees: number | null
  /** Number of speakers (names are in `speakerNames`). */
  speakers: number | null
  speakerNames: string[]
  featured: boolean
  status: 'upcoming' | 'past'
}

type Raw = Omit<EventItem, 'registrationUrl' | 'speakers' | 'status'> & {
  registrationUrl: string | null
  recordingUrl: string | null
  speakerCount: number | null
}

const FIELDS = `
  "id": legacyId, "sanityId": _id, "slug": slug.current, title, date, time, location, venue,
  description, "image": image.asset->url, category, price, registrationUrl, recordingUrl,
  zoomPasscode, attendees, speakerCount, "speakerNames": coalesce(speakers, []), "featured": featured == true
`
const BASE = `_type == "event" && defined(slug.current) && defined(date)`

/** Today's date (YYYY-MM-DD) in East Africa, where events are scheduled. */
const todayEAT = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' })

function shape(r: Raw): EventItem {
  const status = r.date >= todayEAT() ? 'upcoming' : 'past'
  const { recordingUrl, speakerCount, ...rest } = r
  return {
    ...rest,
    status,
    registrationUrl: status === 'past' ? recordingUrl : r.registrationUrl,
    speakers: r.speakerNames.length || speakerCount || null,
  }
}

/** Upcoming soonest-first, past newest-first. Status comes from the date, not a hand-edited list. */
export async function getEvents(): Promise<{ upcoming: EventItem[]; past: EventItem[] }> {
  const all = (await sanityFetch<Raw[]>(`*[${BASE}]{${FIELDS}}`)).map(shape)
  return {
    upcoming: all.filter((e) => e.status === 'upcoming').sort((a, b) => a.date.localeCompare(b.date)),
    past: all.filter((e) => e.status === 'past').sort((a, b) => b.date.localeCompare(a.date)),
  }
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const r = await sanityFetch<Raw | null>(`*[${BASE} && slug.current == $slug][0]{${FIELDS}}`, { slug })
  return r ? shape(r) : null
}

/** For old /events/<number> links. */
export async function getEventSlugByLegacyId(id: number): Promise<string | null> {
  return sanityFetch<string | null>(`*[${BASE} && legacyId == $id][0].slug.current`, { id })
}

export const getEventSlugs = () => sanityFetch<string[]>(`*[${BASE}].slug.current`)

export async function getRelatedEvents(event: Pick<EventItem, 'sanityId' | 'category'>, limit = 3): Promise<EventItem[]> {
  const r = await sanityFetch<Raw[]>(
    `*[${BASE} && _id != $id && category == $category] | order(date desc)[0...$limit]{${FIELDS}}`,
    { id: event.sanityId, category: event.category, limit }
  )
  return r.map(shape)
}
