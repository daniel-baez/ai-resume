import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Summary } from "@/components/sections/summary";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";

import { getProfileData, getSummaryData, getExperienceEntries } from "@/lib/data";
import { AVAILABLE_LANGUAGES } from "@/constants/i18n";
import { Metadata } from "next";

// This generates all supported language routes at build time
export function generateStaticParams() {
  return Object.values(AVAILABLE_LANGUAGES).map((lang) => ({
    lang: lang.code,
  }));
}

// Generate metadata for each language version
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang: langCode } = await params;
  const lang = langCode
    ? AVAILABLE_LANGUAGES[langCode as keyof typeof AVAILABLE_LANGUAGES]
    : AVAILABLE_LANGUAGES["en"];
  
  const profileData = getProfileData(lang);
  
  return {
    title: `${profileData.info.name} - ${profileData.info.title}`,
    description: profileData.info.subtitle,
  };
}

export default async function LangPage({
  params
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang: langCode } = await params;
  const lang = AVAILABLE_LANGUAGES[langCode as keyof typeof AVAILABLE_LANGUAGES] || AVAILABLE_LANGUAGES["en"];

  const profileData = getProfileData(lang);
  const summaryContent = getSummaryData(lang);
  const experienceEntries = getExperienceEntries(lang);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header {...profileData.info} currentLang={lang} />

        <main className="space-y-8">
          <Summary content={summaryContent} currentLang={lang} />
          <Experience experienceEntries={experienceEntries} currentLang={lang} />
          <Skills skillCategories={profileData.skills} currentLang={lang} />
          <Education
            educationEntries={profileData.education}
            certifications={profileData.certifications}
            languages={profileData.languages}
            currentLang={lang}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
} 