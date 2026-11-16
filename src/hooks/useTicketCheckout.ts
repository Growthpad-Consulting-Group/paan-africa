import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { completePurchase, verifyAndCompletePayment } from "@/lib/ticketService";
import { initializePayment, generatePaymentReference, updatePurchaseStatus } from "@/lib/paystack";
import { validatePromoCode } from "@/lib/promoCodeService";
import { convertUSDToKES } from "@/utils/currencyConverter";
import { saveLeadContact, updateLeadStatus, getLeadByEmail } from "@/lib/leadService";

const EMPTY_PURCHASER = {
  fullName: '',
  email: '',
  phone: '',
  organization: '',
  country: '',
  attending: false
};

const EMPTY_PAYMENT = {
  method: 'card',
  promoCode: '',
  invoiceDetails: ''
};

/**
 * State and handlers for the four-step ticket purchase (contact -> tickets -> attendees -> payment).
 * The payment logic is unchanged from when it lived in the page; only the form reset, which was
 * pasted three times, is now one function.
 */
export function useTicketCheckout() {
  const [attendeeSelected, setAttendeeSelected] = useState(2);
  const [selectedTickets, setSelectedTickets] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(1); // 1: Contact Info, 2: Select Tickets, 3: Attendee Details, 4: Payment
  const [isCheckingContactStep, setIsCheckingContactStep] = useState(true); // Track if we're checking whether to skip Step 1

  const [purchaserInfo, setPurchaserInfo] = useState({ ...EMPTY_PURCHASER });
  const [attendees, setAttendees] = useState<any[]>([]);
  const [paymentInfo, setPaymentInfo] = useState({ ...EMPTY_PAYMENT });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeValidation, setPromoCodeValidation] = useState<any>(null);
  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const resetForm = () => {
    setSelectedTickets([]);
    setPurchaserInfo({ ...EMPTY_PURCHASER });
    setAttendees([]);
    setPaymentInfo({ ...EMPTY_PAYMENT });
    setCurrentStep(1);
    setErrors({});
  };

  // Form validation
  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      // Validate contact information
      if (!purchaserInfo.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      }
      if (!purchaserInfo.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(purchaserInfo.email)) {
        newErrors.email = "Email is invalid";
      }
      if (!purchaserInfo.phone.trim()) {
        newErrors.phone = "Phone number is required";
      }
      if (!purchaserInfo.country.trim()) {
        newErrors.country = "Country is required";
      }
    } else if (step === 2) {
      if (selectedTickets.length === 0) {
        newErrors.tickets = "Please select at least one ticket";
      }
    } else if (step === 3) {
      if (!purchaserInfo.organization.trim()) {
        newErrors.organization = "Organization is required";
      }
      
      // Validate attendees
      const totalAttendees = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
      if (attendees.length !== totalAttendees) {
        newErrors.attendees = "Please fill in all attendee information";
      }
      
      attendees.forEach((attendee, index) => {
        if (!attendee.name?.trim()) {
          newErrors[`attendee${index}Name`] = "Attendee name is required";
        }
        if (!attendee.email?.trim()) {
          newErrors[`attendee${index}Email`] = "Attendee email is required";
        } else if (!/\S+@\S+\.\S+/.test(attendee.email)) {
          newErrors[`attendee${index}Email`] = "Attendee email is invalid";
        }
        if (!attendee.role?.trim()) {
          newErrors[`attendee${index}Role`] = "Attendee role is required";
        }
        if (!attendee.organization?.trim()) {
          newErrors[`attendee${index}Org`] = "Attendee organization is required";
        }
      });
      
      // Validate terms acceptance
      if (!termsAccepted) {
        newErrors.terms = "You must accept the terms and conditions to proceed";
      }
    } else if (step === 4) {
      if (paymentInfo.method === 'bank') {
        if (!paymentInfo.invoiceDetails.trim()) {
          newErrors.invoiceDetails = "Invoice details are required for bank transfer";
        }
      }
    }
    
    return newErrors;
  };

  const handleNext = async () => {
    const validationErrors = validateStep(currentStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill in all required fields correctly.");
      return;
    }
    
    setErrors({});
    
    // Save lead contact on step 1 completion
    if (currentStep === 1) {
      try {
        const leadData = await saveLeadContact({
          fullName: purchaserInfo.fullName,
          email: purchaserInfo.email,
          phone: purchaserInfo.phone,
          country: purchaserInfo.country
        });
        
        // Store submission timestamp in localStorage for 72-hour check
        if (typeof window !== 'undefined') {
          const submissionData = {
            email: purchaserInfo.email.toLowerCase().trim(),
            timestamp: new Date().toISOString()
          };
          localStorage.setItem('paan_summit_contact_submission', JSON.stringify(submissionData));
        }
        
        toast.success("Contact information saved!");
      } catch (err) {
        const error = err as { message?: string; code?: string; details?: string; hint?: string };
        console.error('❌ Error saving lead:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        // Don't block progression if lead save fails
        toast.error("Note: Contact info couldn't be saved, but you can continue.");
      }
    }
    
    // Update lead status when they select tickets
    if (currentStep === 2 && selectedTickets.length > 0) {
      try {
        await updateLeadStatus(purchaserInfo.email, 'tickets_selected', {
          tickets: selectedTickets
        });
      } catch (error) {
        console.error('Error updating lead status:', error);
      }
    }
    
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final submission
      handleFinalSubmission();
    }
  };

  // Helper function to send confirmation email
  const sendPurchaseConfirmationEmail = async (purchase: any, purchaser: any, paymentReference: string, finalAmount: number, currency = 'USD') => {
    try {
      // Format ticket information for email
      const ticketDetails = selectedTickets.map(ticket => ({
        name: ticket.name,
        quantity: ticket.quantity,
        price: ticket.price,
        total: ticket.price * ticket.quantity
      }));

      // Prepare email data - send email for primary ticket (first ticket)
      // The email API expects single ticket format, so we'll use the first ticket
      const primaryTicket = selectedTickets[0];
      const ticketData = {
        name: purchaserInfo.fullName,
        email: purchaserInfo.email,
        phone: purchaserInfo.phone,
        country: purchaserInfo.country,
        role: attendees[0]?.role || '',
        company: purchaserInfo.organization,
        ticketType: primaryTicket.name,
        currency: currency,
        amount: finalAmount,
        features: primaryTicket.features || []
      };

      const paymentData = {
        currency: currency,
        amount: Math.round(finalAmount * 100), // Convert to cents
        status: 'success',
        paidAt: new Date().toISOString()
      };

      const response = await fetch('/api/send-summit-ticket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentData,
          ticketData,
          reference: paymentReference
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('Purchase confirmation email sent successfully');
      } else {
        console.error('Failed to send purchase confirmation email:', result.message);
      }
    } catch (error) {
      console.error('Error sending purchase confirmation email:', error);
      // Don't throw error - email failure shouldn't block purchase completion
    }
  };

  //Where the payment magic is happening
  const handleFinalSubmission = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("Processing your purchase...");

    try {
      // Calculate total amount
      const totalAmount = selectedTickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);
      
      // Prepare purchase data
      const purchaseData = {
        purchaserInfo: {
          full_name: purchaserInfo.fullName,
          email: purchaserInfo.email,
          phone: purchaserInfo.phone,
          organization: purchaserInfo.organization,
          country: purchaserInfo.country,
          is_attending: purchaserInfo.attending,
          terms_accepted: termsAccepted,
          updates_consent: false // Default to false unless user opts in
        },
        selectedTickets,
        attendees,
        totalAmount,
        paymentMethod: paymentInfo.method,
        promoCode: promoCodeValidation?.valid ? promoCode : null
      };

      // Complete the purchase (save to database)
      const { purchase, purchaser, totalAmount: finalAmount } = await completePurchase(purchaseData);
      
      // Check if discount is 100% (final amount is 0 or less)
      if (finalAmount <= 0) {
        // For 100% discount, mark purchase as paid directly without Paystack
        toast.dismiss(toastId);
        toast.loading("Completing purchase...", { id: 'free-purchase' });
        
        try {
          // Generate a reference for free purchases
          const paymentReference = generatePaymentReference();
          
          // Mark purchase as paid
          await updatePurchaseStatus(purchase.id, 'paid', paymentReference);
          
          // Send confirmation email
          await sendPurchaseConfirmationEmail(purchase, purchaser, paymentReference, finalAmount, 'USD');
          
          toast.dismiss('free-purchase');
          toast.success("Purchase completed successfully! Your tickets are confirmed. You will receive a confirmation email shortly.", { id: 'free-success' });
          
          // Reset form after successful purchase
          setTimeout(() => {
            resetForm();
          }, 3000);
        } catch (error) {
          console.error('Error completing free purchase:', error);
          toast.dismiss('free-purchase');
          toast.error("Error completing purchase. Please contact support.", { id: 'free-error' });
        }
        return;
      }
      
      if (paymentInfo.method === 'bank') {
        // For bank transfer, just show success message
        toast.dismiss(toastId);
        toast.success("Purchase registered successfully! Please complete bank transfer and send proof to secretariat@paan.africa", { id: 'bank-success' });
        
        // Reset form after successful registration
        setTimeout(() => {
          resetForm();
        }, 3000);
      } else {
        // For card or mpesa payments, proceed with Paystack
        toast.dismiss(toastId);
        toast.loading("Initializing payment...", { id: 'payment-init' });

        // Initialize payment with Paystack
        const paymentReference = generatePaymentReference();
        
        // Determine currency and amount based on payment method
        let currency = 'USD';
        let paymentAmount = finalAmount;
        
        if (paymentInfo.method === 'mpesa') {
          // Convert USD to KES for Mpesa payments
          currency = 'KES';
          paymentAmount = convertUSDToKES(finalAmount);
        }
        
        const paymentHandler = await initializePayment({
          email: purchaserInfo.email,
          amount: paymentAmount,
          currency: currency,
          reference: paymentReference,
          metadata: {
            purchase_id: purchase.id,
            purchaser_id: purchaser.id,
            ticket_count: selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0),
            payment_method: paymentInfo.method,
            original_amount_usd: paymentInfo.method === 'mpesa' ? finalAmount : null,
            converted_amount_kes: paymentInfo.method === 'mpesa' ? paymentAmount : null
          },
          onSuccess: async (response: any) => {
            try {
              toast.dismiss('payment-init');
              toast.loading("Verifying payment...", { id: 'payment-verify' });
              
              // Verify payment and complete the process
              const result = await verifyAndCompletePayment(
                purchase.id,
                response.reference || response.trxref
              );
              
              if(!result.success){
                toast.dismiss('payment-verify');
                toast.error("Payment failed. You can try again!", { id: 'payment-verification-failed'});
                return;
              }
              // Send confirmation email
              const paymentCurrency = paymentInfo.method === 'mpesa' ? 'KES' : 'USD';
              await sendPurchaseConfirmationEmail(purchase, purchaser, response.reference || response.trxref, finalAmount, paymentCurrency);
              
              toast.dismiss('payment-verify');
              toast.success("Payment completed successfully! You will receive a confirmation email shortly.", { id: 'success' });
              
              // Reset form after successful payment
              setTimeout(() => {
                resetForm();
              }, 3000);
              
            } catch (error) {
              console.error('Payment verification error:', error);
              toast.dismiss('payment-verify');
              toast.error("Payment verification failed. Please contact support.", { id: 'verify-error' });
            }
          },
          onClose: () => {
            toast.dismiss('payment-init');
            toast.error("Payment was cancelled. You can try again.", { id: 'payment-cancelled' });
          }
        });

        // Open Paystack payment modal
        paymentHandler.openIframe();
      }
      
    } catch (error) {
      console.error('Purchase error:', error);
      toast.dismiss(toastId);
      toast.error((error as Error).message || "Purchase failed. Please try again.", { id: 'purchase-error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrev = () => {
    setErrors({});
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Promo code validation
  const handlePromoCodeValidation = async (e: any) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    
    if (!promoCode.trim()) {
      setPromoCodeValidation(null);
      return;
    }

    setIsValidatingPromo(true);
    try {
      const validation = await validatePromoCode(promoCode, selectedTickets);
      setPromoCodeValidation(validation);
      
      if (validation.valid) {
        toast.success(`Promo code applied! You save $${validation.promoCode?.discountAmount}`);
      } else {
        toast.error(validation.error ?? 'Invalid promo code');
      }
    } catch (error) {
      console.error('Promo code validation error:', error);
      toast.error('Error validating promo code');
    } finally {
      setIsValidatingPromo(false);
    }
  };

  // Input handlers
  const handlePurchaserChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setPurchaserInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAttendeeChange = (index: number, field: string, value: string) => {
    setAttendees(prev => {
      const newAttendees = [...prev];
      if (!newAttendees[index]) {
        newAttendees[index] = { name: '', email: '', role: '', organization: '' };
      }
      newAttendees[index][field] = value;
      return newAttendees;
    });
    // Clear error when user starts typing
    const errorKey = `attendee${index}${field.charAt(0).toUpperCase() + field.slice(1)}`;
    if (errors[errorKey]) {
      setErrors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const handlePaymentChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setPaymentInfo(prev => ({
      ...prev,
      [name]: type === 'radio' ? value : (type === 'checkbox' ? checked : value)
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  // Check if user should skip Step 1 (Contact Information) on mount
  useEffect(() => {
    const checkAndSkipContactStep = async () => {
      if (typeof window === 'undefined') {
        setIsCheckingContactStep(false);
        return;
      }

      try {
        // Check localStorage first for quick check
        const storedData = localStorage.getItem('paan_summit_contact_submission');
        if (storedData) {
          try {
            const { email: storedEmail, timestamp } = JSON.parse(storedData);
            const submissionTime = new Date(timestamp);
            const now = new Date();
            const hoursSinceSubmission = (now.getTime() - submissionTime.getTime()) / (1000 * 60 * 60);
            
            // If less than 72 hours, check database and load user info
            if (hoursSinceSubmission < 72 && storedEmail) {
              const lead = await getLeadByEmail(storedEmail);
              if (lead) {
                // Pre-fill the form with previous data
                setPurchaserInfo({
                  fullName: lead.full_name || '',
                  email: lead.email || '',
                  phone: lead.phone || '',
                  organization: '',
                  country: lead.country || '',
                  attending: false
                });
                // Skip to Step 2 (Ticket Selection)
                setCurrentStep(2);
                setIsCheckingContactStep(false);
                return;
              }
            }
          } catch (e) {
            console.error('Error parsing stored contact data:', e);
          }
        }
      } catch (error) {
        console.error('Error checking contact step:', error);
      } finally {
        setIsCheckingContactStep(false);
      }
    };

    checkAndSkipContactStep();
  }, []);

  // Initialize attendees when tickets are selected
  useEffect(() => {
    const totalAttendees = selectedTickets.reduce((sum, ticket) => sum + ticket.quantity, 0);
    setAttendeeSelected(totalAttendees);
    
    // Initialize attendees array
    const newAttendees: any[] = [];
    selectedTickets.forEach(ticket => {
      for (let i = 0; i < ticket.quantity; i++) {
        newAttendees.push({
          name: '',
          email: '',
          role: '',
          organization: '',
          ticketType: ticket.name
        });
      }
    });
    setAttendees(newAttendees);
  }, [selectedTickets]);

  return {
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
  };
}
