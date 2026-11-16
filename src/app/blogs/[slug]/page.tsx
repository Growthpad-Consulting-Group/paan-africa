import { cache } from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/features/blog/lib/blogService';
import { formatBlogSeoTitle } from '@/features/blog/lib/formatSeoTitle';
import BlogPostView from '@/features/blog/components/BlogPostView';

// ISR: pages are built on first request, then refreshed hourly and by the Sanity webhook (/api/revalidate).
export const revalidate = 3600;
export const dynamicParams = true;

const FALLBACK_IMAGE = 'https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296';

const loadPost = cache(getPostBySlug);

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await loadPost(slug);
  if (!blog) return { title: 'Blog Post Not Found | PAAN Blog', robots: 'noindex' };

  const description =
    blog.meta_description ||
    (blog.article_body
      ? blog.article_body.replace(/<[^>]*>/g, '').substring(0, 160) + '...'
      : "Read the latest insights and trends from Africa's creative and tech landscape on the PAAN blog.");
  const keywords =
    blog.meta_keywords ||
    (blog.article_tags
      ? blog.article_tags.join(', ') + ', PAAN blog, African tech insights, creative industry Africa'
      : 'PAAN blog, African tech insights, creative industry Africa, tech trends Africa');
  const meta = buildMetadata({
    path: `/blogs/${slug}`,
    title: formatBlogSeoTitle(blog, slug),
    description,
    keywords,
    image: blog.article_image || FALLBACK_IMAGE,
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: 'article' } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await loadPost(slug);
  if (!blog) notFound();
  const relatedPosts = await getRelatedPosts(blog);
  return <BlogPostView blog={blog} relatedPosts={relatedPosts} />;
}
