import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { geolocation } from '@vercel/edge'

const SPANISH_COUNTRIES = ['ES', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY']

export function middleware(request: NextRequest) {
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
  matcher: '/',
} 