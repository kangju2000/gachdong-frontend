import { AUTH_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from './constants';

export const getServerToken = async () => {
  const cookieStore = (await import('next/headers')).cookies();

  return {
    accessToken: cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null,
    refreshToken: cookieStore.get(REFRESH_TOKEN_COOKIE_NAME)?.value ?? null,
  };
};

export const getClientToken = () => {
  if (typeof document === 'undefined') {
    return {
      accessToken: null,
      refreshToken: null,
    };
  }

  const cookies = document.cookie.split(';').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split('=') as [string, string];
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>
  );

  return {
    accessToken: cookies[AUTH_COOKIE_NAME] ?? null,
    refreshToken: cookies[REFRESH_TOKEN_COOKIE_NAME] ?? null,
  };
};
