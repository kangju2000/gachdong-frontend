import { FileText, Users, FileCode, Presentation, CheckCircle } from 'lucide-react';
import { Question } from '../schemas';

export interface ProcessType {
  id: string;
  label: string;
  icon: keyof typeof PROCESS_ICONS;
}

export const PROCESS_ICONS = {
  FileText,
  Users,
  FileCode,
  Presentation,
  CheckCircle,
} as const;

export const RECRUITMENT_PROCESS_TYPES: ProcessType[] = [
  {
    id: 'document',
    label: '서류 심사',
    icon: 'FileText',
  },
  {
    id: 'interview',
    label: '면접',
    icon: 'Users',
  },
  {
    id: 'task',
    label: '과제',
    icon: 'FileCode',
  },
  {
    id: 'presentation',
    label: '발표',
    icon: 'Presentation',
  },
  {
    id: 'final',
    label: '최종 합격',
    icon: 'CheckCircle',
  },
];

export const QUESTION_TYPES = [
  {
    value: 'shortText',
    label: '단답형',
    description: '짧은 텍스트 응답을 받습니다.',
    icon: 'TextIcon',
  },
  {
    value: 'longText',
    label: '장문형',
    description: '긴 텍스트 응답을 받습니다.',
    icon: 'AlignLeftIcon',
  },
  {
    value: 'select',
    label: '객관식',
    description: '여러 옵션 중 하나를 선택합니다.',
    icon: 'ListIcon',
  },
  {
    value: 'checkbox',
    label: '체크박스',
    description: '여러 옵션을 중복 선택할 수 있습니다.',
    icon: 'CheckSquareIcon',
  },
] as const;

export const DEFAULT_TEMPLATES: Record<string, Question[]> = {
  personalInfo: [
    {
      type: 'shortText',
      name: 'name',
      label: '이름',
      required: true,
      description: null,
    },
    {
      type: 'shortText',
      name: 'studentId',
      label: '학번',
      required: true,
      description: null,
    },
    {
      type: 'shortText',
      name: 'major',
      label: '전공',
      required: true,
      description: null,
    },
    {
      type: 'shortText',
      name: 'phone',
      label: '연락처',
      required: true,
      description: '연락 가능한 휴대폰 번호를 입력해주세요.',
    },
    {
      type: 'shortText',
      name: 'email',
      label: '이메일',
      required: true,
      description: null,
    },
  ],
  experience: [
    {
      type: 'longText',
      name: 'motivation',
      label: '지원 동기',
      required: true,
      description: '우리 동아리에 지원하게 된 동기를 작성해주세요.',
      maxLength: 1000,
    },
    {
      type: 'longText',
      name: 'experience',
      label: '관련 경험',
      required: false,
      description: '관련된 활동 경험이 있다면 작성해주세요.',
      maxLength: 1000,
    },
  ],
  availability: [
    {
      type: 'select',
      name: 'availableDay',
      label: '선호하는 활동 요일',
      required: true,
      description: '정기 모임 참석이 가능한 요일을 선택해주세요.',
      options: [
        { label: '월요일', value: 'monday' },
        { label: '화요일', value: 'tuesday' },
        { label: '수요일', value: 'wednesday' },
        { label: '목요일', value: 'thursday' },
        { label: '금요일', value: 'friday' },
      ],
    },
    {
      type: 'checkbox',
      name: 'interests',
      label: '관심 분야',
      required: true,
      description: '관심 있는 분야를 모두 선택해주세요.',
      options: [
        { label: '프론트엔드', value: 'frontend' },
        { label: '백엔드', value: 'backend' },
        { label: '디자인', value: 'design' },
        { label: '기획', value: 'planning' },
      ],
    },
  ],
} as const;

export type QuestionType = (typeof QUESTION_TYPES)[number]['value'];
export type TemplateKey = keyof typeof DEFAULT_TEMPLATES;
