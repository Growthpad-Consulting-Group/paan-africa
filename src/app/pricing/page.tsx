import { buildMetadata } from '@/shared/lib/seo';
import PricingPage from '@/features/pricing/components/PricingPage';

export const metadata = buildMetadata({
  path: '/pricing',
  title: 'PAAN Agency Membership Tiers | Unlock Opportunities Across Africa',
  description: 'Explore PAAN’s tailored agency membership tiers designed to boost your agency’s visibility, client access, and growth across Africa. Choose from Free, Associate, Full, and Gold membership options to expand your reach.',
  keywords: 'PAAN Agency Membership, Africa Agency Network, agency growth Africa, Africa business expansion, RFPs, Cross-border projects, agency co-bidding',
  canonicalUrl: 'https://paan.africa/pricing',
});

export default function Page() {
  return <PricingPage />;
}
