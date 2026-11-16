"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useAppTranslations } from "@/shared/hooks/useTranslations";
import type { SectionRefs } from "@/features/careers/components/types";

export default function WhyJoinUs({ sectionRefs }: { sectionRefs: SectionRefs }) {
  const { t } = useAppTranslations();
  const reasons = [
    {
      icon: "ic:baseline-public",
      title: t('careers.whyJoinUs.impact.title'),
      description: t('careers.whyJoinUs.impact.description')
    },
    {
      icon: "ic:baseline-trending-up",
      title: t('careers.whyJoinUs.growth.title'),
      description: t('careers.whyJoinUs.growth.description')
    },
    {
      icon: "ic:baseline-group",
      title: t('careers.whyJoinUs.culture.title'),
      description: t('careers.whyJoinUs.culture.description')
    },
    {
      icon: "ic:baseline-lightbulb",
      title: t('careers.whyJoinUs.mission.title'),
      description: t('careers.whyJoinUs.mission.description')
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#84C1D9]" id="why-join-us" ref={sectionRefs.whyJoinUs}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#172840] mb-4">
            {t('careers.whyJoinUs.title')}
          </h2>
          <p className="text-lg text-[#172840] max-w-2xl mx-auto">
            {t('careers.whyJoinUs.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-[#F2B706] p-3 rounded-lg">
                  <Icon icon={reason.icon} className="w-6 h-6 text-[#172840]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#172840] mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
