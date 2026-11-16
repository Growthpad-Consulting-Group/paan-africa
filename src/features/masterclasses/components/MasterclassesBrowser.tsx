"use client";

import Header from "@/shared/layouts/standard-header";
import Footer from "@/shared/layouts/footer";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollToTop from "@/shared/components/ScrollToTop";
import { getMasterclasses, getFeaturedSeries, type Masterclass, type MasterclassSeries } from "@/features/masterclasses/lib/masterclassService";
import MasterclassCta from "@/features/masterclasses/components/MasterclassCta";
import MasterclassBenefits from "@/features/masterclasses/components/MasterclassBenefits";
import MasterclassGrid from "@/features/masterclasses/components/MasterclassGrid";
import FeaturedSeriesSection from "@/features/masterclasses/components/FeaturedSeriesSection";
import MasterclassFilters from "@/features/masterclasses/components/MasterclassFilters";
import MasterclassesHero from "@/features/masterclasses/components/MasterclassesHero";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

type Props = { masterclasses: Masterclass[]; featuredSeries: MasterclassSeries | null };

const MasterclassesBrowser = ({ masterclasses: masterclassRecords = [], featuredSeries = null }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Content comes from Sanity (Masterclass + Masterclass Series documents).
  const featuredMasterclassSeries = featuredSeries;
  // The cards expect the instructor name and the short description
  const masterclassesData = masterclassRecords.filter((m) => !m.hideFromListing).map((m) => ({ ...m, instructor: m.instructor.name, description: m.listingDescription }));

  // Helper function to parse dates for sorting
  const parseDate = (dateString: string) => {
    const months: Record<string, number> = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    try {
      const parts = dateString.match(/(\w+)\s+(\d+)(?:st|nd|rd|th),\s+(\d+)/);
      if (parts && months[parts[1]] !== undefined) {
        const month = months[parts[1]];
        const day = parseInt(parts[2], 10);
        const year = parseInt(parts[3], 10);
        return new Date(year, month, day);
      }
    } catch (error) {
      console.error('Error parsing date:', dateString, error);
    }
    return new Date(); // fallback to current date
  };

  // Sort masterclasses by status first (completed last), then by date (earliest first)
  const masterclasses = [...masterclassesData].sort((a, b) => {
    // First, sort by status: completed masterclasses go to the end
    if (a.status === 'completed' && b.status !== 'completed') {
      return 1; // a comes after b
    }
    if (a.status !== 'completed' && b.status === 'completed') {
      return -1; // a comes before b
    }
    
    // If both have the same status, sort by date (earliest first)
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateA.getTime() - dateB.getTime();
  });

  const categoryOptions = [...new Set(masterclasses.map((m) => m.category).filter(Boolean))].map((name) => ({
    id: name.toLowerCase().replace(/\s+/g, '-'),
    name,
    count: masterclasses.filter((m) => m.category === name).length,
  }));
  const categories = [{ id: 'all', name: 'All Masterclasses', count: masterclasses.length }, ...categoryOptions];


  // Series masterclass IDs that are part of the featured series
  const seriesMasterclassIds = featuredMasterclassSeries ? featuredMasterclassSeries.subMasterclasses.map(mc => mc.id) : [];

  const filteredMasterclasses = masterclasses.filter(masterclass => {
    // Exclude series masterclasses from the regular list since they're shown in the featured series section
    if (seriesMasterclassIds.includes(masterclass.id)) {
      return false;
    }
    const matchesCategory = selectedCategory === 'all' || 
      masterclass.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    const matchesSearch = masterclass.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      masterclass.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const finalFilteredMasterclasses = filteredMasterclasses;

  return (
    <>
      <Header />
      <div className="relative">       
        
        {/* Hero Section */}
        <MasterclassesHero />

        {/* Stats Section */}
        <MasterclassFilters />

        {featuredMasterclassSeries && (
        <>
        <FeaturedSeriesSection featuredMasterclassSeries={featuredMasterclassSeries} />
        </>
        )}

        {/* All Masterclasses */}
        <MasterclassGrid searchTerm={searchTerm} setSearchTerm={setSearchTerm} categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} finalFilteredMasterclasses={finalFilteredMasterclasses} featuredMasterclassSeries={featuredMasterclassSeries} />

        {/* Why Choose PAAN Masterclasses */}
        <MasterclassBenefits />

        {/* CTA Section */}
        <MasterclassCta />

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default MasterclassesBrowser;