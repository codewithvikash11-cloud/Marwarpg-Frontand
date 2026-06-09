import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Secret key for edge runtime
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define protected routes prefix
  const isProtectedAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  
  // Protect API routes except auth and seed
  const isProtectedApiRoute = pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth') && !pathname.startsWith('/api/admin/seed');

  if (isProtectedAdminRoute || isProtectedApiRoute) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      if (isProtectedApiRoute) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
      // Redirect to login for pages
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify JWT token using jose (Next.js Edge runtime compatible)
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      if (isProtectedApiRoute) {
        return NextResponse.json({ message: 'Unauthorized or token expired' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
};
