"use client";

import Image from "next/image";
import { useCountUp } from "@/features/careers/hooks/useCountUp";
import { useAppTranslations } from "@/shared/hooks/useTranslations";
import type { SectionRefs } from "@/features/careers/components/types";

export default function Hero({ sectionRefs }: { sectionRefs: SectionRefs }) {
  const { t } = useAppTranslations();
  const { count: countriesCount, elementRef: countriesRef } = useCountUp(20, 0, 2000, 0);
  const { count: agenciesCount, elementRef: agenciesRef } = useCountUp(200, 0, 2000, 200);
  const { count: creatorsCount, elementRef: creatorsRef } = useCountUp(1000, 0, 2000, 400);

  return (
    <div
      className="relative min-h-screen w-full bg-[#172840] overflow-visible pt-16 sm:pt-18 lg-custom:pt-20" 
      id="home"
      ref={sectionRefs.home}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/assets/images/bg-pattern.svg')"
        }}
      />

      <div className="relative min-h-screen flex mx-auto max-w-7xl">
        <div className="w-full px-4 sm:px-6 md:px-8 pb-8 sm:pb-44 flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 py-8 sm:py-12 lg:py-16">
          {/* Text Content */}
          <div className="flex-1 max-w-3xl text-left space-y-4 sm:space-y-6 lg:space-y-8 w-full">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm text-[#84C1D9] relative uppercase tracking-wide font-semibold">
                {t('careers.hero.subtitle')}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white relative font-bold leading-tight">
                {t('careers.hero.title')}
              </h1>
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 font-light w-full leading-relaxed">
                {t('careers.hero.description')}
              </p>  
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <button 
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#F25849] border border-[#F25849] text-white py-3 sm:py-4 px-4 sm:px-6 md:px-8 lg:px-10 rounded-full hover:bg-[#D6473C] transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-semibold text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
              >
                {t('careers.hero.viewPositions')}
              </button>
              <button 
                onClick={() => document.getElementById('why-join-us')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border border-white text-white py-3 sm:py-4 px-4 sm:px-6 md:px-8 lg:px-10 rounded-full hover:bg-white hover:text-[#172840] transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-semibold text-sm sm:text-base w-full sm:w-auto min-h-[44px]"
              >
                {t('careers.hero.learnAboutUs')}
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl mt-6 sm:mt-4 lg:mt-0 w-full">
            <div className="relative">
              <Image
                src="https://ik.imagekit.io/nkmvdjnna/PAAN/Careers/hero.jpg"
                alt="PAAN Team - Join Our Dynamic Team"
                width={600}
                height={400}
                className="w-full h-auto rounded-xl object-cover shadow-2xl max-h-[300px] sm:max-h-[400px] lg:max-h-none"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 600px"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="absolute -bottom-8 sm:-bottom-16 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4 sm:px-6 md:px-8 z-10 hidden sm:block">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="w-full h-40 sm:h-48 p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F2B706] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2 text-center">
              <div ref={countriesRef} className="text-3xl font-bold text-[#172840]">
                {countriesCount}+
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-[#172840]">{t('careers.stats.countries')}</h3>
              <p className="font-light text-xs sm:text-sm text-gray-600">{t('careers.stats.countriesSubtext')}</p>
            </div>
          </div>
          <div className="w-full h-40 sm:h-48 p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#84C1D9] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2 text-center">
              <div ref={agenciesRef} className="text-3xl font-bold text-[#172840]">
                {agenciesCount}+
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-[#172840]">{t('careers.stats.agencies')}</h3>
              <p className="font-light text-xs sm:text-sm text-gray-600">{t('careers.stats.agenciesSubtext')}</p>
            </div>
          </div>
          <div className="w-full h-40 sm:h-48 p-6 flex items-center justify-center bg-white rounded-lg shadow-lg hover:bg-[#F25849] transition-colors duration-300 cursor-pointer">
            <div className="flex flex-col gap-2 text-center">
              <div ref={creatorsRef} className="text-3xl font-bold text-[#172840]">
                {creatorsCount}+
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-[#172840]">{t('careers.stats.creators')}</h3>
              <p className="font-light text-xs sm:text-sm text-gray-600">{t('careers.stats.creatorsSubtext')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
