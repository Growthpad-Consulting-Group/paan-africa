import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'summitSpeaker',
  title: 'Summit Speaker',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Title / company', type: 'string', description: 'e.g. "Founder & CEO, Fabella, The Gambia"' }),
    defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', description: 'Lower numbers first.' }),
    defineField({ name: 'edition', title: 'Summit edition (year)', type: 'number', initialValue: 2026, validation: (r) => r.required().integer() }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', subtitle: 'title', media: 'image' } },
})
