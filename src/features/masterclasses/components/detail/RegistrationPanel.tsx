import type { Masterclass } from "@/features/masterclasses/lib/masterclassService";
import type { AppliedPromo, CustomerInfo } from "./types";
import { Icon } from "@iconify/react";

type Props = {
  setSeatCount: (count: number) => void;
  seatCount: number;
  setSelectedPricing: (pricing: string) => void;
  selectedPricing: string;
  masterclass: Masterclass;
  appliedPromoCode: AppliedPromo | null;
  promoCode: string;
  setPromoCode: (code: string) => void;
  setPromoCodeError: (error: string) => void;
  setAppliedPromoCode: (promo: AppliedPromo | null) => void;
  handlePromoCodeValidation: () => void | Promise<void>;
  isValidatingPromoCode: boolean;
  promoCodeError: string;
  customerInfo: CustomerInfo;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  handlePaystackPayment: () => void | Promise<void>;
  isLoading: boolean;
  paystackReady: boolean;
};

export default function RegistrationPanel({ setSeatCount, seatCount, setSelectedPricing, selectedPricing, masterclass, appliedPromoCode, promoCode, setPromoCode, setPromoCodeError, setAppliedPromoCode, handlePromoCodeValidation, isValidatingPromoCode, promoCodeError, customerInfo, setCustomerInfo, handlePaystackPayment, isLoading, paystackReady }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Register Now</h2>
      
      {/* Seat Selection */}
      <div className="mb-6">
        <h3 className="font-semibold text-slate-900 text-sm mb-3">Number of Seats</h3>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSeatCount(Math.max(1, seatCount - 1))}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
            disabled={seatCount <= 1}
          >
            <Icon icon="mdi:minus" className="w-5 h-5" />
          </button>
          <div className="flex-1 max-w-20">
            <input
              type="number"
              min="1"
              max="50"
              value={seatCount}
              onChange={(e) => setSeatCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            onClick={() => setSeatCount(Math.min(50, seatCount + 1))}
            className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-red-500 hover:text-red-500 transition-colors"
            disabled={seatCount >= 50}
          >
            <Icon icon="mdi:plus" className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {seatCount === 1 ? 'Individual registration' : `Group registration for ${seatCount} participants`}
        </p>
      </div>
      
      {/* Pricing Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setSelectedPricing('member')}
          className={`p-5 rounded-lg border-2 transition-all text-left ${
            selectedPricing === 'member'
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:border-red-300'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-semibold text-slate-900">PAAN Members</h3>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedPricing === 'member'
                ? 'border-red-500 bg-red-500'
                : 'border-gray-300'
            }`}>
              {selectedPricing === 'member' && (
                <Icon icon="mdi:check" className="text-white w-3 h-3" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 mb-1">
            <div className="text-3xl font-bold text-slate-900">
              ${(() => {
                const basePrice = masterclass.memberPrice * seatCount;
                const discount = (appliedPromoCode && selectedPricing === 'member') ? appliedPromoCode.discountAmount : 0;
                return (basePrice - discount).toFixed(2);
              })()}
            </div>
            {masterclass.memberOriginalPrice && (
              <div className="text-lg text-gray-500 line-through">
                ${masterclass.memberOriginalPrice * seatCount}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-600 text-sm">
              ${masterclass.memberPrice} × {seatCount} seat{seatCount > 1 ? 's' : ''}
            </p>
            {masterclass.memberOriginalPrice && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold self-start">
                Save ${(masterclass.memberOriginalPrice - masterclass.memberPrice) * seatCount}
              </span>
            )}
          </div>
        </button>
    
        <button
          onClick={() => setSelectedPricing('non-member')}
          className={`p-5 rounded-lg border-2 transition-all text-left ${
            selectedPricing === 'non-member'
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:border-red-300'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-semibold text-slate-900">Non-Members</h3>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              selectedPricing === 'non-member'
                ? 'border-red-500 bg-red-500'
                : 'border-gray-300'
            }`}>
              {selectedPricing === 'non-member' && (
                <Icon icon="mdi:check" className="text-white w-3 h-3" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 mb-1">
            <div className="text-3xl font-bold text-slate-900">
              ${(() => {
                const basePrice = masterclass.nonMemberPrice * seatCount;
                const discount = (appliedPromoCode && selectedPricing === 'non-member') ? appliedPromoCode.discountAmount : 0;
                return (basePrice - discount).toFixed(2);
              })()}
            </div>
            {masterclass.nonMemberOriginalPrice && (
              <div className="text-lg text-gray-500 line-through">
                ${masterclass.nonMemberOriginalPrice * seatCount}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-600 text-sm">
              ${masterclass.nonMemberPrice} × {seatCount} seat{seatCount > 1 ? 's' : ''}
            </p>
            {masterclass.nonMemberOriginalPrice && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold self-start">
                Save ${(masterclass.nonMemberOriginalPrice - masterclass.nonMemberPrice) * seatCount}
              </span>
            )}
          </div>
        </button>
      </div>
    
      {/* Promo Code Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-slate-900 text-sm mb-3">Have a Discount Code?</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value.toUpperCase());
              setPromoCodeError('');
              setAppliedPromoCode(null);
            }}
            onBlur={handlePromoCodeValidation}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
          />
          <button
            onClick={handlePromoCodeValidation}
            disabled={isValidatingPromoCode || !promoCode.trim()}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isValidatingPromoCode ? (
              <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
            ) : (
              'Apply'
            )}
          </button>
        </div>
        {promoCodeError && (
          <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
            <Icon icon="mdi:alert-circle" className="w-4 h-4" />
            {promoCodeError}
          </p>
        )}
        {appliedPromoCode && (
          <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:check-circle" className="text-green-600 w-5 h-5" />
                <span className="text-green-800 text-sm font-medium">
                  {appliedPromoCode.code} applied
                </span>
              </div>
              <span className="text-green-800 text-sm font-semibold">
                -${appliedPromoCode.discountAmount.toFixed(2)}
              </span>
            </div>
            {appliedPromoCode.description && (
              <p className="text-green-700 text-xs mt-1">{appliedPromoCode.description}</p>
            )}
          </div>
        )}
      </div>
    
      {/* Customer Information */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 text-sm">Primary Contact Information</h3>
          {seatCount > 1 && (
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              Group Registration
            </span>
          )}
        </div>
        {seatCount > 1 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <div className="flex items-start gap-2">
              <Icon icon="mdi:information" className="text-blue-600 w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-700">
                <p className="font-medium mb-1">Group Registration for {seatCount} participants</p>
                <p>Please provide the primary contact details below. After payment, you'll receive instructions on how to register additional participants.</p>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email Address *"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
            required
          />
          <input
            type="text"
            placeholder="Full Name *"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
          />
          <input
            type="text"
            placeholder="Organization/Agency"
            value={customerInfo.organization}
            onChange={(e) => setCustomerInfo({...customerInfo, organization: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-sm"
          />
        </div>
      </div>
    
      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handlePaystackPayment}
          disabled={isLoading || !paystackReady || !customerInfo.email || !customerInfo.name}
          className="w-full bg-red-500 text-white px-6 py-3.5 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : !paystackReady ? (
            <>
              <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
              Loading Payment System...
            </>
          ) : (
            <>
              <Icon icon="mdi:credit-card" className="w-5 h-5" />
              Register Now - ${(() => {
                const basePrice = selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice;
                const totalPrice = basePrice * seatCount;
                const discountAmount = appliedPromoCode ? appliedPromoCode.discountAmount : 0;
                const finalPrice = totalPrice - discountAmount;
                return finalPrice.toFixed(2);
              })()}
            </>
          )}
        </button>
        
        {/* <button
          onClick={generateProfessionalPDFInvoice}
          disabled={!customerInfo.email || !customerInfo.name}
          className="w-full bg-gray-100 text-gray-700 px-6 py-3.5 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-3"
        >
          <Icon icon="mdi:download" className="w-5 h-5" />
          Generate PDF Invoice
        </button> */}
      </div>
    
      {/* Benefits */}
      {masterclass.benefits && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2 text-sm">
            <Icon icon="mdi:gift" className="w-4 h-4" />
            Bonus Benefits:
          </h4>
          <div className="space-y-1">
            {masterclass.benefits.map((benefit: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-green-700 text-sm">
                <Icon icon="mdi:check-circle" className="text-green-500 w-4 h-4 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
