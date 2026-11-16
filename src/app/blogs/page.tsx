import { buildMetadata } from '@/lib/seo';
import { getAllPosts } from '@/features/blog/lib/blogService';
import BlogsBrowser from '@/features/blog/components/BlogsBrowser';

export const revalidate = 3600;

export const metadata = buildMetadata({
  path: '/blogs',
  title: "PAAN Blog | Insights from Africa's Creative & Tech Landscape",
  description:
    "Explore the latest insights, trends, and stories from Africa's creative and tech landscape. Stay informed with expert analysis, industry news, and thought leadership from PAAN.",
  keywords:
    'PAAN blog, African tech insights, creative industry Africa, tech trends Africa, African innovation, creative tech blog, African digital transformation, tech leadership Africa',
  ogTitle: "PAAN Blog | Africa's Creative & Tech Insights",
  ogDescription:
    "Discover the latest insights and trends from Africa's creative and tech landscape. Expert analysis, industry news, and thought leadership from PAAN.",
  ogImage: 'https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296',
  twitterTitle: "PAAN Blog | Africa's Creative & Tech Insights",
  twitterDescription:
    "Discover the latest insights and trends from Africa's creative and tech landscape. Expert analysis, industry news, and thought leadership from PAAN.",
  twitterImage: 'https://ik.imagekit.io/nkmvdjnna/PAAN/paan-logo.jpg?updatedAt=1757522406296',
  canonicalUrl: 'https://paan.africa/blogs',
});

export default async function BlogsPage() {
  // A Sanity failure throws: at build it fails the deploy, during revalidation Next keeps serving the last good page.
  const blogs = await getAllPosts();
  const featuredPost = blogs.find((b) => b.featured) || null;
  const regularPosts = blogs.filter((b) => !b.featured);

  if (!featuredPost && regularPosts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#172840] mb-4">No Blogs Found</h2>
          <p className="text-gray-600">We&apos;re currently working on new content. Please check back soon!</p>
        </div>
      </div>
    );
  }

  return <BlogsBrowser featuredPost={featuredPost} regularPosts={regularPosts} />;
}
