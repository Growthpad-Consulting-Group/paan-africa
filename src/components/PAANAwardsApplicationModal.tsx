"use client";

import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import toast from 'react-hot-toast';
import ReCAPTCHA from 'react-google-recaptcha';
import PaystackScript from './PaystackScript';
import Modal, { ModalHeader } from './Modal';
import { countries } from '@/data/countries';
import type { FieldChange } from "@/types/forms";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import type { AwardFormData, AwardCategory, AwardPricing } from "@/components/awards/application/types";
import FormActions from "@/components/awards/application/FormActions";
import PaymentSummary from "@/components/awards/application/PaymentSummary";
import TermsFields from "@/components/awards/application/TermsFields";
import AdditionalInfoFields from "@/components/awards/application/AdditionalInfoFields";
import ProjectInfoFields from "@/components/awards/application/ProjectInfoFields";
import CategorySelectionFields from "@/components/awards/application/CategorySelectionFields";
import ProfessionalInfoFields from "@/components/awards/application/ProfessionalInfoFields";
import PersonalInfoFields from "@/components/awards/application/PersonalInfoFields";

const PAANAwardsApplicationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState<AwardFormData>({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    country: '',
    
    // Professional Information
    applicantType: 'agency', // 'agency' or 'freelancer'
    companyName: '',
    website: '',
    portfolio: '',
    yearsExperience: '',
    
    // Award Category Selection
    selectedCategories: [] as string[],
    
    // Project/Work Information
    projectTitle: '',
    projectDescription: '',
    projectUrl: '',
    projectImages: [] as File[],
    
    // Additional Information
    whyApply: '',
    previousAwards: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      instagram: ''
    },
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToDataProcessing: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { siteKey: recaptchaSiteKey, ref: recaptchaRef, token: recaptchaToken, setToken: setRecaptchaToken } = useRecaptcha();
  const [paystackReady, setPaystackReady] = useState(false);

  // Award categories - New structure with grouped categories
  const awardCategories = [
    {
      id: 'campaign-excellence',
      name: 'Campaign Excellence Awards',
      description: 'Celebrating the power of ideas, creativity, and execution across Africa\'s most impactful campaigns. These categories honor the campaigns that moved audiences, shaped perceptions, and delivered results across PR, communications, digital, and brand activations.',
      subcategories: [
        {
          id: 'pr-campaign-year',
          name: 'PR Campaign of the Year',
          description: 'Outstanding public relations campaigns that shaped public perception and delivered measurable impact.'
        },
        {
          id: 'communication-campaign-year',
          name: 'Communication Campaign of the Year',
          description: 'Exceptional communication strategies that effectively reached and engaged target audiences.'
        },
        {
          id: 'ooh-campaign-year',
          name: 'OOH (Out-of-Home) Campaign of the Year',
          description: 'Creative and impactful outdoor advertising campaigns that captured attention and drove results.'
        },
        {
          id: 'social-media-campaign-year',
          name: 'Social Media Campaign of the Year',
          description: 'Innovative social media campaigns that engaged communities and achieved remarkable reach.'
        },
        {
          id: 'content-marketing-campaign-year',
          name: 'Content Marketing Campaign of the Year',
          description: 'Strategic content campaigns that educated, entertained, and converted audiences effectively.'
        },
        {
          id: 'influencer-marketing-campaign-year',
          name: 'Influencer Marketing Campaign of the Year',
          description: 'Successful influencer partnerships that authentically connected brands with their audiences.'
        },
        {
          id: 'csr-impact-campaign-year',
          name: 'CSR/Impact Campaign of the Year',
          description: 'Purpose-driven campaigns that created positive social or environmental impact.'
        },
        {
          id: 'integrated-marketing-campaign-year',
          name: 'Integrated Marketing Campaign of the Year',
          description: 'Seamlessly coordinated multi-channel campaigns that delivered consistent messaging and results.'
        },
        {
          id: 'b2b-marketing-campaign-year',
          name: 'B2B Marketing Campaign of the Year',
          description: 'Business-to-business campaigns that effectively reached and converted professional audiences.'
        },
        {
          id: 'experiential-brand-activation-year',
          name: 'Experiential/Brand Activation of the Year',
          description: 'Immersive brand experiences that created memorable connections with consumers.'
        }
      ]
    },
    {
      id: 'agency-excellence',
      name: 'Agency Excellence Awards',
      description: 'Recognizing the agencies that set the benchmark for innovation, growth, and client success. These awards spotlight agencies of all sizes and specialties that have demonstrated vision, creativity, and measurable impact in building brands across Africa.',
      subcategories: [
        {
          id: 'digital-agency-year',
          name: 'Digital Agency of the Year',
          description: 'Leading digital agencies that excel in online strategy, execution, and innovation.'
        },
        {
          id: 'creative-agency-year',
          name: 'Creative Agency of the Year',
          description: 'Creative agencies that consistently deliver outstanding creative solutions and campaigns.'
        },
        {
          id: 'design-branding-agency-year',
          name: 'Design & Branding Agency of the Year',
          description: 'Agencies specializing in visual identity, brand design, and creative brand development.'
        },
        {
          id: 'media-planning-buying-agency-year',
          name: 'Media Planning & Buying Agency of the Year',
          description: 'Agencies that excel in strategic media planning, buying, and optimization.'
        },
        {
          id: 'production-house-year',
          name: 'Production House of the Year',
          description: 'Production companies delivering exceptional video, audio, and multimedia content.'
        },
        {
          id: 'specialist-agency-year',
          name: 'Specialist Agency of the Year',
          description: 'Agencies with specialized expertise in sectors like healthcare, fintech, agriculture, etc.'
        },
        {
          id: 'rising-agency-year',
          name: 'Rising Agency of the Year',
          description: 'Emerging agencies showing exceptional growth, innovation, and potential.'
        },
        {
          id: 'regional-agency-year',
          name: 'Regional Agency of the Year',
          description: 'Outstanding agencies representing East, West, Southern, or North Africa regions.'
        }
      ]
    },
    {
      id: 'innovation-technology',
      name: 'Innovation & Technology Awards',
      description: 'Celebrating the pioneers redefining the future of marketing through data, technology, and new platforms. These categories honor agencies that harness innovation to deliver smarter, more engaging, and more measurable results.',
      subcategories: [
        {
          id: 'tech-innovation-marketing',
          name: 'Tech Innovation in Marketing Award',
          description: 'Groundbreaking use of technology to create innovative marketing solutions and experiences.'
        },
        {
          id: 'creative-use-data',
          name: 'Creative Use of Data Award',
          description: 'Innovative application of data analytics and insights to drive creative and strategic decisions.'
        },
        {
          id: 'ecommerce-marketing-campaign-year',
          name: 'E-Commerce Marketing Campaign of the Year',
          description: 'Outstanding marketing campaigns that drove e-commerce growth and online sales success.'
        }
      ]
    },
    {
      id: 'sector-excellence',
      name: 'Sector Excellence Awards',
      description: 'Honoring outstanding campaigns in industries that play a vital role in Africa\'s growth and development. These awards highlight work that has transformed communication in specific, high-impact sectors.',
      subcategories: [
        {
          id: 'public-sector-campaign-year',
          name: 'Public Sector Campaign of the Year',
          description: 'Exceptional campaigns for government and public sector organizations that served the public interest.'
        },
        {
          id: 'financial-services-campaign-year',
          name: 'Financial Services Campaign of the Year',
          description: 'Outstanding marketing campaigns in banking, insurance, fintech, and financial services.'
        }
      ]
    },
    {
      id: 'creative-excellence',
      name: 'Creative Excellence Awards',
      description: 'Celebrating mastery in design, branding, and visual storytelling.',
      subcategories: [
        {
          id: 'freelancer-year',
          name: 'Freelancer of the Year Award',
          description: 'The highest individual honour, celebrating an outstanding freelancer who demonstrated creativity, leadership, and measurable business impact across multiple projects.'
        },
        {
          id: 'brand-identity',
          name: 'Excellence in Brand Identity & Visual Design Award',
          description: 'For exceptional brand, graphic, or visual design work that elevated client positioning, storytelling, and recognition.'
        },
        {
          id: 'ui-ux',
          name: 'UI/UX & Product Design Innovation Award',
          description: 'Recognizing exceptional freelancers in app, web, or product experience design that enhanced usability and digital engagement.'
        },
        {
          id: 'photography',
          name: 'Photography & Visual Storytelling Award',
          description: 'For photographers and visual storytellers whose imagery powerfully communicates emotion, culture, and brand narrative.'
        }
      ]
    },
    {
      id: 'digital-performance',
      name: 'Digital Performance Awards',
      description: 'Recognizing freelancers driving measurable results and ROI for brands in the digital economy.',
      subcategories: [
        {
          id: 'website-dev',
          name: 'Website & No-Code Development Excellence Award',
          description: 'Celebrating freelancers who have delivered high-performance websites or e-commerce platforms using modern or no-code tools.'
        },
        {
          id: 'seo-content',
          name: 'SEO Content & Copywriting Excellence Award',
          description: 'Honouring writers whose strategic, high-quality content drives visibility, engagement, and organic growth.'
        },
        {
          id: 'performance-marketing',
          name: 'Performance Marketing Specialist Award',
          description: 'For freelancers who excel in digital ad strategy, campaign optimization, and conversion-focused creative execution.'
        },
        {
          id: 'email-crm',
          name: 'Email, CRM & Lifecycle Marketing Award',
          description: 'Recognizing top freelancers crafting high-performing retention and automation campaigns through email, SMS, or WhatsApp.'
        }
      ]
    },
    {
      id: 'innovation-storytelling',
      name: 'Innovation & Storytelling Awards',
      description: 'Showcasing freelancers leading the way in modern storytelling, video, and digital innovation.',
      subcategories: [
        {
          id: 'short-form-video',
          name: 'Short-Form Video & Editing Mastery Award',
          description: 'For creative editors and storytellers mastering short-form platforms like TikTok, YouTube Shorts, and Reels.'
        },
        {
          id: 'motion-graphics',
          name: 'Motion Graphics & 3D Creativity Award',
          description: 'Honouring motion designers and 3D/AR specialists who elevate visual storytelling through technology and innovation.'
        },
        {
          id: 'ugc-creator',
          name: 'UGC Creator of the Year Award',
          description: 'For independent creators producing authentic, high-impact user-generated content that amplifies brands across Africa.'
        },
        {
          id: 'social-media',
          name: 'Social Media Strategy & Community Growth Award',
          description: 'Recognizing freelancers who\'ve built thriving, engaged digital communities through smart content strategy and audience insight.'
        }
      ]
    },
    {
      id: 'special-honors',
      name: 'Special Honors',
      description: 'Reserved for the highest level of recognition, these awards celebrate visionary leadership and overall excellence. These honors recognize the individuals and agencies that embody the best of Africa\'s independent creative ecosystem.',
      subcategories: [
        {
          id: 'agency-leader-year',
          name: 'Agency Leader of the Year',
          description: 'Visionary leaders who have driven exceptional growth, innovation, and industry impact.'
        },
        {
          id: 'grand-prix-agency-year',
          name: 'Grand Prix: Agency of the Year',
          description: 'The highest honor - recognizing the top overall agency demonstrating excellence across all areas.'
        }
      ]
    }
  ];

  // Define category IDs for each applicant type
  const agencyCategoryIds = ['campaign-excellence', 'agency-excellence', 'innovation-technology', 'sector-excellence', 'special-honors'];
  const freelancerCategoryIds = ['creative-excellence', 'digital-performance', 'innovation-storytelling'];

  // Filter categories based on applicant type
  const filteredAwardCategories = awardCategories.filter(category =>
    formData.applicantType === 'agency'
      ? agencyCategoryIds.includes(category.id)
      : freelancerCategoryIds.includes(category.id)
  );


  const experienceLevels = [
    'Less than 1 year',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '11-15 years',
    '16+ years'
  ];

  // Check if early bird deadline is still active (November 25, 2025)
  const isEarlyBird = () => {
    const earlyBirdDeadline = new Date('2025-11-25T23:59:59+03:00'); // November 25, 2025 at 11:59 PM EAT
    const now = new Date();
    return now <= earlyBirdDeadline;
  };

  // Pricing configuration
  const pricing: Record<string, AwardPricing> = {
    agency: {
      pricePerCategory: isEarlyBird() ? 130 : 200,
      slashedPrice: isEarlyBird() ? 200 : 250,
      currency: 'USD',
      description: 'Agency Application Fee per Category',
      earlyBirdDeadline: 'November 25, 2025'
    },
    freelancer: {
      pricePerCategory: 30,
      slashedPrice: 50,
      currency: 'USD',
      description: 'Freelancer Application Fee per Category'
    }
  };

  // Calculate total price with multi-category discount
  const calculateTotalPrice = () => {
    const selectedPricing = pricing[formData.applicantType];
    const categoryCount = formData.selectedCategories.length;
    
    if (categoryCount === 0) return 0;
    
    const basePrice = selectedPricing.pricePerCategory * categoryCount;
    
    // Apply 25% discount for multiple categories
    if (categoryCount > 1) {
      return basePrice * 0.75; // 25% discount
    }
    
    return basePrice;
  };

  const getDiscountAmount = () => {
    const selectedPricing = pricing[formData.applicantType];
    const categoryCount = formData.selectedCategories.length;
    
    if (categoryCount <= 1) return 0;
    
    const basePrice = selectedPricing.pricePerCategory * categoryCount;
    return basePrice * 0.25; // 25% discount amount
  };

  const handleInputChange = (e: FieldChange) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('socialMedia.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setFormData(prev => ({
      ...prev,
      projectImages: [...prev.projectImages, ...files]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projectImages: prev.projectImages.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    
    if (formData.applicantType === 'agency' && !formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required for agencies';
    }
    
    if (!formData.website.trim()) newErrors.website = 'Website/Portfolio URL is required';
    if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
    if (formData.selectedCategories.length === 0) {
      newErrors.selectedCategories = 'Please select at least one award category';
    }
    if (!formData.projectTitle.trim()) newErrors.projectTitle = 'Project title is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';
    if (!formData.whyApply.trim()) newErrors.whyApply = 'Please explain why you should win this award';
    
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    if (!formData.agreeToDataProcessing) newErrors.agreeToDataProcessing = 'You must agree to data processing';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaystackPayment = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);

    // Calculate total price
    const totalPrice = calculateTotalPrice();
    const selectedPricing = pricing[formData.applicantType];
    
    // Check if Paystack key is configured
    if (!process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY) {
      toast.error('Payment system not configured. Please contact support.');
      setIsSubmitting(false);
      return;
    }

    // Generate a unique reference
    const reference = `PAAN_AWARDS_${formData.applicantType.toUpperCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Paystack configuration
    const paystackConfig = {
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: totalPrice * 100, // Convert to cents
      currency: selectedPricing.currency,
      ref: reference,
      metadata: {
        custom_fields: [
          {
            display_name: "Applicant Type",
            variable_name: "applicant_type",
            value: formData.applicantType
          },
          {
            display_name: "Full Name",
            variable_name: "full_name",
            value: formData.fullName
          },
          {
            display_name: "Company/Organization",
            variable_name: "company_name",
            value: formData.companyName || 'N/A'
          },
          {
            display_name: "Selected Categories",
            variable_name: "selected_categories",
            value: formData.selectedCategories.join(', ')
          },
          {
            display_name: "Project Title",
            variable_name: "project_title",
            value: formData.projectTitle
          },
          {
            display_name: "Country",
            variable_name: "country",
            value: formData.country
          }
        ]
      },
      callback: function(response: any) {
        if (response.status === 'success') {
          // Send application data to secretariat
          fetch('/api/send-awards-application', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentData: {
                reference: response.reference,
                amount: totalPrice * 100,
                currency: selectedPricing.currency,
                status: 'success',
                paidAt: new Date().toISOString()
              },
              applicationData: formData,
              reference: response.reference
            }),
          })
          .then(emailResponse => emailResponse.json())
          .then(emailResult => {
            if (emailResult.success) {
              console.log('Application email sent successfully');
            } else {
              console.error('Failed to send application email:', emailResult.message);
            }
          })
          .catch(emailError => {
            console.error('Error sending application email:', emailError);
            // Don't block the payment success flow if email fails
          });

          // Redirect to success page with reference
          window.location.href = `/payment/success?reference=${response.reference}&type=awards`;
        } else {
          toast.error('Payment failed. Please try again.');
          setIsSubmitting(false);
        }
      },
      onClose: function() {
        // Redirect to failure page
        window.location.href = `/payment/failure?error=${encodeURIComponent('Payment was cancelled by user')}&reference=${reference}`;
        setIsSubmitting(false);
      }
    };

    // Initialize Paystack
    if (window.PaystackPop) {
      try {
        const handler = window.PaystackPop.setup(paystackConfig);
        handler.openIframe();
      } catch (error) {
        console.error('Paystack initialization error:', error);
        toast.error('Payment system error. Please try again.');
        setIsSubmitting(false);
      }
    } else {
      console.error('Paystack not loaded. Attempting to reload...');
      toast.error('Payment system is loading. Please wait a moment and try again.');
      setIsSubmitting(false);
      
      // Try to reload the Paystack script
      setTimeout(() => {
        if (window.PaystackPop) {
          toast.success('Payment system is now ready. Please try again.');
          setPaystackReady(true);
        } else {
          toast.error('Payment system failed to load. Please refresh the page.');
          setPaystackReady(false);
        }
      }, 3000);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  // Check if Paystack is ready
  useEffect(() => {
    const checkPaystack = () => {
      if (typeof window !== 'undefined' && window.PaystackPop) {
        console.log('Paystack is ready!');
        setPaystackReady(true);
      } else {
        console.log('Paystack not ready yet, checking again...');
        setPaystackReady(false);
        // Check again after a short delay
        setTimeout(checkPaystack, 1000);
      }
    };

    checkPaystack();
  }, []);

  // Categories are filtered based on applicant type
  const currentPricing = pricing[formData.applicantType];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <PaystackScript />
        <ModalHeader title="PAAN Awards Application" onClose={onClose} />
        <div className="px-6 pt-4">
          <p className="text-gray-600">
            {formData.applicantType === 'agency' ? 'Agency Application' : 'Freelancer Application'}
          </p>
          {!paystackReady && (
            <div className="flex items-center gap-2 mt-2">
              <Icon icon="mdi:loading" className="w-4 h-4 animate-spin text-paan-red" />
              <span className="text-paan-red text-sm">Loading payment system...</span>
            </div>
          )}
        </div>

        <div className="p-6">
          {/* Applicant Type Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              I am applying as:
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, applicantType: 'agency' }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.applicantType === 'agency'
                    ? 'border-paan-red bg-paan-red/10 text-paan-red'
                    : 'border-gray-300 hover:border-paan-red/50'
                }`}
              >
                <div className="text-center">
                  <Icon icon="mdi:office-building" className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-semibold">Agency</h3>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, applicantType: 'freelancer' }))}
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.applicantType === 'freelancer'
                    ? 'border-paan-red bg-paan-red/10 text-paan-red'
                    : 'border-gray-300 hover:border-paan-red/50'
                }`}
              >
                <div className="text-center">
                  <Icon icon="mdi:account" className="w-8 h-8 mx-auto mb-2" />
                  <h3 className="font-semibold">Freelancer</h3>
                </div>
              </button>
            </div>
          </div>

          {/* Conversion Boosters */}
          {
             formData.applicantType === 'agency' && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Apply for PAAN Awards?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:trophy-variant" className="w-6 h-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Pan African Recognition</h4>
                      <p className="text-sm text-gray-600">Opportunity for Pan African recognition of your work</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:newspaper" className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Media Coverage</h4>
                      <p className="text-sm text-gray-600">Winning work will be featured on PAAN Publications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:glass-cocktail" className="w-6 h-6 text-pink-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Gala Awards Dinner</h4>
                      <p className="text-sm text-gray-600">Access to prestigious Gala Awards Dinner</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:handshake" className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Dual Recognition</h4>
                      <p className="text-sm text-gray-600">Every win = 1 award for your agency + 1 award for your client</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:earth" className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Pan African Reach</h4>
                      <p className="text-sm text-gray-600">Entries coming from over 25+ African countries</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon icon="mdi:account-group" className="w-6 h-6 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Premium Networking</h4>
                      <p className="text-sm text-gray-600">Network with leading brands in Africa</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
             )
          }
          

          <form className="space-y-6">
            {/* Personal Information */}
            <PersonalInfoFields formData={formData} handleInputChange={handleInputChange} errors={errors} />

            {/* Professional Information */}
            <ProfessionalInfoFields formData={formData} handleInputChange={handleInputChange} errors={errors} experienceLevels={experienceLevels} />

            {/* Award Categories */}
            <CategorySelectionFields filteredAwardCategories={filteredAwardCategories} formData={formData} handleCategoryToggle={handleCategoryToggle} errors={errors} />

            {/* Project Information */}
            <ProjectInfoFields formData={formData} handleInputChange={handleInputChange} errors={errors} handleFileUpload={handleFileUpload} removeImage={removeImage} />

            {/* Additional Information */}
            <AdditionalInfoFields formData={formData} handleInputChange={handleInputChange} errors={errors} />

            {/* Terms and Conditions */}
            <TermsFields formData={formData} pricing={pricing} isEarlyBird={isEarlyBird} handleInputChange={handleInputChange} errors={errors} />

            {/* reCAPTCHA */}
            {recaptchaSiteKey && (
              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={recaptchaSiteKey ?? ''}
                  onChange={handleRecaptchaChange}
                />
              </div>
            )}            

            {/* Payment Summary */}
            <PaymentSummary formData={formData} isEarlyBird={isEarlyBird} currentPricing={currentPricing} getDiscountAmount={getDiscountAmount} calculateTotalPrice={calculateTotalPrice} />

            {/* Action Buttons */}
            <FormActions onClose={onClose} handlePaystackPayment={handlePaystackPayment} isSubmitting={isSubmitting} paystackReady={paystackReady} calculateTotalPrice={calculateTotalPrice} />
          </form>
        </div>
    </Modal>
  );
};

export default PAANAwardsApplicationModal;
