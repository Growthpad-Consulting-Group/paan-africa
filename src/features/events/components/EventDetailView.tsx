import Link from 'next/link';
import { Icon } from '@/shared/components/Icon';
import Header from '@/shared/layouts/header';
import Footer from '@/shared/layouts/footer';
import EventDetail from '@/features/events/components/EventDetail';
import RelatedEvents from '@/features/events/components/RelatedEvents';
import type { EventItem } from '@/features/events/lib/eventService';

export default function EventDetailView({ event, relatedEvents }: { event: EventItem; relatedEvents: EventItem[] }) {
  const isPast = event.status === 'past';

  return (
    <div className='relative'>
      <Header navLinkColor="text-gray-950" />

      <div className="pt-32 pb-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-paan-red transition-colors">
              Home
            </Link>
            <Icon icon="mdi:chevron-right" className="w-4 h-4" />
            <Link href="/events" className="hover:text-paan-red transition-colors">
              Events
            </Link>
            <Icon icon="mdi:chevron-right" className="w-4 h-4" />
            <span className="text-paan-dark-blue font-medium">{event.title}</span>
          </nav>
        </div>
      </div>

      {/* Event Detail Content */}
      <div className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <EventDetail event={event} isPast={isPast} />
        </div>
      </div>

      <RelatedEvents relatedEvents={relatedEvents} />

      <Footer />
    </div>
  );
}
