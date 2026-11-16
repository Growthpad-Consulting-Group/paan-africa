import type { Metadata } from 'next'

const SITE = 'https://paan.africa'
const DEFAULTS = {
  title: 'Pan-African Agency Network (PAAN)',
  description:
    "Discover the Pan-African Agency Network (PAAN), a dynamic alliance of creative and tech agencies across Africa and the diaspora. Join us to unlock global opportunities, access exclusive resources, and collaborate with top talent to redefine Africa's creative and technological footprint. Explore our membership tiers, services, and upcoming events today!",
  keywords:
    'Pan-African Agency Network, PAAN, African agencies, creative network, tech network, collaboration, innovation, global influence',
  image: 'https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296',
}

export type SeoInput = {
  /** Path of the page, e.g. "/privacy-policy" (used for the canonical URL unless `canonicalUrl` is given) */
  path: string
  title?: string
  description?: string
  keywords?: string
  image?: string
  noindex?: boolean
  imageWidth?: number
  imageHeight?: number
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonicalUrl?: string
}

/**
 * App Router replacement for the `<SEO>` component: same tags, same defaults.
 * Use from a route's `generateMetadata` / `metadata` export.
 */
export function buildMetadata(input: SeoInput): Metadata {
  const title = input.title ?? DEFAULTS.title
  const description = input.description ?? DEFAULTS.description
  const image = input.image ?? DEFAULTS.image
  const url = input.canonicalUrl ?? `${SITE}${input.path === '/' ? '' : input.path}`
  const ogImage = input.ogImage ?? image
  return {
    title,
    description,
    keywords: input.keywords ?? DEFAULTS.keywords,
    authors: [{ name: 'Pan-African Agency Network (PAAN)' }],
    robots: input.noindex ? 'noindex' : 'index, follow',
    alternates: { canonical: url },
    other: { 'twitter:domain': 'paan.africa' },
    openGraph: {
      type: 'website',
      siteName: 'Pan-African Agency Network (PAAN)',
      locale: 'en_US',
      url,
      title: input.ogTitle ?? title,
      description: input.ogDescription ?? description,
      images: [{ url: ogImage, secureUrl: ogImage, width: input.imageWidth ?? 1200, height: input.imageHeight ?? 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@paan_network',
      creator: '@paan_network',
      title: input.twitterTitle ?? title,
      description: input.twitterDescription ?? description,
      images: [{ url: input.twitterImage ?? image, alt: title }],
    },
  }
}
