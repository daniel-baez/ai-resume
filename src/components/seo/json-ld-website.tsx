import { getSiteUrl } from "@/lib/site-url";

interface JsonLdWebSiteProps {
  name: string;
  lang: string;
}

export function JsonLdWebSite({ name, lang }: JsonLdWebSiteProps) {
  const baseUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url: `${baseUrl}/${lang}`,
    inLanguage: lang,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
