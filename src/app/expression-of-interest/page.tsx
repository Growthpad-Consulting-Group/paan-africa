import { buildMetadata } from '@/shared/lib/seo';
import ExpressionOfInterestPage from '@/features/membership/components/ExpressionOfInterestPage';

export const metadata = buildMetadata({
  path: '/expression-of-interest',
  title: 'Join PAAN | Agency Expression of Interest',
  description: 'Apply to become a partner agency with the Pan-African Agency Network (PAAN). Submit your Expression of Interest to join exclusive opportunities in SEO, and App Store Optimization across Africa.',
  keywords: 'Expression of Interest, PAAN, opportunities, submit, application, Africa, agency, SEO, ASO',
  canonicalUrl: 'https://paan.africa/expression-of-interest',
});

export default function Page() {
  return <ExpressionOfInterestPage />;
}
