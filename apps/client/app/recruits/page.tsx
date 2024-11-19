import { RecruitmentContainer } from './_components/recruitment-container';
import { PrefetchHydration } from '@/components/PrefetchHydration';
import { clubQueries } from '@/apis/club';

export default function RecruitmentsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">동아리 모집 공고</h1>
        <p className="mt-2 text-lg text-gray-600">새로운 동아리원을 모집하고 있어요</p>
      </div>
      <PrefetchHydration queries={[clubQueries.recruitments()]}>
        <RecruitmentContainer />
      </PrefetchHydration>
    </main>
  );
}
