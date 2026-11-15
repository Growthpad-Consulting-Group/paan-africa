// Moved out of the component so content can be edited without touching UI code.

export type MemberLogo = { id: number; name: string; logo: string; isWhite?: boolean };

/** Free-member logos in the right-hand marquee. Certified agencies come from Sanity. */
export const freeMemberLogos: MemberLogo[] = [
    {
      id: 20,
      name: '1117',
      logo: '/assets/images/agencies/free-members/1117-logo-website.png',
    },
    {
      id: 21,
      name: 'Alien Nation',
      logo: '/assets/images/agencies/free-members/alien-nation-white.png',
      isWhite: true,
    },
    {
      id: 22,
      name: 'Amethyst',
      logo: '/assets/images/agencies/free-members/amethyst.png',
    },
    {
      id: 23,
      name: 'Carillons Marketing',
      logo: '/assets/images/agencies/free-members/carillons.ma.png',
    },
    {
      id: 24,
      name: 'fisheye',
      logo: '/assets/images/agencies/free-members/fisheye.svg',
    },
    {
      id: 25,
      name: 'Isel',
      logo: '/assets/images/agencies/free-members/isel-BLACK-LOGO.png',
    },
    {
      id: 26,
      name: 'KWETU Marketing',
      logo: '/assets/images/agencies/free-members/KWETU.png',
      isWhite: true,
    },
    {
      id: 27,
      name: 'Lebu Media',
      logo: '/assets/images/agencies/free-members/Lebu-Logo-Dark-BG.png',
      isWhite: true,
    },
    {
      id: 28,
      name: 'ONYX AFRICA',
      logo: '/assets/images/agencies/free-members/ONYXAFRICAvectorblack.jpg',
    },
    {
      id: 29,
      name: 'Softlitic',
      logo: '/assets/images/agencies/free-members/Softlitic.avif',
    },
    {
      id: 30,
      name: 'Zilojo',
      logo: '/assets/images/agencies/free-members/zilojo-small-logo-white.png',
      isWhite: true,
    },
    {
      id: 31,
      name: 'Recruitement Room',
      logo: '/assets/images/agencies/free-members/recruitement-room.png',
      isWhite: false,
    },
    {
      id: 32,
      name: 'African Elite Group',
      logo: '/assets/images/agencies/free-members/african-elite-group.webp',
      isWhite: true,
    },
    {
      id: 33,
      name: 'Research 8020',
      logo: '/assets/images/agencies/free-members/reserch-8020.png',
      isWhite: false,
    },
    {
      id: 34,
      name: 'Nibble Africa',
      logo: '/assets/images/agencies/free-members/nibble-africa.png',
      isWhite: false,
    },
    {
      id: 34,
      name: 'Batou Digital',
      logo: '/assets/images/agencies/free-members/batou-digital.webp',
      isWhite: false,
    },
  ];
