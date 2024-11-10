// src/components/layout/header.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Download } from "lucide-react"
import Link from "next/link"
import { ContactForm } from "@/components/forms/contact-form"

export function Header() {
  const [isContactOpen, setIsContactOpen] = useState(false)

  return (
    <header className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg rounded-2xl mb-8 p-8 transition-all duration-300 hover:shadow-xl border border-blue-100">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-center sm:text-left mb-6 sm:mb-0">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Daniel Baez</h1>
          <p className="text-xl text-gray-700 font-light">Software Engineer & Cloud Architect</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <ContactForm isOpen={isContactOpen} onOpenChange={setIsContactOpen} />
          <Link href="/resume-2024-11.pdf" target="_blank" rel="noopener noreferrer" download>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50" >
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Button>
              </Link>
          <Link href="https://calendly.com/daniel-baezdaniel" target="_blank" rel="noopener noreferrer">
            <Button variant="default" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
              <Calendar className="mr-2 h-4 w-4" /> Schedule a Meeting
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}