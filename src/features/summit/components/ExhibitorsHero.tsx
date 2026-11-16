import type { RefObject } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/features/summit/components/motion";

export default function ExhibitorsHero({ sectionRefs }: { sectionRefs: { home: RefObject<HTMLDivElement | null> } }) {

  return (
    <>
      <div
        className="absolute top-0 left-0 h-[75vh] w-full" 
        id="home"
        ref={sectionRefs.home}
      >
        {/* Full background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/exhibitors/paan-summit-2026-exhibitors.png?updatedAt=1762371939447')",
            filter: "brightness(0.5)" // Darkening the image
          }}
        />
               
        {/* Content overlay */}
        <div className="relative h-full flex items-center justify-center pt-16 sm:pt-24 md:pt-32">
          <div className="mx-auto max-w-6xl w-full px-4">
            <motion.div 
              className="max-w-2xl"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >              
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl font-semibold uppercase text-yellow-400 mb-6 sm:mb-8 leading-tight"
                variants={fadeInUp}
              >
                PAAN Summit - Exhibition Floor Plan
              </motion.h1>
              <motion.div 
                className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 sm:mb-10"
                variants={fadeInUp}
              >
                <p className="text-white">Explore live booth availability. Standard shell schemes (3×3 at USD 1,000, 3×6 at USD 1,800) and Pavilions (RFQ). Click a booth to see details, inclusions, and add‑ons, then request a booking.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

    </>
  );
}
