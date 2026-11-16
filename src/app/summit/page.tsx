import { buildMetadata } from '@/lib/seo';
import {
  getSummitEdition, getSummitSessions, getSummitSpeakers, getSummitTracks, DEFAULT_EDITION,
  type SummitEdition, type SummitSession, type SummitSpeaker, type SummitTrack,
} from '@/features/summit/lib/summitService';
import SummitPage from '@/features/summit/components/SummitPage';

export const revalidate = 3600;

export const metadata = buildMetadata({
  path: '/summit',
  title: 'The Africa Borderless Creative Economy Summit 2026 | Nairobi',
  description: "Join the inaugural PAAN Summit in Nairobi, Kenya, a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth. Connect with industry leaders, explore cutting-edge trends, and shape the future of African creativity and technology.",
  keywords: 'PAAN Summit 2026, African creative summit, tech conference Africa, Nairobi summit, Pan-African events, African innovation, creative tech Africa, agency summit Africa, creative leadership, tech leadership, African business summit, innovation conference',
  image: 'https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932',
  ogTitle: 'PAAN Summit 2026 | Nairobi',
  ogDescription: "Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth.",
  twitterTitle: 'PAAN Summit 2026 | Creative & Tech Conference',
  twitterDescription: "Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth.",
});

export default async function Page() {
  let speakers: SummitSpeaker[] = [];
  let sessions: SummitSession[] = [];
  let tracks: SummitTrack[] = [];
  let edition: SummitEdition = DEFAULT_EDITION;
  try {
    [speakers, sessions, tracks, edition] = await Promise.all([
      getSummitSpeakers(), getSummitSessions(), getSummitTracks(), getSummitEdition(),
    ]);
  } catch (error) {
    console.error('Error loading summit content from Sanity:', error);
  }
  return <SummitPage speakers={speakers} sessions={sessions} tracks={tracks} edition={edition} />;
}
