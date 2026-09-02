"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const SIZE_CLASSES = {
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function Modal({
  isOpen,
  onClose,
  children,
  size = "lg",
  className = "",
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-1 sm:p-4 pt-4 sm:pt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={`relative bg-white rounded-lg shadow-xl w-full ${SIZE_CLASSES[size]} max-h-[98vh] sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-0 ${className}`}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function ModalHeader({ title, onClose }) {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
      <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-[#172840] pr-2">
        {title}
      </h2>
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
