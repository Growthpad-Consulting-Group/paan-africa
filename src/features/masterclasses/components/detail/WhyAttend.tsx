import type { Masterclass } from "@/features/masterclasses/lib/masterclassService";
import { Icon } from "@iconify/react";

type Props = {
  masterclass: Masterclass;
};

export default function WhyAttend({ masterclass }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Attend?</h2>
      <div className="space-y-3">
        {masterclass.whyAttend?.map((reason: string, index: number) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
            <Icon icon="mdi:star" className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700 text-sm leading-relaxed">{reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
