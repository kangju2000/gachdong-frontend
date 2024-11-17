'use server';

import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME, COOKIE_OPTIONS, REFRESH_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_OPTIONS } from './constants';
import type { TokenPayload } from './types';

export async function setTokens({ accessToken, refreshToken }: TokenPayload) {
  const cookieStore = cookies();

  cookieStore.set({
    name: AUTH_COOKIE_NAME,
    value: accessToken,
    ...COOKIE_OPTIONS,
  });

  if (refreshToken) {
    cookieStore.set({
      name: REFRESH_TOKEN_COOKIE_NAME,
      value: refreshToken,
      ...REFRESH_TOKEN_COOKIE_OPTIONS,
    });
  }
}

export async function removeTokens() {
  const cookieStore = cookies();

  cookieStore.delete(AUTH_COOKIE_NAME);
  cookieStore.delete(REFRESH_TOKEN_COOKIE_NAME);
}
