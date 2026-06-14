import { SAME_AS_URLS } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

interface JsonLdPersonProps {
  name: string;
  jobTitle: string;
  description: string;
  location: string;
  lang: string;
  knowsAbout?: string[];
  worksFor?: string;
}

export function JsonLdPerson({
  name,
  jobTitle,
  description,
  location,
  lang,
  knowsAbout,
  worksFor,
}: JsonLdPersonProps) {
  const baseUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    image: `${baseUrl}/og-image.png`,
    sameAs: SAME_AS_URLS,
    address: {
      "@type": "PostalAddress",
      addressLocality: location,
    },
    url: `${baseUrl}/${lang}`,
    ...(knowsAbout && knowsAbout.length > 0 && { knowsAbout }),
    ...(worksFor && {
      worksFor: {
        "@type": "Organization",
        name: worksFor,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
