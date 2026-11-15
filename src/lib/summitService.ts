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
