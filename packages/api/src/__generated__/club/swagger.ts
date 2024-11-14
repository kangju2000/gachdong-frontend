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

export interface CreateClubRecruitmentRequest {
  /**
   * 동아리 ID
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 모집 제목
   * @example "2021년도 1학기 신입부원 모집"
   */
  title: string;
  /**
   * 공고 내용
   * @example "신입부원을 모집합니다."
   */
  content: string;
  /**
   * 모집 인원
   * @format int64
   * @example 10
   */
  recruitmentCount: number;
  /**
   * 모집 시작일
   * @format date-time
   */
  startDate: string;
  /**
   * 모집 마감일
   * @format date-time
   */
  endDate: string;
  /**
   * 모집 프로세스 설정, Json 형식으로 넣어주세요.
   * @example "{
   *   "process1": "서류 심사",
   *   "process2": "1차 면접",
   *   "process3": "2차 면접"
   *  "process4": "최종 합격"
   * }"
   */
  processData: Record<string, object>;
}

export interface CreateClubRecruitmentResponse {
  /**
   * 동아리 ID
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 동아리 모집 ID
   * @format int64
   * @example 1
   */
  clubRecruitmentId: number;
}

export interface CreateClubRequest {
  /**
   * 동아리 이름
   * @example "가츠동"
   */
  name: string;
  /**
   * 동아리 카테고리
   * @example "SPORTS"
   */
  category: 'ACADEMIC' | 'EXHIBITION' | 'SPORTS' | 'PERFORMANCE' | 'MUSIC' | 'RELIGION' | 'OTHER';
  /**
   * 동아리 한줄 설명
   * @example "가츠동은 최고의 동아리입니다."
   */
  shortDescription: string;
  /**
   * 동아리 소개
   * @example "<h1>가츠동</h1> <p>최고의 동아리입니다</p>"
   */
  introduction?: string;
  /**
   * 동아리 이미지 URL
   * @example "http://example.com/image.png"
   */
  clubImageUrl?: string;
  /**
   * 동아리 설립일
   * @format date-time
   */
  establishedAt?: string;
}

export interface ClubResponse {
  /**
   * 동아리 ID
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 동아리 이름
   * @example "가츠동"
   */
  clubName: string;
  /**
   * 동아리 카테고리
   * @example "SPORTS"
   */
  category: 'ACADEMIC' | 'EXHIBITION' | 'SPORTS' | 'PERFORMANCE' | 'MUSIC' | 'RELIGION' | 'OTHER';
  /**
   * 한줄 소개
   * @example "가츠동은 최고의 동아리입니다."
   */
  shortDescription: string;
  /**
   * 이미지 URL
   * @example "http://example.com/image.jpg"
   */
  clubImageUrl: string;
  /**
   * 모집 여부
   * @example true
   */
  recruitingStatus: boolean;
  /**
   * 동아리 설명
   * @example "가츠동은 다양한 활동을 하는 동아리입니다."
   */
  introduction: string;
  /**
   * 설립일
   * @format date-time
   */
  establishedAt: string;
  /**
   * 업데이트일
   * @format date-time
   */
  updatedAt: string;
}

export interface CreateClubContactInfoRequest {
  /**
   * 동아리 ID
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 연락처 유형
   * @example "전화번호"
   */
  type: string;
  /**
   * 연락처
   * @example "010-1234-5678"
   */
  contact: string;
}

export interface CreateClubContactInfoResponse {
  /**
   * 동아리 ID
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 연락처 ID
   * @format int64
   * @example 1
   */
  ContactId: number;
}

export interface CreateClubActivityRequest {
  /**
   * 동아리 ID
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 활동 제목
   * @example "가츠동 축구 동아리 첫 모임"
   */
  title: string;
  /**
   * 활동 설명
   * @example "가츠동 축구 동아리 첫 모임입니다."
   */
  description: string;
  /**
   * 활동 날짜
   * @format date
   * @example "2023-08-31"
   */
  date: string;
}

export interface CreateClubActivityResponse {
  /**
   * 동아리 ID
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 활동 ID
   * @format int64
   * @example 1
   */
  activityId: number;
}

export interface ArrayResponseClubRecruitmentDetailResponse {
  /** 결과 목록 */
  results?: ClubRecruitmentDetailResponse[];
}

/** 결과 목록 */
export interface ClubRecruitmentDetailResponse {
  /**
   * 동아리 ID
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 모집 ID
   * @format int64
   * @example 1
   */
  recruitmentId: number;
  /**
   * 모집공고 이름
   * @example "GDSC Gachon 24-25 Member 모집"
   */
  title: string;
  /**
   * 모집공고 내용
   * @example "GDSC Gachon 24-25 Member 모집합니다."
   */
  content: string;
  /**
   * 모집 인원
   * @format int64
   * @example 5
   */
  recruitmentCount: number;
  /**
   * 모집 상태
   * @example true
   */
  recruitmentStatus: boolean;
  /**
   * 모집 시작일
   * @format date-time
   */
  startDate: string;
  /**
   * 모집 마감일
   * @format date-time
   */
  endDate: string;
  /**
   * 모집 프로세스 설정
   * @example "{
   *   "process1": "서류 심사",
   *   "process2": "1차 면접",
   *   "process3": "2차 면접"
   *  "process4": "최종 합격"
   * }"
   */
  processData: Record<string, object>;
}

export interface ArrayResponseClubContactInfoResponse {
  /** 결과 목록 */
  results?: ClubContactInfoResponse[];
}

/** 결과 목록 */
export interface ClubContactInfoResponse {
  /**
   * 연락 수단 (예: gmail, phone)
   * @example "gmail"
   */
  contactMethod: string;
  /**
   * 연락처 정보
   * @example "gachdong@gmail.com"
   */
  contactValue: string;
}

export interface ArrayResponseClubActivityResponse {
  /** 결과 목록 */
  results?: ClubActivityResponse[];
}

/** 결과 목록 */
export interface ClubActivityResponse {
  /**
   * 활동 제목
   * @example "2024년 봄 캠프"
   */
  title: string;
  /**
   * 활동 날짜
   * @format date
   * @example "2024-04-12"
   */
  date: string;
  /**
   * 활동 설명
   * @example "봄 캠프에서 다양한 활동을 했습니다."
   */
  description: string;
}

export interface ArrayResponseClubRecruitmentResponse {
  /** 결과 목록 */
  results?: ClubRecruitmentResponse[];
}

/** 결과 목록 */
export interface ClubRecruitmentResponse {
  /**
   * 동아리 id
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 모집공고 ID
   * @format int64
   * @example 1
   */
  recruitmentId: number;
  /**
   * 모집공고 이름
   * @example "GDSC Gachon 24-25 Member 모집"
   */
  title: string;
  /**
   * 동아리 이름
   * @example "가츠동"
   */
  clubName: string;
  /**
   * 동아리 이미지 URL
   * @example "https://gach-dong.club"
   */
  clubImageUrl: string;
  /**
   * 모집 시작일
   * @format date-time
   */
  startDate: string;
  /**
   * 모집 마감일
   * @format date-time
   */
  endDate: string;
  /**
   * 동아리 카테고리
   * @example "SPORTS"
   */
  category: 'ACADEMIC' | 'EXHIBITION' | 'SPORTS' | 'PERFORMANCE' | 'MUSIC' | 'RELIGION' | 'OTHER';
}

export interface ArrayResponseClubSummaryResponse {
  /** 결과 목록 */
  results?: ClubSummaryResponse[];
}

/** 결과 목록 */
export interface ClubSummaryResponse {
  /**
   * 동아리 id
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 동아리 이름
   * @example "가츠동"
   */
  clubName: string;
  /**
   * 동아리 카테고리
   * @example "SPORTS"
   */
  category: 'ACADEMIC' | 'EXHIBITION' | 'SPORTS' | 'PERFORMANCE' | 'MUSIC' | 'RELIGION' | 'OTHER';
  /**
   * 한줄 소개
   * @example "가츠동은 최고의 동아리입니다."
   */
  shortDescription: string;
  /**
   * 이미지 URL
   * @example "http://example.com/image.jpg"
   */
  clubImageUrl: string;
  /**
   * 모집 여부
   * @example true
   */
  recruitingStatus: boolean;
}

/** 결과 목록 */
export interface AdminAuthorizedClubResponse {
  /**
   * 동아리 ID
   * @format int64
   * @example 1
   */
  clubId: number;
  /**
   * 동아리 이름
   * @example "가츠동"
   */
  clubName: string;
  /**
   * 동아리 관리자 권한
   * @example "CLUB_ADMIN"
   */
  clubAdminRole: 'PRESIDENT' | 'MEMBER';
  /**
   * 동아리 이미지 URL
   * @example "https://example.com/club.png"
   */
  clubImageUrl: string;
}

export interface ArrayResponseAdminAuthorizedClubResponse {
  /** 결과 목록 */
  results?: AdminAuthorizedClubResponse[];
}

export namespace Admin동아리Api {
  /**
   * @description 동아리 모집 공고를 입력받아 동아리에 추가합니다.
   * @tags Admin 동아리 API
   * @name CreateClubRecruitment
   * @summary 동아리 모집 공고 생성
   * @request POST:/admin/api/v1/recruitment/create
   * @secure
   * @response `200` `CreateClubRecruitmentResponse` OK
   */
  export namespace CreateClubRecruitment {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateClubRecruitmentRequest;
    export type RequestHeaders = {};
    export type ResponseBody = CreateClubRecruitmentResponse;
  }

  /**
   * @description 동아리 정보를 입력받아 동아리를 생성합니다.
   * @tags Admin 동아리 API
   * @name CreateClub
   * @summary 동아리 생성
   * @request POST:/admin/api/v1/create
   * @secure
   * @response `200` `ClubResponse` OK
   */
  export namespace CreateClub {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateClubRequest;
    export type RequestHeaders = {};
    export type ResponseBody = ClubResponse;
  }

  /**
   * @description 동아리 연락처 정보를 입력받아 동아리에 추가합니다.
   * @tags Admin 동아리 API
   * @name CreateClubContactInfo
   * @summary 동아리 연락처 정보 생성
   * @request POST:/admin/api/v1/contact-info/create
   * @secure
   * @response `200` `CreateClubContactInfoResponse` OK
   */
  export namespace CreateClubContactInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateClubContactInfoRequest;
    export type RequestHeaders = {};
    export type ResponseBody = CreateClubContactInfoResponse;
  }

  /**
   * @description 동아리 활동 내역을 입력받아 동아리에 추가합니다.
   * @tags Admin 동아리 API
   * @name CreateClubActivity
   * @summary 동아리 활동 내역 생성
   * @request POST:/admin/api/v1/activities/create
   * @secure
   * @response `200` `CreateClubActivityResponse` OK
   */
  export namespace CreateClubActivity {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateClubActivityRequest;
    export type RequestHeaders = {};
    export type ResponseBody = CreateClubActivityResponse;
  }

  /**
   * @description 모집 공고 ID를 통해 특정 동아리에 대한 권한이 있는지 확인합니다.
   * @tags Admin 동아리 API
   * @name HasAuthorityByRecruitmentId
   * @summary 모집 공고 ID를 가지고 특정 동아리에 대한 권한이 있는지 확인
   * @request GET:/admin/api/v1/{recruitmentId}/has-authority
   * @secure
   * @response `200` `boolean` OK
   */
  export namespace HasAuthorityByRecruitmentId {
    export type RequestParams = {
      /** @format int64 */
      recruitmentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = boolean;
  }

  /**
   * @description 유효한 동아리 모집 공고인지 확인합니다.
   * @tags Admin 동아리 API
   * @name IsValidRecruitment
   * @summary 유효한 동아리 모집 공고인지 확인
   * @request GET:/admin/api/v1/recruitment/{recruitmentId}/is-valid
   * @secure
   * @response `200` `boolean` OK
   */
  export namespace IsValidRecruitment {
    export type RequestParams = {
      /** @format int64 */
      recruitmentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = boolean;
  }

  /**
   * @description 특정 동아리에 대한 권한이 있는지 확인합니다.
   * @tags Admin 동아리 API
   * @name HasAuthority
   * @summary 특정 동아리에 대한 권한이 있는지 확인
   * @request GET:/admin/api/v1/has-authority/{clubId}
   * @secure
   * @response `200` `boolean` OK
   */
  export namespace HasAuthority {
    export type RequestParams = {
      /** @format int64 */
      clubId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = boolean;
  }

  /**
   * @description 권한이 있는 사용자의 동아리 리스트를 조회합니다.
   * @tags Admin 동아리 API
   * @name GetAuthorizedClubs
   * @summary 권한있는 동아리 리스트 조회
   * @request GET:/admin/api/v1/authorized-clubs
   * @secure
   * @response `200` `ArrayResponseAdminAuthorizedClubResponse` OK
   */
  export namespace GetAuthorizedClubs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ArrayResponseAdminAuthorizedClubResponse;
  }
}

export namespace Public동아리Api {
  /**
   * @description 동아리 ID을 이용하여 동아리 정보를 조회합니다.
   * @tags Public 동아리 API
   * @name GetClub
   * @summary 동아리 조회
   * @request GET:/public/api/v1/{clubId}
   * @response `200` `ClubResponse` OK
   */
  export namespace GetClub {
    export type RequestParams = {
      /**
       * 동아리 ID
       * @format int64
       * @example 1
       */
      clubId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ClubResponse;
  }

  /**
   * @description 특정 동아리의 모집 공고를 조회합니다.
   * @tags Public 동아리 API
   * @name GetClubRecruitments
   * @summary 동아리 별 모집 공고 조회
   * @request GET:/public/api/v1/{clubId}/recruitments
   * @response `200` `ArrayResponseClubRecruitmentDetailResponse` OK
   */
  export namespace GetClubRecruitments {
    export type RequestParams = {
      /**
       * 동아리 ID
       * @format int64
       * @example 1
       */
      clubId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ArrayResponseClubRecruitmentDetailResponse;
  }

  /**
   * @description 특정 동아리의 특정 모집 공고를 조회합니다.
   * @tags Public 동아리 API
   * @name GetClubRecruitment
   * @summary 특정 동아리 모집 공고 상세 조회
   * @request GET:/public/api/v1/{clubId}/recruitments/{recruitmentId}
   * @response `200` `ClubRecruitmentDetailResponse` OK
   */
  export namespace GetClubRecruitment {
    export type RequestParams = {
      /**
       * 동아리 ID
       * @format int64
       * @example 1
       */
      clubId: number;
      /**
       * 모집 공고 ID
       * @format int64
       * @example 1
       */
      recruitmentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ClubRecruitmentDetailResponse;
  }

  /**
   * @description 동아리 연락처 정보를 조회합니다.
   * @tags Public 동아리 API
   * @name GetClubContactInfo
   * @summary 동아리 연락처 정보 조회
   * @request GET:/public/api/v1/{clubId}/contact-info
   * @response `200` `ArrayResponseClubContactInfoResponse` OK
   */
  export namespace GetClubContactInfo {
    export type RequestParams = {
      /**
       * 동아리 ID
       * @format int64
       * @example 1
       */
      clubId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ArrayResponseClubContactInfoResponse;
  }

  /**
   * @description 동아리 활동 내역을 조회합니다.
   * @tags Public 동아리 API
   * @name GetClubActivities
   * @summary 동아리 활동 내역 조회
   * @request GET:/public/api/v1/{clubId}/activities
   * @response `200` `ArrayResponseClubActivityResponse` OK
   */
  export namespace GetClubActivities {
    export type RequestParams = {
      /**
       * 동아리 ID
       * @format int64
       * @example 1
       */
      clubId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ArrayResponseClubActivityResponse;
  }

  /**
   * @description 모든 동아리의 모집 공고를 조회합니다.
   * @tags Public 동아리 API
   * @name GetClubsRecruitments
   * @summary 동아리 모집 공고 조회
   * @request GET:/public/api/v1/recruitments
   * @response `200` `ArrayResponseClubRecruitmentResponse` OK
   */
  export namespace GetClubsRecruitments {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ArrayResponseClubRecruitmentResponse;
  }

  /**
   * @description 모든 동아리 정보를 조회합니다.
   * @tags Public 동아리 API
   * @name GetClubs
   * @summary 동아리 목록 조회
   * @request GET:/public/api/v1/
   * @response `200` `ArrayResponseClubSummaryResponse` OK
   */
  export namespace GetClubs {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ArrayResponseClubSummaryResponse;
  }
}

export namespace 동아리Api {
  /**
   * @description 테스트입니다.
   * @tags 동아리 API
   * @name GetUserInfo
   * @summary 테스트 조회
   * @request GET:/api/v1/user-info
   * @secure
   * @response `200` `string` OK
   */
  export namespace GetUserInfo {
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
  public baseUrl: string = 'https://gateway-dev.gachdong.club/club/';
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
 * @title 가츠동 API 명세 - 동아리 서비스
 * @version v1
 * @baseUrl https://gateway-dev.gachdong.club/club/
 *
 * 동아리 서비스에 대한 API 명세입니다.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  admin동아리Api = {
    /**
     * @description 동아리 모집 공고를 입력받아 동아리에 추가합니다.
     *
     * @tags Admin 동아리 API
     * @name CreateClubRecruitment
     * @summary 동아리 모집 공고 생성
     * @request POST:/admin/api/v1/recruitment/create
     * @secure
     * @response `200` `CreateClubRecruitmentResponse` OK
     */
    createClubRecruitment: (data: CreateClubRecruitmentRequest, params: RequestParams = {}) =>
      this.request<CreateClubRecruitmentResponse, any>({
        path: `/admin/api/v1/recruitment/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 정보를 입력받아 동아리를 생성합니다.
     *
     * @tags Admin 동아리 API
     * @name CreateClub
     * @summary 동아리 생성
     * @request POST:/admin/api/v1/create
     * @secure
     * @response `200` `ClubResponse` OK
     */
    createClub: (data: CreateClubRequest, params: RequestParams = {}) =>
      this.request<ClubResponse, any>({
        path: `/admin/api/v1/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 연락처 정보를 입력받아 동아리에 추가합니다.
     *
     * @tags Admin 동아리 API
     * @name CreateClubContactInfo
     * @summary 동아리 연락처 정보 생성
     * @request POST:/admin/api/v1/contact-info/create
     * @secure
     * @response `200` `CreateClubContactInfoResponse` OK
     */
    createClubContactInfo: (data: CreateClubContactInfoRequest, params: RequestParams = {}) =>
      this.request<CreateClubContactInfoResponse, any>({
        path: `/admin/api/v1/contact-info/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 동아리 활동 내역을 입력받아 동아리에 추가합니다.
     *
     * @tags Admin 동아리 API
     * @name CreateClubActivity
     * @summary 동아리 활동 내역 생성
     * @request POST:/admin/api/v1/activities/create
     * @secure
     * @response `200` `CreateClubActivityResponse` OK
     */
    createClubActivity: (data: CreateClubActivityRequest, params: RequestParams = {}) =>
      this.request<CreateClubActivityResponse, any>({
        path: `/admin/api/v1/activities/create`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description 모집 공고 ID를 통해 특정 동아리에 대한 권한이 있는지 확인합니다.
     *
     * @tags Admin 동아리 API
     * @name HasAuthorityByRecruitmentId
     * @summary 모집 공고 ID를 가지고 특정 동아리에 대한 권한이 있는지 확인
     * @request GET:/admin/api/v1/{recruitmentId}/has-authority
     * @secure
     * @response `200` `boolean` OK
     */
    hasAuthorityByRecruitmentId: (recruitmentId: number, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/admin/api/v1/${recruitmentId}/has-authority`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 유효한 동아리 모집 공고인지 확인합니다.
     *
     * @tags Admin 동아리 API
     * @name IsValidRecruitment
     * @summary 유효한 동아리 모집 공고인지 확인
     * @request GET:/admin/api/v1/recruitment/{recruitmentId}/is-valid
     * @secure
     * @response `200` `boolean` OK
     */
    isValidRecruitment: (recruitmentId: number, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/admin/api/v1/recruitment/${recruitmentId}/is-valid`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 특정 동아리에 대한 권한이 있는지 확인합니다.
     *
     * @tags Admin 동아리 API
     * @name HasAuthority
     * @summary 특정 동아리에 대한 권한이 있는지 확인
     * @request GET:/admin/api/v1/has-authority/{clubId}
     * @secure
     * @response `200` `boolean` OK
     */
    hasAuthority: (clubId: number, params: RequestParams = {}) =>
      this.request<boolean, any>({
        path: `/admin/api/v1/has-authority/${clubId}`,
        method: 'GET',
        secure: true,
        ...params,
      }),

    /**
     * @description 권한이 있는 사용자의 동아리 리스트를 조회합니다.
     *
     * @tags Admin 동아리 API
     * @name GetAuthorizedClubs
     * @summary 권한있는 동아리 리스트 조회
     * @request GET:/admin/api/v1/authorized-clubs
     * @secure
     * @response `200` `ArrayResponseAdminAuthorizedClubResponse` OK
     */
    getAuthorizedClubs: (params: RequestParams = {}) =>
      this.request<ArrayResponseAdminAuthorizedClubResponse, any>({
        path: `/admin/api/v1/authorized-clubs`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  };
  public동아리Api = {
    /**
     * @description 동아리 ID을 이용하여 동아리 정보를 조회합니다.
     *
     * @tags Public 동아리 API
     * @name GetClub
     * @summary 동아리 조회
     * @request GET:/public/api/v1/{clubId}
     * @response `200` `ClubResponse` OK
     */
    getClub: (clubId: number, params: RequestParams = {}) =>
      this.request<ClubResponse, any>({
        path: `/public/api/v1/${clubId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 특정 동아리의 모집 공고를 조회합니다.
     *
     * @tags Public 동아리 API
     * @name GetClubRecruitments
     * @summary 동아리 별 모집 공고 조회
     * @request GET:/public/api/v1/{clubId}/recruitments
     * @response `200` `ArrayResponseClubRecruitmentDetailResponse` OK
     */
    getClubRecruitments: (clubId: number, params: RequestParams = {}) =>
      this.request<ArrayResponseClubRecruitmentDetailResponse, any>({
        path: `/public/api/v1/${clubId}/recruitments`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 특정 동아리의 특정 모집 공고를 조회합니다.
     *
     * @tags Public 동아리 API
     * @name GetClubRecruitment
     * @summary 특정 동아리 모집 공고 상세 조회
     * @request GET:/public/api/v1/{clubId}/recruitments/{recruitmentId}
     * @response `200` `ClubRecruitmentDetailResponse` OK
     */
    getClubRecruitment: (clubId: number, recruitmentId: number, params: RequestParams = {}) =>
      this.request<ClubRecruitmentDetailResponse, any>({
        path: `/public/api/v1/${clubId}/recruitments/${recruitmentId}`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 동아리 연락처 정보를 조회합니다.
     *
     * @tags Public 동아리 API
     * @name GetClubContactInfo
     * @summary 동아리 연락처 정보 조회
     * @request GET:/public/api/v1/{clubId}/contact-info
     * @response `200` `ArrayResponseClubContactInfoResponse` OK
     */
    getClubContactInfo: (clubId: number, params: RequestParams = {}) =>
      this.request<ArrayResponseClubContactInfoResponse, any>({
        path: `/public/api/v1/${clubId}/contact-info`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 동아리 활동 내역을 조회합니다.
     *
     * @tags Public 동아리 API
     * @name GetClubActivities
     * @summary 동아리 활동 내역 조회
     * @request GET:/public/api/v1/{clubId}/activities
     * @response `200` `ArrayResponseClubActivityResponse` OK
     */
    getClubActivities: (clubId: number, params: RequestParams = {}) =>
      this.request<ArrayResponseClubActivityResponse, any>({
        path: `/public/api/v1/${clubId}/activities`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 모든 동아리의 모집 공고를 조회합니다.
     *
     * @tags Public 동아리 API
     * @name GetClubsRecruitments
     * @summary 동아리 모집 공고 조회
     * @request GET:/public/api/v1/recruitments
     * @response `200` `ArrayResponseClubRecruitmentResponse` OK
     */
    getClubsRecruitments: (params: RequestParams = {}) =>
      this.request<ArrayResponseClubRecruitmentResponse, any>({
        path: `/public/api/v1/recruitments`,
        method: 'GET',
        ...params,
      }),

    /**
     * @description 모든 동아리 정보를 조회합니다.
     *
     * @tags Public 동아리 API
     * @name GetClubs
     * @summary 동아리 목록 조회
     * @request GET:/public/api/v1/
     * @response `200` `ArrayResponseClubSummaryResponse` OK
     */
    getClubs: (params: RequestParams = {}) =>
      this.request<ArrayResponseClubSummaryResponse, any>({
        path: `/public/api/v1/`,
        method: 'GET',
        ...params,
      }),
  };
  동아리Api = {
    /**
     * @description 테스트입니다.
     *
     * @tags 동아리 API
     * @name GetUserInfo
     * @summary 테스트 조회
     * @request GET:/api/v1/user-info
     * @secure
     * @response `200` `string` OK
     */
    getUserInfo: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/user-info`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  };
}
