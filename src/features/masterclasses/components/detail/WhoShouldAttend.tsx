import type { Masterclass } from "@/features/masterclasses/lib/masterclassService";
import { Icon } from "@iconify/react";

type Props = {
  masterclass: Masterclass;
};

export default function WhoShouldAttend({ masterclass }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Who Should Attend?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {masterclass.whoShouldAttend?.map((attendee: string, index: number) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
            <Icon icon="mdi:account-tie" className="text-cyan-600 w-5 h-5 flex-shrink-0" />
            <span className="text-gray-700 font-medium text-sm">{attendee}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
