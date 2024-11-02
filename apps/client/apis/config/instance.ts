import ky from 'ky';
import { Api as ClubApi } from '../__generated__/club/swagger';
import { Api as ApplicationApi } from '../__generated__/application/swagger';
import { Api as AuthApi } from '../__generated__/auth/swagger';
import { CookieManager } from '@/lib/auth/cookies';

const instance = ky.create({
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      request => {
        const token = CookieManager.getToken();
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

export { clubApi, applicationApi, authApi };
