

type Props = {
  setSelectedCategory: (category: string) => void;
  selectedCategory: string;
  availableCategories: string[];
  sortBy: string;
  setSortBy: (sort: string) => void;
};

export default function BlogFilterBar({ setSelectedCategory, selectedCategory, availableCategories, sortBy, setSortBy }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-12 bg-white rounded-xl p-4 shadow-sm">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory('')}
          className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
            !selectedCategory
              ? 'bg-paan-red text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Posts
        </button>
        {availableCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-paan-red text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    
      {/* Sort Options */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-2 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-paan-red"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="readTime">Read Time</option>
        </select>
      </div>
    </div>
  );
}
