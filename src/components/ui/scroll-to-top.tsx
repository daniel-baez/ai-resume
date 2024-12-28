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
    <div className={`md:hidden fixed bottom-16 right-4 z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <Button
        variant="default"
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg bg-blue-600/40 hover:bg-blue-700/50 text-white backdrop-blur-[2px]
          transition-all duration-300 hover:scale-105 active:scale-95"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-7 w-7 stroke-[3]" />
      </Button>
    </div>
  )
} 