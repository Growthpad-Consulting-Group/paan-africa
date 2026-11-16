import Image from "next/image";

type Props = {
  sectionRefs: any;
  setIsApplicationModalOpen: any;
};

export default function AwardsAboutSection({ sectionRefs, setIsApplicationModalOpen }: Props) {
  return (
    <div className="bg-[#F3F9FB]" id="about-us" ref={sectionRefs.about}>
    <section className="relative mx-auto max-w-6xl px-6 sm:px-0">
      <div className="grid lg:grid-cols-2 gap-4 py-20 items-center">
        <div className="flex flex-col gap-8 z-0">
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl lg:text-5xl text-[#172840] uppercase font-bold leading-tight">20+ Categories. One Continental Stage.</h2>
            <p className="text-lg text-[#172840] font-light leading-relaxed">From Agency of the Year to Best Use of AI, these awards celebrate the people, brands, and ideas driving Africa's creative future.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/healthicons_award-trophy.svg" alt="Agency of the Year" className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg font-bold text-[#172840] leading-tight">Agency of the Year</h4>
            </div>
            <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/mdi_leaf-circle.svg" alt="Sustainability & Purpose" className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg font-bold text-[#172840] leading-tight">Sustainability & Purpose</h4>  
            </div>
            <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ix_handshake.svg" alt="Cross-Border Collaboration" className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg font-bold text-[#172840] leading-tight">Cross-Border Collaboration</h4>  
            </div>
            <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/material-symbols_target.svg" alt="Creative Campaign" className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg font-bold text-[#172840] leading-tight">Creative Campaign</h4>  
            </div>
            <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/heroicons_user-solid.svg" alt="Agency CEO" className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg font-bold text-[#172840] leading-tight">Agency CEO</h4>  
            </div>
            <div className="bg-[#C2E0EC] rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/icons/ri_speak-ai-fill.svg" alt="Best Use of AI" className="w-full h-full object-contain" />
                </div>
                <h4 className="text-lg font-bold text-[#172840] leading-tight">Best Use Of AI</h4>  
            </div>
          </div>
    
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              className="bg-[#F25849] text-white rounded-full px-8 py-4 text-base font-semibold hover:bg-[#E0473A] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" 
              onClick={() => setIsApplicationModalOpen(true)}
            >
              Apply Now
            </button>
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img 
              src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/imag-1.png" 
              alt="PAAN Awards" 
              className="h-[500px] w-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
    <Image
        src="/assets/images/bg-pattern.svg"
        width={0}
        height={0}
        alt="Background Pattern"
        className="absolute bottom-0 left-0 w-full h-1/3 object-cover z-0 opacity-10"
      />
    </div>
  );
}
