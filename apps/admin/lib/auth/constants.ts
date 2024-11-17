import { OptionsType } from 'cookies-next/lib/types';

const isDEV = process.env.NODE_ENV === 'development';

export const AUTH_COOKIE_NAME = isDEV ? 'access_token_dev_client' : 'access_token';
export const REFRESH_TOKEN_COOKIE_NAME = isDEV ? 'refresh_token_dev_client' : 'refresh_token';
export const COOKIE_OPTIONS: OptionsType = {
  path: '/',
  maxAge: 60 * 60 * 24, // 1 day
};

export const REFRESH_TOKEN_COOKIE_OPTIONS: OptionsType = {
  ...COOKIE_OPTIONS,
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
