import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocumentViewer } from "@/components/documents/document-viewer";
import {
  getAllExperienceLetters,
  getExperienceLetterBySlug,
  getExperienceLetterOgImageUrl,
  getExperienceLetterShareUrl,
  resolveExperienceLetterText,
} from "@/lib/experience-letters";

export function generateStaticParams() {
  return getAllExperienceLetters().map((letter) => ({ slug: letter.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const letter = getExperienceLetterBySlug(slug);

  if (!letter) {
    return {};
  }

  const title = resolveExperienceLetterText(letter.title);
  const description = resolveExperienceLetterText(letter.description);
  const url = getExperienceLetterShareUrl(slug);
  const imageUrl = getExperienceLetterOgImageUrl(slug);

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

export default async function ExperienceLetterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const letter = getExperienceLetterBySlug(slug);

  if (!letter) {
    notFound();
  }

  const title = resolveExperienceLetterText(letter.title);
  const pdfFilename = `${slug}.pdf`;

  return (
    <DocumentViewer
      title={title}
      subtitle={letter.subtitle}
      pdfUrl={letter.pdf}
      pdfFilename={pdfFilename}
      previewImageUrl={`/${letter.previewRelativePath}`}
    />
  );
}
