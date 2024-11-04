import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ClubSummaryResponse } from '@/apis/__generated__/club/swagger';
import { CATEGORY_MAP } from '@/constants/categories';

interface ClubCardProps {
  club: ClubSummaryResponse;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Link href={`/clubs/${club.clubId}`}>
      <Card className="h-24 overflow-hidden transition-shadow hover:shadow-md">
        <CardContent className="h-full p-3">
          <div className="flex h-full items-center space-x-3">
            <div className="bg-muted relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
              <Image src={club.clubImageUrl} alt={`${club.clubName} logo`} className="object-cover" fill sizes="100%" />
            </div>
            <div className="flex h-full flex-grow flex-col justify-between overflow-hidden py-1">
              <div>
                <h3 className="truncate text-lg font-semibold leading-tight">{club.clubName}</h3>
                <p className="text-muted-foreground truncate text-sm">{CATEGORY_MAP[club.category]}</p>
              </div>
              <div className="mt-1 flex items-center">
                <span
                  className={`h-2 w-2 rounded-full ${club.recruitingStatus ? 'bg-green-500' : 'bg-red-500'} mr-2`}
                ></span>
                <span className={`text-sm ${club.recruitingStatus ? 'text-green-600' : 'text-red-600'}`}>
                  {club.recruitingStatus ? '모집중' : '모집 마감'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
