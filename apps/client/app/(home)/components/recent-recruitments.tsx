'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RecruitmentCard } from './recruitment-card';

import { useRouter } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';

export function RecentRecruitments() {
  const {
    data: { results: recruitments = [] },
  } = useSuspenseQuery(clubQueries.recruitments());

  const router = useRouter();

  const handleRecruitmentSelect = (recruitmentId: number) => {
    router.push(`/recruits/${recruitmentId}`);
  };

  return (
    <section className="lg:w-1/3">
      <h2 className="mb-4 text-2xl font-semibold">최근 올라온 공고</h2>
      <div className="flex flex-col space-y-3">
        {recruitments.map(recruitment => (
          <RecruitmentCard key={recruitment.clubId} recruitment={recruitment} onClick={handleRecruitmentSelect} />
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
