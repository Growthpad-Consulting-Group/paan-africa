"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Header from '@/shared/layouts/standard-header';
import Footer from '@/shared/layouts/footer';
import ScrollToTop from '@/shared/components/ScrollToTop';
import Pagination from '@/shared/components/Pagination';
import type { BlogListItem } from '@/features/blog/lib/blogService';
import NewsletterSubscribe from "@/features/blog/components/NewsletterSubscribe";
import PostsGrid from "@/features/blog/components/PostsGrid";
import FeaturedPostCard from "@/features/blog/components/FeaturedPostCard";
import BlogFilterBar from "@/features/blog/components/BlogFilterBar";
import BlogsHero from "@/features/blog/components/BlogsHero";

type Props = { featuredPost: BlogListItem | null; regularPosts: BlogListItem[] };

const BlogsBrowser = ({ featuredPost, regularPosts }: Props) => {
  // State management. The server renders the unfiltered list; filters from the URL are applied after mount
  // (reading them with useSearchParams would make the whole page client-rendered).
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9; // 3x3 grid

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedCategory(params.get('category') ?? '');
    setSearchQuery(params.get('search') ?? '');
    setSortBy(params.get('sort') ?? 'newest');
    setFiltersLoaded(true);
  }, []);

  // Extract unique categories from all posts
  useEffect(() => {
    const allPosts = [...(featuredPost ? [featuredPost] : []), ...(regularPosts || [])];
    const categories = [...new Set(allPosts.map(post => post.category))].filter(Boolean);
    setAvailableCategories(categories);
  }, [featuredPost, regularPosts]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  // Keep the filters in the URL (shallow: no navigation, no server round trip)
  useEffect(() => {
    if (!filtersLoaded) return;
    const query = new URLSearchParams();
    if (selectedCategory) query.set('category', selectedCategory);
    if (searchQuery) query.set('search', searchQuery);
    if (sortBy !== 'newest') query.set('sort', sortBy);
    const qs = query.toString();
    window.history.replaceState(null, '', qs ? `/blogs?${qs}` : '/blogs');
  }, [filtersLoaded, selectedCategory, searchQuery, sortBy]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let posts = [...(regularPosts || [])];
    
    // Apply category filter
    if (selectedCategory) {
      posts = posts.filter(post => post.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category?.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    posts.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'readTime':
          return parseInt(a.readTime) - parseInt(b.readTime);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    
    return posts;
  }, [regularPosts, selectedCategory, searchQuery, sortBy]);

  // Filter featured post
  const filteredFeaturedPost = useMemo(() => {
    if (!featuredPost) return null;
    
    if (selectedCategory && featuredPost.category !== selectedCategory) return null;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!(
        featuredPost.title.toLowerCase().includes(query) ||
        featuredPost.excerpt.toLowerCase().includes(query) ||
        featuredPost.category?.toLowerCase().includes(query) ||
        featuredPost.tags?.some(tag => tag.toLowerCase().includes(query))
      )) return null;
    }
    
    return featuredPost;
  }, [featuredPost, selectedCategory, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredAndSortedPosts.slice(startIndex, endIndex);
  }, [filteredAndSortedPosts, currentPage, postsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <>
      <Header />

      <main className="bg-gray-50 min-h-screen relative">
        {/* Hero Section */}
        <BlogsHero isSearchFocused={isSearchFocused} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setIsSearchFocused={setIsSearchFocused} />

        {/* Blog Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Filters Bar */}
          <BlogFilterBar setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} availableCategories={availableCategories} sortBy={sortBy} setSortBy={setSortBy} />

          {/* Search Results Summary */}
          {searchQuery && (
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                {filteredAndSortedPosts.length === 0
                  ? `No results found for "${searchQuery}"`
                  : `Found ${filteredAndSortedPosts.length} article${filteredAndSortedPosts.length === 1 ? '' : 's'} for "${searchQuery}"`}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-sm text-paan-red hover:text-paan-red transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Featured Post */}
          {filteredFeaturedPost && (
            <FeaturedPostCard filteredFeaturedPost={filteredFeaturedPost} setSelectedCategory={setSelectedCategory} />
          )}

          {/* Regular Posts Grid */}
          <PostsGrid searchQuery={searchQuery} selectedCategory={selectedCategory} filteredAndSortedPosts={filteredAndSortedPosts} paginatedPosts={paginatedPosts} setSelectedCategory={setSelectedCategory} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} postsPerPage={postsPerPage} setSearchQuery={setSearchQuery} />

          {/* Newsletter Subscription Section */}
          <NewsletterSubscribe />
        </div>
        <Footer />
      </main> 

      <ScrollToTop />
    </>
  );
};

export default BlogsBrowser;
