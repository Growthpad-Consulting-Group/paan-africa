// Organization schema emitted on every page (shared by the Pages Router _app and the App Router layout).
export const globalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "PAAN Africa",
      "url": "https://paan.africa",
      "logo": "https://paan.africa/assets/images/logo.png",
      "description": "PAAN Africa connects freelancers, businesses, and partners with AI-powered tools to drive digital growth across Africa.",
      "foundingDate": "2024-01-01",
      "founder": { "@type": "Person", "name": "Duncan Njue" },
      "sameAs": [
        "https://www.facebook.com/panafricanagencynetwork",
        "https://instagram.com/pan_african_agency_network",
        "https://www.linkedin.com/company/pan_african_agency_network",
        "https://x.com/paan_network"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254701850850",
        "contactType": "customer service",
        "areaServed": "Africa",
        "availableLanguage": ["English"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "The Westwood Office, 6th Floor 6A, Comply Guide Advisory, Westlands, Nairobi, Kenya",
        "addressLocality": "Nairobi",
        "addressRegion": "Nairobi County",
        "postalCode": "00100",
        "addressCountry": "KE"
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the value of joining PAAN?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Joining PAAN gives you access to cross-border deals, shared tools, mentorship, increased visibility, and revenue growth — all while keeping your agency fully independent."
          }
        },
        {
          "@type": "Question",
          "name": "Will we lose our identity or clients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not at all. You retain your brand and clients. PAAN supports collaboration, not competition, between member agencies."
          }
        },
        {
          "@type": "Question",
          "name": "How are members selected?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Based on track record, regional relevance, capacity, and integrity. Every agency undergoes a due diligence process."
          }
        },
        {
          "@type": "Question",
          "name": "How does PAAN help us get new clients?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PAAN sources briefs and RFPs, enables joint pitching, and increases agency visibility through network promotions."
          }
        }
      ]
    }
  ]
};
