import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'summitExperience',
  title: 'Travel Experience (bookable)',
  type: 'document',
  fields: [
    defineField({
      name: 'experienceId', title: 'Experience ID (do not change)', type: 'string',
      description: 'Permanent id. It is the page URL (/summit/travel-guide/experiences/<id>) AND part of the payment reference and the booking record in Supabase. Lowercase letters and hyphens only; never change it after launch.',
      validation: (r) =>
        r.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { name: 'lowercase-with-hyphens' }).custom(async (value, ctx) => {
          if (!value) return true
          const id = (ctx.document?._id ?? '').replace(/^drafts\./, '')
          const n = await ctx.getClient({ apiVersion: '2025-01-01' }).fetch<number>(
            'count(*[_type == "summitExperience" && experienceId == $v && !(_id in [$id, "drafts." + $id])])', { v: value, id })
          return n === 0 ? true : `"${value}" is already used by another experience`
        }),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'category', title: 'Category', type: 'string', initialValue: 'Nairobi Tours' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', description: 'e.g. "Full Day (8:00 AM - 3:30 PM)"' }),
    defineField({ name: 'availability', title: 'Availability', type: 'string' }),
    defineField({ name: 'price', title: 'Price per person', type: 'number', validation: (r) => r.required().min(0) }),
    defineField({ name: 'priceUnit', title: 'Currency', type: 'string', initialValue: 'USD', options: { list: ['USD'] }, validation: (r) => r.required() }),
    defineField({ name: 'priceNote', title: 'Price note', type: 'string', description: 'e.g. "Per Person (Minimum 2 pax)"' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: 'order', title: 'Display order', type: 'number' }),
    defineField({ name: 'edition', title: 'Summit edition (year)', type: 'number', initialValue: 2026, validation: (r) => r.required().integer() }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title', price: 'price', media: 'image' }, prepare: ({ title, price, media }) => ({ title, media, subtitle: price != null ? `USD ${price} per person` : '' }) },
})
