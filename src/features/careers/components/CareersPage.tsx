"use client";

import { useRef, useState } from "react";
import Header from "@/shared/layouts/standard-header";
import Footer from "@/shared/layouts/footer";
import ScrollToTop from "@/shared/components/ScrollToTop";
import { useSectionObserver } from "@/shared/hooks/useSectionObserver";
import type { JobPosting } from "@/features/careers/lib/careerService";
import CareerApplicationModal from "@/features/careers/components/CareerApplicationModal";
import Hero from "@/features/careers/components/Hero";
import OpenPositions from "@/features/careers/components/OpenPositions";
import RFPBanner from "@/features/careers/components/RFPBanner";
import WhyJoinUs from "@/features/careers/components/WhyJoinUs";
import Culture from "@/features/careers/components/Culture";
import ApplicationProcess from "@/features/careers/components/ApplicationProcess";

export default function CareersPage({ positions = [] }: { positions?: JobPosting[] }) {
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    openPositions: useRef<HTMLDivElement>(null),
    whyJoinUs: useRef<HTMLDivElement>(null),
    culture: useRef<HTMLDivElement>(null),
    application: useRef<HTMLDivElement>(null),
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState('');
  const [expandedJob, setExpandedJob] = useState<number | null>(null);

  useSectionObserver(sectionRefs);

  // Called with a position slug from a card's Apply button (preselects it), or with a click event from the generic buttons
  const openModal = (slug?: unknown) => {
    setModalPosition(typeof slug === 'string' ? slug : '');
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="sm:px-0 sm:pt-0 relative">
      <Header navLinkColor="text-white" transparent={true} />
      <Hero sectionRefs={sectionRefs} />
      <OpenPositions sectionRefs={sectionRefs} expandedJob={expandedJob} setExpandedJob={setExpandedJob} openModal={openModal} positions={positions} />
      <RFPBanner />
      <WhyJoinUs sectionRefs={sectionRefs} />
      <Culture sectionRefs={sectionRefs} />
      <ApplicationProcess sectionRefs={sectionRefs} openModal={openModal} />
      <Footer />
      <CareerApplicationModal isOpen={isModalOpen} onClose={closeModal} positions={positions} defaultPosition={modalPosition} />
      <ScrollToTop />
    </main>
  );
}
