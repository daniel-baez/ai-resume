import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function CertificateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
