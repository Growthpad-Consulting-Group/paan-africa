import type { Masterclass } from "@/features/masterclasses/lib/masterclassService";
import { Icon } from "@iconify/react";

type Props = {
  masterclass: Masterclass;
};

export default function MasterclassHero({ masterclass }: Props) {
  return (
    <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 pt-40 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Content */}
          <div className="space-y-6">
            <button
              onClick={() => (window.location.href = "/masterclasses")}
              className="inline-flex items-center text-cyan-400 hover:text-white transition-colors text-sm"
            >
              <Icon icon="mdi:arrow-left" className="w-4 h-4 mr-2" />
              Back to Masterclasses
            </button>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold">
                {masterclass.category}
              </span>
              <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {masterclass.level}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                masterclass.status === 'upcoming' ? 'bg-red-500 text-white' :
                masterclass.status === 'completed' ? 'bg-gray-500 text-white' :
                masterclass.status === 'not-accepting-bookings' ? 'bg-gray-500 text-white' :
                'bg-red-500 text-white'
              }`}>
                {masterclass.status === 'upcoming' ? 'UPCOMING' :
                 masterclass.status === 'completed' ? 'COMPLETED' :
                 masterclass.status === 'not-accepting-bookings' ? 'NOT ACCEPTING BOOKINGS' :
                 'UPCOMING'}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {masterclass.title}
            </h1>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              {masterclass.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              <div className="flex items-center gap-3 text-white text-sm">
                <Icon icon="mdi:calendar" className="text-red-400 w-5 h-5" />
                <span>{masterclass.date}</span>
              </div>
              <div className="flex items-center gap-3 text-white text-sm">
                <Icon icon="mdi:clock" className="text-red-400 w-5 h-5" />
                <span>{masterclass.time}</span>
              </div>
              <div className="flex items-center gap-3 text-white text-sm">
                <Icon icon="mdi:play-circle" className="text-red-400 w-5 h-5" />
                <span>{masterclass.format}</span>
              </div>
              <div className="flex items-center gap-3 text-white text-sm">
                <Icon icon="mdi:account-tie" className="text-red-400 w-5 h-5" />
                <span>{masterclass.instructor.name}</span>
              </div>
            </div>
          </div>
    
          {/* Image */}
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
            <img
              src={masterclass.image}
              alt={`${masterclass.title} masterclass`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
