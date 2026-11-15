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
  featuredAgencyIds: string[]
  featuredFreelancerIds: string[]
}

type RawGroup = { audience: 'agency' | 'freelancer'; groupId: string; name: string; description: string | null; awards: { awardId: string; name: string; description: string | null; icon: string | null; featured: boolean }[] }

export async function getAwards(edition = SUMMIT_EDITION): Promise<AwardsData> {
  const groups = await sanityFetch<RawGroup[]>(
    `*[_type == "awardGroup" && edition == $edition] | ${ORDER}{
      audience, groupId, name, description,
      "awards": coalesce(awards[]{ awardId, name, description, icon, "featured": featured == true }, [])
    }`,
    { edition }
  )
  const agency = groups.filter((g) => g.audience === 'agency')
  const freelancer = groups.filter((g) => g.audience === 'freelancer')
  const featured = (gs: RawGroup[]) => gs.flatMap((g) => g.awards.filter((a) => a.featured).map((a) => a.awardId))
  return {
    agencyGroups: agency.map((g) => ({ id: g.groupId, name: g.name, description: g.description, subcategories: g.awards.map((a) => ({ id: a.awardId, name: a.name, description: a.description })) })),
    freelancerGroups: freelancer.map((g) => ({ id: g.groupId, name: g.name, description: g.description, subcategories: g.awards.map((a) => ({ id: a.awardId, title: a.name, description: a.description, icon: a.icon })) })),
    featuredAgencyIds: featured(agency),
    featuredFreelancerIds: featured(freelancer),
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
