import { defineArrayMember, defineType } from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative Text' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    }),
    defineArrayMember({
      type: 'object',
      name: 'imageUrl',
      title: 'Image (external URL)',
      description: 'Image hosted on ImageKit or another CDN. Used by migrated posts.',
      fields: [
        { name: 'url', type: 'url', title: 'Image URL', validation: (Rule) => Rule.required() },
        { name: 'alt', type: 'string', title: 'Alternative Text' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
      preview: { select: { title: 'alt', subtitle: 'url' } },
    }),
    defineArrayMember({
      type: 'object',
      name: 'tableBlock',
      title: 'Table',
      fields: [
        {
          name: 'rows',
          type: 'array',
          title: 'Rows',
          of: [
            {
              type: 'object',
              name: 'tableRow',
              title: 'Row',
              fields: [
                {
                  name: 'cells',
                  type: 'array',
                  title: 'Cells',
                  of: [
                    {
                      type: 'object',
                      name: 'tableCell',
                      title: 'Cell',
                      fields: [
                        {
                          name: 'content',
                          type: 'array',
                          title: 'Content',
                          of: [
                            {
                              type: 'block',
                              styles: [{ title: 'Normal', value: 'normal' }],
                              lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
                              marks: {
                                decorators: [
                                  { title: 'Strong', value: 'strong' },
                                  { title: 'Emphasis', value: 'em' },
                                  { title: 'Underline', value: 'underline' },
                                ],
                                annotations: [
                                  { name: 'link', type: 'object', title: 'URL', fields: [{ name: 'href', type: 'url', title: 'URL' }] },
                                ],
                              },
                            },
                          ],
                        },
                      ],
                      preview: { select: { title: 'content.0.children.0.text' } },
                    },
                  ],
                },
              ],
              preview: { select: { title: 'cells.0.content.0.children.0.text' } },
            },
          ],
        },
      ],
      preview: {
        select: { rows: 'rows' },
        prepare: ({ rows }) => ({ title: 'Table', subtitle: `${rows?.length ?? 0} rows` }),
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'callout',
      title: 'Callout Box',
      fields: [
        {
          name: 'type',
          type: 'string',
          title: 'Type',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Success', value: 'success' },
              { title: 'Error', value: 'error' },
            ],
          },
          initialValue: 'info',
        },
        { name: 'text', type: 'text', title: 'Text' },
      ],
      preview: {
        select: { title: 'text', subtitle: 'type' },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'codeBlock',
      title: 'Code Block',
      fields: [
        {
          name: 'language',
          type: 'string',
          title: 'Language',
          options: {
            list: [
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'Python', value: 'python' },
              { title: 'Bash', value: 'bash' },
              { title: 'JSON', value: 'json' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
            ],
          },
          initialValue: 'javascript',
        },
        { name: 'code', type: 'text', title: 'Code' },
        { name: 'filename', type: 'string', title: 'Filename (optional)' },
      ],
      preview: {
        select: { title: 'filename', subtitle: 'language' },
      },
    }),
  ],
})
