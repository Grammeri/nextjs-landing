import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEFAULT_LOCALE = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Internal Admin Guard (HTTP Basic Auth)
  if (pathname.startsWith('/internal-admin')) {
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Internal Admin"',
        },
      });
    }

    const [type, value] = authHeader.split(' ');

    if (type !== 'Basic' || !value) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const decoded = Buffer.from(value, 'base64').toString();
    const [username, password] = decoded.split(':');

    if (username !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASSWORD) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    return NextResponse.next();
  }

  // Docs locale redirects
  if (pathname === '/docs') {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}/docs`;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith('/docs/authforge')) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/docs', '/docs/authforge/:path*', '/internal-admin', '/internal-admin/:path*'],
};
