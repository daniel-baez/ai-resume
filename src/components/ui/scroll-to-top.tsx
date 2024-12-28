"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { trackEvent } = useGoogleAnalytics()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    trackEvent({
      action: 'scroll',
      category: 'navigation',
      label: 'scroll_to_top'
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <div className={`fixed bottom-8 right-8 z-50 transition-opacity duration-200 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <Button
        variant="default"
        size="icon"
        className="h-10 w-10 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  )
} 