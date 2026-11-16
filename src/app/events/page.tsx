import { buildMetadata } from '@/lib/seo';
import { translate as t } from '@/hooks/useTranslations';
import { getEvents } from '@/features/events/lib/eventService';
import Header from '@/shared/layouts/standard-header';
import Footer from '@/shared/layouts/footer';
import EventsHero from '@/features/events/components/EventsHero';
import EventsBrowser from '@/features/events/components/EventsBrowser';
import EventsCta from '@/features/events/components/EventsCta';

export const revalidate = 3600;

export const metadata = buildMetadata({
  path: '/events',
  title: t('events.seo.title'),
  description: t('events.seo.description'),
  keywords: t('events.seo.keywords'),
});

export default async function EventsPage() {
  const { upcoming, past } = await getEvents();
  return (
    <div className="relative">
      <Header navLinkColor="text-gray-950" />
      <EventsHero upcomingCount={upcoming.length} />
      <EventsBrowser upcoming={upcoming} past={past} />
      <EventsCta />
      <Footer />
    </div>
  );
}
