import type { TicketFormData } from "./types";
import type { FieldChange } from "@/types/forms";


type Props = {
  formData: TicketFormData;
  handleInputChange: (e: FieldChange) => void;
};

export default function InternationalDelegateFields({ formData, handleInputChange }: Props) {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">International Travel Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Passport Number
          </label>
          <input
            type="text"
            name="passportNumber"
            value={formData.passportNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
            placeholder="Enter your passport number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Do you need a visa for Kenya?
          </label>
          <select
            name="visaRequired"
            value={formData.visaRequired}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          >
            <option value="">Select option</option>
            <option value="yes">Yes, I need a visa</option>
            <option value="no">No, I don't need a visa</option>
            <option value="unsure">I'm not sure</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Do you need accommodation assistance?
          </label>
          <select
            name="accommodationNeeded"
            value={formData.accommodationNeeded}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          >
            <option value="">Select option</option>
            <option value="yes">Yes, I need help finding accommodation</option>
            <option value="no">No, I'll arrange my own accommodation</option>
            <option value="recommendations">Just recommendations please</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Arrival Date
          </label>
          <input
            type="date"
            name="arrivalDate"
            value={formData.arrivalDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Departure Date
          </label>
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  );
}
