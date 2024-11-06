import { clubQueries } from '@/apis/club';
import { PrefetchHydration } from '@/components/PrefetchHydration';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { StatCard } from './components/stat-card';
import { FeaturedClubs } from './components/featured-clubs';
import { ActiveRecruitments } from './components/active-recruitments';

export default function Home() {
  return (
    <PrefetchHydration queries={[clubQueries.clubs(), clubQueries.recruitments()]}>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                당신의 대학생활을 더 풍요롭게
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
                관심있는 동아리를 찾고, 새로운 친구들과 함께 성장하세요
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/clubs">동아리 둘러보기</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/recruits">모집 공고 보기</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured & Active Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2">
              <FeaturedClubs />
              <ActiveRecruitments />
            </div>
          </div>
        </section>

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
      </main>
    </PrefetchHydration>
  );
}
