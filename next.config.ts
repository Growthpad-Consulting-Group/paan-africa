import type { NextConfig } from 'next';
import initializeBundleAnalyzer from '@next/bundle-analyzer';


// Configure the Bundle Analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
  enabled: process.env.BUNDLE_ANALYZER_ENABLED === "true",
});

// PAAN Summit 2026 (and its awards) was cancelled: these pages redirect to the
// homepage and are excluded from the sitemap so search engines drop them.
const HIDDEN_PATHS = [
  "/summit",
  "/summit/:path*",
  "/summit-old-backup",
  "/paan-awards",
  "/paan-awards/:path*",
  "/paan-awards-terms",
];

const nextConfig: NextConfig = {
  // Don't use standalone output - it causes issues with static assets
  // output: "standalone",
  devIndicators: {
    position: 'bottom-right',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
    ],
    qualities: [100, 75],
    // Cut Vercel image-optimization usage: cache transformed images for 31 days
    // (default re-validates far more often, each miss is a cache write), serve
    // WebP only (AVIF doubles transformations per image), and trim the size ladder.
    loaderFile: './src/shared/lib/image-loader.ts',
    minimumCacheTTL: 2678400,
    formats: ['image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [64, 128, 256, 384],
  },
  reactStrictMode: true,
  // Optimize serverless function size by excluding large directories
  outputFileTracingExcludes: {
    // Exclude large public assets from ALL API routes
    '/api/**': [
      './public/assets/images/**',
      './public/assets/videos/**',
      './public/assets/documents/**',
    ],
  },
  turbopack: {},
  // Native module: must be loaded from node_modules instead of being bundled into the route
  serverExternalPackages: ['@napi-rs/canvas'],

  async redirects() {
    return [
      // SHOW_HIDDEN_PAGES=1 is for LOCAL verification builds only (lets us render and compare the
      // cancelled summit/awards pages). Never set it in production: the pages must stay redirected.
      ...(process.env.SHOW_HIDDEN_PAGES === "1"
        ? []
        : HIDDEN_PATHS.map((source) => ({
            source,
            destination: "/",
            permanent: false,
          }))),
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.paan.africa",
          },
        ],
        destination: "https://paan.africa/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://paan.africa/:path*",
        permanent: true,
      },
    ];
  },
};

// Export the configuration wrapped with the (opt-in) bundle analyzer
export default withBundleAnalyzer(nextConfig);
