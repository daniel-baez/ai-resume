import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Configuration des headers pour le cache des PDF
  async headers() {
    return [
      {
        source: "/pdfs/resume-:lang.pdf",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800", // 1 jour + 7 jours stale
          },
        ],
      },
    ];
  },
};

export default nextConfig;
