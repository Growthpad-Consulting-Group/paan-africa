import { motion } from "framer-motion";
import Image from "next/image";
import { staggerContainer, fadeInUp } from "@/components/summit/motion";

export default function ExploreNairobiSection() {
  return (
    <motion.div 
      className="bg-paan-dark-blue relative pt-16 sm:pt-20 md:pt-24" 
      id="explore-nairobi"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
        <section className="mx-auto max-w-6xl py-12 sm:py-16 md:py-20 justify-start px-4 sm:px-6">
         <div className="flex justify-between gap-4 sm:gap-8">
           <div className="text-left">
               <h2 className="text-2xl sm:text-3xl font-bold mx-auto uppercase text-white mb-2 sm:mb-3">EXPLORE NAIROBI</h2>
               <h3 className="text-lg sm:text-xl md:text-2xl font-light text-white">Make the most of your stay before or after the Summit.</h3>
           </div>
         </div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div 
              className="relative rounded-xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-64">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/rhinos.png"
                  alt="Morning Safari"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-paan-dark-blue mb-3">Morning Safari</h4>
                <p className="text-gray-600 leading-relaxed">Nairobi National Park — wildlife just 20 minutes from the city.</p>
              </div>
            </motion.div>
    
            <motion.div 
              className="relative rounded-xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-64">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/nairobi-town.jpg"
                  alt="Creative Crawl"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-paan-dark-blue mb-3">Creative Crawl</h4>
                <p className="text-gray-600 leading-relaxed">Explore galleries, pop-ups, and music in Westlands.</p>
              </div>
            </motion.div>
    
            <motion.div 
              className="relative rounded-xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300"
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-64">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/nairobi.png"
                  alt="Dining & Rooftops"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-paan-dark-blue mb-3">Dining & Rooftops</h4>
                <p className="text-gray-600 leading-relaxed">Award-winning restaurants and vibrant nightlife.</p>
              </div>
            </motion.div>
          </motion.div>
     </section>
    </motion.div>
  );
}
