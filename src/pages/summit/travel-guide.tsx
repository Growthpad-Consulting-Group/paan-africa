import { useRef } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import SEO from "@/components/SEO";
import SummitCancelledBanner from "@/components/summit/SummitCancelledBanner";
import TravelGuideHeader from "@/shared/layouts/travel-guide-header";
import SummitFooter from "@/shared/layouts/summit-footer";
import ScrollToTop from "@/shared/components/ScrollToTop";
import TicketPurchaseButton from "@/components/TicketPurchaseButton";
import TravelGuideHero from "@/components/summit/TravelGuideHero";
import SummitExperiencesSection from "@/components/summit/SummitExperiencesSection";
import VisaRequirementsSection from "@/components/summit/VisaRequirementsSection";
import AccommodationSection from "@/components/summit/AccommodationSection";
import ArrivalTransportSection from "@/components/summit/ArrivalTransportSection";
import TravelEssentialsSection from "@/components/summit/TravelEssentialsSection";
import PackSmartSection from "@/components/summit/PackSmartSection";
import ExploreNairobiSection from "@/components/summit/ExploreNairobiSection";
import NeedAssistanceSection from "@/components/summit/NeedAssistanceSection";
import PatternDivider from "@/components/summit/PatternDivider";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { generateEventSchema } from "@/utils/structuredData";
import { getSummitEdition, getSummitExperiences, DEFAULT_EDITION, type SummitEdition, type SummitExperience } from "@/lib/summitService";

type Props = { summitExperiences: SummitExperience[]; edition: SummitEdition };

const TravelGuide = ({ summitExperiences = [], edition = DEFAULT_EDITION }: Props) => {
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
      <SEO
        title="PAAN Summit Travel Guide | Nairobi"
        description="Complete travel guide for PAAN Summit 2026 in Nairobi, Kenya. Get visa requirements, accommodation options, transport details, and essential travel tips for your visit to Africa's premier creative and tech conference."
        keywords="PAAN Summit travel guide, Nairobi travel guide, Kenya visa requirements, Nairobi accommodation, PAAN Summit hotels, Nairobi transport, Kenya travel tips, African conference travel, business travel Kenya, Nairobi conference guide"
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/travel-guide-parallax-image.png"
        ogTitle="PAAN Summit 2026 Travel Guide | Nairobi, Kenya - Visa, Hotels & Transport"
        ogDescription="Complete travel guide for PAAN Summit 2026 in Nairobi, Kenya. Get visa requirements, accommodation options, transport details, and essential travel tips for your visit to Africa's premier creative and tech conference."
        twitterTitle="PAAN Summit Travel Guide | Nairobi"
        twitterDescription="Complete travel guide for PAAN Summit 2026 in Nairobi, Kenya. Get visa requirements, accommodation options, transport details, and essential travel tips for your visit to Africa's premier creative and tech conference."
      />
      <Head>
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
      </Head>

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

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const [summitExperiences, edition] = await Promise.all([getSummitExperiences(), getSummitEdition()]);
    return { props: { summitExperiences, edition }, revalidate: 3600 };
  } catch (error) {
    console.error('Error loading travel experiences from Sanity:', error);
    return { props: { summitExperiences: [], edition: DEFAULT_EDITION }, revalidate: 60 };
  }
};

export default TravelGuide;
