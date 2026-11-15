import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'agency',
  title: 'Certified Agency',
  type: 'document',
  groups: [
    { name: 'basics', title: 'Basics', default: true },
    { name: 'about', title: 'About & Video' },
    { name: 'proof', title: 'Clients & Testimonial' },
    { name: 'social', title: 'Contact & Social' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // ── Basics ────────────────────────────────────────────────────────────
    defineField({ name: 'name', title: 'Agency name', type: 'string', group: 'basics', validation: (r) => r.required() }),
    defineField({
      name: 'slug', title: 'Slug', type: 'slug', group: 'basics',
      description: 'Used in the page URL: /certified-agencies/<slug>. Changing it breaks existing links.',
      options: { source: 'name', maxLength: 64 }, validation: (r) => r.required(),
    }),
    defineField({
      name: 'hasProfilePage', title: 'Has profile page', type: 'boolean', group: 'basics', initialValue: true,
      description: 'Off = logo only (shown in the homepage logo strip, no page).',
    }),
    defineField({ name: 'order', title: 'Display order', type: 'number', group: 'basics', description: 'Lower numbers appear first in logo strips.' }),
    defineField({
      name: 'logo', title: 'Logo', type: 'image', group: 'basics', validation: (r) => r.required(),
      options: { hotspot: false }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({
      name: 'marqueeLogo', title: 'Logo for homepage strip', type: 'image', group: 'basics',
      description: 'Optional. If empty, the main logo is used.', options: { hotspot: false },
    }),
    defineField({ name: 'websiteUrl', title: 'Website', type: 'url', group: 'basics' }),
    defineField({
      name: 'membershipLevel', title: 'Membership level', type: 'string', group: 'basics', initialValue: 'associate',
      options: { list: [{ title: 'Associate Member', value: 'associate' }, { title: 'Full Member', value: 'full' }, { title: 'Gold Member', value: 'gold' }], layout: 'radio' },
      validation: (r) => r.custom((v, ctx) => (ctx.document?.hasProfilePage !== false && !v ? 'Required for agencies with a profile page' : true)),
    }),
    defineField({ name: 'memberSince', title: 'Member since (year)', type: 'number', group: 'basics', validation: (r) => r.integer().min(2000).max(2100) }),
    defineField({
      name: 'countries', title: 'Countries of operation', type: 'array', group: 'basics',
      of: [defineArrayMember({
        type: 'object', name: 'country',
        fields: [
          { name: 'name', type: 'localizedString', title: 'Name' },
          { name: 'code', type: 'string', title: 'ISO code (2 letters)', description: 'e.g. ke, ng, za — used for the flag', validation: (r) => r.required().length(2).lowercase() },
        ],
        preview: { select: { title: 'name.en', subtitle: 'code' } },
      })],
    }),

    // ── About & video ─────────────────────────────────────────────────────
    defineField({ name: 'aboutTitle', title: 'About heading', type: 'localizedString', group: 'about', description: 'Defaults to "About <name>" if empty.' }),
    defineField({ name: 'aboutDescription', title: 'About text', type: 'localizedText', group: 'about', description: 'Separate paragraphs with a blank line.' }),
    defineField({ name: 'specializations', title: 'Areas of specialization', type: 'array', group: 'about', of: [{ type: 'localizedString' }] }),
    defineField({
      name: 'videoUrl', title: 'Video URL', type: 'url', group: 'about',
      description: 'YouTube embed URL (https://www.youtube.com/embed/…) or a direct .mp4/.webm link. Leave empty if uploading a file below.',
      validation: (r) => r.uri({ scheme: ['https'], allowRelative: false }),
    }),
    defineField({ name: 'videoFile', title: 'Video file', type: 'file', group: 'about', options: { accept: 'video/*' } }),

    // ── Clients & testimonial ─────────────────────────────────────────────
    defineField({ name: 'clientsTitle', title: 'Clients heading', type: 'localizedString', group: 'proof', description: 'Defaults to "Clients <name> Have Worked With".' }),
    defineField({
      name: 'clientLogos', title: 'Client logos', type: 'array', group: 'proof',
      of: [defineArrayMember({ type: 'image', options: { hotspot: false }, fields: [{ name: 'alt', type: 'string', title: 'Client name' }] })],
      options: { layout: 'grid' },
    }),
    defineField({ name: 'testimonialQuote', title: 'Testimonial', type: 'localizedText', group: 'proof' }),
    defineField({ name: 'testimonialName', title: 'Testimonial author', type: 'string', group: 'proof' }),
    defineField({ name: 'testimonialRole', title: 'Author title / company', type: 'string', group: 'proof' }),

    // ── Contact & social ──────────────────────────────────────────────────
    defineField({ name: 'contactDescription', title: 'Contact form intro', type: 'localizedString', group: 'social', description: 'Shown under "Contact <name>" in the enquiry form.' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn', type: 'url', group: 'social' }),
    defineField({ name: 'instagramUrl', title: 'Instagram', type: 'url', group: 'social' }),
    defineField({ name: 'facebookUrl', title: 'Facebook', type: 'url', group: 'social' }),
    defineField({ name: 'xUrl', title: 'X (Twitter)', type: 'url', group: 'social' }),

    // ── SEO ───────────────────────────────────────────────────────────────
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'localizedString', group: 'seo' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'localizedText', group: 'seo' }),
    defineField({ name: 'seoKeywords', title: 'SEO keywords', type: 'localizedString', group: 'seo' }),
  ],
  orderings: [{ title: 'Display order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', level: 'membershipLevel', media: 'logo', hasPage: 'hasProfilePage' },
    prepare: ({ title, level, media, hasPage }) => ({
      title, media, subtitle: `${{ associate: 'Associate', full: 'Full', gold: 'Gold' }[level as string] ?? level}${hasPage === false ? ' · logo only' : ''}`,
    }),
  },
})
