import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event / Webinar',
  type: 'document',
  groups: [
    { name: 'main', title: 'Details', default: true },
    { name: 'links', title: 'Links' },
    { name: 'after', title: 'After the event' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'main', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'main',
      description: 'Page URL: /events/<slug>. Changing it breaks existing links.',
      options: { source: 'title', maxLength: 96 }, validation: (r) => r.required(),
    }),
    defineField({
      name: 'date', title: 'Date', type: 'date', group: 'main', validation: (r) => r.required(),
      description: 'Events move from "Upcoming" to "Past" automatically after this date (East Africa time).',
    }),
    defineField({ name: 'time', title: 'Time', type: 'string', group: 'main', description: 'Shown as written, e.g. "12:00 PM EAT".' }),
    defineField({
      name: 'category', title: 'Category', type: 'string', group: 'main', initialValue: 'Webinar',
      options: { list: ['Webinar', 'Summit', 'Workshop', 'Seminar', 'Forum'] }, validation: (r) => r.required(),
    }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'main', initialValue: 'Virtual Event', description: 'Used for the Location filter, e.g. "Virtual Event" or "Nairobi, Kenya".' }),
    defineField({ name: 'venue', title: 'Venue / platform', type: 'string', group: 'main', initialValue: 'Zoom' }),
    defineField({ name: 'price', title: 'Price label', type: 'string', group: 'main', initialValue: 'Free', description: 'Shown on the card, e.g. "Free" or "Free for All Members".' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 6, group: 'main', validation: (r) => r.required() }),
    defineField({ name: 'image', title: 'Image', type: 'image', group: 'main', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }], validation: (r) => r.required() }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', group: 'main', initialValue: false }),

    defineField({
      name: 'registrationUrl', title: 'Registration link', type: 'string', group: 'links',
      description: 'Shown as "Register Now" while the event is upcoming. Full https:// link, or a site path such as /contact-us.',
      validation: (r) => r.regex(/^(https?:\/\/|\/)/, { name: 'link', invert: false }).warning('Should start with https:// or /'),
    }),
    defineField({ name: 'zoomPasscode', title: 'Zoom passcode (shown publicly on past events)', type: 'string', group: 'links' }),

    defineField({ name: 'recordingUrl', title: 'Recording link', type: 'url', group: 'after', description: 'YouTube / Zoom recording. Shown as "Watch" once the event is past.' }),
    defineField({ name: 'attendees', title: 'Attendees', type: 'number', group: 'after' }),
    defineField({ name: 'speakers', title: 'Speakers (names)', type: 'array', group: 'after', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({ name: 'speakerCount', title: 'Speaker count', type: 'number', group: 'after', description: 'Only needed if you do not list names above; otherwise the number of names is used.' }),
    defineField({ name: 'legacyId', title: 'Legacy ID', type: 'number', group: 'after', readOnly: true, description: 'Old numeric ID. Keeps old /events/<number> links redirecting.' }),
  ],
  orderings: [{ title: 'Date, newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'date', category: 'category', media: 'image' },
    prepare: ({ title, date, category, media }) => ({ title, media, subtitle: `${date ?? 'No date'} · ${category ?? ''}` }),
  },
})
