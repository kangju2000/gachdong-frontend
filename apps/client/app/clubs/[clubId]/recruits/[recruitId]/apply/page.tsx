'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import { format } from '@/lib/date';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { applicationQueries, useCreateApplication } from '@/apis/application';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Question, RecruitmentFormData } from './schemas';

// 동적 폼 필드를 위한 컴포넌트
function QuestionField({ question, register, errors }: { question: Question; register: any; errors: any }) {
  switch (question.type) {
    case 'shortText':
      return <Input {...register(question.label)} maxLength={question.maxLength} />;
    case 'longText':
      return <Textarea {...register(question.label)} maxLength={question.maxLength} rows={6} />;
    case 'select':
      return (
        <RadioGroup {...register(question.label)}>
          {question.options.map(option => (
            <div key={option.label} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    case 'checkbox':
      return (
        <div className="space-y-2">
          {question.options.map(option => (
            <div key={option.label} className="flex items-center space-x-2">
              <Checkbox {...register(question.label)} id={`${question.label}-${option.value}`} value={option.value} />
              <Label htmlFor={`${question.label}-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function ApplyPage({ params }: { params: { clubId: string; recruitId: string } }) {
  const router = useRouter();
  const { clubId, recruitId } = params;

  const formId = 9; // FIXME: 임시 고정

  // 데이터 페칭
  const { data: recruitment } = useSuspenseQuery(clubQueries.recruitmentsDetail(Number(clubId), Number(recruitId)));
  const { data: club } = useSuspenseQuery(clubQueries.club(Number(clubId)));
  const {
    data: { result: { formBody } = {} },
  } = useSuspenseQuery(applicationQueries.formInfoUser(formId));

  const { mutate: createApplication } = useCreateApplication();

  const questions: Question[] = formBody ? (Object.values(formBody) as Question[]) : [];

  // 동적 폼 유효성 검사 스키마 생성
  const formSchema = z.object({
    ...questions.reduce(
      (acc, question) => ({
        ...acc,
        [question.label]: question.required
          ? question.type === 'checkbox'
            ? z.array(z.string()).min(1, '필수 항목입니다')
            : z.string().min(1, '필수 항목입니다')
          : question.type === 'checkbox'
            ? z.array(z.string()).optional()
            : z.string().optional(),
      }),
      {}
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      createApplication(
        {
          applyId: Number(recruitId),
          data: {
            toApplyClub: {
              applicationFormId: formId,
              status: 'SAVED',
              clubName: club.clubName,
              formBody: data,
            },
          },
        },
        {
          onSuccess: () => {
            toast({
              title: '지원 완료',
              description: '지원서가 제출되었습니다.',
            });

            router.push('/mypage');
          },
        }
      );
    } catch (error) {
      toast({
        title: '제출 실패',
        description: '지원서 제출 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  return (
    <main className="mx-auto max-w-[980px] px-4 py-6">
      <Link
        href={`/clubs/${clubId}/recruits/${recruitId}`}
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        공고로 돌아가기
      </Link>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b p-6">
          <h1 className="text-3xl font-bold">{recruitment.title}</h1>
          <Link href={`/clubs/${clubId}`} className="text-muted-foreground text-sm">
            {club.clubName}
          </Link>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
          {questions.map((question, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-baseline justify-between">
                <Label className="text-base font-semibold">
                  {question.label}
                  {question.required && <span className="ml-1 text-red-500">*</span>}
                </Label>
                {'maxLength' in question && (
                  <span className="text-muted-foreground text-sm">최대 {question.maxLength}자</span>
                )}
              </div>
              {question.description && <p className="text-muted-foreground text-sm">{question.description}</p>}
              <QuestionField question={question} register={register} errors={errors} />
              {errors[question.label] && (
                <p className="text-sm text-red-500">{errors[question.label]?.message as string}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-4">
            <Button type="submit">지원하기</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
