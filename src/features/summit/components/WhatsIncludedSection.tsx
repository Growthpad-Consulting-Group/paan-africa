import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { scaleIn, staggerContainer } from "./motion";

const INCLUDED = [
{
  icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/keynote-panel.svg",
  title: "Keynotes & Panels",
  description: "Learn from top African and global leaders shaping the creative and business landscape."
},
{
  icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/exhibition-hall.svg",
  title: "Exhibition Hall",
  description: "Explore tools, technologies, agencies, and brands driving innovation across the continent."
},
{
  icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/smart-networking.svg",
  title: "Smart Networking",
  description: "Meet collaborators, clients, agencies, creators, and investors through the Summit app."
},
{
  icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/career-lounge.svg",
  title: "Career Lounge",
  description: "Get career guidance, portfolio reviews, job leads, and mentorship opportunities."
},
{
  icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/business-opportunity.svg",
  title: "Business Opportunities",
  description: "Discover cross-border projects, partnerships, co-bidding options, and new market entry paths."
},
{
  icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/certificate.svg",
  title: "Certificates",
  description: "Receive a digital participation certificate and access session materials (where applicable)."
},
{
  icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/creative-experinces.svg",
  title: "Creative Experiences",
  description: "Enjoy showcases, brand activations, live demos, and curated summit experiences."
},
{
  icon: "https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/onground-support.svg",
  title: "On-Ground Support",
  description: "Benefit from visa letters, priority check-in, and help desk support depending on your ticket."
}
];

export default function WhatsIncludedSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [visible]);

  return (
    <div ref={ref}>
                <section className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-20">
                  <motion.div 
                    className="text-center mb-6 sm:mb-8 md:mb-12 px-2"
                    initial={{ opacity: 0, y: 30 }}
                    animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#172840] font-bold mb-2 sm:mb-3 md:mb-4">What's Included</h2>
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-[#172840] font-normal max-w-3xl mx-auto px-2">Your full access to sessions, networking, and experiences.</h3>
                  </motion.div>
                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                    variants={staggerContainer}
                    initial="initial"
                    animate={visible ? "animate" : "initial"}
                  >
                    {INCLUDED.map((item, index) => (
                      <motion.div
                        key={index}
                        className="group bg-paan-dark-blue rounded-lg shadow-lg p-4 sm:p-5 md:p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
                        variants={scaleIn}
                      >
                        <motion.div 
                          className="flex items-start justify-start mb-3 sm:mb-4"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                        >
                          <img 
                            src={item.icon} 
                            alt={`${item.title} Icon`} 
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0" 
                          />
                        </motion.div>
                        <motion.h3 
                          className="text-white text-left my-2 sm:my-3 md:my-4 font-bold text-sm sm:text-base md:text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                        >
                          {item.title}
                        </motion.h3>
                        <motion.p 
                          className="text-white text-xs sm:text-sm md:text-base font-normal text-left mt-auto leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.4, ease: "easeOut" }}
                        >
                          {item.description}
                        </motion.p>
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
    </div>
  );
}
