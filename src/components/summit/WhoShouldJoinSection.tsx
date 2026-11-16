import Image from "next/image";

export default function WhoShouldJoinSection() {
  return (
    <div className="bg-white py-12 sm:py-16 md:py-20" id="participants">
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-normal text-paan-dark-blue mb-3 sm:mb-4">Who Should Join</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">Connect with diverse professionals shaping Africa's creative economy</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {/* Creative Industry Leaders */}
          <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: '200px 200px'
              }}
            ></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_4578507.webp" alt="Creative Industry Leaders" width={48} height={48} className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Creative Industry Leaders</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Artists, directors, producers, and creative visionaries driving innovation across Africa's entertainment and media landscape.</p>
            </div>
          </div>
    
          {/* Tech & Platform Innovators */}
          <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: '200px 200px'
              }}
            ></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_4657328.webp" alt="Tech & Platform Innovators" width={48} height={48} className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Tech & Platform Innovators</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Technology entrepreneurs, platform builders, and digital innovators creating the infrastructure for creative commerce.</p>
            </div>
          </div>
    
          {/* Policy makers & trade stakeholders */}
          <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: '200px 200px'
              }}
            ></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_8206224.webp" alt="Policy Makers & Trade Stakeholders" width={48} height={48} className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Policy Makers & Trade Stakeholders</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Government officials, trade representatives, and policy experts shaping regulatory frameworks for creative industries.</p>
            </div>
          </div>
    
          {/* Agencies */}
          <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: '200px 200px'
              }}
            ></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_9453411.webp" alt="Agencies & Service Providers" width={48} height={48} className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Agencies & Service Providers</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Marketing, creative, advertising, IT, and tech agencies providing specialized services to creative businesses.</p>
            </div>
          </div>
    
          {/* Freelancers */}
          <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: '200px 200px'
              }}
            ></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_2408265.webp" alt="Freelancers" width={48} height={48} className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Freelancers</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Independent creative professionals, digital nomads, and gig economy participants building scalable creative careers.</p>
            </div>
          </div>
    
          {/* Investors & Financial Institutions */}
          <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: '200px 200px'
              }}
            ></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_9601394.webp" alt="Investors & Financial Institutions" width={48} height={48} className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Investors & Financial Institutions</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">VCs, angel investors, banks, and fintech companies providing capital and financial services to creative ventures.</p>
            </div>
          </div>
    
          {/* Marketing & creative teams */}
          <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: '200px 200px'
              }}
            ></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_596092.webp" alt="Marketing & Creative Teams" width={48} height={48} className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Marketing & Creative Teams</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">In-house marketing departments and creative teams from brands and corporations seeking innovative partnerships.</p>
            </div>
          </div>
    
          {/* Hubs & Ecosystem Builders */}
          <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: '200px 200px'
              }}
            ></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_957980.webp" alt="Hubs & Ecosystem Builders" width={48} height={48} className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Hubs & Ecosystem Builders</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Innovation hubs, incubators, accelerators, and community builders fostering creative entrepreneurship across Africa.</p>
            </div>
          </div>
    
          {/* Academia & research */}
          <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: '200px 200px'
              }}
            ></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_19025369.webp" alt="Academia & Research" width={48} height={48} className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Academia & Research</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Researchers, academics, and educational institutions studying and teaching creative economy, digital transformation, and innovation.</p>
            </div>
          </div>
    
          {/* Corporate & Brand Partners */}
          <div className="group relative bg-[#E6F2F7] rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-paan-blue/10 overflow-hidden">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-paan-blue/0 to-paan-yellow/0 group-hover:from-paan-blue/30 group-hover:to-paan-yellow/30 transition-all duration-300 rounded-xl z-[1]"></div>
            {/* Pattern Background */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]"
              style={{
                backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/card-pattern.webp')",
                backgroundRepeat: 'repeat',
                backgroundPosition: 'center',
                backgroundSize: '200px 200px'
              }}
            ></div>
            {/* Content */}
            <div className="relative z-10">
            <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Image src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/who-should-join/fi_951681.webp" alt="Corporate & Brand Partners" width={48} height={48} className="w-full h-full" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-paan-dark-blue mb-1.5 sm:mb-2">Corporate & Brand Partners</h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">Large corporations, multinational brands, and enterprise clients seeking to engage with Africa's creative talent and markets.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
