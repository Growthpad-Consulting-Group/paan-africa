import { Icon } from "@iconify/react";

type Props = {
  onClose: () => void;
  handlePaystackPayment: () => void;
  isSubmitting: boolean;
  paystackReady: boolean;
  calculateTotalPrice: () => number;
};

export default function FormActions({ onClose, handlePaystackPayment, isSubmitting, paystackReady, calculateTotalPrice }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6">
      <button
        type="button"
        onClick={onClose}
        className="flex-1 bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-colors font-medium"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handlePaystackPayment}
        disabled={isSubmitting || !paystackReady}
        className="flex-1 bg-paan-red text-white px-6 py-3 rounded-xl hover:bg-paan-red/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
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
            Pay ${calculateTotalPrice()} USD
          </>
        )}
      </button>
    </div>
  );
}
