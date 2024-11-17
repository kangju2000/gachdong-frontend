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

// 답변 스키마 (단답형/장문형)
const textAnswerSchema = z.string().min(1, '답변을 입력해주세요');

// 객관식 답변 스키마
const selectAnswerSchema = z.string().min(1, '옵션을 선택해주세요');

// 체크박스 답변 스키마
const checkboxAnswerSchema = z.array(z.string()).min(1, '최소 1개 이상 선택해주세요');

// 답변 스키마 생성 함수
export function createAnswerSchema(questions: Question[]) {
  return z.object(
    questions.reduce((acc, question) => {
      let schema;

      switch (question.type) {
        case 'shortText':
        case 'longText':
          schema = question.required ? textAnswerSchema : textAnswerSchema.optional();
          break;
        case 'select':
          schema = question.required ? selectAnswerSchema : selectAnswerSchema.optional();
          break;
        case 'checkbox':
          schema = question.required ? checkboxAnswerSchema : checkboxAnswerSchema.optional();
          break;
        default:
          schema = z.never();
      }

      return {
        ...acc,
        [question.name]: schema,
      };
    }, {})
  );
}

// 답변 타입
export type QuestionAnswer = {
  [key: string]: string | string[] | undefined;
};

// 지원서 제출 데이터 스키마
export const applicationSubmitSchema = z.object({
  recruitmentId: z.number(),
  data: z.object({
    toApplyClub: z.object({
      applicationFormId: z.number(),
      status: z.enum(['TEMPORARY_SAVED', 'SAVED', 'SAVED_CHANGEABLE']),
      clubName: z.string(),
      formBody: z.record(z.any()),
    }),
  }),
});

export type ApplicationSubmitData = z.infer<typeof applicationSubmitSchema>;
