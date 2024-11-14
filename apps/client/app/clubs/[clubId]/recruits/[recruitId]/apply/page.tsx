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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { applicationQueries } from '@/apis/application';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Question {
  type: 'short' | 'long' | 'multiple' | 'checkbox';
  title: string;
  description: string;
  required: boolean;
  maxLength: number;
  options: string[];
}

// 동적 폼 필드를 위한 컴포넌트
function QuestionField({ question, register, errors }: { question: Question; register: any; errors: any }) {
  switch (question.type) {
    case 'short':
      return <Input {...register(question.title)} placeholder={question.description} maxLength={question.maxLength} />;
    case 'long':
      return (
        <Textarea
          {...register(question.title)}
          placeholder={question.description}
          maxLength={question.maxLength}
          rows={6}
        />
      );
    case 'multiple':
      return (
        <RadioGroup {...register(question.title)}>
          {question.options.map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    case 'checkbox':
      return (
        <div className="space-y-2">
          {question.options.map(option => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox {...register(question.title)} id={`${question.title}-${option}`} value={option} />
              <Label htmlFor={`${question.title}-${option}`}>{option}</Label>
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

  // 데이터 페칭
  const { data: recruitment } = useSuspenseQuery(clubQueries.recruitmentsDetail(Number(clubId), Number(recruitId)));
  const {
    data: { result: { formBody } = {} },
  } = useSuspenseQuery(applicationQueries.formInfoUser(Number(recruitId)));

  const questions: Question[] = formBody ? (Object.values(formBody) as Question[]) : [];

  // 동적 폼 유효성 검사 스키마 생성
  const formSchema = z.object({
    ...questions.reduce(
      (acc, question) => ({
        ...acc,
        [question.title]: question.required
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

  const onSubmit = async (data: any) => {
    try {
      // API 호출 로직
      // await applicationQueries.({
      //   clubId: Number(clubId),
      //   recruitId: Number(recruitId),
      //   ...data,
      //   status: 'SUBMITTED',
      //   createdAt: new Date().toISOString(),
      // });

      toast({
        title: '지원 완료',
        description: '지원서가 제출되었습니다.',
      });

      router.push('/mypage');
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
          <h1 className="text-2xl font-bold">{recruitment.title}</h1>
          <p className="text-muted-foreground">
            {format(recruitment.startDate, 'yyyy.MM.dd')} - {format(recruitment.endDate, 'yyyy.MM.dd')}
          </p>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit(onSubmit)}>
          {questions.map((question, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-baseline justify-between">
                <Label className="text-base font-semibold">
                  {question.title}
                  {question.required && <span className="ml-1 text-red-500">*</span>}
                </Label>
                {question.maxLength > 0 && (
                  <span className="text-muted-foreground text-sm">최대 {question.maxLength}자</span>
                )}
              </div>
              {question.description && <p className="text-muted-foreground text-sm">{question.description}</p>}
              <QuestionField question={question} register={register} errors={errors} />
              {errors[question.title] && (
                <p className="text-sm text-red-500">{errors[question.title]?.message as string}</p>
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
