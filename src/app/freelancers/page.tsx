import { buildMetadata } from '@/lib/seo';
import FreelancersPage from '@/features/freelancers/components/FreelancersPage';

export const metadata = buildMetadata({
  path: '/freelancers',
  title: "Join PAAN's Freelancer Network | Africa",
  description: "Become a PAAN Certified Freelancer and gain access to top-tier briefs, professional structure, and visibility. Join Africa's most trusted network for creative, technical, and strategic freelance talent.",
  keywords: 'African freelancers, freelance network Africa, PAAN certified freelancer, join freelancer platform, vetted freelancers Africa, Pan-African creative network',
});

export default function Page() {
  return <FreelancersPage />;
}
