// src/app/page.tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Summary } from "@/components/sections/summary";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Education } from "@/components/sections/education";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const getProfileData = () => {
  const profilePath = path.join(process.cwd(), "src/data/profile.json");
  const profileData = JSON.parse(fs.readFileSync(profilePath, "utf8"));
  return profileData;
};

const getSummaryData = () => {
  const summaryPath = path.join(process.cwd(), "src/data/summary.md");
  const summaryContent = fs.readFileSync(summaryPath, "utf8");
  return summaryContent;
};

// Get experience entries from src/data/experiences/*.md
const getExperienceEntries = () => {
  return fs.readdirSync(path.join(process.cwd(), "src/data/experiences"))
    .map((file) => {
      const filePath = path.join(process.cwd(), "src/data/experiences", file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        title: data.title,
        company: data.company,
        period: data.period,
        location: data.location,
        content: content,
        order: data.order,
      };
    })
    .sort((a, b) => a.order - b.order);
};

export default function Home() {
  const profileData = getProfileData();
  const summaryContent = getSummaryData();
  const experienceEntries = getExperienceEntries();

  console.log(experienceEntries.map((entry) => entry.order));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header {...profileData.info} />

        <main className="space-y-8">
          <Summary content={summaryContent} title="Professional Summary" />
          <Experience experienceEntries={experienceEntries} />
          <Skills skillCategories={profileData.skills} />
          <Education
            educationEntries={profileData.education}
            certifications={profileData.certifications}
            languages={profileData.languages}
          />
        </main>

        <Footer />
      </div>
    </div>
  );
}
