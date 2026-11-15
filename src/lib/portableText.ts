import { toHTML } from '@portabletext/to-html'
import type { PortableTextBlock } from '@portabletext/types'

type Opts = { sanityImageUrl?: (value: any) => string }

const esc = (s: unknown) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const isInternal = (href: string) => /^(\/|https?:\/\/(www\.)?paan\.africa)/i.test(href)

/**
 * Portable Text -> HTML. Matches the markup of the legacy posts: every link opens in a new
 * tab, external links are rel="nofollow", internal links are followed.
 * Self-contained (no `@/` imports) so scripts can import it too.
 */
export function renderPortableText(blocks: PortableTextBlock[], opts: Opts = {}): string {
  const render = (b: PortableTextBlock[]): string => renderPortableText(b, opts)
  return toHTML(blocks, {
    components: {
      marks: {
        underline: ({ children }) => `<u>${children}</u>`,
        link: ({ children, value }) => {
          const href = String(value?.href ?? '')
          const rel = isInternal(href) ? 'noopener noreferrer' : 'noopener noreferrer nofollow'
          return `<a href="${esc(href)}" target="_blank" rel="${rel}">${children}</a>`
        },
      },
      types: {
        image: ({ value }) =>
          `<img class="max-w-full h-auto" src="${esc(opts.sanityImageUrl?.(value) ?? '')}" alt="${esc(value.alt)}" />`,
        imageUrl: ({ value }) =>
          `<img class="max-w-full h-auto" src="${esc(value.url)}" alt="${esc(value.alt)}" />`,
        tableBlock: ({ value }) => {
          const rows = (value.rows ?? [])
            .map(
              (r: any) =>
                `<tr>${(r.cells ?? [])
                  .map((c: any) => `<td>${render((c.content ?? []) as PortableTextBlock[])}</td>`)
                  .join('')}</tr>`
            )
            .join('')
          return `<table><tbody>${rows}</tbody></table>`
        },
        callout: ({ value }) => `<div class="callout callout-${esc(value.type)}">${esc(value.text)}</div>`,
        codeBlock: ({ value }) => `<pre><code>${esc(value.code)}</code></pre>`,
      },
    },
    onMissingComponent: false,
  })
}

