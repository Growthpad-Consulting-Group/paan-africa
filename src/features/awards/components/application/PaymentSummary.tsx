import type { AwardFormData, AwardPricing } from "@/features/awards/components/application/types";


type Props = {
  formData: AwardFormData;
  isEarlyBird: () => boolean;
  currentPricing: AwardPricing;
  getDiscountAmount: () => number;
  calculateTotalPrice: () => number;
};

export default function PaymentSummary({ formData, isEarlyBird, currentPricing, getDiscountAmount, calculateTotalPrice }: Props) {
  return (
    <div className="bg-paan-dark-blue text-white p-6 rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-white/80">
              {formData.applicantType === 'agency' ? 'Agency Application Fee' : 'Freelancer Application Fee'}
              {formData.applicantType === 'agency' && isEarlyBird() && (
                <span className="ml-2 text-yellow-400 text-xs font-semibold">🎉 Early Bird</span>
              )}
            </p>
            <p className="text-sm text-white/60">
              {formData.selectedCategories.length} category(ies) ×
              {currentPricing.slashedPrice ? (
                <span> <s>${currentPricing.slashedPrice}</s> ${currentPricing.pricePerCategory} USD</span>
              ) : (
                <span> ${currentPricing.pricePerCategory} USD</span>
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">
              {currentPricing.slashedPrice && (formData.applicantType === 'agency' || formData.applicantType === 'freelancer') ? (
                <span><s>${currentPricing.slashedPrice * formData.selectedCategories.length}</s> </span>
              ) : null}
              ${currentPricing.pricePerCategory * formData.selectedCategories.length} USD
            </p>
          </div>
        </div>
        
        {formData.selectedCategories.length > 1 && (
          <div className="flex justify-between items-center border-t border-white/20 pt-3">
            <div>
              <p className="text-yellow-400 font-medium">Multi-Category Discount (25%)</p>
            </div>
            <div className="text-right">
              <p className="text-yellow-400 font-semibold">-${getDiscountAmount()} USD</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center border-t border-white/20 pt-3">
          <div>
            <p className="text-white font-medium">Total Amount</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${calculateTotalPrice()} USD</p>
            <p className="text-sm text-white/60">One-time payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}
