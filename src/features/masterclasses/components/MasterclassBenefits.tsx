import { Icon } from "@iconify/react";

export default function MasterclassBenefits() {
  return (
    <section className="bg-[#172840] py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose PAAN Masterclasses?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Designed specifically for African agencies with real-world applications
          </p>
        </div>
    
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-[#F25849] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="mdi:account-group" className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Expert Instructors</h3>
            <p className="text-gray-300">
              Learn from seasoned professionals with proven track records in African markets
            </p>
          </div>
    
          <div className="text-center">
            <div className="bg-[#84C1D9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="mdi:lightbulb" className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Practical Learning</h3>
            <p className="text-gray-300">
              Hands-on sessions with real case studies and actionable frameworks
            </p>
          </div>
    
          <div className="text-center">
            <div className="bg-[#F2B706] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="mdi:certificate" className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Certification</h3>
            <p className="text-gray-300">
              Receive recognized certificates to showcase your professional development
            </p>
          </div>
    
          <div className="text-center">
            <div className="bg-[#F25849] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="mdi:network" className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Networking</h3>
            <p className="text-gray-300">
              Connect with fellow agency leaders and build valuable professional relationships
            </p>
          </div>
    
          <div className="text-center">
            <div className="bg-[#84C1D9] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="mdi:play-circle" className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Flexible Format</h3>
            <p className="text-gray-300">
              Live interactive sessions with recordings available for later review
            </p>
          </div>
    
          <div className="text-center">
            <div className="bg-[#F2B706] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="mdi:star" className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Member Benefits</h3>
            <p className="text-gray-300">
              Exclusive discounts and additional perks for PAAN network members
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
