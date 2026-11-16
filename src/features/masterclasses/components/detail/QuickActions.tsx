import { Icon } from "@iconify/react";

type Props = {
  handleShare: () => void | Promise<void>;
};

export default function QuickActions({ handleShare }: Props) {
  return (
    <div className="bg-amber-50 rounded-xl shadow-lg p-6 border border-amber-200">
      <h3 className="text-base font-bold text-slate-900 mb-3">Quick Actions</h3>
      <div className="space-y-2">
        <button
          onClick={handleShare}
          className="w-full bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 text-sm border border-gray-200"
        >
          <Icon icon="mdi:share" className="w-4 h-4" />
          Share This
        </button>
    
        <button
          onClick={() => (window.location.href = "/masterclasses")}
          className="w-full bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm border border-gray-200"
        >
          Browse More
        </button>
      </div>
    </div>
  );
}
