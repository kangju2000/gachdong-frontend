import { clubQueries } from '@/apis/club';
import { BannerSlider } from './components/banner-slider';
import { ClubList } from './components/club-list';
import { RecentRecruitments } from './components/recent-recruitments';
import { PrefetchHydration } from '@/components/PrefetchHydration';

export default function Home() {
  return (
    <PrefetchHydration queries={[clubQueries.clubs()]}>
      <main className="mx-auto max-w-[980px] px-4 py-8">
        <BannerSlider />
        <div className="flex flex-col gap-8 lg:flex-row">
          <ClubList />
          <RecentRecruitments />
        </div>
      </main>
    </PrefetchHydration>
  );
}
