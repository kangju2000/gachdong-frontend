export interface QuestionType {
  value: string;
  label: string;
}

export interface PostInfo {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  processes: string[];
}

export interface Question {
  type: string;
  title: string;
  description: string;
  required: boolean;
  maxLength: number;
  options: string[];
}

export const questionTypes: QuestionType[] = [
  { value: 'short', label: '단답형' },
  { value: 'long', label: '장문형' },
  { value: 'multiple', label: '객관식' },
  { value: 'checkbox', label: '체크박스' },
];
