// src/components/sections/summary.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code } from "lucide-react"

export function Summary() {
  return (
    <Card className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl border border-blue-100">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-blue-900 flex items-center">
          <Code className="mr-2 h-6 w-6 text-blue-600" /> Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-800 leading-relaxed">
          I am a Chilean software engineer who learned to code early in life and have spent the past 16 years cultivating a career defined by curiosity and impact. My experience spans a diverse range of technical challenges—from developing web, mobile and cloud-native solutions, to social and financial networks, while building scalable software platforms and designing complex IoT architectures. As a generalist, I excel in adapting to evolving tech landscapes, I’m equipped to manage Unix-based systems with ease. My deep exposure to cloud elastic infrastructures has equipped me to optimize product reliability and operational excellence across the stack.
        </p>
        <br />
        <p className="text-gray-800 leading-relaxed">
          Throughout my career, I&apos;ve thrived in environments that hustle for success and embrace rapid iteration driven by data. I&apos;ve held roles from individual contributor to technical leader, all driven by a commitment to crafting software that meets real-world needs and withstands the test of scale and complex business demands. To me, software engineering is both a craft and a mission that I live with passion.
        </p>
      </CardContent>
    </Card>
  )
}