import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import "../../globals.css";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import Script from "next/script";
import { Suspense } from "react";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { GithubRibbon } from "@/components/ui/github-ribbon";
import { TrackClicks } from "@/components/analytics/track-clicks";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getMetadataBase, SITE_BACKGROUND_COLOR, SITE_THEME_COLOR } from "@/lib/seo";

const Toaster = dynamic(
  () => import("@/components/ui/toaster").then((mod) => mod.Toaster)
);

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "Daniel Baez - Software Engineer",
  description:
    "Senior Software Engineer specializing in cloud-native platforms & IoT solutions",
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  other: {
    "msapplication-TileColor": SITE_BACKGROUND_COLOR,
  },
};

export const viewport: Viewport = {
  themeColor: SITE_THEME_COLOR,
};

export default async function MainLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;

  return (
    <html lang={lang}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Script
          strategy="lazyOnload"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
      </head>
      <body className="antialiased">
        <GithubRibbon />
        {children}
        <Toaster />
        <ScrollToTop />
        <TrackClicks />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <Suspense fallback={null}>
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}
