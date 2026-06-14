import path from "path";
import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import { getAllCertificates } from "@/lib/certificates";
import { getAllExperienceLetters } from "@/lib/experience-letters";
import { getResumeDocuments } from "@/lib/document-sources";
import {
  getFileLastModified,
  getLanguageAlternates,
  getLanguagePageLastModified,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const languages = Object.keys(AVAILABLE_LANGUAGES);

  const languagePages = languages.map((lang) => ({
    url: `${baseUrl}/${lang}`,
    lastModified: getLanguagePageLastModified(lang),
    changeFrequency: "monthly" as const,
    priority: lang === "en" ? 1 : 0.9,
    alternates: {
      languages: getLanguageAlternates(baseUrl),
    },
  }));

  const certificatePages = getAllCertificates().map((cert) => ({
    url: `${baseUrl}/certificates/${cert.slug}`,
    lastModified: getFileLastModified(
      path.join(process.cwd(), "public", cert.previewRelativePath)
    ),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const experienceLetterPages = getAllExperienceLetters().map((letter) => ({
    url: `${baseUrl}/experience-letters/${letter.slug}`,
    lastModified: getFileLastModified(
      path.join(process.cwd(), "public", letter.previewRelativePath)
    ),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const resumePages = getResumeDocuments().map((resume) => ({
    url: `${baseUrl}${resume.sharePath}`,
    lastModified: getFileLastModified(
      path.join(process.cwd(), "public", resume.pdf)
    ),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...languagePages,
    ...certificatePages,
    ...experienceLetterPages,
    ...resumePages,
  ];
}
