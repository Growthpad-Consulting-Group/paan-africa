import { buildMetadata } from '@/lib/seo';
import { getOpenPositions, type JobPosting } from '@/features/careers/lib/careerService';
import CareersPage from '@/features/careers/components/CareersPage';

export const revalidate = 3600;

export const metadata = buildMetadata({
  path: '/careers',
  title: 'Careers at PAAN - Join Our Team | Pan-African Agency Network',
  description:
    'Join PAAN and help build the future of African marketing. Explore career opportunities, learn about our culture, and apply for positions across our growing network.',
  keywords:
    'PAAN careers, African marketing jobs, remote work Africa, marketing careers, creative jobs Africa, PAAN team, join PAAN, African talent, marketing opportunities',
});

export default async function Page() {
  let positions: JobPosting[] = [];
  try {
    positions = await getOpenPositions();
  } catch (error) {
    console.error('Error loading job postings from Sanity:', error);
  }
  return <CareersPage positions={positions} />;
}
