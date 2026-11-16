import type { RefObject } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { handleScroll } from "../../../utils/scrollUtils";
import { SUMMIT_CANCELLED } from "@/data/summit/status";
import { staggerContainer, fadeInUp, scaleIn } from "@/components/summit/motion";
import type { SummitEdition } from "@/lib/summitService";

type Props = {
  sectionRefs: { home: RefObject<HTMLDivElement | null> };
  edition: SummitEdition;
  onPartnerClick: () => void;
};

export default function SummitHero({ sectionRefs, edition, onPartnerClick }: Props) {

  return (
    <>
      <div
        className="relative h-screen w-full" 
        id="home"
        ref={sectionRefs.home}
      >
        {/* Full background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-hero-2.webp')",
            filter: "brightness(0.5)" // Darkening the image
          }}
        />
               
        {/* Content overlay */}
        <div className="relative h-full flex items-center justify-center pt-16 sm:pt-24 md:pt-32">
          <div className="mx-auto max-w-6xl w-full px-4 sm:px-6">
            <motion.div 
              className="max-w-2xl mx-auto text-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl font-normal text-yellow-400 mb-6 sm:mb-8 leading-tight"
                variants={fadeInUp}
              >
                Create. Connect. Commercialize.
              </motion.h1>
              <motion.div 
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-10 justify-center"
                variants={fadeInUp}
              >
                <SeminarLocationAndDate edition={edition} />
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 md:gap-8"
                variants={scaleIn}
              >
                <button 
                  disabled={SUMMIT_CANCELLED}
                  onClick={() => window.location.href = '/summit/purchase-ticket'}
                  className="bg-gradient-to-r from-paan-yellow to-paan-blue text-white px-6 sm:px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-60 disabled:pointer-events-none"
                >
                  {SUMMIT_CANCELLED ? 'Registration Closed' : 'Register Now'}
                </button>
                <button 
                  onClick={onPartnerClick}
                  className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-paan-red transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  Partner With Us
                </button>
                <button 
                  onClick={(e) => handleScroll(e, '#program')}
                  className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-white hover:text-paan-red transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
                >
                  View Track
                </button>                
              </motion.div>
              
            </motion.div>
            <motion.p 
                className="text-white/80 text-xs sm:text-sm text-center mt-4 sm:mt-6"
                variants={fadeInUp}
              >
                Organized & managed by the <span className="font-bold text-paan-red"><a href="/" className="hover:text-paan-red transition-colors">Pan African Agency Network(PAAN)</a></span>
              </motion.p>
          </div>
        </div>
      </div>

    </>
  );
}

function SeminarLocationAndDate({ edition }: { edition: SummitEdition }) {
    
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:map-marker" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="break-words sm:whitespace-nowrap">{`${edition.venueName} - `}<strong>{edition.displayDates}</strong></span>
      </div>
      
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:user-group" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="whitespace-nowrap">{edition.inPersonLabel}</span>
      </div>
      <div className="flex items-center gap-2 text-white text-xs sm:text-sm">
        <Icon icon="mdi:globe" className="text-red-500 flex-shrink-0" width="20" height="20" />
        <span className="whitespace-nowrap">{edition.streamingLabel}</span>
      </div>
    </div>
  );
}
