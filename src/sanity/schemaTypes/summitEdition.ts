import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'summitEdition',
  title: 'Summit Edition (dates & venue)',
  type: 'document',
  description: 'One document per year. The dates and venue shown across the summit pages, the countdown and the search-engine event data all come from here.',
  fields: [
    defineField({ name: 'year', title: 'Year', type: 'number', validation: (r) => r.required().integer(), initialValue: 2026 }),
    defineField({ name: 'startDate', title: 'Starts', type: 'datetime', description: 'Used for the countdown and event data. Time zone matters: set East Africa time.', validation: (r) => r.required() }),
    defineField({ name: 'endDate', title: 'Ends', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'displayDates', title: 'Dates as shown on the page', type: 'string', description: 'e.g. "28 - 29 October 2026"', validation: (r) => r.required() }),
    defineField({ name: 'venueName', title: 'Venue name', type: 'string', description: 'Use "TBC" until announced.' }),
    defineField({ name: 'streetAddress', title: 'Street address', type: 'string' }),
    defineField({ name: 'city', title: 'City', type: 'string', initialValue: 'Nairobi' }),
    defineField({ name: 'region', title: 'Region / county', type: 'string' }),
    defineField({ name: 'postalCode', title: 'Postal code', type: 'string' }),
    defineField({ name: 'country', title: 'Country code', type: 'string', description: '2 letters, e.g. KE', validation: (r) => r.length(2).uppercase() }),
    defineField({ name: 'latitude', title: 'Latitude', type: 'string' }),
    defineField({ name: 'longitude', title: 'Longitude', type: 'string' }),
    defineField({ name: 'inPersonLabel', title: 'In-person attendance label', type: 'string', description: 'e.g. "500+ In Person"' }),
    defineField({ name: 'streamingLabel', title: 'Streaming attendance label', type: 'string', description: 'e.g. "2,000+ Streaming"' }),
  ],
  preview: { select: { year: 'year', dates: 'displayDates', venue: 'venueName' }, prepare: ({ year, dates, venue }) => ({ title: `PAAN Summit ${year}`, subtitle: `${dates ?? ''} · ${venue ?? ''}` }) },
})
