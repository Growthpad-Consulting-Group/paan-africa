import { buildMetadata } from '@/lib/seo';
import PaymentFailurePage from '@/features/payments/components/PaymentFailurePage';

export const metadata = buildMetadata({
  path: '/payment/failure',
  title: 'Payment Failed | Try Again | PAAN Africa',
  description: 'Payment processing failed. Please try again or contact support for assistance.',
});

export default function Page() {
  return <PaymentFailurePage />;
}
