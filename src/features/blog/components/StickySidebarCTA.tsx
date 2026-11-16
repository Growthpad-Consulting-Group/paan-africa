"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

const StickySidebarCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 transition-all duration-500
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}
        hidden xl:block`}
    >
      <div className="relative w-56 bg-[#172840] rounded-2xl shadow-2xl p-5 text-white overflow-hidden">
  
        {/* dismiss button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 text-white/40 hover:text-white/80 transition-colors"
          aria-label="Dismiss"
        >
          <Icon icon="heroicons:x-mark" className="w-4 h-4" />
        </button>

        <div className="relative z-10">
          <div className="w-10 h-10 bg-paan-red/20 rounded-xl flex items-center justify-center mb-3">
            <Icon icon="heroicons:building-office-2" className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs font-semibold text-paan-yellow uppercase tracking-widest mb-1">
            Work with PAAN
          </p>
          <h4 className="text-sm font-bold leading-snug mb-3">
            Ready to grow your brand across Africa?
          </h4>
          <Link
            href="/contact-us"
            className="block text-center bg-paan-red hover:bg-paan-red/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StickySidebarCTA;
