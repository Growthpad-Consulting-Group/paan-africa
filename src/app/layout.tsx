import type { Metadata, Viewport } from 'next'
import '@/styles/globals.css'
import AnalyticsScripts from '@/components/AnalyticsScripts'
import ServiceWorkerCleanup from '@/components/ServiceWorkerCleanup'
import { globalSchema } from '@/data/siteSchema'
import Providers from './providers'

export const metadata: Metadata = {
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  other: { 'apple-mobile-web-app-capable': 'yes' },
  appleWebApp: { capable: true, title: 'PAAN', statusBarStyle: 'default' },
}

export const viewport: Viewport = { themeColor: '#F25849' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }} />
      </head>
      <body>
        <AnalyticsScripts />
        <ServiceWorkerCleanup />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
