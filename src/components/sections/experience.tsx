   // src/components/sections/experience.tsx
   import fs from 'fs';
   import path from 'path';
   import matter from 'gray-matter';
   import ReactMarkdown from 'react-markdown';
   import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
   import { Briefcase } from "lucide-react";
   import '@/styles/markdown.css';

   interface Experience {
     title: string;
     company: string;
     period: string;
     location: string;
     content: string;
     order: number;
   }

   function getExperiences(): Experience[] {
     const experiencesDir = path.join(process.cwd(), 'src/data/experiences');
     const filenames = fs.readdirSync(experiencesDir);

     const experiences = filenames.map(filename => {
       const filePath = path.join(experiencesDir, filename);
       const fileContents = fs.readFileSync(filePath, 'utf8');
       const { data, content } = matter(fileContents);

       return {
         title: data.title,
         company: data.company,
         period: data.period,
         location: data.location,
         content: content,
         order: data.order
       };
     });

     // Sort experiences by the order field
     return experiences.sort((a, b) => a.order - b.order);
   }

   export function Experience() {
     const experiences = getExperiences();

     return (
       <Card className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl border border-blue-100">
         <CardHeader>
           <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
             <Briefcase className="mr-2 h-6 w-6 text-blue-600" /> Work Experience
           </CardTitle>
         </CardHeader>
         <CardContent className="space-y-6">
           {experiences.map((experience, index) => (
             <div key={index}>
               <h3 className="text-xl font-semibold text-grey-800">{experience.title}</h3>
               <p className="text-grey-600 italic">{experience.company} / {experience.period}</p>
               <p className="text-gray-600 mb-2 italic">{experience.location}</p>
               <ReactMarkdown
                 className="markdown-content mt-2 text-grey-700"
                 skipHtml={true}
                 allowedElements={['p', 'sup']}
                 components={{
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