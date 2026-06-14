import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">404</h1>
        <p className="text-lg text-gray-700 mb-6">This page could not be found.</p>
        <Link
          href="/en"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Back to home
        </Link>
      </body>
    </html>
  );
}
