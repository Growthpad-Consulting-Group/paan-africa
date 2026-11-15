// Browser globals added by third-party scripts used on the site.
export {};

declare global {
  interface Window {
    /** Google Translate widget (loaded by LanguageSwitch) */
    google?: any;
    googleTranslateElementInit?: () => void;
    __paanGoogleTranslateInitialized?: boolean;
    /** Paystack inline checkout */
    PaystackPop?: any;
    /** Google tag */
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}
