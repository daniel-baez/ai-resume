/**
 * Base URL del sitio para SEO (sitemap, robots, metadata).
 * Prioridad: NEXT_PUBLIC_SITE_URL > VERCEL_URL (Vercel) > localhost
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
