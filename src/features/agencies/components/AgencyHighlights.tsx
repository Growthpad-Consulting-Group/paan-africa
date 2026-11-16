import type { Tier, Translate, Agency } from "@/features/agencies/components/types";
import Image from "next/image";
import { Icon } from "@iconify/react";

type Props = {
  t: Translate;
  tier: Tier;
  agency: Agency;
};

export default function AgencyHighlights({ t, tier, agency }: Props) {
  return (
    <div className="bg-gradient-to-r from-paan-blue/5 to-paan-dark-blue/5 py-8 relative z-10">
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          
          {/* Certification Status */}
          <div className="text-center">
            <div className="inline-flex items-center bg-white rounded-2xl px-6 py-4 shadow-lg border border-paan-blue/20">
              <Image 
                src="/assets/images/certified-members-badge.svg" 
                width={40} 
                height={40} 
                alt="PAAN Badge" 
                className="mr-3" 
              />
                                  <div className="text-left">
                  <div className="text-sm text-gray-600">{t('certifiedAgencies.common.certification.status')}</div>
                  <div className="font-semibold text-paan-dark-blue">{t('certifiedAgencies.common.certification.paanCertified')}</div>
                </div>
            </div>
          </div>
    
          {/* Membership Level */}
          <div className="text-center">
            <div className={`inline-flex items-center bg-gradient-to-r ${tier.gradient} rounded-2xl px-6 py-4 shadow-lg`}>
                                  <Icon icon="mdi:crown" className="w-10 h-10 text-white mr-3" />
                <div className="text-left">
                  <div className="text-sm text-gray-100">{t('certifiedAgencies.common.certification.membershipLevel')}</div>
                  <div className="font-bold text-white">{t(tier.labelKey)}</div>
                </div>
            </div>
          </div>
    
          {/* Years of Service */}
          <div className="text-center">
            <div className="inline-flex items-center bg-white rounded-2xl px-6 py-4 shadow-lg border border-paan-blue/20">
                                  <Icon icon="mdi:calendar-check" className="w-10 h-10 text-paan-blue mr-3" />
                <div className="text-left">
                  <div className="text-sm text-gray-600">{t('certifiedAgencies.common.certification.memberSince')}</div>
                  <div className="font-semibold text-paan-dark-blue">{agency.memberSince}</div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
