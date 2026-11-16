// Moved out of the component so content can be edited without touching UI code.

/** `title` is read by the slider but the current slides have none (it renders an empty heading). */
export type ClientBenefitCard = { title?: string; description: string; image: string };
export type LogoItem = { id: number; name: string; logo: string };

/** Slides on the For Clients page. */
export const clientBenefitCards: ClientBenefitCard[] = [
    {
      description:
        "Certified agencies and vetted freelancers",
      image: "/assets/images/client-slider-img-1.webp",
    },
    {
      description:
        "Strategic coordination across borders",
      image: "/assets/images/client-slider-img-2.webp",
    },
    {
      description:
        "A centralized support team to manage rollout",
      image: "/assets/images/client-slider-img-3.webp",
    },
    {
      description:
        "Local insight from creatives on the ground",
      image: "/assets/images/client-slider-img-4.webp",
    },
  ];

/** Logo grid shown on the home, clients, partners and freelancers pages. */
export const clientLogos: LogoItem[] = [
    {
      id: 1,
      name: 'Agency 1',
      logo: '/assets/images/logos/Deloitte.webp',
    },
    {
      id: 2,
      name: 'Agency 2',
      logo: '/assets/images/logos/Airbnb.webp',
    },
    {
      id: 3,
      name: 'Agency 3',
      logo: '/assets/images/logos/AsusTek-black-logo 1.webp',
    },
    {
      id: 4,
      name: 'Agency 4',
      logo: '/assets/images/logos/Coca-Cola_logo.svg 1.webp',
    },
    {
      id: 5,
      name: 'Agency 5',
      logo: '/assets/images/logos/Elaraby-group-logo 1.webp',
    },
    {
    id: 6,
    name: 'Agency 2',
    logo: '/assets/images/logos/FSD-Africa-Logo 1.webp',
    },
    {
    id: 7,
    name: 'Agency 1',
    logo: '/assets/images/logos/Heineken_logo.svg 1.webp',
    },
    {
    id: 8,
    name: 'Agency 2',
    logo: '/assets/images/logos/Hewlett_Packard_Enterprise-Logo.wine 1.webp',
    },
    {
    id: 9,
    name: 'Agency 3',
    logo: '/assets/images/logos/kenya-airways-thumb 1.webp',
    },
    {
    id: 10,
    name: 'Agency 4',
    logo: '/assets/images/logos/logo-ecobank 1.webp',
    },
    {
    id: 11,
    name: 'Agency 5',
    logo: '/assets/images/logos/logo-ecobank 2.webp',
    },
    {
    id: 12,
    name: 'Agency 2',
    logo: '/assets/images/logos/Logo-pwc 1.webp',
    },
    {
    id: 13,
    name: 'Agency 3',
    logo: '/assets/images/logos/OX_HL_C_RGB 1.webp',
    },
    {
    id: 14,
    name: 'Agency 4',
    logo: '/assets/images/logos/google.webp',
    },
    {
    id: 15,
    name: 'Agency 5',
    logo: '/assets/images/logos/Qatar_Airways_logo.svg 1.webp',
    },
    {
    id: 16,
    name: 'Agency 4',
    logo: '/assets/images/logos/totalenergies.webp',
    },
    {
    id: 17,
    name: 'Agency 5',
    logo: '/assets/images/logos/Uber_logo_2018 1.webp',
    },
    {
    id: 18,
    name: 'Agency 2',
    logo: '/assets/images/logos/Vodacom-Logo.wine 1.webp',
    },
    {
    id: 19,
    name: 'Agency 3',
    logo: '/assets/images/logos/Volkswagen-logo-2015-1920x1080 1.webp',
    },
    {
    id: 20,
    name: 'Agency 4',
    logo: '/assets/images/logos/White-UK-aid-logo-with-strap 1.webp',
    },
  ];
