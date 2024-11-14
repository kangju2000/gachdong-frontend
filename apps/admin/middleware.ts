import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { authApi, clubApi } from './apis/config/instance';
import { CookieManager } from './lib/auth/cookies';

const PUBLIC_PATHS = ['/login', '/forgot-password', '/signup'];

interface AuthCheckResult {
  isAuthorized: boolean;
  clubAccess?: boolean;
}

async function checkClubAuthority(clubId: string): Promise<boolean> {
  try {
    await clubApi.admin동아리Api.hasAuthority({ clubId });
    return true;
  } catch {
    return false;
  }
}

async function checkAdminAuth(): Promise<AuthCheckResult> {
  try {
    await authApi.관리자인증인가Api.getProfile1();
    return { isAuthorized: true };
  } catch {
    return { isAuthorized: false };
  }
}

async function refreshAuthToken(): Promise<boolean> {
  try {
    const { accessToken } = await authApi.관리자인증인가Api.refreshToken1();

    CookieManager.setToken({ accessToken: accessToken! });
    return true;
  } catch {
    CookieManager.removeAllToken();
    return false;
  }
}

export async function middleware(request: NextRequest) {
  // 공개 경로 처리
  if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // 동아리 대시보드 접근 권한 확인
  if (request.nextUrl.pathname.startsWith('/dashboard/')) {
    const [, , clubId] = request.nextUrl.pathname.split('/');
    // const hasClubAccess = await checkClubAuthority(String(clubId));

    // TODO: 동아리 대시보드 접근 권한 확인 로직 추가
    // if (!hasClubAccess) {
    //   return NextResponse.redirect(new URL('/dashboard', request.url));
    // }
  }

  // 관리자 인증 확인
  const authResult = await checkAdminAuth();

  if (authResult.isAuthorized) {
    // 루트 경로를 대시보드로 리다이렉트
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // 토큰 갱신 시도
  const tokenRefreshed = await refreshAuthToken();

  if (!tokenRefreshed) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
