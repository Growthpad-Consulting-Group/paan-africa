"use client";

import { useRef } from "react";
import SummitCancelledBanner from "@/features/summit/components/SummitCancelledBanner";
import TravelGuideHeader from "@/shared/layouts/travel-guide-header";
import SummitFooter from "@/shared/layouts/summit-footer";
import ScrollToTop from "@/shared/components/ScrollToTop";
import ExhibitorsHero from "@/features/summit/components/ExhibitorsHero";
import ExhibitionFloorSection from "@/features/summit/components/ExhibitionFloorSection";
import ExhibitionPackagesSection from "@/features/summit/components/ExhibitionPackagesSection";
import WhyExhibitSection from "@/features/summit/components/WhyExhibitSection";
import ExhibitCtaSection from "@/features/summit/components/ExhibitCtaSection";
import PatternDivider from "@/features/summit/components/PatternDivider";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { getExhibitorBooths, getSummitEdition, DEFAULT_EDITION, type ExhibitorBooth, type SummitEdition } from "@/features/summit/lib/summitService";

type Props = { booths: ExhibitorBooth[]; edition: SummitEdition };

const ExhibitorsPage = ({ booths = [], edition = DEFAULT_EDITION }: Props) => {
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

  return (
    <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "PAAN Summit 2026 Exhibition Floor Plan | Book Your Booth Space",
              "description": "Explore the PAAN Summit 2026 exhibition floor plan with live booth availability. Book standard 3×3m booths (USD 1,000), 3×6m booths (USD 1,800), or custom pavilions. Connect with 500+ industry leaders at Africa's premier creative and tech conference.",
              "url": "https://paan.africa/summit/exhibitors",
              "image": [
                "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/exhibition.png",
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
                    "name": "ExhibitorsPage",
                    "item": "https://paan.africa/summit/exhibitors"
                  }
                ]
              },
              "about": [
                {
                  "@type": "Thing",
                  "name": "Exhibition Floor Plan",
                  "description": "Interactive floor plan showing booth availability and pricing"
                },
                {
                  "@type": "Thing", 
                  "name": "Booth Booking",
                  "description": "Standard and premium booth packages for PAAN Summit 2026"
                },
                {
                  "@type": "Thing",
                  "name": "Exhibition Packages",
                  "description": "Physical and virtual exhibition options with pricing"
                }
              ],
              "keywords": "PAAN Summit exhibition, exhibition floor plan, booth booking, PAAN Summit 2026 exhibitors, Nairobi conference exhibition, creative tech conference, African business exhibition, summit booth space, exhibition packages, PAAN Summit booths"
            }),
          }}
        />

       <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
         <TravelGuideHeader navLinkColor='text-white' />

        <ExhibitorsHero sectionRefs={sectionRefs} />

        {/* Spacer to maintain layout flow */}
        <div className="h-[75vh]"></div>

         {/* Floor plan section */}
         <ExhibitionFloorSection booths={booths} />

        {/* Pricing & Information Cards */}
        <ExhibitionPackagesSection />

        {/* Exhibition Benefits Section */}
        <WhyExhibitSection />

        {/* Call to Action Section */}
        <ExhibitCtaSection />
        <PatternDivider />
        <SummitFooter />
        <ScrollToTop />
        
        <SummitCancelledBanner />
      </main>
    </>
  );
};


export default ExhibitorsPage;
