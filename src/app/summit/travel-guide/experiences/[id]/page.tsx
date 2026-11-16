import { cache } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getSummitExperience, getSummitExperiences } from '@/features/summit/lib/summitService';
import ExperienceBookingPage from '@/features/summit/components/ExperienceBookingPage';

export const revalidate = 3600;
export const dynamicParams = true;

const loadExperience = cache(getSummitExperience);

export async function generateStaticParams() {
  const experiences = await getSummitExperiences();
  return experiences.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const experience = await loadExperience(id);
  if (!experience) return {};
  return buildMetadata({
    path: `/summit/travel-guide/experiences/${id}`,
    title: `${experience.title} - PAAN Summit 2026 Travel Experiences`,
    description: experience.description ?? undefined,
    keywords: `${experience.title}, PAAN Summit 2026, Nairobi tours, travel experiences`,
  });
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = await loadExperience(id);
  if (!experience) notFound();
  return <ExperienceBookingPage experience={experience} />;
}
