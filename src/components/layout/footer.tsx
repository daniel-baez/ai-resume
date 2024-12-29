// src/components/layout/footer.tsx
"use client"

import Link from "next/link"
import { Linkedin, Twitter, Github } from "lucide-react"
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'

export function Footer() {
  const { trackEvent } = useGoogleAnalytics()

  const handleSocialClick = (platform: string) => {
    trackEvent({
      action: 'click',
      category: 'social',
      label: `social_${platform}`
    });
  };

  return (
    <footer className="mt-8 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6">
          <Link
            href="https://linkedin.com/in/baezdaniel"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('linkedin')}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>

          <Link
            href="https://twitter.com/daplay"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('twitter')}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>

          <Link
            href="https://github.com/daniel-baez"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick('github')}
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
        
        <p className="mt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Daniel Baez. All rights reserved.
        </p>
      </div>
    </footer>
  )
}