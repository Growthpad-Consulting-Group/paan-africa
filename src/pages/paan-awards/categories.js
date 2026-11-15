import SEO from "@/components/SEO";
import PAANAwardsHeader from "@/layouts/paan-awards-header";
import Image from "next/image";
import { Icon } from "@iconify/react";
import Footer from "@/layouts/footer";
import { useEffect, useRef, useState } from "react";
import { useFixedHeader, handleScroll } from '../../../utils/scrollUtils';
import ScrollToTop from "@/components/ScrollToTop";
import Head from "next/head";
import { motion } from "framer-motion";
import PAANAwardsApplicationModal from "@/components/PAANAwardsApplicationModal";
import CategoryNominationModal from "@/components/CategoryNominationModal";
import PaystackScript from "@/components/PaystackScript";
import { getAwards } from "@/lib/summitService";

// Animation variants - defined outside component for global access
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" }
};

const SummitPage = ({ awards }) => {
  // Award categories come from Sanity (Award Category Group documents)
  const awardCategories = awards.agencyGroups;
  const freelancerAwards = awards.freelancerGroups;
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    highlights: useRef(null),
    themes: useRef(null),
    sessions: useRef(null),
    whoShouldAttend: useRef(null),
    tickets: useRef(null),
    events: useRef(null),
    contactUs: useRef(null),
  };

  const isFixed = useFixedHeader();
  const [activeDay, setActiveDay] = useState('day1');
  
  // Count up animation state
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    investorMeetings: 0,
    ndasSigned: 0,
    termSheets: 0
  });

  // Speakers carousel state - Commented out jury state
  // const [currentJuryIndex, setCurrentJuryIndex] = useState(0);
  // const [visibleJury, setVisibleJury] = useState(3);

  // Awards toggle state
  const [awardType, setAwardType] = useState('agency'); // 'agency' or 'freelancer'
  
  // Application modal state
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  
  // Category nomination modal state
  const [isNominationModalOpen, setIsNominationModalOpen] = useState(false);

  // Search and accordion state
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [expandedCategories, setExpandedCategories] = useState(new Set());

 
  // Get visible jury - Commented out
  // const getVisibleJury = () => {
  //   return jury.slice(currentJuryIndex, currentJuryIndex + visibleJury);
  // };

  // Jury data - Commented out
  // const jury = [
  //   {
  //     id: 1,
  //     name: "Mark Doe",
  //     title: "CEO, Company",
  //     image: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/jury/1.png",
  //   },
  //   {
  //     id: 2,
  //     name: "Sarah Johnson",
  //     title: "Creative Director, Design Studio",
  //     image: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/jury/1.png",
  //   },
  //   {
  //     id: 3,
  //     name: "David Kim",
  //     title: "Tech Innovation Lead, Startup Inc",
  //     image: "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/jury/1.png",
  //   },
  // ];

  // Define category IDs for agency awards
  const agencyCategoryIds = ['campaign-excellence', 'agency-excellence', 'innovation-technology', 'sector-excellence', 'special-honors'];
  
  // Include ALL subcategories from all agency award categories
  const agencyAwards = awardCategories
    .filter(category => agencyCategoryIds.includes(category.id))
    .flatMap(category => 
      category.subcategories.map(subcat => ({
        id: subcat.id,
        title: subcat.name,
        description: subcat.description,
        categoryName: category.name,
        categoryId: category.id
      }))
    );

  // Include ALL freelancer award subcategories (no filtering)
  const filteredFreelancerAwards = freelancerAwards.flatMap(award => 
    award.subcategories.map(subcat => ({
      id: subcat.id,
      title: subcat.title,
      description: subcat.description,
      categoryName: award.name,
      categoryId: award.id
    }))
  );

  // Get current awards list based on awardType
  const currentAwards = awardType === 'agency' ? agencyAwards : filteredFreelancerAwards;

  // Filter awards based on search query
  const filteredAwards = currentAwards.filter(award => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      award.title?.toLowerCase().includes(query) ||
      award.description?.toLowerCase().includes(query) ||
      award.name?.toLowerCase().includes(query) ||
      award.categoryName?.toLowerCase().includes(query)
    );
  });

  // Group agency awards by category for better organization
  const groupedAgencyAwards = awardType === 'agency' && !searchQuery.trim() 
    ? awardCategories
        .filter(category => agencyCategoryIds.includes(category.id))
        .map(category => ({
          categoryId: category.id,
          categoryName: category.name,
          categoryDescription: category.description,
          awards: category.subcategories.map(subcat => ({
            id: subcat.id,
            title: subcat.name,
            description: subcat.description,
            categoryName: category.name,
            categoryId: category.id
          }))
        }))
    : null;

  // Group freelancer awards by category for better organization
  const groupedFreelancerAwards = awardType === 'freelancer' && !searchQuery.trim()
    ? freelancerAwards.map(award => ({
        categoryId: award.id,
        categoryName: award.name,
        categoryDescription: award.description,
        awards: award.subcategories.map(subcat => ({
          id: subcat.id,
          title: subcat.title,
          description: subcat.description,
          categoryName: award.name,
          categoryId: award.id
        }))
      }))
    : null;

  // Toggle category group expansion
  const toggleCategory = (categoryId) => {
    const newExpandedCategories = new Set(expandedCategories);
    if (newExpandedCategories.has(categoryId)) {
      newExpandedCategories.delete(categoryId);
    } else {
      newExpandedCategories.add(categoryId);
    }
    setExpandedCategories(newExpandedCategories);
  };

  // Expand/Collapse all functionality
  const expandAll = () => {
    if (groupedAgencyAwards) {
      // Expand all category groups
      const allCategoryIds = new Set(groupedAgencyAwards.map(group => group.categoryId));
      setExpandedCategories(allCategoryIds);
      
      // Expand all award items within all groups
      const allIds = new Set(
        groupedAgencyAwards.flatMap(group => 
          group.awards.map(award => award.id || award.title || award.name)
        )
      );
      setExpandedItems(allIds);
    } else if (groupedFreelancerAwards) {
      // Expand all freelancer category groups
      const allCategoryIds = new Set(groupedFreelancerAwards.map(group => group.categoryId));
      setExpandedCategories(allCategoryIds);
      
      // Expand all award items within all groups
      const allIds = new Set(
        groupedFreelancerAwards.flatMap(group => 
          group.awards.map(award => award.id || award.title || award.name)
        )
      );
      setExpandedItems(allIds);
    } else {
      // For flat view (search results)
      const allIds = new Set(filteredAwards.map(award => award.id || award.title || award.name));
      setExpandedItems(allIds);
    }
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
    setExpandedCategories(new Set());
  };

  const toggleItem = (awardId) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(awardId)) {
      newExpandedItems.delete(awardId);
    } else {
      newExpandedItems.add(awardId);
    }
    setExpandedItems(newExpandedItems);
  };

  // Count up animation effect
  useEffect(() => {
    if (isVisible) {
      const duration = 2000; // 2 seconds
      const steps = 60; // 60 steps for smooth animation
      const stepDuration = duration / steps;
      
      const targets = {
        investorMeetings: 150,
        ndasSigned: 50,
        termSheets: 10
      };
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          investorMeetings: Math.floor(targets.investorMeetings * progress),
          ndasSigned: Math.floor(targets.ndasSigned * progress),
          termSheets: Math.floor(targets.termSheets * progress)
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setCounts(targets);
        }
      }, stepDuration);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Countdown timer state and logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date to April 22, 2026
  useEffect(() => {
    const targetDate = new Date('2026-04-22T00:00:00+03:00'); // April 22, 2026 at midnight EAT
    
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;
      
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Restore IntersectionObserver for section transitions
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-visible");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Intersection observer for stats animation
  useEffect(() => {
    const statsSection = document.getElementById('stats-section');
    if (statsSection) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isVisible) {
              setIsVisible(true);
            }
          });
        },
        { threshold: 0.3 }
      );
      
      observer.observe(statsSection);
      
      return () => observer.unobserve(statsSection);
    }
  }, [isVisible]);
  

  return (
    <>
      <SEO
        title="PAAN Awards 2026 | Browse All Award Categories"
        description="Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria, find the right fit for your work, and prepare your nomination."
        keywords="PAAN Awards categories, award categories 2026, African creative awards categories, agency awards Africa, campaign awards, freelancer awards Africa, PAAN Awards nomination, award criteria, creative industry categories"
        image="https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png"
        ogTitle="PAAN Awards 2026 | Browse All Award Categories"
        ogDescription="Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria, find the right fit for your work, and prepare your nomination."
        twitterTitle="PAAN Awards 2026 | Browse All Award Categories"
        twitterDescription="Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria, find the right fit for your work, and prepare your nomination."
        canonicalUrl="https://paan.africa/paan-awards/categories"
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "PAAN Awards 2026 - Celebrating Excellence in African Creative & Tech Industry",
              "alternateName": "PAAN Creative & Tech Awards 2026",
              "startDate": "2026-04-22T19:00:00+03:00",
              "endDate": "2026-04-22T23:00:00+03:00",
              "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
              "eventStatus": "https://schema.org/EventScheduled",
              "location": {
                "@type": "Place",
                "name": "TBC",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "TBC",
                  "addressLocality": "Nairobi",
                  "addressRegion": "Nairobi County",
                  "postalCode": "00100",
                  "addressCountry": "KE"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "-1.2921",
                  "longitude": "36.8219"
                }
              },
              "image": [
                "https://ik.imagekit.io/nkmvdjnna/PAAN/awards/hero.png",
                "https://paan.africa/assets/images/hero.webp"
              ],
              "description": "Browse every PAAN Awards 2026 category for agencies, campaigns, innovation, and freelancers. Compare award criteria and find the right category for your nomination.",
              "offers": {
                "@type": "Offer",
                "url": "https://paan.africa/paan-awards",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-09-01T00:00:00+03:00",
                "description": "Free attendance for PAAN Awards 2026 ceremony"
              },
              "performer": { 
                "@type": "Organization", 
                "name": "PAAN Africa",
                "url": "https://paan.africa"
              },
              "organizer": { 
                "@type": "Organization", 
                "name": "Pan-African Agency Network (PAAN)", 
                "url": "https://paan.africa",
                "logo": "https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296"
              },
              "audience": {
                "@type": "Audience",
                "audienceType": "Creative professionals, tech industry leaders, agencies, freelancers, digital innovators, award nominees and winners"
              },
              "eventSchedule": {
                "@type": "Schedule",
                "startTime": "19:00",
                "endTime": "23:00",
                "duration": "PT4H"
              },
              "award": {
                "@type": "Award",
                "name": "PAAN Awards 2026",
                "description": "Annual awards recognizing excellence in African creative and tech industry",
                "sponsor": {
                  "@type": "Organization",
                  "name": "Pan-African Agency Network (PAAN)"
                }
              },
              "keywords": "PAAN Awards 2026, African creative awards, tech industry awards, creative excellence Africa, digital innovation awards, African agency awards, freelancer recognition, creative industry awards, tech leadership awards, African business awards"
            }),
          }}
        />
      </Head>

      <main className="relative">
        <PAANAwardsHeader 
          navLinkColor='text-white' 
          onApplyNowClick={() => setIsApplicationModalOpen(true)}
        />

        <Hero sectionRefs={sectionRefs} handleScroll={handleScroll} isFixed={isFixed} scrollToSection={scrollToSection} timeLeft={timeLeft} onApplyNowClick={() => setIsApplicationModalOpen(true)} />

        <div className="relative bg-[#F3F9FB]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                {/* top header */}
                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
                    {/* Left side: Expand/Collapse buttons */}
                    <div className="flex gap-3">
                        <button 
                            onClick={expandAll}
                            className="bg-paan-dark-blue rounded-full py-2.5 px-4 sm:px-6 text-white text-sm font-medium hover:bg-paan-dark-blue/90 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <Icon icon="mdi:unfold-more-horizontal" className="w-4 h-4" />
                            <span className="hidden sm:inline">Expand All</span>
                            <span className="sm:hidden">Expand</span>
                        </button>
                        <button 
                            onClick={collapseAll}
                            className="bg-paan-dark-blue rounded-full py-2.5 px-4 sm:px-6 text-white text-sm font-medium hover:bg-paan-dark-blue/90 transition-all duration-300 flex items-center gap-2 shadow-md hover:shadow-lg"
                        >
                            <Icon icon="mdi:unfold-less-horizontal" className="w-4 h-4" />
                            <span className="hidden sm:inline">Collapse All</span>
                            <span className="sm:hidden">Collapse</span>
                        </button>
                    </div>

                    {/* Right side: Search and Tabs */}
                    <div className="flex flex-col sm:flex-row gap-4 flex-1 lg:justify-end">
                        {/* Search input */}
                        <div className="relative flex-1 sm:max-w-xs lg:max-w-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Icon icon="mdi:magnify" className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-paan-dark-blue focus:border-transparent transition-all duration-300"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    <Icon icon="mdi:close-circle" className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                </button>
                            )}
                        </div>

                        {/* Tab between Agency awards and Freelancer Awards */}
                        <div className="flex gap-2 bg-white rounded-full p-1 shadow-md border border-gray-200">
                            <button
                                onClick={() => {
                                    setAwardType('agency');
                                    setExpandedItems(new Set());
                                    setExpandedCategories(new Set());
                                    setSearchQuery('');
                                }}
                                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                                    awardType === 'agency'
                                        ? 'bg-paan-dark-blue text-white shadow-md'
                                        : 'text-gray-600 hover:text-paan-dark-blue hover:bg-gray-50'
                                }`}
                            >
                                Agency Awards
                            </button>
                            <button
                                onClick={() => {
                                    setAwardType('freelancer');
                                    setExpandedItems(new Set());
                                    setExpandedCategories(new Set());
                                    setSearchQuery('');
                                }}
                                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                                    awardType === 'freelancer'
                                        ? 'bg-paan-dark-blue text-white shadow-md'
                                        : 'text-gray-600 hover:text-paan-dark-blue hover:bg-gray-50'
                                }`}
                            >
                                Freelancer Awards
                            </button>
                        </div>
                    </div>
                </div>

                {/* Accordions Section */}
                <div className="mt-10">
                    <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-sm">
                        {filteredAwards.length > 0 ? (
                            <div className="space-y-6">
                                {(groupedAgencyAwards || groupedFreelancerAwards) ? (
                                    // Grouped view for agency or freelancer awards (when no search)
                                    (groupedAgencyAwards || groupedFreelancerAwards).map((group) => {
                                        const isCategoryExpanded = expandedCategories.has(group.categoryId);
                                        return (
                                        <div key={group.categoryId} className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white">
                                            {/* Category Group Header - Accordion */}
                                            <button
                                                onClick={() => toggleCategory(group.categoryId)}
                                                className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left bg-gradient-to-r from-paan-dark-blue to-paan-dark-blue/90 hover:from-paan-dark-blue/90 hover:to-paan-dark-blue transition-all duration-300 flex justify-between items-center gap-4"
                                                aria-expanded={isCategoryExpanded}
                                            >
                                                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                                                    {/* Category Icon */}
                                                    <div className="flex-shrink-0 mt-1">
                                                        <div className="bg-white/20 rounded-lg p-2 sm:p-2.5 backdrop-blur-sm">
                                                            <Icon 
                                                                icon="mdi:trophy-variant" 
                                                                className="w-6 h-6 sm:w-7 sm:h-7 text-white" 
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 sm:gap-3 mb-1">
                                                            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                                                                {group.categoryName}
                                                            </h2>
                                                            {/* Award Count Badge */}
                                                            <span className="bg-white/30 text-white text-xs sm:text-sm font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                                                                <Icon icon="mdi:format-list-bulleted" className="w-3 h-3 sm:w-4 sm:h-4" />
                                                                {group.awards.length}
                                                            </span>
                                                        </div>
                                                        <p className="text-white/90 text-xs sm:text-sm mt-1 line-clamp-2">
                                                            {group.categoryDescription}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex-shrink-0">
                                                    {isCategoryExpanded ? (
                                                        <Icon icon="mdi:chevron-up" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                                    ) : (
                                                        <Icon icon="mdi:chevron-down" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                                                    )}
                                                </div>
                                            </button>
                                            
                                            {/* Category Awards - Collapsible Content */}
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                    isCategoryExpanded
                                                        ? 'max-h-[5000px] opacity-100' 
                                                        : 'max-h-0 opacity-0'
                                                }`}
                                            >
                                                <div className="p-4 sm:p-6 space-y-3 bg-gray-50">
                                                    {group.awards.map((award) => {
                                                        const awardId = award.id || award.title || award.name;
                                                        const isExpanded = expandedItems.has(awardId);
                                                        return (
                                                            <div key={awardId} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                                                                <button
                                                                    onClick={() => toggleItem(awardId)}
                                                                    className="w-full px-4 sm:px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center gap-4"
                                                                    aria-expanded={isExpanded}
                                                                >
                                                                    <h3 className="font-semibold text-gray-800 text-base sm:text-lg pr-4 flex-1">
                                                                        {award.title || award.name}
                                                                    </h3>
                                                                    <div className="flex-shrink-0">
                                                                        {isExpanded ? (
                                                                            <Icon icon="mdi:minus-circle" className="w-6 h-6 text-paan-dark-blue" />
                                                                        ) : (
                                                                            <Icon icon="mdi:plus-circle" className="w-6 h-6 text-paan-dark-blue" />
                                                                        )}
                                                                    </div>
                                                                </button>
                                                                
                                                                <div
                                                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                                        isExpanded
                                                                            ? 'max-h-96 opacity-100' 
                                                                            : 'max-h-0 opacity-0'
                                                                    }`}
                                                                >
                                                                    <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100">
                                                                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                                                            {award.description}
                                                                        </p>
                                                                        <button
                                                                            onClick={() => setIsApplicationModalOpen(true)}
                                                                            className="mt-4 bg-paan-red text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-paan-red/90 transition-all duration-300 flex items-center gap-2"
                                                                        >
                                                                            <Icon icon="mdi:send" className="w-4 h-4" />
                                                                            Apply for this Award
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                        );
                                    })
                                ) : (
                                    // Flat view when searching or for freelancer awards
                                    filteredAwards.map((award, index) => {
                                        const awardId = award.id || award.title || award.name || index;
                                        const isExpanded = expandedItems.has(awardId);
                                        return (
                                            <div key={awardId} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                                                <button
                                                    onClick={() => toggleItem(awardId)}
                                                    className="w-full px-4 sm:px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center gap-4"
                                                    aria-expanded={isExpanded}
                                                >
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-gray-800 text-base sm:text-lg pr-4">
                                                            {award.title || award.name}
                                                        </h3>
                                                        {award.categoryName && (
                                                            <p className="text-xs text-gray-500 mt-1">{award.categoryName}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        {isExpanded ? (
                                                            <Icon icon="mdi:minus-circle" className="w-6 h-6 text-paan-dark-blue" />
                                                        ) : (
                                                            <Icon icon="mdi:plus-circle" className="w-6 h-6 text-paan-dark-blue" />
                                                        )}
                                                    </div>
                                                </button>
                                                
                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                        isExpanded
                                                            ? 'max-h-96 opacity-100' 
                                                            : 'max-h-0 opacity-0'
                                                    }`}
                                                >
                                                    <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100">
                                                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                                                            {award.description}
                                                        </p>
                                                        <button
                                                            onClick={() => setIsApplicationModalOpen(true)}
                                                            className="mt-4 bg-paan-red text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-paan-red/90 transition-all duration-300 flex items-center gap-2"
                                                        >
                                                            <Icon icon="mdi:send" className="w-4 h-4" />
                                                            Apply for this Award
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <Icon icon="mdi:file-search-outline" className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600 text-lg font-medium mb-2">No categories found</p>
                                <p className="text-gray-500 text-sm">Try adjusting your search query</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Parallax Section */}
        <div className="relative py-12 md:py-16 lg:py-20 overflow-hidden min-h-[400px] md:min-h-[450px] lg:h-[500px]" id="parallax-section" isFixed={isFixed}>
          {/* Parallax Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center lg:bg-fixed"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/image-4.png')",
              filter: "brightness(0.8)"
            }}
          />
          
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-paan-dark-blue/40"></div>
          
          <section className="relative mx-auto max-w-6xl h-full flex items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-8 md:mb-10 lg:mb-12">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold uppercase leading-tight mb-4 md:mb-6 px-2">
                  Are You Africa's Next Creative Leader?
                </h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white leading-relaxed px-4">
                  Join the most prestigious celebration of creativity in Africa. Showcase your impact, inspire the industry, and own the stage at the PAAN Summit Awards.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
                <button 
                  onClick={() => setIsApplicationModalOpen(true)} 
                  className="w-full sm:w-auto bg-paan-red text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm md:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                >
                  Apply Now
                </button>
                
                <button 
                  onClick={() => window.location.href = '/summit'} 
                  className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white hover:text-paan-dark-blue transition-all duration-300 font-medium text-sm md:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                >
                  Join 2026 Summit
                </button>
                
                <a 
                  href="/paan-awards-terms"
                  target="_blank"
                  className="w-full sm:w-auto bg-white/10 border border-white/30 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-white/20 transition-all duration-300 font-medium text-sm md:text-base shadow-lg flex items-center justify-center gap-2 hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Icon icon="mdi:gavel" className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:inline">Terms & Conditions</span>
                  <span className="sm:hidden">Terms</span>
                </a>
              </div>
            </div>
          </section>
        </div>         

        <Footer />
        <ScrollToTop />
        
        {/* Paystack Script */}
        <PaystackScript />
        
        {/* Application Modal */}
        <PAANAwardsApplicationModal 
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
        />
        
        {/* Category Nomination Modal */}
        <CategoryNominationModal 
          isOpen={isNominationModalOpen}
          onClose={() => setIsNominationModalOpen(false)}
        />
      </main>
    </>
  );
};

const Hero = ({ sectionRefs, onApplyNowClick }) => {

    return (
      <>
        <motion.div
          className="relative h-[60vh] sm:h-[70vh] md:h-[75vh] w-full" 
          id="home"
          ref={sectionRefs.home}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Full background image with parallax effect */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://ik.imagekit.io/nkmvdjnna/PAAN/awards/agency-categories.png')",
              filter: "brightness(0.5)"
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
  
          {/* Gradient overlay for better text readability */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
                 
          {/* Content overlay */}
          <div className="relative h-full flex items-end pb-4 sm:pb-6 md:pb-8 lg:pb-10">
            <div className="mx-auto max-w-6xl w-full px-3 sm:px-4">
              <motion.div 
                className="max-w-2xl"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.h1 
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold uppercase text-white mb-3 sm:mb-4 md:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  Explore Award Categories
                </motion.h1>            
                <motion.p 
                  className="text-xs sm:text-sm md:text-base font-normal text-white mb-2 sm:mb-3 md:mb-4 leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  Discover all categories open for entry this year. Whether you're an independent creator or a leading agency, each award celebrates the creativity, impact, and innovation driving Africa's creative industry forward.
                </motion.p>
                <motion.button 
                  onClick={onApplyNowClick}
                  className="text-white bg-paan-red px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center justify-center gap-2 hover:bg-paan-red/90 transition-all duration-300 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                    <Icon icon="mdi:message-text" className="w-5 h-5" />
                    Apply Now
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
  
      </>
    );
  };

export async function getStaticProps() {
  try {
    return { props: { awards: await getAwards() }, revalidate: 3600 };
  } catch (error) {
    console.error('Error loading awards from Sanity:', error);
    return { props: { awards: { agencyGroups: [], freelancerGroups: [], featuredAgencyIds: [], featuredFreelancerIds: [] } }, revalidate: 60 };
  }
}

export default SummitPage;