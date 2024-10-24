import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RecruitmentCard } from './recruitment-card';
import { Recruitment } from '@/types';

interface RecentRecruitmentsProps {
  recruitments: Recruitment[];
  onRecruitmentSelect: (id: number) => void;
}

export function RecentRecruitments({ recruitments, onRecruitmentSelect }: RecentRecruitmentsProps) {
  return (
    <section className="lg:w-1/3">
      <h2 className="mb-4 text-2xl font-semibold">최근 올라온 공고</h2>
      <div className="flex flex-col space-y-3">
        {recruitments.map(recruitment => (
          <RecruitmentCard key={recruitment.id} recruitment={recruitment} onClick={onRecruitmentSelect} />
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button variant="outline" asChild>
          <Link href="/recruits">+ 더보기</Link>
        </Button>
      </div>
    </section>
  );
}
