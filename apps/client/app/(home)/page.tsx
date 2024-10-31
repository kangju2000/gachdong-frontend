import { Header } from '@/components/layout/header';
import { BannerSlider } from './components/banner-slider';
import { ClubList } from './components/club-list';
import { RecentRecruitments } from './components/recent-recruitments';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <Header />
      <Suspense>
        <main className="mx-auto max-w-[980px] px-4 py-8">
          <BannerSlider />

          <div className="flex flex-col gap-8 lg:flex-row">
            <ClubList />
            <RecentRecruitments />
          </div>
        </main>
      </Suspense>
    </div>
  );
}
