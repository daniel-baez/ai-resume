import type { Metadata } from "next";
import "../../globals.css";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import Script from "next/script";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { GithubRibbon } from "@/components/ui/github-ribbon";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Daniel Baez - Software Engineer",
  description:
    "Senior Software Engineer specializing in cloud-native platforms & IoT solutions",
  icons: {
    icon: "/icons/favicon.ico",
  },
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
