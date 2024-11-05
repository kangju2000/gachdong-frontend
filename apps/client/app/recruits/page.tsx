'use client';

import { SuspenseQuery } from '@suspensive/react-query';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, Filter, Calendar, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { clubQueries } from '@/apis/club';
import { useSuspenseQuery } from '@tanstack/react-query';
import { formatDistance } from 'date-fns/formatDistance';
import { format, ko } from '@/lib/date';
import { CATEGORY_MAP } from '@/constants/categories';

export default function recruitmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const {
    data: { results: recruitments = [] },
  } = useSuspenseQuery(clubQueries.recruitments());

  const filteredRecruitList = recruitments.filter(
    recruitment =>
      (selectedCategory === 'ALL' || recruitment.category === selectedCategory) &&
      (recruitment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recruitment.clubName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <main className="mx-auto max-w-[980px] px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold">동아리 공고</h1>

      <div className="mb-6 flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
        <Tabs defaultValue="ALL" className="w-full sm:w-auto" onValueChange={setSelectedCategory}>
          <TabsList>
            {Object.entries(CATEGORY_MAP).map(([key, value]) => (
              <TabsTrigger key={key} value={key} className="whitespace-nowrap px-3 py-1.5 text-sm">
                {value}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex w-full space-x-2 sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 transform" />
            <Input
              type="search"
              placeholder="공고 검색"
              className="w-full py-2 pl-10 pr-4 sm:w-[200px]"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                필터
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>최신순</DropdownMenuItem>
              <DropdownMenuItem>마감 임박순</DropdownMenuItem>
              <DropdownMenuItem>조회수 순</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        {filteredRecruitList.map(recruitment => (
          <SuspenseQuery key={recruitment.clubId} {...clubQueries.club(recruitment.clubId)}>
            {({ data: club }) => (
              <Link href={`/recruits/${recruitment.clubId}`} key={recruitment.clubId}>
                <Card className="transition-shadow hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-muted relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                        <Image src={club.clubImageUrl} alt={`${club.clubName} logo`} className="object-cover" fill />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold">{recruitment.title}</h3>
                        <p className="text-muted-foreground text-sm">{club.clubName}</p>
                        <div className="text-muted-foreground mt-1 flex items-center space-x-4 text-sm">
                          <span className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {format(new Date(recruitment.startDate), 'yyyy.MM.dd')} -{' '}
                            {format(new Date(recruitment.endDate), 'yyyy.MM.dd')}
                          </span>
                          <span className="flex items-center">
                            <Eye className="mr-1 h-4 w-4" />
                            {/* {recruitment.views} */}
                            {/* TODO: 조회수 추가 */}
                            32
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-primary/10 text-primary inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold">
                          {formatDistance(new Date(recruitment.startDate), new Date(), { locale: ko, addSuffix: true })}{' '}
                          마감
                        </span>
                        <p className="text-muted-foreground mt-1 text-sm">{CATEGORY_MAP[recruitment.category]}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )}
          </SuspenseQuery>
        ))}
      </div>

      {filteredRecruitList.length === 0 && (
        <div className="text-muted-foreground py-8 text-center">검색 결과가 없습니다.</div>
      )}
    </main>
  );
}
