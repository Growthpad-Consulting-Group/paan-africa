import type { TicketFormData } from "./types";
import type { FieldChange } from "@/types/forms";


type Props = {
  formData: TicketFormData;
  handleInputChange: (e: FieldChange) => void;
};

export default function EarlyBirdFields({ formData, handleInputChange }: Props) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Early Bird Information</h3>
      <div>
        <label className="block text-sm font-medium text-paan-dark-blue mb-2">
          How did you hear about PAAN Summit 2026?
        </label>
        <select
          name="heardAbout"
          value={formData.heardAbout}
          onChange={handleInputChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
        >
          <option value="">Select option</option>
          <option value="social-media">Social Media</option>
          <option value="email">Email Newsletter</option>
          <option value="website">PAAN Website</option>
          <option value="referral">Friend/Colleague Referral</option>
          <option value="partner">Partner Organization</option>
          <option value="search">Search Engine</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
}
