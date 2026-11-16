import { defineField, defineType } from 'sanity'

/** English is required-by-convention; French is optional and falls back to English on the site. */
export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized text (short)',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'fr', title: 'Français', type: 'string' }),
  ],
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized text (long)',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text', rows: 5 }),
    defineField({ name: 'fr', title: 'Français', type: 'text', rows: 5 }),
  ],
})
