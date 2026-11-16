import type { AwardFormData, AwardCategory } from "@/features/awards/components/application/types";
import { Icon } from "@iconify/react";

type Props = {
  filteredAwardCategories: AwardCategory[];
  formData: AwardFormData;
  handleCategoryToggle: (categoryId: string) => void;
  errors: Record<string, string>;
};

export default function CategorySelectionFields({ filteredAwardCategories, formData, handleCategoryToggle, errors }: Props) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Select Award Categories * (Choose all that apply)
      </h3>
      
      <div className="space-y-6">
        {filteredAwardCategories.map(categoryGroup => (
          <div key={categoryGroup.id} className="border border-gray-200 rounded-lg p-4">
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-paan-dark-blue mb-2">
                {categoryGroup.name}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {categoryGroup.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {categoryGroup.subcategories.map(subcategory => (
                <div
                  key={subcategory.id}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.selectedCategories.includes(subcategory.id)
                      ? 'border-paan-red bg-paan-red/10'
                      : 'border-gray-300 hover:border-paan-red/50'
                  }`}
                  onClick={() => handleCategoryToggle(subcategory.id)}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.selectedCategories.includes(subcategory.id)}
                      onChange={() => handleCategoryToggle(subcategory.id)}
                      className="mt-1"
                    />
                    <div>
                      <h5 className="font-medium text-gray-900 text-sm">{subcategory.name}</h5>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{subcategory.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {errors.selectedCategories && <p className="text-red-500 text-xs mt-2">{errors.selectedCategories}</p>}
      
      {/* Important Award Information */}
      {formData.applicantType === 'agency' && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon icon="mdi:trophy" className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Important Award Information</h4>
              <p className="text-sm text-blue-800">
                <strong>In every category, both the agency and client are honored with their own award as a mark of shared achievement.</strong>
                This means when you win, both your organization and your client receive recognition, celebrating the collaborative success of your partnership.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
