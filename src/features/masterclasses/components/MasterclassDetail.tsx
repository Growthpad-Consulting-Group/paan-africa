"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Header from "@/shared/layouts/standard-header";
import Footer from "@/shared/layouts/footer";
import PaystackScript from "@/shared/components/PaystackScript";
import { generateMasterclassInvoice } from "@/features/masterclasses/lib/invoicePdf";
import { validateMasterclassPromoCode } from "@/features/masterclasses/lib/masterclassPromoCodeService";
import type { Masterclass } from "@/features/masterclasses/lib/masterclassService";
import type { AppliedPromo } from "@/features/masterclasses/components/detail/types";
import QuickActions from "@/features/masterclasses/components/detail/QuickActions";
import SessionDetails from "@/features/masterclasses/components/detail/SessionDetails";
import InstructorCard from "@/features/masterclasses/components/detail/InstructorCard";
import RegistrationPanel from "@/features/masterclasses/components/detail/RegistrationPanel";
import WhoShouldAttend from "@/features/masterclasses/components/detail/WhoShouldAttend";
import WhyAttend from "@/features/masterclasses/components/detail/WhyAttend";
import WhatYoullLearn from "@/features/masterclasses/components/detail/WhatYoullLearn";
import AboutMasterclass from "@/features/masterclasses/components/detail/AboutMasterclass";
import MasterclassHero from "@/features/masterclasses/components/detail/MasterclassHero";

type Props = { masterclass: Masterclass };

const MasterclassDetail = ({ masterclass }: Props) => {
  const [selectedPricing, setSelectedPricing] = useState('member');
  const [isLoading, setIsLoading] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);
  const [seatCount, setSeatCount] = useState(1);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: '',
    phone: '',
    organization: ''
  });
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeError, setPromoCodeError] = useState('');
  const [appliedPromoCode, setAppliedPromoCode] = useState<AppliedPromo | null>(null);
  const [isValidatingPromoCode, setIsValidatingPromoCode] = useState(false);

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

   const handleShare = async () => {
    const shareData = {
      title: "Masterclass",
      text: "Check out this masterclass!",
      url: window.location.href, // current page URL
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // fallback: copy link to clipboard
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };


  // `masterclass` comes from Sanity (Masterclass document). `masterclass.id` is the permanent numeric id
  // used in payment references and promo codes, so it must not change.
  const h1Title = masterclass?.title;

  // Generate meta data
  const pageTitle = `${masterclass.title} - PAAN Masterclass`;
  const pageDescription = masterclass.description;
  const pageUrl = `https://paan.africa/masterclasses/${masterclass.slug}`;
  const pageImage = masterclass.image;
  const instructorName = masterclass.instructor.name;
  const instructorTitle = masterclass.instructor.title;
  const masterclassDate = masterclass.date;
  const masterclassTime = masterclass.time;
  const masterclassFormat = masterclass.format;
  const memberPrice = masterclass.memberPrice;
  const nonMemberPrice = masterclass.nonMemberPrice;
  const currency = masterclass.currency;

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": masterclass.title,
    "description": masterclass.description,
    "provider": {
      "@type": "Organization",
      "name": "Pan-African Advertising Network (PAAN)",
      "url": "https://paan.africa"
    },
    "instructor": {
      "@type": "Person",
      "name": instructorName,
      "jobTitle": instructorTitle,
      "description": masterclass.instructor.bio
    },
    "courseMode": "online",
    "educationalLevel": masterclass.level,
    "coursePrerequisites": "Professional experience in advertising and marketing",
    "syllabusSections": masterclass.learningOutcomes?.map(outcome => ({
      "@type": "Syllabus",
      "description": outcome
    })),
    "offers": [
      {
        "@type": "Offer",
        "name": "PAAN Member Price",
        "price": memberPrice,
        "priceCurrency": currency,
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      },
      {
        "@type": "Offer", 
        "name": "Non-Member Price",
        "price": nonMemberPrice,
        "priceCurrency": currency,
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString()
      }
    ],
    "image": pageImage,
    "url": pageUrl,
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString()
  };

  const handlePromoCodeValidation = async () => {
    if (!promoCode.trim()) {
      setPromoCodeError('');
      setAppliedPromoCode(null);
      return;
    }

    setIsValidatingPromoCode(true);
    setPromoCodeError('');

    const basePrice = selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice;
    const totalPrice = basePrice * seatCount;

    const validation = await validateMasterclassPromoCode(promoCode.trim(), masterclass.id, totalPrice);
    
    setIsValidatingPromoCode(false);

    if (validation.valid) {
      setAppliedPromoCode(validation.promoCode ?? null);
      setPromoCodeError('');
    } else {
      setAppliedPromoCode(null);
      setPromoCodeError(validation.error || 'Invalid promo code');
    }
  };

  const handlePaystackPayment = async () => {
    if (!customerInfo.email || !customerInfo.name) {
      alert('Please fill in your email and name to proceed.');
      return;
    }

    // Check if Paystack is ready
    if (!paystackReady) {
      alert("Payment system is loading. Please wait a moment and try again.");
      return;
    }

    setIsLoading(true);

    const basePrice = selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice;
    const totalPrice = basePrice * seatCount;
    
    // Apply discount if promo code is valid
    const discountAmount = appliedPromoCode ? appliedPromoCode.discountAmount : 0;
    const finalPrice = totalPrice - discountAmount;
    
    const currency = "USD";
    const amountInCents = Math.max(0, Math.round(finalPrice * 100));

    // Check if Paystack key is configured
    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      alert("Payment system not configured. Please contact support.");
      setIsLoading(false);
      return;
    }

    // Generate a unique reference
    const reference = `PAAN_MASTERCLASS_${masterclass.id}_${selectedPricing}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Paystack configuration
    const paystackConfig = {
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: customerInfo.email,
      amount: amountInCents,
      currency: currency,
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: customerInfo.name
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: customerInfo.phone
          },
          {
            display_name: "Organization",
            variable_name: "organization",
            value: customerInfo.organization
          },
          {
            display_name: "Masterclass",
            variable_name: "masterclass",
            value: masterclass.title
          },
          {
            display_name: "Pricing Type",
            variable_name: "pricing_type",
            value: selectedPricing
          },
          {
            display_name: "Seat Count",
            variable_name: "seat_count",
            value: seatCount.toString()
          },
          {
            display_name: "Base Price",
            variable_name: "base_price",
            value: basePrice.toString()
          },
          {
            display_name: "Total Price",
            variable_name: "total_price",
            value: totalPrice.toString()
          },
          {
            display_name: "Masterclass ID",
            variable_name: "masterclass_id",
            value: masterclass.id.toString()
          }
        ]
      },
      callback: function(response: { status: string; reference: string }) {
        if (response.status === 'success') {
          // Send masterclass purchase data to backend
          fetch('/api/send-masterclass-purchase', {
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
              masterclassData: {
                name: customerInfo.name,
                email: customerInfo.email,
                phone: customerInfo.phone,
                organization: customerInfo.organization,
                masterclassId: masterclass.id,
                masterclassTitle: masterclass.title,
                pricingType: selectedPricing,
                seatCount: seatCount,
                basePrice: basePrice,
                totalAmount: totalPrice,
                discountAmount: discountAmount,
                finalAmount: finalPrice,
                promoCode: appliedPromoCode ? appliedPromoCode.code : null,
                amount: finalPrice,
                currency: currency,
                date: masterclass.date,
                time: masterclass.time,
                format: masterclass.format,
                instructor: masterclass.instructor.name
              },
              reference: response.reference
            }),
          })
          .then(emailResponse => emailResponse.json())
          .then(emailResult => {
            if (emailResult.success) {
              console.log('Masterclass purchase email sent successfully');
            } else {
              console.error('Failed to send masterclass purchase email:', emailResult.message);
            }
          })
          .catch(emailError => {
            console.error('Error sending masterclass purchase email:', emailError);
            // Don't block the payment success flow if email fails
          });

          // Redirect to success page with reference
          window.location.href = `/payment/success?reference=${response.reference}&type=masterclass`;
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

  const generateProfessionalPDFInvoice = () => {
    if (!customerInfo.email || !customerInfo.name) {
      alert('Please fill in your email and name to generate invoice.');
      return;
    }
    generateMasterclassInvoice({ masterclass, customerInfo, selectedPricing, seatCount });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PaystackScript />
      <Header navLinkColor="text-gray-950" />
      <div className="relative">
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <MasterclassHero masterclass={masterclass} />

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-8">            

                {/* About Section */}
                <AboutMasterclass masterclass={masterclass} />

                {/* Learning Outcomes */}
                <WhatYoullLearn masterclass={masterclass} />

                {/* Why Attend */}
                <WhyAttend masterclass={masterclass} />

                {/* Course Objectives */}
                {masterclass.courseObjectives && (
                  <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Objectives</h2>
                    <div className="space-y-3">
                      {masterclass.courseObjectives.map((objective: string, index: number) => (
                        <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
                          <Icon icon="mdi:target" className="text-blue-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-700 text-sm leading-relaxed">{objective}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Who Should Attend */}
                <WhoShouldAttend masterclass={masterclass} />

                {/* Pricing & Purchase Card */}
                <RegistrationPanel setSeatCount={setSeatCount} seatCount={seatCount} setSelectedPricing={setSelectedPricing} selectedPricing={selectedPricing} masterclass={masterclass} appliedPromoCode={appliedPromoCode} promoCode={promoCode} setPromoCode={setPromoCode} setPromoCodeError={setPromoCodeError} setAppliedPromoCode={setAppliedPromoCode} handlePromoCodeValidation={handlePromoCodeValidation} isValidatingPromoCode={isValidatingPromoCode} promoCodeError={promoCodeError} customerInfo={customerInfo} setCustomerInfo={setCustomerInfo} handlePaystackPayment={handlePaystackPayment} isLoading={isLoading} paystackReady={paystackReady} />

              </div>

              {/* Sidebar */}
              <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                {/* Instructor Card */}
                <InstructorCard masterclass={masterclass} />

                {/* Session Details */}
                <SessionDetails masterclass={masterclass} />

                {/* Quick Actions */}
                <QuickActions handleShare={handleShare} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MasterclassDetail;
