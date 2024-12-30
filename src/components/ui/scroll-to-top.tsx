"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    // Initial check
    toggleVisibility()
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  /* return (
    <>
      {isVisible && (
        <Button
          id="scroll-to-top"
          onClick={scrollToTop}
          // className="fixed bottom-8 right-8 p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg z-50"
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600/40 hover:bg-blue-700/50 text-white backdrop-blur-[2px]
// -          transition-all duration-300 hover:scale-105 active:scale-95"
          size="icon"
          aria-label="Scroll to top"
        >
          <ArrowUp strokeWidth={3} className="h-8 w-8" />
        </Button>
      )}
    </>
  ) */

  return (
    <div className={`md:hidden fixed bottom-16 right-6 z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-95' : 'opacity-0 pointer-events-none'
      }`}>
        <Button
          variant="default"
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600/40 hover:bg-blue-700/50 text-white backdrop-blur-[2px]
            transition-all duration-300 hover:scale-105 active:scale-95"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp strokeWidth={3} size={30} className="h-8 w-8" />
        </Button>
      </div>
  )
}