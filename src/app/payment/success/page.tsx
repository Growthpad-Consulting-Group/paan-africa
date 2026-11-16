import { buildMetadata } from '@/shared/lib/seo';
import PaymentSuccessPage from '@/features/payments/components/PaymentSuccessPage';

export const metadata = buildMetadata({
  path: '/payment/success',
  title: 'Payment Successful | PAAN Africa',
  description: 'Your payment has been processed successfully. Thank you for your purchase.',
});

export default function Page() {
  return <PaymentSuccessPage />;
}
