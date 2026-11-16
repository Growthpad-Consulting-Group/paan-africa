import type { SectionRefs, Translate, Localize, Agency } from "@/features/agencies/components/types";
import type { RefObject } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Icon } from "@iconify/react";

type Props = {
  sectionRefs: SectionRefs;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  agency: Agency;
  t: Translate;
  L: Localize;
};

export default function AgencyHero({ sectionRefs, canvasRef, agency, t, L }: Props) {
  return (
    <div className="relative w-full min-h-screen bg-white" id="home" ref={sectionRefs.home}>
      {/* Canvas covers full hero section */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />
      <section className="flex flex-col items-center justify-center min-h-screen relative z-10 px-4 sm:px-8 lg:px-16">
        <div className="text-center max-w-4xl mx-auto w-full">
          <div className="mb-8 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 w-full">
            <motion.div
              initial={{ x: 150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <a
                href={agency.websiteUrl || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-opacity duration-300 hover:opacity-80"
                aria-label={`Visit ${agency.name} website`}
              >
                <Image 
                  src={agency.logoUrl}
                  unoptimized={agency.logoUrl.endsWith('.svg')}
                  width={400} 
                  height={280} 
                  alt={agency.logoAlt || `${agency.name} logo`} 
                  className="mx-auto w-40 sm:w-64 h-auto object-contain" 
                />
              </a>
            </motion.div>
            <motion.div
              initial={{ x: -150, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <Image 
                src="/assets/images/certified-members-badge.svg" 
                width={110} 
                height={70} 
                alt="PAAN Certified Member Badge" 
                className="mx-auto w-16 sm:w-20 h-auto object-contain" 
              />
            </motion.div>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-6xl uppercase font-bold text-gray-900 mb-2 sm:mb-4">
            {agency.name}
          </h1>
          <p className="text-sm sm:text-md lg:text-lg text-gray-600 max-w-2xl mx-auto mb-2 sm:mb-4">
            {t('certifiedAgencies.common.hero.memberDescription')}
          </p>
        </div>
        {/* Location and Flags at the bottom of hero */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-wrap justify-center items-center gap-2 sm:gap-3 bg-white/80 rounded-full px-2 sm:px-4 py-1.5 sm:py-2 shadow-md w-[95vw] max-w-md text-xs sm:text-base">
          <Icon icon="mdi:map-marker" className="w-4 h-4 sm:w-5 sm:h-5 text-paan-blue" />
          {agency.countries.map((c) => (
            <span key={c.code} className="contents">
              <span className="font-medium text-gray-700">{L(c.name)}</span>
              <span title={L(c.name)}>
                <Image
                  src={`https://flagcdn.com/w20/${c.code}.png`}
                  alt={`${L(c.name)} flag`}
                  width={20}
                  height={14}
                  style={{ display: 'inline', verticalAlign: 'middle' }}
                />
              </span>
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
