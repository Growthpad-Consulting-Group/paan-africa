import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'awardGroup',
  title: 'Award Category Group',
  type: 'document',
  fields: [
    defineField({
      name: 'audience', title: 'For', type: 'string', initialValue: 'agency', validation: (r) => r.required(),
      options: { list: [{ title: 'Agencies', value: 'agency' }, { title: 'Freelancers', value: 'freelancer' }], layout: 'radio' },
    }),
    defineField({ name: 'groupId', title: 'Group ID', type: 'string', description: 'Stable id used in the page, e.g. "campaign-excellence". Do not change once live.', validation: (r) => r.required() }),
    defineField({ name: 'name', title: 'Group name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Group description', type: 'text', rows: 3 }),
    defineField({
      name: 'awards', title: 'Awards in this group', type: 'array',
      of: [defineArrayMember({
        type: 'object', name: 'award',
        fields: [
          { name: 'awardId', type: 'string', title: 'Award ID', description: 'Stable id, e.g. "pr-campaign-year"', validation: (r: any) => r.required() },
          { name: 'name', type: 'string', title: 'Name', validation: (r: any) => r.required() },
          { name: 'description', type: 'text', title: 'Description', rows: 3 },
          { name: 'icon', type: 'url', title: 'Icon URL', description: 'Freelancer awards show an icon' },
          { name: 'featured', type: 'boolean', title: 'Show on the main awards page', description: 'The main page shows a selection; the full list lives on the categories page.' },
        ],
        preview: { select: { title: 'name', subtitle: 'description', featured: 'featured' }, prepare: ({ title, subtitle, featured }: any) => ({ title: `${featured ? '★ ' : ''}${title}`, subtitle }) },
      })],
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'edition', title: 'Edition (year)', type: 'number', initialValue: 2026, validation: (r) => r.required().integer() }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'name', audience: 'audience', awards: 'awards' }, prepare: ({ title, audience, awards }) => ({ title, subtitle: `${audience} · ${awards?.length ?? 0} awards` }) },
})
