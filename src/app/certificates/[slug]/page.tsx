import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCertificates,
  getCertificateBySlug,
  getCertificateOgImageUrl,
  getCertificateShareUrl,
  resolveCertificateText,
} from "@/lib/certificates";
import { getSiteUrl } from "@/lib/site-url";

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
  const description = resolveCertificateText(certificate.description);
  const imageUrl = `${getSiteUrl()}/certificates/og/${slug}.jpg`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg border border-blue-100 p-8 text-center space-y-6">
        <div>
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
            Certificate
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">{title}</h1>
          <p className="text-gray-600 mt-2">{certificate.issuer}</p>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={title}
          className="w-full rounded-lg border border-gray-200 shadow-sm"
        />

        <a
          href={certificate.pdf}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          Open PDF certificate
        </a>
      </div>
    </main>
  );
}
