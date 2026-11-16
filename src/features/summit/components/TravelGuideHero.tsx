import type { RefObject } from "react";
import { motion } from "framer-motion";
import { SUMMIT_CANCELLED } from "@/features/summit/data/status";
import { staggerContainer, fadeInUp, scaleIn } from "@/features/summit/components/motion";
import EventLocationAndDate from "@/features/summit/components/EventLocationAndDate";
import type { SummitEdition } from "@/features/summit/lib/summitService";

type Props = {
  sectionRefs: { home: RefObject<HTMLDivElement | null> };
  edition: SummitEdition;
};

export default function TravelGuideHero({ sectionRefs, edition }: Props) {

  return (
    <>
      <div
        className="absolute top-0 left-0 h-screen w-full" 
        id="home"
        ref={sectionRefs.home}
      >
        {/* Full background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/nairobi-area.jpg')",
            filter: "brightness(0.5)" // Darkening the image
          }}
        />
               
        {/* Content overlay */}
        <div className="relative h-full flex items-end pb-16 sm:pb-24 md:pb-48">
          <div className="mx-auto max-w-6xl w-full px-4">
            <motion.div 
              className="max-w-2xl"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.p 
                className="bg-white/20 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 w-fit border border-white"
                variants={fadeInUp}
              >
                Travel Guide
              </motion.p>
              
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase text-yellow-400 mb-6 sm:mb-8 leading-tight"
                variants={fadeInUp}
              >
                Travel Guide — Nairobi 2026
              </motion.h1>
              <motion.div 
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-10"
                variants={fadeInUp}
              >
                <EventLocationAndDate edition={edition} />
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8"
                variants={scaleIn}
              >
                <button 
                  disabled={SUMMIT_CANCELLED}
                  onClick={() => window.location.href = '/summit'}
                  className="bg-paan-red text-white px-6 sm:px-8 py-3 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-60 disabled:pointer-events-none"
                >
                  {SUMMIT_CANCELLED ? 'Registration Closed' : 'Register Now'}
                </button>
                <button 
                  onClick={() => window.location.href = '/summit/travel-guide#visa-requirements'}
                  className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-paan-red transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Visa Requirements
                </button>
                <button 
                  onClick={() => window.location.href = '/summit/travel-guide#accommodation'}
                  className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-paan-red transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Accommodation
                </button>             
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

    </>
  );
}
