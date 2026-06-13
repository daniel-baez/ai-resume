import fs from "fs";
import path from "path";
import { getSiteUrl } from "@/lib/site-url";

export type CertificateEntry = {
  slug: string;
  pdf: string;
  issuer: string;
  title: Record<string, string>;
  description: Record<string, string>;
};

const certificatesPath = path.join(process.cwd(), "src/data/certificates.json");

export function getAllCertificates(): CertificateEntry[] {
  return JSON.parse(fs.readFileSync(certificatesPath, "utf8"));
}

export function getCertificateBySlug(slug: string): CertificateEntry | undefined {
  return getAllCertificates().find((cert) => cert.slug === slug);
}

export function getCertificateOgImageUrl(slug: string): string {
  return `${getSiteUrl()}/certificates/og/${slug}.jpg`;
}

export function getCertificateShareUrl(slug: string): string {
  return `${getSiteUrl()}/certificates/${slug}`;
}

export function resolveCertificateText(
  value: Record<string, string>,
  lang = "en"
): string {
  return value[lang] || value.en;
}
