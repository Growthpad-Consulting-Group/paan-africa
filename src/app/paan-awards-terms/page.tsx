import { buildMetadata } from '@/lib/seo';
import AwardsTermsPage from '@/features/awards/components/AwardsTermsPage';

export const metadata = buildMetadata({
  path: '/paan-awards-terms',
  title: 'PAAN Awards Terms & Conditions | Pan-African Creative Awards',
  description: 'Terms and conditions, eligibility criteria, and guidelines for the PAAN Pan-African Creative Awards 2026.',
  keywords: 'PAAN Awards, terms conditions, eligibility, guidelines, Pan-African Creative Awards, Africa creative economy',
});

export default function Page() {
  return <AwardsTermsPage />;
}
