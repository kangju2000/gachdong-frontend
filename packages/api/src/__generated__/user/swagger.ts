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

/** 수정할 이미지 파일 */
export interface UserProfileRequest {
  /** @format binary */
  image: File;
}

export interface UserProfileResponse {
  /**
   * 사용자 ID
   * @format int64
   * @example 1
   */
  id: number;
  /**
   * 사용자 참조 ID
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  userReferenceId: string;
  /**
   * 프로필 이미지 URL
   * @example "https://example.com/image.png"
   */
  profileImageUrl: string;
}

export namespace 사용자프로필이미지Api {
  /**
   * @description 사용자의 프로필 이미지를 업로드합니다.
   * @tags 사용자 프로필 이미지 API
   * @name UploadProfileImage
   * @summary 프로필 이미지 업로드
   * @request POST:/api/v1/upload-profile-image
   * @secure
   * @response `200` `UserProfileResponse` OK
   */
  export namespace UploadProfileImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserProfileRequest;
    export type RequestHeaders = {};
    export type ResponseBody = UserProfileResponse;
  }

  /**
   * @description 사용자의 프로필 이미지를 수정합니다.
   * @tags 사용자 프로필 이미지 API
   * @name UpdateProfileImage
   * @summary 프로필 이미지 수정
   * @request POST:/api/v1/update-profile-image
   * @secure
   * @response `200` `UserProfileResponse` OK
   */
  export namespace UpdateProfileImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UserProfileRequest;
    export type RequestHeaders = {};
    export type ResponseBody = UserProfileResponse;
  }

  /**
   * @description 사용자의 프로필 이미지를 조회합니다.
   * @tags 사용자 프로필 이미지 API
   * @name GetProfileImage
   * @summary 프로필 이미지 조회
   * @request GET:/api/v1/profile-image/{userReferenceId}
   * @secure
   * @response `200` `string` OK
   */
  export namespace GetProfileImage {
    export type RequestParams = {
      /** 사용자 참조 ID */
      userReferenceId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }

  /**
   * @description 사용자의 프로필 이미지를 삭제합니다.
   * @tags 사용자 프로필 이미지 API
   * @name DeleteProfileImage
   * @summary 프로필 이미지 삭제
   * @request DELETE:/api/v1/delete-profile-image
   * @secure
   * @response `200` `string` OK
   */
  export namespace DeleteProfileImage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
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
  public baseUrl: string = 'https://gateway-dev.gachdong.club/user/';
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
 * @title 가츠동 API 명세 - 사용자 서비스
 * @version v1
 * @baseUrl https://gateway-dev.gachdong.club/user/
 *
 * 사용자 서비스에 대한 API 명세입니다.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  사용자프로필이미지Api = {
    /**
     * @description 사용자의 프로필 이미지를 업로드합니다.
     *
     * @tags 사용자 프로필 이미지 API
     * @name UploadProfileImage
     * @summary 프로필 이미지 업로드
     * @request POST:/api/v1/upload-profile-image
     * @secure
     * @response `200` `UserProfileResponse` OK
     */
    uploadProfileImage: (data: UserProfileRequest, params: RequestParams = {}) =>
      this.request<UserProfileResponse, any>({
        path: `/api/v1/upload-profile-image`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description 사용자의 프로필 이미지를 수정합니다.
     *
     * @tags 사용자 프로필 이미지 API
     * @name UpdateProfileImage
     * @summary 프로필 이미지 수정
     * @request POST:/api/v1/update-profile-image
     * @secure
     * @response `200` `UserProfileResponse` OK
     */
    updateProfileImage: (data: UserProfileRequest, params: RequestParams = {}) =>
      this.request<UserProfileResponse, any>({
        path: `/api/v1/update-profile-image`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description 사용자의 프로필 이미지를 조회합니다.
     *
     * @tags 사용자 프로필 이미지 API
     * @name GetProfileImage
     * @summary 프로필 이미지 조회
     * @request GET:/api/v1/profile-image/{userReferenceId}
     * @secure
     * @response `200` `string` OK
     */
    getProfileImage: (userReferenceId: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/profile-image/${userReferenceId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description 사용자의 프로필 이미지를 삭제합니다.
     *
     * @tags 사용자 프로필 이미지 API
     * @name DeleteProfileImage
     * @summary 프로필 이미지 삭제
     * @request DELETE:/api/v1/delete-profile-image
     * @secure
     * @response `200` `string` OK
     */
    deleteProfileImage: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/delete-profile-image`,
        method: 'DELETE',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
}
