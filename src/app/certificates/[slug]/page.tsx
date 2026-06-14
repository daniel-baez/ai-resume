import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentViewer } from "@/components/documents/document-viewer";
import { buildCertificateDownloadFilename } from "@/lib/download-filename";
import {
  getAllCertificates,
  getCertificateBySlug,
  getCertificateOgImageUrl,
  getCertificateShareUrl,
  resolveCertificateText,
} from "@/lib/certificates";

export function generateStaticParams() {
  return getAllCertificates().map((cert) => ({ slug: cert.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const certificate = getCertificateBySlug(slug);

  if (!certificate) {
    return {};
  }

  const title = resolveCertificateText(certificate.title);
  const description = resolveCertificateText(certificate.description);
  const url = getCertificateShareUrl(slug);
  const imageUrl = getCertificateOgImageUrl(slug);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Daniel Baez",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1200,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function CertificatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const certificate = getCertificateBySlug(slug);

  if (!certificate) {
    notFound();
  }

  const title = resolveCertificateText(certificate.title);

  return (
    <DocumentViewer
      title={title}
      subtitle={certificate.subtitle}
      pdfUrl={certificate.pdf}
      pdfFilename={buildCertificateDownloadFilename(slug)}
    />
  );
}
