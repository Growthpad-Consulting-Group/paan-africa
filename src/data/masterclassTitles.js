/** Masterclass page titles by ID — used for SSR H1 and meta before client hydration */
export const MASTERCLASS_TITLES = {
  2: "Managing Challenging Clients",
  3: "Financial Management, Tax & Transfer Pricing for Agencies",
  4: "Proposal Writing & Bidding for Global Clients",
  5: "Agency Leadership & Talent Retention",
  6: "How To Develop Winning Pitches and Retain Clients",
  7: "How To Be The Best Account Handler In Your Agency",
  8: "How To Present Creative Work to Clients",
  9: "Agency Positioning That Cuts Through the Noise",
  11: "Pricing for Maximum Profit Margin & Conversion",
  12: "How to Navigate Procurement Processes & People",
  13: "Effective Time Management",
  14: "Storytelling and Making Complex Arguments Buyable",
  15: "The 7 Deadly Sins of Pitching",
  16: "Critical Thinking in the Age of AI",
  17: "Account Managers as Agency Growth Drivers",
  18: "How to Listen so Clients Talk",
};

export function getMasterclassTitle(id) {
  const numericId = Number(id);
  if (Number.isNaN(numericId)) return null;
  return MASTERCLASS_TITLES[numericId] ?? null;
}
