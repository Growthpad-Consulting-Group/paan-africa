import { useState } from "react";
import { Icon } from "@iconify/react";
import type { AgencyAwardGroup, FreelancerAwardGroup } from "@/features/summit/lib/summitService";

type Award = { id: string; title: string; description: string | null; categoryName: string; categoryId: string };
type AwardGroup = { categoryId: string; categoryName: string; categoryDescription: string | null; awards: Award[] };

type Props = {
  agencyGroups: AgencyAwardGroup[];
  freelancerGroups: FreelancerAwardGroup[];
  onApply: () => void;
};

export default function AwardCategoriesBrowser({ agencyGroups, freelancerGroups, onApply }: Props) {
  const setIsApplicationModalOpen = (_open: boolean) => onApply();

  const [awardType, setAwardType] = useState<'agency' | 'freelancer'>('agency');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  // Award groups from Sanity, in the shape the list below renders
  const agencyGroupsList: AwardGroup[] = agencyGroups.map((g) => ({
    categoryId: g.id,
    categoryName: g.name,
    categoryDescription: g.description,
    awards: g.subcategories.map((s) => ({ id: s.id, title: s.name, description: s.description, categoryName: g.name, categoryId: g.id })),
  }));
  const freelancerGroupsList: AwardGroup[] = freelancerGroups.map((g) => ({
    categoryId: g.id,
    categoryName: g.name,
    categoryDescription: g.description,
    awards: g.subcategories.map((s) => ({ id: s.id, title: s.title, description: s.description, categoryName: g.name, categoryId: g.id })),
  }));

  const searching = searchQuery.trim() !== '';
  const currentAwards = (awardType === 'agency' ? agencyGroupsList : freelancerGroupsList).flatMap((g) => g.awards);

  // Flat list used while searching
  const filteredAwards = currentAwards.filter((award) => {
    if (!searching) return true;
    const query = searchQuery.toLowerCase();
    return (
      award.title?.toLowerCase().includes(query) ||
      award.description?.toLowerCase().includes(query) ||
      award.categoryName?.toLowerCase().includes(query)
    );
  });

  // Grouped view (no search text)
  const groupedAgencyAwards = awardType === 'agency' && !searching ? agencyGroupsList : null;
  const groupedFreelancerAwards = awardType === 'freelancer' && !searching ? freelancerGroupsList : null;

  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };
  const toggleCategory = (categoryId: string) => setExpandedCategories(toggle(expandedCategories, categoryId));
  const toggleItem = (awardId: string) => setExpandedItems(toggle(expandedItems, awardId));

  const expandAll = () => {
    const groups = groupedAgencyAwards ?? groupedFreelancerAwards;
    if (groups) {
      setExpandedCategories(new Set(groups.map((group) => group.categoryId)));
      setExpandedItems(new Set(groups.flatMap((group) => group.awards.map((award) => award.id))));
    } else {
      // flat view (search results)
      setExpandedItems(new Set(filteredAwards.map((award) => award.id)));
    }
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
    setExpandedCategories(new Set());
  };

  return (
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
                                (groupedAgencyAwards || groupedFreelancerAwards)!.map((group) => {
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
                                                    const awardId = award.id;
                                                    const isExpanded = expandedItems.has(awardId);
                                                    return (
                                                        <div key={awardId} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
                                                            <button
                                                                onClick={() => toggleItem(awardId)}
                                                                className="w-full px-4 sm:px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center gap-4"
                                                                aria-expanded={isExpanded}
                                                            >
                                                                <h3 className="font-semibold text-gray-800 text-base sm:text-lg pr-4 flex-1">
                                                                    {award.title}
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
                                    const awardId = award.id;
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
                                                        {award.title}
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
  );
}
