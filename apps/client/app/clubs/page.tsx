import { clubQueries } from '@/apis/club';
import { PrefetchHydration } from '@/components/PrefetchHydration';
import { ClubListContainer } from './_components/club-list-container';
import { Suspense } from 'react';

export default function ClubsPage() {
  return (
    <PrefetchHydration queries={[clubQueries.clubs()]}>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">동아리 목록</h1>
          <p className="mt-2 text-lg text-gray-600">다양한 동아리를 찾아보세요</p>
        </div>
        <Suspense fallback={null}>
          <ClubListContainer />
        </Suspense>
      </main>
    </PrefetchHydration>
  );
}
