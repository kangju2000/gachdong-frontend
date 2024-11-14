import { z } from 'zod';

// 기본 정보 스키마
const postInfoSchema = z
  .object({
    title: z.string().min(1, '제목을 입력해주세요'),
    content: z.string().min(1, '내용을 입력해주세요'),
    startDate: z.string().min(1, '시작일을 선택해주세요'),
    endDate: z.string().min(1, '종료일을 선택해주세요'),
  })
  .refine(data => new Date(data.startDate) <= new Date(data.endDate), {
    message: '종료일은 시작일 이후여야 합니다',
    path: ['endDate'],
  });

// 프로세스 스키마
const processSchema = z.object({
  label: z.string().min(1, '프로세스 이름을 입력해주세요'),
  order: z.number(),
});

// 기본 질문 스키마
const baseQuestionSchema = z.object({
  name: z.string().min(1, '질문 ID를 입력해주세요'),
  label: z.string().min(1, '질문을 입력해주세요'),
  required: z.boolean(),
  description: z.string().nullable(),
});

// 단답형 질문 스키마
const shortTextQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('shortText'),
  maxLength: z.number().optional(),
});

// 장문형 질문 스키마
const longTextQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('longText'),
  maxLength: z.number().optional(),
});

// 객관식 질문 스키마
const selectQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('select'),
  options: z
    .array(
      z.object({
        label: z.string().min(1, '옵션 레이블을 입력해주세요'),
        value: z.string().min(1, '옵션 값을 입력해주세요'),
      })
    )
    .min(1, '최소 1개의 옵션이 필요합니다'),
});

// 체크박스 질문 스키마
const checkboxQuestionSchema = baseQuestionSchema.extend({
  type: z.literal('checkbox'),
  options: z
    .array(
      z.object({
        label: z.string().min(1, '옵션 레이블을 입력해주세요'),
        value: z.string().min(1, '옵션 값을 입력해주세요'),
      })
    )
    .min(1, '최소 1개의 옵션이 필요합니다'),
});

// 질문 스키마 통합
export const questionSchema = z.discriminatedUnion('type', [
  shortTextQuestionSchema,
  longTextQuestionSchema,
  selectQuestionSchema,
  checkboxQuestionSchema,
]);

// 전체 폼 스키마
export const recruitmentFormSchema = z.object({
  postInfo: postInfoSchema,
  processes: z.array(processSchema),
  questions: z.array(questionSchema),
});

export type RecruitmentFormData = z.infer<typeof recruitmentFormSchema>;
export type Process = z.infer<typeof processSchema>;
export type Question = z.infer<typeof questionSchema>;
