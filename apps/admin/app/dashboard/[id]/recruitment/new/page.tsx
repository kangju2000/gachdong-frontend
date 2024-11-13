import { Suspense } from 'react';
import RecruitmentForm from './_components/RecruitmentForm';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function RecruitmentPostPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RecruitmentForm />
    </Suspense>
  );
}
