import type { BlogListItem } from "@/features/blog/lib/blogService";
import Image from "next/image";
import Link from "next/link";

type Props = {
  filteredFeaturedPost: BlogListItem;
  setSelectedCategory: (category: string) => void;
};

export default function FeaturedPostCard({ filteredFeaturedPost, setSelectedCategory }: Props) {
  return (
    <div className="mb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="bg-paan-red text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
          Featured Post
        </div>
        {filteredFeaturedPost.category && (
          <button
            onClick={() => setSelectedCategory(filteredFeaturedPost.category)}
            className="px-4 py-2 text-sm font-medium text-paan-red bg-paan-red/10 rounded-full hover:bg-paan-red/20 transition-colors"
          >
            {filteredFeaturedPost.category}
          </button>
        )}
      </div>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
        <div className="md:flex">
          <div className="relative md:w-1/2 h-64 md:h-96">
            <Image 
              src={filteredFeaturedPost.image} 
              alt={filteredFeaturedPost.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              <span>{filteredFeaturedPost.date}</span>
              <span>•</span>
              <span>{filteredFeaturedPost.author}</span>
              <span>•</span>
              <span>{filteredFeaturedPost.readTime}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-[#172840] mb-6 leading-tight">
              {filteredFeaturedPost.title}
            </h2>
            
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              {filteredFeaturedPost.excerpt}
            </p>
            
            <Link 
              href={`/blogs/${filteredFeaturedPost.slug}`}
              className="inline-flex items-center bg-gradient-to-r from-paan-red to-paan-red text-white px-8 py-4 rounded-full font-semibold hover:from-paan-red hover:to-paan-red transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-fit"
            >
              Read Full Article
              <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
