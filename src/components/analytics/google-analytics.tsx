"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only run tracking in client-side environment and when isClient is true
    if (typeof window === 'undefined' || !isClient || !window.gtag) return;

    const url = pathname + (searchParams?.toString() || '');
    
    try {
      // Push to dataLayer
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    } catch (error) {
      console.error('Google Analytics tracking error:', error);
    }
  }, [pathname, searchParams, isClient]);

  // Only render the scripts on the client-side to prevent hydration mismatches
  if (!isClient) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `,
        }}
      />
    </>
  );
} 