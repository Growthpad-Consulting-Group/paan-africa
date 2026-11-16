import Image from 'next/image';
import { translate as t } from '@/hooks/useTranslations';

export default function EventsHero({ upcomingCount }: { upcomingCount: number }) {
  return (
    <>
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-br from-paan-dark-blue via-paan-blue to-paan-dark-blue overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/assets/images/pattern-bg-1.webp"
            alt={t('events.altText.backgroundPattern')}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t('events.hero.title')} <span className="text-paan-yellow">{t('events.hero.titleHighlight')}</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed px-2">
              {t('events.hero.description')}
            </p>
            
            {/* Event Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-paan-yellow mb-2">
                  {upcomingCount}
                </div>
                <div className="text-sm sm:text-base text-white/90">{t('events.hero.stats.upcomingEvents')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-paan-yellow mb-2">
                  10+
                </div>
                <div className="text-sm sm:text-base text-white/90">{t('events.hero.stats.pastEvents')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl font-bold text-paan-yellow mb-2">
                  20+
                </div>
                <div className="text-sm sm:text-base text-white/90">{t('events.hero.stats.citiesAcrossAfrica')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
