import { buildMetadata } from '@/shared/lib/seo';
import RetrieveTicketPage from '@/features/tickets/components/RetrieveTicketPage';

export const metadata = buildMetadata({
  path: '/retrieve-ticket',
  title: 'Retrieve Your Ticket - PAAN Summit 2026',
  description: 'Retrieve your PAAN Summit 2026 ticket using your email or registration number.',
});

export default function Page() {
  return <RetrieveTicketPage />;
}
