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
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import { applicationQueries, useCreateApplication } from '@/apis/application';
import { zodResolver } from '@hookform/resolvers/zod';
import { Control, Controller, UseFormRegister, useForm } from 'react-hook-form';
import { Question, QuestionAnswer } from './schemas';
import { createAnswerSchema, ApplicationSubmitData } from './schemas';

interface QuestionFieldProps {
  question: Question;
  register: UseFormRegister<QuestionAnswer>;
  control: Control<QuestionAnswer>;
  errors?: Record<string, any>;
}

function QuestionField({ question, register, control, errors }: QuestionFieldProps) {
  switch (question.type) {
    case 'shortText':
      return <Input {...register(question.name)} maxLength={question.maxLength} />;
    case 'longText':
      return <Textarea {...register(question.name)} maxLength={question.maxLength} rows={6} />;
    case 'select':
      return (
        <RadioGroup {...register(question.name)}>
          {question.options.map(option => (
            <div key={option.label} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.label} />
              <Label htmlFor={option.label}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    case 'checkbox':
      return (
        <Controller
          name={question.name}
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              {question.options.map(option => {
                const isChecked = field.value?.includes(option.value);

                return (
                  <div key={option.label} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${question.name}-${option.value}`}
                      checked={isChecked}
                      onCheckedChange={checked => {
                        const newValue = checked
                          ? [...(field.value || []), option.value]
                          : (Array.isArray(field.value) ? field.value : []).filter(value => value !== option.value);
                        field.onChange(newValue);
                      }}
                    />
                    <Label htmlFor={`${question.name}-${option.value}`}>{option.label}</Label>
                  </div>
                );
              })}
            </div>
          )}
        />
      );
    default:
      return null;
  }
}

export default function ApplyPage({ params }: { params: { clubId: string; recruitId: string } }) {
  const router = useRouter();
  const { clubId, recruitId } = params;

  const { data: recruitment } = useSuspenseQuery(clubQueries.recruitmentsDetail(Number(clubId), Number(recruitId)));
  const { data: club } = useSuspenseQuery(clubQueries.club(Number(clubId)));
  const {
    data: { result: { formBody } = {} },
  } = useSuspenseQuery(applicationQueries.formInfoUser(recruitment.applicationFormId));

  const { mutate: createApplication } = useCreateApplication();

  const questions: Question[] = formBody ? (Object.values(formBody) as Question[]) : [];
  const answerSchema = createAnswerSchema(questions);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuestionAnswer>({
    resolver: zodResolver(answerSchema),
    defaultValues: questions.reduce(
      (acc, question) => ({
        ...acc,
        [question.name]: question.type === 'checkbox' ? [] : '',
      }),
      {}
    ),
  });

  const onSubmit = async (data: QuestionAnswer) => {
    try {
      const submitData: ApplicationSubmitData = {
        recruitmentId: Number(recruitId),
        data: {
          toApplyClub: {
            applicationFormId: recruitment.applicationFormId,
            status: 'SAVED',
            clubName: club.clubName,
            formBody: data,
          },
        },
      };

      createApplication(submitData, {
        onSuccess: () => {
          toast({
            title: '지원 완료',
            description: '지원서가 제출되었습니다.',
          });
          router.push('/mypage');
        },
        onError: error => {
          toast({
            title: '제출 실패',
            description: '지원서 제출 중 오류가 발생했습니다.',
            variant: 'destructive',
          });
          console.error('Application submission error:', error);
        },
      });
    } catch (error) {
      toast({
        title: '제출 실패',
        description: '지원서 제출 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
      console.error('Form submission error:', error);
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
              <QuestionField question={question} register={register} control={control} errors={errors} />
              {errors[question.name] && (
                <p className="text-sm text-red-500">{errors[question.name]?.message as string}</p>
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '제출 중...' : '지원하기'}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
