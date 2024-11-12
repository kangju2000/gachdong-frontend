import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import type { TokenPayload } from './types';
import { AUTH_COOKIE_NAME, COOKIE_OPTIONS, REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS } from './constants';

export class CookieManager {
  static getClientToken() {
    return getCookie(AUTH_COOKIE_NAME) ?? null;
  }

  static async getServerToken() {
    const { cookies } = await import('next/headers');
    return getCookie(AUTH_COOKIE_NAME, { cookies }) ?? null;
  }

  static setToken({ accessToken, refreshToken }: TokenPayload): void {
    setCookie(AUTH_COOKIE_NAME, accessToken, COOKIE_OPTIONS);
    if (refreshToken) {
      setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
    }
  }

  static removeToken(): void {
    deleteCookie(AUTH_COOKIE_NAME);
    deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
  }
}
