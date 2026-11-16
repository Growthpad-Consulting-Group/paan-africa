import { Icon } from "@iconify/react";

type Props = {
  isSearchFocused: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  setIsSearchFocused: (focused: boolean) => void;
};

export default function BlogsHero({ isSearchFocused, searchQuery, setSearchQuery, setIsSearchFocused }: Props) {
  return (
    <div className="bg-gradient-to-br from-[#172840] via-[#1e3147] to-[#243a52] relative py-24 pt-32 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute -top-4 left-8 w-8 h-8 bg-paan-blue rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute -top-6 right-12 w-20 h-20 bg-paan-yellow rounded-full opacity-70"></div>
      <div className="absolute -bottom-10 right-8 w-32 h-32 bg-paan-red rounded-full opacity-60"></div>
      <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-paan-blue rounded-full opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/3 w-6 h-6 bg-paan-yellow rounded-full opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Our <span className="text-paan-yellow">Blog</span>
        </h1>
        <p className="text-gray-300 text-xl md:text-lg max-w-3xl mx-auto leading-relaxedm mb-8">
          Insights, trends, and stories from Africa's creative and tech landscape
        </p>
    
        {/* Search Form */}
        <div className="max-w-2xl mx-auto">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search articles..."
              className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 border-2 border-white/20 focus:border-paan-yellow focus:outline-none transition-all duration-300"
            />
            <Icon
              icon="heroicons:magnifying-glass"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
