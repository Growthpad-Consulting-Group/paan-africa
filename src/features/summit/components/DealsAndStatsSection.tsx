import Image from "next/image";
import { Icon } from "@iconify/react";

export default function DealsAndStatsSection() {
  return (
    <div className="bg-white relative mt-10 py-12 sm:py-16 md:py-20">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-left mb-8 sm:mb-10 md:mb-12 space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-paan-dark-blue font-normal">Do business, not just talk.</h2>
          <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue mb-4">Walk away with meaningful connections, matched partners, and real deals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          <div className="bg-paan-dark-blue rounded-xl shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-paan-blue to-paan-blue/60 rounded-xl z-0"></div>
            <div className="p-5 sm:p-6 pt-6 sm:pt-8 text-left relative z-10">
              <div className="flex justify-start mb-4 sm:mb-6">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/030-idea%201.svg"
                  alt="Who Should Attend"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
              </div>
              <h4 className="text-lg sm:text-xl font-normal text-white mb-2">Do Business, Not Just Talk</h4>
              <p className="text-white text-sm sm:text-base mb-6 sm:mb-8">Investor connections, signed NDAs, and draft term sheets.</p>
            </div>
          </div>
          <div className="bg-paan-dark-blue rounded-xl shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-paan-yellow to-paan-yellow/60 rounded-xl z-0"></div>
            <div className="p-5 sm:p-6 pt-6 sm:pt-8 text-left relative z-10">
              <div className="flex justify-start mb-4 sm:mb-6">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/007-puzzle%201.svg"
                  alt="Who Should Attend"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
              </div>
              <h4 className="text-lg sm:text-xl font-normal text-white mb-2">Cross-Border Enablement</h4>
              <p className="text-white text-sm sm:text-base mb-6 sm:mb-8">How AfCFTA, PAPSS, and digital rails help you scale across Africa.</p>
            </div>
          </div>
          <div className="bg-paan-dark-blue rounded-xl shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-paan-red to-paan-red/60 rounded-xl z-0"></div>
            <div className="p-5 sm:p-6 pt-6 sm:pt-8 text-left relative z-10">
              <div className="flex justify-start mb-4 sm:mb-6">
                <Image
                  src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/icons/040-user%201.svg"
                  alt="Who Should Attend"
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20"
                />
              </div>
              <h4 className="text-lg sm:text-xl font-normal text-white mb-2">Hands-On Clinics</h4>
              <p className="text-white text-sm sm:text-base mb-6 sm:mb-8">Solve payments, IP rights, residency, and AI tooling with experts at your side.</p>
            </div>
          </div>
        </div>
    
        {/* Stats Section */}
        <div className="mt-8 sm:mt-10 relative rounded-xl overflow-hidden p-6 sm:p-8 md:p-12">
          {/* Gradient Overlay */}
          <div 
            className="absolute inset-0 rounded-xl z-0"
            style={{
              background: 'linear-gradient(to bottom right, #172840, #F25849)'
            }}
          ></div>
          {/* Pattern Background */}
          <div 
            className="absolute inset-0 opacity-50 z-[1]"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/stats-pattern.webp')",
              backgroundRepeat: 'repeat',
              backgroundPosition: 'center',
              backgroundSize: '100% 100%'
            }}
          ></div>
          {/* Content */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center items-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">150+</h2>
                  <p className="text-white text-xs sm:text-sm md:text-base leading-tight">Curated 1:1 investor meetings</p>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center items-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">50+</h2>
                  <p className="text-white text-xs sm:text-sm md:text-base leading-tight">NDAs signed during Deal Rooms</p>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center items-center">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">$10M+</h2>
                  <p className="text-white text-xs sm:text-sm md:text-base leading-tight">In term sheets & MoUs within 90 days</p>
              </div>
              <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center items-center">
                  <Icon icon="mdi:user-group" className="text-white w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[72px] lg:h-[72px]" />
                  <p className="text-white text-xs sm:text-sm md:text-base leading-tight">Dozens of freelancers & creators onboarded to cross-border systems</p>
              </div>
          </div>
        </div>
      </section>
    </div>
  );
}
