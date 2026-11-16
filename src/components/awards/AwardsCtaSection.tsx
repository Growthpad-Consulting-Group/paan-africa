import { Icon } from "@iconify/react";

type Props = {
  setIsApplicationModalOpen: any;
};

export default function AwardsCtaSection({ setIsApplicationModalOpen }: Props) {
  return (
    <div className="relative py-12 md:py-16 lg:py-20 overflow-hidden min-h-[400px] md:min-h-[450px] lg:h-[500px]" id="parallax-section">
      {/* Parallax Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center lg:bg-fixed"
        style={{
          backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/image-4.png')",
          filter: "brightness(0.8)"
        }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
      
      <section className="relative mx-auto max-w-6xl h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 md:mb-10 lg:mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold uppercase leading-tight mb-4 md:mb-6 px-2">
              Are You Africa's Next Creative Leader?
            </h3>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white leading-relaxed px-4">
              Join the most prestigious celebration of creativity in Africa. Showcase your impact, inspire the industry, and own the stage at the PAAN Summit Awards.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <button 
              onClick={() => setIsApplicationModalOpen(true)} 
              className="w-full sm:w-auto bg-paan-red text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm md:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
            >
              Apply Now
            </button>
            
            <button 
              onClick={() => window.location.href = '/summit'} 
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white hover:text-paan-dark-blue transition-all duration-300 font-medium text-sm md:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
            >
              Join 2026 Summit
            </button>
            
            <a 
              href="/paan-awards-terms"
              target="_blank"
              className="w-full sm:w-auto bg-white/10 border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/20 transition-all duration-300 font-medium text-sm md:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
            >
              <Icon icon="mdi:gavel" className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Terms & Conditions</span>
              <span className="sm:hidden">Terms</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
