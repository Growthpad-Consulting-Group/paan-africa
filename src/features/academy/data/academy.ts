// Content lists for the Academy page. Edit here; the markup lives in pages/academy/index.js.

export type AcademyBenefit = { title: string; description: string };

/** "Why PAAN Academy" benefits (title + description). */
export const academyBenefits: AcademyBenefit[] = [
  {
    "title": "Pan-African Expertise",
    "description": "Led by top-tier strategists, creatives, and media specialists from 200+ agencies across 20+ countries"
  },
  {
    "title": "Custom Curriculum",
    "description": "Tailored training modules for your brand’s goals — from campaign development to media execution"
  },
  {
    "title": "Real-World Learning",
    "description": "Hands-on workshops, case studies, and toolkits your team can apply immediately"
  },
  {
    "title": "Stronger Results",
    "description": "Boost ROI from your marketing spend by empowering internal teams to brief better, manage agencies, and build strategic campaigns"
  }
];

/** Skills list in the training section. */
export const academySkills: string[] = [
  "Strategic Brand Thinking",
  "Mastering the Marketing Brief",
  "AI in Content & Creative Production",
  "Performance Marketing",
  "Cross-Channel Campaign Management",
  "Internal Creative Capacity Building",
  "Collaborating with Agencies & Freelancers"
];

/** "Our Core Training Formats". */
export const academyTrainingFormats: string[] = [
  "Onsite or Virtual Team Workshops",
  "Half-Day, Full-Day or 3-Week Sprints",
  "Executive Bootcamps for CMOs and Marketing Leads",
  "Ongoing Learning Subscriptions"
];

/** Perks listed for freelancers. */
export const freelancerPerks: string[] = [
  "Courses starting from $29",
  "Learn AI tools, digital media, branding",
  "PAAN Certification recognized continent-wide",
  "Join our Africa-wide freelance hiring network"
];

/** Perks listed for agencies. */
export const agencyPerks: string[] = [
  "Custom training for agency staff",
  "Improve client service, pitching, execution",
  "Get prioritized for cross-border campaigns",
  "Learn from Africa's top independent agencies"
];
