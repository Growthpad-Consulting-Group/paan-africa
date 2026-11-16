import { buildMetadata } from '@/shared/lib/seo';
import ThankYouPage from '@/features/legal/components/ThankYouPage';

export const metadata = buildMetadata({
  path: '/thank-you',
  title: 'Thank You | Pan-African Agency Network (PAAN)',
  description: 'Thank you for contacting the Pan-African Agency Network (PAAN). We have received your message and will get back to you soon.',
  keywords: 'PAAN, thank you, contact, Pan-African Agency Network',
  noindex: true,
});

export default function Page() {
  return <ThankYouPage />;
}
