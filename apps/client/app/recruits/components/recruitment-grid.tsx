import { SuspenseQuery } from '@suspensive/react-query';
import { clubQueries } from '@/apis/club';
import { ClubRecruitmentResponse } from '@/apis/__generated__/club/swagger';
import { RecruitmentCard } from './recruitment-card';

interface RecruitmentGridProps {
  recruitments: ClubRecruitmentResponse[];
}

export function RecruitmentGrid({ recruitments }: RecruitmentGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {recruitments.map(recruitment => (
        <SuspenseQuery key={recruitment.clubId} {...clubQueries.club(recruitment.clubId)}>
          {({ data: club }) => <RecruitmentCard recruitment={recruitment} clubImageUrl={club.clubImageUrl} />}
        </SuspenseQuery>
      ))}
    </div>
  );
}
