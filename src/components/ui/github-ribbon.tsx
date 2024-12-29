"use client"

import Link from "next/link"
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics'

export function GithubRibbon() {
  const { trackEvent } = useGoogleAnalytics()

  const handleClick = () => {
    trackEvent({
      action: 'click',
      category: 'social',
      label: 'github_ribbon'
    });
  };

  return (
    <div className="absolute top-0 right-0 w-[150px] h-[150px] overflow-hidden z-[1000] hidden md:block">
      <Link
        href="https://github.com/daniel-baez/ai-resume"
        className="absolute block w-[200px] py-[5px] bg-[#151513] text-white text-center font-bold text-sm leading-normal 
          no-underline top-[42px] shadow-[0_2px_3px_rgba(0,0,0,0.5)] rotate-45 origin-center
          hover:bg-[#e05a00] transition-colors duration-200"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        Fork me on GitHub
      </Link>
    </div>
  )
} 