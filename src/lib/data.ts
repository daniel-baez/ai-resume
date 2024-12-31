import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Language } from "@/constants/i18n";
import { ProfileData } from "@/types/portfolio";

export const getDataPath = (lang: Language) => {
  return path.join(process.cwd(), "src/data", lang.code);
};

export const getProfileData = (lang: Language): ProfileData => {
  const profilePath = path.join(getDataPath(lang), "profile.json");
  const profileData = JSON.parse(fs.readFileSync(profilePath, "utf8"));
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
      };
    })
    .filter(exp => !pdfVersion || exp.pdf)
    .sort((a, b) => a.order - b.order);
}; 