import { buildMetadata } from '@/shared/lib/seo';
import { getMasterclasses, getFeaturedSeries } from '@/features/masterclasses/lib/masterclassService';
import MasterclassesBrowser from '@/features/masterclasses/components/MasterclassesBrowser';

export const revalidate = 3600;

export const metadata = buildMetadata({
  path: '/masterclasses',
  title: 'PAAN Masterclasses | Agency Training',
  description:
    "Join expert-led masterclasses designed specifically for African agencies. Learn from industry leaders, gain practical skills, and accelerate your agency's growth with PAAN's professional development programs.",
  keywords:
    'PAAN masterclasses, agency training, professional development Africa, business skills, tender training, RFP masterclass, agency growth, African agencies',
});

export default async function MasterclassesPage() {
  const [masterclasses, featuredSeries] = await Promise.all([getMasterclasses(), getFeaturedSeries()]);
  return <MasterclassesBrowser masterclasses={masterclasses} featuredSeries={featuredSeries} />;
}
