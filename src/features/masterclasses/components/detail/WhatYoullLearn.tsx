import type { Masterclass } from "@/features/masterclasses/lib/masterclassService";
import { Icon } from "@iconify/react";

type Props = {
  masterclass: Masterclass;
};

export default function WhatYoullLearn({ masterclass }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {masterclass.learningOutcomes?.map((outcome: string, index: number) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <Icon icon="mdi:check-circle" className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 text-sm">{outcome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
