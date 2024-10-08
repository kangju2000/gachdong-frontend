'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Plus, Search, Users, FileText, AlertCircle } from 'lucide-react';

// 더미 데이터
const recruitmentPosts = [
  { id: 1, title: '2024년 봄학기 신입 부원 모집', status: '진행 중', applicants: 15, createdAt: '2024-02-01' },
  { id: 2, title: '프론트엔드 개발자 모집', status: '마감', applicants: 8, createdAt: '2024-01-15' },
  { id: 3, title: '디자인 팀 추가 모집', status: '진행 중', applicants: 5, createdAt: '2024-02-10' },
];

export default function RecruitmentManagement() {
  return (
    <div className="min-h-screen space-y-6 bg-gray-900 p-6">
      <Card className="border-gray-700 bg-gray-800 shadow-lg">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-gray-100">모집 공고 관리</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="공고 검색"
                className="rounded-full border-gray-600 bg-gray-700 py-5 pl-10 text-gray-100"
              />
            </div>
            <Button className="w-full transform rounded-full bg-blue-600 px-8 py-5 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-700 sm:w-auto">
              <Plus className="mr-2 h-5 w-5" /> 새 공고 생성
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts" className="space-y-6">
        <TabsList className="rounded-full border-gray-700 bg-gray-800 p-1">
          <TabsTrigger
            value="posts"
            className="rounded-full px-6 py-2 text-gray-100 transition duration-200 data-[state=active]:bg-blue-600"
          >
            공고 목록
          </TabsTrigger>
          <TabsTrigger
            value="applicants"
            className="rounded-full px-6 py-2 text-gray-100 transition duration-200 data-[state=active]:bg-blue-600"
          >
            지원자 관리
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-full px-6 py-2 text-gray-100 transition duration-200 data-[state=active]:bg-blue-600"
          >
            알림 설정
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          <Card className="overflow-hidden border-gray-700 bg-gray-800 shadow-lg">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-700 bg-gray-900">
                    <TableHead className="py-4 text-gray-300">제목</TableHead>
                    <TableHead className="py-4 text-gray-300">상태</TableHead>
                    <TableHead className="py-4 text-gray-300">지원자 수</TableHead>
                    <TableHead className="py-4 text-gray-300">생성일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recruitmentPosts.map(post => (
                    <TableRow
                      key={post.id}
                      className="border-b border-gray-700 transition duration-200 hover:bg-gray-700"
                    >
                      <TableCell className="py-4 font-medium text-gray-100">{post.title}</TableCell>
                      <TableCell className="py-4">
                        <Badge
                          variant={post.status === '진행 중' ? 'success' : 'secondary'}
                          className="rounded-full px-3 py-1"
                        >
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-gray-300">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-blue-400" />
                          {post.applicants}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 text-gray-300">
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

        <TabsContent value="applicants" className="space-y-6">
          <Card className="border-gray-700 bg-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="mb-6 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Select>
                  <SelectTrigger className="w-full rounded-full border-gray-600 bg-gray-700 py-5 text-gray-100 sm:w-[250px]">
                    <SelectValue placeholder="공고 선택" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-600 bg-gray-700 text-gray-100">
                    {recruitmentPosts.map(post => (
                      <SelectItem key={post.id} value={post.id.toString()}>
                        {post.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="w-full transform rounded-full bg-blue-600 px-8 py-5 text-white transition duration-200 ease-in-out hover:scale-105 hover:bg-blue-700 sm:w-auto">
                  <FileText className="mr-2 h-5 w-5" /> 지원자 목록 보기
                </Button>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <Users className="mx-auto mb-4 h-12 w-12 text-blue-400" />
                <p className="text-gray-300">선택된 공고의 지원자 목록이 여기에 표시됩니다.</p>
                <p className="mt-2 text-gray-400">공고를 선택하고 '지원자 목록 보기' 버튼을 클릭하세요.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-gray-700 bg-gray-800 shadow-lg">
            <CardContent className="p-6">
              <div className="mb-6 flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Select>
                  <SelectTrigger className="w-full rounded-full border-gray-600 bg-gray-700 py-5 text-gray-100 sm:w-[250px]">
                    <SelectValue placeholder="공고 선택" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-600 bg-gray-700 text-gray-100">
                    {recruitmentPosts.map(post => (
                      <SelectItem key={post.id} value={post.id.toString()}>
                        {post.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="w-full rounded-full bg-blue-600 px-8 py-5 text-white hover:bg-blue-700 sm:w-auto">
                  <Bell className="mr-2 h-5 w-5" /> 알림 설정
                </Button>
              </div>
              <div className="rounded-lg bg-gray-900 p-6 text-center">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-yellow-400" />
                <p className="text-gray-300">선택된 공고의 알림 설정이 여기에 표시됩니다.</p>
                <p className="mt-2 text-gray-400">공고를 선택하고 '알림 설정' 버튼을 클릭하여 알림을 구성하세요.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
