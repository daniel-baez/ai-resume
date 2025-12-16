import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Language } from "@/constants/i18n";
import { ProfileData, Skill } from "@/types/portfolio";

export const getDataPath = (lang: Language) => {
  return path.join(process.cwd(), "src/data", lang.code);
};

export const getProfileData = (lang: Language): ProfileData => {
  // Load the language-specific profile data
  const profilePath = path.join(getDataPath(lang), "profile.json");
  const profileData = JSON.parse(fs.readFileSync(profilePath, "utf8"));
  console.log("profileData", profileData);
  
  // Load the language-agnostic skills data
  const skillsPath = path.join(process.cwd(), "src/data", "skills.json");
  const skillsData = JSON.parse(fs.readFileSync(skillsPath, "utf8"));
  
  // Transform skills data into the expected format for the profile
  const skills: { [key: string]: Skill[] } = {};
  
  // Type assertion for the skills data structure
  type SkillCategory = {
    name: { [langCode: string]: string };
    skills: string[];
  };
  
  Object.entries(skillsData.categories).forEach((entry) => {
    const category = entry[1] as SkillCategory;
    // Use the translated category name for the current language
    const categoryName = category.name[lang.code] || category.name['en']; // Fallback to English
    
    // Convert skill strings to skill objects
    skills[categoryName] = category.skills.map((skillName) => ({
      name: skillName
    }));
  });
  
  // Replace the skills in the profile data with our transformed skills
  profileData.skills = skills;
  
  return profileData;
};

export const getSummaryData = (lang: Language) => {
  const summaryPath = path.join(getDataPath(lang), "summary.md");
  const summaryContent = fs.readFileSync(summaryPath, "utf8");
  return summaryContent;
};

export const getExperienceEntries = (lang: Language, pdfVersion: boolean = false) => {
  return fs.readdirSync(path.join(getDataPath(lang), "experiences"))
    .map((file) => {
      const filePath = path.join(getDataPath(lang), "experiences", file);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      return {
        title: data.title,
        company: data.company,
        period: data.period,
        location: data.location,
        content: content,
        order: data.order,
        pdf: data.pdf || false,
        experience_letter: data.experience_letter || undefined,
      };
    })
    .filter(exp => !pdfVersion || exp.pdf)
    .sort((a, b) => a.order - b.order);
}; 