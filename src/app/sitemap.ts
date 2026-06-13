import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import { getAllCertificates } from "@/lib/certificates";
import { getAllExperienceLetters } from "@/lib/experience-letters";
import { getResumeDocuments } from "@/lib/document-sources";

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

  const experienceLetterPages = getAllExperienceLetters().map((letter) => ({
    url: `${baseUrl}/experience-letters/${letter.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  const resumePages = getResumeDocuments().map((resume) => ({
    url: `${baseUrl}${resume.sharePath}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...languagePages, ...certificatePages, ...experienceLetterPages, ...resumePages];
}
