import Link from "next/link"
import { Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-8 py-6 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6">
          <Link
            href="https://linkedin.com/in/baezdaniel"
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="social_link_click"
            data-track-label="linkedin"
            data-track-url="https://linkedin.com/in/baezdaniel"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>

          <Link
            href="https://github.com/daniel-baez"
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="social_link_click"
            data-track-label="github"
            data-track-url="https://github.com/daniel-baez"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
        
        <p className="mt-4 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Daniel Baez. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
