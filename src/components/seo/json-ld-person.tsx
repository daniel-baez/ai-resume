import { getSiteUrl } from "@/lib/site-url";

interface JsonLdPersonProps {
  name: string;
  jobTitle: string;
  description: string;
  location: string;
  lang: string;
}

export function JsonLdPerson({ name, jobTitle, description, location, lang }: JsonLdPersonProps) {
  const baseUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: location,
    },
    url: `${baseUrl}/${lang}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
