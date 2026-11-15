import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'exhibitorBooth',
  title: 'Exhibition Booth',
  type: 'document',
  fields: [
    defineField({
      name: 'number', title: 'Booth number', type: 'number', validation: (r) => r.required().integer().positive(),
      description: 'Matches the number on the floor plan.',
    }),
    defineField({
      name: 'status', title: 'Status', type: 'string', initialValue: 'Available', validation: (r) => r.required(),
      options: { list: ['Available', 'Reserved', 'Booked'], layout: 'radio' },
    }),
    defineField({ name: 'type', title: 'Type', type: 'string', initialValue: 'Standard', options: { list: ['Standard', 'Pavilion'] }, validation: (r) => r.required() }),
    defineField({ name: 'size', title: 'Size', type: 'string', description: 'e.g. "3×3", "3×6" or "Pavilion"' }),
    defineField({ name: 'price', title: 'Price (shown as written)', type: 'string', description: 'e.g. "USD 1,000" or "RFQ" (request for quote)' }),
    defineField({ name: 'edition', title: 'Summit edition (year)', type: 'number', initialValue: 2026, validation: (r) => r.required().integer() }),
  ],
  orderings: [{ title: 'Booth number', name: 'number', by: [{ field: 'number', direction: 'asc' }] }],
  preview: { select: { number: 'number', status: 'status', size: 'size', type: 'type' }, prepare: ({ number, status, size, type }) => ({ title: `Booth ${number}`, subtitle: `${status} · ${type} · ${size}` }) },
})
