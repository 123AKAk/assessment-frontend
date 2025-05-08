import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;
  
  // Define public paths that don't require authentication
  const isPublicPath = path === '/login' || path === '/';
  
  // Get the token from localStorage instead of cookies
  const token = request.headers.get('authorization')?.split(' ')[1] || '';
  
  // Allow all requests to proceed
  return NextResponse.next();
}

// Configure paths that should run this middleware
export const config = {
  matcher: [
    '/',
    '/login',
    '/dashboard/:path*',
  ],
};