// src/app/page.tsx
import { redirect } from "next/navigation";

// Root page that redirects to default language
export default function Home() {
  // Redirect to the default language page
  redirect("/en");
}