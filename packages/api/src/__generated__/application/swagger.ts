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
  /**
   * 지원 ID
   * @format int64
   * @example 3
   */
  applicationFormId: number;
  /**
   * 지원서 상태(임시저장/저장/수정 가능)
   * @pattern TEMPORARY_SAVED|SAVED|SAVED_CHANGEABLE
   * @example "SAVED"
   */
  status: string;
  /**
   * 지원할 동아리 id
   * @format int64
   * @example 3
   */
  clubId: number;
  /**
   * 지원서 답변 본문, Json 형식으로 넣어주세요.
   * @example {"name":"가츠동","age":25,"education":{"university":"가천대학교","major":"컴퓨터공학"}}
   */
  formBody: Record<string, object>;
}

export interface ResFormToCreateApplicationDTO {
  code?: string;
  message?: string;
  /** 동아리 지원 결과 반환 DTO */
  result?: ToCreateApplicationDTO;
}

/** 동아리 지원 결과 반환 DTO */
export interface ToCreateApplicationDTO {
  /**
   * 접수된 지원 ID
   * @format int64
   */
  applicationId: number;
}

/** 동아리 지원자 상태 수정 요청 DTO */
export interface ToChangeApplicationStatus {
  /**
   * 변경할 지원 ID
   * @format int64
   * @example 2
   */
  applicationId: number;
  /**
   * 변경할 지원 상태
   * @minLength 0
   * @maxLength 80
   * @example "서류 합격"
   */
  status: string;
}

export interface ResFormObject {
  code?: string;
  message?: string;
  result?: object;
}

/** 지원서 양식 생성 요청 DTO */
export interface ToCreateApplicationFormDTO {
  /**
   * 지원서 양식 상태(임시저장/저장)
   * @pattern TEMPORARY_SAVED|SAVED
   * @example "SAVED"
   */
  status: string;
  /**
   * 지원서 이름
   * @minLength 0
   * @maxLength 50
   * @example "가츠동 지원서 이름"
   */
  formName: string;
  /**
   * 동아리 ID
   * @format int64
   * @example 21
   */
  clubId: number;
  /**
   * 지원서 양식 본문, Json 형식으로 넣어주세요.
   * @example {"name":"이름을 넣어주세요","age":"나이를 넣어주세요","education":{"university":"출신 학교를 넣어주세요","major":"전공을 넣어주세요"}}
   */
  formBody: Record<string, object>;
}

export interface ResFormToCreateApplicationFormDTO {
  code?: string;
  message?: string;
  /** 지원서 양식 생성 요청 DTO */
  result?: ToCreateApplicationFormDTO;
}

/** 내부 Service Mesh용 DTO (FrontEnd와는 관계가 없습니다.) */
export interface GetUserProfile {
  /**
   * 사용자 ID
   * @example "654fdh46-658fdg"
   */
  userReferenceId?: string;
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
  /**
   * 프로필 이미지 URL
   * @example "https://example.com/profile.png"
   */
  profileImageUrl?: string;
}

export interface ResFormToGetApplicationHistoryListDTO {
  code?: string;
  message?: string;
  /** 지원 내역 목록 조회 결과 반환 DTO */
  result?: ToGetApplicationHistoryListDTO;
}

/** 지원 내역 상세 조회 결과 반환 DTO */
export interface ToGetApplicationHistoryDTO {
  /**
   * 지원 ID
   * @format int64
   */
  applicationId: number;
  /** 지원 상태(합격, 불합격, 서류 합격 등) */
  status: string;
  /**
   * 지원한 날짜
   * @format date-time
   */
  submitDate: string;
  /**
   * 지원한 동아리 ID
   * @format int64
   */
  clubId: number;
}

/** 지원 내역 목록 조회 결과 반환 DTO */
export interface ToGetApplicationHistoryListDTO {
  toGetApplicationHistoryDTO?: ToGetApplicationHistoryDTO[];
}

export interface ResFormToGetFormInfoUserDTO {
  code?: string;
  message?: string;
  /** 사용자용 양식 조회 결과 반환 DTO */
  result?: ToGetFormInfoUserDTO;
}

/** 사용자용 양식 조회 결과 반환 DTO */
export interface ToGetFormInfoUserDTO {
  /**
   * 지원서 양식 ID
   * @format int64
   */
  formId: number;
  /** 지원서 양식 이름 */
  formName: string;
  /** 지원서 양식 내용(Json) */
  formBody: Record<string, object>;
}

export interface ResFormToGetApplicationTempDTO {
  code?: string;
  message?: string;
  /** 사용자용 특정 지원에 대한 임시저장 여부 반환 DTO */
  result?: ToGetApplicationTempDTO;
}

/** 사용자용 특정 지원에 대한 임시저장 여부 반환 DTO */
export interface ToGetApplicationTempDTO {
  /**
   * 임시 저장된 지원 ID
   * @format int64
   */
  applicationId: number;
  /** 임시 저장된 답변 내용 */
  applicationBody: Record<string, object>;
}

export interface ResFormToGetApplicationListAdminDTO {
  code?: string;
  message?: string;
  /** 관리자용 동아리 지원 리스트 반환 DTO */
  result?: ToGetApplicationListAdminDTO;
}

/** 관리자용 지원 내역 상세 조회 결과 반환 DTO */
export interface ToGetApplicationDTO {
  /**
   * 지원 ID
   * @format int64
   */
  applicationId: number;
  /** 지원자 ID */
  userReferenceId: string;
  /** 지원자 email */
  userEmail: string;
  /** 지원자 이름 */
  userName: string;
  /** 지원자 프로필 이미지 */
  userProfileUrl: string;
  /** 지원 상태(합격, 불합격, 서류 합격 등) */
  status: string;
  /**
   * 지원한 날짜
   * @format date-time
   */
  submitDate: string;
  /** 답변 내용 */
  applicationBody: Record<string, object>;
}

/** 관리자용 동아리 지원 리스트 반환 DTO */
export interface ToGetApplicationListAdminDTO {
  /** 접수된 지원 목록 ID */
  toGetApplicationDTO: ToGetApplicationDTO[];
}

export interface ResFormToGetFormInfoAdminDTO {
  code?: string;
  message?: string;
  /** 관리자용 양식 조회 결과 반환 DTO */
  result?: ToGetFormInfoAdminDTO;
}

/** 관리자용 양식 조회 결과 반환 DTO */
export interface ToGetFormInfoAdminDTO {
  /**
   * 지원서 양식 ID
   * @format int64
   */
  formId: number;
  /** 지원서 양식 이름 */
  formName: string;
  /** 지원서 양식 내용(Json) */
  formBody: Record<string, object>;
  /** 지원서 양식 상태 (임시 저장인지, 삭제 가능한지 등) */
  formStatus: string;
  /**
   * 동아리 ID
   * @format int64
   */
  clubId: number;
}

export interface ResFormListToGetFormInfoAdminDTO {
  code?: string;
  message?: string;
  result?: ToGetFormInfoAdminDTO[];
}

export interface ResFormToGetApplicationDTO {
  code?: string;
  message?: string;
  /** 관리자용 지원 내역 상세 조회 결과 반환 DTO */
  result?: ToGetApplicationDTO;
}

export interface ChangeApplicationPayload {
  /** 업로드할 문서 리스트 */
  certificateDocs: File[];
  /** 동아리 지원에 필요한 요청 데이터 */
  toApplyClub: ToApplyClubDTO;
}

export type GetUserProfilesPayload = Record<string, string[]>;

export interface CreateApplicationPayload {
  /** 업로드할 문서 리스트 */
  files?: File[];
  /** 동아리 지원에 필요한 요청 데이터 */
  toApplyClub: ToApplyClubDTO;
}

export interface TestAuthParams {
  recruitmentId: string;
}

export interface TestAuth1Params {
  recruitmentId: string;
}

export namespace 지원Api사용자 {
  /**
   * @description 동아리에 지원을 수정합니다.
   * @tags 지원 API(사용자)
   * @name ChangeApplication
   * @summary 동아리 지원 수정 API
   * @request PUT:/api/v1/{recruitmentId}
   * @secure
   * @response `200` `ResFormToCreateApplicationDTO` OK
   */
  export namespace ChangeApplication {
    export type RequestParams = {
      /** @format int64 */
      recruitmentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = ChangeApplicationPayload;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToCreateApplicationDTO;
  }

  /**
   * @description 동아리에 지원합니다.
   * @tags 지원 API(사용자)
   * @name CreateApplication
   * @summary 동아리 지원 API
   * @request POST:/api/v1/{recruitmentId}
   * @secure
   * @response `200` `ResFormToCreateApplicationDTO` OK
   */
  export namespace CreateApplication {
    export type RequestParams = {
      /** @format int64 */
      recruitmentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = CreateApplicationPayload;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToCreateApplicationDTO;
  }

  /**
   * @description 지원 내역 목록을 조회합니다.
   * @tags 지원 API(사용자)
   * @name GetApplicationHistory
   * @summary 사용자 지원 내역 목록 조회 API
   * @request GET:/api/v1/list
   * @secure
   * @response `200` `ResFormToGetApplicationHistoryListDTO` OK
   */
  export namespace GetApplicationHistory {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToGetApplicationHistoryListDTO;
  }

  /**
   * @description 지원서 양식 ID를 이용해 양식을 조회합니다.
   * @tags 지원 API(사용자)
   * @name GetFormInfoUser
   * @summary 사용자용 지원서 양식 조회 API
   * @request GET:/api/v1/form/{formId}
   * @secure
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
   * @description 지원 ID를 이용해 해당 사용자가 해당 임시적으로 저장한 지원이 있는지 확인 및 내용을 반환합니다.
   * @tags 지원 API(사용자)
   * @name GetTempApplication
   * @summary 사용자 임시저장 여부 및 내용 반환 API
   * @request GET:/api/v1/apply/{applyId}
   * @secure
   * @response `200` `ResFormToGetApplicationTempDTO` OK
   */
  export namespace GetTempApplication {
    export type RequestParams = {
      /** @format int64 */
      applyId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToGetApplicationTempDTO;
  }

  /**
   * @description 지원 ID를 이용해 지원을 취소합니다.
   * @tags 지원 API(사용자)
   * @name DeleteApplication
   * @summary 사용자 지원 취소 API
   * @request DELETE:/api/v1/apply/{recruitmentId}
   * @secure
   * @response `200` `ResFormObject` OK
   */
  export namespace DeleteApplication {
    export type RequestParams = {
      /** @format int64 */
      recruitmentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormObject;
  }
}

export namespace 지원Api관리자 {
  /**
   * @description 지원 ID를 이용해 지원 상태를 변경합니다.
   * @tags 지원 API(관리자)
   * @name ChangeApplicationStatus
   * @summary 사용자 지원 상태 변경 API
   * @request PUT:/admin/api/v1/status
   * @secure
   * @response `200` `ResFormObject` OK
   */
  export namespace ChangeApplicationStatus {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ToChangeApplicationStatus;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormObject;
  }

  /**
   * @description 동아리 지원서 양식을 수정합니다.
   * @tags 지원 API(관리자)
   * @name ChangeApplicationForm
   * @summary 동아리 지원서 양식 수정 요청 API
   * @request PUT:/admin/api/v1/form/{form_id}
   * @secure
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
   * @description 동아리 지원서 양식을 생성합니다.
   * @tags 지원 API(관리자)
   * @name CreateApplicationForm
   * @summary 동아리 지원서 양식 생성 요청 API
   * @request POST:/admin/api/v1/form/create
   * @secure
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
   * @description 지원 ID를(recruitmentId) 이용해 지원 목록을 조회합니다.
   * @tags 지원 API(관리자)
   * @name GetClubApplicationList
   * @summary 지원 목록 조회 API
   * @request GET:/admin/api/v1/{applyId}
   * @secure
   * @response `200` `ResFormToGetApplicationListAdminDTO` OK
   */
  export namespace GetClubApplicationList {
    export type RequestParams = {
      /** @format int64 */
      applyId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToGetApplicationListAdminDTO;
  }

  /**
   * @description 지원서 양식 ID를 이용해 양식을 조회합니다.
   * @tags 지원 API(관리자)
   * @name GetFormInfoAdmin
   * @summary 관리자용 지원서 양식 조회 API
   * @request GET:/admin/api/v1/form/{formId}
   * @secure
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
   * @tags 지원 API(관리자)
   * @name DeleteApplicationForm
   * @summary 지원 양식 삭제 API
   * @request DELETE:/admin/api/v1/form/{formId}
   * @secure
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
   * @description clubId를 이용해 지원서 목록을 조회합니다.
   * @tags 지원 API(관리자)
   * @name GetClubApplicationFormList
   * @summary club이 가지고 있는 지원서 양식 목록 조회 API
   * @request GET:/admin/api/v1/form/list/{clubId}
   * @secure
   * @response `200` `ResFormListToGetFormInfoAdminDTO` OK
   */
  export namespace GetClubApplicationFormList {
    export type RequestParams = {
      /** @format int64 */
      clubId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormListToGetFormInfoAdminDTO;
  }

  /**
   * @description applicationId를 이용해 지원 내역 단건을 조회합니다.
   * @tags 지원 API(관리자)
   * @name GetClubApplication
   * @summary 지원 내역 단건 조회 API
   * @request GET:/admin/api/v1/application/{applicationId}
   * @secure
   * @response `200` `ResFormToGetApplicationDTO` OK
   */
  export namespace GetClubApplication {
    export type RequestParams = {
      /** @format int64 */
      applicationId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ResFormToGetApplicationDTO;
  }
}

export namespace MockUpController {
  /**
   * No description
   * @tags mock-up-controller
   * @name GetUserProfiles
   * @request POST:/profiles
   * @response `200` `(GetUserProfile)[]` OK
   */
  export namespace GetUserProfiles {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = GetUserProfilesPayload;
    export type RequestHeaders = {};
    export type ResponseBody = GetUserProfile[];
  }

  /**
   * No description
   * @tags mock-up-controller
   * @name TestAuth
   * @request GET:/{recruitmentId}/has-authority
   * @response `200` `boolean` OK
   */
  export namespace TestAuth {
    export type RequestParams = {
      recruitmentId: string;
    };
    export type RequestQuery = {
      /** @format int64 */
      recruitmentId: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = boolean;
  }

  /**
   * No description
   * @tags mock-up-controller
   * @name TestAuth1
   * @request GET:/recruitment/{recruitmentId}/is-valid
   * @response `200` `boolean` OK
   */
  export namespace TestAuth1 {
    export type RequestParams = {
      recruitmentId: string;
    };
    export type RequestQuery = {
      /** @format int64 */
      recruitmentId: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = boolean;
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
  public baseUrl: string = 'https://gateway-dev.gachdong.club/application/';
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
 * @baseUrl https://gateway-dev.gachdong.club/application/
 *
 * 지원 서비스에 대한 API 명세입니다.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  지원Api사용자 = {
    /**
     * @description 동아리에 지원을 수정합니다.
     *
     * @tags 지원 API(사용자)
     * @name ChangeApplication
     * @summary 동아리 지원 수정 API
     * @request PUT:/api/v1/{recruitmentId}
     * @secure
     * @response `200` `ResFormToCreateApplicationDTO` OK
     */
    changeApplication: (recruitmentId: number, data: ChangeApplicationPayload, params: RequestParams = {}) =>
      this.request<ResFormToCreateApplicationDTO, any>({
        path: `/api/v1/${recruitmentId} `,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description 동아리에 지원합니다.
     *
     * @tags 지원 API(사용자)
     * @name CreateApplication
     * @summary 동아리 지원 API
     * @request POST:/api/v1/{recruitmentId}
     * @secure
     * @response `200` `ResFormToCreateApplicationDTO` OK
     */
    createApplication: (recruitmentId: number, data: CreateApplicationPayload, params: RequestParams = {}) =>
      this.request<ResFormToCreateApplicationDTO, any>({
        path: `/api/v1/${recruitmentId}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description 지원 내역 목록을 조회합니다.
     *
     * @tags 지원 API(사용자)
     * @name GetApplicationHistory
     * @summary 사용자 지원 내역 목록 조회 API
     * @request GET:/api/v1/list
     * @secure
     * @response `200` `ResFormToGetApplicationHistoryListDTO` OK
     */
    getApplicationHistory: (params: RequestParams = {}) =>
      this.request<ResFormToGetApplicationHistoryListDTO, any>({
        path: `/api/v1/list`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 지원서 양식 ID를 이용해 양식을 조회합니다.
     *
     * @tags 지원 API(사용자)
     * @name GetFormInfoUser
     * @summary 사용자용 지원서 양식 조회 API
     * @request GET:/api/v1/form/{formId}
     * @secure
     * @response `200` `ResFormToGetFormInfoUserDTO` OK
     */
    getFormInfoUser: (formId: number, params: RequestParams = {}) =>
      this.request<ResFormToGetFormInfoUserDTO, any>({
        path: `/api/v1/form/${formId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 지원 ID를 이용해 해당 사용자가 해당 임시적으로 저장한 지원이 있는지 확인 및 내용을 반환합니다.
     *
     * @tags 지원 API(사용자)
     * @name GetTempApplication
     * @summary 사용자 임시저장 여부 및 내용 반환 API
     * @request GET:/api/v1/apply/{applyId}
     * @secure
     * @response `200` `ResFormToGetApplicationTempDTO` OK
     */
    getTempApplication: (applyId: number, params: RequestParams = {}) =>
      this.request<ResFormToGetApplicationTempDTO, any>({
        path: `/api/v1/apply/${applyId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 지원 ID를 이용해 지원을 취소합니다.
     *
     * @tags 지원 API(사용자)
     * @name DeleteApplication
     * @summary 사용자 지원 취소 API
     * @request DELETE:/api/v1/apply/{recruitmentId}
     * @secure
     * @response `200` `ResFormObject` OK
     */
    deleteApplication: (recruitmentId: number, params: RequestParams = {}) =>
      this.request<ResFormObject, any>({
        path: `/api/v1/apply/${recruitmentId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  지원Api관리자 = {
    /**
     * @description 지원 ID를 이용해 지원 상태를 변경합니다.
     *
     * @tags 지원 API(관리자)
     * @name ChangeApplicationStatus
     * @summary 사용자 지원 상태 변경 API
     * @request PUT:/admin/api/v1/status
     * @secure
     * @response `200` `ResFormObject` OK
     */
    changeApplicationStatus: (data: ToChangeApplicationStatus, params: RequestParams = {}) =>
      this.request<ResFormObject, any>({
        path: `/admin/api/v1/status`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 지원서 양식을 수정합니다.
     *
     * @tags 지원 API(관리자)
     * @name ChangeApplicationForm
     * @summary 동아리 지원서 양식 수정 요청 API
     * @request PUT:/admin/api/v1/form/{form_id}
     * @secure
     * @response `200` `ResFormToCreateApplicationFormDTO` OK
     */
    changeApplicationForm: (formId: number, data: ToCreateApplicationFormDTO, params: RequestParams = {}) =>
      this.request<ResFormToCreateApplicationFormDTO, any>({
        path: `/admin/api/v1/form/${formId}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 지원서 양식을 생성합니다.
     *
     * @tags 지원 API(관리자)
     * @name CreateApplicationForm
     * @summary 동아리 지원서 양식 생성 요청 API
     * @request POST:/admin/api/v1/form/create
     * @secure
     * @response `200` `ResFormToCreateApplicationFormDTO` OK
     */
    createApplicationForm: (data: ToCreateApplicationFormDTO, params: RequestParams = {}) =>
      this.request<ResFormToCreateApplicationFormDTO, any>({
        path: `/admin/api/v1/form/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 지원 ID를(recruitmentId) 이용해 지원 목록을 조회합니다.
     *
     * @tags 지원 API(관리자)
     * @name GetClubApplicationList
     * @summary 지원 목록 조회 API
     * @request GET:/admin/api/v1/{applyId}
     * @secure
     * @response `200` `ResFormToGetApplicationListAdminDTO` OK
     */
    getClubApplicationList: (applyId: number, params: RequestParams = {}) =>
      this.request<ResFormToGetApplicationListAdminDTO, any>({
        path: `/admin/api/v1/${applyId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 지원서 양식 ID를 이용해 양식을 조회합니다.
     *
     * @tags 지원 API(관리자)
     * @name GetFormInfoAdmin
     * @summary 관리자용 지원서 양식 조회 API
     * @request GET:/admin/api/v1/form/{formId}
     * @secure
     * @response `200` `ResFormToGetFormInfoAdminDTO` OK
     */
    getFormInfoAdmin: (formId: number, params: RequestParams = {}) =>
      this.request<ResFormToGetFormInfoAdminDTO, any>({
        path: `/admin/api/v1/form/${formId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 지원서 양식 ID를 이용해 양식을 삭제합니다.
     *
     * @tags 지원 API(관리자)
     * @name DeleteApplicationForm
     * @summary 지원 양식 삭제 API
     * @request DELETE:/admin/api/v1/form/{formId}
     * @secure
     * @response `200` `ResFormObject` OK
     */
    deleteApplicationForm: (formId: number, params: RequestParams = {}) =>
      this.request<ResFormObject, any>({
        path: `/admin/api/v1/form/${formId}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description clubId를 이용해 지원서 목록을 조회합니다.
     *
     * @tags 지원 API(관리자)
     * @name GetClubApplicationFormList
     * @summary club이 가지고 있는 지원서 양식 목록 조회 API
     * @request GET:/admin/api/v1/form/list/{clubId}
     * @secure
     * @response `200` `ResFormListToGetFormInfoAdminDTO` OK
     */
    getClubApplicationFormList: (clubId: number, params: RequestParams = {}) =>
      this.request<ResFormListToGetFormInfoAdminDTO, any>({
        path: `/admin/api/v1/form/list/${clubId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description applicationId를 이용해 지원 내역 단건을 조회합니다.
     *
     * @tags 지원 API(관리자)
     * @name GetClubApplication
     * @summary 지원 내역 단건 조회 API
     * @request GET:/admin/api/v1/application/{applicationId}
     * @secure
     * @response `200` `ResFormToGetApplicationDTO` OK
     */
    getClubApplication: (applicationId: number, params: RequestParams = {}) =>
      this.request<ResFormToGetApplicationDTO, any>({
        path: `/admin/api/v1/application/${applicationId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  };
  mockUpController = {
    /**
     * No description
     *
     * @tags mock-up-controller
     * @name GetUserProfiles
     * @request POST:/profiles
     * @response `200` `(GetUserProfile)[]` OK
     */
    getUserProfiles: (data: GetUserProfilesPayload, params: RequestParams = {}) =>
      this.request<GetUserProfile[], any>({
        path: `/profiles`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mock-up-controller
     * @name TestAuth
     * @request GET:/{recruitmentId}/has-authority
     * @response `200` `boolean` OK
     */
    testAuth: ({ recruitmentId, ...query }: TestAuthParams, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/${recruitmentId}/has-authority`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags mock-up-controller
     * @name TestAuth1
     * @request GET:/recruitment/{recruitmentId}/is-valid
     * @response `200` `boolean` OK
     */
    testAuth1: ({ recruitmentId, ...query }: TestAuth1Params, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/recruitment/${recruitmentId}/is-valid`,
        method: 'GET',
        query: query,
        ...params,
      }),
  };
}
