import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PrefetchHydration } from '@/components/PrefetchHydration';
import { clubQueries } from '@/apis/club';
import { ArrowLeft } from 'lucide-react';
import { RecruitContainer } from './_components/recruit-container';
import { ErrorBoundary } from 'react-error-boundary';

function RecruitErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">유효하지 않은 공고입니다</h2>
      <p className="mb-6 text-gray-600">해당 공고를 찾을 수 없거나 삭제되었을 수 있습니다.</p>
      <Button variant="outline" asChild>
        <Link href="/recruits">모든 공고 보기</Link>
      </Button>
    </div>
  );
}

export default function RecruitmentDetailPage({ params }: { params: { clubId: string; recruitId: string } }) {
  return (
    <ErrorBoundary fallback={<RecruitErrorFallback />}>
      <PrefetchHydration
        queries={[
          clubQueries.club(Number(params.clubId)),
          clubQueries.recruitmentsDetail(Number(params.clubId), Number(params.recruitId)),
        ]}
      >
        <main className="mx-auto max-w-[980px] px-4 py-6">
          <Button variant="ghost" asChild className="mb-6">
            <Link href={`/clubs/${params.clubId}/recruits`} className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              모든 공고 보기
            </Link>
          </Button>

          <RecruitContainer />
        </main>
      </PrefetchHydration>
    </ErrorBoundary>
  );
}
