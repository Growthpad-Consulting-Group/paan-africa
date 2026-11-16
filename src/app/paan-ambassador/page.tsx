import { buildMetadata } from '@/shared/lib/seo';
import AmbassadorPage from '@/features/ambassador/components/AmbassadorPage';

export const metadata = buildMetadata({
  path: '/paan-ambassador',
  title: "PAAN Ambassador Program | Lead Africa's Creative Economy",
  description: "Join the exclusive PAAN Ambassador Program and become a trusted leader in Africa's creative, digital, and strategic industries. Represent the future of African agencies and unlock exclusive benefits, VIP access, and thought leadership opportunities across 20+ African countries.",
  keywords: 'PAAN Ambassador Program, African creative leaders, African marketing ambassadors, African digital leaders, African strategic leadership, PAAN network ambassadors, African creative economy, African marketing network leadership, African agency representatives, African industry leaders, African creative professionals, African digital professionals, African strategic professionals, African marketing leadership, African creative leadership, African digital leadership, African strategic leadership, African industry ambassadors, African creative ambassadors, African digital ambassadors, African strategic ambassadors, African marketing ambassadors, African creative economy leaders, African digital economy leaders, African strategic economy leaders, African marketing economy leaders, African creative industry leaders, African digital industry leaders, African strategic industry leaders, African marketing industry leaders',
});

export default function Page() {
  return <AmbassadorPage />;
}
