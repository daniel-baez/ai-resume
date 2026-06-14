import { MetadataRoute } from "next";
import { SITE_BACKGROUND_COLOR, SITE_THEME_COLOR } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Daniel Baez - Software Engineer",
    short_name: "Daniel Baez",
    description:
      "Senior Software Engineer specializing in cloud-native platforms & IoT solutions",
    start_url: "/en",
    display: "standalone",
    background_color: SITE_BACKGROUND_COLOR,
    theme_color: SITE_THEME_COLOR,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
