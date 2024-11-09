import { OptionsType } from 'cookies-next/lib/types';

export const AUTH_COOKIE_NAME = 'access_token';
export const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';
export const COOKIE_OPTIONS: OptionsType = {
  path: '/',
  maxAge: 60 * 60 * 24, // 1 day
};

export const REFRESH_TOKEN_COOKIE_OPTIONS: OptionsType = {
  ...COOKIE_OPTIONS,
  maxAge: 60 * 60 * 24 * 30, // 30 days
};
