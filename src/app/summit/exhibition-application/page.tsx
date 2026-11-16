import { buildMetadata } from '@/lib/seo';
import ExhibitionApplicationPage from '@/features/summit/components/ExhibitionApplicationPage';

export const metadata = buildMetadata({
  path: '/summit/exhibition-application',
  title: 'Exhibition Application | PAAN Summit 2026 - Showcase Your Brand',
  description: "Apply to exhibit at PAAN Summit 2026. Showcase your brand to Africa's leading creative and tech professionals. Secure your booth space and connect with industry leaders.",
  keywords: 'PAAN Summit exhibition, booth application, showcase brand, creative tech conference, Africa exhibition, PAAN Summit 2026, exhibition space, booth booking',
  image: 'https://ik.imagekit.io/nkmvdjnna/PAAN/summit/exhibition-bg.jpg',
  ogTitle: 'Exhibition Application | PAAN Summit 2026 - Showcase Your Brand',
  ogDescription: "Apply to exhibit at PAAN Summit 2026. Showcase your brand to Africa's leading creative and tech professionals. Secure your booth space and connect with industry leaders.",
  twitterTitle: 'Exhibition Application | PAAN Summit 2026 - Showcase Your Brand',
  twitterDescription: "Apply to exhibit at PAAN Summit 2026. Showcase your brand to Africa's leading creative and tech professionals. Secure your booth space and connect with industry leaders.",
});

export default function Page() {
  return <ExhibitionApplicationPage />;
}
