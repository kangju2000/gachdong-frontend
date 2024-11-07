import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Calendar, Eye } from 'lucide-react';
import { CATEGORY_MAP } from '@/constants/categories';
import { ClubRecruitmentResponse } from '@/apis/__generated__/club/swagger';

interface RecruitmentCardProps {
  recruitment: ClubRecruitmentResponse;
}

export function RecruitmentCard({ recruitment }: RecruitmentCardProps) {
  const daysUntilDeadline = Math.ceil(
    (new Date(recruitment.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Link href={`/clubs/${recruitment.clubId}/recruits/${recruitment.recruitmentId}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-gray-100">
          <Image
            src={recruitment.clubImageUrl}
            alt={recruitment.clubName}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-primary/90 text-xs font-medium text-white">{CATEGORY_MAP[recruitment.category]}</Badge>
          </div>
        </div>
        <div className="p-4">
          <h3 className="group-hover:text-primary line-clamp-1 font-medium text-gray-900">{recruitment.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{recruitment.clubName}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className={daysUntilDeadline <= 3 ? 'font-medium text-red-500' : ''}>
                {daysUntilDeadline > 0 ? `마감까지 ${daysUntilDeadline}일` : '마감됨'}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {/* TODO: 조회수 추가 */}
              {/* <span>{recruitment.views || 0}</span> */}
              <span>100</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
