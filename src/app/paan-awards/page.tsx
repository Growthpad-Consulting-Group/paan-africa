import { buildMetadata } from '@/lib/seo';
import AwardsPage from '@/features/awards/components/AwardsPage';

export const metadata = buildMetadata({
  path: '/paan-awards',
  title: 'PAAN Awards 2026 | Creative Excellence',
  description: "Join the prestigious PAAN Awards 2026, recognizing outstanding achievements in Africa's creative and tech industry. Celebrate innovation, creativity, and excellence across agencies, freelancers, and digital professionals shaping Africa's future.",
  keywords: 'PAAN Awards 2026, African creative awards, tech industry awards, creative excellence Africa, digital innovation awards, African agency awards, freelancer recognition, creative industry awards, tech leadership awards, African business awards',
  image: 'https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png',
  ogTitle: 'PAAN Awards 2026 | Creative Excellence',
  ogDescription: "Join the prestigious PAAN Awards 2026, recognizing outstanding achievements in Africa's creative and tech industry. Celebrate innovation, creativity, and excellence across agencies, freelancers, and digital professionals shaping Africa's future.",
  twitterTitle: 'PAAN Awards 2026 | Creative Excellence',
  twitterDescription: "Join the prestigious PAAN Awards 2026, recognizing outstanding achievements in Africa's creative and tech industry. Celebrate innovation, creativity, and excellence across agencies, freelancers, and digital professionals shaping Africa's future.",
  canonicalUrl: 'https://paan.africa/paan-awards',
});

export default function Page() {
  return <AwardsPage />;
}
