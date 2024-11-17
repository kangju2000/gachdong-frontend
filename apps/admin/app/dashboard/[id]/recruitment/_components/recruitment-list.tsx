'use client';

import { useRecruitmentSearch } from '../_hooks/useRecruitmentSearch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams, usePathname } from 'next/navigation';
import { RecruitmentHeader } from './recruitment-header';
import { RecruitmentTable } from './recruitment-table';
import { RecruitmentNotifications } from './recruitment-notifications';
import { Card, CardContent } from '@/components/ui/card';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';

export function RecruitmentList() {
  const params = useParams();
  const {
    data: { results: recruitmentPosts = [] },
  } = useSuspenseQuery(clubQueries.recruitmentByClub(Number(params.id)));

  const pathname = usePathname();
  const { searchTerm, filteredPosts, handleSearch, handlePostClick } = useRecruitmentSearch({
    recruitmentPosts,
  });

  return (
    <div className="space-y-6">
      <RecruitmentHeader searchTerm={searchTerm} onSearch={handleSearch} pathname={pathname} />

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="border-gray-700 bg-gray-800">
          <TabsTrigger value="posts" className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100">
            공고 목록
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100"
          >
            알림 설정
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <Card className="border-gray-700 bg-gray-800 shadow-lg">
            <CardContent className="p-0">
              <RecruitmentTable posts={filteredPosts} searchTerm={searchTerm} onPostClick={handlePostClick} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <RecruitmentNotifications />
        </TabsContent>
      </Tabs>
    </div>
  );
}
