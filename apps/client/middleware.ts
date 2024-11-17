import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@/lib/auth/constants';
import { authApi } from './apis/config/instance';

const STATIC_PRIVATE_ROUTES = ['/mypage', '/settings'];
const DYNAMIC_PRIVATE_ROUTES = [
  {
    pattern: /^\/clubs\/\d+\/recruits\/\d+\/apply$/,
    test: (pathname: string) => /^\/clubs\/\d+\/recruits\/\d+\/apply$/.test(pathname),
  },
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isPrivateRoute =
    STATIC_PRIVATE_ROUTES.includes(pathname) || DYNAMIC_PRIVATE_ROUTES.some(route => route.test(pathname));

  // TODO: Refresh token -> 재발급 로직 추가
  if (isPrivateRoute) {
    try {
      await authApi.사용자인증인가Api.getProfile();
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
