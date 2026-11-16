import { buildMetadata } from '@/shared/lib/seo';
import { getSummitExperiences, getSummitEdition, DEFAULT_EDITION, type SummitExperience, type SummitEdition } from '@/features/summit/lib/summitService';
import TravelGuidePage from '@/features/summit/components/TravelGuidePage';

export const revalidate = 3600;

export const metadata = buildMetadata({
  path: '/summit/travel-guide',
  title: 'PAAN Summit Travel Guide | Nairobi',
  description: "Complete travel guide for PAAN Summit 2026 in Nairobi, Kenya. Get visa requirements, accommodation options, transport details, and essential travel tips for your visit to Africa's premier creative and tech conference.",
  keywords: 'PAAN Summit travel guide, Nairobi travel guide, Kenya visa requirements, Nairobi accommodation, PAAN Summit hotels, Nairobi transport, Kenya travel tips, African conference travel, business travel Kenya, Nairobi conference guide',
  image: 'https://ik.imagekit.io/nkmvdjnna/PAAN/summit/travel-guide-parallax-image.png',
  ogTitle: 'PAAN Summit 2026 Travel Guide | Nairobi, Kenya - Visa, Hotels & Transport',
  ogDescription: "Complete travel guide for PAAN Summit 2026 in Nairobi, Kenya. Get visa requirements, accommodation options, transport details, and essential travel tips for your visit to Africa's premier creative and tech conference.",
  twitterTitle: 'PAAN Summit Travel Guide | Nairobi',
  twitterDescription: "Complete travel guide for PAAN Summit 2026 in Nairobi, Kenya. Get visa requirements, accommodation options, transport details, and essential travel tips for your visit to Africa's premier creative and tech conference.",
});

export default async function Page() {
  let summitExperiences: SummitExperience[] = [];
  let edition: SummitEdition = DEFAULT_EDITION;
  try {
    [summitExperiences, edition] = await Promise.all([getSummitExperiences(), getSummitEdition()]);
  } catch (error) {
    console.error('Error loading travel experiences from Sanity:', error);
  }
  return <TravelGuidePage summitExperiences={summitExperiences} edition={edition} />;
}
