// src/components/sections/experience.tsx
import ReactMarkdown from 'react-markdown';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import '@/styles/markdown.css';
import { ExperienceProps } from "@/types/portfolio";

export function Experience({ experienceEntries }: ExperienceProps) {
  if (!experienceEntries) {
    return null;
  }

  return (
    <Card id="experience" className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl border border-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
          <Briefcase className="mr-2 h-6 w-6 text-blue-600" /> Work Experience
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {experienceEntries.map((experience, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-grey-800">{experience.title}</h3>
            <p className="text-grey-600 italic">{experience.company} / {experience.period}</p>
            <p className="text-gray-600 mb-2 italic">{experience.location}</p>
            <ReactMarkdown
              className="markdown-content mt-2 text-grey-700"
              skipHtml={true}
              allowedElements={['p', 'sup', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'b', 'strong']}
              components={{
                ul: ({ ...props }) => <ul className="list-disc list-inside text-gray-800 leading-relaxed" {...props} />,
                ol: ({ ...props }) => <ol className="list-decimal list-inside text-gray-800 leading-relaxed" {...props} />,
                li: ({ ...props }) => <li className="text-gray-800 leading-relaxed" {...props} />,
                b: ({ ...props }) => <b className="text-gray-800 leading-relaxed" {...props} />,
                strong: ({ ...props }) => <strong className="text-gray-800 leading-relaxed" {...props} />,
                a: ({ ...props }) => <a className="text-blue-600 hover:underline" {...props} />,
                p: ({ ...props }) => <p className="text-gray-800 leading-relaxed" {...props} />,
              }}
            >
              {experience.content}
            </ReactMarkdown>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}