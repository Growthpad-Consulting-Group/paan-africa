import type { TicketFormData, TicketOption } from "./types";


type Props = {
  ticketOptions: TicketOption[];
  formData: TicketFormData;
  setFormData: React.Dispatch<React.SetStateAction<TicketFormData>>;
};

export default function TicketTypeSelect({ ticketOptions, formData, setFormData }: Props) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">Select Your Ticket</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ticketOptions.map((ticket) => (
          <div
            key={ticket.id}
            className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
              formData.ticketType === ticket.id
                ? "border-paan-red bg-paan-red/5"
                : "border-gray-200 hover:border-paan-blue"
            }`}
            onClick={() => setFormData(prev => ({ ...prev, ticketType: ticket.id, extraDelegates: 0 }))}
          >
            <div className="text-center">
              <h4 className="font-bold text-paan-dark-blue mb-2">{ticket.name}</h4>
              <div className="mb-3">
                {ticket.originalPrice && (
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <span className="text-lg text-gray-500 line-through">${ticket.originalPrice}</span>
                    <span className="text-xs text-paan-red font-medium">
                      Save {Math.round((1 - ticket.price / ticket.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
                <span className="text-3xl font-bold text-paan-red">
                  ${ticket.price}
                </span>
                <span className="text-gray-500 ml-1">
                  USD
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
              {ticket.validUntil && (
                <p className="text-xs text-paan-red font-medium mb-3">Valid until {ticket.validUntil}</p>
              )}
              {ticket.extraPrice && (
                <p className="text-xs text-gray-500 mb-2">
                  +${ticket.extraPrice} per extra delegate
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
