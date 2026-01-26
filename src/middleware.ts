import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /docs → /en/docs
  if (pathname === '/docs') {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}/docs`;
    return NextResponse.redirect(url);
  }

  // /docs/authforge/** → /en/docs/authforge/**
  if (pathname.startsWith('/docs/authforge')) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/docs', '/docs/authforge/:path*'],
};
