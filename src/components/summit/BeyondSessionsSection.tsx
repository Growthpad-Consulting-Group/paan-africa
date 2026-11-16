import type { SummitSession } from "@/lib/summitService";
import Image from "next/image";

type Props = {
  sessions: SummitSession[];
};

export default function BeyondSessionsSection({ sessions }: Props) {
  return (
    <div className="relative py-12 sm:py-16 md:py-20 overflow-hidden" id="sessions-section">
       {/* Gradient Background */}
       <div 
         className="absolute inset-0 z-0"
         style={{
           background: 'linear-gradient(to bottom right, #172840, #F25849)'
         }}
       ></div>
       {/* Pattern Background */}
       <div 
         className="absolute inset-0 z-[1]"
         style={{
           backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/summit/beyond-session-pattern.webp?updatedAt=1765954397048')",
           backgroundRepeat: 'repeat',
           backgroundPosition: 'center',
           backgroundSize: 'cover',
           opacity: 0.3
         }}
       ></div>
       <section className="relative mx-auto max-w-6xl px-4 sm:px-6 z-10">
         <div className="flex flex-col sm:flex-row justify-center items-center mb-6 sm:mb-8 gap-4">
           <div>                 
             <h3 className="text-3xl sm:text-4xl text-white font-normal">Beyond the sessions</h3>
             <p className="text-base sm:text-lg md:text-xl font-normal text-white mb-4">Experience Nairobi and make connections that last.</p>
           </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
           {sessions.slice(0, 3).map((session: SummitSession) => (
             <div key={session.id} className="relative rounded-xl shadow-xl overflow-hidden group cursor-pointer h-80 sm:h-96">
               {session.image && (
                 <Image
                   src={session.image}
                   alt={session.title}
                   width={400}
                   height={500}
                   className="w-full h-full object-cover"
                 />
               )}
               {/* Dark overlay for content visibility */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
               
               {/* Session info at bottom */}
               <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 group-hover:bg-white transition-all duration-300 rounded-t-xl flex flex-col">
                 <div className="flex-1"></div>
                 <div>
                   <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-paan-dark-blue transition-colors duration-300">{session.title}</h4>
                   <p className="hidden group-hover:block transition-all duration-300 text-paan-dark-blue text-xs sm:text-sm leading-relaxed mt-2">{session.description}</p>
                 </div>
               </div>
                   </div>
           ))}
                 </div>
      </section>
    </div>
  );
}
