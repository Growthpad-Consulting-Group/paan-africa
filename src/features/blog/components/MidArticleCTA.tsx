import Link from "next/link";
import { Icon } from "@/shared/components/Icon";

const MidArticleCTA = () => (
  <div className="not-prose my-10 rounded-2xl overflow-hidden border border-paan-red/10 bg-gradient-to-r from-[#172840] to-[#1e3f5c] text-white relative">
    {/* decorative blobs */}
    <div className="absolute top-0 right-0 w-40 h-40 bg-paan-yellow/10 rounded-full -translate-y-1/2 translate-x-1/4" />
    <div className="absolute bottom-0 left-0 w-28 h-28 bg-paan-red/10 rounded-full translate-y-1/2 -translate-x-1/4" />

    <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 p-7 sm:p-8">
      <div className="flex-shrink-0 w-14 h-14 bg-paan-red/20 rounded-2xl flex items-center justify-center">
        <Icon icon="heroicons:light-bulb" className="w-7 h-7 text-paan-red" />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <p className="text-xs font-semibold text-paan-yellow uppercase tracking-widest mb-1">
          PAAN Services
        </p>
        <h4 className="text-lg font-bold mb-1 leading-snug">
          Inspired by what you just read?
        </h4>
        <p className="text-sm text-gray-300">
          PAAN connects brands with Africa's top creative agencies. Let's build something exceptional together.
        </p>
      </div>

      <Link
        href="/contact-us"
        className="flex-shrink-0 inline-flex items-center gap-2 bg-paan-red hover:bg-paan-red/90 text-white text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap"
      >
        <Icon icon="heroicons:envelope" className="w-4 h-4" />
        Get in Touch
      </Link>
    </div>
  </div>
);

export default MidArticleCTA;
