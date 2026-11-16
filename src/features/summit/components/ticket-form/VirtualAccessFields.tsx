import type { TicketFormData } from "@/features/summit/components/ticket-form/types";
import type { FieldChange } from "@/types/forms";


type Props = {
  formData: TicketFormData;
  handleInputChange: (e: FieldChange) => void;
};

export default function VirtualAccessFields({ formData, handleInputChange }: Props) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Virtual Access Preferences</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Timezone
          </label>
          <select
            name="timezone"
            value={formData.timezone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          >
            <option value="">Select your timezone</option>
            <option value="GMT+3">GMT+3 (East Africa Time)</option>
            <option value="GMT+1">GMT+1 (West Africa Time)</option>
            <option value="GMT+2">GMT+2 (Central Africa Time)</option>
            <option value="GMT+0">GMT+0 (Greenwich Mean Time)</option>
            <option value="GMT-5">GMT-5 (Eastern Time)</option>
            <option value="GMT-8">GMT-8 (Pacific Time)</option>
            <option value="GMT+5:30">GMT+5:30 (India Standard Time)</option>
            <option value="GMT+8">GMT+8 (China Standard Time)</option>
            <option value="GMT+9">GMT+9 (Japan Standard Time)</option>
            <option value="GMT+10">GMT+10 (Australian Eastern Time)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-paan-dark-blue mb-2">
            Preferred Language
          </label>
          <select
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-paan-blue focus:border-transparent transition-all"
          >
            <option value="">Select preferred language</option>
            <option value="english">English</option>
            <option value="french">French</option>
            <option value="arabic">Arabic</option>
            <option value="portuguese">Portuguese</option>
            <option value="swahili">Swahili</option>
          </select>
        </div>
      </div>
    </div>
  );
}
