import { getBlogSitemapEntries } from '@/lib/blogService';

const SitemapBlogs = () => null;

export const getServerSideProps = async ({ res }) => {
  try {
    const blogs = await getBlogSitemapEntries();

    // Generate sitemap XML for blog posts only
    const sitemap = generateBlogSitemap(blogs || []);

    // Set the content type to XML
    res.setHeader('Content-Type', 'application/xml');
    
    // Send the sitemap content
    res.write(sitemap);
    res.end();

    return {
      props: {},
    };
  } catch (error) {
    console.error('Error serving sitemap:', error);
    res.status(500).json({ error: 'Internal server error' });
    return {
      props: {},
    };
  }
};

function generateBlogSitemap(blogs) {
  const baseUrl = 'https://paan.africa';
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" 
        xmlns:xhtml="http://www.w3.org/1999/xhtml" 
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" 
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`;

  // Add blog posts
  blogs.forEach(blog => {
    const lastmod = new Date(blog.updatedAt).toISOString();
    xml += `
  <url>
    <loc>${baseUrl}/blogs/${blog.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  xml += '\n</urlset>';
  return xml;
}

export default SitemapBlogs; 