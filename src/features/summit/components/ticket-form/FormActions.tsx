import type { TicketFormData, TicketOption } from "@/features/summit/components/ticket-form/types";
import { Icon } from "@iconify/react";

type Props = {
  onClose: () => void;
  handlePaystackPayment: () => void;
  isLoading: boolean;
  paystackReady: boolean;
  ticketOptions: TicketOption[];
  formData: TicketFormData;
};

export default function FormActions({ onClose, handlePaystackPayment, isLoading, paystackReady, ticketOptions, formData }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button
        onClick={onClose}
        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
      >
        Cancel
      </button>
      <button
        onClick={handlePaystackPayment}
        disabled={isLoading || !paystackReady}
        className="flex-1 bg-paan-red text-white px-6 py-3 rounded-xl hover:bg-paan-red/90 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
            Pay {(() => {
              const selectedTicket = ticketOptions.find(t => t.id === formData.ticketType)!;
              let totalAmount = selectedTicket.price;
              if (formData.ticketType === "corporate-group" && formData.teamSize > 5) {
                const extraMembers = formData.teamSize - 5;
                totalAmount += ((selectedTicket.extraPrice ?? 0) * extraMembers);
              }
              return `$${totalAmount} USD`;
            })()}
          </>
        )}
      </button>
    </div>
  );
}
