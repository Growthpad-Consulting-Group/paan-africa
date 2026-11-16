import { buildMetadata } from '@/shared/lib/seo';
import TermsAndConditionsContent from '@/features/legal/components/TermsAndConditionsContent';

export const metadata = buildMetadata({
  path: '/terms-and-conditions',
  title: 'Terms and Conditions | PAAN Summit 2026',
  description: "Read the terms and conditions for PAAN Summit 2026 - Africa's premier creative and tech leadership conference. Learn about registration, payment, cancellation policies, and more.",
  keywords: 'PAAN Summit 2026, terms and conditions, summit registration, creative conference Africa, tech conference terms',
});

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsContent />;
}
