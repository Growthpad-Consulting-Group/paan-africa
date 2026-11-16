import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function ExhibitCtaSection() {
  return (
    <motion.div 
       className="relative py-12 sm:py-16 md:py-20 overflow-hidden h-[400px] sm:h-[450px] md:h-[500px]" 
      id="cta-section" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
     >
       {/* Parallax Background Image */}
       <div 
         className="absolute inset-0 bg-cover bg-center bg-fixed"
         style={{
          backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/travel-guide-parallax-image.png')",
           filter: "brightness(0.8)"
         }}
       />
       
       {/* Dark overlay for better text readability */}
       <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
       
       <section className="relative mx-auto max-w-6xl px-4 sm:px-6 h-full flex items-center justify-center">
         <div className="text-center w-full max-w-4xl">
           <div className="mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl text-white font-bold uppercase mb-4 sm:mb-6">Ready to Exhibit?</h3>
            <p className="text-lg sm:text-xl font-normal text-white">Secure your booth space and join Africa's premier creative and tech conference.</p>
           </div>
           <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
             <button 
              onClick={() => window.location.href = 'mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Exhibition Booth Inquiry&body=Hello PAAN Team,%0D%0A%0D%0AI am interested in exhibiting at the PAAN Summit 2026 in Nairobi.%0D%0A%0D%0APlease provide information about:%0D%0A- [ ] Available booth spaces%0D%0A- [ ] Pricing and packages%0D%0A- [ ] Exhibition guidelines%0D%0A- [ ] Setup and logistics%0D%0A- [ ] Marketing opportunities%0D%0A%0D%0ACompany: _________________%0D%0AContact: _________________%0D%0A%0D%0AThank you for your assistance.%0D%0A%0D%0ABest regards'}
               className="bg-paan-blue text-paan-dark-blue px-6 sm:px-8 py-3 rounded-full hover:bg-paan-blue/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2"
             >
              <Icon icon="mdi:email" className="w-5 h-5" />
              Request Information
             </button>
             <button 
              onClick={() => window.location.href = 'mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Booth Booking&body=Hello PAAN Team,%0D%0A%0D%0AI would like to book a booth for the PAAN Summit 2026.%0D%0A%0D%0ABooth preferences:%0D%0A- Preferred booth number: _________________%0D%0A- Booth size: [ ] 3x3m (USD 1,000) [ ] 3x6m (USD 1,800) [ ] Pavilion (RFQ)%0D%0A- Company name: _________________%0D%0A- Contact person: _________________%0D%0A- Email: _________________%0D%0A- Phone: _________________%0D%0A%0D%0AAdditional requirements:%0D%0A%0D%0A%0D%0AThank you.%0D%0A%0D%0ABest regards'}
               className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-full hover:bg-paan-blue/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2"
             >
              <Icon icon="mdi:calendar-check" className="w-5 h-5" />
              Book Your Booth
             </button>
           </div>
         </div>
       </section>
    </motion.div>
  );
}
