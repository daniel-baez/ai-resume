import {
  getExperienceLetterDocuments,
  resolveDocumentText,
  type ShareableDocument,
} from "@/lib/document-sources";
import { getSiteUrl } from "@/lib/site-url";

export type ExperienceLetterEntry = ShareableDocument;

export function getAllExperienceLetters(): ExperienceLetterEntry[] {
  return getExperienceLetterDocuments();
}

export function getExperienceLetterBySlug(
  slug: string
): ExperienceLetterEntry | undefined {
  return getExperienceLetterDocuments().find((letter) => letter.slug === slug);
}

export function getExperienceLetterOgImageUrl(slug: string): string {
  return `${getSiteUrl()}/experience_letters/og/${slug}.jpg`;
}

export function getExperienceLetterShareUrl(slug: string): string {
  return `${getSiteUrl()}/experience-letters/${slug}`;
}

export const resolveExperienceLetterText = resolveDocumentText;
