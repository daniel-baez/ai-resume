// src/app/(redirect)/page.tsx
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// Root page that redirects based on domain
export default async function Home() {
  // Get the host header from request headers
  const headersList = await headers();
  const domain = headersList.get("host") || "";

  // If the domain is danielbaez.cl, redirect to Spanish version
  if (domain.includes("danielbaez.cl")) {
    redirect("/es");
  }

  // Default to English version
  redirect("/en");
}
