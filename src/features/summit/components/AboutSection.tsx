import { useRef, useState, type RefObject } from "react";
import { motion } from "framer-motion";
import { SUMMIT_CANCELLED } from "@/features/summit/data/status";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { staggerContainer, fadeInLeft, scaleIn, fadeInRight } from "@/features/summit/components/motion";

type Props = {
  /** ref target for the section (used by the page's fade-in observer) */
  sectionRef?: RefObject<HTMLElement | null>;
};

export default function AboutSection({ sectionRef }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section className="relative overflow-hidden z-5 w-full" id="about-us" ref={sectionRef}>
      {/* Pattern overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/about-summit-pattern.webp')",
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundSize: '60%',
          backgroundBlendMode: 'overlay',
          opacity: 0.7
        }}
      ></div>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-paan-dark-blue to-paan-blue/80 z-0"></div>
    <section className="relative mx-auto max-w-6xl z-10 px-4 sm:px-6">
      <div className="grid md:grid-cols-2 gap-8 py-12 sm:py-16 md:py-28 items-center">
        <motion.div 
          className="flex flex-col gap-4 sm:gap-6 relative z-10 md:pr-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div 
            className="flex flex-col gap-3 sm:gap-4"
            variants={fadeInLeft}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-normal">About the Summit</h2>
            <h3 className="text-lg sm:text-xl md:text-2xl text-white font-normal">A deal-first gathering built for action.</h3>
          </motion.div>
          
          <motion.div 
            className="space-y-3 sm:space-y-4 text-white text-sm sm:text-base md:text-lg leading-relaxed"
            variants={fadeInLeft}
          >
            <p>
            The Africa Borderless Creative Economy Summit 2026 brings together the continent’s most forward-thinking agencies, brands, freelancers, marketing teams, and technology partners to reimagine how Africa’s creative industry can scale - together.
            </p>
            <p>
            Over two days of keynotes, data-led panels, strategy labs, awards, showcases, and partnership deal rooms, the summit will unpack how innovation, technology, collaboration, and talent mobility can turn Africa’s creativity into a multi-billion-dollar borderless economy.
            </p>
          </motion.div>
    
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4 relative z-20"
            variants={scaleIn}
          >
            <button 
              disabled={SUMMIT_CANCELLED}
              onClick={() => window.location.href = '/summit/purchase-ticket'}
              className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-gradient-to-r from-paan-yellow to-paan-blue text-white hover:opacity-90 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer relative z-20 w-full sm:w-auto disabled:opacity-60 disabled:pointer-events-none"
            >
              {SUMMIT_CANCELLED ? 'Registration Closed' : 'Register Now'}
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="flex justify-center lg:justify-end"
          variants={fadeInRight}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative overflow-hidden w-full max-w-md lg:max-w-none rounded-lg">
            <video
              ref={videoRef}
              className="h-48 sm:h-64 md:h-80 lg:h-96 w-full object-cover rounded-lg"
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              loop
              muted
            >
              <source src="" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Play/Pause Button */}
            {!isVideoPlaying && (
              <button
                onClick={toggleVideo}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all duration-300 rounded-lg group"
                aria-label="Play video"
              >
                <div className="bg-white/90 hover:bg-white rounded-full p-4 sm:p-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Icon icon="mdi:play" className="text-paan-dark-blue ml-1" width="32" height="32" />
                </div>
              </button>
            )}
            {isVideoPlaying && (
              <button
                onClick={toggleVideo}
                className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-3 shadow-lg transition-all duration-300 group"
                aria-label="Pause video"
              >
                <Icon icon="mdi:pause" className="text-white" width="24" height="24" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
    <Image
        src="/assets/images/bg-pattern.svg"
        width={0}
        height={0}
        alt="Background Pattern"
        className="absolute bottom-0 left-0 w-full h-1/3 object-cover z-0 opacity-10 pointer-events-none"
      />
    </section>
  );
}
