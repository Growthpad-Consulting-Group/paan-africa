import type { GetStaticPaths, GetStaticProps } from 'next'
import AgencyProfile from '@/components/agencies/AgencyProfile'
import { getAgencyBySlug, getAgencySlugs, type Agency } from '@/lib/agencyService'

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAgencySlugs()
  return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<{ agency: Agency }, { slug: string }> = async ({ params }) => {
  const agency = await getAgencyBySlug(params!.slug)
  if (!agency) return { notFound: true, revalidate: 60 }
  return { props: { agency }, revalidate: 3600 }
}

export default function CertifiedAgencyPage({ agency }: { agency: Agency }) {
  return <AgencyProfile agency={agency} />
}
