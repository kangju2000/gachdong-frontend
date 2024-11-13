import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authApi, clubApi } from './apis/config/instance';

const PUBLIC_PATHS = ['/login', '/forgot-password', '/signup'];

export async function middleware(request: NextRequest) {
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  try {
    // if (request.nextUrl.pathname.startsWith('/dashboard/')) {
    //   const [, , clubId] = request.nextUrl.pathname.split('/');
    //   console.log({ clubId });
    //   const a = await clubApi.admin동아리Api.hasAuthority({ clubId: clubId as string });
    // }

    await authApi.관리자인증인가Api.getProfile1();

    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
