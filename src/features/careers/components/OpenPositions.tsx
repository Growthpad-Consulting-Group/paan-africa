"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
import { useAppTranslations } from "@/hooks/useTranslations";
import type { SectionRefs } from "./types";
import type { JobPosting } from "@/features/careers/lib/careerService";
import { roleDescriptionComponents } from "./roleDescription";

export default function OpenPositions({ sectionRefs, expandedJob, setExpandedJob, openModal, positions }: { sectionRefs: SectionRefs; expandedJob: number | null; setExpandedJob: (index: number | null) => void; openModal: (slug?: unknown) => void; positions: JobPosting[] }) {
  const { t } = useAppTranslations();
  // Positions come from Sanity (Job Posting documents); see getStaticProps below.
  const typeLabel = (position: JobPosting) => (position.employmentType === 'Full-time' ? t('careers.openPositions.fullTime') : position.employmentType);
  return (
    <section className="py-16 sm:py-20 bg-white" id="open-positions" ref={sectionRefs.openPositions}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#172840] mb-4">
            {t('careers.openPositions.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('careers.openPositions.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {positions.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-[#84C1D9] transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F2B706]/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              
              {/* Header Section */}
              <div className="relative z-10">
                <div className="mb-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-[#172840] group-hover:text-[#F25849] transition-colors duration-300 mb-3">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-[#84C1D9] text-[#172840] px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                        {(position.location || '').includes('Ghana') ? (
                          <Icon icon="flag:gh-4x3" className="w-4 h-4 inline mr-2" />
                        ) : (position.location || '').includes('South Africa') ? (
                          <Icon icon="flag:za-4x3" className="w-4 h-4 inline mr-2" />
                        ) : (
                          <Icon icon="ic:baseline-location-on" className="w-4 h-4 inline mr-1" />
                        )}
                        {position.location}
                      </span>
                      <span className="bg-[#F2B706] text-[#172840] px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                        <Icon icon="ic:baseline-work" className="w-4 h-4 inline mr-1" />
                        {typeLabel(position)}
                      </span>
                      <span className="bg-[#F25849] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                        <Icon icon="ic:baseline-business" className="w-4 h-4 inline mr-1" />
                        {position.department}
                      </span>
                      {position.duration && (
                        <span className="bg-[#34B6A7] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                          <Icon icon="ic:baseline-schedule" className="w-4 h-4 inline mr-1" />
                          {position.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="mb-6">
                  <p className="text-gray-700 text-base leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-[#84C1D9]">
                    {position.summary}
                  </p>
                </div>

                {/* Requirements Section */}
                <div className="mb-6">
                  <h4 className="font-bold text-[#172840] mb-4 flex items-center">
                    <Icon icon="ic:baseline-verified" className="w-5 h-5 mr-2 text-[#34B6A7]" />
                    Key Requirements
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {position.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-start bg-white p-3 rounded-lg border border-gray-100 hover:border-[#84C1D9] transition-colors duration-200">
                        <Icon icon="ic:baseline-check-circle" className="w-5 h-5 text-[#34B6A7] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 leading-relaxed">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Read More/Read Less Toggle */}
                <div className="mb-6">
                  <button
                    onClick={() => setExpandedJob(expandedJob === index ? null : index)}
                    className="flex items-center justify-center w-full text-[#F25849] hover:text-[#D6473C] hover:bg-[#F25849]/5 transition-all duration-300 font-semibold text-sm py-3 px-4 rounded-lg border border-[#F25849]/20 hover:border-[#F25849]"
                  >
                    {expandedJob === index ? (
                      <>
                        <Icon icon="ic:baseline-keyboard-arrow-up" className="w-5 h-5 mr-2" />
                        Read Less
                      </>
                    ) : (
                      <>
                        <Icon icon="ic:baseline-keyboard-arrow-down" className="w-5 h-5 mr-2" />
                        Read More About This Role
                      </>
                    )}
                  </button>
                  
                  {expandedJob === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm"
                    >
                      <div className="prose prose-sm max-w-none">
                        <PortableText value={position.details} components={roleDescriptionComponents} />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Apply Button */}
                <div className="pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => openModal(position.slug)}
                    className="w-full bg-gradient-to-r from-[#172840] to-[#0F1A2E] text-white py-4 px-6 rounded-xl hover:from-[#F25849] hover:to-[#D6473C] transition-all duration-300 font-bold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group"
                  >
                    <Icon icon="ic:baseline-send" className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    {t('careers.openPositions.applyNow')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          {positions.length === 0 && (
            <p className="text-gray-600 mb-8">We don&apos;t have any open positions right now, but we&apos;re always looking for exceptional talent.</p>
          )}
          {positions.some((p) => p.applyByEmail) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {positions.filter((p) => p.applyByEmail).map((position, i) => (
                <div key={position.slug} className={i % 2 === 0 ? 'bg-[#F2B706] bg-opacity-10 border border-[#F2B706] rounded-lg p-6' : 'bg-[#34B6A7] bg-opacity-10 border border-[#34B6A7] rounded-lg p-6'}>
                  <h4 className="font-semibold text-[#172840] mb-2">{position.title} - Direct Application</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    For the {position.title} position, please send your CV and Cover Letter directly to:
                  </p>
                  <a
                    href={`mailto:${position.applyEmail}?subject=${encodeURIComponent(position.applyEmailSubject)}`}
                    className="text-[#F25849] font-semibold hover:underline"
                  >
                    {position.applyEmail}
                  </a>
                  <p className="text-gray-500 text-xs mt-2">
                    Subject line: &quot;{position.applyEmailSubject}&quot;
                  </p>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-gray-600 mb-4">
            Don't see a position that matches your skills? We're always looking for exceptional talent.
          </p>
          <button 
            onClick={openModal}
            className="bg-transparent border border-[#172840] text-[#172840] py-3 px-8 rounded-full hover:bg-[#172840] hover:text-white transition-all duration-300 font-semibold"
          >
            Send Us Your Resume
          </button>
        </div>
      </div>
    </section>
  );
}
