// Validation 관련 타입
export interface ValidationRule {
  pattern: string;
  message: string;
}

// 미리 정의된 validation 패턴
export const VALIDATION_PATTERNS = {
  email: {
    pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
    message: '올바른 이메일 형식을 입력해주세요.',
  },
  phone: {
    pattern: '^\\d{2,3}-\\d{3,4}-\\d{4}$',
    message: '올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)',
  },
  url: {
    pattern:
      '^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$',
    message: '올바른 URL 형식을 입력해주세요.',
  },
} as const;

// 질문 타입 상수
export const QUESTION_TYPES = [
  {
    value: 'shortText',
    label: '단답형',
    description: '이름, 이메일 등 짧은 텍스트 응답',
  },
  {
    value: 'longText',
    label: '장문형',
    description: '자기소개, 지원동기 등 긴 텍스트 응답',
  },
  {
    value: 'singleSelect',
    label: '단일 선택',
    description: '여러 옵션 중 하나를 선택',
  },
  {
    value: 'multiSelect',
    label: '다중 선택',
    description: '여러 옵션 중 복수 선택',
  },
  {
    value: 'attachment',
    label: '파일 첨부',
    description: '이력서, 포트폴리오 등 파일 업로드',
  },
] as const;

// 기본 질문 타입
export interface BaseQuestion {
  type: (typeof QUESTION_TYPES)[number]['value'];
  name: string;
  label: string;
  required: boolean;
  description: string | null;
}

// 단답형/장문형 질문
export interface TextQuestion extends BaseQuestion {
  type: 'shortText' | 'longText';
  maxLength?: number;
  validation?: ValidationRule;
}

// 선택형 질문 (단일/다중)
export interface SelectQuestion extends BaseQuestion {
  type: 'singleSelect' | 'multiSelect';
  options: Array<{
    label: string;
    value: string;
  }>;
  maxSelect?: number;
}

// 파일 첨부 질문
export interface AttachmentQuestion extends BaseQuestion {
  type: 'attachment';
  acceptedFileTypes: string[];
  maxFileSize?: number;
}

// 모든 질문 타입을 포함하는 유니온 타입
export type Question = TextQuestion | SelectQuestion | AttachmentQuestion;

// 자주 사용되는 질문 템플릿
export const QUESTION_TEMPLATES = {
  personalInfo: [
    {
      type: 'shortText',
      name: 'name',
      label: '이름',
      required: true,
      description: '지원자 본인의 이름을 입력해주세요.',
      maxLength: 10,
    },
    {
      type: 'shortText',
      name: 'email',
      label: '이메일',
      required: true,
      description: '연락 가능한 이메일 주소를 입력해주세요.',
      validation: VALIDATION_PATTERNS.email,
    },
    {
      type: 'shortText',
      name: 'phone',
      label: '연락처',
      required: true,
      description: '연락 가능한 전화번호를 입력해주세요.',
      validation: VALIDATION_PATTERNS.phone,
    },
  ],
  attachments: [
    {
      type: 'attachment',
      name: 'resume',
      label: '이력서',
      required: true,
      description: 'PDF 형식으로 업로드해주세요.',
      acceptedFileTypes: ['.pdf'],
      maxFileSize: 10,
    },
    {
      type: 'attachment',
      name: 'portfolio',
      label: '포트폴리오',
      required: false,
      description: 'PDF 또는 ZIP 형식으로 업로드해주세요.',
      acceptedFileTypes: ['.pdf', '.zip'],
      maxFileSize: 50,
    },
  ],
} satisfies Record<string, Question[]>;

export type QuestionTemplates = typeof QUESTION_TEMPLATES;
