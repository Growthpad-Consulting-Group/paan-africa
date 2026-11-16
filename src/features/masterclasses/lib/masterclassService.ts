import { sanityFetch } from '@/sanity/client'

export type MasterclassStatus = 'upcoming' | 'completed' | 'not-accepting-bookings'

export type Instructor = {
  name: string
  title: string | null
  image: string | null
  bio: string | null
  expertise: string[]
}

/**
 * Same shape the pages used when this data was hardcoded, so the purchase flow is untouched.
 * `id` is the permanent numeric masterclass id (payment reference + promo codes depend on it).
 */
export type Masterclass = {
  id: number
  slug: string
  title: string
  description: string
  listingDescription: string
  fullDescription: string | null
  format: string | null
  date: string // display text, e.g. "February 11th, 2026"
  dateISO: string
  time: string | null
  memberPrice: number
  memberOriginalPrice: number | null
  nonMemberPrice: number
  nonMemberOriginalPrice: number | null
  currency: string
  category: string
  level: string | null
  image: string
  partnership: string | null
  instructor: Instructor
  // null (not []) when empty, so the page hides the section like it did when the key was absent
  benefits: string[] | null
  whoShouldAttend: string[] | null
  learningOutcomes: string[] | null
  courseObjectives: string[] | null
  whyAttend: string[] | null
  outcome: string | null
  featured: boolean
  hideFromListing: boolean
  seriesDescription: string | null
  status: MasterclassStatus
  series: string | null
  seriesOrder: number | null
}

export type MasterclassSeries = {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  dates: string[]
  time: string | null
  format: string | null
  instructor: string | null
  instructorTitle: string | null
  instructorBio: string | null
  whyAttend: string[]
  whoShouldAttend: string[]
  image: string | null
  status: MasterclassStatus
  isSeries: true
  subMasterclasses: { id: number; slug: string; title: string; date: string; description: string; image: string }[]
}

type Raw = Omit<Masterclass, 'id' | 'date' | 'dateISO' | 'status' | 'listingDescription' | 'series' | 'instructor'> & {
  masterclassId: number
  date: string
  bookingsClosed: boolean
  listingDescription: string | null
  seriesTitle: string | null
  instructor: { name: string; title: string | null; image: string | null; bio: string | null; expertise: string[] }
}

const FIELDS = `
  masterclassId, "slug": slug.current, title, description, listingDescription, fullDescription, format, date, time,
  memberPrice, memberOriginalPrice, nonMemberPrice, nonMemberOriginalPrice, currency, category, level,
  "image": image.asset->url, partnership,
  "instructor": { "name": instructor.name, "title": instructor.title, "image": instructor.image.asset->url,
                  "bio": instructor.bio, "expertise": coalesce(instructor.expertise, []) },
  "benefits": select(count(benefits) > 0 => benefits), "whoShouldAttend": select(count(whoShouldAttend) > 0 => whoShouldAttend),
  "learningOutcomes": select(count(learningOutcomes) > 0 => learningOutcomes), "courseObjectives": select(count(courseObjectives) > 0 => courseObjectives),
  "whyAttend": select(count(whyAttend) > 0 => whyAttend), outcome, "featured": featured == true, "hideFromListing": hideFromListing == true,
  "bookingsClosed": bookingsClosed == true, seriesDescription,
  "seriesTitle": series->title, seriesOrder
`
const BASE = `_type == "masterclass" && defined(slug.current) && defined(masterclassId) && defined(date)`

const todayEAT = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Africa/Nairobi' })
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const ordinal = (d: number) => (d > 3 && d < 21 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[d % 10] ?? 'th')
/** 2026-02-11 -> "February 11th, 2026" (the format the pages have always shown) */
export const formatDisplayDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}${ordinal(d)}, ${y}`
}
const statusFor = (iso: string, closed: boolean): MasterclassStatus =>
  closed ? 'not-accepting-bookings' : iso < todayEAT() ? 'completed' : 'upcoming'

function shape(r: Raw): Masterclass {
  const { masterclassId, bookingsClosed, seriesTitle, listingDescription, date, ...rest } = r
  return {
    ...rest,
    id: masterclassId,
    date: formatDisplayDate(date),
    dateISO: date,
    status: statusFor(date, bookingsClosed),
    listingDescription: listingDescription || r.description,
    series: seriesTitle,
  }
}

export async function getMasterclasses(): Promise<Masterclass[]> {
  return (await sanityFetch<Raw[]>(`*[${BASE}] | order(date asc){${FIELDS}}`)).map(shape)
}

export async function getMasterclassBySlug(slug: string): Promise<Masterclass | null> {
  const r = await sanityFetch<Raw | null>(`*[${BASE} && slug.current == $slug][0]{${FIELDS}}`, { slug })
  return r ? shape(r) : null
}

/** Old links were /masterclasses/<number>. */
export const getMasterclassSlugById = (id: number) =>
  sanityFetch<string | null>(`*[${BASE} && masterclassId == $id][0].slug.current`, { id })

export const getMasterclassSlugs = () => sanityFetch<string[]>(`*[${BASE}].slug.current`)

/** The series highlighted on /masterclasses, with its sessions taken from the masterclass documents. */
export async function getFeaturedSeries(): Promise<MasterclassSeries | null> {
  const s = await sanityFetch<(Omit<MasterclassSeries, 'id' | 'status' | 'isSeries' | 'subMasterclasses' | 'instructor'> & { _id: string; instructorName: string | null }) | null>(
    `*[_type == "masterclassSeries" && featuredOnListing == true][0]{
      _id, title, subtitle, description, "dates": coalesce(dates, []), time, format, instructorName, instructorTitle, instructorBio,
      "whyAttend": coalesce(whyAttend, []), "whoShouldAttend": coalesce(whoShouldAttend, []), "image": image.asset->url
    }`
  )
  if (!s) return null
  const subs = (await sanityFetch<Raw[]>(`*[${BASE} && series._ref == $id] | order(coalesce(seriesOrder, 999) asc, date asc){${FIELDS}}`, { id: s._id })).map(shape)
  const { _id, instructorName, ...rest } = s
  return {
    ...rest,
    id: _id,
    instructor: instructorName,
    isSeries: true,
    status: subs.some((m) => m.status === 'upcoming') ? 'upcoming' : 'completed',
    subMasterclasses: subs.map((m) => ({ id: m.id, slug: m.slug, title: m.title, date: m.date, description: m.seriesDescription || m.listingDescription, image: m.image })),
  }
}
