import type { MasterclassSeries, Masterclass } from "@/features/masterclasses/lib/masterclassService";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  featuredMasterclassSeries: MasterclassSeries;
};

export default function FeaturedSeriesSection({ featuredMasterclassSeries }: Props) {
  return (
    <section id="upcoming-masterclass" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#F25849] text-white px-6 py-2 rounded-full text-sm font-semibold mb-4">
            Featured Masterclass Series
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#172840] mb-4">
            {featuredMasterclassSeries.title}
          </h2>
          <p className="text-xl text-[#F25849] font-semibold mb-2">
            {featuredMasterclassSeries.subtitle}
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            {featuredMasterclassSeries.description}
          </p>
        </div>
    
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Series Header */}
          <div className="bg-[#172840] text-white p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Icon icon="mdi:calendar-multiple" className="text-[#F2B706] w-6 h-6" />
                <div>
                  <div className="text-xs text-gray-300">Dates</div>
                  <div className="text-sm font-medium">
                    {featuredMasterclassSeries.dates.join(', ')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:clock" className="text-[#F2B706] w-6 h-6" />
                <div>
                  <div className="text-xs text-gray-300">Time</div>
                  <div className="text-sm font-medium">{featuredMasterclassSeries.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:play-circle" className="text-[#F2B706] w-6 h-6" />
                <div>
                  <div className="text-xs text-gray-300">Duration</div>
                  <div className="text-sm font-medium">{featuredMasterclassSeries.format}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Icon icon="mdi:account-tie" className="text-[#F2B706] w-6 h-6" />
                <div>
                  <div className="text-xs text-gray-300">Trainer</div>
                  <div className="text-sm font-medium">{featuredMasterclassSeries.instructor}</div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Series Content */}
          <div className="p-6 lg:p-8">
            {/* About the Series */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#172840] mb-4">About the Masterclass Series</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {featuredMasterclassSeries.instructorBio}
              </p>
            </div>
    
            {/* Why Attend */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#172840] mb-4">Why Attend?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {featuredMasterclassSeries.whyAttend.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-[#F25849]/5 rounded-lg">
                    <Icon icon="mdi:check-circle" className="text-[#F25849] w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
    
            {/* Who Should Attend */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#172840] mb-4">Who Should Attend</h3>
              <div className="flex flex-wrap gap-2">
                {featuredMasterclassSeries.whoShouldAttend.map((attendee, index) => (
                  <span key={index} className="bg-[#84C1D9] text-white px-4 py-2 rounded-full text-sm">
                    {attendee}
                  </span>
                ))}
              </div>
            </div>
    
            {/* The Three Masterclasses */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#172840] mb-6">The Three Masterclasses</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredMasterclassSeries.subMasterclasses.map((masterclass, index) => (
                  <div key={masterclass.id} className="bg-gray-50 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#F25849] transition-all duration-300">
                    <Link href={`/masterclasses/${masterclass.slug}`} className="block">
                      <div className="relative h-48">
                        <Image
                          src={masterclass.image}
                          fill
                          alt={masterclass.title}
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#F2B706] text-[#172840] px-3 py-1 rounded-full text-xs font-bold">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-xs text-gray-500 mb-2 font-medium">{masterclass.date}</div>
                        <h4 className="text-lg font-bold text-[#172840] mb-2 leading-tight">
                          {masterclass.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {masterclass.description}
                        </p>
                        <div className="flex items-center gap-2 text-[#F25849] font-semibold text-sm">
                          <span>Explore the {index === 0 ? 'Positioning' : index === 1 ? 'Pricing' : 'Procurement'} Masterclass</span>
                          <Icon icon="mdi:arrow-right" className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
