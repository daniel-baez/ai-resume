import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function ExperienceLetterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased overflow-hidden">{children}</body>
    </html>
  );
}
