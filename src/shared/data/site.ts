// Site-wide settings that are not content-managed: edit here, no CMS needed.

export type SocialLink = {
  label: string;
  href: string;
  hoverColor: string;
  /** Iconify icon name (used in the footer) */
  icon: string;
  /** Lucide icon name (used on the contact page) */
  lucideIcon: string;
};

export const socialLinks: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/panafricanagencynetwork", hoverColor: "#1877F2", icon: "ic:baseline-facebook", lucideIcon: "Facebook" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/pan-african-agency-network", hoverColor: "#0077B5", icon: "mdi:linkedin", lucideIcon: "Linkedin" },
  { label: "Instagram", href: "https://instagram.com/pan_african_agency_network", hoverColor: "#E4405F", icon: "mingcute:instagram-fill", lucideIcon: "Instagram" },
  { label: "X", href: "https://x.com/paan_network", hoverColor: "#000000", icon: "iconoir:x", lucideIcon: "Twitter" },
];

/** Public contact address. */
export const contactEmail = "secretariat@paan.africa";

/** Calendly booking pages used around the site. */
export const bookingLinks = {
  /** "Book a call for pricing" on the membership tiers table */
  pricingCall: "https://calendly.com/antony-paan/30min",
  /** "Book a call" on the FAQs page */
  faqCall: "https://calendly.com/antony-paan/45min",
  /** PAAN Academy: partners introduction call */
  academyPartnersIntro: "https://calendly.com/njue-duncan-growthpad/paan-partners-introduction",
} as const;
