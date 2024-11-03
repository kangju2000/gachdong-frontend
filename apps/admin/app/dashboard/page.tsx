import { PrefetchHydration } from '@/components/PrefetchHydration';
import DashboardCard from './dashboard-card';
import { authQueries } from '@/apis/auth/queries';

export default function DashboardPage() {
  return (
    <PrefetchHydration queries={[authQueries.profile]}>
      <DashboardCard />
    </PrefetchHydration>
  );
}
