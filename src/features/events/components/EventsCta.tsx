import { translate as t } from '@/shared/hooks/useTranslations';

export default function EventsCta() {
  return (
    <>
      <section className="py-12 sm:py-16 bg-paan-blue text-paan-dark-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12 sm:pb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-paan-dark-blue mb-4 sm:mb-6">
            {t('events.cta.title')}
          </h2>
          <p className="text-lg sm:text-xl text-paan-dark-blue/90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            {t('events.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
            <a
              href="https://membership.paan.africa/"
              className="bg-paan-red hover:bg-paan-red/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
            >
              {t('events.cta.joinNetwork')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
