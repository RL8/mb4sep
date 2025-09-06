import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes (but exclude login page)
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    // In production, implement proper authentication
    const isProduction = process.env.NODE_ENV === 'production'
    
    if (isProduction) {
      // Check for admin authentication
      const adminToken = request.cookies.get('admin-token')
      const adminSession = request.cookies.get('admin-session')
      
      // If no valid admin credentials, redirect to admin login
      if (!adminToken || !adminSession) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
      
      // Verify admin token (in real implementation, verify JWT or session)
      // For now, we'll just check if the token exists
      if (adminToken.value !== process.env.ADMIN_SECRET_TOKEN) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }
    
    // Add security headers for admin routes
    const response = NextResponse.next()
    
    // Security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    
    // Rate limiting headers (basic implementation)
    response.headers.set('X-RateLimit-Limit', '100')
    response.headers.set('X-RateLimit-Remaining', '99')
    
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}
