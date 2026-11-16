import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeInUp } from "@/features/summit/components/motion";

export default function PackSmartSection() {
  return (
    <motion.div 
       className="bg-white py-12 sm:py-16 md:py-20 pt-16 sm:pt-20 md:pt-24" 
       id="pack-smart"
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut" }}
       viewport={{ once: true, margin: "-100px" }}
     >
        <section className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-left mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold leading-tight text-paan-dark-blue">Pack Smart</h2>
                <p className="text-base sm:text-lg font-light leading-relaxed mb-6 sm:mb-8 text-gray-600 max-w-3xl">
                    Pack light, stay comfortable, and enjoy your trip to Nairobi.
                </p>
            </div>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
            >
                {/* Delegates Card */}
                <motion.div 
                  className="bg-gradient-to-br from-[#DAECF3] to-[#F3F9FB] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-end mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/delegates.svg"
                            alt="Currency"
                            width={72}
                            height={72}
                            className="w-18 h-18"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-4">All Delegates</h3>
                    <ol className="text-gray-600 leading-relaxed">
                        <li>Passport + e-Visa</li>
                        <li>Summit badge confirmation</li>
                        <li>Business cards</li>
                        <li>Type G plug adapter</li>
                        <li>Light clothes + jackets + umbrella</li>
                    </ol>
                </motion.div>
    
                {/* Speakers Card */}
                <motion.div 
                  className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF3] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-end mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/microphone.svg"
                            alt="Weather"
                            width={72}
                            height={72}
                            className="w-18 h-18"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Speakers</h3>
                    <ol className="text-gray-600 leading-relaxed"> <li>Passport + e-Visa</li>
                        <li>All delegate items</li>
                        <li>Presentation slides + USB backup</li>
                        <li>Clicker & HDMI adapter</li>
                        <li>Formal attir for stage presentations</li>
                    </ol>
                </motion.div>
    
                {/* Exhibitors Card */}
                <motion.div 
                  className="bg-gradient-to-br from-[#DAECF3] to-[#F3F9FB] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-end mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/exhibitor.svg"
                            alt="Connectivity"
                            width={72}
                            height={72}
                            className="w-18 h-18"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Exhibitors</h3>
                    <ol className="text-gray-600 leading-relaxed">
                        <li>All delegate items</li>
                        <li>Booth Signage & promo materials</li>
                        <li>Extension cables/ power strips</li>
                        <li>Demo kits / samples</li>
                    </ol>
                </motion.div>
    
                {/* Digital Nomads Card */}
                <motion.div 
                  className="bg-gradient-to-br from-[#F3F9FB] to-[#DAECF3] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                    <div className="flex items-center justify-end mb-6">
                        <Image
                            src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/laptop.svg"
                            alt="Language"
                            width={72}
                            height={72}
                            className="w-18 h-18"
                        />
                    </div>
                    <h3 className="text-xl font-bold text-paan-dark-blue mb-4">Digital Nomads</h3>
                    <ol className="text-gray-600 leading-relaxed">
                        <li>All delegate items</li>
                        <li>Portable WIFI/eSIM</li>
                        <li>Laptop stand + mouse</li>
                        <li>Travel insurance</li>
                        <li>Coworking Pass</li>
                    </ol>
                </motion.div>
    
            </motion.div>
        </section>
    </motion.div>
  );
}
