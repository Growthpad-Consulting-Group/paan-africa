"use client";

import { Icon } from "@iconify/react";

export default function RFPBanner() {
  return (
    <section className="py-12 sm:py-16 bg-paan-dark-blue relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('/assets/images/bg-pattern.svg')"
        }}
      />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          {/* Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm">
              <Icon icon="ic:baseline-description" className="w-8 h-8 text-white" />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Call for Proposals (RFP)
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're seeking innovative partners and service providers to collaborate with PAAN.
              Submit your proposals for exciting opportunities across our Pan-African network.
            </p>
          </div>
          
           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/assets/documents/PAAN_SUMMIT_RFP.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-white text-paan-dar-blue py-4 px-8 rounded-full hover:bg-gray-100 transition-all duration-300 transform ease-in-out hover:translate-y-[-2px] font-bold text-base shadow-lg hover:shadow-xl flex items-center group"
            >
              <Icon icon="ic:baseline-download" className="w-5 h-5 mr-2 group-hover:translate-y-1 transition-transform duration-300" />
              Download RFP Document
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Icon icon="ic:baseline-business" className="w-6 h-6 text-white mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Strategic Partnerships</h3>
              <p className="text-white/80 text-sm">Long-term collaboration opportunities</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Icon icon="ic:baseline-lightbulb" className="w-6 h-6 text-white mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Innovation Projects</h3>
              <p className="text-white/80 text-sm">Cutting-edge solutions and services</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Icon icon="ic:baseline-public" className="w-6 h-6 text-white mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Pan-African Reach</h3>
              <p className="text-white/80 text-sm">Access to 20+ African markets</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
