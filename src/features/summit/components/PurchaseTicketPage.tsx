"use client";

import Image from "next/image";
import Script from "next/script";
import { Icon } from "@iconify/react";
import { SUMMIT_CANCELLED, SUMMIT_CANCELLATION_NOTICE } from "@/features/summit/data/status";
import Header from "@/shared/layouts/ticket-purchase-header";
import SummitFooter from "@/shared/layouts/summit-footer";
import ScrollToTop from "@/shared/components/ScrollToTop";
import SummitCancelledBanner from "@/features/summit/components/SummitCancelledBanner";
import PurchaseHero from "@/features/summit/components/PurchaseHero";
import WhatsIncludedSection from "@/features/summit/components/WhatsIncludedSection";
import PurchaseAssistanceSection from "@/features/summit/components/PurchaseAssistanceSection";
import ContactInfoStep from "@/features/summit/components/ContactInfoStep";
import TicketsStep from "@/features/summit/components/TicketsStep";
import AttendeesStep from "@/features/summit/components/AttendeesStep";
import PaymentStep from "@/features/summit/components/PaymentStep";
import StepBar from "@/features/summit/components/StepBar";
import { useTicketCheckout } from "@/hooks/useTicketCheckout";

const PurchaseTicketPage = () => {
  const {
    attendeeSelected,
    selectedTickets,
    setSelectedTickets,
    currentStep,
    isCheckingContactStep,
    purchaserInfo,
    attendees,
    paymentInfo,
    errors,
    isSubmitting,
    promoCode,
    setPromoCode,
    promoCodeValidation,
    setPromoCodeValidation,
    isValidatingPromo,
    termsAccepted,
    setTermsAccepted,
    handleNext,
    handlePrev,
    handlePromoCodeValidation,
    handlePurchaserChange,
    handleAttendeeChange,
    handlePaymentChange,
  } = useTicketCheckout();

  return (
    <>

      <main className="px-3 sm:px-0 relative">
        <Header navLinkColor="text-white" />

        <PurchaseHero />

        {/* Main Section */}
        <div className="bg-[#DAECF3]">
          <WhatsIncludedSection />
          {SUMMIT_CANCELLED ? (
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                  <div className="p-6 sm:p-10 bg-white border border-paan-red/30 rounded-2xl shadow-xl text-center">
                    <Icon icon="mdi:calendar-remove" className="w-12 h-12 text-paan-red mx-auto mb-4" />
                    <h2 className="font-bold text-2xl text-paan-dark-blue mb-3">{SUMMIT_CANCELLATION_NOTICE.title}</h2>
                    <p className="text-paan-dark-blue/80 mb-6">{SUMMIT_CANCELLATION_NOTICE.message}</p>
                    <a
                      href={`mailto:${SUMMIT_CANCELLATION_NOTICE.contactEmail}?subject=PAAN Summit 2026 Cancellation Enquiry`}
                      className="inline-flex items-center gap-2 bg-paan-dark-blue text-white px-6 py-3 rounded-full hover:bg-paan-dark-blue/90 transition-all duration-300 font-medium"
                    >
                      <Icon icon="mdi:email" className="w-5 h-5" />
                      Contact {SUMMIT_CANCELLATION_NOTICE.contactEmail}
                    </a>
                  </div>
                </div>
              ) : (
              <>
              {/* Progress bar */}
              <StepBar currentStep={currentStep} />
              {/* Main Content Area */}
              <div className="mx-auto max-w-7xl ">
                {/* Header */}
                {!isCheckingContactStep && (
                  <div className="text-paan-dark-blue text-center py-4">
                      <h2 className="font-bold text-2xl">
                        {currentStep === 1 && 'Your Contact Information'}
                        {currentStep === 2 && 'Select Your Tickets'}
                        {currentStep === 3 && 'Attendee Details'}
                        {currentStep === 4 && 'Payment'}
                      </h2>
                      <p className="font-normal">
                        {currentStep === 1 && "Let's start with your basic information to secure your registration."}
                        {currentStep === 2 && 'Choose the tickets that best fit your needs for PAAN Summit 2026.'}
                        {currentStep === 3 && `You're registering ${attendeeSelected} attendee(s) for PAAN Summit 2026.`}
                        {currentStep === 4 && 'Complete your payment to secure your tickets.'}
                      </p>
                  </div>
                )}

                {/* Step Content */}
                {isCheckingContactStep ? (
                  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                    <div className="p-6 sm:p-8 lg:p-10 bg-white border border-gray-200 rounded-2xl shadow-xl">
                      <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-paan-blue"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {currentStep === 1 && <ContactInfoStep onNext={handleNext} purchaserInfo={purchaserInfo} handlePurchaserChange={handlePurchaserChange} errors={errors} />}
                    {currentStep === 2 && <TicketsStep selectedTickets={selectedTickets} setSelectedTickets={setSelectedTickets} onNext={handleNext} onPrev={handlePrev} errors={errors} />}
                    {currentStep === 3 && <AttendeesStep onNext={handleNext} onPrev={handlePrev} purchaserInfo={purchaserInfo} handlePurchaserChange={handlePurchaserChange} attendees={attendees} handleAttendeeChange={handleAttendeeChange} errors={errors} selectedTickets={selectedTickets} promoCodeValidation={promoCodeValidation} termsAccepted={termsAccepted} setTermsAccepted={setTermsAccepted} paymentInfo={paymentInfo} handlePaymentChange={handlePaymentChange} />}
                    {currentStep === 4 && <PaymentStep onNext={handleNext} onPrev={handlePrev} paymentInfo={paymentInfo} handlePaymentChange={handlePaymentChange} selectedTickets={selectedTickets} errors={errors} isSubmitting={isSubmitting} promoCode={promoCode} setPromoCode={setPromoCode} promoCodeValidation={promoCodeValidation} setPromoCodeValidation={setPromoCodeValidation} handlePromoCodeValidation={handlePromoCodeValidation} isValidatingPromo={isValidatingPromo} />}
                  </>
                )}

              </div>
              </>
              )}
        </div>

        <PurchaseAssistanceSection />

        <div className="bg-paan-dark-blue relative">
          <div className="w-full h-[20px] sm:h-[30px] md:h-[40px] relative">
            <Image
              src="https://ik.imagekit.io/nkmvdjnna/PAAN/summit/summit-pattern.svg"
              fill
              alt=""
              className="object-cover w-full h-full"
              loading="lazy"
              sizes="100vw"
            />
          </div>
        </div>
        <SummitFooter />
        <ScrollToTop />

        {/* Paystack Script */}
        <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />

        <SummitCancelledBanner />
      </main>
    </>
  );
};

export default PurchaseTicketPage;
