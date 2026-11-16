import { buildMetadata } from '@/lib/seo';
import TalentDiscoveryPage from '@/features/talent-discovery/components/TalentDiscoveryPage';

export const metadata = buildMetadata({
  path: '/talent-discovery',
  title: 'Talent Discovery Map - Find African Creative Professionals | PAAN',
  description: "Discover 3,000+ verified creative professionals and agencies across 54 African countries. Connect with top talent for your next project on PAAN's interactive talent map.",
  keywords: 'African creatives, creative agencies, talent discovery, creative professionals, design talent, marketing agencies, African designers',
  image: 'https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296',
});

export default function Page() {
  return <TalentDiscoveryPage />;
}
