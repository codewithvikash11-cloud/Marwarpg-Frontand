import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Secret key for edge runtime
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Protect Admin routes
  const isProtectedAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
  const isProtectedApiRoute = pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/auth') && !pathname.startsWith('/api/admin/seed');

  // Protect Student routes
  const isProtectedStudentRoute = pathname.startsWith('/student') && !pathname.startsWith('/student/login');
  const isProtectedStudentApiRoute = pathname.startsWith('/api/student') && !pathname.startsWith('/api/student/auth');

  if (isProtectedAdminRoute || isProtectedApiRoute) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      if (isProtectedApiRoute) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, SECRET);
    } catch (error) {
      if (isProtectedApiRoute) {
        return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  if (isProtectedStudentRoute || isProtectedStudentApiRoute) {
    const token = request.cookies.get('student_token')?.value;

    if (!token) {
      if (isProtectedStudentApiRoute) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/student/login', request.url));
    }

    try {
      await jwtVerify(token, SECRET);
    } catch (error) {
      if (isProtectedStudentApiRoute) {
        return NextResponse.json({ success: false, message: 'Invalid or expired token' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/student/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/student/:path*'
  ]
};
