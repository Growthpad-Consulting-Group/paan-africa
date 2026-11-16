import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildMetadata } from '@/shared/lib/seo'
import { getAgencyBySlug, getAgencySlugs, localize } from '@/features/agencies/lib/agencyService'
import AgencyProfile from '@/features/agencies/components/AgencyProfile'

// ISR: refreshed hourly and by the Sanity webhook (/api/revalidate).
export const revalidate = 3600
export const dynamicParams = true

const loadAgency = cache(getAgencyBySlug)

export async function generateStaticParams() {
  const slugs = await getAgencySlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const agency = await loadAgency(slug)
  if (!agency) return { title: 'Agency not found | PAAN', robots: 'noindex' }
  return buildMetadata({
    path: `/certified-agencies/${slug}`,
    title: localize(agency.seoTitle) || `${agency.name} | PAAN Certified Agency`,
    description: localize(agency.seoDescription) || undefined,
    keywords: localize(agency.seoKeywords) || undefined,
  })
}

export default async function CertifiedAgencyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const agency = await loadAgency(slug)
  if (!agency) notFound()
  return <AgencyProfile agency={agency} />
}
