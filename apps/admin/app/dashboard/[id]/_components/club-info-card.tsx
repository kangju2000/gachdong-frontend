'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { CATEGORY_MAP } from '@/constants/categories';
import { clubQueries } from '@/apis/club';
import { useSuspenseQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

export function ClubInfoCard({ clubId }: { clubId: number }) {
  const pathname = usePathname();
  const { data: club } = useSuspenseQuery(clubQueries.club(clubId));

  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
          <Avatar className="relative h-20 w-20 overflow-hidden rounded-full sm:h-24 sm:w-24">
            <AvatarImage src={club.clubImageUrl} asChild>
              <Image src={club.clubImageUrl} alt={`${club.clubName} logo`} sizes="96px" fill priority />
            </AvatarImage>
            <AvatarFallback delayMs={600}>{club.clubName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="mb-2 text-xl font-bold sm:text-2xl">{club.clubName}</h2>
            <p className="text-muted-foreground mb-2 text-sm sm:text-base">{club.shortDescription}</p>
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge variant="secondary">{CATEGORY_MAP[club.category as keyof typeof CATEGORY_MAP]}</Badge>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-center space-y-2 sm:flex-row sm:justify-end sm:space-x-4 sm:space-y-0">
          <Link href={`${pathname}/settings`}>
            <Button variant="outline" className="w-full sm:w-auto">
              동아리 설정
            </Button>
          </Link>
          <Link href={`${pathname}/recruitment/new`}>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
              모집 공고 생성
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
