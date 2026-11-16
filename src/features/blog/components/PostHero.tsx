import type { BlogPost } from "@/features/blog/lib/blogService";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const ordinal = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st'; case 2: return 'nd'; case 3: return 'rd'; default: return 'th';
    }
  };
  return `Published on ${day}${ordinal(day)} ${month}, ${year}`;
};


export default function PostHero({ blog }: { blog: BlogPost }) {
  return (
  <div
    className="relative py-12 sm:py-16 md:py-24 pt-20 sm:pt-24 md:pt-32 overflow-hidden"
    style={{
      backgroundImage: blog?.article_image ? `url(${blog.article_image})` : 'linear-gradient(to bottom right, #172840, #243a52)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#172840]/90 via-[#1e3147]/90 to-[#243a52]/90"></div>

    <div className="absolute -top-4 left-8 w-6 h-6 sm:w-8 sm:h-8 bg-paan-blue rounded-full opacity-80 animate-pulse"></div>
    <div className="absolute -top-6 right-12 w-16 h-16 sm:w-20 sm:h-20 bg-paan-yellow rounded-full opacity-70"></div>
    <div className="absolute -bottom-10 right-8 w-24 h-24 sm:w-32 sm:h-32 bg-paan-red rounded-full opacity-60"></div>
    <div className="absolute top-1/2 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-paan-blue rounded-full opacity-50"></div>
    <div className="absolute bottom-1/4 right-1/3 w-4 h-4 sm:w-6 sm:h-6 bg-paan-yellow rounded-full opacity-40"></div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-6">
        {blog?.article_category && (
          <span className="px-3 py-1 sm:px-4 sm:py-1.5 text-sm font-medium capitalize text-paan-red bg-paan-red/10 rounded-full">
            {blog.article_category}
          </span>
        )}
        <span className="text-sm text-gray-300">
          {blog?.created_at && formatDate(blog.created_at)}
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight px-4 leading-snug lg:leading-tight">
        {blog?.article_name}
      </h1>
      <div className="mt-6 sm:mt-8 flex justify-center">
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-paan-red via-paan-yellow to-paan-blue rounded-full"></div>
      </div>
    </div>
  </div>
  );
}
