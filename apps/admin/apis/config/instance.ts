import ky from 'ky';
import { club, application, auth, user } from '@gachdong/api';
import { CookieManager } from '@/lib/auth/cookies';

const instance = ky.create({
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  retry: 0,
  hooks: {
    beforeRequest: [
      async request => {
        const token =
          typeof window !== 'undefined' ? CookieManager.getClientToken() : await CookieManager.getServerToken();

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
  },
});

const clubApi = new club.Api({
  customFetch: instance,
  baseUrl: process.env.NEXT_PUBLIC_API_URL + '/club',
  baseApiParams: {
    format: 'json',
  },
});

const applicationApi = new application.Api({
  customFetch: instance,
  baseUrl: process.env.NEXT_PUBLIC_API_URL + '/application',
  baseApiParams: {
    format: 'json',
  },
});

const authApi = new auth.Api({
  customFetch: instance,
  baseUrl: process.env.NEXT_PUBLIC_API_URL + '/auth',
  baseApiParams: {
    format: 'json',
  },
});

const userApi = new user.Api({
  customFetch: instance,
  baseUrl: process.env.NEXT_PUBLIC_API_URL + '/user',
  baseApiParams: {
    format: 'json',
  },
});

export { clubApi, applicationApi, authApi, userApi };
