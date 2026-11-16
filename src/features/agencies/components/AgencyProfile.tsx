"use client";

import Header from "@/shared/layouts/standard-header";
import Image from "next/image";
import Footer from "@/shared/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '@/shared/lib/scrollUtils';
import ScrollToTop from "@/shared/components/ScrollToTop";
import ConnectingDots from "@/shared/components/ConnectingDots";
import { motion } from "framer-motion";
import { Icon } from '@iconify/react';
import { useAppTranslations } from '@/shared/hooks/useTranslations';
import { localize, type Agency, type Localized } from '@/features/agencies/lib/agencyService';
import { useSectionObserver } from '@/shared/hooks/useSectionObserver';
import { useConnectingDots } from '@/shared/hooks/useConnectingDots';
import AgencyJoinCta from "@/features/agencies/components/AgencyJoinCta";
import AgencyContactModal from "@/features/agencies/components/AgencyContactModal";
import AgencyContactCta from "@/features/agencies/components/AgencyContactCta";
import AgencyServices from "@/features/agencies/components/AgencyServices";
import AgencyClients from "@/features/agencies/components/AgencyClients";
import AgencyHighlights from "@/features/agencies/components/AgencyHighlights";
import AgencyAbout from "@/features/agencies/components/AgencyAbout";
import type { Tier, Video, SectionRefs } from "@/features/agencies/components/types";
import AgencyHero from "@/features/agencies/components/AgencyHero";


const TIERS: Record<string, Tier> = {
  associate: { labelKey: 'certifiedAgencies.common.certification.associateMember', gradient: 'from-gray-400 to-gray-500' },
  full: { labelKey: 'certifiedAgencies.common.certification.fullMember', gradient: 'from-amber-400 to-amber-500' },
  gold: { labelKey: 'certifiedAgencies.common.certification.goldMember', gradient: 'from-amber-400 to-amber-500' },
};


const getVideo = (agency: Agency): Video | null => {
  if (agency.videoFileUrl) return { kind: 'file', src: agency.videoFileUrl };
  if (!agency.videoUrl) return null;
  return /youtube\.com|youtu\.be/.test(agency.videoUrl) ? { kind: 'embed', src: agency.videoUrl } : { kind: 'file', src: agency.videoUrl };
};

const AgencyProfile = ({ agency }: { agency: Agency }) => {
  const { t, locale } = useAppTranslations();
  const L = (v: Localized | undefined) => localize(v, locale);
  const tier = TIERS[agency.membershipLevel || 'associate'];
  const video = getVideo(agency);
  const aboutTitle = L(agency.aboutTitle) || `About ${agency.name}`;
  const aboutParagraphs = L(agency.aboutDescription).split(/\n\s*\n/).map((p) => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean);
  const clientsTitle = L(agency.clientsTitle) || `Clients ${agency.name} Have Worked With`;
  const socials = [
    { label: 'LinkedIn', href: agency.linkedinUrl, icon: 'mdi:linkedin', hover: 'group-hover:text-[#0077B5]' },
    { label: 'Instagram', href: agency.instagramUrl, icon: 'mingcute:instagram-fill', hover: 'group-hover:text-[#E4405F]' },
    { label: 'Facebook', href: agency.facebookUrl, icon: 'ic:baseline-facebook', hover: 'group-hover:text-[#1877F2]' },
    { label: 'X', href: agency.xUrl, icon: 'iconoir:x', hover: 'group-hover:text-black' },
    { label: 'Website', href: agency.websiteUrl, icon: 'mdi:web', hover: 'group-hover:text-paan-blue' },
  ].filter((s) => s.href);
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

  const isFixed = useFixedHeader();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Hide overlay when playing, show when paused or ended
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleEnded = () => setIsPlaying(false);
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, []);


  useSectionObserver(sectionRefs);

  useConnectingDots(canvasRef);

  return (
    <>
    <div className="relative">
      <main className="px-3 pt-6 sm:px-0 sm:pt-0 relative">
        <ConnectingDots 
          starCount={80}
          connectionDistance={120}
          dotColor="#84C1D9"
          lineColor="#84C1D9"
          lineWidth={0.5}
        />
        <Header/>

        <AgencyHero sectionRefs={sectionRefs} canvasRef={canvasRef} agency={agency} t={t} L={L} />
        
        <AgencyAbout aboutTitle={aboutTitle} aboutParagraphs={aboutParagraphs} t={t} agency={agency} L={L} video={video} videoRef={videoRef} />
        <AgencyHighlights t={t} tier={tier} agency={agency} />
        {/* Clients They Have Worked With Section */}
        <AgencyClients clientsTitle={clientsTitle} agency={agency} />
        
        <AgencyServices L={L} agency={agency} />

        {/* Contact Agency Button Section */}
      <AgencyContactCta setIsContactModalOpen={setIsContactModalOpen} t={t} agency={agency} socials={socials} />
      {/* Contact Modal */}
      {isContactModalOpen && (
        <AgencyContactModal onClose={() => setIsContactModalOpen(false)} agency={agency} L={L} t={t} />
      )}
      {/* Contact Agency */}
        

      <AgencyJoinCta t={t} />  
        

        <ScrollToTop />
      </main>
      <Footer />
      </div>
    </>
  );
};

export default AgencyProfile;