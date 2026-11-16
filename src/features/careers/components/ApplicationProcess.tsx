"use client";

import { motion } from "framer-motion";
import { useAppTranslations } from "@/shared/hooks/useTranslations";
import type { SectionRefs } from "@/features/careers/components/types";

export default function ApplicationProcess({ sectionRefs, openModal }: { sectionRefs: SectionRefs; openModal: (slug?: unknown) => void }) {
  const { t } = useAppTranslations();
  const steps = [
    {
      number: 1,
      title: "Apply Online",
      description: "Submit your application through our careers portal with your resume and cover letter."
    },
    {
      number: 2,
      title: "Initial Review",
      description: "Our team reviews your application and reaches out within 5 business days if there's a match."
    },
    {
      number: 3,
      title: "Interview Process",
      description: "Participate in interviews with our team to discuss your experience and fit."
    },
    {
      number: 4,
      title: "Decision & Onboarding",
      description: "Receive our decision and join our team with a comprehensive onboarding experience."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-white" ref={sectionRefs.application}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#172840] mb-4">
            {t('careers.application.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('careers.application.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-[#F2B706]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="bg-[#F2B706] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-[#172840] font-bold text-2xl">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-[#172840] mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={openModal}
            className="bg-[#F25849] text-white py-4 px-8 rounded-full hover:bg-[#D6473C] transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-semibold text-lg shadow-lg"
          >
            Start Your Application
          </button>
        </div>
      </div>
    </section>
  );
}
