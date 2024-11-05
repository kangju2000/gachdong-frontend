'use client';

import { SuspenseQuery } from '@suspensive/react-query';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, Eye, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { clubQueries } from '@/apis/club';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format } from '@/lib/date';
import { CATEGORY_MAP } from '@/constants/categories';
import { motion } from 'framer-motion';

export default function RecruitmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('latest');

  const {
    data: { results: recruitments = [] },
  } = useSuspenseQuery(clubQueries.recruitments());

  const filteredRecruitList = recruitments.filter(
    recruitment =>
      (selectedCategory === 'ALL' || recruitment.category === selectedCategory) &&
      (recruitment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recruitment.clubName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedAndFilteredRecruitList = filteredRecruitList.sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      // case 'views':
      //   return (b.views || 0) - (a.views || 0);
      default:
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
  });

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">동아리 모집 공고</h1>
          <p className="text-lg text-gray-600">다양한 동아리의 모집 공고를 확인해보세요</p>
        </div>

        <div className="mb-8 rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <Tabs defaultValue="ALL" className="w-full lg:w-auto" onValueChange={setSelectedCategory}>
              <TabsList className="bg-gray-100 p-1">
                {Object.entries(CATEGORY_MAP).map(([key, value]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
                  >
                    {value}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="flex gap-3">
              <div className="relative flex-1 lg:w-80 lg:flex-none">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="동아리나 공고 제목으로 검색"
                  className="pl-10"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">최신순</SelectItem>
                  <SelectItem value="deadline">마감 임박순</SelectItem>
                  <SelectItem value="views">조회수 순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedAndFilteredRecruitList.map(recruitment => (
            <SuspenseQuery key={recruitment.clubId} {...clubQueries.club(recruitment.clubId)}>
              {({ data: club }) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/recruits/${recruitment.clubId}`}>
                    <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
                      <CardContent className="p-0">
                        <div className="relative h-48 w-full">
                          <Image
                            src={club.clubImageUrl}
                            alt={club.clubName}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            fill
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <span className="bg-primary mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium text-white">
                              {CATEGORY_MAP[recruitment.category]}
                            </span>
                            <h3 className="text-xl font-bold text-white">{recruitment.title}</h3>
                          </div>
                        </div>

                        <div className="p-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{club.clubName}</span>
                          </div>

                          <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(recruitment.endDate), 'yyyy.MM.dd')} 마감
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {/* TODO: 조회수 추가 */}
                              {/* {recruitment.views || 0} */}0
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )}
            </SuspenseQuery>
          ))}
        </div>

        {filteredRecruitList.length === 0 && (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg bg-white">
            <div className="text-center">
              <p className="text-lg font-medium text-gray-900">검색 결과가 없습니다</p>
              <p className="mt-1 text-sm text-gray-500">다른 검색어나 카테고리로 시도해보세요</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
