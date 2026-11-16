import { buildMetadata } from '@/shared/lib/seo';
import AboutPage from '@/features/about/components/AboutPage';

export const metadata = buildMetadata({
  path: '/about',
  title: "About PAAN | Africa's Agency Network & Mission",
  description: "Learn about the Pan-African Agency Network (PAAN) - a collaborative ecosystem uniting independent creative and tech agencies across Africa. Discover our mission to transform a fragmented industry into a united creative force, our values, and how we're shaping Africa's creative and technological future.",
  keywords: 'about PAAN, Pan-African Agency Network about, PAAN mission, PAAN vision, PAAN values, African agency network, PAAN organization, PAAN history, PAAN team, African creative network, PAAN purpose, PAAN goals, African tech network, PAAN community, about African agencies, PAAN story, PAAN background',
});

export default function Page() {
  return <AboutPage />;
}
