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

/** 동아리 지원에 필요한 요청 데이터 */
export interface ToApplyClubDTO {
  /** @format int64 */
  applicationFormId: number;
  /**
   * @minLength 0
   * @maxLength 30000
   */
  formBody?: string;
  /** @pattern TEMPORARY_SAVED|SAVED|SAVED_CHANGEABLE */
  status: string;
  /**
   * @minLength 0
   * @maxLength 80
   */
  clubName: string;
}

export interface ResFormToCreateApplicationDTO {
  /** @format date-time */
  time?: string;
  code?: string;
  message?: string;
  result?: ToCreateApplicationDTO;
}

export interface ToCreateApplicationDTO {
  /** @format int64 */
  applyId?: number;
}

export interface ToCreateApplicationFormDTO {
  /** @format int64 */
  applyId: number;
  /** @pattern TEMPORARY_SAVED|SAVED */
  status: string;
  /**
   * @minLength 0
   * @maxLength 50
   */
  formName: string;
  /**
   * @minLength 0
   * @maxLength 2000
   */
  formBody: string;
}

export interface ResFormToCreateApplicationFormDTO {
  /** @format date-time */
  time?: string;
  code?: string;
  message?: string;
  result?: ToCreateApplicationFormDTO;
}

export interface ResFormToGetFormInfoUserDTO {
  /** @format date-time */
  time?: string;
  code?: string;
  message?: string;
  result?: ToGetFormInfoUserDTO;
}

export interface ToGetFormInfoUserDTO {
  /** @format int64 */
  formId?: number;
  formName?: string;
  formBody?: string;
}

export interface ResFormToGetApplicationHistoryListDTO {
  /** @format date-time */
  time?: string;
  code?: string;
  message?: string;
  result?: ToGetApplicationHistoryListDTO;
}

export interface ToGetApplicationHistoryDTO {
  /** @format int64 */
  applicationId?: number;
  clubName?: string;
  status?: string;
}

export interface ToGetApplicationHistoryListDTO {
  toGetApplicationHistoryDTO?: ToGetApplicationHistoryDTO[];
}

export interface ResFormToGetFormInfoAdminDTO {
  /** @format date-time */
  time?: string;
  code?: string;
  message?: string;
  result?: ToGetFormInfoAdminDTO;
}

export interface ToGetFormInfoAdminDTO {
  /** @format int64 */
  formId?: number;
  formName?: string;
  formBody?: string;
  formStatus?: string;
  formSettings?: string;
}

export interface ResFormObject {
  /** @format date-time */
  time?: string;
  code?: string;
  message?: string;
  result?: object;
}

export interface ChangeApplicationPayload {
  /** 업로드할 문서 리스트 */
  certificateDocs: File[];
  /** 동아리 지원에 필요한 요청 데이터 */
  toApplyClub: ToApplyClubDTO;
}

export interface CreateApplicationPayload {
  /** 업로드할 문서 리스트 */
  files?: File[];
  /** 동아리 지원에 필요한 요청 데이터 */
  toApplyClub: ToApplyClubDTO;
}

export namespace 지원Api {
  /**
   * @description 동아리에 지원을 수정합니다.
   * @tags 지원 API
   * @name ChangeApplication
   * @summary 동아리 지원 수정 API
   * @request PUT:/api/v1/application/{apply_id}
   * @response `200` `ResFormToCreateApplicationDTO` OK
   */
  export namespace ChangeApplication {
    export type RequestParams = {
      /** @format int64 */
      applyId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = ChangeApplicationPayload;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToCreateApplicationDTO;
  }

  /**
   * @description 동아리 지원서 양식을 수정합니다.
   * @tags 지원 API
   * @name ChangeApplicationForm
   * @summary 동아리 지원서 양식 수정 요청 API
   * @request PUT:/api/v1/application/admin/form/{form_id}
   * @response `200` `ResFormToCreateApplicationFormDTO` OK
   */
  export namespace ChangeApplicationForm {
    export type RequestParams = {
      /** @format int64 */
      formId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = ToCreateApplicationFormDTO;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToCreateApplicationFormDTO;
  }

  /**
   * @description 동아리에 지원합니다.
   * @tags 지원 API
   * @name CreateApplication
   * @summary 동아리 지원 API
   * @request POST:/api/v1/{apply_id}
   * @response `200` `ResFormToCreateApplicationDTO` OK
   */
  export namespace CreateApplication {
    export type RequestParams = {
      /** @format int64 */
      applyId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = CreateApplicationPayload;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToCreateApplicationDTO;
  }

  /**
   * @description 동아리 지원서 양식을 생성합니다.
   * @tags 지원 API
   * @name CreateApplicationForm
   * @summary 동아리 지원서 양식 생성 요청 API
   * @request POST:/api/v1/application/admin/form/create
   * @response `200` `ResFormToCreateApplicationFormDTO` OK
   */
  export namespace CreateApplicationForm {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ToCreateApplicationFormDTO;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToCreateApplicationFormDTO;
  }

  /**
   * @description 지원서 양식 ID를 이용해 양식을 조회합니다.
   * @tags 지원 API
   * @name GetFormInfoUser
   * @summary 사용자용 지원서 양식 조회 API
   * @request GET:/api/v1/form/{formId}
   * @response `200` `ResFormToGetFormInfoUserDTO` OK
   */
  export namespace GetFormInfoUser {
    export type RequestParams = {
      /** @format int64 */
      formId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToGetFormInfoUserDTO;
  }

  /**
   * @description 지원 내역 목록을 조회합니다.
   * @tags 지원 API
   * @name GetaApplicationHistory
   * @summary 사용자 지원 내역 목록 조회 API
   * @request GET:/api/v1/application/list
   * @response `200` `ResFormToGetApplicationHistoryListDTO` OK
   */
  export namespace GetaApplicationHistory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToGetApplicationHistoryListDTO;
  }

  /**
   * @description 지원서 양식 ID를 이용해 양식을 조회합니다.
   * @tags 지원 API
   * @name GetFormInfoAdmin
   * @summary 관리자용 지원서 양식 조회 API
   * @request GET:/api/v1/admin/form/{formId}
   * @response `200` `ResFormToGetFormInfoAdminDTO` OK
   */
  export namespace GetFormInfoAdmin {
    export type RequestParams = {
      /** @format int64 */
      formId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToGetFormInfoAdminDTO;
  }

  /**
   * @description 지원서 양식 ID를 이용해 양식을 삭제합니다.
   * @tags 지원 API
   * @name DeleteApplicationForm
   * @summary 지원 양식 삭제 API
   * @request DELETE:/api/v1/admin/form/{formId}
   * @response `200` `ResFormObject` OK
   */
  export namespace DeleteApplicationForm {
    export type RequestParams = {
      /** @format int64 */
      formId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormObject;
  }

  /**
   * @description 지원 ID를 이용해 지원을 취소합니다.
   * @tags 지원 API
   * @name DeleteApplication
   * @summary 사용자 지원 취소 API
   * @request DELETE:/api/v1/apply/{applyId}
   * @response `200` `ResFormObject` OK
   */
  export namespace DeleteApplication {
    export type RequestParams = {
      /** @format int64 */
      applyId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormObject;
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
  public baseUrl: string = 'http://gateway-dev.gachdong.club/application/';
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
 * @title 가츠동 API 명세 - 지원 서비스
 * @version v1
 * @baseUrl http://gateway-dev.gachdong.club/application/
 *
 * 지원 서비스에 대한 API 명세입니다.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  지원Api = {
    /**
     * @description 동아리에 지원을 수정합니다.
     *
     * @tags 지원 API
     * @name ChangeApplication
     * @summary 동아리 지원 수정 API
     * @request PUT:/api/v1/application/{apply_id}
     * @response `200` `ResFormToCreateApplicationDTO` OK
     */
    changeApplication: (applyId: number, data: ChangeApplicationPayload, params: RequestParams = {}) =>
      this.request<ResFormToCreateApplicationDTO, any>({
        path: `/api/v1/application/${applyId} `,
        method: 'PUT',
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description 동아리 지원서 양식을 수정합니다.
     *
     * @tags 지원 API
     * @name ChangeApplicationForm
     * @summary 동아리 지원서 양식 수정 요청 API
     * @request PUT:/api/v1/application/admin/form/{form_id}
     * @response `200` `ResFormToCreateApplicationFormDTO` OK
     */
    changeApplicationForm: (formId: number, data: ToCreateApplicationFormDTO, params: RequestParams = {}) =>
      this.request<ResFormToCreateApplicationFormDTO, any>({
        path: `/api/v1/application/admin/form/${formId}`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리에 지원합니다.
     *
     * @tags 지원 API
     * @name CreateApplication
     * @summary 동아리 지원 API
     * @request POST:/api/v1/{apply_id}
     * @response `200` `ResFormToCreateApplicationDTO` OK
     */
    createApplication: (applyId: number, data: CreateApplicationPayload, params: RequestParams = {}) =>
      this.request<ResFormToCreateApplicationDTO, any>({
        path: `/api/v1/${applyId}`,
        method: 'POST',
        body: data,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description 동아리 지원서 양식을 생성합니다.
     *
     * @tags 지원 API
     * @name CreateApplicationForm
     * @summary 동아리 지원서 양식 생성 요청 API
     * @request POST:/api/v1/application/admin/form/create
     * @response `200` `ResFormToCreateApplicationFormDTO` OK
     */
    createApplicationForm: (data: ToCreateApplicationFormDTO, params: RequestParams = {}) =>
      this.request<ResFormToCreateApplicationFormDTO, any>({
        path: `/api/v1/application/admin/form/create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 지원서 양식 ID를 이용해 양식을 조회합니다.
     *
     * @tags 지원 API
     * @name GetFormInfoUser
     * @summary 사용자용 지원서 양식 조회 API
     * @request GET:/api/v1/form/{formId}
     * @response `200` `ResFormToGetFormInfoUserDTO` OK
     */
    getFormInfoUser: (formId: number, params: RequestParams = {}) =>
      this.request<ResFormToGetFormInfoUserDTO, any>({
        path: `/api/v1/form/${formId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 지원 내역 목록을 조회합니다.
     *
     * @tags 지원 API
     * @name GetaApplicationHistory
     * @summary 사용자 지원 내역 목록 조회 API
     * @request GET:/api/v1/application/list
     * @response `200` `ResFormToGetApplicationHistoryListDTO` OK
     */
    getaApplicationHistory: (params: RequestParams = {}) =>
      this.request<ResFormToGetApplicationHistoryListDTO, any>({
        path: `/api/v1/application/list`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 지원서 양식 ID를 이용해 양식을 조회합니다.
     *
     * @tags 지원 API
     * @name GetFormInfoAdmin
     * @summary 관리자용 지원서 양식 조회 API
     * @request GET:/api/v1/admin/form/{formId}
     * @response `200` `ResFormToGetFormInfoAdminDTO` OK
     */
    getFormInfoAdmin: (formId: number, params: RequestParams = {}) =>
      this.request<ResFormToGetFormInfoAdminDTO, any>({
        path: `/api/v1/admin/form/${formId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 지원서 양식 ID를 이용해 양식을 삭제합니다.
     *
     * @tags 지원 API
     * @name DeleteApplicationForm
     * @summary 지원 양식 삭제 API
     * @request DELETE:/api/v1/admin/form/{formId}
     * @response `200` `ResFormObject` OK
     */
    deleteApplicationForm: (formId: number, params: RequestParams = {}) =>
      this.request<ResFormObject, any>({
        path: `/api/v1/admin/form/${formId}`,
        method: 'DELETE',
        ...params,
      }),

    /**
     * @description 지원 ID를 이용해 지원을 취소합니다.
     *
     * @tags 지원 API
     * @name DeleteApplication
     * @summary 사용자 지원 취소 API
     * @request DELETE:/api/v1/apply/{applyId}
     * @response `200` `ResFormObject` OK
     */
    deleteApplication: (applyId: number, params: RequestParams = {}) =>
      this.request<ResFormObject, any>({
        path: `/api/v1/apply/${applyId}`,
        method: 'DELETE',
        ...params,
      }),
  };
}
