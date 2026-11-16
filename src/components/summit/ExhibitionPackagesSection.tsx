import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function ExhibitionPackagesSection() {
  return (
    <div 
      className="bg-[#DAECF3] py-12 sm:py-16 md:py-20"
    >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-paan-dark-blue mb-4 sm:mb-6">
            Exhibition Packages & Pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the perfect exhibition package for your business needs and budget.
          </p>
        </motion.div>
    
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Standard Pricing Card */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-paan-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="mdi:currency-usd" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-paan-dark-blue mb-2">Standard Pricing</h3>
              <p className="text-gray-600">Physical booth spaces</p>
                  </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-semibold text-paan-dark-blue">3×3 m Booth</h4>
                  <p className="text-sm text-gray-600">Standard size</p>
                  </div>
                <span className="text-xl font-bold text-paan-blue">USD 1,000</span>
                  </div>
              
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <div>
                  <h4 className="font-semibold text-paan-dark-blue">3×6 m Booth</h4>
                  <p className="text-sm text-gray-600">Double size</p>
              </div>
                <span className="text-xl font-bold text-paan-blue">USD 1,800</span>
            </div>
    
              <div className="flex justify-between items-center py-3">
                <div>
                  <h4 className="font-semibold text-paan-dark-blue">Pavilion</h4>
                  <p className="text-sm text-gray-600">Custom size</p>
              </div>
                <span className="text-lg font-semibold text-gray-600">RFQ</span>
              </div>
              </div>
          </motion.div>
    
          {/* What's Included Card */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 sm:p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-paan-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="mdi:check-circle" className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-paan-dark-blue mb-2">What's Included</h3>
              <p className="text-gray-600">Standard package features</p>
            </div>
    
            <div className="space-y-4">
              <div className="mb-6">
                <h4 className="font-semibold text-paan-dark-blue mb-3">Standard Package</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Standard table setup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Brand logo printing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Two seats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Power provision</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:check" className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700">Basic lighting</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-paan-dark-blue mb-3">Popular Add-ons</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:plus" className="w-4 h-4 text-paan-blue" />
                    <span className="text-gray-700">Potted plant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:plus" className="w-4 h-4 text-paan-blue" />
                    <span className="text-gray-700">55" LED screen</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:plus" className="w-4 h-4 text-paan-blue" />
                    <span className="text-gray-700">Full branding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:plus" className="w-4 h-4 text-paan-blue" />
                    <span className="text-gray-700">Custom booth design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon icon="mdi:plus" className="w-4 h-4 text-paan-blue" />
                    <span className="text-gray-700">Interactive screens</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
    
          {/* Virtual Exhibition Card */}
          <motion.div 
            className="bg-paan-blue rounded-xl shadow-lg p-6 sm:p-8 text-paan-dark-blue"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon icon="mdi:monitor" className="w-8 h-8 text-paan-dark-blue" />
        </div>
              <h3 className="text-2xl font-bold mb-2">Virtual Exhibition</h3>
              <p className="text-dark-blue">Digital showcase option</p>
        </div>
            
            <div className="mb-6">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold">USD 200</span>
                <span className="text-dark-blue ml-2">per brand</span>
    </div>
    
              <p className="text-dark-blue mb-4">
                Showcase to remote attendees with your logo, image, description, website link, and contact button. Optional 30-60s video.
              </p>
              
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="w-5 h-5 text-paan-dark-blue" />
                  <span className="text-sm">Company logo display</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="w-5 h-5 text-paan-dark-blue" />
                  <span className="text-sm">Product image showcase</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="w-5 h-5 text-paan-dark-blue" />
                  <span className="text-sm">Company description</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="w-5 h-5 text-paan-dark-blue" />
                  <span className="text-sm">Website link</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="w-5 h-5 text-paan-dark-blue" />
                  <span className="text-sm">Contact button</span>
                </li>
              </ul>
    </div>
    
            <button 
              onClick={() => window.location.href = 'mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Virtual Exhibition Booking&body=Hello PAAN Team,%0D%0A%0D%0AI would like to book a virtual exhibition slot for the PAAN Summit 2026.%0D%0A%0D%0ACompany details:%0D%0A- Company name: _________________%0D%0A- Contact person: _________________%0D%0A- Email: _________________%0D%0A- Phone: _________________%0D%0A%0D%0AAdditional requirements:%0D%0A- [ ] Video content (30-60s)%0D%0A- [ ] Special branding requests%0D%0A%0D%0AThank you.%0D%0A%0D%0ABest regards'}
              className="w-full bg-paan-red text-white py-3 px-6 rounded-full hover:bg-gray-100 transition-all hover:text-paan-dark-blue duration-300 font-semibold flex items-center justify-center gap-2"
            >
              <Icon icon="mdi:calendar-check" className="w-5 h-5" />
              Book Virtual Slot
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
