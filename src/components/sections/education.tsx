// src/components/sections/education.tsx
import React from 'react';
import { EducationProps } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getNextColor } from "@/lib/colors";
import { getTranslations } from "@/constants/translations"

export function Education({ educationEntries, certifications, languages, currentLang }: EducationProps) {
  const t = getTranslations(currentLang)
  
  if (!educationEntries || !certifications) {
    return null;
  }

  return (
    <Card id="education" className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl border border-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
          <GraduationCap className="mr-2 h-6 w-6 text-blue-600" /> {t.sections.education}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {educationEntries.map((education, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-gray-800">{education.title}</h3>
            <p className="text-gray-600">{education.institution} | {education.period}</p>
          </div>
        ))}

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.sections.languages}</h3>
          <div className="flex flex-col gap-2">
            {languages.map((language, index) => {
              const color = getNextColor();
              return (
                <div key={index} className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={`${color.color} ${color.textColor} ${color.hoverColor}`}
                  >
                    {language.name}&nbsp;|&nbsp;{language.level}
                  </Badge>
                  {language.certification && (
                    <a 
                      href={language.certification.url} 
                      target="_blank" 
                      className="text-blue-600 hover:underline text-sm ml-1"
                    >
                      {language.certification.name}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.sections.certifications}</h3>
          <div className="flex flex-col gap-2">
            {Object.entries(certifications).map(([certName, cert], index) => {
              const color = getNextColor();
              return (
                <div key={index} className="flex items-center gap-2">
                <Badge
                  key={index}
                  variant="secondary"
                  className={`${color.color} ${color.textColor} ${color.hoverColor}`}
                >
                  {certName} - {cert.issuer}
                </Badge>
              </div>
              );
            })}
          </div>
        </div>
      </CardContent>

    </Card>
  );
}