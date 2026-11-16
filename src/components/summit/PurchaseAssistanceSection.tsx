export default function PurchaseAssistanceSection() {
  return (
                    <div 
           className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px]" 
           id="parallax-section" 
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
           
           <section className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 h-full flex items-center justify-center">
             <div className="text-left w-full max-w-4xl">
               <div className="mb-6 sm:mb-8 md:mb-12">
                 <h3 className="text-xl sm:text-2xl md:text-3xl text-white font-bold uppercase mb-3 sm:mb-4 md:mb-6">Need Assistance?</h3>
                 <p className="text-base sm:text-lg md:text-xl font-normal text-white">Our logistics team can help with visas, hotels, and transport.</p>
               </div>
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-8 justify-left">
                 <button 
                   onClick={() => window.location.href = 'mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Travel Assistance Request&body=Hello PAAN Travel Team,%0D%0A%0D%0AI need assistance with my travel arrangements for the PAAN Summit 2026 in Nairobi.%0D%0A%0D%0APlease help me with:%0D%0A- [ ] Visa requirements and application%0D%0A- [ ] Hotel recommendations and bookings%0D%0A- [ ] Transportation arrangements%0D%0A- [ ] General travel advice%0D%0A- [ ] Other: _________________%0D%0A%0D%0AAdditional details:%0D%0A%0D%0A%0D%0AThank you for your assistance.%0D%0A%0D%0ABest regards'}
                   className="bg-paan-blue text-paan-dark-blue px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full hover:bg-paan-blue/90 transition-all duration-300 font-medium text-xs sm:text-sm md:text-base shadow-lg flex items-center justify-center gap-2"
                 >
                   Talk to Us
                 </button>
                 <button 
                   onClick={() => window.open('https://www.etakenya.go.ke/check-requirements', '_blank')}
                   className="bg-transparent border border-white text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full hover:bg-paan-blue/90 transition-all duration-300 font-medium text-xs sm:text-sm md:text-base shadow-lg flex items-center justify-center gap-2"
                 >
                   Visa Quick Check
                 </button>
               </div>
             </div>
           </section>
         </div>
  );
}
