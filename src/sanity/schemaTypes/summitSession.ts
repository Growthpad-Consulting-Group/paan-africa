import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'summitSession',
  title: 'Summit Experience / Session',
  type: 'document',
  description: 'The "Beyond the sessions" activities (Creator Crawl, City Excursions…).',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'icon', title: 'Icon', type: 'string', description: 'Iconify name, e.g. "mdi:handshake" (browse icons at icon-sets.iconify.design)' }),
    defineField({ name: 'category', title: 'Category', type: 'string', description: 'e.g. Networking, Experience' }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'edition', title: 'Summit edition (year)', type: 'number', initialValue: 2026, validation: (r) => r.required().integer() }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
})
