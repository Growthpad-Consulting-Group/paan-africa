import Link from "next/link";
import { Icon } from "@/shared/components/Icon";

const PostArticleCTABanner = () => (
  <div className="my-10 rounded-2xl bg-white border border-gray-100 shadow-md overflow-hidden">
    <div className="flex flex-col md:flex-row">
      {/* Left accent strip */}
      <div className="md:w-2 bg-gradient-to-b from-paan-red via-paan-yellow to-paan-blue flex-shrink-0" />

      <div className="flex-1 p-7 sm:p-8 md:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Icon cluster */}
          <div className="flex -space-x-2 flex-shrink-0">
            {['heroicons:globe-africa', 'heroicons:chart-bar', 'heroicons:megaphone'].map((icon, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-[#172840] border-2 border-white flex items-center justify-center shadow"
              >
                <Icon icon={icon} className="w-5 h-5 text-paan-yellow" />
              </div>
            ))}
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold text-paan-red uppercase tracking-widest mb-1">
              Partner with us
            </p>
            <h4 className="text-xl font-bold text-[#172840] mb-1">
              Unlock Africa's creative economy for your brand
            </h4>
            <p className="text-sm text-gray-500">
              From strategy to execution: PAAN's network of vetted agencies delivers results across the continent.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-3 flex-shrink-0">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-[#172840] hover:bg-[#1e3f5c] text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap"
            >
              Enquire About Services
              <Icon icon="heroicons:arrow-right" className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="text-xs text-gray-400 hover:text-paan-red underline underline-offset-2 transition-colors text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PostArticleCTABanner;
