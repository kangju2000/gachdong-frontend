import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from '@/lib/auth/constants';
import { authApi } from './apis/config/instance';

const PRIVATE_ROUTES = ['/settings', '/mypage'];

export async function middleware(request: NextRequest) {
  // const token = request.cookies.get(AUTH_COOKIE_NAME);
  const isPrivateRoute = PRIVATE_ROUTES.includes(request.nextUrl.pathname);

  if (isPrivateRoute) {
    // access token 유효성 검사
    try {
      await authApi.인증인가Api.getProfile();

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // // refresh token 유효성 검사
    // const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE_NAME);

    // // TODO: refresh token 유효성 검사
    // if (refreshToken) {
    //   // 유효하면 access token 재발급
    //   // 유효하지 않으면 로그인 페이지로 리다이렉트
    //   return NextResponse.next();
    // }

    // return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
