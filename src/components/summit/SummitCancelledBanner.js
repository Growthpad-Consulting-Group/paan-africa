import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { SUMMIT_CANCELLED, SUMMIT_CANCELLATION_NOTICE } from "@/data/summit/status";

const SummitCancelledBanner = () => {
  const bannerRef = useRef(null);

  // Pad the page by the banner's height so the fixed banner never hides the footer
  useEffect(() => {
    if (!SUMMIT_CANCELLED || !bannerRef.current) return;

    const body = document.body;
    const previousPadding = body.style.paddingBottom;
    const updatePadding = () => {
      body.style.paddingBottom = `${bannerRef.current?.offsetHeight || 0}px`;
    };

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => {
      window.removeEventListener("resize", updatePadding);
      body.style.paddingBottom = previousPadding;
    };
  }, []);

  if (!SUMMIT_CANCELLED) return null;

  const { title, message, contactEmail } = SUMMIT_CANCELLATION_NOTICE;

  return (
    <div
      ref={bannerRef}
      role="alert"
      className="fixed bottom-0 left-0 right-0 z-40 bg-paan-red text-white shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
    >
      <div className="mx-auto max-w-7xl px-4 py-3 pr-24 sm:pr-28 flex items-start sm:items-center gap-3">
        <Icon icon="mdi:alert-circle" className="w-6 h-6 flex-shrink-0 mt-0.5 sm:mt-0" />
        <p className="text-xs sm:text-sm leading-snug">
          <span className="font-bold">{title}.</span>{" "}
          {message} For enquiries, contact{" "}
          <a href={`mailto:${contactEmail}`} className="underline font-semibold hover:text-paan-dark-blue">
            {contactEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SummitCancelledBanner;
