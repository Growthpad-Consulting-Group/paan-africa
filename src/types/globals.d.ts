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

  /** Global `gtag` / `dataLayer` (bare identifiers, as the legacy components call them) */
  function gtag(...args: any[]): void;
  // eslint-disable-next-line no-var
  var dataLayer: any[];

  /** Google Ads conversion helper defined by the inline script in AnalyticsScripts. Redirects to `url` after reporting. */
  function gtag_report_conversion(url?: string): boolean;
}
