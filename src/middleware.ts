import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { geolocation } from '@vercel/edge'

const SPANISH_COUNTRIES = ['ES', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY']
// Simple in-memory rate limiting with cleanup
const RATE_LIMIT_DURATION = 60 * 1000 // 1 minute
const MAX_REQUESTS = 60 // max requests per minute
const CLEANUP_INTERVAL = 5 * 60 * 1000 // Clean up every 5 minutes
const ipRequests = new Map<string, { count: number; timestamp: number }>()

// Cleanup function
function cleanupOldEntries() {
  const now = Date.now()
  for (const [ip, data] of ipRequests.entries()) {
    if (now - data.timestamp > RATE_LIMIT_DURATION) {
      ipRequests.delete(ip)
    }
  }
}

// Start periodic cleanup
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupOldEntries, CLEANUP_INTERVAL)
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const requestData = ipRequests.get(ip)

  // Clean up old entries on each check
  if (now % 100 === 0) { // Only run cleanup occasionally
    cleanupOldEntries()
  }

  if (!requestData) {
    ipRequests.set(ip, { count: 1, timestamp: now })
    return false
  }

  if (now - requestData.timestamp > RATE_LIMIT_DURATION) {
    ipRequests.set(ip, { count: 1, timestamp: now })
    return false
  }

  if (requestData.count >= MAX_REQUESTS) {
    return true
  }

  requestData.count++
  return false
}

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return new NextResponse('Too many requests', { status: 429 })
  }

  // Get user's preferred languages and hostname
  const acceptLang = request.headers.get('accept-language')?.split(',')[0]
  const hostname = request.headers.get('host')
  
  // Check hostname first (highest priority)
  if (hostname === 'danielbaez.cl' || hostname === 'www.danielbaez.cl') {
    if (!request.nextUrl.searchParams.has('lang')) {
      const newUrl = new URL(request.url)
      newUrl.searchParams.set('lang', 'es')
      return NextResponse.redirect(newUrl)
    }
    return NextResponse.next()
  }

  // Then check geolocation and browser preference
  const { country } = geolocation(request)
  const shouldUseSpanish = 
    acceptLang?.startsWith('es') || 
    (country && SPANISH_COUNTRIES.includes(country))
  
  // Only set language if not already set
  if (!request.nextUrl.searchParams.has('lang')) {
    const newUrl = new URL(request.url)
    newUrl.searchParams.set('lang', shouldUseSpanish ? 'es' : 'en')
    return NextResponse.redirect(newUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/resume/:lang*'],
} 