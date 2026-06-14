import fs from "fs";
import path from "path";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import { getSiteUrl } from "@/lib/site-url";

export const SOCIAL_PROFILES = {
  linkedin: "https://linkedin.com/in/baezdaniel",
  github: "https://github.com/daniel-baez",
} as const;

export const SAME_AS_URLS = Object.values(SOCIAL_PROFILES);

export const OG_LOCALE_BY_LANG: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
};

export const SITE_THEME_COLOR = "#1e3a8a";
export const SITE_BACKGROUND_COLOR = "#eff6ff";

export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

export function getOgLocale(langCode: string): string {
  return OG_LOCALE_BY_LANG[langCode] ?? "en_US";
}

export function getOgLocaleAlternates(langCode: string): string[] {
  return Object.entries(OG_LOCALE_BY_LANG)
    .filter(([code]) => code !== langCode)
    .map(([, locale]) => locale);
}

export function getLanguageAlternates(baseUrl: string): Record<string, string> {
  const alternates: Record<string, string> = {
    "x-default": `${baseUrl}/en`,
  };

  for (const lang of Object.keys(AVAILABLE_LANGUAGES)) {
    alternates[lang] = `${baseUrl}/${lang}`;
  }

  return alternates;
}

export function getFileLastModified(filePath: string): Date {
  try {
    return fs.statSync(filePath).mtime;
  } catch {
    return new Date();
  }
}

export function getLatestLastModified(filePaths: string[]): Date {
  const dates = filePaths
    .map((filePath) => {
      try {
        return fs.statSync(filePath).mtime;
      } catch {
        return null;
      }
    })
    .filter((date): date is Date => date !== null);

  if (dates.length === 0) {
    return new Date();
  }

  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

export function getLanguagePageLastModified(langCode: string): Date {
  const dataDir = path.join(process.cwd(), "src/data");
  const langDir = path.join(dataDir, langCode);

  const files = [
    path.join(dataDir, "profile.json"),
    path.join(dataDir, "skills.json"),
    path.join(langDir, "summary.md"),
  ];

  try {
    const experienceDir = path.join(langDir, "experiences");
    for (const file of fs.readdirSync(experienceDir)) {
      if (file.endsWith(".md")) {
        files.push(path.join(experienceDir, file));
      }
    }
  } catch {
    // ignore missing experience directory
  }

  return getLatestLastModified(files);
}
