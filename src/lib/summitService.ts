import { sanityFetch } from '@/sanity/client'
import { SUMMIT_EDITION } from '@/data/summit/status'

export type SummitSpeaker = { id: string; name: string; title: string | null; image: string; linkedin: string | null }
export type SummitSession = { id: string; title: string; description: string | null; image: string | null; icon: string | null; category: string | null }
export type SummitTrack = { id: string; title: string; description: string | null; image: string; features: string[] }

const ORDER = 'order(coalesce(order, 999) asc, _createdAt asc)'

export const getSummitSpeakers = (edition = SUMMIT_EDITION) =>
  sanityFetch<SummitSpeaker[]>(
    `*[_type == "summitSpeaker" && edition == $edition] | ${ORDER}{ "id": _id, name, title, "image": image.asset->url, linkedin }`,
    { edition }
  )

export const getSummitSessions = (edition = SUMMIT_EDITION) =>
  sanityFetch<SummitSession[]>(
    `*[_type == "summitSession" && edition == $edition] | ${ORDER}{ "id": _id, title, description, "image": image.asset->url, icon, category }`,
    { edition }
  )

export const getSummitTracks = (edition = SUMMIT_EDITION) =>
  sanityFetch<SummitTrack[]>(
    `*[_type == "summitTrack" && edition == $edition] | ${ORDER}{ "id": _id, title, description, "image": image.asset->url, "features": coalesce(features, []) }`,
    { edition }
  )

// ── Awards ────────────────────────────────────────────────────────────────

/** Shapes match what the awards pages already expected, so their rendering code is unchanged. */
export type AgencyAwardGroup = { id: string; name: string; description: string | null; subcategories: { id: string; name: string; description: string | null }[] }
export type FreelancerAwardGroup = { id: string; name: string; description: string | null; subcategories: { id: string; title: string; description: string | null; icon: string | null }[] }
export type AwardsData = {
  agencyGroups: AgencyAwardGroup[]
  freelancerGroups: FreelancerAwardGroup[]
  /** Awards shown on the main awards page (the categories page shows all) */
}

type RawGroup = { audience: 'agency' | 'freelancer'; groupId: string; name: string; description: string | null; awards: { awardId: string; name: string; description: string | null; icon: string | null }[] }

export async function getAwards(edition = SUMMIT_EDITION): Promise<AwardsData> {
  const groups = await sanityFetch<RawGroup[]>(
    `*[_type == "awardGroup" && edition == $edition] | ${ORDER}{
      audience, groupId, name, description,
      "awards": coalesce(awards[]{ awardId, name, description, icon }, [])
    }`,
    { edition }
  )
  const agency = groups.filter((g) => g.audience === 'agency')
  const freelancer = groups.filter((g) => g.audience === 'freelancer')
  return {
    agencyGroups: agency.map((g) => ({ id: g.groupId, name: g.name, description: g.description, subcategories: g.awards.map((a) => ({ id: a.awardId, name: a.name, description: a.description })) })),
    freelancerGroups: freelancer.map((g) => ({ id: g.groupId, name: g.name, description: g.description, subcategories: g.awards.map((a) => ({ id: a.awardId, title: a.name, description: a.description, icon: a.icon })) })),
  }
}

// ── Bookable travel experiences ─────────────────────────────────────────────

/**
 * Same shape the travel-guide and booking pages used when this was hardcoded.
 * `id` is the permanent string id: it is the URL, the Paystack reference and the booking key.
 */
export type SummitExperience = {
  id: string
  category: string | null
  title: string
  subtitle: string | null
  description: string | null
  price: number
  priceUnit: string
  priceNote: string | null
  image: string
  duration: string | null
  availability: string | null
  highlights: string[]
}

const EXPERIENCE_FIELDS = `
  "id": experienceId, category, title, subtitle, description, price, "priceUnit": coalesce(priceUnit, "USD"), priceNote,
  "image": image.asset->url, duration, availability, "highlights": coalesce(highlights, [])
`

export const getSummitExperiences = (edition = SUMMIT_EDITION) =>
  sanityFetch<SummitExperience[]>(
    `*[_type == "summitExperience" && edition == $edition && defined(experienceId)] | ${ORDER}{${EXPERIENCE_FIELDS}}`,
    { edition }
  )

export const getSummitExperience = (id: string, edition = SUMMIT_EDITION) =>
  sanityFetch<SummitExperience | null>(
    `*[_type == "summitExperience" && edition == $edition && experienceId == $id][0]{${EXPERIENCE_FIELDS}}`,
    { edition, id }
  )

// ── Exhibition floor ────────────────────────────────────────────────────────

export type ExhibitorBooth = { id: number; number: number; status: 'Available' | 'Reserved' | 'Booked'; size: string | null; price: string | null; type: 'Standard' | 'Pavilion' }

export const getExhibitorBooths = (edition = SUMMIT_EDITION) =>
  sanityFetch<ExhibitorBooth[]>(
    `*[_type == "exhibitorBooth" && edition == $edition] | order(number asc){ "id": number, number, status, size, price, type }`,
    { edition }
  )

// ── Edition info (dates + venue) ─────────────────────────────────────────────

export type SummitEdition = {
  year: number
  startDate: string
  endDate: string
  displayDates: string
  venueName: string
  streetAddress: string
  city: string
  region: string
  postalCode: string
  country: string
  latitude: string
  longitude: string
  inPersonLabel: string
  streamingLabel: string
}

/** Used if the edition document is missing, so the pages never break. Mirrors the 2026 values. */
export const DEFAULT_EDITION: SummitEdition = {
  year: SUMMIT_EDITION,
  startDate: '2026-10-28T09:00:00+03:00',
  endDate: '2026-10-29T17:00:00+03:00',
  displayDates: '28 - 29 October 2026',
  venueName: 'TBC',
  streetAddress: 'TBC',
  city: 'Nairobi',
  region: 'Nairobi County',
  postalCode: '00100',
  country: 'KE',
  latitude: '-1.2921',
  longitude: '36.8219',
  inPersonLabel: '500+ In Person',
  streamingLabel: '2,000+ Streaming',
}

export async function getSummitEdition(year = SUMMIT_EDITION): Promise<SummitEdition> {
  const doc = await sanityFetch<Partial<SummitEdition> | null>(
    `*[_type == "summitEdition" && year == $year][0]{ year, startDate, endDate, displayDates, venueName, streetAddress, city, region, postalCode, country, latitude, longitude, inPersonLabel, streamingLabel }`,
    { year }
  )
  // fill any empty field from the defaults
  return Object.fromEntries(Object.entries(DEFAULT_EDITION).map(([k, v]) => [k, (doc as Record<string, unknown> | null)?.[k] ?? v])) as SummitEdition
}
