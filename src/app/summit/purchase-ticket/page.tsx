import { buildMetadata } from '@/lib/seo';
import PurchaseTicketPage from '@/features/summit/components/PurchaseTicketPage';

export const metadata = buildMetadata({
  path: '/summit/purchase-ticket',
  title: 'Purchase Tickets - PAAN Summit 2026',
  description: 'Secure your spot at PAAN Summit 2026, happening on 28-29 October 2026 in Nairobi, Kenya. Choose from various ticket options including General Admission, VIP Delegate, Agency Pass, and more.',
  keywords: 'PAAN Summit tickets, buy summit tickets, conference registration, PAAN 2026 tickets, October 28-29 2026',
  image: 'https://ik.imagekit.io/nkmvdjnna/PAAN/summit/purchase-ticket-hero.webp',
});

export default function Page() {
  return <PurchaseTicketPage />;
}
