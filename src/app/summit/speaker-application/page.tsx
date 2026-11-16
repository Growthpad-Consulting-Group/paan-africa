import { buildMetadata } from '@/shared/lib/seo';
import SpeakerApplicationPage from '@/features/summit/components/SpeakerApplicationPage';

export const metadata = buildMetadata({
  path: '/summit/speaker-application',
  title: 'Speaker Application | PAAN Summit 2026',
  description: "Apply to speak at the Africa Borderless Creative Economy Summit 2026. Share your insights and help advance Africa's creative and digital economies.",
  keywords: 'PAAN Summit 2026, speaker application, African creative summit, tech conference Africa, speaking opportunities',
});

export default function Page() {
  return <SpeakerApplicationPage />;
}
