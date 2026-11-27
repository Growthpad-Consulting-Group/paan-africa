import type { ImageLoaderProps } from 'next/image';

/**
 * Global next/image loader. ImageKit and Sanity are already image CDNs, so we
 * ask them to resize/compress instead of paying Vercel to re-optimize. Their
 * output is served straight from their own CDN. Everything else (local files,
 * flagcdn, etc.) still goes through Vercel's /_next/image.
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ?? 75;

  if (/^https:\/\/ik\.imagekit\.io\//.test(src)) {
    const url = new URL(src);
    url.searchParams.set('tr', `w-${width},q-${q},f-auto`);
    return url.toString();
  }

  if (/^https:\/\/cdn\.sanity\.io\//.test(src)) {
    const url = new URL(src);
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(q));
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'max');
    return url.toString();
  }

  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`;
}
