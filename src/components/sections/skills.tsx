// src/components/sections/skills.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code } from "lucide-react";
import { SkillsProps, Skill } from "@/types/portfolio";

/* skills is
    "Core Technologies": [
      {
        "name": "Cloud-Native Architecture",
        "color": "bg-blue-100",
        "textColor": "text-gray-800",
        "hoverColor": "hover:bg-blue-200"
      },
      {
        "name": "IoT",
        "color": "bg-purple-100",
        "textColor": "text-purple-800",
        "hoverColor": "hover:bg-purple-200"
      },
      {
        "name": "Microservices",
        "color": "bg-indigo-100",
        "textColor": "text-indigo-800",
        "hoverColor": "hover:bg-indigo-200"
      }
    ],
    "Programming Languages": [
      {
        "name": "Java",
        "color": "bg-blue-100",
        "textColor": "text-gray-800",
        "hoverColor": "hover:bg-blue-200"
      },
      {
        "name": "JavaScript",
        "color": "bg-yellow-100",
        "textColor": "text-yellow-800",
        "hoverColor": "hover:bg-yellow-200"
      },
      {
        "name": "Python",
        "color": "bg-green-100",
        "textColor": "text-green-800",
        "hoverColor": "hover:bg-green-200"
      }
    ],
    "Frameworks & Tools": [
      {
        "name": "React",
        "color": "bg-blue-100",
        "textColor": "text-gray-800",
        "hoverColor": "hover:bg-blue-200"
      },
      {
        "name": "Node.js",
        "color": "bg-green-100",
        "textColor": "text-green-800",
        "hoverColor": "hover:bg-green-200"
      },
      {
        "name": "MongoDB",
        "color": "bg-indigo-100",
        "textColor": "text-indigo-800",
        "hoverColor": "hover:bg-indigo-200"
      },
      {
        "name": "Redis",
        "color": "bg-red-100",
        "textColor": "text-red-800",
        "hoverColor": "hover:bg-red-200"
      }
    ]
  }
}
*/

export function Skills({ skillCategories }: SkillsProps) {
  if (!skillCategories) {
    return null;
  }

  return (
    <Card id="skills" className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl border border-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
          <Code className="mr-2 h-6 w-6 text-blue-600" /> Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(skillCategories).map(([categoryName, skills], index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{categoryName}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: Skill, idx: number) => (
                  <Badge
                    key={idx}
                    variant="secondary" 
                    className={`${skill.color} ${skill.textColor} ${skill.hoverColor}`}
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}