'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Plus, Search, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const recruitmentPosts = [
  { id: 1, title: '2024년 봄학기 신입 부원 모집', status: '진행 중', applicants: 15, createdAt: '2024-02-01' },
  { id: 2, title: '프론트엔드 개발자 모집', status: '마감', applicants: 8, createdAt: '2024-01-15' },
  { id: 3, title: '디자인 팀 추가 모집', status: '진행 중', applicants: 5, createdAt: '2024-02-10' },
];

export default function RecruitmentManagement() {
  const router = useRouter();
  const pathname = usePathname();

  const handlePostClick = (postId: number) => {
    router.push(`${pathname}/${postId}`);
  };

  return (
    <div className="space-y-6">
      <Card className="border-gray-700 bg-gray-800 shadow-lg">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-gray-100">모집 공고 관리</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input placeholder="공고 검색" className="border-gray-600 bg-gray-700 pl-10 text-gray-100" />
            </div>
            <Link href={`${pathname}/new`}>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">
                <Plus className="mr-2 h-5 w-5" /> 새 공고 생성
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="border-gray-700 bg-gray-800">
          <TabsTrigger value="posts" className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100">
            공고 목록
          </TabsTrigger>
          {/* <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-gray-700 data-[state=active]:text-gray-100"
          >
            알림 설정
          </TabsTrigger> */}
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <Card className="border-gray-700 bg-gray-800 shadow-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-700 hover:bg-gray-800">
                    <TableHead className="text-gray-300">제목</TableHead>
                    <TableHead className="text-gray-300">상태</TableHead>
                    <TableHead className="text-gray-300">지원자 수</TableHead>
                    <TableHead className="text-gray-300">생성일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recruitmentPosts.map(post => (
                    <TableRow
                      key={post.id}
                      className="cursor-pointer border-b border-gray-700 hover:bg-gray-700"
                      onClick={() => handlePostClick(post.id)}
                    >
                      <TableCell className="font-medium text-gray-100">{post.title}</TableCell>
                      <TableCell>
                        <Badge
                          variant="default"
                          className={cn({
                            'bg-blue-600 text-white': post.status === '진행 중',
                            'bg-gray-600 text-white': post.status === '마감',
                          })}
                        >
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-blue-400" />
                          {post.applicants}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-green-400" />
                          {post.createdAt}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-gray-700 bg-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="mb-6 flex justify-end">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  <Bell className="mr-2 h-5 w-5" /> 알림 설정
                </Button>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <Bell className="mx-auto mb-4 h-12 w-12 text-yellow-400" />
                <p className="text-gray-300">전체 공고에 대한 알림 설정을 관리합니다.</p>
                <p className="mt-2 text-gray-400">'알림 설정' 버튼을 클릭하여 알림을 구성하세요.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
