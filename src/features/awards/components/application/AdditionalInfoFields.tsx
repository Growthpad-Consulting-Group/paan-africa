import type { AwardFormData } from "@/features/awards/components/application/types";
import type { FieldChange } from "@/types/forms";


type Props = {
  formData: AwardFormData;
  handleInputChange: (e: FieldChange) => void;
  errors: Record<string, string>;
};

export default function AdditionalInfoFields({ formData, handleInputChange, errors }: Props) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Why should you win this award? *
          </label>
          <textarea
            name="whyApply"
            value={formData.whyApply}
            onChange={handleInputChange}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
              errors.whyApply ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Tell us why you deserve to win this award..."
          />
          {errors.whyApply && <p className="text-red-500 text-xs mt-1">{errors.whyApply}</p>}
        </div>
    
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Previous Awards/Recognition (Optional)
          </label>
          <textarea
            name="previousAwards"
            value={formData.previousAwards}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
            placeholder="List any previous awards or recognition you've received"
          />
        </div>
    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile
            </label>
            <input
              type="url"
              name="socialMedia.linkedin"
              value={formData.socialMedia.linkedin}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Twitter Handle
            </label>
            <input
              type="text"
              name="socialMedia.twitter"
              value={formData.socialMedia.twitter}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
              placeholder="@yourhandle"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram Handle
            </label>
            <input
              type="text"
              name="socialMedia.instagram"
              value={formData.socialMedia.instagram}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red"
              placeholder="@yourhandle"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
