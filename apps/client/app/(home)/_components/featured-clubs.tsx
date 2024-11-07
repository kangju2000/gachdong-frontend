'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { CATEGORY_MAP } from '@/constants/categories';

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
                  <Image
                    src={
                      club.clubImageUrl ??
                      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWltYWdlIj48cmVjdCB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHg9IjMiIHk9IjMiIHJ4PSIyIiByeT0iMiIvPjxjaXJjbGUgY3g9IjkiIGN5PSI5IiByPSIyIi8+PHBhdGggZD0ibTIxIDE1LTMuMDg2LTMuMDg2YTIgMiAwIDAgMC0yLjgyOCAwTDYgMjEiLz48L3N2Zz4='
                    }
                    alt={club.clubName}
                    fill
                    className="object-cover"
                  />
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
