import type { Metadata } from 'next';
import TrendsDashboard from '@/features/trends/components/TrendsDashboard';

const image = 'https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296';

export const metadata: Metadata = {
  title: 'Creative Trends Dashboard - PAAN Africa',
  description:
    "Discover trending design styles, viral campaigns, and popular hashtags in African creative industries. Stay ahead with real-time insights from PAAN's Creative Trends Dashboard.",
  keywords:
    'creative trends, design trends, African creatives, viral campaigns, trending hashtags, design inspiration, advertising trends',
  alternates: { canonical: 'https://paan.africa/trends-dashboard' },
  openGraph: {
    title: 'Creative Trends Dashboard - PAAN Africa',
    description: 'Discover trending design styles, viral campaigns, and popular hashtags in African creative industries.',
    type: 'website',
    url: 'https://paan.africa/trends-dashboard',
    images: [image],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creative Trends Dashboard - PAAN Africa',
    description: 'Discover trending design styles, viral campaigns, and popular hashtags in African creative industries.',
    images: [image],
  },
};

export default function Page() {
  return (
    <main>
      <TrendsDashboard />
    </main>
  );
}
