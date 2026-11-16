

export default function WhosInTheRoomSection() {
  return (
    <div className="bg-[#DAECF3] relative py-12 sm:py-16 md:py-20">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex justify-center mb-8 sm:mb-12">
          <h2 className="text-xs sm:text-sm w-fit border border-paan-dark-blue text-paan-dark-blue mb-4 bg-paan-blue rounded-full px-3 sm:px-4 py-1">Who's in the room</h2>
        </div>
        
        {/* First Marquee - Right Direction */}
        <div className="w-full overflow-hidden whitespace-nowrap py-4 sm:py-5 bg-white/20 rounded-lg mb-3 sm:mb-4">
          <div className="inline-flex animate-marquee-right">
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <div key={`right-${i}`} className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Film Director</span>
                  <span className="text-2xl sm:text-3xl text-paan-red">•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Music Producers</span>
                  <span className="text-2xl sm:text-3xl text-paan-blue">•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Fashion Designers</span>
                  <span className="text-2xl sm:text-3xl text-paan-dark-blue">•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Gaming Studios</span>
                  <span className="text-2xl sm:text-3xl text-paan-yellow">•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">SaaS Founders</span>
                  <span className="text-2xl sm:text-3xl text-paan-yellow">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
    
        {/* Second Marquee - Left Direction */}
        <div className="w-full overflow-hidden whitespace-nowrap py-4 sm:py-5 bg-white/20 rounded-lg">
          <div className="inline-flex animate-marquee-left">
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <div key={`left-${i}`} className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Producers</span>
                  <span className="text-2xl sm:text-3xl text-paan-red">•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Fashion Designers</span>
                  <span className="text-2xl sm:text-3xl text-paan-blue">•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">UX/UI Designers</span>
                  <span className="text-2xl sm:text-3xl text-paan-maroon">•</span>
                  <span className="text-lg sm:text-xl md:text-2xl font-semibold text-paan-dark-blue whitespace-nowrap">Marketing Leaders</span>
                  <span className="text-2xl sm:text-3xl text-paan-yellow">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
