import type { Translate } from "./types";
import { handleScroll } from "@/shared/lib/scrollUtils";

type Props = {
  t: Translate;
};

export default function AgencyJoinCta({ t }: Props) {
  return (
    <div className="bg-paan-red relative mb-10 sm:mb-0">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-paan-dark-blue mb-6 sm:mb-8">
              {t('certifiedAgencies.common.cta.joinNetworkTitle')}
            </h3>
            <p className="text-paan-dark-blue text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
              {t('certifiedAgencies.common.cta.joinNetworkDescription')}
            </p>
            <button                  
              className="bg-paan-dark-blue text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-normal text-base sm:text-lg hover:bg-[#D6473C] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto min-w-[280px]"
              onClick={(e) => {
                handleScroll(e, "https://membership.paan.africa/");
              }}
            >
              {t('certifiedAgencies.common.cta.becomeMemberButton')}
            </button>
        </div>
      </section>
    </div>
  );
}
