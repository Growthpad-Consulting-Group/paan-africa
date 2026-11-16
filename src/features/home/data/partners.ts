// Moved out of the component so content can be edited without touching UI code.

export type StrategicPartner = { name: string; logo: string; alt: string; hasWhiteLogo?: boolean };

export const strategicPartners: StrategicPartner[] = [
    {
      name: "AIA",
      logo: "/assets/images/partners/aia.svg",
      alt: "AIA Logo",
      hasWhiteLogo: true
    },
    {
      name: "IAN",
      logo: "/assets/images/partners/IAN.png",
      alt: "IAN Logo"
    },
    {
      name: "ICCO",
      logo: "/assets/images/partners/ICCO.png",
      alt: "ICCO Logo"
    },
    {
      name: "PRCA",
      logo: "/assets/images/partners/PRCA.png",
      alt: "PRCA Logo"
    }
  ];
