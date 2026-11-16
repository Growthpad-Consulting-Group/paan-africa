// Moved out of the component so content can be edited without touching UI code.

export type FaqItem = { question: string; answer: string };

/** Tab labels, in display order. Each one is a key of `faqs`. */
export const faqCategories: string[] = [
    "About PAAN",
    "Collaboration", 
    "Tools & Resources",
    "Mentorship",
    "Marketing",
    "Governance"
  ];

export const faqs: Record<string, FaqItem[]> = {
    "About PAAN": [
      {
        question: "What is the value of joining PAAN?",
        answer: "Joining PAAN gives you access to cross-border deals, shared tools, mentorship, increased visibility, and revenue growth — all while keeping your agency fully independent."
      },
      {
        question: "Will we lose our identity or clients?",
        answer: "Not at all. You retain your brand and clients. PAAN supports collaboration, not competition, between member agencies."
      },
      {
        question: "How are members selected?",
        answer: "Based on track record, regional relevance, capacity, and integrity. Every agency undergoes a due diligence process."
      },
      {
        question: "Is there a trial period or non-paid membership option?",
        answer: "Yes. Agencies can join as non-paying members to access key opportunities and tools before upgrading."
      },
      {
        question: "What makes PAAN different from other networks?",
        answer: "PAAN is built by agencies for agencies, focused on deal flow, innovation, and Pan-African impact — not just listings."
      },
      {
        question: "How many agencies are currently part of PAAN?",
        answer: "Over 100 agencies are already members. The goal is to reach 500 by end of 2025."
      },
      {
        question: "When was PAAN founded, and by whom?",
        answer: "Founded in 2024 by Duncan Njue in Kenya to unite and grow Africa's fragmented agency ecosystem."
      }
    ],
    "Collaboration": [
      {
        question: "How does PAAN help us get new clients?",
        answer: "PAAN sources briefs and RFPs, enables joint pitching, and increases agency visibility through network promotions."
      },
      {
        question: "What kinds of collaborations can we expect?",
        answer: "You can co-deliver services, co-bid on projects, and share resources — all matched and facilitated by the PAAN Secretariat."
      },
      {
        question: "How do collaborations within PAAN work?",
        answer: "The Secretariat identifies opportunities and matches agencies based on skills, fit, and relevance."
      },
      {
        question: "Can I contact other agencies directly?",
        answer: "No. PAAN coordinates all matches to maintain focus and alignment."
      },
      {
        question: "Can I see a list of member agencies?",
        answer: "No. PAAN protects member privacy and only connects agencies when there's a purposeful opportunity."
      },
      {
        question: "What revenue opportunities can we expect?",
        answer: "You can earn via referrals, co-bidding, subcontracting, and grants for creative innovation."
      },
      {
        question: "How does PAAN support regional expansion?",
        answer: "Through regional hubs in Nairobi, Lagos, Johannesburg, and Cairo, offering space, insights, and credibility."
      }
    ],
    "Tools & Resources": [
      {
        question: "What tools and resources are included?",
        answer: "Access to a portal with hiring tools, tender trackers, legal templates, training, and marketing kits."
      },
      {
        question: "What is PAAN Labs?",
        answer: "An innovation platform that connects agencies with global tech firms to co-create in AI, AR/VR, and more."
      },
      {
        question: "Can we access global tech companies through PAAN?",
        answer: "Yes. Members can resell, pilot, or co-develop tools from global tech partners."
      },
      {
        question: "How does PAAN help us stay ahead of trends?",
        answer: "Through trend reports, research publications, and expert-led webinars with organizations like Kantar and Meta."
      },
      {
        question: "What legal and compliance support is included?",
        answer: "Access to cross-border legal templates, contract guides, and regional compliance advice."
      },
      {
        question: "Are there tools for managing multi-agency projects?",
        answer: "Yes. The PAAN Project Management Hub helps track timelines, deliverables, and collaboration workflows."
      }
    ],
    "Mentorship": [
      {
        question: "What is the mentorship program?",
        answer: "Members receive 1:1 mentorship from Tier 1 Gold agencies on operations, growth, and creativity."
      },
      {
        question: "Can we find talent through PAAN?",
        answer: "Yes. PAAN offers access to vetted freelancers, interns, and top creative talent across Africa."
      },
      {
        question: "Does PAAN help during PR or operational crises?",
        answer: "Yes. Strategic PR support and peer guidance is available within 24–48 hours."
      },
      {
        question: "Are training programs available?",
        answer: "Yes. Members get free/subsidized access to training on leadership, account management, and private coaching for Gold tier."
      }
    ],
    "Marketing": [
      {
        question: "How does PAAN promote member agencies?",
        answer: "Via campaigns, case studies, speaking slots, and global PR initiatives."
      },
      {
        question: "Are there regional limitations to benefits?",
        answer: "No. All members benefit equally across Africa's regions."
      },
      {
        question: "How does PAAN attract global clients?",
        answer: "PAAN promotes the full network and matches multinational briefs to capable member agencies."
      },
      {
        question: "What is the PAAN Summit?",
        answer: "An annual event featuring panels, showcases, and workshops — online and in-person — to build visibility and trust."
      },
      {
        question: "Are media features or awards included?",
        answer: "Yes. Members can be featured in regional media, summit interviews, and Pan-African creative awards."
      }
    ],
    "Governance": [
      {
        question: "How is PAAN governed?",
        answer: "It is member-led, with an advisory board and a central secretariat in Nairobi, supported by regional hubs."
      },
      {
        question: "Can members influence policy?",
        answer: "Yes. Members help shape policies around African digital trade, industry standards, and creative regulation."
      },
      {
        question: "Do I need to attend in-person events?",
        answer: "No. Most PAAN events are hybrid or virtual, so all members can participate from anywhere."
      }
    ]
  };
