import { renderPortableText } from '@/lib/portableText'
import type { PortableTextBlock } from '@portabletext/types'
import { sanityFetch } from '@/sanity/client'
import { urlFor } from '@/sanity/image'
import { calculateReadTime } from '@/utils/readTime'
import { sanitizeBlogHtml } from '@/utils/sanitizeBlogHtml'

const FALLBACK_IMAGE = '/assets/images/opengraph.png'

type RawPost = {
  _id: string
  legacyId?: number | null
  title: string
  slug: string
  excerpt?: string | null
  mainImageUrl?: string | null
  mainImage?: { asset?: { _ref: string } } | null
  body?: PortableTextBlock[] | null
  rawHtml?: string | null
  publishedAt: string
  _updatedAt: string
  isFeatured?: boolean
  author?: string | null
  category?: string | null
  tags?: string[] | null
  metaTitle?: string | null
  metaDescription?: string | null
  metaKeywords?: string | null
  focusKeyword?: string | null
  noIndex?: boolean
}

export type BlogListItem = {
  id: number | null
  sanityId: string
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  author: string
  readTime: string
  featured: boolean
  category: string
  tags: string[]
  created_at: string
  updated_at: string
}

export type BlogPost = BlogListItem & {
  article_name: string
  article_body: string
  article_image: string
  article_category: string
  article_tags: string[]
  read_time: string
  meta_title: string
  meta_description: string
  meta_keywords: string
  focus_keyword: string
  noIndex: boolean
}

const POST_FIELDS = `
  _id, legacyId, title, "slug": slug.current, excerpt, mainImageUrl, mainImage,
  body, rawHtml, publishedAt, _updatedAt, isFeatured, noIndex,
  "author": author->name,
  "category": categories[0]->name,
  tags, metaTitle, metaDescription, metaKeywords, focusKeyword
`
const PUBLISHED = `_type == "post" && isPublished == true && defined(slug.current)`

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

/** Legacy posts keep their HTML (tables, inline images); new posts use Portable Text. */
function bodyHtml(p: RawPost): string {
  if (p.body && p.body.length > 0) {
    return sanitizeBlogHtml(
      renderPortableText(p.body, { sanityImageUrl: (v) => urlFor(v).width(1200).auto('format').url() })
    )
  }
  return sanitizeBlogHtml(p.rawHtml ?? '')
}

function image(p: RawPost): string {
  if (p.mainImage?.asset) return urlFor(p.mainImage).width(1600).auto('format').url()
  if (p.mainImageUrl) return p.mainImageUrl
  return FALLBACK_IMAGE
}

function toListItem(p: RawPost, html: string): BlogListItem {
  const text = stripHtml(html)
  return {
    id: p.legacyId ?? null,
    sanityId: p._id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || (text.length > 150 ? `${text.slice(0, 150)}...` : text) || 'No content available',
    image: image(p),
    date: formatDate(p.publishedAt),
    author: p.author || 'PAAN Team',
    readTime: calculateReadTime(html),
    featured: !!p.isFeatured,
    category: p.category || 'Uncategorized',
    tags: p.tags ?? [],
    created_at: p.publishedAt,
    updated_at: p._updatedAt,
  }
}

export async function getAllPosts(): Promise<BlogListItem[]> {
  const posts = await sanityFetch<RawPost[]>(
    `*[${PUBLISHED}] | order(publishedAt desc) {${POST_FIELDS}}`
  )
  return posts.map((p) => toListItem(p, bodyHtml(p)))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const p = await sanityFetch<RawPost | null>(`*[${PUBLISHED} && slug.current == $slug][0] {${POST_FIELDS}}`, { slug })
  if (!p) return null
  const html = bodyHtml(p)
  const item = toListItem(p, html)
  return {
    ...item,
    article_name: p.title,
    article_body: html,
    article_image: item.image,
    article_category: item.category,
    article_tags: item.tags,
    read_time: item.readTime,
    meta_title: p.metaTitle || p.title,
    meta_description: p.metaDescription || '',
    meta_keywords: p.metaKeywords || '',
    focus_keyword: p.focusKeyword || '',
    noIndex: !!p.noIndex,
  }
}

export async function getAllSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(`*[${PUBLISHED}].slug.current`)
}

export async function getRelatedPosts(post: Pick<BlogPost, 'sanityId' | 'category' | 'tags'>, limit = 3): Promise<BlogListItem[]> {
  const posts = await sanityFetch<RawPost[]>(
    `*[${PUBLISHED} && _id != $id] | order(
        (categories[0]->name == $category) desc, count(tags[@ in $tags]) desc, publishedAt desc
      )[0...$limit] {${POST_FIELDS}}`,
    { id: post.sanityId, category: post.category, tags: post.tags, limit }
  )
  return posts.map((p) => toListItem(p, bodyHtml(p)))
}

export async function getBlogSitemapEntries(): Promise<{ slug: string; updatedAt: string }[]> {
  return sanityFetch(`*[${PUBLISHED} && noIndex != true]{ "slug": slug.current, "updatedAt": _updatedAt }`)
}
