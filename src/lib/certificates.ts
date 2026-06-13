import {
  getCertificateDocuments,
  resolveDocumentText,
  type ShareableDocument,
} from "@/lib/document-sources";
import { getSiteUrl } from "@/lib/site-url";

export type CertificateEntry = ShareableDocument;

export function getAllCertificates(): CertificateEntry[] {
  return getCertificateDocuments();
}

export function getCertificateBySlug(slug: string): CertificateEntry | undefined {
  return getCertificateDocuments().find((cert) => cert.slug === slug);
}

export function getCertificateOgImageUrl(slug: string): string {
  return `${getSiteUrl()}/certificates/og/${slug}.jpg`;
}

export function getCertificateShareUrl(slug: string): string {
  return `${getSiteUrl()}/certificates/${slug}`;
}

export const resolveCertificateText = resolveDocumentText;
