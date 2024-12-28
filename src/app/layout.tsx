import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import Script from "next/script";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Daniel Baez - Software Engineer',
  description: 'Senior Software Engineer specializing in cloud-native platforms & IoT solutions',
  icons: {
    icon: '/icons/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Suspense>
        <GoogleAnalytics />
        </Suspense>
        <Script
          strategy="beforeInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
        {children}
        <Toaster />
        <ScrollToTop />
      </body>
    </html>
  );
}
