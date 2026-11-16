import { cache } from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getMasterclassBySlug,
  getMasterclassSlugById,
  getMasterclassSlugs,
} from '@/features/masterclasses/lib/masterclassService';
import MasterclassDetail from '@/features/masterclasses/components/MasterclassDetail';

export const revalidate = 3600;
export const dynamicParams = true;

const loadMasterclass = cache(getMasterclassBySlug);

export async function generateStaticParams() {
  const slugs = await getMasterclassSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (/^\d+$/.test(slug)) return {};
  const m = await loadMasterclass(slug);
  if (!m) return { title: 'PAAN Masterclass' };

  const title = `${m.title} - PAAN Masterclass`;
  const url = `https://paan.africa/masterclasses/${m.slug}`;
  const course = (value: string | null | undefined) => value ?? undefined;
  return {
    title,
    description: m.description,
    keywords: `PAAN, masterclass, ${m.category}, ${m.instructor.name}, advertising, marketing, professional development, ${m.level}`,
    authors: [{ name: 'Pan-African Advertising Network' }],
    robots: 'index, follow',
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title,
      description: m.description,
      images: [m.image],
      url,
      siteName: 'PAAN - Pan-African Advertising Network',
      locale: 'en_US',
    },
    twitter: { card: 'summary_large_image', site: '@PAAN_Africa', creator: '@PAAN_Africa', title, description: m.description, images: [m.image] },
    other: {
      'course:instructor': course(m.instructor.name) ?? '',
      'course:instructor_title': course(m.instructor.title) ?? '',
      'course:date': course(m.date) ?? '',
      'course:time': course(m.time) ?? '',
      'course:format': course(m.format) ?? '',
      'course:level': course(m.level) ?? '',
      'course:category': course(m.category) ?? '',
      'price:member': `${m.memberPrice} ${m.currency}`,
      'price:non-member': `${m.nonMemberPrice} ${m.currency}`,
      currency: m.currency,
      'event:date': course(m.date) ?? '',
      'event:time': course(m.time) ?? '',
      'event:format': course(m.format) ?? '',
    },
  };
}

export default async function MasterclassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Old links were /masterclasses/<number>: permanently redirect them to the slug URL.
  if (/^\d+$/.test(slug)) {
    const target = await getMasterclassSlugById(Number(slug));
    if (target) permanentRedirect(`/masterclasses/${target}`);
    notFound();
  }
  const masterclass = await loadMasterclass(slug);
  if (!masterclass) notFound();
  return <MasterclassDetail masterclass={masterclass} />;
}
