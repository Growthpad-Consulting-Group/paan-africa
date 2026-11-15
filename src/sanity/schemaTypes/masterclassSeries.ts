import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterclassSeries',
  title: 'Masterclass Series',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 80 }, validation: (r) => r.required() }),
    defineField({
      name: 'featuredOnListing', title: 'Feature on the Masterclasses page', type: 'boolean', initialValue: false,
      description: 'Shows this series as the highlighted block on /masterclasses. Only one series should be featured.',
    }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5 }),
    defineField({ name: 'dates', title: 'Dates (display text)', type: 'array', of: [{ type: 'string' }], description: 'e.g. "February 11th". Shown as written.' }),
    defineField({ name: 'time', title: 'Time', type: 'string' }),
    defineField({ name: 'format', title: 'Format', type: 'string' }),
    defineField({ name: 'instructorName', title: 'Instructor', type: 'string' }),
    defineField({ name: 'instructorTitle', title: 'Instructor title', type: 'string' }),
    defineField({ name: 'instructorBio', title: 'Instructor bio', type: 'text', rows: 4 }),
    defineField({ name: 'whyAttend', title: 'Why attend', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'whoShouldAttend', title: 'Who should attend', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] }),
  ],
  preview: { select: { title: 'title', subtitle: 'subtitle', media: 'image' } },
})
