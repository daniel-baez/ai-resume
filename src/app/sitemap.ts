import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const languages = Object.keys(AVAILABLE_LANGUAGES);

  return languages.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: lang === "en" ? 1 : 0.9,
  }));
}
