/**
 * Strips nofollow from internal paan.africa links so crawlers can follow them.
 * Normalizes http://paan.africa URLs to https.
 */
export function sanitizeBlogHtml<T extends string | null | undefined>(html: T): T {
  if (!html || typeof html !== 'string') return html;

  let result: string = html.replace(/http:\/\/paan\.africa/gi, 'https://paan.africa');

  result = result.replace(
    /<a\b([^>]*?\bhref=["']https?:\/\/(?:www\.)?paan\.africa[^"']*["'][^>]*)>/gi,
    (_: string, attrs: string) => {
      const cleanedAttrs = attrs.replace(
        /\srel=["']([^"']*)["']/i,
        (_rel: string, relValue: string) => {
          const tokens = relValue
            .split(/\s+/)
            .filter((token: string) => token && token.toLowerCase() !== 'nofollow');
          return tokens.length ? ` rel="${tokens.join(' ')}"` : '';
        }
      );
      return `<a${cleanedAttrs}>`;
    }
  );

  return result as T;
}
