import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentViewer } from "@/components/documents/document-viewer";
import { buildResumeDownloadFilename } from "@/lib/download-filename";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import {
  getResumeDocuments,
  getDocumentPreviewUrl,
  resolveDocumentText,
} from "@/lib/document-sources";
import { getSiteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return Object.keys(AVAILABLE_LANGUAGES).map((lang) => ({ lang }));
}

function getResumeDocument(lang: string) {
  return getResumeDocuments().find((doc) => doc.slug === lang);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const resume = getResumeDocument(lang);

  if (!resume) {
    return {};
  }

  const title = resolveDocumentText(resume.title, lang);
  const description = resolveDocumentText(resume.description, lang);
  const url = `${getSiteUrl()}${resume.sharePath}`;
  const imageUrl = getDocumentPreviewUrl(resume.previewRelativePath);

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

export default async function ResumePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!Object.keys(AVAILABLE_LANGUAGES).includes(lang)) {
    notFound();
  }

  const resume = getResumeDocument(lang);

  if (!resume) {
    notFound();
  }

  const title = resolveDocumentText(resume.title, lang);

  return (
    <DocumentViewer
      title={title}
      subtitle={resume.subtitle}
      pdfUrl={resume.pdf}
      pdfFilename={buildResumeDownloadFilename(lang)}
      homeHref={`/${lang}`}
      currentLang={AVAILABLE_LANGUAGES[lang]}
    />
  );
}
