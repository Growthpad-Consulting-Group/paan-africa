import type { Masterclass } from "@/features/masterclasses/lib/masterclassService";


type Props = {
  masterclass: Masterclass;
};

export default function AboutMasterclass({ masterclass }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Masterclass</h2>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>{masterclass.fullDescription}</p>
        <p>{masterclass.outcome}</p>
      </div>
    </div>
  );
}
