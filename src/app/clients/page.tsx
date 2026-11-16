import { buildMetadata } from '@/shared/lib/seo';
import ClientsPage from '@/features/clients/components/ClientsPage';

export const metadata = buildMetadata({
  path: '/clients',
  title: 'Grow Your Brand in Africa | PAAN Clients',
  description: 'Connect with certified agencies and freelancers across 20+ African countries to launch campaigns with cultural fluency and regional expertise. Find your delivery partner today.',
  keywords: 'African marketing, certified agencies Africa, freelancers Africa, campaign execution, PAAN Summit, brand growth Africa, vetted creators, regional campaigns, Africa marketing, African marketing agencies, African freelancers, African marketing network, African marketing solutions, African marketing experts, African marketing professionals, African marketing services, African marketing consultants, African marketing agencies, African marketing freelancers, African marketing network, African marketing solutions, African marketing experts, African marketing professionals, African marketing services, African marketing consultants',
  canonicalUrl: 'https://paan.africa/clients',
});

export default function Page() {
  return <ClientsPage />;
}
