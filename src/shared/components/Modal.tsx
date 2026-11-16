"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";
import GlassPanel from "@/shared/components/GlassPanel";

const SIZE_CLASSES = {
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

export type ModalSize = keyof typeof SIZE_CLASSES;

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  className?: string;
};

/** Closes on Escape and locks page scroll (without a layout jump) while open. */
function useModalBehaviour(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [isOpen, onClose]);
}

/**
 * Reusable modal: frosted-glass panel over a blurred, dimmed backdrop (design ported from the kazi project).
 * Content scrolls inside the panel, so a `ModalHeader` can be sticky at the top.
 */
export default function Modal({ isOpen, onClose, children, size = "lg", className = "" }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);
  useModalBehaviour(isOpen, onClose);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-1 sm:p-4 pt-4 sm:pt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0"
            style={{ filter: "url(#glass-distortion)", backdropFilter: "blur(4px) saturate(140%)" }}
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`relative w-full ${SIZE_CLASSES[size]} mx-2 sm:mx-0`}
            onClick={(event) => event.stopPropagation()}
          >
            <GlassPanel className="rounded-2xl overflow-hidden bg-white" contentClassName="gap-0">
              <div className={`max-h-[98vh] sm:max-h-[90vh] overflow-y-auto ${className}`}>{children}</div>
            </GlassPanel>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

type ModalHeaderProps = { title: React.ReactNode; onClose: () => void; icon?: string; subtitle?: string };

/** Sticky header for `Modal`: title (with optional icon and subtitle) and a close button. */
export function ModalHeader({ title, onClose, icon, subtitle }: ModalHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-3 sm:p-4 lg:p-6 border-b border-gray-200 sticky top-0 bg-gradient-to-r from-paan-red/10 to-white z-10">
      {icon && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-paan-red/15">
          <Icon icon={icon} className="h-5 w-5 text-paan-red" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-[#172840] pr-2">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs sm:text-sm text-gray-500">{subtitle}</p>}
      </div>
      <button
        onClick={onClose}
        aria-label="Close"
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
      >
        <Icon icon="ic:baseline-close" className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
      </button>
    </div>
  );
}
