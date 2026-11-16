import Image from 'next/image';
import Link from 'next/link';
import type { EventItem } from '@/features/events/lib/eventService';

export default function RelatedEvents({ relatedEvents }: { relatedEvents: EventItem[] }) {
  return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-paan-dark-blue text-center mb-12">
            Related Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedEvents
              .map((relatedEvent) => (
                <div key={relatedEvent.sanityId} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-2 line-clamp-2">
                      {relatedEvent.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {new Date(relatedEvent.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <Link
                      href={`/events/${relatedEvent.slug}`}
                      className="text-paan-red hover:text-paan-red/80 font-semibold text-sm transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/events"
              className="bg-paan-dark-blue hover:bg-paan-dark-blue/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              View All Events
            </Link>
          </div>
        </div>
      </div>
  );
}
