export type AwardFormData = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  applicantType: string;
  companyName: string;
  website: string;
  portfolio: string;
  yearsExperience: string;
  selectedCategories: string[];
  projectTitle: string;
  projectDescription: string;
  projectUrl: string;
  projectImages: File[];
  whyApply: string;
  previousAwards: string;
  socialMedia: { linkedin: string; twitter: string; instagram: string };
  agreeToTerms: boolean;
  agreeToDataProcessing: boolean;
};

export type AwardCategory = {
  id: string;
  name: string;
  description: string;
  subcategories: { id: string; name: string; description: string }[];
};

export type AwardPricing = {
  pricePerCategory: number;
  slashedPrice: number;
  currency: string;
  description: string;
  earlyBirdDeadline?: string;
};
