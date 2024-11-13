import ky from 'ky';
import { Api as ClubApi } from '@gachdong/api/club';
import { Api as ApplicationApi } from '@gachdong/api/application';
import { Api as AuthApi } from '@gachdong/api/auth';
import { Api as UserApi } from '@gachdong/api/user';
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

const clubApi = new ClubApi({
  customFetch: instance,
  baseUrl: process.env.NEXT_PUBLIC_API_URL + '/club',
  baseApiParams: {
    format: 'json',
  },
});

const applicationApi = new ApplicationApi({
  customFetch: instance,
  baseUrl: process.env.NEXT_PUBLIC_API_URL + '/application',
  baseApiParams: {
    format: 'json',
  },
});

const authApi = new AuthApi({
  customFetch: instance,
  baseUrl: process.env.NEXT_PUBLIC_API_URL + '/auth',
  baseApiParams: {
    format: 'json',
  },
});

const userApi = new UserApi({
  customFetch: instance,
  baseUrl: process.env.NEXT_PUBLIC_API_URL + '/user',
  baseApiParams: {
    format: 'json',
  },
});

export { clubApi, applicationApi, authApi, userApi };
