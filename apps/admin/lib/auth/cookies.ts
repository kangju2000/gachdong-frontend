import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import type { TokenPayload } from './types';
import { AUTH_COOKIE_NAME, COOKIE_OPTIONS, REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS } from './constants';

export class CookieManager {
  static getClientAccessToken() {
    return getCookie(AUTH_COOKIE_NAME) ?? null;
  }

  static getClientRefreshToken() {
    return getCookie(REFRESH_TOKEN_COOKIE_NAME) ?? null;
  }

  static async getServerAccessToken() {
    const { cookies } = await import('next/headers');
    return getCookie(AUTH_COOKIE_NAME, { cookies }) ?? null;
  }

  static async getServerRefreshToken() {
    const { cookies } = await import('next/headers');
    return getCookie(REFRESH_TOKEN_COOKIE_NAME, { cookies }) ?? null;
  }

  static setToken({ accessToken, refreshToken }: TokenPayload): void {
    setCookie(AUTH_COOKIE_NAME, accessToken, COOKIE_OPTIONS);
    if (refreshToken) {
      setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);
    }
  }

  static removeAllToken(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  static removeAccessToken(): void {
    deleteCookie(AUTH_COOKIE_NAME);
  }

  static removeRefreshToken(): void {
    deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
  }
}
