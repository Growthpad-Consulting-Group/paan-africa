import { Icon } from "@iconify/react";

type Props = {
  setIsApplicationModalOpen: any;
};

export default function AwardCategoriesBanner({ setIsApplicationModalOpen }: Props) {
  return (
    <section className="bg-paan-dark-blue py-12" id="award-categories-section">
      <div className="max-w-7xl mx-auto p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Award Categories</h3>
          <p className="text-white/90 text-center mb-8 max-w-3xl mx-auto">
            The PAAN Awards recognize excellence across five major clusters:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-paan-red rounded-full flex items-center justify-center mb-4">
                <Icon icon="mdi:bullhorn" className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Campaign Excellence Awards</h4>
              <p className="text-white/80 text-sm">PR, Communication, OOH, Social Media, Content, Influencer, CSR/Impact, Integrated, B2B, and Experiential campaigns.</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-paan-blue rounded-full flex items-center justify-center mb-4">
                <Icon icon="mdi:office-building" className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Agency Excellence Awards</h4>
              <p className="text-white/80 text-sm">Digital, Creative, Design & Branding, Media Buying, Production, Specialist, Rising, Regional, and Independent agencies.</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-paan-yellow rounded-full flex items-center justify-center mb-4">
                <Icon icon="mdi:lightbulb" className="w-6 h-6 text-paan-dark-blue" />
              </div>
              <h4 className="font-semibold mb-2">Innovation & Technology Awards</h4>
              <p className="text-white/80 text-sm">Tech Innovation, Creative Use of Data, and E-Commerce Marketing.</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                <Icon icon="mdi:bank" className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Sector Excellence Awards</h4>
              <p className="text-white/80 text-sm">Public Sector and Financial Services campaigns.</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-gradient-to-r from-paan-red to-paan-yellow rounded-full flex items-center justify-center mb-4">
                <Icon icon="mdi:crown" className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Special Honors</h4>
              <p className="text-white/80 text-sm">Agency Leader of the Year and the Grand Prix: Agency of the Year.</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button
              className="bg-paan-red text-white px-8 py-4 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1 mx-auto"
              onClick={() => setIsApplicationModalOpen(true)}
            >
              <Icon icon="mdi:trophy" className="w-5 h-5" />
              Apply for Awards
            </button>
          </div>
        </div>
    </section>
  );
}
