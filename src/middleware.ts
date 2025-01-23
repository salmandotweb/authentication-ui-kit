import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
   const token = request.cookies.get('authToken')?.value;
   const isAuthRoute = request.nextUrl.pathname === '/sign-in' || request.nextUrl.pathname === '/sign-up' || request.nextUrl.pathname === '/verify' || request.nextUrl.pathname === '/forgot-password' || request.nextUrl.pathname === '/reset-password';
   const landingPage = request.nextUrl.pathname === '/';

   if (isAuthRoute) {
      if (token) {
         // Redirect to the dashboard if there's a token on the auth route
         return NextResponse.redirect(new URL('/dashboard', request.url));
      }
      return NextResponse.next();
   }

   if (!token && !landingPage) {
      // Redirect to the auth page (root) if there's no token
      return NextResponse.redirect(new URL('/sign-in', request.url));
   }

   // If there's a token, allow access to all non-auth routes
   return NextResponse.next();
}

export const config = {
   matcher: [
      "/((?!api|_next/static|_next/image|images|videos|terms|privacy|favicon.ico|sign-up|sign-in\\?.*|verify$|forgot-password|reset-password|solutions|about|contact|faq|legal).*)",
   ],
};