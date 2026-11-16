import { Icon } from "@iconify/react";

export default function AwardsExplorerSection() {
  return (
    <div className="bg-white relative py-12 md:py-16 lg:py-20" id="paan-awards-section">
    <section className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-paan-dark-blue font-bold leading-tight mb-4 md:mb-6 px-4">
            Explore Award Categories & Criteria
        </h2>
        <p className="text-base sm:text-lg text-paan-dark-blue font-light leading-relaxed max-w-4xl mx-auto px-4">
          Two paths. Same stage. Choose your track and see the full list.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      <div className="bg-paan-dark-blue rounded-xl shadow-lg p-5 md:p-6 flex flex-col text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-2xl">
        <div className="flex gap-4 items-start">
          <img 
            src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/award.svg" 
            alt="Campaign Excellence Awards" 
            width={32} 
            height={32}
            className="flex-shrink-0"
          />
          <div className="flex flex-col text-white text-left">
            <h3 className="font-bold text-xl mb-1">Agency Awards</h3>
            <p className="text-white font-light text-xs md:text-sm leading-relaxed">
              For independent agencies across Africa—campaigns, craft, innovation, sectors, and top honours.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-8 mb-6 justify-center">
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Campaign Excellence</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Agency of the Year</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Innovation & Technology</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Sector Excellence</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Creative Strategy</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Special Honours</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">+20 more</p>
          </div>
        </div>
        
        <div className="mt-8 mx-auto">
          <button onClick={() => window.location.href = '/paan-awards/categories'} className="bg-paan-red text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
            Browse Agency Categories
            <Icon icon="mdi:arrow-right" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="bg-paan-dark-blue rounded-xl shadow-lg p-5 md:p-6 flex flex-col text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-2xl">
        <div className="flex gap-4 items-start">
          <img 
            src="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/award.svg" 
            alt="Campaign Excellence Awards" 
            width={32} 
            height={32}
            className="flex-shrink-0"
          />
          <div className="flex flex-col text-white text-left">
            <h3 className="font-bold text-xl mb-1">Freelancer Awards</h3>
            <p className="text-white font-light text-xs md:text-sm leading-relaxed">
               For Africa’s independent creators—design, performance, and modern storytelling.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-8 mb-6 justify-center">
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Creative Excellence</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Digital Performance</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">UI/UX & Product Design</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Motion & Video</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Social Storytelling</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">Innovation & Content</p>
          </div>
          <div className="bg-white py-2 px-4 rounded-full">
            <p className="text-sm text-gray-800">+10 more</p>
          </div>
        </div>
        
        <div className="mt-8 mx-auto">
          <button onClick={() => window.location.href='/paan-awards/categories'} className="bg-paan-red text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
            Browse Freelancer Categories
            <Icon icon="mdi:arrow-right" className="w-5 h-5" />
          </button>
        </div>
      </div>
      </div>
    </section>
    </div>
  );
}
