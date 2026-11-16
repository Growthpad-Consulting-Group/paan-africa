"use client";

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import EventCard from '@/features/events/components/EventCard';
import { useAppTranslations } from '@/shared/hooks/useTranslations';
import type { EventItem } from '@/features/events/lib/eventService';

type Tab = 'all' | 'upcoming' | 'past';
type Props = { upcoming: EventItem[]; past: EventItem[] };

const EventsBrowser = ({ upcoming = [], past = [] }: Props) => {
  const { t } = useAppTranslations();
  const isText = (v: string | null): v is string => Boolean(v);
  const eventCategories = [...new Set([...upcoming, ...past].map((e) => e.category).filter(isText))];
  const eventLocations = [...new Set([...upcoming, ...past].map((e) => e.location).filter(isText))];
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [selectedCategory, setSelectedCategory] = useState(t('events.filters.allEvents'));
  const [selectedLocation, setSelectedLocation] = useState(t('events.filters.allLocations'));
  const [filteredEvents, setFilteredEvents] = useState<EventItem[]>([
    ...upcoming,
    ...past
  ]);

  useEffect(() => {
    let events: EventItem[];
    if (activeTab === 'upcoming') {
      events = upcoming;
    } else if (activeTab === 'past') {
      events = past;
    } else {
      events = [...upcoming, ...past];
    }
    
    if (selectedCategory !== t('events.filters.allEvents')) {
      events = events.filter(event => event.category === selectedCategory);
    }
    
    if (selectedLocation !== t('events.filters.allLocations')) {
      events = events.filter(event => event.location === selectedLocation);
    }
    
    setFilteredEvents(events);
  }, [activeTab, selectedCategory, selectedLocation, t]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSelectedCategory(t('events.filters.allEvents'));
    setSelectedLocation(t('events.filters.allLocations'));
  };

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-8 sm:mb-12 gap-6">
            <div className="flex flex-col sm:flex-row bg-white rounded-full p-1 sm:p-2 shadow-lg w-full sm:w-auto">
              <button
                onClick={() => handleTabChange('all')}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'all'
                    ? 'bg-paan-red text-white shadow-md'
                    : 'text-gray-600 hover:text-paan-red'
                }`}
              >
                <Icon icon="mdi:calendar-month" className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
                <span className="hidden xs:inline">{t('events.tabs.allEvents')}</span>
                <span className="xs:hidden">All</span>
              </button>
              <button
                onClick={() => handleTabChange('upcoming')}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'upcoming'
                    ? 'bg-paan-red text-white shadow-md'
                    : 'text-gray-600 hover:text-paan-red'
                }`}
              >
                <Icon icon="mdi:calendar-clock" className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
                <span className="hidden xs:inline">{t('events.tabs.upcomingEvents')}</span>
                <span className="xs:hidden">Upcoming</span>
              </button>
              <button
                onClick={() => handleTabChange('past')}
                className={`px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                  activeTab === 'past'
                    ? 'bg-paan-red text-white shadow-md'
                    : 'text-gray-600 hover:text-paan-red'
                }`}
              >
                <Icon icon="mdi:calendar-check" className="w-4 h-4 sm:w-5 sm:h-5 inline mr-1 sm:mr-2" />
                <span className="hidden xs:inline">{t('events.tabs.pastEvents')}</span>
                <span className="xs:hidden">Past</span>
              </button>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent filter-transition text-sm sm:text-base w-full sm:w-auto"
              >
                <option value="All Events">{t('events.filters.allEvents')}</option>
                {eventCategories.filter(category => category !== 'All Events').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-paan-red focus:border-transparent filter-transition text-sm sm:text-base w-full sm:w-auto"
              >
                <option value="All Locations">{t('events.filters.allLocations')}</option>
                {eventLocations.filter(location => location !== 'All Locations').map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isPast={activeTab === 'past' ? true : activeTab === 'upcoming' ? false : event.status === 'past'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <Icon icon="mdi:calendar-remove" className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
                {t('events.noEventsFound.title')}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 px-4">
                {t('events.noEventsFound.description')}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EventsBrowser;
