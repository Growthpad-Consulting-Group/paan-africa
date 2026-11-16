import { defineArrayMember, defineField, defineType } from 'sanity'

const stringList = (name: string, title: string, group: string) =>
  defineField({ name, title, type: 'array', group, of: [defineArrayMember({ type: 'string' })] })

export default defineType({
  name: 'masterclass',
  title: 'Masterclass',
  type: 'document',
  groups: [
    { name: 'main', title: 'Details', default: true },
    { name: 'pricing', title: 'Pricing' },
    { name: 'instructor', title: 'Instructor' },
    { name: 'content', title: 'Content' },
    { name: 'series', title: 'Series' },
  ],
  fields: [
    defineField({
      name: 'masterclassId', title: 'Masterclass ID (do not change)', type: 'number', group: 'main',
      description: 'Permanent numeric ID. It is part of the payment reference and is what promo codes are tied to (applicable_masterclass_ids). Use the next unused number for a new masterclass and never change it afterwards.',
      validation: (r) =>
        r.required().integer().positive().custom(async (value, ctx) => {
          if (!value) return true
          const id = (ctx.document?._id ?? '').replace(/^drafts\./, '')
          const n = await ctx.getClient({ apiVersion: '2025-01-01' }).fetch<number>(
            'count(*[_type == "masterclass" && masterclassId == $v && !(_id in [$id, "drafts." + $id])])', { v: value, id })
          return n === 0 ? true : `ID ${value} is already used by another masterclass`
        }),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'main', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'main',
      description: 'Page URL: /masterclasses/<slug>. Changing it breaks existing links.',
      options: { source: 'title', maxLength: 96 }, validation: (r) => r.required(),
    }),
    defineField({
      name: 'date', title: 'Date', type: 'date', group: 'main', validation: (r) => r.required(),
      description: 'Badge changes from UPCOMING to COMPLETED automatically after this date (East Africa time).',
    }),
    defineField({ name: 'time', title: 'Time', type: 'string', group: 'main', description: 'Shown as written, e.g. "12 PM EAT".' }),
    defineField({ name: 'bookingsClosed', title: 'Not accepting bookings', type: 'boolean', group: 'main', initialValue: false, description: 'Shows the "NOT ACCEPTING BOOKINGS" badge.' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', group: 'main', initialValue: false }),
    defineField({ name: 'hideFromListing', title: 'Hide from the Masterclasses page', type: 'boolean', group: 'main', initialValue: false, description: 'The page itself still works by direct link; it just is not listed on /masterclasses.' }),
    defineField({ name: 'format', title: 'Format', type: 'string', group: 'main', description: 'e.g. "90-minute Interactive Training Course"' }),
    defineField({
      name: 'category', title: 'Category', type: 'string', group: 'main', validation: (r) => r.required(),
      options: { list: ['Business Development', 'Client Management', 'Account Management', 'Financial Management', 'Leadership', 'Creative Strategy', 'Digital Marketing'] },
    }),
    defineField({ name: 'level', title: 'Level', type: 'string', group: 'main', options: { list: ['All Levels', 'Junior to Mid-Level', 'Intermediate', 'Mid-Level to Senior'] } }),
    defineField({ name: 'image', title: 'Image', type: 'image', group: 'main', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }], validation: (r) => r.required() }),
    defineField({ name: 'partnership', title: 'Partnership line', type: 'string', group: 'main' }),

    defineField({ name: 'currency', title: 'Currency', type: 'string', group: 'pricing', initialValue: 'USD', options: { list: ['USD'] }, validation: (r) => r.required() }),
    defineField({ name: 'memberPrice', title: 'Member price', type: 'number', group: 'pricing', validation: (r) => r.required().min(0) }),
    defineField({ name: 'memberOriginalPrice', title: 'Member original price (struck through)', type: 'number', group: 'pricing' }),
    defineField({ name: 'nonMemberPrice', title: 'Non-member price', type: 'number', group: 'pricing', validation: (r) => r.required().min(0) }),
    defineField({ name: 'nonMemberOriginalPrice', title: 'Non-member original price (struck through)', type: 'number', group: 'pricing' }),

    defineField({
      name: 'instructor', title: 'Instructor', type: 'object', group: 'instructor',
      fields: [
        { name: 'name', type: 'string', title: 'Name', validation: (r: any) => r.required() },
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'image', type: 'image', title: 'Photo', options: { hotspot: true } },
        { name: 'bio', type: 'text', title: 'Bio', rows: 5 },
        { name: 'expertise', type: 'array', title: 'Expertise', of: [{ type: 'string' }] },
      ],
    }),

    defineField({ name: 'listingDescription', title: 'Short description (cards)', type: 'text', rows: 3, group: 'content', description: 'Optional. Used on the Masterclasses page cards; falls back to the description below.' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4, group: 'content', validation: (r) => r.required() }),
    defineField({ name: 'fullDescription', title: 'Full description', type: 'text', rows: 8, group: 'content' }),
    stringList('benefits', 'Member benefits', 'content'),
    stringList('whoShouldAttend', 'Who should attend', 'content'),
    stringList('learningOutcomes', 'Learning outcomes', 'content'),
    stringList('courseObjectives', 'Course objectives', 'content'),
    stringList('whyAttend', 'Why attend', 'content'),
    defineField({ name: 'outcome', title: 'Outcome', type: 'text', rows: 3, group: 'content' }),

    defineField({ name: 'series', title: 'Series', type: 'reference', to: [{ type: 'masterclassSeries' }], group: 'series' }),
    defineField({ name: 'seriesDescription', title: 'Description in the series block', type: 'text', rows: 3, group: 'series', description: 'Optional. Text shown for this session inside the featured series block; falls back to the short/normal description.' }),
    defineField({ name: 'seriesOrder', title: 'Order in series', type: 'number', group: 'series' }),
    defineField({ name: 'moduleNumber', title: 'Module number', type: 'number', group: 'series' }),
    defineField({ name: 'takeawayToolkit', title: 'Takeaway toolkit', type: 'string', group: 'series' }),
  ],
  orderings: [{ title: 'Date, newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', date: 'date', id: 'masterclassId', media: 'image' },
    prepare: ({ title, date, id, media }) => ({ title, media, subtitle: `#${id} · ${date ?? 'No date'}` }),
  },
})
