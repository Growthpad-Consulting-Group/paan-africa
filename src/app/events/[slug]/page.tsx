import { cache } from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata } from '@/shared/lib/seo';
import {
  getEventBySlug,
  getEventSlugByLegacyId,
  getEventSlugs,
  getRelatedEvents,
} from '@/features/events/lib/eventService';
import EventDetailView from '@/features/events/components/EventDetailView';

export const revalidate = 3600;
export const dynamicParams = true;

const loadEvent = cache(getEventBySlug);

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (/^\d+$/.test(slug)) return {};
  const event = await loadEvent(slug);
  if (!event) return { title: 'Event Not Found | Browse PAAN Events', description: 'The requested event could not be found.' };
  return buildMetadata({
    path: `/events/${slug}`,
    title: `${event.title} | PAAN Events`,
    description: event.description,
    keywords: `${event.title}, ${event.category}, PAAN events, ${event.location}`,
  });
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Old links were /events/<number>: permanently redirect them to the slug URL.
  if (/^\d+$/.test(slug)) {
    const target = await getEventSlugByLegacyId(Number(slug));
    if (target) permanentRedirect(`/events/${target}`);
    notFound();
  }
  const event = await loadEvent(slug);
  if (!event) notFound();
  return <EventDetailView event={event} relatedEvents={await getRelatedEvents(event)} />;
}
