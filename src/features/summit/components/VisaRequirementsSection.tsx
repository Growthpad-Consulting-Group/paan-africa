import { motion } from "framer-motion";
import Image from "next/image";

export default function VisaRequirementsSection() {
  return (
    <motion.div 
       className="bg-[#DAECF3] relative py-12 sm:py-16 md:py-20 pt-20 sm:pt-24 md:pt-32" 
       id="visa-requirements"
       initial={{ opacity: 0, y: 50 }}
       whileInView={{ opacity: 1, y: 0 }}
       transition={{ duration: 0.8, ease: "easeOut" }}
       viewport={{ once: true, margin: "-100px" }}
     >
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div 
          className="text-left mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
            <motion.h2 
              className="text-2xl sm:text-3xl lg:text-4xl uppercase font-bold leading-tight mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              Visa & Entry Requirements
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg font-light leading-relaxed mb-6 sm:mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              Most international visitors require an Electronic Travel Authorization (eTA) to enter Kenya.
            </motion.p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content Section */}
          <div className="flex flex-col justify-center space-y-8">                                
            <div className="space-y-4">            
              <ul className="space-y-3 font-light">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-red mt-1 flex-shrink-0">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                  </svg>
                  <span>Passport valid for at least 6 months</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-red mt-1 flex-shrink-0">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                  </svg>
                  <span>Recent passport photo (digital)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-red mt-1 flex-shrink-0">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                  </svg>
                  <span>Return/onward flight ticket</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-red mt-1 flex-shrink-0">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                  </svg>
                  <span>Proof of accommodation (hotel booking or invitation)</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-paan-red mt-1 flex-shrink-0">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                  </svg>
                  <span>Visa invitation letter (if needed — request from <a href="mailto:travel@paan.africa" className="font-bold hover:text-paan-red transition-colors font-medium">travel@paan.africa</a>)</span>
                </li>
              </ul>
            </div>
            <div>
                <p>Applications are processed in <span className="font-bold">3–5 working days</span>. Apply at least <span className="font-bold">2–3 weeks</span> before travel.</p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.button 
                onClick={() => window.open('https://www.etakenya.go.ke/', '_blank')}
                className="bg-paan-red text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Apply for eTA
              </motion.button>
              <motion.button 
                onClick={() => window.location.href = 'mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Visa Invitation Letter Request&body=Hello,%0D%0A%0D%0AI am planning to attend the PAAN Summit 2026 in Nairobi and would like to request a visa invitation letter.%0D%0A%0D%0APlease provide the following information:%0D%0A- Full Name:%0D%0A- Passport Number:%0D%0A- Nationality:%0D%0A- Date of Birth:%0D%0A- Arrival Date:%0D%0A- Departure Date:%0D%0A- Hotel/Accommodation Details:%0D%0A%0D%0AThank you for your assistance.%0D%0A%0D%0ABest regards'}
                className="bg-transparent border-2 border-paan-dark-blue text-paan-dark-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Request Invitation Letter
              </motion.button>
            </motion.div>
          </div>
          
          {/* Image Section */}
          <motion.div 
            className="flex justify-center lg:justify-end order-first lg:order-last"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div 
              className="relative overflow-hidden rounded-2xl shadow-2xl max-w-lg w-full"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Image 
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/visa-req.png" 
                alt="PAAN Awards Categories" 
                width={500} 
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
