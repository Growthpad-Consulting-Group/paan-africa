/** Splits article HTML at a paragraph boundary near the middle, so a call-to-action can be placed between the halves. */
export function splitAtMidpoint(html: string | null | undefined): { before: string; after: string } {
  if (!html) return { before: '', after: '' };
  const parts = html.split(/(?=<p[\s>])/i);
  const midIndex = Math.floor(parts.length / 2);
  return { before: parts.slice(0, midIndex).join(''), after: parts.slice(midIndex).join('') };
}
