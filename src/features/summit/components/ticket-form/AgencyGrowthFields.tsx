import type { TicketFormData } from "@/features/summit/components/ticket-form/types";
import type { FieldChange } from "@/types/forms";


type Props = {
  formData: TicketFormData;
  handleInputChange: (e: FieldChange) => void;
};

export default function AgencyGrowthFields({ formData, handleInputChange }: Props) {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Agency Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Agency Size
          </label>
          <select
            name="agencySize"
            value={formData.agencySize}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          >
            <option value="">Select agency size</option>
            <option value="1-5">1-5 employees</option>
            <option value="6-20">6-20 employees</option>
            <option value="21-50">21-50 employees</option>
            <option value="51-100">51-100 employees</option>
            <option value="100+">100+ employees</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Years in Business
          </label>
          <select
            name="yearsInBusiness"
            value={formData.yearsInBusiness}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          >
            <option value="">Select years in business</option>
            <option value="0-1">0-1 years (Startup)</option>
            <option value="2-5">2-5 years</option>
            <option value="6-10">6-10 years</option>
            <option value="11-20">11-20 years</option>
            <option value="20+">20+ years</option>
          </select>
        </div>
      </div>
    </div>
  );
}
