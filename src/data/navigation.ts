// Main site navigation (header dropdowns). Edit here.

export type NavLink = { label: string; href: string };

export const mainNavigation: Record<string, NavLink[]> = {
  'Join Us': [
    { label: 'Agency Membership', href: '/pricing' },
    { label: 'For Freelancers', href: '/freelancers' },
    { label: 'For Clients', href: '/clients' },
    { label: 'For Partners', href: '/partners' },
    { label: 'Careers', href: '/careers' },
  ],
  'Programs': [
    { label: 'Masterclasses', href: '/masterclasses' },
    { label: 'PAAN Academy', href: '/academy' },
    { label: 'Ambassadors', href: '/paan-ambassador' },    
    { label: 'M&A', href: '/paan-ma-program' },
  ],
  'Events': [
    { label: 'Webinars', href: '/events' },
  ],
  'Resources': [
    { label: 'Portal', href: 'https://member-portal.paan.africa/' },
    { label: 'Apply to Join Us', href: 'https://membership.paan.africa/' },
    { label: 'AI Brief Builder', href: '/ai-brief-builder' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'PAAN Insights', href: '/blogs' },
  ],
};
