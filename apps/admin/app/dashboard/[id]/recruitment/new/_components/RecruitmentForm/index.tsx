'use client';

import { useParams, useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { PostInfoSection } from './PostInfoSection';
import { ProcessSection } from './ProcessSection';
import { ApplicationTemplate } from './ApplicationTemplate';
import { ActionButtons } from './ActionButtons';
import { useCreateApplicationForm } from '@/apis/application/mutation';
import { useCreateClubRecruitment } from '@/apis/club';
import { RecruitmentFormData, recruitmentFormSchema } from '../../schemas';

const DEFAULT_VALUES: RecruitmentFormData = {
  postInfo: {
    title: '',
    content: '',
    startDate: '',
    endDate: '',
  },
  processes: [
    {
      label: '서류 심사',
      order: 1,
    },
  ],
  questions: [],
};

export default function RecruitmentForm() {
  const router = useRouter();
  const params = useParams();
  const { mutateAsync: createClubRecruitment, isPending: isCreatingRecruitment } = useCreateClubRecruitment();
  const { mutateAsync: createApplicationForm, isPending: isCreatingForm } = useCreateApplicationForm();

  const methods = useForm<RecruitmentFormData>({
    resolver: zodResolver(recruitmentFormSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isValid, isDirty, errors },
  } = methods;

  const isSubmitting = isCreatingRecruitment || isCreatingForm;

  const handleSaveDraft = async () => {
    try {
      const data = methods.getValues();
      // TODO: Implement draft saving logic
      toast({
        title: '임시저장 되었습니다.',
      });
    } catch (error) {
      console.error('Draft save error:', error);
      toast({
        title: '임시저장에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  const handlePublish = async (data: RecruitmentFormData) => {
    try {
      // 프로세스 데이터를 Record 형태로 변환
      const processData = data.processes.reduce(
        (acc, process, index) => ({
          ...acc,
          [`process${index + 1}`]: {
            order: index + 1,
            label: process.label,
          },
        }),
        {} as Record<string, { order: number; label: string }>
      );

      // 지원서 양식 생성
      const formBody = Object.fromEntries(
        data.questions.map((question, index) => [
          `question${index + 1}`,
          {
            ...question,
            order: index + 1,
          },
        ])
      );

      // FIXME
      const { result: { applicationFormId } = {} } = await createApplicationForm({
        clubId: Number(params.id),
        status: 'SAVED',
        formName: data.postInfo.title,
        formBody,
      });

      const { clubRecruitmentId } = await createClubRecruitment({
        clubId: Number(params.id),
        applicationFormId,
        title: data.postInfo.title,
        content: data.postInfo.content,
        recruitmentCount: 10, // TODO: Make this configurable
        startDate: new Date(data.postInfo.startDate).toISOString(),
        endDate: new Date(data.postInfo.endDate).toISOString(),
        processData,
      });

      toast({
        title: '모집 공고가 성공적으로 등록되었습니다.',
      });
      router.push(`/dashboard/${params.id}/recruitment/${clubRecruitmentId}`);
      router.refresh();
    } catch (error) {
      console.error('Publish error:', error);
      toast({
        title: '모집 공고 등록에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handlePublish)} className="space-y-6">
        <PostInfoSection />
        <ProcessSection />
        <ApplicationTemplate />
        <ActionButtons
          onSaveDraft={handleSaveDraft}
          onPublish={handleSubmit(handlePublish)}
          isValid={isValid && isDirty}
          isSubmitting={isSubmitting}
        />

        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 max-w-md">
            <details className="bg-muted rounded-lg p-4 shadow-lg">
              <summary className="cursor-pointer text-sm font-medium">Debug Info</summary>
              <pre className="mt-2 max-h-96 overflow-auto text-xs">
                {JSON.stringify({ isValid, isDirty, errors }, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
