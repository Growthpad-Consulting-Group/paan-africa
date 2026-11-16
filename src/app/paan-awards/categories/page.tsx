import { buildMetadata } from '@/shared/lib/seo';
import { getAwards } from '@/features/summit/lib/summitService';
import AwardCategoriesPage from '@/features/awards/components/AwardCategoriesPage';

export const revalidate = 3600;

export const metadata = buildMetadata({
  path: '/paan-awards/categories',
  title: 'PAAN Awards 2026 | Browse All Award Categories',
  description: 'Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria, find the right fit for your work, and prepare your nomination.',
  keywords: 'PAAN Awards categories, award categories 2026, African creative awards categories, agency awards Africa, campaign awards, freelancer awards Africa, PAAN Awards nomination, award criteria, creative industry categories',
  image: 'https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png',
  ogTitle: 'PAAN Awards 2026 | Browse All Award Categories',
  ogDescription: 'Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria, find the right fit for your work, and prepare your nomination.',
  twitterTitle: 'PAAN Awards 2026 | Browse All Award Categories',
  twitterDescription: 'Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria, find the right fit for your work, and prepare your nomination.',
  canonicalUrl: 'https://paan.africa/paan-awards/categories',
});

export default async function Page() {
  const awards = await getAwards();
  return <AwardCategoriesPage awards={awards} />;
}
