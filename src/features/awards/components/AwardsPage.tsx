"use client";

import { useRef, useState } from "react";
import PAANAwardsHeader from "@/shared/layouts/paan-awards-header";
import Footer from "@/shared/layouts/footer";
import ScrollToTop from "@/shared/components/ScrollToTop";
import PaystackScript from "@/components/PaystackScript";
import PAANAwardsApplicationModal from "@/components/PAANAwardsApplicationModal";
import Hero from "@/components/PaanAwardsHero";
import CollaborationSection from "@/features/awards/components/CollaborationSection";
import AwardsAboutSection from "@/features/awards/components/AwardsAboutSection";
import WhyEnterSection from "@/features/awards/components/WhyEnterSection";
import AwardCategoriesBanner from "@/features/awards/components/AwardCategoriesBanner";
import AwardsExplorerSection from "@/features/awards/components/AwardsExplorerSection";
import JudgingTransparencySection from "@/features/awards/components/JudgingTransparencySection";
import WhyParticipateSection from "@/features/awards/components/WhyParticipateSection";
import KeyDatesSection from "@/features/awards/components/KeyDatesSection";
import AwardsCtaSection from "@/features/awards/components/AwardsCtaSection";
import { useSectionObserver } from "@/hooks/useSectionObserver";

const AwardsPage = () => {
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    highlights: useRef<HTMLDivElement>(null),
    themes: useRef<HTMLDivElement>(null),
    sessions: useRef<HTMLDivElement>(null),
    whoShouldAttend: useRef<HTMLDivElement>(null),
    tickets: useRef<HTMLDivElement>(null),
    events: useRef<HTMLDivElement>(null),
    contactUs: useRef<HTMLDivElement>(null),
  };

  useSectionObserver(sectionRefs);

  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "PAAN Awards 2026 - Celebrating Excellence in African Creative & Tech Industry",
              "alternateName": "PAAN Creative & Tech Awards 2026",
              "startDate": "2026-09-24T19:00:00+03:00",
              "endDate": "2026-09-24T23:00:00+03:00",
              "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                "name": "TBC",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "TBC",
                  "addressLocality": "Nairobi",
                  "addressRegion": "Nairobi County",
                  "postalCode": "00100",
                  "addressCountry": "KE"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "-1.2921",
                  "longitude": "36.8219"
                }
              },
              "image": [
                "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png",
                "https://paan.africa/assets/images/hero.webp"
              ],
              "description": "Join the prestigious PAAN Awards 2026, recognizing outstanding achievements in Africa's creative and tech industry. Celebrate innovation, creativity, and excellence across agencies, freelancers, and digital professionals shaping Africa's future.",
              "offers": {
                "@type": "Offer",
                "url": "https://paan.africa/paan-awards",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-09-01T00:00:00+03:00",
                "description": "Free attendance for PAAN Awards 2026 ceremony"
              },
              "performer": { 
                "@type": "Organization", 
                "name": "PAAN Africa",
                "url": "https://paan.africa"
              },
              "organizer": { 
                "@type": "Organization", 
                "name": "Pan-African Agency Network (PAAN)", 
                "url": "https://paan.africa",
                "logo": "https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Creative professionals, tech industry leaders, agencies, freelancers, digital innovators, award nominees and winners"
              },
              "eventSchedule": {
                "@type": "Schedule",
                "startTime": "19:00",
                "endTime": "23:00",
                "duration": "PT4H"
              },
              "award": {
                "@type": "Award",
                "name": "PAAN Awards 2026",
                "description": "Annual awards recognizing excellence in African creative and tech industry",
                "sponsor": {
                  "@type": "Organization",
                  "name": "Pan-African Agency Network (PAAN)"
                }
              },
              "keywords": "PAAN Awards 2026, African creative awards, tech industry awards, creative excellence Africa, digital innovation awards, African agency awards, freelancer recognition, creative industry awards, tech leadership awards, African business awards"
            }),
          }}
        />

      <main className="relative">
        <PAANAwardsHeader 
          navLinkColor='text-white' 
          onApplyNowClick={() => setIsApplicationModalOpen(true)}
        />

        <Hero sectionRefs={sectionRefs} scrollToSection={scrollToSection} onApplyNowClick={() => setIsApplicationModalOpen(true)} />

        {/* Our Partners */}
        <CollaborationSection />
     
        {/* About the Awards */}
        <AwardsAboutSection sectionRefs={sectionRefs} setIsApplicationModalOpen={setIsApplicationModalOpen} />

        {/* New Detailed Information Section */}
        <WhyEnterSection />

         {/* Award Categories Overview */}
        <AwardCategoriesBanner setIsApplicationModalOpen={setIsApplicationModalOpen} />

        {/* PAAN AWARDS SECTION */}
      <AwardsExplorerSection />
        
        {/* Transparency Section */}
        <JudgingTransparencySection />

        {/* Categories Section */}
        <WhyParticipateSection setIsApplicationModalOpen={setIsApplicationModalOpen} scrollToSection={scrollToSection} isApplicationModalOpen={isApplicationModalOpen} />

        {/* Key Dates Section */}
        <KeyDatesSection />         

        {/* Parallax Section */}
        <AwardsCtaSection setIsApplicationModalOpen={setIsApplicationModalOpen} />         

        <Footer />
        <ScrollToTop />
        
        {/* Paystack Script */}
        <PaystackScript />
        
        {/* Application Modal */}
        <PAANAwardsApplicationModal 
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
        />
      </main>
    </>
  );
};

export default AwardsPage;
