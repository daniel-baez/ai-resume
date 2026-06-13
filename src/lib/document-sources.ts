import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import { getSiteUrl } from "@/lib/site-url";

type TranslatableString = Record<string, string>;

export type ShareableDocument = {
  slug: string;
  pdf: string;
  sharePath: string;
  title: TranslatableString;
  description: TranslatableString;
  subtitle: string;
  previewRelativePath: string;
  category: "certificate" | "experience-letter" | "resume";
};

const profilePath = path.join(process.cwd(), "src/data/profile.json");

function resolve(value: TranslatableString | string, lang = "en"): string {
  if (typeof value === "string") return value;
  return value[lang] || value.en;
}

function slugFromSharePath(sharePath: string): string {
  return sharePath.replace(/^\//, "").split("/").pop()!;
}

function inferIssuer(slug: string): string {
  if (slug.startsWith("french-")) return "DELF";
  if (slug.startsWith("german-")) return "Goethe-Institut";
  return "";
}

function certificateDescription(
  title: TranslatableString,
  issuer: string
): TranslatableString {
  return {
    en: issuer
      ? `Certificate issued by ${issuer}`
      : `${resolve(title, "en")} certification`,
    es: issuer
      ? `Certificado emitido por ${issuer}`
      : `Certificación ${resolve(title, "es")}`,
    fr: issuer
      ? `Certificat délivré par ${issuer}`
      : `Certification ${resolve(title, "fr")}`,
    de: issuer
      ? `Zertifikat ausgestellt von ${issuer}`
      : `${resolve(title, "de")} Zertifizierung`,
  };
}

export function getCertificateDocuments(): ShareableDocument[] {
  const raw = JSON.parse(fs.readFileSync(profilePath, "utf8"));
  const seen = new Set<string>();
  const documents: ShareableDocument[] = [];

  const addCert = (
    sharePath: string,
    title: TranslatableString,
    issuer: string
  ) => {
    const normalized = sharePath.replace(/\.pdf$/, "");
    const slug = slugFromSharePath(normalized);
    if (seen.has(slug)) return;
    seen.add(slug);

    const resolvedIssuer = issuer || inferIssuer(slug);
    documents.push({
      slug,
      pdf: `${normalized}.pdf`,
      sharePath: normalized,
      title,
      description: certificateDescription(title, resolvedIssuer),
      subtitle: resolvedIssuer,
      previewRelativePath: `certificates/og/${slug}.jpg`,
      category: "certificate",
    });
  };

  for (const skill of raw.softSkills) {
    if (skill.url) {
      addCert(skill.url, skill.name, skill.issuer);
    }
  }

  for (const language of raw.languages) {
    for (const cert of language.certifications || []) {
      const certTitle: TranslatableString = {
        en: `${resolve(language.name, "en")} ${cert.name}`,
        es: `${resolve(language.name, "es")} ${cert.name}`,
        fr: `${resolve(language.name, "fr")} ${cert.name}`,
        de: `${resolve(language.name, "de")} ${cert.name}`,
      };
      addCert(cert.url, certTitle, inferIssuer(slugFromSharePath(cert.url)));
    }
  }

  return documents;
}

export function getExperienceLetterDocuments(): ShareableDocument[] {
  const experiencesDir = path.join(process.cwd(), "src/data/en/experiences");
  const documents: ShareableDocument[] = [];

  for (const file of fs.readdirSync(experiencesDir)) {
    if (!file.endsWith(".md")) continue;
    const content = fs.readFileSync(path.join(experiencesDir, file), "utf8");
    const { data } = matter(content);
    if (!data.experience_letter) continue;

    const sharePath = String(data.experience_letter).replace(/\.pdf$/, "");
    const slug = slugFromSharePath(sharePath);
    const company = data.company as string;
    const role = data.title as string;

    documents.push({
      slug,
      pdf: `/experience_letters/${slug}.pdf`,
      sharePath,
      title: {
        en: `Experience Letter — ${company}`,
        es: `Carta de experiencia — ${company}`,
        fr: `Lettre de recommandation — ${company}`,
        de: `Arbeitszeugnis — ${company}`,
      },
      description: {
        en: `Professional experience letter from ${company}`,
        es: `Carta de experiencia profesional de ${company}`,
        fr: `Lettre de recommandation professionnelle de ${company}`,
        de: `Berufliches Arbeitszeugnis von ${company}`,
      },
      subtitle: `${role} · ${company}`,
      previewRelativePath: `experience_letters/og/${slug}.jpg`,
      category: "experience-letter",
    });
  }

  return documents.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getResumeDocuments(): ShareableDocument[] {
  const raw = JSON.parse(fs.readFileSync(profilePath, "utf8"));
  const name = raw.info.name as TranslatableString;
  const subtitle = raw.info.subtitle as TranslatableString;
  const role = raw.info.title as TranslatableString;

  return Object.keys(AVAILABLE_LANGUAGES).map((lang) => ({
    slug: lang,
    pdf: `/pdfs/resume-${lang}.pdf`,
    sharePath: `/resume/${lang}`,
    title: {
      en: `${resolve(name, "en")} — Resume`,
      es: `${resolve(name, "es")} — Currículum`,
      fr: `${resolve(name, "fr")} — CV`,
      de: `${resolve(name, "de")} — Lebenslauf`,
    },
    description: {
      en: resolve(subtitle, "en"),
      es: resolve(subtitle, "es"),
      fr: resolve(subtitle, "fr"),
      de: resolve(subtitle, "de"),
    },
    subtitle: resolve(role, lang),
    previewRelativePath: `pdfs/og/resume-${lang}.jpg`,
    category: "resume",
  }));
}

export function getAllPreviewDocuments(): ShareableDocument[] {
  return [
    ...getCertificateDocuments(),
    ...getExperienceLetterDocuments(),
    ...getResumeDocuments(),
  ];
}

export function resolveDocumentText(
  value: TranslatableString,
  lang = "en"
): string {
  return resolve(value, lang);
}

export function getDocumentPreviewUrl(previewRelativePath: string): string {
  return `${getSiteUrl()}/${previewRelativePath}`;
}
