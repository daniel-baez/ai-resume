import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import { getAllCertificates } from "@/lib/certificates";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const languages = Object.keys(AVAILABLE_LANGUAGES);

  const languagePages = languages.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: lang === "en" ? 1 : 0.9,
  }));

  const certificatePages = getAllCertificates().map((cert) => ({
    url: `${baseUrl}/certificates/${cert.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...languagePages, ...certificatePages];
}
