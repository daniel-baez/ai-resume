import fs from "fs";
import path from "path";
import { getSiteUrl } from "@/lib/site-url";

export type ExperienceLetterEntry = {
  slug: string;
  pdf: string;
  company: string;
  role: string;
  title: Record<string, string>;
  description: Record<string, string>;
};

const experienceLettersPath = path.join(
  process.cwd(),
  "src/data/experience-letters.json"
);

export function getAllExperienceLetters(): ExperienceLetterEntry[] {
  return JSON.parse(fs.readFileSync(experienceLettersPath, "utf8"));
}

export function getExperienceLetterBySlug(
  slug: string
): ExperienceLetterEntry | undefined {
  return getAllExperienceLetters().find((letter) => letter.slug === slug);
}

export function getExperienceLetterOgImageUrl(slug: string): string {
  return `${getSiteUrl()}/experience_letters/og/${slug}.jpg`;
}

export function getExperienceLetterShareUrl(slug: string): string {
  return `${getSiteUrl()}/experience-letters/${slug}`;
}

export function resolveExperienceLetterText(
  value: Record<string, string>,
  lang = "en"
): string {
  return value[lang] || value.en;
}
