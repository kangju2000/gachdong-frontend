import { clubQueries } from '@/apis/club';
import { ClubInfoCard } from './_components/club-info-card';
import { ActivitiesCard } from './_components/activities-card';
import { ContactInfoCard } from './_components/contact-info-card';
import { PrefetchHydration } from '@/components/PrefetchHydration';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/loading-spinner';

export default async function DashboardPage({ params }: { params: { id: string } }) {
  return (
    <PrefetchHydration
      queries={[
        clubQueries.club(Number(params.id)),
        clubQueries.activities(Number(params.id)),
        clubQueries.contactInfo(Number(params.id)),
      ]}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <div className="space-y-6">
          <ClubInfoCard clubId={Number(params.id)} />
          <ActivitiesCard clubId={Number(params.id)} />
          <ContactInfoCard clubId={Number(params.id)} />
        </div>
      </Suspense>
    </PrefetchHydration>
  );
}
