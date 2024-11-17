import { StatCard } from './_components/stat-card';
import { FeaturedClubs } from './_components/featured-clubs';
import { ActiveRecruitments } from './_components/active-recruitments';
import { Banner } from './_components/Banner';
import { PrefetchHydration } from '@/components/PrefetchHydration';
import { authQueries } from '@/apis/auth';
import { clubQueries } from '@/apis/club';
import { Suspense } from 'react';

export default function Home() {
  return (
    <PrefetchHydration queries={[authQueries.profile(), clubQueries.clubs(), clubQueries.recruitments()]}>
      {/* Hero Section */}
      <Banner />

      <Suspense fallback={null}>
        {/* Featured & Active Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              <FeaturedClubs />
              <ActiveRecruitments />
            </div>
          </div>
        </section>
      </Suspense>

      {/* Stats Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">다양한 동아리들과 함께하세요</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <StatCard number="100+" label="활성 동아리" />
            <StatCard number="50+" label="진행중인 모집" />
          </div>
        </div>
      </section>
    </PrefetchHydration>
  );
}
