import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

type Props = { onApplyNowClick: () => void };

export default function CategoriesHero({ onApplyNowClick }: Props) {

    return (
      <>
        <motion.div
          className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] w-full" 
          id="home"
                    initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Full background image with parallax effect */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/agency-categories.png')",
              filter: "brightness(0.5)"
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
  
          {/* Gradient overlay for better text readability */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
                 
          {/* Content overlay */}
          <div className="relative h-full flex items-end pb-4 sm:pb-6 md:pb-8 lg:pb-10">
            <div className="mx-auto max-w-6xl w-full px-3 sm:px-4">
              <motion.div 
                className="max-w-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.h1 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase text-white mb-3 sm:mb-4 md:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Explore Award Categories
                </motion.h1>            
                <motion.p 
                  className="text-xs sm:text-sm md:text-base font-normal text-white mb-2 sm:mb-3 md:mb-4 leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  Discover all categories open for entry this year. Whether you're an independent creator or a leading agency, each award celebrates the creativity, impact, and innovation driving Africa's creative industry forward.
                </motion.p>
                <motion.button 
                  onClick={onApplyNowClick}
                  className="text-white bg-paan-red px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                    <Icon icon="mdi:message-text" className="w-5 h-5" />
                    Apply Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
  
      </>
    );
  }
