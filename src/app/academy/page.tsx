import { buildMetadata } from '@/shared/lib/seo';
import AcademyPage from '@/features/academy/components/AcademyPage';

export const metadata = buildMetadata({
  path: '/academy',
  title: 'PAAN Academy | Africa’s Online Creative Education Platform',
  description: 'Learn digital marketing, creative strategy, design, and tech skills with PAAN Academy — Africa’s premier online learning hub for creative professionals and agencies. Get certified with industry-relevant courses, mentorship, and exclusive content built for African talent. Start your journey in digital education tailored for Africa’s creative and tech future.',
  keywords: 'Africa digital education, learn digital marketing Africa, creative education platform, online learning for African creatives, PAAN Academy, African tech training, Skillshare alternative Africa, marketing agency training, digital skills for creatives, African online courses, creative certification Africa',
});

export default function Page() {
  return <AcademyPage />;
}
