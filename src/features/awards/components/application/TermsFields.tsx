import type { AwardFormData, AwardPricing } from "./types";
import type { FieldChange } from "@/types/forms";


type Props = {
  formData: AwardFormData;
  pricing: Record<string, AwardPricing>;
  isEarlyBird: () => boolean;
  handleInputChange: (e: FieldChange) => void;
  errors: Record<string, string>;
};

export default function TermsFields({ formData, pricing, isEarlyBird, handleInputChange, errors }: Props) {
  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms and Conditions</h3>
      
      {/* Pricing Information */}
      <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
        <h4 className="font-semibold text-gray-900 mb-3">Application Fees</h4>
        <div className="space-y-3">
          {formData.applicantType === 'agency' ? (
            <div>
              <p className="text-sm text-gray-700">
                <strong>Agency Application:</strong>{' '}
                {pricing.agency.slashedPrice ? (
                  <><s>{`$${pricing.agency.slashedPrice}`}</s> <span className="text-paan-red font-semibold">{`$${pricing.agency.pricePerCategory} USD`}</span> per category - Save {`$${pricing.agency.slashedPrice - pricing.agency.pricePerCategory}`}</>
                ) : (
                  <><span className="text-paan-red font-semibold">{`$${pricing.agency.pricePerCategory} USD`}</span> per category</>
                )}
              </p>
              {isEarlyBird() && (
                <p className="text-sm text-yellow-600 font-semibold mt-1">
                  🎉 Early Bird Pricing (Until Nov 25, 2025)
                </p>
              )}
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-700">
                <strong>Freelancer Application:</strong>{' '}
                <s>$50</s> <span className="text-paan-red font-semibold">$30 USD</span> per category - Save $20
              </p>
            </div>
          )}
          {formData.selectedCategories.length > 1 && (
            <p className="text-sm text-green-600 font-semibold">
              ✓ 25% multi-category discount applied!
            </p>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="mt-1"
          />
          <label className="text-sm text-gray-700">
            I agree to the <a href="/paan-awards-terms" target="_blank" className="text-paan-red hover:underline">Terms and Conditions</a> and <a href="/paan-awards-terms" target="_blank" className="text-paan-red hover:underline">Award Guidelines</a> *
          </label>
        </div>
        {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}
    
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            name="agreeToDataProcessing"
            checked={formData.agreeToDataProcessing}
            onChange={handleInputChange}
            className="mt-1"
          />
          <label className="text-sm text-gray-700">
            I consent to the processing of my personal data for the purpose of this award application *
          </label>
        </div>
        {errors.agreeToDataProcessing && <p className="text-red-500 text-xs">{errors.agreeToDataProcessing}</p>}
      </div>
    </div>
  );
}
