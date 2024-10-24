'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { BannerSlider } from './components/banner-slider';
import { ClubList } from './components/club-list';
import { RecentRecruitments } from './components/recent-recruitments';
import { useClubs, useRecruitments } from '@/apis/club';
import { RECRUIT_LIST } from '@/constants/data';

export default function Home() {
  const router = useRouter();
  const { data: clubs } = useClubs();
  const { data: recruitments } = useRecruitments();

  const handleClubSelect = (clubId: number) => {
    router.push(`/clubs/${clubId}`);
  };

  const handleRecruitmentSelect = (recruitmentId: number) => {
    router.push(`/recruits/${recruitmentId}`);
  };

  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <Header />
      <main className="mx-auto max-w-[980px] px-4 py-8">
        <BannerSlider bannerItems={RECRUIT_LIST} />

        <div className="flex flex-col gap-8 lg:flex-row">
          <ClubList clubs={clubs} onClubSelect={handleClubSelect} />
          <RecentRecruitments recruitments={recruitments.slice(0, 3)} onRecruitmentSelect={handleRecruitmentSelect} />
        </div>
      </main>
    </div>
  );
}
