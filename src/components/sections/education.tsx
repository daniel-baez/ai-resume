// src/components/sections/education.tsx
import React from 'react';
import { EducationProps } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Education({ educationEntries, certifications }: EducationProps) {
  if (!educationEntries || !certifications) {
    return null;
  }

  return (
    <Card className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl border border-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
          <GraduationCap className="mr-2 h-6 w-6 text-blue-600" /> Education
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
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(certifications).map(([certName, cert], index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${cert.color} ${cert.textColor} ${cert.hoverColor}`}
              >
                {certName} - {cert.issuer}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

    </Card>
  );
}