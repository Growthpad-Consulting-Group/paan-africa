import Script from "next/script";

// Analytics and ad tags loaded on every page (Pages Router _app and App Router layout share this).
export default function AnalyticsScripts() {
  return (
    <>
      {/* Google Analytics (G-W8K184ZV92) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-W8K184ZV92"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init-1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W8K184ZV92');
          `,
        }}
      />
      {/* Google Ads (AW-437483343) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-437483343"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init-2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-437483343');
            gtag('config', 'AW-17855286131');
          `,
        }}
      />
      {/* Meta Pixel Code */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '706159915533812');
          fbq('track', 'PageView');`
        }}
      />
      {/* Google Ads Conversion Event Function */}
      <Script
        id="gtag-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-437483343/25GQCIKkwPIBEM_uzdAB',
                  'transaction_id': '',
                  'event_callback': callback
              });
              return false;
            }
          `,
        }}
      />
      {/* Meta Pixel NoScript fallback */}
      <noscript>
        <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=706159915533812&ev=PageView&noscript=1" />
      </noscript>
      {/* Apollo Tracking Script updated */}
      <Script
        id="apollo-tracking"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function initApollo(){
              var n=Math.random().toString(36).substring(7),o=document.createElement("script");
              o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n,o.async=!0,o.defer=!0,
              o.onload=function(){window.trackingFunctions.onLoad({appId:"68f509976bc244002162261f"})},
              document.head.appendChild(o)
            }
            initApollo();
          `,
        }}
      />
    </>
  );
}
