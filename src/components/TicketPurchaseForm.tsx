"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { countries } from '@/data/countries';
import type { FieldChange } from "@/types/forms";
import type { TicketFormData, TicketOption } from "@/components/summit/ticket-form/types";
import FormActions from "@/components/summit/ticket-form/FormActions";
import EarlyBirdFields from "@/components/summit/ticket-form/EarlyBirdFields";
import VipDelegateFields from "@/components/summit/ticket-form/VipDelegateFields";
import AgencyGrowthFields from "@/components/summit/ticket-form/AgencyGrowthFields";
import VirtualAccessFields from "@/components/summit/ticket-form/VirtualAccessFields";
import InternationalDelegateFields from "@/components/summit/ticket-form/InternationalDelegateFields";
import CorporateGroupFields from "@/components/summit/ticket-form/CorporateGroupFields";
import StudentFields from "@/components/summit/ticket-form/StudentFields";
import AttendeeDetailsFields from "@/components/summit/ticket-form/AttendeeDetailsFields";
import SelectedTicketSummary from "@/components/summit/ticket-form/SelectedTicketSummary";
import TicketTypeSelect from "@/components/summit/ticket-form/TicketTypeSelect";

const TicketPurchaseForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState<TicketFormData>({
    name: "",
    phone: "",
    country: "",
    role: "",
    company: "",
    email: "",
    ticketType: "general-admission",
    extraDelegates: 0,
    // Student & Young Creatives specific fields
    studentId: "",
    institution: "",
    graduationYear: "",
    // Corporate Group specific fields
    teamSize: 5,
    teamMembers: [] as string[],
    // International Delegate specific fields
    passportNumber: "",
    visaRequired: "",
    accommodationNeeded: "",
    arrivalDate: "",
    departureDate: "",
    // Virtual Access specific fields
    timezone: "",
    preferredLanguage: "",
    // Agency Growth specific fields
    agencySize: "",
    yearsInBusiness: "",
    // VIP Delegate specific fields
    dietaryRequirements: "",
    accessibilityNeeds: "",
    // Early Bird specific fields
    heardAbout: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paystackReady, setPaystackReady] = useState(false);

  // Early Bird countdown timer state
  const [earlyBirdTimeLeft, setEarlyBirdTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Check if Paystack is ready
  useEffect(() => {
    const checkPaystackReady = () => {
      if (typeof window !== "undefined" && window.PaystackPop) {
        setPaystackReady(true);
      } else {
        setPaystackReady(false);
      }
    };

    // Check immediately
    checkPaystackReady();

    // Check periodically until ready
    const interval = setInterval(checkPaystackReady, 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Early Bird countdown timer
  useEffect(() => {
    const targetDate = new Date('2026-10-20T23:59:59+03:00'); // October 20, 2026 at 11:59 PM EAT
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(interval);
        setEarlyBirdTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setEarlyBirdTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Ticket options
  const ticketOptions: TicketOption[] = [
    {
      id: "early-bird",
      name: "Early Bird Pass",
      price: 65,
      currency: "USD",
      description: "Only 100 slots, until Aug 20th 2026",
      validUntil: "October 20th, 2026",
      features: [
        "Full 2-day summit access",
        "Exhibition showcase & networking lounge",
        "Digital speaker presentations post-event",
        "Save 30% before October 20th, 2026"
      ]
    },
    {
      id: "vip-delegate",
      name: "VIP Delegate Pass",
      price: 220,
      currency: "USD",
      description: "Exclusive Access",
      features: [
        "All Agency Growth benefits",
        "VIP Networking Cocktail",
        "Premium lounge w/ WiFi & refreshments",
        "Reserved front-row seating",
        "Recognition as a VIP delegate",
        "PAAN Awards Gala"
      ]
    },
    {
      id: "agency-growth",
      name: "Agency Growth Pass",
      price: 145,
      currency: "USD",
      description: "For Leaders & Teams",
      features: [
        "All General Admission benefits",
        "Agency Leaders Roundtable",
        "Agency Growth Workshop",
        "Priority seating at keynotes",
        "PAAN Awards Gala"
      ]
    },
    {
      id: "general-admission",
      name: "General Admission",
      price: 95,
      currency: "USD",
      description: "Most Popular Standard",
      features: [
        "Full 2-day summit access",
        "Networking app & exhibition",
        "Digital certificate of participation",
        "Access to all keynotes & panels"
      ]
    },
    {
      id: "corporate-group",
      name: "Corporate Group Pass",
      price: 390,
      currency: "USD",
      description: "5+ delegates",
      extraPrice: 70,
      features: [
        "5 Full General Admission tickets",
        "Reserved team seating",
        "Optional group branding mention",
        "Best for teams & agencies"
      ]
    },
    {
      id: "student-creatives",
      name: "Student & Young Creatives Pass",
      price: 50,
      currency: "USD",
      description: "For students and young professionals",
      features: [
        "Full 2 Day access",
        "Exhibition & networking sessions",
        "Student-only networking with recruiters",
        "Certificate of participation"
      ]
    },
    {
      id: "international-delegate",
      name: "International Delegate Pass",
      price: 250,
      currency: "USD",
      description: "For international attendees",
      features: [
        "All General Admission benefits",
        "Concierge support (visa & accommodation)",
        "Welcome kit w/ African-inspired gifts",
        "Priority registration & help desk",
        "PAAN Awards Gala"
      ]
    },
    {
      id: "virtual-access",
      name: "Virtual Access Pass",
      price: 20,
      originalPrice: 25,
      currency: "USD",
      description: "Join from anywhere - Early Bird Pricing",
      features: [
        "Live streaming of keynotes & panels",
        "Access to a networking platform",
        "30-day access to recordings",
        "Join from anywhere"
      ]
    }
  ];

  // Country options

  // Role options
  const roles = [
    "Agency Owner/CEO",
    "Creative Director",
    "Account Manager",
    "Brand Manager",
    "Marketing Manager",
    "Freelancer",
    "Student",
    "Investor",
    "Startup Founder",
    "Corporate Executive",
    "Other"
  ];


  const handleInputChange = (e: FieldChange) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaystackPayment = async () => {
    if (!validateForm()) {
      return;
    }

    // Check if Paystack is ready
    if (!paystackReady) {
      alert("Payment system is loading. Please wait a moment and try again.");
      return;
    }

    setIsLoading(true);

    // Get selected ticket
    const selectedTicket = ticketOptions.find(ticket => ticket.id === formData.ticketType)!;
    
    // Use USD currency for all payments
    const currency = "USD";
    
    // Calculate total amount including extra delegates for corporate group
    let totalAmount = selectedTicket.price;
    if (formData.ticketType === "corporate-group" && formData.teamSize > 5) {
      const extraMembers = formData.teamSize - 5;
      totalAmount += ((selectedTicket.extraPrice ?? 0) * extraMembers);
    }
    
    // Convert to cents
    const amountInCents = totalAmount * 100;

    // Check if Paystack key is configured
    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      alert("Payment system not configured. Please contact support.");
      setIsLoading(false);
      return;
    }

    // Validate required fields
    if (!formData.email || !formData.name) {
      alert("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    // Generate a unique reference
    const reference = `PAAN_SUMMIT_${formData.ticketType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Paystack configuration
    const paystackConfig = {
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: amountInCents,
      currency: currency,
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: formData.name
          },
          {
            display_name: "Phone",
            variable_name: "phone", 
            value: formData.phone
          },
          {
            display_name: "Country",
            variable_name: "country",
            value: formData.country
          },
          {
            display_name: "Role",
            variable_name: "role",
            value: formData.role
          },
          {
            display_name: "Company",
            variable_name: "company",
            value: formData.company
          },
          {
            display_name: "Ticket Type",
            variable_name: "ticket_type",
            value: formData.ticketType
          },
          {
            display_name: "Team Size",
            variable_name: "team_size",
            value: formData.teamSize.toString()
          },
          {
            display_name: "Student ID",
            variable_name: "student_id",
            value: formData.studentId
          },
          {
            display_name: "Institution",
            variable_name: "institution",
            value: formData.institution
          },
          {
            display_name: "Graduation Year",
            variable_name: "graduation_year",
            value: formData.graduationYear
          },
          {
            display_name: "Passport Number",
            variable_name: "passport_number",
            value: formData.passportNumber
          },
          {
            display_name: "Visa Required",
            variable_name: "visa_required",
            value: formData.visaRequired
          },
          {
            display_name: "Accommodation Needed",
            variable_name: "accommodation_needed",
            value: formData.accommodationNeeded
          },
          {
            display_name: "Arrival Date",
            variable_name: "arrival_date",
            value: formData.arrivalDate
          },
          {
            display_name: "Departure Date",
            variable_name: "departure_date",
            value: formData.departureDate
          },
          {
            display_name: "Timezone",
            variable_name: "timezone",
            value: formData.timezone
          },
          {
            display_name: "Preferred Language",
            variable_name: "preferred_language",
            value: formData.preferredLanguage
          },
          {
            display_name: "Agency Size",
            variable_name: "agency_size",
            value: formData.agencySize
          },
          {
            display_name: "Years in Business",
            variable_name: "years_in_business",
            value: formData.yearsInBusiness
          },
          {
            display_name: "Dietary Requirements",
            variable_name: "dietary_requirements",
            value: formData.dietaryRequirements
          },
          {
            display_name: "Accessibility Needs",
            variable_name: "accessibility_needs",
            value: formData.accessibilityNeeds
          },
          {
            display_name: "Heard About",
            variable_name: "heard_about",
            value: formData.heardAbout
          }
        ]
      },
      callback: function(response: any) {
        if (response.status === 'success') {
          // Send ticket purchase data to secretariat
          fetch('/api/send-summit-ticket', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentData: {
                reference: response.reference,
                amount: amountInCents,
                currency: currency,
                status: 'success',
                paidAt: new Date().toISOString()
              },
              ticketData: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                country: formData.country,
                role: formData.role,
                company: formData.company,
                ticketType: formData.ticketType,
                teamSize: formData.teamSize,
                teamMembers: formData.teamMembers,
                studentId: formData.studentId,
                institution: formData.institution,
                graduationYear: formData.graduationYear,
                passportNumber: formData.passportNumber,
                visaRequired: formData.visaRequired,
                accommodationNeeded: formData.accommodationNeeded,
                arrivalDate: formData.arrivalDate,
                departureDate: formData.departureDate,
                timezone: formData.timezone,
                preferredLanguage: formData.preferredLanguage,
                agencySize: formData.agencySize,
                yearsInBusiness: formData.yearsInBusiness,
                dietaryRequirements: formData.dietaryRequirements,
                accessibilityNeeds: formData.accessibilityNeeds,
                heardAbout: formData.heardAbout,
                amount: totalAmount,
                currency: currency,
                features: selectedTicket.features
              },
              reference: response.reference
            }),
          })
          .then(emailResponse => emailResponse.json())
          .then(emailResult => {
            if (emailResult.success) {
              console.log('Ticket purchase email sent successfully');
            } else {
              console.error('Failed to send ticket purchase email:', emailResult.message);
            }
          })
          .catch(emailError => {
            console.error('Error sending ticket purchase email:', emailError);
            // Don't block the payment success flow if email fails
          });

          // Redirect to success page with reference
          window.location.href = `/payment/success?reference=${response.reference}&type=summit&amount=${encodeURIComponent(totalAmount)}&currency=${encodeURIComponent(currency)}`;
        } else {
          alert('Payment failed. Please try again.');
          setIsLoading(false);
        }
      },
      onClose: function() {
        // Redirect to failure page
        window.location.href = `/payment/failure?error=${encodeURIComponent('Payment was cancelled by user')}&reference=${reference}`;
        setIsLoading(false);
      }
    };

    // Initialize Paystack
    try {
      const handler = window.PaystackPop.setup(paystackConfig);
      handler.openIframe();
    } catch (error) {
      console.error('Error initializing Paystack:', error);
      alert('Payment system error. Please refresh the page and try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-auto my-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-paan-dark-blue">Purchase Summit Ticket</h2>
              <p className="text-gray-600 mt-1">Join Africa's premier creative summit</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Icon icon="mdi:close" className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Ticket Selection */}
          <TicketTypeSelect ticketOptions={ticketOptions} formData={formData} setFormData={setFormData} />

          {/* Selected Ticket Benefits */}
          {formData.ticketType && (
            <SelectedTicketSummary ticketOptions={ticketOptions} formData={formData} earlyBirdTimeLeft={earlyBirdTimeLeft} />
          )}



          {/* Form Fields */}
          <AttendeeDetailsFields formData={formData} handleInputChange={handleInputChange} errors={errors} roles={roles} />

          {/* Ticket-Specific Input Fields */}
          {formData.ticketType === "student-creatives" && (
            <StudentFields formData={formData} handleInputChange={handleInputChange} />
          )}

          {formData.ticketType === "corporate-group" && (
            <CorporateGroupFields setFormData={setFormData} formData={formData} />
          )}

          {formData.ticketType === "international-delegate" && (
            <InternationalDelegateFields formData={formData} handleInputChange={handleInputChange} />
          )}

          {formData.ticketType === "virtual-access" && (
            <VirtualAccessFields formData={formData} handleInputChange={handleInputChange} />
          )}

          {formData.ticketType === "agency-growth" && (
            <AgencyGrowthFields formData={formData} handleInputChange={handleInputChange} />
          )}

          {formData.ticketType === "vip-delegate" && (
            <VipDelegateFields formData={formData} handleInputChange={handleInputChange} />
          )}

          {formData.ticketType === "early-bird" && (
            <EarlyBirdFields formData={formData} handleInputChange={handleInputChange} />
          )}

          {/* Terms and Conditions */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Icon icon="mdi:information" className="w-5 h-5 text-paan-blue mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-medium text-paan-dark-blue mb-1">Important Information:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Tickets are non-refundable but transferable</li>
                  <li>• Confirmation email will be sent after payment</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <FormActions onClose={onClose} handlePaystackPayment={handlePaystackPayment} isLoading={isLoading} paystackReady={paystackReady} ticketOptions={ticketOptions} formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default TicketPurchaseForm;
