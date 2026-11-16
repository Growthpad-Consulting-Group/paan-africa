import { getBlogSitemapEntries } from '@/features/blog/lib/blogService'

// Refreshed hourly and by the Sanity webhook (/api/revalidate).
export const revalidate = 3600

const BASE_URL = 'https://paan.africa'

function generateBlogSitemap(blogs: { slug: string; updatedAt: string }[]) {
  const urls = blogs
    .map(
      (blog) => `
  <url>
    <loc>${BASE_URL}/blogs/${blog.slug}</loc>
    <lastmod>${new Date(blog.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">${urls}
</urlset>`
}

export async function GET() {
  try {
    const blogs = await getBlogSitemapEntries()
    return new Response(generateBlogSitemap(blogs || []), { headers: { 'Content-Type': 'application/xml' } })
  } catch (error) {
    console.error('Error serving sitemap:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
