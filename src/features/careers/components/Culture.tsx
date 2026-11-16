"use client";

import { motion } from "framer-motion";
import type { SectionRefs } from "@/features/careers/components/types";

export default function Culture({ sectionRefs }: { sectionRefs: SectionRefs }) {
  const values = [
    {
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, delivering exceptional results for our clients and partners.",
      color: "bg-[#F2B706]"
    },
    {
      title: "Innovation",
      description: "We embrace new ideas and technologies, constantly pushing boundaries to create better solutions.",
      color: "bg-[#84C1D9]"
    },
    {
      title: "Collaboration",
      description: "We believe in the power of teamwork and diverse perspectives to achieve extraordinary outcomes.",
      color: "bg-[#F25849]"
    },
    {
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethical practices in all our business relationships.",
      color: "bg-[#34B6A7]"
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#172840]" ref={sectionRefs.culture}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Culture & Values
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our values guide everything we do, from how we work together to how we serve our clients and community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className={`${value.color} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-white font-bold text-lg">
                    {value.title.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#172840]">
                  {value.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
