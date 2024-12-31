// src/components/sections/skills.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import { SkillsProps, Skill } from "@/types/portfolio";
import { getNextColor } from "@/lib/colors";
import { getTranslations } from "@/constants/translations"

export function Skills({ skillCategories, currentLang }: SkillsProps) {
  const t = getTranslations(currentLang)
  
  if (!skillCategories) {
    return null;
  }
  
  return (
    <Card id="skills" className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl border border-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
          <Code className="mr-2 h-6 w-6 text-blue-600" /> {t.sections.skills}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(skillCategories).map(([categoryName, skills], index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{categoryName}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: Skill, idx: number) => {
                  const color = getNextColor();
                  return (
                    <Badge
                      key={idx}
                      variant="secondary" 
                      className={`${color.color} ${color.textColor} ${color.hoverColor}`}
                    >
                      {skill.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}