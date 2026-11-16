import { sanityFetch } from '@/sanity/client'

export type Localized = { en?: string | null; fr?: string | null } | null

export type MembershipLevel = 'associate' | 'full' | 'gold'

export type Agency = {
  name: string
  slug: string
  membershipLevel: MembershipLevel | null
  memberSince: number | null
  websiteUrl: string | null
  logoUrl: string
  logoAlt: string | null
  countries: { name: Localized; code: string }[]
  aboutTitle: Localized
  aboutDescription: Localized
  specializations: Localized[]
  videoUrl: string | null
  videoFileUrl: string | null
  clientsTitle: Localized
  clientLogos: { url: string; alt: string | null }[]
  testimonialQuote: Localized
  testimonialName: string | null
  testimonialRole: string | null
  contactDescription: Localized
  linkedinUrl: string | null
  instagramUrl: string | null
  facebookUrl: string | null
  xUrl: string | null
  seoTitle: Localized
  seoDescription: Localized
  seoKeywords: Localized
}

export type AgencyLogo = { name: string; slug: string; logoUrl: string; hasProfilePage: boolean }

const AGENCY_FIELDS = `
  name, "slug": slug.current, membershipLevel, memberSince, websiteUrl,
  "logoUrl": logo.asset->url, "logoAlt": logo.alt,
  "countries": coalesce(countries[]{ name, code }, []),
  aboutTitle, aboutDescription,
  "specializations": coalesce(specializations[], []),
  videoUrl, "videoFileUrl": videoFile.asset->url,
  clientsTitle,
  "clientLogos": coalesce(clientLogos[]{ "url": asset->url, alt }, []),
  testimonialQuote, testimonialName, testimonialRole, contactDescription,
  linkedinUrl, instagramUrl, facebookUrl, xUrl,
  seoTitle, seoDescription, seoKeywords
`
const PAGES = `_type == "agency" && hasProfilePage != false && defined(slug.current)`

/** Pick the visitor's language, falling back to English. */
export const localize = (v: Localized | undefined, locale?: string): string =>
  (locale && v?.[locale as 'en' | 'fr']) || v?.en || ''

export const getAgencySlugs = () => sanityFetch<string[]>(`*[${PAGES}].slug.current`)

export const getAgencyBySlug = (slug: string) =>
  sanityFetch<Agency | null>(`*[${PAGES} && slug.current == $slug][0]{${AGENCY_FIELDS}}`, { slug })

/** Logos for the homepage strip, in display order (includes logo-only agencies). */
export const getAgencyLogos = () =>
  sanityFetch<AgencyLogo[]>(
    `*[_type == "agency" && defined(logo.asset)] | order(order asc, name asc){
      name, "slug": slug.current, "hasProfilePage": hasProfilePage != false,
      "logoUrl": coalesce(marqueeLogo.asset->url, logo.asset->url)
    }`
  )
