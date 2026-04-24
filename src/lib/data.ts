import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Language } from "@/constants/i18n";
import { ProfileData, Skill } from "@/types/portfolio";

export const getDataPath = (lang: Language) => {
  return path.join(process.cwd(), "src/data", lang.code);
};

type TranslatableString = { [langCode: string]: string };

const resolve = (value: TranslatableString | string, langCode: string): string => {
  if (typeof value === "string") return value;
  return value[langCode] || value["en"];
};

export const getProfileData = (lang: Language): ProfileData => {
  const dataDir = path.join(process.cwd(), "src/data");

  const raw = JSON.parse(fs.readFileSync(path.join(dataDir, "profile.json"), "utf8"));
  const skillsData = JSON.parse(fs.readFileSync(path.join(dataDir, "skills.json"), "utf8"));

  type SkillCategory = {
    name: TranslatableString;
    skills: string[];
  };

  const skills: { [key: string]: Skill[] } = {};
  Object.entries(skillsData.categories).forEach((entry) => {
    const category = entry[1] as SkillCategory;
    const categoryName = category.name[lang.code] || category.name["en"];
    skills[categoryName] = category.skills.map((skillName) => ({ name: skillName }));
  });

  const certifications: { [name: string]: { issuer: string; period: string } } = {};
  for (const cert of raw.certifications) {
    certifications[resolve(cert.name, lang.code)] = {
      issuer: cert.issuer,
      period: cert.period,
    };
  }

  return {
    info: {
      name: resolve(raw.info.name, lang.code),
      title: resolve(raw.info.title, lang.code),
      subtitle: resolve(raw.info.subtitle, lang.code),
      calendlyUrl: raw.info.calendlyUrl,
      location: raw.info.location,
    },
    education: raw.education.map((e: { title: TranslatableString; period: string; institution: string }) => ({
      title: resolve(e.title, lang.code),
      period: e.period,
      institution: e.institution,
    })),
    languages: raw.languages.map((l: { name: TranslatableString; level: TranslatableString; certifications?: { name: string; url: string }[] }) => ({
      name: resolve(l.name, lang.code),
      level: resolve(l.level, lang.code),
      ...(l.certifications && { certifications: l.certifications }),
    })),
    certifications,
    softSkills: raw.softSkills.map((s: { name: TranslatableString; url?: string; issuer: string }) => ({
      name: resolve(s.name, lang.code),
      url: s.url,
      issuer: s.issuer,
    })),
    skills,
  };
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