

type Props = {
  setIsApplicationModalOpen: any;
  scrollToSection: any;
  isApplicationModalOpen: any;
};

export default function WhyParticipateSection({ setIsApplicationModalOpen, scrollToSection, isApplicationModalOpen }: Props) {
  return (
    <div className="bg-[#172840] relative py-12 md:py-16 lg:py-20" id="categories-section">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content Section */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 order-2 lg:order-1">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white uppercase font-bold leading-tight mb-4 md:mb-6">
                Your Work. Africa's Spotlight.
              </h2>
              <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed mb-6 md:mb-8">
                Join Africa's most prestigious creative awards and showcase your talent to a continental audience.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 md:mb-4">Why Participate?</h3>
              <ul className="space-y-3 text-white font-light text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#FFC857] mt-0.5 sm:mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                  </svg>
                  <span>Gain continental recognition and credibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#FFC857] mt-0.5 sm:mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                  </svg>
                  <span>Strengthen your brand and professional reputation</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#FFC857] mt-0.5 sm:mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                  </svg>
                  <span>Connect with top agencies, clients & collaborators</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="text-[#FFC857] mt-0.5 sm:mt-1 flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6">
                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z"/>
                  </svg>
                  <span>Inspire and be part of Africa's creative future</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <button 
                className="bg-paan-red text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-[#E63946]/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                onClick={() => setIsApplicationModalOpen(true)}
              >
                Apply Now
              </button>
              <button 
                className="bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white hover:text-[#172840] transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                onClick={() => scrollToSection('paan-awards-section')}
              >
                Explore Categories
              </button>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-lg w-full">
              <img 
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/image-3.png" 
                alt="PAAN Awards Categories" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>
    
      {/* Modal Placeholder */}
      {isApplicationModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setIsApplicationModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-[#172840] mb-4">Apply Now</h3>
            <p className="text-[#172840] mb-6">Application form would appear here.</p>
            <button 
              className="bg-[#E63946] text-white px-6 py-3 rounded-full hover:bg-[#E63946]/90 transition-all duration-300 w-full"
              onClick={() => setIsApplicationModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
