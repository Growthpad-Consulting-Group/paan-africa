import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/shared/components/Icon";
import Header from "@/shared/layouts/standard-header";
import Footer from "@/shared/layouts/footer";
import ScrollToTop from "@/shared/components/ScrollToTop";
import type { BlogPost, BlogListItem } from "@/features/blog/lib/blogService";
import { splitAtMidpoint } from "@/features/blog/lib/splitAtMidpoint";
import SocialShare from "@/features/blog/components/SocialShare";
import StickySidebarCTA from "@/features/blog/components/StickySidebarCTA";
import PostHero from "@/features/blog/components/PostHero";
import TableOfContents from "@/features/blog/components/TableOfContents";
import BlogAuthor from "@/features/blog/components/BlogAuthor";
import MidArticleCTA from "@/features/blog/components/MidArticleCTA";
import PostArticleCTABanner from "@/features/blog/components/PostArticleCTABanner";
import PostNewsletter from "@/features/blog/components/PostNewsletter";
import RelatedPosts from "@/features/blog/components/RelatedPosts";

type Props = { blog: BlogPost; relatedPosts: BlogListItem[] };

export default function BlogPostView({ blog, relatedPosts }: Props) {
  const hasContent = !!blog.article_body && blog.article_body.trim().length > 0;
  const { before: contentBefore, after: contentAfter } = splitAtMidpoint(blog.article_body);

  return (
    <>
      <Header />

      <main className="bg-gray-50 min-h-screen relative">
        <ScrollToTop />

        {/* Social Share Icons */}
        <SocialShare title={blog?.article_name || ""} />

        {/* Sticky Sidebar CTA (desktop only, right side) */}
        <StickySidebarCTA />

        <PostHero blog={blog} />

        {/* Article Content */}
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-20">

          {/* Article */}
          <div className="flex gap-8">
            <TableOfContents content={blog.article_body} />

            <article className="flex-1 bg-white rounded-xl overflow-hidden">
              {blog?.article_image && (
                <div className="relative w-full h-[500px]">
                  <Image
                    src={blog.article_image}
                    alt={blog.article_name}
                    width={600}
                    height={0}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              )}

              <div className="p-6 sm:p-8 md:p-12 lg:p-10">
                {/* Meta row: read time, author, comment count */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-6">
                  {blog?.read_time && (
                    <div className="flex items-center gap-2">
                      <Icon icon="heroicons:clock" className="w-4 h-4" />
                      <span>{blog.read_time}</span>
                    </div>
                  )}
                  {blog?.author && (
                    <div className="flex items-center gap-2">
                      <Icon icon="heroicons:user" className="w-4 h-4" />
                      <span>By {blog.author}</span>
                    </div>
                  )}
                </div>

                {!hasContent && (
                  <div className="text-center py-12 sm:py-16">
                    <Icon icon="heroicons:document-text" className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-[#172840]" />
                    <h3 className="mt-4 text-base sm:text-lg font-medium text-[#172840]">Content Coming Soon</h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-500">This article is being prepared. Please check back later.</p>
                  </div>
                )}

                {hasContent && (
                  <div
                    className="prose prose-sm sm:prose-base md:prose-lg max-w-none
                      prose-headings:font-bold prose-headings:text-[#172840] prose-headings:tracking-tight
                      prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
                      prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10
                      prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                      prose-h4:text-xl prose-h4:mb-4 prose-h4:mt-6
                      prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-6
                      prose-a:text-paan-red prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-[#172840] prose-strong:font-semibold
                      prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                      prose-blockquote:border-l-4 prose-blockquote:border-[#F25849] prose-blockquote:pl-4 prose-blockquote:italic
                      prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6
                      prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-6
                      prose-li:mb-2 prose-li:text-gray-600
                      prose-code:text-[#F25849] prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg
                      prose-hr:my-8 prose-hr:border-gray-200"
                    id="blog-content"
                  >
                    {/* First half of article */}
                    <div dangerouslySetInnerHTML={{ __html: contentBefore }} />

                    {/* ── CTA 1: Mid-Article Inline ── */}
                    <MidArticleCTA />

                    {/* Second half of article */}
                    <div dangerouslySetInnerHTML={{ __html: contentAfter }} />
                  </div>
                )}

                {/* Author bio */}
                {blog?.author && <div id="blog-author"><BlogAuthor author={blog.author} /></div>}

                {/* Tags */}
                {blog?.article_tags && blog.article_tags.length > 0 && (
                  <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                    <h3 className="text-sm sm:text-base font-medium text-[#172840] mb-3 sm:mb-4">Tags:</h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {blog.article_tags.map((tag: string, index: number) => (
                        <span key={index} className="px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm text-paan-dark-blue bg-paan-dark-blue/5 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── CTA 2: Post-Article Banner ── */}
                {hasContent && <PostArticleCTABanner />}
              </div>
            </article>
          </div>

          {/* Back to Blogs */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <Link
              href="/blogs"
              className="inline-flex items-center bg-gradient-to-r from-paan-red to-paan-red text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:from-paan-red hover:to-paan-red transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Icon icon="heroicons:arrow-left" className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Back to Blogs
            </Link>
          </div>

          <PostNewsletter />
        </div>

        {/* Related Posts */}
        <RelatedPosts posts={relatedPosts} authorElementId="blog-author" />

        <Footer />
      </main>
    </>
  );
}
