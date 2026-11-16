import type { TicketFormData, TicketOption, TimeLeft } from "@/features/summit/components/ticket-form/types";
import { Icon } from "@iconify/react";

type Props = {
  ticketOptions: TicketOption[];
  formData: TicketFormData;
  earlyBirdTimeLeft: TimeLeft;
};

export default function SelectedTicketSummary({ ticketOptions, formData, earlyBirdTimeLeft }: Props) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-paan-dark-blue mb-4">
        {ticketOptions.find(t => t.id === formData.ticketType)?.name} - What's Included
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          {ticketOptions.find(t => t.id === formData.ticketType)?.features.slice(0, Math.ceil((ticketOptions.find(t => t.id === formData.ticketType)?.features.length ?? 0) / 2)).map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {ticketOptions.find(t => t.id === formData.ticketType)?.features.slice(Math.ceil((ticketOptions.find(t => t.id === formData.ticketType)?.features.length ?? 0) / 2)).map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Icon icon="mdi:check-circle" className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Special Notes */}
      {formData.ticketType === "early-bird" && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Icon icon="mdi:clock-alert" className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Limited Time Offer</span>
          </div>
          
          {/* Early Bird Countdown Timer */}
          {earlyBirdTimeLeft.days > 0 || earlyBirdTimeLeft.hours > 0 || earlyBirdTimeLeft.minutes > 0 || earlyBirdTimeLeft.seconds > 0 ? (
            <div className="mb-3 p-3 bg-yellow-100 rounded-lg">
              <div className="text-center">
                <p className="text-xs font-medium text-yellow-800 mb-2">Early Bird Offer Ends In:</p>
                <div className="flex justify-center gap-2 text-sm">
                  <div className="bg-yellow-200 rounded px-2 py-1 min-w-[40px]">
                    <div className="font-bold text-yellow-900">{earlyBirdTimeLeft.days}</div>
                    <div className="text-xs text-yellow-700">Days</div>
                  </div>
                  <div className="bg-yellow-200 rounded px-2 py-1 min-w-[40px]">
                    <div className="font-bold text-yellow-900">{earlyBirdTimeLeft.hours}</div>
                    <div className="text-xs text-yellow-700">Hrs</div>
                  </div>
                  <div className="bg-yellow-200 rounded px-2 py-1 min-w-[40px]">
                    <div className="font-bold text-yellow-900">{earlyBirdTimeLeft.minutes}</div>
                    <div className="text-xs text-yellow-700">Min</div>
                  </div>
                  <div className="bg-yellow-200 rounded px-2 py-1 min-w-[40px]">
                    <div className="font-bold text-yellow-900">{earlyBirdTimeLeft.seconds}</div>
                    <div className="text-xs text-yellow-700">Sec</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-3 p-3 bg-red-100 rounded-lg">
              <p className="text-center text-sm font-medium text-red-800">Early Bird Offer Has Ended</p>
            </div>
          )}
          
          <p className="text-sm text-yellow-700">
            Only 100 Early Bird passes available. Save 30% compared to regular pricing!
          </p>
        </div>
      )}
      
      {formData.ticketType === "corporate-group" && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:account-group" className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Perfect for Teams</span>
          </div>
          <p className="text-sm text-blue-700 mt-1">
            Base package includes 5 General Admission tickets. Add more delegates at $70 each for additional team members.
          </p>
        </div>
      )}
      
      {formData.ticketType === "virtual-access" && (
        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:monitor" className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Remote Access</span>
          </div>
          <p className="text-sm text-purple-700 mt-1">
            Join from anywhere in the world! Perfect for international attendees or those who can't travel to Nairobi.
          </p>
        </div>
      )}
      
      {formData.ticketType === "international-delegate" && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon icon="mdi:airplane" className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">International Support</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            We'll help with visa applications, accommodation recommendations, and provide a welcome kit with African-inspired gifts.
          </p>
        </div>
      )}
    </div>
  );
}
