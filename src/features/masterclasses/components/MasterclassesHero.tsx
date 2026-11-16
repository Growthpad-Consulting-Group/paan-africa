import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { staggerContainer, fadeInUp } from "@/components/summit/motion";

export default function MasterclassesHero() {
  return (
    <section className="relative bg-gradient-to-br from-[#172840] via-[#2a4a6b] to-[#172840] pt-32 sm:pt-40 pb-20 overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <Image
        src="/assets/images/bg-pattern.svg"
        fill
        alt=""
        className="object-cover"
      />
    </div> 
    
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div 
          className="text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <span className="inline-block bg-[#F2B706] text-[#172840] px-6 py-2 rounded-full text-sm font-semibold mb-6">
              Professional Development
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            variants={fadeInUp}
          >
            PAAN Masterclasses
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Expert-led training programs designed specifically for African agencies. 
            Learn from industry leaders, gain practical skills, and accelerate your agency's growth.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            variants={fadeInUp}
          >
            <button 
              onClick={() => document.getElementById('masterclasses-grid')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#F25849] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#D6473C] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse Masterclasses
            </button>
            <button 
              onClick={() => document.getElementById('upcoming-masterclass')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-[#172840] transition-all duration-300"
            >
              View Featured
            </button>
          </motion.div>
    
          {/* Collaboration Section */}
          <motion.div 
            className="border-t border-white/20 pt-12"
            variants={fadeInUp}
          >
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-6 font-medium">
              In Collaboration With
            </p>
            <div className="flex items-center justify-center">
              <Link 
                href="https://publicisteastafrica.com/alliance-of-independent-agencies-forges-landmark-partnership-with-paan-to-elevate-africas-creative-ecosystem/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-white backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/50 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="group relative">
                      <div className="relative w-full h-32 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                        <img 
                          src="/assets/images/partners/aia-2.png" 
                          alt="AIA Logo" 
                          className="w-48 h-48 object-contain group-hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
