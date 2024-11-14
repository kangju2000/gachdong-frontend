import { PrefetchHydration } from '@/components/PrefetchHydration';
import DashboardCard from './dashboard-card';
import { authQueries } from '@/apis/auth';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';

export default function DashboardPage() {
  return (
    <PrefetchHydration queries={[authQueries.profile()]}>
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardCard />
      </Suspense>
    </PrefetchHydration>
  );
}
