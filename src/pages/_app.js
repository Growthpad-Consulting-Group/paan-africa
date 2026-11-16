// pages/_app.js
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import ServiceWorkerCleanup from '@/components/ServiceWorkerCleanup';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import { ChristmasProvider } from '../contexts/ChristmasContext';
import ChristmasEffects from '../components/ChristmasEffects';

import { globalSchema } from '@/data/siteSchema';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  // Set HTML lang attribute based on current locale
  useEffect(() => {
    if (router.locale) {
      document.documentElement.lang = router.locale;
    }
  }, [router.locale]);

  // Global schema (Organization + FAQPage only)

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
      </Head>
      <ServiceWorkerCleanup />
      <AnalyticsScripts />
      <ChristmasProvider>
        <ChristmasEffects />
        <Component {...pageProps} />
      </ChristmasProvider>

      <Toaster position="top-right" toastOptions={{
        duration: 4000,
        style: { background: '#172840', color: '#fff' },
        success: { duration: 3000, iconTheme: { primary: '#4ade80', secondary: '#fff' } },
        error: { duration: 5000, iconTheme: { primary: '#ef4444', secondary: '#fff' } },
      }}/>
    </>
  );
}

export default MyApp;
