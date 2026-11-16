

export default function PartnersSection() {
  return (
    <div className="bg-[#D1D3D4] relative py-12 sm:py-16 md:py-20">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col text-center mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <h3 className="text-2xl sm:text-3xl text-paan-dark-blue font-bold uppercase">Our Partners</h3>
          <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue mb-6 sm:mb-8">Join leading agencies, startups, and creative innovators in the Exhibition Zone. Share your work, connect with investors and partners, and stand out at Africa's most influential creative economy gathering.</p>
        </div>
        
        {/* Sliding Partners Logos */}
        <div className="w-full overflow-hidden whitespace-nowrap py-6 sm:py-8">
          <div className="inline-flex animate-marquee-right">
            <div className="flex space-x-6 sm:space-x-8 md:space-x-10 whitespace-nowrap">
              {[...Array(3)].map((_, i) => (
                <div key={`partners-${i}`} className="flex items-center space-x-6 sm:space-x-8 md:space-x-10">
                  {/* AIA Logo */}
                  <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100" style={{ backgroundColor: '#1a1a1a' }}>
                    <img src="/assets/images/partners/aia.svg" alt="AIA Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                  </div>
                  
                  {/* IAN Logo */}
                  <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <img src="/assets/images/partners/IAN.png" alt="IAN Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                  </div>
                  
                  {/* ICCO Logo */}
                  <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <img src="/assets/images/partners/ICCO.png" alt="ICCO Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                  </div>
                  
                  {/* PRCA Logo */}
                  <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <img src="/assets/images/partners/PRCA.png" alt="PRCA Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                  </div>
                  
                  {/* Uber Logo
                  <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <img src="/assets/images/partners/uber.svg" alt="Uber Logistics Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                  </div> */}
                  
                  {/* Viamo Logo */}
                  <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100" style={{ backgroundColor: '#1a1a1a' }}>
                    <img src="/assets/images/partners/viamo.svg" alt="Viamo Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                  </div>
                  
                  {/* Growthpad Logo */}
                  <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <img src="/assets/images/partners/gcg.png" alt="Growthpad Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                  </div>
                  
                  {/* Penguin Agency Logo */}
                  <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <img src="/assets/images/partners/penquin.png" alt="Penguin Agency Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                  </div>
                  
                  {/* CEvent Text Logo */}
                  <div className="bg-white w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative flex items-center justify-center flex-shrink-0 border border-gray-100">
                    <img src="/assets/images/partners/cevent.png" alt="Penguin Agency Logo" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
