import { buildMetadata } from '@/shared/lib/seo';
import PrivacyPolicyContent from '@/features/legal/components/PrivacyPolicyContent';

export const metadata = buildMetadata({
  path: '/privacy-policy',
  title: 'Privacy Policy | Pan-African Agency Network (PAAN)',
  description: 'Learn how the Pan-African Agency Network (PAAN) collects, uses, and protects your personal information. Read our Privacy Policy for more details.',
  keywords: 'PAAN, privacy policy, data protection, Pan-African Agency Network',
});

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
