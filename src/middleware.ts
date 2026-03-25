import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { geolocation } from '@vercel/edge'

const SPANISH_COUNTRIES = ['ES', 'MX', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY']

export function middleware(request: NextRequest) {
  const acceptLang = request.headers.get('accept-language')?.split(',')[0]
  const hostname = request.headers.get('host')

  if (hostname === 'danielbaez.cl' || hostname === 'www.danielbaez.cl') {
    return NextResponse.redirect(new URL('/es', request.url))
  }

  const { country } = geolocation(request)
  const shouldUseSpanish =
    acceptLang?.startsWith('es') ||
    (country && SPANISH_COUNTRIES.includes(country))

  const targetLang = shouldUseSpanish ? 'es' : 'en'
  return NextResponse.redirect(new URL(`/${targetLang}`, request.url))
}

export const config = {
  matcher: '/',
}
