import type { AwardFormData } from "./types";
import type { FieldChange } from "@/types/forms";


type Props = {
  formData: AwardFormData;
  handleInputChange: (e: FieldChange) => void;
  errors: Record<string, string>;
  experienceLevels: string[];
};

export default function ProfessionalInfoFields({ formData, handleInputChange, errors, experienceLevels }: Props) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formData.applicantType === 'agency' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your company name"
            />
            {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
          </div>
        )}
    
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website/Portfolio URL *
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
              errors.website ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="https://your-website.com"
          />
          {errors.website && <p className="text-red-500 text-xs mt-1">{errors.website}</p>}
        </div>
    
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience *
          </label>
          <select
            name="yearsExperience"
            value={formData.yearsExperience}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-paan-red focus:border-paan-red ${
              errors.yearsExperience ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select experience level</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          {errors.yearsExperience && <p className="text-red-500 text-xs mt-1">{errors.yearsExperience}</p>}
        </div>
      </div>
    </div>
  );
}
