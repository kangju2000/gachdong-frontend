import { PrefetchHydration } from '@/components/PrefetchHydration';
import { RecruitmentList } from './_components/recruitment-list';
import { clubQueries } from '@/apis/club';

export default async function RecruitmentManagementPage({ params }: { params: { id: string } }) {
  return (
    <PrefetchHydration queries={[clubQueries.recruitmentByClub(Number(params.id))]}>
      <RecruitmentList />
    </PrefetchHydration>
  );
}
