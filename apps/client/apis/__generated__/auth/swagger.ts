/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** 회원가입 정보 */
export interface RegistrationRequest {
  /**
   * 사용자 이메일 (gachon.ac.kr 도메인)
   * @minLength 0
   * @maxLength 255
   * @pattern ^[a-zA-Z0-9._%+-]+@gachon\.ac\.kr$
   */
  email: string;
  /** @pattern (?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=\S+$).{8,16} */
  password: string;
  /**
   * @minLength 0
   * @maxLength 100
   */
  name: string;
  role: 'USER' | 'ADMIN';
}

/** 로그인 정보 */
export interface LoginRequest {
  /**
   * 사용자 이메일
   * @example "user@gachon.ac.kr"
   */
  email: string;
  /**
   * 비밀번호
   * @example "password123!"
   */
  password: string;
}

export interface AuthResponse {
  /**
   * JWT 토큰
   * @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   */
  token?: string;
  /**
   * 응답 메시지
   * @example "로그인 성공"
   */
  message?: string;
}

/** 비밀번호 변경 정보 */
export interface ChangePasswordRequest {
  /**
   * 현재 비밀번호
   * @example "currentpassword123"
   */
  currentPassword?: string;
  /**
   * 새 비밀번호
   * @example "newpassword123!"
   */
  newPassword?: string;
}

export interface UserProfileResponse {
  /**
   * 사용자 이메일
   * @example "user@gachon.ac.kr"
   */
  email?: string;
  /**
   * 사용자 이름
   * @example "홍길동"
   */
  name?: string;
  /**
   * 사용자 권한
   * @example "USER, ADMIN"
   */
  role?: string;
}

export interface VerifyCodeParams {
  /** 사용자의 이메일 주소 */
  email: string;
  /** 인증 코드 */
  code: string;
}

export interface SendVerificationCodeParams {
  /** 사용자의 이메일 주소 */
  email: string;
}

export interface ResetPasswordParams {
  /** 사용자의 이메일 주소 */
  email: string;
  /** 인증 코드 */
  code: string;
}

export interface ResetPassword1Params {
  /** 사용자의 이메일 주소 */
  email: string;
  /** 인증 코드 */
  code: string;
}

export namespace Public사용자인증인가Api {
  /**
   * @description 사용자가 입력한 인증 코드를 검증합니다.
   * @tags Public 사용자 인증/인가 API
   * @name VerifyCode
   * @summary 인증 코드 검증
   * @request POST:/public/api/v1/verify-code
   * @response `200` `string` OK
   */
  export namespace VerifyCode {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 사용자의 이메일 주소 */
      email: string;
      /** 인증 코드 */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * @description 이메일로 유효시간 3분의 6자리의 인증 코드를 발송합니다.
   * @tags Public 사용자 인증/인가 API
   * @name SendVerificationCode
   * @summary 이메일 인증 코드 발송
   * @request POST:/public/api/v1/send-verification-code
   * @response `200` `string` OK
   */
  export namespace SendVerificationCode {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 사용자의 이메일 주소 */
      email: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * @description 이메일 인증 코드를 입력하여 임시 비밀번호를 재발급합니다.
   * @tags Public 사용자 인증/인가 API
   * @name ResetPassword
   * @summary 비밀번호 재발급
   * @request POST:/public/api/v1/reset-password
   * @response `200` `string` OK
   */
  export namespace ResetPassword {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 사용자의 이메일 주소 */
      email: string;
      /** 인증 코드 */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * @description 회원가입을 완료합니다. - email: 사용자 이메일 (gachon.ac.kr 도메인) - password: 8~16자 영문, 숫자, 특수문자를 포함한 비밀번호 - name: 사용자 이름 - role: ADMIN, USER
   * @tags Public 사용자 인증/인가 API
   * @name CompleteRegistration
   * @summary 회원가입
   * @request POST:/public/api/v1/register
   * @response `200` `string` OK
   */
  export namespace CompleteRegistration {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RegistrationRequest;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * @description 사용자가 로그인합니다.
   * @tags Public 사용자 인증/인가 API
   * @name Login
   * @summary 사용자 로그인
   * @request POST:/public/api/v1/login
   * @response `200` `AuthResponse` OK
   */
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginRequest;
    export type RequestHeaders = {};
    export type ResponseBody = AuthResponse;
  }
}

export namespace Public관리자인증인가Api {
  /**
   * @description 이메일 인증 코드를 입력하여 임시 비밀번호를 재발급합니다.
   * @tags Public 관리자 인증/인가 API
   * @name ResetPassword1
   * @summary 비밀번호 재발급
   * @request POST:/public/admin/api/v1/reset-password
   * @response `200` `string` OK
   */
  export namespace ResetPassword1 {
    export type RequestParams = {};
    export type RequestQuery = {
      /** 사용자의 이메일 주소 */
      email: string;
      /** 인증 코드 */
      code: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * @description 회원가입을 완료합니다. - email: 사용자 이메일 (gachon.ac.kr 도메인) - password: 8~16자 영문, 숫자, 특수문자를 포함한 비밀번호 - name: 사용자 이름 - role: ADMIN, USER
   * @tags Public 관리자 인증/인가 API
   * @name CompleteRegistration1
   * @summary 회원가입
   * @request POST:/public/admin/api/v1/register
   * @response `200` `string` OK
   */
  export namespace CompleteRegistration1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RegistrationRequest;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * @description 사용자가 로그인합니다.
   * @tags Public 관리자 인증/인가 API
   * @name Login1
   * @summary 사용자 로그인
   * @request POST:/public/admin/api/v1/login
   * @response `200` `AuthResponse` OK
   */
  export namespace Login1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginRequest;
    export type RequestHeaders = {};
    export type ResponseBody = AuthResponse;
  }
}

export namespace 사용자인증인가Api {
  /**
   * @description 사용자의 계정을 삭제합니다.
   * @tags 사용자 인증/인가 API
   * @name DeleteAccount
   * @summary 회원탈퇴
   * @request POST:/api/v1/unregister
   * @response `200` `string` OK
   */
  export namespace DeleteAccount {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** JWT 토큰 */
      Authorization: string;
    };
    export type ResponseBody = string;
  }

  /**
   * @description 사용자를 로그아웃합니다.
   * @tags 사용자 인증/인가 API
   * @name Logout
   * @summary 로그아웃
   * @request POST:/api/v1/logout
   * @response `200` `string` OK
   */
  export namespace Logout {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** JWT 토큰 */
      Authorization: string;
    };
    export type ResponseBody = string;
  }

  /**
   * @description 기존 비밀번호를 변경합니다.
   * @tags 사용자 인증/인가 API
   * @name ChangePassword
   * @summary 비밀번호 변경
   * @request POST:/api/v1/change-password
   * @response `200` `string` OK
   */
  export namespace ChangePassword {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangePasswordRequest;
    export type RequestHeaders = {
      /** JWT 토큰 */
      Authorization: string;
    };
    export type ResponseBody = string;
  }

  /**
   * @description 사용자의 프로필 정보를 조회합니다.
   * @tags 사용자 인증/인가 API
   * @name GetProfile
   * @summary 회원 정보 조회
   * @request GET:/api/v1/profile
   * @response `200` `UserProfileResponse` OK
   */
  export namespace GetProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** JWT 토큰 */
      Authorization: string;
    };
    export type ResponseBody = UserProfileResponse;
  }
}

export namespace 관리자인증인가Api {
  /**
   * @description 사용자의 계정을 삭제합니다.
   * @tags 관리자 인증/인가 API
   * @name DeleteAccount1
   * @summary 회원탈퇴
   * @request POST:/admin/api/v1/unregister
   * @response `200` `string` OK
   */
  export namespace DeleteAccount1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** JWT 토큰 */
      Authorization: string;
    };
    export type ResponseBody = string;
  }

  /**
   * @description 사용자를 로그아웃합니다.
   * @tags 관리자 인증/인가 API
   * @name Logout1
   * @summary 로그아웃
   * @request POST:/admin/api/v1/logout
   * @response `200` `string` OK
   */
  export namespace Logout1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** JWT 토큰 */
      Authorization: string;
    };
    export type ResponseBody = string;
  }

  /**
   * @description 기존 비밀번호를 변경합니다.
   * @tags 관리자 인증/인가 API
   * @name ChangePassword1
   * @summary 비밀번호 변경
   * @request POST:/admin/api/v1/change-password
   * @response `200` `string` OK
   */
  export namespace ChangePassword1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ChangePasswordRequest;
    export type RequestHeaders = {
      /** JWT 토큰 */
      Authorization: string;
    };
    export type ResponseBody = string;
  }

  /**
   * @description 사용자의 프로필 정보를 조회합니다.
   * @tags 관리자 인증/인가 API
   * @name GetProfile1
   * @summary 회원 정보 조회
   * @request GET:/admin/api/v1/profile
   * @response `200` `UserProfileResponse` OK
   */
  export namespace GetProfile1 {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {
      /** JWT 토큰 */
      Authorization: string;
    };
    export type ResponseBody = UserProfileResponse;
  }
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = 'https://gateway-dev.gachdong.club/auth/';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(key => 'undefined' !== typeof query[key]);
    return keys
      .map(key => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async response => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then(data => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch(e => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data.data;
    });
  };
}

/**
 * @title 가츠동 API 명세 - 인증/인가 서비스
 * @version v1
 * @baseUrl https://gateway-dev.gachdong.club/auth/
 *
 * 인증/인가 서비스에 대한 API 명세입니다.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  public사용자인증인가Api = {
    /**
     * @description 사용자가 입력한 인증 코드를 검증합니다.
     *
     * @tags Public 사용자 인증/인가 API
     * @name VerifyCode
     * @summary 인증 코드 검증
     * @request POST:/public/api/v1/verify-code
     * @response `200` `string` OK
     */
    verifyCode: (query: VerifyCodeParams, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/public/api/v1/verify-code`,
        method: 'POST',
        query: query,
        ...params,
      }),

    /**
     * @description 이메일로 유효시간 3분의 6자리의 인증 코드를 발송합니다.
     *
     * @tags Public 사용자 인증/인가 API
     * @name SendVerificationCode
     * @summary 이메일 인증 코드 발송
     * @request POST:/public/api/v1/send-verification-code
     * @response `200` `string` OK
     */
    sendVerificationCode: (query: SendVerificationCodeParams, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/public/api/v1/send-verification-code`,
        method: 'POST',
        query: query,
        ...params,
      }),

    /**
     * @description 이메일 인증 코드를 입력하여 임시 비밀번호를 재발급합니다.
     *
     * @tags Public 사용자 인증/인가 API
     * @name ResetPassword
     * @summary 비밀번호 재발급
     * @request POST:/public/api/v1/reset-password
     * @response `200` `string` OK
     */
    resetPassword: (query: ResetPasswordParams, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/public/api/v1/reset-password`,
        method: 'POST',
        query: query,
        ...params,
      }),

    /**
     * @description 회원가입을 완료합니다. - email: 사용자 이메일 (gachon.ac.kr 도메인) - password: 8~16자 영문, 숫자, 특수문자를 포함한 비밀번호 - name: 사용자 이름 - role: ADMIN, USER
     *
     * @tags Public 사용자 인증/인가 API
     * @name CompleteRegistration
     * @summary 회원가입
     * @request POST:/public/api/v1/register
     * @response `200` `string` OK
     */
    completeRegistration: (data: RegistrationRequest, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/public/api/v1/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 사용자가 로그인합니다.
     *
     * @tags Public 사용자 인증/인가 API
     * @name Login
     * @summary 사용자 로그인
     * @request POST:/public/api/v1/login
     * @response `200` `AuthResponse` OK
     */
    login: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<AuthResponse, any>({
        path: `/public/api/v1/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  public관리자인증인가Api = {
    /**
     * @description 이메일 인증 코드를 입력하여 임시 비밀번호를 재발급합니다.
     *
     * @tags Public 관리자 인증/인가 API
     * @name ResetPassword1
     * @summary 비밀번호 재발급
     * @request POST:/public/admin/api/v1/reset-password
     * @response `200` `string` OK
     */
    resetPassword1: (query: ResetPassword1Params, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/public/admin/api/v1/reset-password`,
        method: 'POST',
        query: query,
        ...params,
      }),

    /**
     * @description 회원가입을 완료합니다. - email: 사용자 이메일 (gachon.ac.kr 도메인) - password: 8~16자 영문, 숫자, 특수문자를 포함한 비밀번호 - name: 사용자 이름 - role: ADMIN, USER
     *
     * @tags Public 관리자 인증/인가 API
     * @name CompleteRegistration1
     * @summary 회원가입
     * @request POST:/public/admin/api/v1/register
     * @response `200` `string` OK
     */
    completeRegistration1: (data: RegistrationRequest, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/public/admin/api/v1/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 사용자가 로그인합니다.
     *
     * @tags Public 관리자 인증/인가 API
     * @name Login1
     * @summary 사용자 로그인
     * @request POST:/public/admin/api/v1/login
     * @response `200` `AuthResponse` OK
     */
    login1: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<AuthResponse, any>({
        path: `/public/admin/api/v1/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  사용자인증인가Api = {
    /**
     * @description 사용자의 계정을 삭제합니다.
     *
     * @tags 사용자 인증/인가 API
     * @name DeleteAccount
     * @summary 회원탈퇴
     * @request POST:/api/v1/unregister
     * @response `200` `string` OK
     */
    deleteAccount: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/unregister`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description 사용자를 로그아웃합니다.
     *
     * @tags 사용자 인증/인가 API
     * @name Logout
     * @summary 로그아웃
     * @request POST:/api/v1/logout
     * @response `200` `string` OK
     */
    logout: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/logout`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description 기존 비밀번호를 변경합니다.
     *
     * @tags 사용자 인증/인가 API
     * @name ChangePassword
     * @summary 비밀번호 변경
     * @request POST:/api/v1/change-password
     * @response `200` `string` OK
     */
    changePassword: (data: ChangePasswordRequest, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/change-password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 사용자의 프로필 정보를 조회합니다.
     *
     * @tags 사용자 인증/인가 API
     * @name GetProfile
     * @summary 회원 정보 조회
     * @request GET:/api/v1/profile
     * @response `200` `UserProfileResponse` OK
     */
    getProfile: (params: RequestParams = {}) =>
      this.request<UserProfileResponse, any>({
        path: `/api/v1/profile`,
        method: 'GET',
        ...params,
      }),
  };
  관리자인증인가Api = {
    /**
     * @description 사용자의 계정을 삭제합니다.
     *
     * @tags 관리자 인증/인가 API
     * @name DeleteAccount1
     * @summary 회원탈퇴
     * @request POST:/admin/api/v1/unregister
     * @response `200` `string` OK
     */
    deleteAccount1: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/admin/api/v1/unregister`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description 사용자를 로그아웃합니다.
     *
     * @tags 관리자 인증/인가 API
     * @name Logout1
     * @summary 로그아웃
     * @request POST:/admin/api/v1/logout
     * @response `200` `string` OK
     */
    logout1: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/admin/api/v1/logout`,
        method: 'POST',
        ...params,
      }),

    /**
     * @description 기존 비밀번호를 변경합니다.
     *
     * @tags 관리자 인증/인가 API
     * @name ChangePassword1
     * @summary 비밀번호 변경
     * @request POST:/admin/api/v1/change-password
     * @response `200` `string` OK
     */
    changePassword1: (data: ChangePasswordRequest, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/admin/api/v1/change-password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 사용자의 프로필 정보를 조회합니다.
     *
     * @tags 관리자 인증/인가 API
     * @name GetProfile1
     * @summary 회원 정보 조회
     * @request GET:/admin/api/v1/profile
     * @response `200` `UserProfileResponse` OK
     */
    getProfile1: (params: RequestParams = {}) =>
      this.request<UserProfileResponse, any>({
        path: `/admin/api/v1/profile`,
        method: 'GET',
        ...params,
      }),
  };
}
