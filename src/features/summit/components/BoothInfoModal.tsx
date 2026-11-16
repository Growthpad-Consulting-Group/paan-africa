import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import type { ExhibitorBooth } from "@/features/summit/lib/summitService";

export default function BoothInfoModal({ booth, onClose }: { booth: ExhibitorBooth; onClose: () => void }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-600 bg-green-100';
      case 'Reserved': return 'text-yellow-600 bg-yellow-100';
      case 'Booked': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available': return 'mdi:check-circle';
      case 'Reserved': return 'mdi:clock-outline';
      case 'Booked': return 'mdi:close-circle';
      default: return 'mdi:help-circle';
    }
  };
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
            {/* Header */}
        <div className="bg-gradient-to-r from-paan-blue to-paan-dark-blue text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Booth #{booth.number}</h2>
              <div className="flex items-center gap-2">
                <Icon icon={getStatusIcon(booth.status)} className="w-5 h-5" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booth.status)}`}>
                  {booth.status}
                </span>
                </div>
                </div>
            <button 
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </button>
                </div>
                </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booth Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="mdi:ruler" className="w-5 h-5 text-paan-blue" />
                <h3 className="font-semibold text-paan-dark-blue">Size</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{booth.size}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="mdi:currency-usd" className="w-5 h-5 text-paan-blue" />
                <h3 className="font-semibold text-paan-dark-blue">Price</h3>
              </div>
              <p className="text-lg font-bold text-gray-800">{booth.price}</p>
            </div>
          </div>

          {/* What's Included */}
            <div>
            <h3 className="text-xl font-bold text-paan-dark-blue mb-4 flex items-center gap-2">
              <Icon icon="mdi:check-circle" className="w-6 h-6 text-green-500" />
              What's Included
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Standard table setup',
                'Brand logo printing',
                'Two seats',
                'Power provision',
                'Basic lighting',
                'WiFi access'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Icon icon="mdi:check" className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
              </div>
            </div>

          {/* Popular Add-ons */}
            <div>
            <h3 className="text-xl font-bold text-paan-dark-blue mb-4 flex items-center gap-2">
              <Icon icon="mdi:plus-circle" className="w-6 h-6 text-paan-blue" />
              Popular Add-ons
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Potted plant',
                '55" LED screen',
                'Full branding',
                'Interactive screen',
                'Custom design',
                'Cube/Tall boxes',
                'Additional seating',
                'Premium lighting'
              ].map((addon, index) => (
                <span 
                  key={index}
                  className="bg-paan-blue/10 text-paan-dark-blue px-3 py-2 rounded-full text-sm font-medium"
                >
                  {addon}
                </span>
              ))}
              </div>
            </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button 
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
                  Close
              </button>
            {booth.status === 'Available' && (
              <button 
                onClick={() => {
                  window.location.href = `/summit/exhibition-application?booth=${booth.number}&size=${booth.size}&price=${booth.price}&type=${booth.type}`;
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-paan-blue text-white rounded-lg hover:bg-paan-blue/90 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:calendar-check" className="w-5 h-5" />
                Request to Book
              </button>
            )}
            {booth.status === 'Reserved' && (
              <button 
                onClick={() => {
                  window.location.href = `mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Booth ${booth.number} Waitlist Request&body=Hello PAAN Team,%0D%0A%0D%0AI am interested in Booth ${booth.number} which is currently reserved.%0D%0A%0D%0APlease add me to the waitlist in case it becomes available.%0D%0A%0D%0ABooth Details:%0D%0A- Booth Number: ${booth.number}%0D%0A- Size: ${booth.size}%0D%0A- Price: ${booth.price}%0D%0A%0D%0ACompany Details:%0D%0A- Company name: _________________%0D%0A- Contact person: _________________%0D%0A- Email: _________________%0D%0A- Phone: _________________%0D%0A%0D%0AThank you.%0D%0A%0D%0ABest regards`; 
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:clock-outline" className="w-5 h-5" />
                Join Waitlist
              </button>
            )}
            {booth.status === 'Booked' && (
              <button 
                onClick={() => {
                  window.location.href = `mailto:secretariat@paan.africa?subject=PAAN Summit 2026 - Alternative Booth Request&body=Hello PAAN Team,%0D%0A%0D%0AI am interested in exhibiting at the PAAN Summit 2026.%0D%0A%0D%0APreferred booth size: ${booth.size}%0D%0APreferred price range: ${booth.price}%0D%0A%0D%0APlease suggest alternative available booths.%0D%0A%0D%0ACompany Details:%0D%0A- Company name: _________________%0D%0A- Contact person: _________________%0D%0A- Email: _________________%0D%0A- Phone: _________________%0D%0A%0D%0AThank you.%0D%0A%0D%0ABest regards`; 
                  onClose();
                }}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:search" className="w-5 h-5" />
                Find Alternatives
              </button>
            )}
            </div>
        </div>
      </motion.div>
    </div>
  );
}
