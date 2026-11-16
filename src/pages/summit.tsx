import { useRef, useState } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import SEO from "@/components/SEO";
import Header from "../layouts/summit-header";
import SummitFooter from "@/layouts/summit-footer";
import ScrollToTop from "@/components/ScrollToTop";
import SummitAgenda from "@/components/SummitAgenda";
import PartnerWithUsModal from "@/components/PartnerWithUsModal";
import ExhibitionApplicationModal from "@/components/ExhibitionApplicationModal";
import PaystackScript from "@/components/PaystackScript";
import SummitCancelledBanner from "@/components/summit/SummitCancelledBanner";
import CountdownBanner from "@/components/summit/CountdownBanner";
import ObjectivesSection from "@/components/summit/ObjectivesSection";
import AtAGlanceSection from "@/components/summit/AtAGlanceSection";
import TracksSection from "@/components/summit/TracksSection";
import SummitHero from "@/components/summit/SummitHero";
import AboutSection from "@/components/summit/AboutSection";
import WhoShouldJoinSection from "@/components/summit/WhoShouldJoinSection";
import DealsAndStatsSection from "@/components/summit/DealsAndStatsSection";
import SpeakersSection from "@/components/summit/SpeakersSection";
import WhosInTheRoomSection from "@/components/summit/WhosInTheRoomSection";
import BeyondSessionsSection from "@/components/summit/BeyondSessionsSection";
import AwardsSection from "@/components/summit/AwardsSection";
import ExhibitionSection from "@/components/summit/ExhibitionSection";
import TicketsSection from "@/components/summit/TicketsSection";
import PartnersSection from "@/components/summit/PartnersSection";
import PlanYourTripSection from "@/components/summit/PlanYourTripSection";
import { useFixedHeader, handleScroll } from "../../utils/scrollUtils";
import { useSectionObserver } from "@/hooks/useSectionObserver";
import { useCountdown } from "@/hooks/useCountdown";
import { generateEventSchema } from "@/utils/structuredData";
import {
  getSummitEdition, getSummitSessions, getSummitSpeakers, getSummitTracks, DEFAULT_EDITION,
  type SummitEdition, type SummitSession, type SummitSpeaker, type SummitTrack,
} from "@/lib/summitService";

type Props = {
  speakers: SummitSpeaker[];
  sessions: SummitSession[];
  tracks: SummitTrack[];
  edition: SummitEdition;
};

const SummitPage = ({ speakers = [], sessions = [], tracks = [], edition = DEFAULT_EDITION }: Props) => {
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

  const isFixed = useFixedHeader();
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [showExhibitionModal, setShowExhibitionModal] = useState(false);

  // Countdown to the start of the summit (date comes from the Summit Edition document)
  const timeLeft = useCountdown(edition.startDate);

  useSectionObserver(sectionRefs);

  return (
    <>
      <SEO
        title="The Africa Borderless Creative Economy Summit 2026 | Nairobi"
        description="Join the inaugural PAAN Summit in Nairobi, Kenya, a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth. Connect with industry leaders, explore cutting-edge trends, and shape the future of African creativity and technology."
        keywords="PAAN Summit 2026, African creative summit, tech conference Africa, Nairobi summit, Pan-African events, African innovation, creative tech Africa, agency summit Africa, creative leadership, tech leadership, African business summit, innovation conference"
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932"
        ogTitle="PAAN Summit 2026 | Nairobi"
        ogDescription="Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth."
        twitterTitle="PAAN Summit 2026 | Creative & Tech Conference"
        twitterDescription="Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth."
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateEventSchema({
                name: "PAAN Summit 2026 - Africa's Premier Creative & Tech Leadership Conference",
                alternateName: "PAAN Inaugural Summit 2026",
                description: "Join the inaugural PAAN Summit in Nairobi, Kenya — a groundbreaking event uniting Africa's top creative and tech leaders for three days of innovation, collaboration, and growth. Connect with industry leaders, explore cutting-edge trends, and shape the future of African creativity and technology.",
                startDate: edition.startDate,
                endDate: edition.endDate,
                eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
                eventStatus: "https://schema.org/EventScheduled",
                location: {
                  name: edition.venueName,
                  streetAddress: edition.streetAddress,
                  city: edition.city,
                  region: edition.region,
                  postalCode: edition.postalCode,
                  country: edition.country,
                  geo: {
                    latitude: edition.latitude,
                    longitude: edition.longitude
                  }
                },
                images: [
                  "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero.webp?updatedAt=1757505455932",
                  "https://paan.africa/assets/images/hero.webp"
                ],
                offers: {
                  url: "https://paan.africa/summit/purchase-ticket",
                  price: "65",
                  currency: "USD",
                  availability: "https://schema.org/InStock",
                  validFrom: "2025-09-01T00:00:00+03:00",
                  description: "Early bird pricing for PAAN Summit 2026"
                },
                performer: {
                  name: "PAAN Africa",
                  url: "https://paan.africa"
                },
                organizer: {
                  name: "Pan-African Agency Network (PAAN)",
                  url: "https://paan.africa",
                  logo: "https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296"
                },
                audience: {
                  audienceType: "Creative and tech professionals, agency leaders, entrepreneurs, innovators"
                },
                keywords: "PAAN Summit 2026, African creative summit, tech conference Africa, Nairobi summit, Pan-African events, African innovation, creative tech Africa, agency summit Africa"
              })
            ),
          }}
        />
      </Head>

      <main className="relative">
        <Header navLinkColor='text-white' />

        {/* Hero section */}
        <SummitHero sectionRefs={sectionRefs} edition={edition} onPartnerClick={() => setShowPartnerModal(true)} />
        
        {/* Countdown Banner - positioned absolutely at the edge between hero and about sections */}
        <div className="absolute top-[100vh] left-0 right-0 z-10 pointer-events-none transform -translate-y-1/2">
          <div className="pointer-events-auto">
            <CountdownBanner timeLeft={timeLeft} />
          </div>
        </div>
        
        {/* About summit section */}
        <AboutSection sectionRef={sectionRefs.about} />

        {/* Summit Objectives */}
        <ObjectivesSection 
          sectionRef={sectionRefs.objectives} 
          handleScroll={handleScroll} 
          isFixed={isFixed} 
        />

        {/* At a glance section */}
        <AtAGlanceSection onPartnerClick={() => setShowPartnerModal(true)} />
      
      
        {/* Program Section */}
        <TracksSection tracks={tracks} sectionRefs={sectionRefs} />

        {/* Summit Agenda Section */}
        <SummitAgenda />

        {/* Who to Join Section */}
        <WhoShouldJoinSection />

        {/* Do business */}
        <DealsAndStatsSection />
        
         {/* speakers section */}
         <SpeakersSection speakers={speakers} />

           {/* Marquee Section */}
         <WhosInTheRoomSection />

         {/* Session section */}
         <BeyondSessionsSection sessions={sessions} />

         {/* PAAN AWARDS SECTION */}
         <AwardsSection />
          {/* Parallax Section */}
          <ExhibitionSection />

          {/* Tickets Section */}
          <TicketsSection />

         {/* Our Partners */}
         <PartnersSection />

         {/* Plan Your Trip */}
         <PlanYourTripSection />
        <SummitFooter />
        <ScrollToTop />
        
        {/* Partner With Us Modal */}
        <PartnerWithUsModal 
          isOpen={showPartnerModal} 
          onClose={() => setShowPartnerModal(false)} 
        />
        
        {/* Exhibition Application Modal */}
        <ExhibitionApplicationModal 
          isOpen={showExhibitionModal} 
          onClose={() => setShowExhibitionModal(false)} 
        />
        <SummitCancelledBanner />
      </main>
      
      {/* Paystack Script */}
      <PaystackScript />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const [speakers, sessions, tracks, edition] = await Promise.all([
      getSummitSpeakers(), getSummitSessions(), getSummitTracks(), getSummitEdition(),
    ]);
    return { props: { speakers, sessions, tracks, edition }, revalidate: 3600 };
  } catch (error) {
    console.error('Error loading summit content from Sanity:', error);
    return { props: { speakers: [], sessions: [], tracks: [], edition: DEFAULT_EDITION }, revalidate: 60 };
  }
};

export default SummitPage;
