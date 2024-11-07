'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { format } from '@/lib/date';
import { CATEGORY_MAP } from '@/constants/categories';

export function ActiveRecruitments() {
  const {
    data: { results: recruitments = [] },
  } = useSuspenseQuery(clubQueries.recruitments());

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">모집 중인 동아리</h2>
        <Button variant="ghost" className="group" asChild>
          <Link href="/recruits">
            더 보기
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {recruitments.slice(0, 3).map(recruitment => (
          <Link key={recruitment.clubId} href={`/recruits/${recruitment.clubId}`}>
            <div className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-lg">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {CATEGORY_MAP[recruitment.category]}
                    </Badge>
                    <span className="flex items-center text-sm text-gray-500">
                      <Calendar className="text-primary/70 mr-1.5 h-4 w-4" />
                      {format(new Date(recruitment.endDate), 'yyyy.MM.dd')} 마감
                    </span>
                  </div>
                  <h3 className="group-hover:text-primary mt-2 font-medium text-gray-900">{recruitment.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{recruitment.clubName}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {recruitments.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <p className="text-gray-500">현재 진행 중인 모집공고가 없습니다</p>
            <p className="mt-1 text-sm text-gray-400">나중에 다시 확인해 주세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}
