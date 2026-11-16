import type { MasterclassSeries, Masterclass } from "@/features/masterclasses/lib/masterclassService";
type ListedMasterclass = Omit<Masterclass, "instructor"> & { instructor: string; description: string };
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categories: { id: string; name: string; count: number }[];
  setSelectedCategory: (id: string) => void;
  selectedCategory: string;
  finalFilteredMasterclasses: ListedMasterclass[];
  featuredMasterclassSeries: MasterclassSeries | null;
};

export default function MasterclassGrid({ searchTerm, setSearchTerm, categories, setSelectedCategory, selectedCategory, finalFilteredMasterclasses, featuredMasterclassSeries }: Props) {
  return (
    <section id="masterclasses-grid" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#172840] mb-4">
            All Masterclasses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive library of professional development programs
          </p>
        </div>
    
        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative w-full max-w-2xl mx-auto">
              <Icon icon="mdi:magnify" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search masterclasses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#F25849] focus:border-transparent outline-none"
              />
            </div>
    
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-[#F25849] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
    
        {/* Masterclasses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {finalFilteredMasterclasses.length > 0 ? (
            finalFilteredMasterclasses.map(masterclass => (
              <div key={masterclass.id} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col ${masterclass.status === 'not-accepting-bookings' || masterclass.status === 'completed' ? 'opacity-60' : ''}`}>
                <Link href={`/masterclasses/${masterclass.slug}`} className="relative h-48 flex-shrink-0 cursor-pointer">
                  <Image
                    src={masterclass.image}
                    fill
                    alt={masterclass.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      masterclass.status === 'upcoming' ? 'bg-[#F2B706] text-[#172840]' :
                      masterclass.status === 'not-accepting-bookings' ? 'bg-gray-500 text-white' :
                      masterclass.status === 'completed' ? 'bg-gray-500 text-white' :
                      'bg-[#F2B706] text-[#172840]'
                    }`}>
                      {masterclass.status === 'upcoming' ? 'UPCOMING' : 
                       masterclass.status === 'not-accepting-bookings' ? 'NOT ACCEPTING BOOKINGS' : 
                       masterclass.status === 'completed' ? 'COMPLETED' : 'LIVE'}
                    </span>
                  </div>
                  {featuredMasterclassSeries && masterclass.series === featuredMasterclassSeries.title && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#F25849] text-white px-3 py-1 rounded-full text-xs font-bold">
                        SERIES
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white text-sm">
                      <span className="font-medium">{masterclass.date}</span>
                      <span className="font-medium">{masterclass.time}</span>
                    </div>
                  </div>
                </Link>
    
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <span className="bg-[#84C1D9] text-white px-3 py-1 rounded text-xs font-medium">
                      {masterclass.category}
                    </span>
                    <span className="text-gray-500 text-xs font-medium">{masterclass.level}</span>
                  </div>
    
                  <h3 className="text-lg font-bold text-[#172840] mb-3 line-clamp-2 group-hover:text-[#F25849] transition-colors duration-300 min-h-[3.5rem]">
                    {masterclass.title}
                  </h3>
    
                  {/* <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {masterclass.description}
                  </p> */}
    
                  <div className="flex items-center justify-between mb-4 pt-2 border-t border-gray-100">
                    <div className="text-sm text-gray-600 font-medium">
                      By {masterclass.instructor}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <div className="text-xl font-bold text-[#172840]">
                          ${masterclass.memberPrice}
                        </div>
                        {masterclass.memberOriginalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${masterclass.memberOriginalPrice}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <div className="text-xs text-gray-500">Members</div>
                        {masterclass.memberOriginalPrice && (
                          <div className="text-xs text-green-600 font-semibold">
                            Save ${masterclass.memberOriginalPrice - masterclass.memberPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
    
                  <Link 
                    href={`/masterclasses/${masterclass.slug}`}
                    className={`block w-full text-center py-3 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
                      masterclass.status === 'not-accepting-bookings' || masterclass.status === 'completed'
                        ? 'bg-gray-400 text-white cursor-not-allowed' 
                        : 'bg-[#F25849] text-white hover:bg-[#D6473C]'
                    }`}
                  >
                    {masterclass.status === 'not-accepting-bookings' ? 'Not Accepting Bookings' : 
                     masterclass.status === 'completed' ? 'Completed' : 'View Details'}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <Icon icon="mdi:book-open-variant" className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No masterclasses found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
