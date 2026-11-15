import { useState, useEffect } from "react";
import Head from "next/head";
import { Icon } from "@iconify/react";
import Header from "@/layouts/standard-header";
import Footer from "@/layouts/footer";
import PaystackScript from "@/components/PaystackScript";
import jsPDF from 'jspdf';
import { validateMasterclassPromoCode } from "@/lib/masterclassPromoCodeService";
import type { GetStaticPaths, GetStaticProps } from "next";
import { getMasterclassBySlug, getMasterclassSlugById, getMasterclassSlugs, type Masterclass } from "@/lib/masterclassService";

type AppliedPromo = {
  id: string;
  code: string;
  description?: string | null;
  discountType: string;
  discountValue: number;
  /** Amount taken off, already capped at the base price */
  discountAmount: number;
  minimumAmount?: number | null;
  maximumDiscount?: number | null;
};

type Props = { masterclass: Masterclass };

const MasterclassDetailPage = ({ masterclass }: Props) => {
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

  if (!masterclass) {
    return (
      <>
        <Head>
          <title>{h1Title ? `${h1Title} - PAAN Masterclass` : "PAAN Masterclass"}</title>
        </Head>
        <Header navLinkColor="text-gray-950" />
        <div className="min-h-screen bg-gray-50 pt-40 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {h1Title && (
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-8">
                {h1Title}
              </h1>
            )}
            <div className="flex items-center justify-center py-12 text-gray-600">Loading...</div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
    
    const basePrice = selectedPricing === 'member' ? masterclass.memberPrice : masterclass.nonMemberPrice;
    const totalPrice = basePrice * seatCount;
    const invoiceNumber = `INV-MC-${Date.now()}`;
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create PDF
    const doc = new jsPDF();
    
    // Set font
    doc.setFont('helvetica');
    
    // Header - PAAN Logo area (we'll add text for now, logo can be added later)
    doc.setFontSize(24);
    doc.setTextColor(23, 40, 64); // PAAN dark blue
    doc.text('PAAN', 20, 30);
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('Pan-African Advertising Network', 20, 38);
    
    // Invoice title
    doc.setFontSize(28);
    doc.setTextColor(242, 88, 73); // PAAN red
    doc.text('INVOICE', 140, 30);
    
    // Invoice details
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice #: ${invoiceNumber}`, 140, 45);
    doc.text(`Date: ${currentDate}`, 140, 52);
    doc.text(`Due Date: ${currentDate}`, 140, 59);
    
    // Horizontal line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 70, 190, 70);
    
    // Bill To section
    doc.setFontSize(12);
    doc.setTextColor(23, 40, 64);
    doc.text('BILL TO:', 20, 85);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    let yPos = 95;
    doc.text(customerInfo.name, 20, yPos);
    yPos += 7;
    doc.text(customerInfo.email, 20, yPos);
    if (customerInfo.phone) {
      yPos += 7;
      doc.text(customerInfo.phone, 20, yPos);
    }
    if (customerInfo.organization) {
      yPos += 7;
      doc.text(customerInfo.organization, 20, yPos);
    }
    
    // Masterclass details section
    yPos += 20;
    doc.setFontSize(12);
    doc.setTextColor(23, 40, 64);
    doc.text('MASTERCLASS DETAILS:', 20, yPos);
    
    yPos += 10;
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Title: ${masterclass.title}`, 20, yPos);
    yPos += 7;
    doc.text(`Date: ${masterclass.date}`, 20, yPos);
    yPos += 7;
    doc.text(`Time: ${masterclass.time}`, 20, yPos);
    yPos += 7;
    doc.text(`Format: ${masterclass.format}`, 20, yPos);
    yPos += 7;
    doc.text(`Instructor: ${masterclass.instructor.name}`, 20, yPos);
    
    // Items table
    yPos += 20;
    
    // Table header
    doc.setFillColor(242, 88, 73); // PAAN red background
    doc.rect(20, yPos, 170, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text('DESCRIPTION', 25, yPos + 7);
    doc.text('PRICING TYPE', 100, yPos + 7);
    doc.text('QTY', 140, yPos + 7);
    doc.text('AMOUNT', 160, yPos + 7);
    
    // Table row
    yPos += 10;
    doc.setFillColor(248, 249, 250);
    doc.rect(20, yPos, 170, 15, 'F');
    doc.setTextColor(0, 0, 0);
    
    // Wrap long masterclass title
    const splitTitle = doc.splitTextToSize(masterclass.title, 70);
    doc.text(splitTitle, 25, yPos + 7);
    
    doc.text(selectedPricing === 'member' ? 'Member' : 'Non-Member', 100, yPos + 7);
    doc.text(seatCount.toString(), 140, yPos + 7);
    doc.text(`$${totalPrice}`, 160, yPos + 7);
    
    // Total section
    yPos += 25;
    doc.setDrawColor(200, 200, 200);
    doc.line(120, yPos, 190, yPos);
    
    yPos += 10;
    doc.setFontSize(12);
    doc.setTextColor(23, 40, 64);
    doc.text('SUBTOTAL:', 120, yPos);
    doc.text(`$${totalPrice} USD`, 160, yPos);
    
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(242, 88, 73);
    doc.text('TOTAL:', 120, yPos);
    doc.text(`$${totalPrice} USD`, 160, yPos);
    
    // Footer
    yPos += 30;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for choosing PAAN Masterclasses!', 20, yPos);
    yPos += 7;
    doc.text('For questions, contact: support@paan.africa', 20, yPos);
    yPos += 7;
    doc.text('Website: www.paan.africa', 20, yPos);
    
    // Benefits section
    if (masterclass.benefits && masterclass.benefits.length > 0) {
      yPos += 15;
      doc.setFontSize(12);
      doc.setTextColor(23, 40, 64);
      doc.text('BONUS BENEFITS INCLUDED:', 20, yPos);
      
      yPos += 10;
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      masterclass.benefits.forEach((benefit) => {
        doc.text(`• ${benefit}`, 25, yPos);
        yPos += 7;
      });
    }
    
    // Save the PDF
    doc.save(`PAAN-Masterclass-Invoice-${invoiceNumber}.pdf`);
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`PAAN, masterclass, ${masterclass.category}, ${instructorName}, advertising, marketing, professional development, ${masterclass.level}`} />
        <meta name="author" content="Pan-African Advertising Network" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="PAAN - Pan-African Advertising Network" />
        <meta property="og:locale" content="en_US" />

        {/* Course-specific Open Graph tags */}
        <meta property="course:instructor" content={instructorName ?? undefined} />
        <meta property="course:instructor_title" content={instructorTitle ?? undefined} />
        <meta property="course:date" content={masterclassDate ?? undefined} />
        <meta property="course:time" content={masterclassTime ?? undefined} />
        <meta property="course:format" content={masterclassFormat ?? undefined} />
        <meta property="course:level" content={masterclass.level ?? undefined} />
        <meta property="course:category" content={masterclass.category ?? undefined} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@PAAN_Africa" />
        <meta name="twitter:creator" content="@PAAN_Africa" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Pricing Information */}
        <meta name="price:member" content={`${memberPrice} ${currency}`} />
        <meta name="price:non-member" content={`${nonMemberPrice} ${currency}`} />
        <meta name="currency" content={currency} />

        {/* Event Information */}
        <meta name="event:date" content={masterclassDate ?? undefined} />
        <meta name="event:time" content={masterclassTime ?? undefined} />
        <meta name="event:format" content={masterclassFormat ?? undefined} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#172840" />
        <meta name="msapplication-TileColor" content="#172840" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PAAN Masterclass" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://ik.imagekit.io" />
        <link rel="preconnect" href="https://js.paystack.co" />
      </Head>
      <PaystackScript />
      <Header navLinkColor="text-gray-950" />
      <div className="relative">
        <div className="min-h-screen bg-gray-50">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 pt-40 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Content */}
                <div className="space-y-6">
                  <button
                    onClick={() => (window.location.href = "/masterclasses")}
                    className="inline-flex items-center text-cyan-400 hover:text-white transition-colors text-sm"
                  >
                    <Icon icon="mdi:arrow-left" className="w-4 h-4 mr-2" />
                    Back to Masterclasses
                  </button>
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="bg-amber-500 text-slate-900 px-3 py-1 rounded-full text-xs font-semibold">
                      {masterclass.category}
                    </span>
                    <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {masterclass.level}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      masterclass.status === 'upcoming' ? 'bg-red-500 text-white' :
                      masterclass.status === 'completed' ? 'bg-gray-500 text-white' :
                      masterclass.status === 'not-accepting-bookings' ? 'bg-gray-500 text-white' :
                      'bg-red-500 text-white'
                    }`}>
                      {masterclass.status === 'upcoming' ? 'UPCOMING' :
                       masterclass.status === 'completed' ? 'COMPLETED' :
                       masterclass.status === 'not-accepting-bookings' ? 'NOT ACCEPTING BOOKINGS' :
                       'UPCOMING'}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {masterclass.title}
                  </h1>
                  
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {masterclass.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                    <div className="flex items-center gap-3 text-white text-sm">
                      <Icon icon="mdi:calendar" className="text-red-400 w-5 h-5" />
                      <span>{masterclass.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white text-sm">
                      <Icon icon="mdi:clock" className="text-red-400 w-5 h-5" />
                      <span>{masterclass.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white text-sm">
                      <Icon icon="mdi:play-circle" className="text-red-400 w-5 h-5" />
                      <span>{masterclass.format}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white text-sm">
                      <Icon icon="mdi:account-tie" className="text-red-400 w-5 h-5" />
                      <span>{masterclass.instructor.name}</span>
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={masterclass.image}
                    alt={`${masterclass.title} masterclass`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-8">            

                {/* About Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Masterclass</h2>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>{masterclass.fullDescription}</p>
                    <p>{masterclass.outcome}</p>
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">What You'll Learn</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {masterclass.learningOutcomes?.map((outcome: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <Icon icon="mdi:check-circle" className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why Attend */}
                <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Attend?</h2>
                  <div className="space-y-3">
                    {masterclass.whyAttend?.map((reason: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border-l-4 border-red-500">
                        <Icon icon="mdi:star" className="text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 text-sm leading-relaxed">{reason}</p>
                      </div>
                    ))}
                  </div>
                </div>

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
                <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Who Should Attend?</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {masterclass.whoShouldAttend?.map((attendee: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-cyan-50 rounded-lg">
                        <Icon icon="mdi:account-tie" className="text-cyan-600 w-5 h-5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium text-sm">{attendee}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing & Purchase Card */}
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

              </div>

              {/* Sidebar */}
              <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                {/* Instructor Card */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Your Instructor</h3>
                  <div className="text-center mb-4">
                    <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden border-2 border-red-100">
                      {masterclass.instructor.image ? (
                        <img
                          src={masterclass.instructor.image}
                          alt={masterclass.instructor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = 'none';
                            (img.nextSibling as HTMLElement).style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`w-full h-full bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center ${masterclass.instructor.image ? 'hidden' : 'flex'}`}>
                        <Icon icon="mdi:account" className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-slate-900">{masterclass.instructor.name}</h4>
                    <p className="text-gray-600 text-sm">{masterclass.instructor.title}</p>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {masterclass.instructor.bio}
                  </p>
                  <div>
                    <h5 className="font-semibold text-slate-900 mb-2 text-sm">Expertise:</h5>
                    <div className="flex flex-wrap gap-2">
                      {masterclass.instructor.expertise.map((skill: string, index: number) => (
                        <span key={index} className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Session Details */}
                <div className="bg-slate-800 text-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-4">Session Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:calendar" className="text-red-400 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">{masterclass.date}</div>
                        <div className="text-xs text-gray-300">Date</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:clock" className="text-red-400 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">{masterclass.time}</div>
                        <div className="text-xs text-gray-300">Time</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:play-circle" className="text-red-400 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">{masterclass.format}</div>
                        <div className="text-xs text-gray-300">Format</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon icon="mdi:web" className="text-red-400 w-5 h-5 mt-0.5" />
                      <div>
                        <div className="font-medium text-sm">Interactive Online Live</div>
                        <div className="text-xs text-gray-300">Platform</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-amber-50 rounded-xl shadow-lg p-6 border border-amber-200">
                  <h3 className="text-base font-bold text-slate-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={handleShare}
                      className="w-full bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 flex items-center gap-2 text-sm border border-gray-200"
                    >
                      <Icon icon="mdi:share" className="w-4 h-4" />
                      Share This
                    </button>

                    <button
                      onClick={() => (window.location.href = "/masterclasses")}
                      className="w-full bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm border border-gray-200"
                    >
                      Browse More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getMasterclassSlugs();
  return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props, { slug: string }> = async ({ params }) => {
  const { slug } = params!;
  // Old links were /masterclasses/<number>: permanently redirect them to the slug URL.
  if (/^\d+$/.test(slug)) {
    const target = await getMasterclassSlugById(Number(slug));
    return target ? { redirect: { destination: `/masterclasses/${target}`, permanent: true } } : { notFound: true, revalidate: 60 };
  }
  const masterclass = await getMasterclassBySlug(slug);
  if (!masterclass) return { notFound: true, revalidate: 60 };
  return { props: { masterclass }, revalidate: 3600 };
};

export default MasterclassDetailPage;
