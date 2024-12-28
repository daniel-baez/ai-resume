// src/components/layout/header.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ContactForm } from "@/components/forms/contact-form"
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'
import { HeaderProps } from '@/types/portfolio'

const languages = [
  { code: 'en', name: 'English', flag: '/flags/us.svg' },
  { code: 'es', name: 'Español', flag: '/flags/es.svg' }
  // { code: 'fr', name: 'Français', flag: '/flags/fr.svg' },
  // { code: 'de', name: 'Deutsch', flag: '/flags/de.svg' }
]

export function Header({ name, title, subtitle, resumeUrl, calendlyUrl }: HeaderProps) {
  const { trackEvent } = useGoogleAnalytics()
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const isMobile = window.innerWidth < 768; // 768px est le breakpoint md de Tailwind
      const headerOffset = isMobile ? 20 : 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      // Track the scroll event
      trackEvent({
        action: 'scroll',
        category: 'navigation',
        label: `scroll_to_${sectionId}`
      });

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleResumeDownload = () => {
    trackEvent({
      action: 'download',
      category: 'resume',
      label: 'resume_download'
    })
    
    window.open(resumeUrl, '_blank')
  }

  return (
    <div className="md:sticky md:top-4 z-50 mb-8">
      <header className="relative bg-white bg-opacity-80 backdrop-filter shadow-lg rounded-2xl p-8 transition-all duration-300 hover:shadow-xl border border-blue-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <h1 className="text-4xl font-extrabold text-blue-900 mb-2">{name}</h1>
              <p className="text-xl text-gray-700 font-light">{title}</p>
              <p className="text-sm text-gray-700 font-light">{subtitle}</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col items-center md:items-end space-y-4`}>
            <div className="flex flex-col items-stretch md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <ContactForm isOpen={isContactOpen} onOpenChange={setIsContactOpen} />
              <Link href={resumeUrl} target="_blank" rel="noopener noreferrer" download className="w-full md:w-auto">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50" 
                  onClick={handleResumeDownload}
                >
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Button>
              </Link>
              <Link href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto">
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Calendar className="mr-2 h-4 w-4" /> Schedule a Meeting
                </Button>
              </Link>
            </div>

            <nav className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              {[
                { id: 'summary', label: 'About' },
                { id: 'experience', label: 'Experience' },
                { id: 'skills', label: 'Skills' },
                { id: 'education', label: 'Education' }
              ].map(({ id, label }) => (
                <button 
                  key={id}
                  onClick={() => {
                    scrollToSection(id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full md:w-auto px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        <div className="absolute bottom-2 right-2 flex items-center space-x-1.5 opacity-60 hover:opacity-100 transition-opacity duration-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className="w-6 h-4 overflow-hidden hover:ring-1 ring-blue-400 transition-all duration-200 transform hover:scale-110 rounded-sm"
              title={lang.name}
            >
              <Image
                src={lang.flag}
                alt={lang.name}
                width={24}
                height={16}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </header>
    </div>
  )
}
