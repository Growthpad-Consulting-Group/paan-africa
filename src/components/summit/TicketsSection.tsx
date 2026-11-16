import { Icon } from "@iconify/react";
import { SUMMIT_CANCELLED } from "@/data/summit/status";

export default function TicketsSection() {
  return (
    <div className="bg-white relative py-12 sm:py-16 md:py-20" id="tickets-section">
        <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col text-center mb-6 sm:mb-8 md:mb-12">
            <h3 className="text-xl sm:text-3xl md:text-4xl text-paan-dark-blue font-bold">Secure Your Spot</h3>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-paan-dark-blue mb-4 sm:mb-6 md:mb-8 leading-relaxed">Deal rooms, clinics, awards. Register now.</p>
          </div>
          
          {/* Ticket Card */}
          <div className="bg-[#F3F9FB] rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Left part */}
              <div className="flex-1 text-paan-dark-blue">
                <div className="p-4 sm:p-5 md:p-6" style={{background: 'linear-gradient(to bottom, #CA983C, #F9EC97, #CA983C)'}}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 text-paan-dark-blue">PAAN SUMMIT 2026</h2>
                  <p className="text-base text-paan-dark-blue/90">Africa Borderless Creative Economy Summit</p>
                  </div>
                  
                {/* Location and Date */}
                <div className="bg-[#F3F9FB] p-4 sm:p-5 mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 border-b-2 border-paan-dark-blue ml-4 sm:ml-6">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Icon icon="mdi:calendar" className="text-paan-red w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-normal text-paan-dark-blue">Oct 28-29, 2026</span>
                          </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Icon icon="mdi:map-marker" className="text-paan-red w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-normal text-paan-dark-blue">TBC</span>
                  </div>
                </div>
    
                <div className="mb-6 sm:mb-8 text-paan-dark-blue/90 ml-4">
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-paan-dark-blue w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base md:text-lg">Actionable sessions & workshops</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-paan-dark-blue w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base md:text-lg">Investor & partnership deal rooms</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-paan-dark-blue w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base md:text-lg">High-level networking experiences</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icon icon="mdi:check-circle" className="text-paan-dark-blue w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base md:text-lg">Creator Crawl & cultural immersions</span>
                    </li>
                  </ul>
                </div>
    
                <div className="bg-gradient-to-br from-[#F25849] to-[#172840] p-4 sm:p-6">
                  <p className="text-xs text-white/80 italic">This preview shows standard event access. Final benefits vary by pass type.</p>
                  </div>
                </div>
    
              {/* Right Part */}
              <div className="flex-1 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-white/20" style={{background: 'linear-gradient(to bottom, #CA983C, #F9EC97, #CA983C)'}}>
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-paan-dark-blue mb-2 sm:mb-3">Summit Access Pass</h3>
                  <p className="text-sm sm:text-base text-paan-dark-blue/80">Seat: To be Assigned</p>
                </div>
    
                <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-xs mb-6 sm:mb-8">
                <button 
                  disabled={SUMMIT_CANCELLED}
                  onClick={() => window.location.href = '/summit/purchase-ticket'}
                    className="bg-paan-dark-blue text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-paan-dark-blue/90 transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
                >
                  <Icon icon="mdi:ticket" width="20" height="20" />
                    {SUMMIT_CANCELLED ? 'Ticket Sales Closed' : 'View Tickets'}
                  </button>
                  <button 
                    disabled={SUMMIT_CANCELLED}
                    onClick={() => window.location.href = '/summit/purchase-ticket'}
                    className="bg-transparent border-2 border-paan-dark-blue text-paan-dark-blue px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-paan-dark-blue hover:text-white transition-all duration-300 font-semibold text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    Learn More
                </button>
          </div>
    
                <div className="text-center">
                  <p className="text-xs sm:text-sm md:text-base text-paan-dark-blue/90 font-medium">Early Bird • General • VIP • Virtual +More</p>
                        </div>
                        </div>
                        </div>
                    </div>
                  
         
      </section>
    </div>
  );
}
