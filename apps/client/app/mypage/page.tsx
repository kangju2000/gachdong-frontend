import { PrefetchHydration } from '@/components/PrefetchHydration';
import MyPageContainer from './mypage-container';
import { authQueries } from '@/apis/auth';
import { Suspense } from 'react';

export default function MyPage() {
  return (
    <PrefetchHydration queries={[authQueries.profile()]}>
      <main className="mx-auto max-w-[980px] px-4 py-6">
        <Suspense fallback={null}>
          <MyPageContainer />
        </Suspense>
      </main>
    </PrefetchHydration>
  );
}
