import type { Masterclass } from "@/features/masterclasses/lib/masterclassService";
import { Icon } from "@iconify/react";

type Props = {
  masterclass: Masterclass;
};

export default function InstructorCard({ masterclass }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Your Instructor</h3>
      <div className="text-center mb-4">
        <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden border-2 border-red-100">
          {masterclass.instructor.image ? (
            <img
              src={masterclass.instructor.image}
              alt={masterclass.instructor.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                (img.nextSibling as HTMLElement).style.display = 'flex';
              }}
            />
          ) : null}
          <div className={`w-full h-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center ${masterclass.instructor.image ? 'hidden' : 'flex'}`}>
            <Icon icon="mdi:account" className="w-10 h-10 text-white" />
          </div>
        </div>
        <h4 className="font-semibold text-slate-900">{masterclass.instructor.name}</h4>
        <p className="text-gray-600 text-sm">{masterclass.instructor.title}</p>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        {masterclass.instructor.bio}
      </p>
      <div>
        <h5 className="font-semibold text-slate-900 mb-2 text-sm">Expertise:</h5>
        <div className="flex flex-wrap gap-2">
          {masterclass.instructor.expertise.map((skill: string, index: number) => (
            <span key={index} className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
