'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_MAP } from '@/constants/categories';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export function FeaturedClubs() {
  const {
    data: { results: clubs = [] },
  } = useSuspenseQuery(clubQueries.clubs());

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">인기 동아리</h2>
        <Button variant="ghost" className="group" asChild>
          <Link href="/clubs">
            더 보기
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {clubs.slice(0, 3).map(club => (
          <Link key={club.clubId} href={`/clubs/${club.clubId}`}>
            <div className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg">
              <div className="flex gap-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                  <Avatar>
                    <AvatarImage src={club.clubImageUrl} alt={club.clubName} />
                    <AvatarFallback>{club.clubName.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="group-hover:text-primary font-semibold text-gray-900">{club.clubName}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {CATEGORY_MAP[club.category]}
                    </Badge>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-600">{club.shortDescription}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
