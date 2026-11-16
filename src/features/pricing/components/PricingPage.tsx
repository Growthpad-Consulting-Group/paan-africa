"use client";

// pages/index.js
import Header from "@/shared/layouts/standard-header";
import Footer from "@/shared/layouts/footer";
import { useRef } from "react";
import { useSectionObserver } from "@/shared/hooks/useSectionObserver";
import MemberTiers from "@/features/pricing/components/MemberTiers";
import ScrollToTop from "@/shared/components/ScrollToTop";

const PricingPage = () => {
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    aboutUs: useRef<HTMLDivElement>(null),
    ourMission: useRef<HTMLDivElement>(null),
    whyJoinUs: useRef<HTMLDivElement>(null),
    membership: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    events: useRef<HTMLDivElement>(null),
    contactUs: useRef<HTMLDivElement>(null),
  };

  useSectionObserver(sectionRefs);

  return (
    <>

      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <Header />
        <MemberTiers />
        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
};

export default PricingPage;
