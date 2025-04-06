// src/components/layout/header.tsx
"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ContactForm } from "@/components/forms/contact-form"
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'
import { Language, AVAILABLE_LANGUAGES } from "@/constants/i18n"
import { useRouter } from "next/navigation"
import { getTranslations } from "@/constants/translations"
import { HeaderProps } from "@/types/portfolio"


export function Header({
  name,
  title,
  subtitle,
  calendlyUrl,
  currentLang
}: HeaderProps & { currentLang: Language }) {
  const { trackEvent } = useGoogleAnalytics()
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const t = getTranslations(currentLang)

  useEffect(() => {
    // Only run this on the client side
    if (typeof window === 'undefined') return;

    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        setHeaderHeight(height);
      }
    };

    // Initial measurement
    updateHeaderHeight();

    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []); // Empty dependency array means this runs once on mount

  const scrollToSection = async (sectionId: string) => {
    // Only run this on the client side
    if (typeof window === 'undefined') return;

    const element = document.getElementById(sectionId);
    const header = document.getElementById("header");

    if (element) {
      const isMobile = window.innerWidth < 768;
      const headerOffset = 20;
      const elementPosition = element.getBoundingClientRect().top;
      const expandedHeaderHeight = header?.getBoundingClientRect()?.height || 0;

      const offsetPosition = (() => {
        if (isMobile) {
          return (elementPosition - expandedHeaderHeight + window.scrollY - headerOffset + headerHeight)
        } else {
          return elementPosition - headerHeight + window.scrollY - headerOffset;
        }
      })()

      await trackEvent({
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

  // For contact form
  const handleContactOpen = async (open: boolean) => {
    await trackEvent({
      action: 'click',
      category: 'engagement',
      label: 'open_contact_form'
    });
    setIsContactOpen(open);
  };

  // For resume download
  const handleResumeClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await trackEvent({
      action: 'click',
      category: 'engagement',
      label: 'download_resume'
    });
    // Use the correct path without Next.js parameters
    const pdfUrl = `/pdfs/resume-${currentLang.code}.pdf`;
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  // For calendly meeting
  const handleCalendlyClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await trackEvent({
      action: 'click',
      category: 'engagement',
      label: 'schedule_meeting'
    });
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  // For language change
  const handleLanguageChange = async (lang: Language) => {
    await trackEvent({
      action: 'click',
      category: 'preferences',
      label: `change_language_${lang.code}`
    });
    
    // Navigate to the language-specific page
    router.push(`/${lang.code}`);
  }

  const navigationItems = [
    { id: 'summary', label: t.navigation.about },
    { id: 'experience', label: t.navigation.experience },
    { id: 'skills', label: t.navigation.skills },
    { id: 'education', label: t.navigation.education }
  ]

  return (
    <div ref={headerRef} id="header" className="md:sticky md:top-4 z-50 mb-8">
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

          <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col items-center md:items-end space-y-4 mt-2`}>
            <div className="flex flex-col items-stretch md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
              <ContactForm isOpen={isContactOpen} onOpenChange={handleContactOpen} currentLang={currentLang} />
              <Link 
                href={`/pdfs/resume-${currentLang.code}.pdf`} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleResumeClick}
                prefetch={false}
              >
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Download className="mr-2 h-4 w-4" /> {t.actions.downloadResume}
                </Button>
              </Link>
              <Link 
                href={calendlyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleCalendlyClick}
                prefetch={false}
              >
                <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Calendar className="mr-2 h-4 w-4" /> {t.actions.scheduleMeeting}
                </Button>
              </Link>
            </div>

            <nav className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              {navigationItems.map(({ id, label }) => (
                <button 
                  key={id}
                  onClick={() => {
                    scrollToSection(id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full md:w-auto px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-all duration-200"
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 flex items-center space-x-1.5 opacity-60 hover:opacity-100 transition-opacity duration-200">
          {Object.values(AVAILABLE_LANGUAGES).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`w-6 h-4 overflow-hidden hover:ring-1 ring-blue-400 transition-all duration-200 transform hover:scale-110 rounded-sm ${
                currentLang === lang ? 'ring-2' : ''
              }`}
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
