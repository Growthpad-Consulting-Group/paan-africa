export type TicketFormData = {
  name: string;
  phone: string;
  country: string;
  role: string;
  company: string;
  email: string;
  ticketType: string;
  extraDelegates: number;
  studentId: string;
  institution: string;
  graduationYear: string;
  teamSize: number;
  teamMembers: string[];
  passportNumber: string;
  visaRequired: string;
  accommodationNeeded: string;
  arrivalDate: string;
  departureDate: string;
  timezone: string;
  preferredLanguage: string;
  agencySize: string;
  yearsInBusiness: string;
  dietaryRequirements: string;
  accessibilityNeeds: string;
  heardAbout: string;
};

export type TicketOption = {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  validUntil?: string;
  features: string[];
  extraPrice?: number;
  originalPrice?: number;
};

export type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };
