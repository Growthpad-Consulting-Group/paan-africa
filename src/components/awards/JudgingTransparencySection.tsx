

export default function JudgingTransparencySection() {
  return (
    <div className="bg-[#FEEEED] relative py-12 md:py-16 lg:py-20" id="transparency-section">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#172840] uppercase font-bold leading-tight mb-4 md:mb-6 px-4">
            Fair. Transparent. Prestigious.
          </h2>
          <p className="text-base sm:text-lg text-[#172840] font-light leading-relaxed max-w-4xl mx-auto px-4">
            Entries will be scored on creativity, impact, collaboration, and authenticity by an independent jury of African industry leaders.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Section */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1 px-4 sm:px-0">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-md w-full">
              <img 
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/image-2.png" 
                alt="PAAN Awards Transparency" 
                className="h-[350px] sm:h-[450px] md:h-[500px] w-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
          
          {/* Criteria Cards Section */}
          <div className="flex flex-col gap-6 order-1 lg:order-2 px-4 sm:px-0">
            <div className="mb-2 md:mb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#172840] mb-2">Judging Criteria</h3>
              <p className="text-sm sm:text-base text-[#172840] font-light">
                Our independent panel evaluates entries across four key dimensions:
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-paan-dark-blue rounded-xl shadow-lg p-5 md:p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 flex items-center justify-center">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ic_outline-color-lens.svg" 
                    alt="Creativity" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h4 className="text-base md:text-lg font-bold text-white leading-tight mb-2">Creativity</h4>  
                <p className="text-white font-light text-xs md:text-sm leading-relaxed">
                  Original thinking, craft, and storytelling excellence.
                </p>
              </div>
              
              <div className="bg-paan-red rounded-xl shadow-lg p-5 md:p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 flex items-center justify-center">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/tabler_bulb.svg" 
                    alt="Impact" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h4 className="text-base md:text-lg font-bold text-white leading-tight mb-2">Impact</h4>  
                <p className="text-white font-light text-xs md:text-sm leading-relaxed">
                  Measurable results and cultural relevance.
                </p>
              </div>
              
              <div className="bg-paan-yellow rounded-xl shadow-lg p-5 md:p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 flex items-center justify-center">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ix_handshake.svg" 
                    alt="Authenticity" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h4 className="text-base md:text-lg font-bold text-[#172840] leading-tight mb-2">Authenticity</h4>  
                <p className="text-[#172840] font-light text-xs md:text-sm leading-relaxed">
                  African context, voice, and integrity.
                </p>
              </div>
              
              <div className="bg-paan-blue rounded-xl shadow-lg p-5 md:p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 flex items-center justify-center">
                  <img 
                    src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_world.svg" 
                    alt="Collaboration" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h4 className="text-base md:text-lg font-bold text-white leading-tight mb-2">Collaboration</h4>  
                <p className="text-white font-light text-xs md:text-sm leading-relaxed">
                  Cross-discipline and cross-border teamwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Background Pattern */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="#172840" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern)"/>
        </svg>
      </div>
    </div>
  );
}
