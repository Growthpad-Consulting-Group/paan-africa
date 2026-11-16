import { buildMetadata } from '@/lib/seo';
import MaExpressionOfInterestPage from '@/features/membership/components/MaExpressionOfInterestPage';

export const metadata = buildMetadata({
  path: '/ma-expression-of-interest',
  title: 'Confidential Expression of Interest | PAAN M&A',
  description: 'Confidential EOI for PAAN Members exploring M&A opportunities.',
});

export default function Page() {
  return <MaExpressionOfInterestPage />;
}
