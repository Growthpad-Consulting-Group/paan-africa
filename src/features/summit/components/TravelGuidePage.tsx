"use client";

import { useRef } from "react";
import SummitCancelledBanner from "@/features/summit/components/SummitCancelledBanner";
import TravelGuideHeader from "@/shared/layouts/travel-guide-header";
import SummitFooter from "@/shared/layouts/summit-footer";
import ScrollToTop from "@/shared/components/ScrollToTop";
import TicketPurchaseButton from "@/components/TicketPurchaseButton";
import TravelGuideHero from "@/features/summit/components/TravelGuideHero";
import SummitExperiencesSection from "@/features/summit/components/SummitExperiencesSection";
import VisaRequirementsSection from "@/features/summit/components/VisaRequirementsSection";
import AccommodationSection from "@/features/summit/components/AccommodationSection";
import ArrivalTransportSection from "@/features/summit/components/ArrivalTransportSection";
import TravelEssentialsSection from "@/features/summit/components/TravelEssentialsSection";
import PackSmartSection from "@/features/summit/components/PackSmartSection";
import ExploreNairobiSection from "@/features/summit/components/ExploreNairobiSection";
import NeedAssistanceSection from "@/features/summit/components/NeedAssistanceSection";
import PatternDivider from "@/features/summit/components/PatternDivider";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { generateEventSchema } from "@/utils/structuredData";
import { getSummitEdition, getSummitExperiences, DEFAULT_EDITION, type SummitEdition, type SummitExperience } from "@/features/summit/lib/summitService";

type Props = { summitExperiences: SummitExperience[]; edition: SummitEdition };

const TravelGuidePage = ({ summitExperiences = [], edition = DEFAULT_EDITION }: Props) => {
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    objectives: useRef<HTMLDivElement>(null),
    highlights: useRef<HTMLDivElement>(null),
    themes: useRef<HTMLDivElement>(null),
    sessions: useRef<HTMLDivElement>(null),
    program: useRef<HTMLDivElement>(null),
    whoShouldAttend: useRef<HTMLDivElement>(null),
    tickets: useRef<HTMLDivElement>(null),
    events: useRef<HTMLDivElement>(null),
    contactUs: useRef<HTMLDivElement>(null),
  };

  useSectionObserver(sectionRefs);

  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "PAAN Summit 2026 Travel Guide | Nairobi, Kenya - Visa, Hotels & Transport",
              "description": "Complete travel guide for PAAN Summit 2026 in Nairobi, Kenya. Get visa requirements, accommodation options, transport details, and essential travel tips for your visit to Africa's premier creative and tech conference.",
              "url": "https://paan.africa/summit/travel-guide",
              "image": [
                "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/travel-guide-parallax-image.png",
                "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932"
              ],
              "mainEntity": {
              "@type": "Event",
                "name": "PAAN Summit 2026 - Africa's Premier Creative & Tech Leadership Conference",
                "startDate": edition.startDate,
                "endDate": edition.endDate,
              "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                  "name": edition.venueName,
                "address": {
                  "@type": "PostalAddress",
                    "streetAddress": edition.streetAddress,
                  "addressLocality": edition.city,
                  "addressRegion": edition.region,
                  "postalCode": edition.postalCode,
                  "addressCountry": edition.country
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": edition.latitude,
                    "longitude": edition.longitude
                  }
                },
                "organizer": { 
                  "@type": "Organization", 
                  "name": "Pan-African Agency Network (PAAN)", 
                  "url": "https://paan.africa"
                }
              },
              "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://paan.africa"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Summit",
                    "item": "https://paan.africa/summit"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Travel Guide",
                    "item": "https://paan.africa/summit/travel-guide"
                  }
                ]
              },
              "about": [
                {
                  "@type": "Thing",
                  "name": "Nairobi Travel Information",
                  "description": "Essential travel information for visiting Nairobi, Kenya"
                },
                {
                  "@type": "Thing", 
                  "name": "Kenya Visa Requirements",
                  "description": "Visa and entry requirements for Kenya"
                },
                {
                  "@type": "Thing",
                  "name": "Nairobi Accommodation",
                  "description": "Hotel and accommodation options in Nairobi"
                }
              ],
              "keywords": "PAAN Summit travel guide, Nairobi travel guide, Kenya visa requirements, Nairobi accommodation, PAAN Summit hotels, Nairobi transport, Kenya travel tips, African conference travel, business travel Kenya, Nairobi conference guide"
            }),
          }}
        />

       <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
         <TravelGuideHeader navLinkColor='text-white' />

        <TravelGuideHero sectionRefs={sectionRefs} edition={edition} />

        {/* Spacer to maintain layout flow */}
        <div className="h-screen"></div>

         {/* Visa requirements section */}
         <VisaRequirementsSection />

         {/* Accommodation section */}
         <AccommodationSection />

         {/* Arrival & Transport */}
        <ArrivalTransportSection />
      
         {/* Travel Essentials section */}
         <TravelEssentialsSection />

         {/* pack smart section */}
         <PackSmartSection />

        {/* Summit Experiences Section */}
        <SummitExperiencesSection summitExperiences={summitExperiences} />

         <ExploreNairobiSection />

         {/* Parallax Section */}
         <NeedAssistanceSection />
         <PatternDivider />
        <SummitFooter />
        <ScrollToTop />
        <SummitCancelledBanner />
      </main>
    </>
  );
};


export default TravelGuidePage;
