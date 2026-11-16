import { useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import type { SummitSpeaker } from "@/lib/summitService";

const VISIBLE_SPEAKERS = 3;

export default function SpeakersSection({ speakers }: { speakers: SummitSpeaker[] }) {
  const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(0);
  const visibleSpeakers = VISIBLE_SPEAKERS;

  const nextSpeakers = () => {
    setCurrentSpeakerIndex((prev) => (prev + visibleSpeakers >= speakers.length ? 0 : prev + 1));
  };

  const prevSpeakers = () => {
    setCurrentSpeakerIndex((prev) => (prev === 0 ? Math.max(0, speakers.length - visibleSpeakers) : prev - 1));
  };

  const getVisibleSpeakers = () => speakers.slice(currentSpeakerIndex, currentSpeakerIndex + visibleSpeakers);

  return (
    <div className="bg-white relative py-12 sm:py-16 md:py-20" id="speakers-section">
       <section className="relative mx-auto max-w-6xl px-4 sm:px-6">
         <div className="flex flex-col sm:flex-row justify-between items-start mb-6 sm:mb-8 gap-4">
           <div>
             <h3 className="text-3xl sm:text-4xl text-paan-dark-blue font-normal">Meet the speakers</h3>
             <p className="text-base sm:text-lg md:text-xl font-normal text-paan-dark-blue mb-4">Africa's top creators, innovators, and enablers.</p>
           </div>
           {/* Navigation arrows */}
           <div className="flex gap-2 self-end">
             <button 
               onClick={prevSpeakers}
               className="w-10 h-10 sm:w-12 sm:h-12 border border-paan-dark-blue text-paan-dark-blue rounded-full flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors duration-300 shadow-lg"
               disabled={currentSpeakerIndex === 0}
             >
               <Icon icon="mdi:chevron-left" width="20" height="20" />
             </button>
             <button 
               onClick={nextSpeakers}
               className="w-10 h-10 sm:w-12 sm:h-12 border border-paan-dark-blue text-paan-dark-blue rounded-full flex items-center justify-center hover:bg-paan-dark-blue hover:text-white transition-colors duration-300 shadow-lg"
               disabled={currentSpeakerIndex + visibleSpeakers >= speakers.length}
             >
               <Icon icon="mdi:chevron-right" width="20" height="20" />
             </button>
           </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
           {getVisibleSpeakers().map((speaker, index) => {
             // Cycle through PAAN colors: yellow, red, blue, dark-blue
             const colors = ['#F2B706', '#F25849', '#84C1D9', '#172840']; // paan-yellow, paan-red, paan-blue, paan-dark-blue
             const hoverColor = colors[index % 4];
             
             return (
               <div key={speaker.id} className="relative rounded-xl shadow-xl overflow-hidden group cursor-pointer h-80 sm:h-96">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
                 {/* Speaker info at bottom with PAAN colors overlay on hover */}
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent group-hover:bg-gradient-to-t group-hover:from-black/0 group-hover:to-transparent transition-all duration-300 p-4 sm:p-6">
                   {/* PAAN color overlay with fade to top on hover */}
                   <div 
                     className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                     style={{ 
                       background: `linear-gradient(to top, ${hoverColor} 0%, ${hoverColor} 40%, rgba(0,0,0,0) 100%)`
                     }}
                   ></div>
                   <div className="relative z-10 flex justify-between items-center">
                     <div>
                       <h4 className="text-lg sm:text-xl font-bold text-white mb-1">{speaker.name}</h4>
                       <p className="text-white/90 text-xs sm:text-sm">{speaker.title}</p>
                     </div>
                     <div className="flex-shrink-0">
                       <a 
                         href={speaker.linkedin ?? undefined} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="hover:scale-110 transition-transform duration-200"
                       >
                         <Icon icon="mdi:linkedin" className="text-white" width="20" height="20" />
                       </a>
                     </div>
                   </div>
                 </div>
               </div>
             );
           })}
         </div>
          <div className="flex justify-center sm:justify-start gap-2 mt-6 sm:mt-8">
            <button 
              onClick={() => window.location.href = '/summit/speaker-application'} 
              className="bg-gradient-to-r from-paan-yellow to-paan-blue border border-transparent text-white px-6 sm:px-8 py-3 rounded-full hover:opacity-90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Apply to Speak
            </button>
          </div>
      </section>
    </div>
  );
}
