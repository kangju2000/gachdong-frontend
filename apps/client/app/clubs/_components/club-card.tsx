import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ClubSummaryResponse } from '@gachdong/api/club';
import { CATEGORY_MAP } from '@/constants/categories';
import { cn } from '@/lib/utils';

interface ClubCardProps {
  club: ClubSummaryResponse;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Link href={`/clubs/${club.clubId}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={
              club.clubImageUrl ??
              'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSIyIi8+PHBhdGggZD0ibTIxIDE1LTMuMDg2LTMuMDg2YTIgMiAwIDAgMC0yLjgyOCAwTDYgMjEiLz48L3N2Zz4='
            }
            alt={`${club.clubName} 대표 이미지`}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="group-hover:text-primary line-clamp-1 font-medium text-gray-900">{club.clubName}</h3>
            <Badge variant="secondary" className="shrink-0 text-xs">
              {CATEGORY_MAP[club.category]}
            </Badge>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">{club.shortDescription}</p>
          <div className="mt-3">
            <Badge
              variant="outline"
              className={cn(
                'text-xs font-medium',
                club.recruitingStatus
                  ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800'
                  : 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800'
              )}
            >
              {club.recruitingStatus ? '모집중' : '모집 마감'}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}
