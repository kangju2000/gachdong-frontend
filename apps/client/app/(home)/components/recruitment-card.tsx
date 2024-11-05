import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Eye } from 'lucide-react';
import { ClubRecruitmentResponse } from '@/apis/__generated__/club/swagger';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import { format, formatDistance, ko } from '@/lib/date';

interface RecruitmentCardProps {
  recruitment: ClubRecruitmentResponse;
  onClick: (id: number) => void;
}

export function RecruitmentCard({ recruitment, onClick }: RecruitmentCardProps) {
  const { data: club } = useSuspenseQuery(clubQueries.club(recruitment.clubId));

  return (
    <Card className="cursor-pointer transition-shadow hover:shadow-md" onClick={() => onClick(recruitment.clubId)}>
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div className="bg-muted relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
            <Image src={club.clubImageUrl} alt={`${club.clubName} logo`} className="object-cover" fill sizes="100%" />
          </div>
          <div className="min-w-0 flex-grow">
            <h3 className="truncate text-sm font-semibold">{recruitment.title}</h3>
            <p className="text-muted-foreground truncate text-xs">{club.clubName}</p>
            <div className="text-muted-foreground mt-1 flex items-center space-x-2 text-xs">
              <span className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {format(recruitment.endDate, 'yyyy.MM.dd')}
              </span>
              <span className="flex items-center">
                <Eye className="mr-1 h-3 w-3" />
                {/* TODO: 조회수 추가 */}
                {Number(32).toLocaleString('ko-KR')}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="bg-primary/10 text-primary inline-block rounded-full px-1.5 py-0.5 text-xs font-semibold">
              {formatDistance(recruitment.endDate, new Date(), { locale: ko, addSuffix: true })} 마감
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
