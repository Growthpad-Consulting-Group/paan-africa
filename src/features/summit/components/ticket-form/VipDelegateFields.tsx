import type { TicketFormData } from "@/features/summit/components/ticket-form/types";
import type { FieldChange } from "@/types/forms";


type Props = {
  formData: TicketFormData;
  handleInputChange: (e: FieldChange) => void;
};

export default function VipDelegateFields({ formData, handleInputChange }: Props) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">VIP Preferences</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Dietary Requirements
          </label>
          <select
            name="dietaryRequirements"
            value={formData.dietaryRequirements}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          >
            <option value="">Select dietary requirements</option>
            <option value="none">No special requirements</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="halal">Halal</option>
            <option value="kosher">Kosher</option>
            <option value="gluten-free">Gluten-free</option>
            <option value="allergies">Food allergies (specify in notes)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Accessibility Needs
          </label>
          <select
            name="accessibilityNeeds"
            value={formData.accessibilityNeeds}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          >
            <option value="">Select accessibility needs</option>
            <option value="none">No special needs</option>
            <option value="wheelchair">Wheelchair access required</option>
            <option value="hearing">Hearing assistance needed</option>
            <option value="visual">Visual assistance needed</option>
            <option value="mobility">Mobility assistance needed</option>
            <option value="other">Other (specify in notes)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
