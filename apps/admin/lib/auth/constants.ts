export const AUTH_COOKIE_NAME = process.env.NODE_ENV === 'production' ? 'access_token' : 'access_token_dev_admin';
export const REFRESH_TOKEN_COOKIE_NAME =
  process.env.NODE_ENV === 'production' ? 'refresh_token' : 'refresh_token_dev_admin';
export const COOKIE_OPTIONS = {
  path: '/',
  maxAge: 60 * 60 * 24, // 1 day
};

export const REFRESH_TOKEN_COOKIE_OPTIONS = {
  ...COOKIE_OPTIONS,
  maxAge: 60 * 60 * 24 * 7, // 7 days
};
