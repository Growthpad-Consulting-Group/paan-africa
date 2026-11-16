import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  groups: [
    { name: 'main', title: 'Details', default: true },
    { name: 'content', title: 'Description' },
    { name: 'apply', title: 'How to apply' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Job title', type: 'string', group: 'main', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'main',
      description: 'Also the value sent with the application form (e.g. "commercial-manager"). Keep stable once the role is live.',
      options: { source: 'title', maxLength: 80 }, validation: (r) => r.required(),
    }),
    defineField({
      name: 'isOpen', title: 'Show on the Careers page', type: 'boolean', group: 'main', initialValue: true,
      description: 'Turn off to hide the role (e.g. once it is filled) without deleting it.',
    }),
    defineField({
      name: 'closingDate', title: 'Closing date', type: 'date', group: 'main',
      description: 'Optional. The role is hidden automatically after this date.',
    }),
    defineField({ name: 'department', title: 'Department', type: 'string', group: 'main' }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'main', description: 'e.g. "Accra, Ghana (Pan-African/International Scope)"' }),
    defineField({
      name: 'employmentType', title: 'Employment type', type: 'string', group: 'main', initialValue: 'Full-time',
      options: { list: ['Full-time', 'Part-time', 'Internship', 'Contract'] }, validation: (r) => r.required(),
    }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', group: 'main', description: 'Optional, e.g. "6 months (with possibility of extension)".' }),
    defineField({ name: 'order', title: 'Display order', type: 'number', group: 'main', description: 'Lower numbers first.' }),

    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 3, group: 'content', description: 'Shown on the card.', validation: (r) => r.required() }),
    defineField({ name: 'requirements', title: 'Key requirements', type: 'array', group: 'content', of: [{ type: 'string' }] }),
    defineField({ name: 'details', title: 'Full description', type: 'blockContent', group: 'content', description: 'Shown when a visitor clicks "Read More About This Role".' }),

    defineField({
      name: 'applyByEmail', title: 'Also show a "send your CV by email" box', type: 'boolean', group: 'apply', initialValue: false,
    }),
    defineField({ name: 'applyEmail', title: 'Application email', type: 'string', group: 'apply', initialValue: 'careers@paan.africa', hidden: ({ document }) => !document?.applyByEmail }),
    defineField({ name: 'applyEmailSubject', title: 'Email subject', type: 'string', group: 'apply', description: 'Defaults to "<job title> – PAAN".', hidden: ({ document }) => !document?.applyByEmail }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', location: 'location', open: 'isOpen' },
    prepare: ({ title, location, open }) => ({ title, subtitle: `${location ?? ''}${open === false ? ' · hidden' : ''}` }),
  },
})
