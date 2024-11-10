// src/components/sections/education.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Certification {
  name: string
  issuer: string
  color: string
  textColor: string
  hoverColor: string
}

const certifications: Certification[] = [
  {
    name: "Professional Cloud Architect",
    issuer: "Google Cloud",
    color: "bg-blue-100",
    textColor: "text-gray-800",
    hoverColor: "hover:bg-blue-200"
  },
  {
    name: "Professional Cloud DevOps Engineer",
    issuer: "Google Cloud",
    color: "bg-green-100",
    textColor: "text-green-800",
    hoverColor: "hover:bg-green-200"
  },
  {
    name: "Professional Cloud Developer",
    issuer: "Google Cloud",
    color: "bg-purple-100",
    textColor: "text-purple-800",
    hoverColor: "hover:bg-purple-200"
  }
]

export function Education() {
  return (
    <Card className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl border border-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
          <GraduationCap className="mr-2 h-6 w-6 text-blue-600" /> Education & Certifications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">Computer Engineer, Information Technology</h3>
          <p className="text-gray-600">Universidad Tecnológica De Chile | 2005 - 2010</p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`${cert.color} ${cert.textColor} ${cert.hoverColor}`}
              >
                {cert.name} - {cert.issuer}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}