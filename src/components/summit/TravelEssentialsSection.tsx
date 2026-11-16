import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeInUp } from "@/components/summit/motion";

export default function TravelEssentialsSection() {
  return (
    <motion.div 
       className="bg-white py-12 sm:py-16 md:py-20 pt-16 sm:pt-20 md:pt-24" 
       id="travel-essentials"
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut" }}
       viewport={{ once: true, margin: "-100px" }}
     >
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-left mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold leading-tight text-paan-dark-blue">Travel Essentials</h2>
                <p className="text-base sm:text-lg font-light leading-relaxed mb-6 sm:mb-8 text-gray-600 max-w-3xl">
                    Everything you need to know for a smooth trip to Nairobi.
                </p>
            </div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
                {/* Currency Card */}
                <motion.div 
                  className="bg-gradient-to-br from-[#DAECF3] to-[#F3F9FB] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-end mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/ksh(1).svg"
                            alt="Currency"
                            width={72}
                            height={72}
                            className="w-18 h-18"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Currency</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Kenyan Shilling (KES). ATMs are common. Cards accepted in hotels and restaurants. Carry small cash for taxis and tips.
                    </p>
                </motion.div>
    
                {/* Weather Card */}
                <motion.div 
                  className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF3] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-end mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/weather.svg"
                            alt="Weather"
                            width={72}
                            height={72}
                            className="w-18 h-18"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Weather</h3>
                    <p className="text-gray-600 leading-relaxed">
                        September is warm and dry. Pack light layers, comfortable shoes, and a light jacket for evenings. Sunscreen recommended.
                    </p>
                </motion.div>
    
                {/* Connectivity Card */}
                <motion.div 
                  className="bg-gradient-to-br from-[#DAECF3] to-[#F3F9FB] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-end mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/sim(1).svg"
                            alt="Connectivity"
                            width={72}
                            height={72}
                            className="w-18 h-18"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Connectivity</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Free WiFi at venue and most hotels. Local SIM cards available at airport. Mobile money (M-Pesa) widely accepted.
                    </p>
                </motion.div>
    
                {/* Language Card */}
                <motion.div 
                  className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF3] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-end mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/chat(1).svg"
                            alt="Language"
                            width={48}
                            height={48}
                            className="w-12 h-12"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Language</h3>
                    <p className="text-gray-600 leading-relaxed">
                        English is widely spoken. Local languages include Swahili and Kiswahili.
                    </p>
                </motion.div>
    
                {/* Time Zone Card */}
                <motion.div 
                  className="bg-gradient-to-br from-[#DAECF3] to-[#F3F9FB] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-end mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/clock(1).svg"
                            alt="Time Zone"
                            width={48}
                            height={48}
                            className="w-12 h-12"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Time Zone</h3>
                    <p className="text-gray-600 leading-relaxed">
                        East Africa Time (EAT). UTC+3.
                    </p>
                </motion.div>
    
                {/* Safety Card */}
                <motion.div 
                  className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF3] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-end mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/lock.svg"
                            alt="Visa"
                            width={48}
                            height={48}
                            className="w-12 h-12"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Safety</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Nairobi is safe in busy areas. Use ride apps, avoid empty streets at night, keep valuables secure.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    </motion.div>
  );
}
