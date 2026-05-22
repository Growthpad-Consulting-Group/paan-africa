/**
 * Strips nofollow from internal paan.africa links so crawlers can follow them.
 * Normalizes http://paan.africa URLs to https.
 */
export function sanitizeBlogHtml(html) {
  if (!html || typeof html !== 'string') return html;

  let result = html.replace(/http:\/\/paan\.africa/gi, 'https://paan.africa');

  result = result.replace(
    /<a\b([^>]*?\bhref=["']https?:\/\/(?:www\.)?paan\.africa[^"']*["'][^>]*)>/gi,
    (_, attrs) => {
      const cleanedAttrs = attrs.replace(
        /\srel=["']([^"']*)["']/i,
        (relMatch, relValue) => {
          const tokens = relValue
            .split(/\s+/)
            .filter((token) => token && token.toLowerCase() !== 'nofollow');
          return tokens.length ? ` rel="${tokens.join(' ')}"` : '';
        }
      );
      return `<a${cleanedAttrs}>`;
    }
  );

  return result;
}
