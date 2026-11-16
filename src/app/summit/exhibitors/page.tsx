import { buildMetadata } from '@/shared/lib/seo';
import { getExhibitorBooths, getSummitEdition, DEFAULT_EDITION, type ExhibitorBooth, type SummitEdition } from '@/features/summit/lib/summitService';
import ExhibitorsPage from '@/features/summit/components/ExhibitorsPage';

export const revalidate = 3600;

export const metadata = buildMetadata({
  path: '/summit/exhibitors',
  title: 'PAAN Summit 2026 Exhibition Floor Plan | Book Your Booth Space',
  description: "Explore the PAAN Summit 2026 exhibition floor plan with live booth availability. Book standard 3×3m booths (USD 1,000), 3×6m booths (USD 1,800), or custom pavilions. Connect with 500+ industry leaders at Africa's premier creative and tech conference.",
  keywords: 'PAAN Summit exhibition, exhibition floor plan, booth booking, PAAN Summit 2026 exhibitors, Nairobi conference exhibition, creative tech conference, African business exhibition, summit booth space, exhibition packages, PAAN Summit booths',
  image: 'https://ik.imagekit.io/nkmvdjnna/PAAN/summit/exhibition.png',
  ogTitle: 'PAAN Summit 2026 Exhibition Floor Plan | Book Your Booth Space',
  ogDescription: "Explore the PAAN Summit 2026 exhibition floor plan with live booth availability. Book standard 3×3m booths (USD 1,000), 3×6m booths (USD 1,800), or custom pavilions. Connect with 500+ industry leaders at Africa's premier creative and tech conference.",
  twitterTitle: 'PAAN Summit 2026 Exhibition Floor Plan | Book Your Booth Space',
  twitterDescription: "Explore the PAAN Summit 2026 exhibition floor plan with live booth availability. Book standard 3×3m booths (USD 1,000), 3×6m booths (USD 1,800), or custom pavilions. Connect with 500+ industry leaders at Africa's premier creative and tech conference.",
});

export default async function Page() {
  let booths: ExhibitorBooth[] = [];
  let edition: SummitEdition = DEFAULT_EDITION;
  try {
    [booths, edition] = await Promise.all([getExhibitorBooths(), getSummitEdition()]);
  } catch (error) {
    console.error('Error loading booths from Sanity:', error);
  }
  return <ExhibitorsPage booths={booths} edition={edition} />;
}
