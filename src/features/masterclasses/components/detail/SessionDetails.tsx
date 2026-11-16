import type { Masterclass } from "@/features/masterclasses/lib/masterclassService";
import { Icon } from "@iconify/react";

type Props = {
  masterclass: Masterclass;
};

export default function SessionDetails({ masterclass }: Props) {
  return (
    <div className="bg-slate-800 text-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold mb-4">Session Details</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Icon icon="mdi:calendar" className="text-red-400 w-5 h-5 mt-0.5" />
          <div>
            <div className="font-medium text-sm">{masterclass.date}</div>
            <div className="text-xs text-gray-300">Date</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon icon="mdi:clock" className="text-red-400 w-5 h-5 mt-0.5" />
          <div>
            <div className="font-medium text-sm">{masterclass.time}</div>
            <div className="text-xs text-gray-300">Time</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon icon="mdi:play-circle" className="text-red-400 w-5 h-5 mt-0.5" />
          <div>
            <div className="font-medium text-sm">{masterclass.format}</div>
            <div className="text-xs text-gray-300">Format</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Icon icon="mdi:web" className="text-red-400 w-5 h-5 mt-0.5" />
          <div>
            <div className="font-medium text-sm">Interactive Online Live</div>
            <div className="text-xs text-gray-300">Platform</div>
          </div>
        </div>
      </div>
    </div>
  );
}
