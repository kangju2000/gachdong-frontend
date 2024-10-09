'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const postsData = [
  {
    id: 1,
    title: '2024년 봄학기 신입부원 모집',
    totalApplicants: 100,
    averageCompetition: '5:1',
    views: 500,
    stages: [
      { name: '1차 서류', 지원자: 100, 합격자: 50 },
      { name: '2차 면접', 지원자: 50, 합격자: 30 },
      { name: '최종 선발', 지원자: 30, 합격자: 20 },
    ],
  },
  {
    id: 2,
    title: '2023년 가을학기 신입부원 모집',
    totalApplicants: 80,
    averageCompetition: '4:1',
    views: 450,
    stages: [
      { name: '1차 서류', 지원자: 80, 합격자: 40 },
      { name: '2차 면접', 지원자: 40, 합격자: 25 },
      { name: '최종 선발', 지원자: 25, 합격자: 18 },
    ],
  },
  {
    id: 3,
    title: '2023년 봄학기 신입부원 모집',
    totalApplicants: 120,
    averageCompetition: '6:1',
    views: 600,
    stages: [
      { name: '1차 서류', 지원자: 120, 합격자: 60 },
      { name: '2차 면접', 지원자: 60, 합격자: 35 },
      { name: '최종 선발', 지원자: 35, 합격자: 22 },
    ],
  },
];

export default function ClubStatistics() {
  const [selectedPost, setSelectedPost] = useState(postsData[0]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">동아리 통계</h1>
        <Select
          defaultValue={selectedPost.id.toString()}
          onValueChange={value => setSelectedPost(postsData.find(post => post.id.toString() === value) || postsData[0])}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="공고 선택" />
          </SelectTrigger>
          <SelectContent>
            {postsData.map(post => (
              <SelectItem key={post.id} value={post.id.toString()}>
                {post.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>총 지원자 수</CardTitle>
            <CardDescription>선택된 공고의 총 지원자 수</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{selectedPost.totalApplicants}명</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>평균 경쟁률</CardTitle>
            <CardDescription>선택된 공고의 평균 경쟁률</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{selectedPost.averageCompetition}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>공고 조회수</CardTitle>
            <CardDescription>선택된 공고의 조회수</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{selectedPost.views}회</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>모집 단계별 지원자 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              지원자: {
                label: '지원자',
                color: 'hsl(var(--chart-1))',
              },
              합격자: {
                label: '합격자',
                color: 'hsl(var(--chart-2))',
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={selectedPost.stages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="지원자" fill="var(--color-지원자)" />
                <Bar dataKey="합격자" fill="var(--color-합격자)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>최근 공고 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {postsData.map(post => (
              <div key={post.id} className="flex items-center justify-between border-b border-gray-700 pb-2">
                <div>
                  <h3 className="font-medium text-gray-200">{post.title}</h3>
                  <p className="text-sm text-gray-400">지원자: {post.totalApplicants}명</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">조회수: {post.views}회</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
