import { buildMetadata } from '@/shared/lib/seo';
import { getAgencyLogos, type AgencyLogo } from '@/features/agencies/lib/agencyService';
import HomePage from '@/features/home/components/HomePage';

// ISR: refreshed hourly and by the Sanity webhook (/api/revalidate).
export const revalidate = 3600;

export const metadata = buildMetadata({
  path: '/',
  title: 'PAAN | Alliance of independent agencies in Africa',
  description: 'A collaborative ecosystem bringing together agencies, freelancers, clients, and partners across Africa. We exist to transform a fragmented industry into a united creative force capable of shaping global markets.',
  keywords: 'Pan Africa, PAAN, creative agencies, top African tech agencies, African digital marketing network, join African agency network, creative agencies in Africa, leading African digital innovation, pan-African collaboration platform, agency network in Africa, African creatives community, tech partnerships Africa, Africa digital marketing agencies, pan-African tech innovation, African creative strategy partners, African digital agency network, pan-African business development, Africa’s creative agency network, digital marketing agencies in Africa, tech agency partnerships Africa',
  canonicalUrl: 'https://paan.africa/',
});

export default async function Page() {
  let agencyLogos: AgencyLogo[] = [];
  try {
    agencyLogos = await getAgencyLogos();
  } catch (error) {
    console.error('Error loading agency logos from Sanity:', error);
  }
  return <HomePage agencyLogos={agencyLogos} />;
}
