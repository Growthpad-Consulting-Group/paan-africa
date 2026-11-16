import type { PortableTextComponents } from "@portabletext/react";

// How the long role description (Portable Text) is styled; matches the previous hand-written HTML.
export const roleDescriptionComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-gray-600 mb-4">{children}</p>,
    h3: ({ children }) => <h4 className="font-semibold text-[#172840] mb-3 mt-4 first:mt-0">{children}</h4>,
    h4: ({ children }) => <h5 className="font-medium text-[#172840] mb-1 mt-3">{children}</h5>,
  },
  list: {
    bullet: ({ children }) => <ul className="text-gray-600 text-sm space-y-1 mb-4 ml-4 list-disc">{children}</ul>,
    number: ({ children }) => <ol className="text-gray-600 text-sm space-y-1 mb-4 ml-4 list-decimal">{children}</ol>,
  },
};
