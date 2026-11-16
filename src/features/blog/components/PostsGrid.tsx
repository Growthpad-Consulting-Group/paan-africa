import type { BlogListItem } from "@/features/blog/lib/blogService";
import Image from "next/image";
import Link from "next/link";
import Pagination from "@/shared/components/Pagination";
import { Icon } from "@iconify/react";

type Props = {
  searchQuery: string;
  selectedCategory: string;
  filteredAndSortedPosts: BlogListItem[];
  paginatedPosts: BlogListItem[];
  setSelectedCategory: (category: string) => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  postsPerPage: number;
  setSearchQuery: (value: string) => void;
};

export default function PostsGrid({ searchQuery, selectedCategory, filteredAndSortedPosts, paginatedPosts, setSelectedCategory, currentPage, totalPages, handlePageChange, postsPerPage, setSearchQuery }: Props) {
  return (
    <div id="articles-section" className="mb-12">
      <h3 className="text-3xl font-bold text-[#172840] mb-12 text-center capitalize">
        {searchQuery
          ? 'Search Results'
          : selectedCategory
          ? `${selectedCategory} Articles`
          : ''}
      </h3>
      
      {filteredAndSortedPosts.length > 0 ? (
        <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((blog, index) => (
            <article 
              key={blog.slug}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 bg-white flex items-center justify-center overflow-hidden">
                <Image 
                  src={blog.image} 
                  alt={blog.title}
                  width={400}
                  height={224} // 16:9 aspect ratio for 400px width
                  className="object-contain h-[224px] w-full transition-transform duration-500 group-hover:scale-105 bg-white"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3 text-xs text-gray-500 capitalize tracking-wide">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  {blog.category && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedCategory(blog.category);
                      }}
                      className="px-3 py-1 text-xs font-medium capitalize text-paan-red bg-paan-red/10 rounded-full hover:bg-paan-red/20 transition-colors"
                    >
                      {blog.category}
                    </button>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-[#172840] mb-3 leading-tight group-hover:text-paan-red transition-colors duration-300">
                  <Link href={`/blogs/${blog.slug}`} className="hover:text-paan-red transition-colors duration-300">
                    {blog.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 font-medium">
                    By {blog.author}
                  </span>
                  
                  <Link 
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center bg-paan-blue text-[#172840] px-6 py-2 rounded-full text-sm font-semibold hover:bg-paan-blue hover:text-white transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Read More
                    <svg className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
    
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={filteredAndSortedPosts.length}
          itemsPerPage={postsPerPage}
          scrollToId="articles-section"
        />
        </>
      ) : (
        <div className="text-center py-12">
          <Icon
            icon="heroicons:magnifying-glass"
            className="mx-auto h-12 w-12 text-gray-400"
          />
          <h3 className="mt-2 text-xl font-medium text-gray-900">
            {searchQuery
              ? 'No results found for the search query'
              : selectedCategory
              ? `No posts found in category "${selectedCategory}"`
              : 'No posts found'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery
              ? 'Try different keywords or browse all articles'
              : selectedCategory
              ? 'Try selecting a different category or check back later for new posts.'
              : 'We\'re currently working on new content. Please check back soon!'}
          </p>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
              }}
                className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-paan-red bg-paan-red/10 rounded-full hover:bg-paan-red/20 transition-colors"
            >
              View All Posts
            </button>
          )}
        </div>
      )}
    </div>
  );
}
