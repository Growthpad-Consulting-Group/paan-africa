// Membership comparison tables (Associate / Full / Gold). Edit here; the table markup lives in components/MemberTiers.js.

export type TierId = "associate" | "full" | "gold";

/** A table cell: plain text, a "not included" cross icon (tinted per tier), or the tier's badge image. */
export type TierCell =
  | string
  | { icon: "not-included"; tone: "associate" | "full" | "inherit" }
  | { badge: TierId };

export type TierRow = { label: string; cells: [TierCell, TierCell, TierCell] };
export type TierGroup = { title?: string; rows: TierRow[] };

/** Table 1: market access, revenue and collaboration benefits. Table 2: "Revenue Growth" benefits. */
export const membershipTables: TierGroup[][] = [
  [
    {
      "title": "Market Access & Client Opportunities",
      "rows": [
        {
          "label": "Clients & projects Access(RFPs, Tenders, RFQs, Closed bids)",
          "cells": [
            "40% of available opportunities",
            "High volume(70%)Pre-qualified leads",
            "Highest volume(100%) Direct introductions to top-tier clients"
          ]
        },
        {
          "label": "Co-Bidding Opportunities",
          "cells": [
            "30% access to available pool",
            "60% access to available pool",
            "Full accessLead co-bidding"
          ]
        },
        {
          "label": "Regional Expansion & hubs",
          "cells": [
            "Access to Regional Hubs offices for co-working or client meetings(Nairobi, Cairo, Johanesburg, Lagos)",
            "Access to Regional Hubs offices for co-working or client meetings(Nairobi, Cairo, Johannesburg, Lagos). Local operational support.",
            "Access to Regional Hubs offices for co-working or client meetings(Nairobi, Cairo, Johannesburg, Lagos). Local Ops support."
          ]
        },
        {
          "label": "Cross-Border Projects",
          "cells": [
            "Access to 30% of available cross-border projects",
            "Access to 70% of available cross-border projects",
            "Access to 100% of available cross-border projects"
          ]
        }
      ]
    },
    {
      "title": "Development of new revenue channels",
      "rows": [
        {
          "label": "Access to revenue generating tech reseller programs",
          "cells": [
            "60% of the opportunities",
            "100% of the opportunities",
            "100% of the opportunities"
          ]
        },
        {
          "label": "Access to non-tech partner programs",
          "cells": [
            "30% of the opportunities",
            "60% access to available pool",
            "100% of the opportunities"
          ]
        },
        {
          "label": "Exclusive partner product bundles",
          "cells": [
            "40% of the opportunities",
            "70% of the opportunities",
            "100% of the opportunities"
          ]
        }
      ]
    },
    {
      "title": "Collaboration & Innovation",
      "rows": [
        {
          "label": "Knowledge & Expertise sharing collaborations (agencies)",
          "cells": [
            "1–2 collab invites/year",
            "Full participation",
            "Lead networks & initiate projects"
          ]
        },
        {
          "label": "PAAN Certified freelancers",
          "cells": [
            "Access to 100% of the talent pool",
            "Access to 100% of the talent pool",
            "Access to 100% of the talent pool"
          ]
        },
        {
          "label": "Agency match-making with clients & collaborating agencies",
          "cells": [
            "20% access to all exclusive matchmaking opportunities",
            "50% access to all exclusive matchmaking opportunities",
            "Access to 100% of the match making opportunities for both clients & collaborative agencies"
          ]
        },
        {
          "label": "White label your services to other agencies",
          "cells": [
            {
              "icon": "not-included",
              "tone": "associate"
            },
            "Available",
            "Available"
          ]
        },
        {
          "label": "Mentorship Programs",
          "cells": [
            {
              "icon": "not-included",
              "tone": "associate"
            },
            {
              "icon": "not-included",
              "tone": "full"
            },
            "Quarterly 1:1 sessions + thought-leadership roundtables"
          ]
        }
      ]
    },
    {
      "title": "Cost Efficiency & Resource Sharing",
      "rows": [
        {
          "label": "Bulk Discounts on software & tools",
          "cells": [
            "Up to 30% of the pre-negotiated value",
            "Up to 70% of the pre-negotiated value",
            "100% of the pre-negotiated value"
          ]
        },
        {
          "label": "Market insights data & reports",
          "cells": [
            "Access to 30% of all market data & reports",
            "Access to 70% of all market data & reports",
            "Access to 100% of all market data & reports + exclusive PAAN commissioned reports"
          ]
        },
        {
          "label": "Agency match-making with clients & collaborating agencies",
          "cells": [
            "20% access to all exclusive matchmaking opportunities",
            "50% access to all exclusive matchmaking opportunities",
            "Access to 100% of the match making opportunities for both clients & collaborative agencies"
          ]
        }
      ]
    },
    {
      "title": "Credibility & Brand Visibility",
      "rows": [
        {
          "label": "Certification Badge (Displayed on Pitches, Website & any other collaterals)",
          "cells": [
            {
              "badge": "full"
            },
            {
              "badge": "associate"
            },
            {
              "badge": "gold"
            }
          ]
        },
        {
          "label": "Invitation to exclusive Partner events/Global benchmarkings/Global launches",
          "cells": [
            "Low Priority access",
            "Medium Priority access",
            "High Priority access"
          ]
        },
        {
          "label": "Featured Case Studies(Agency Spotlight, Founder spotlight, Impact spotlights)",
          "cells": [
            "20% access to all exclusive matchmaking opportunities",
            "50% access to all exclusive matchmaking opportunities",
            "Access to 100% of the match making opportunities for both clients & collaborative agencies"
          ]
        },
        {
          "label": "Listing on PAAN Directory",
          "cells": [
            "Included",
            "Mid Ranking",
            "High Ranking for full visibility"
          ]
        },
        {
          "label": "Annual PAAN Summit",
          "cells": [
            "Attend + Network with local clients in host country",
            "Booth + Speaking opportunity + network with regional clients",
            "VIP Booth + Keynote & Media coverage opportunity + VIP networking with International clients"
          ]
        }
      ]
    }
  ],
  [
    {
      "rows": [
        {
          "label": "Revenue Sharing",
          "cells": [
            "Shared on co-delivered projects",
            "Shared on co-delivered projects",
            "Lead & share larger deals"
          ]
        },
        {
          "label": "Subcontracting Opportunities",
          "cells": [
            {
              "icon": "not-included",
              "tone": "associate"
            },
            "Medium Priority access in your country/region",
            "Exclusive High Priority access in whole continent"
          ]
        },
        {
          "label": "Access to Creative Grants & partner Market development funds",
          "cells": [
            {
              "icon": "not-included",
              "tone": "associate"
            },
            "Medium Priority access in your country/region",
            "Exclusive High Priority access in whole continent"
          ]
        }
      ]
    },
    {
      "title": "Advocacy & Support",
      "rows": [
        {
          "label": "Policy Influence/ Govt events/Advocacy & networking events",
          "cells": [
            {
              "icon": "not-included",
              "tone": "associate"
            },
            "Invitation to key Policy forums & shaping the future of innovation & creative industry in Africa",
            "Priority Invitation to key Policy forums & shaping the future of innovation & creative industry in Africa - Consideration for Panel speaking opportunities"
          ]
        },
        {
          "label": "Legal & Compliance Access(Regional)",
          "cells": [
            "Templates + email support(bronze templates)",
            "Exclusive High Priority access in whole continent",
            "Premium advisory + legal alerts + Gold templates"
          ]
        },
        {
          "label": "Crisis Support",
          "cells": [
            {
              "icon": "not-included",
              "tone": "associate"
            },
            {
              "icon": "not-included",
              "tone": "full"
            },
            "24–48 hr PR support window"
          ]
        }
      ]
    },
    {
      "title": "Exclusive Events & Networking",
      "rows": [
        {
          "label": "Webinars",
          "cells": [
            "Access to all exclusive webinars",
            "Access to all exclusive webinars",
            "Access to all exclusive webinars"
          ]
        },
        {
          "label": "Regional Workshops",
          "cells": [
            "60% of all regional workshops",
            "80% of all regional workshops",
            "Unlimited access + co-hosting option"
          ]
        },
        {
          "label": "Networking Groups",
          "cells": [
            "Full access",
            "Full access",
            "VIP leadership circles"
          ]
        }
      ]
    },
    {
      "title": "Media Access & Talent Competitions Placements",
      "rows": [
        {
          "label": "Access to talent pool from competitions & Pan African placements",
          "cells": [
            {
              "icon": "not-included",
              "tone": "associate"
            },
            "Access talent from Pan African creative competitions organized by PAAN",
            "Access talent from Pan African creative competitions organized by PAAN(top-tier competition winners)"
          ]
        },
        {
          "label": "Media Rate Cards",
          "cells": [
            "Regional rates",
            "Pre-negotiated Pan-African rates",
            "Prenegotiated Pan African rates + first-look deals"
          ]
        },
        {
          "label": "PAAN Board Of Agencies",
          "cells": [
            {
              "icon": "not-included",
              "tone": "associate"
            },
            {
              "icon": "not-included",
              "tone": "full"
            },
            "Agency founder(s) can become a member of the advisory board"
          ]
        }
      ]
    },
    {
      "title": "Agency Recognition",
      "rows": [
        {
          "label": "Pan African Awards participation",
          "cells": [
            "Full participation",
            "Full participation",
            "Full participation"
          ]
        },
        {
          "label": "Media features & interviews during summits & Regional events",
          "cells": [
            {
              "icon": "not-included",
              "tone": "associate"
            },
            {
              "icon": "not-included",
              "tone": "full"
            },
            "Exclusive invitation"
          ]
        }
      ]
    },
    {
      "title": "Mergers & Acquisitions",
      "rows": [
        {
          "label": "Buy/Sell/merge your agency",
          "cells": [
            "Available",
            "Available",
            "Available"
          ]
        }
      ]
    },
    {
      "title": "PAAN Academy",
      "rows": [
        {
          "label": "PAAN Academy",
          "cells": [
            {
              "icon": "not-included",
              "tone": "inherit"
            },
            "Create Courses & new revenue",
            "Create Courses & new revenue"
          ]
        }
      ]
    }
  ]
] as TierGroup[][];
