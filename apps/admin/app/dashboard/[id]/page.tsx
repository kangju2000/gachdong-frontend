'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, UserPlus, Bell } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ClubInfo {
  name: string;
  description: string;
  logoUrl: string;
  categories: string[];
  totalMembers: number;
  activeRecruitments: number;
  newApplicants: number;
  newNotifications: number;
}

export default function Dashboard() {
  const pathname = usePathname();
  const clubInfo: ClubInfo = {
    name: 'GDG On Campus Gachon University',
    description: 'GDG On Campus Gachon University는 구글 개발자 기술에 관심이 있는 대학생 커뮤니티 그룹입니다.',
    logoUrl:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    categories: ['커뮤니티', 'IT'],
    totalMembers: 123,
    activeRecruitments: 3,
    newApplicants: 15,
    newNotifications: 5,
  };

  return (
    <div className="space-y-6">
      <Card className="border-gray-700 bg-gray-800">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
            <div className="relative h-20 w-20 overflow-hidden rounded-full sm:h-24 sm:w-24">
              <Image src={clubInfo.logoUrl} alt={`${clubInfo.name} logo`} className="object-cover" fill />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="mb-2 text-xl font-bold text-gray-100 sm:text-2xl">{clubInfo.name}</h2>
              <p className="mb-2 text-sm text-gray-300 sm:text-base">{clubInfo.description}</p>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                {clubInfo.categories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col justify-center space-y-2 sm:flex-row sm:justify-end sm:space-x-4 sm:space-y-0">
            <Button
              variant="outline"
              className="w-full border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700 hover:text-gray-100 sm:w-auto"
            >
              동아리 정보 수정
            </Button>
            <Link href={`${pathname}/recruitment/new`}>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">모집 공고 생성</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">총 회원 수</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">{clubInfo.totalMembers}</div>
          </CardContent>
        </Card>
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">활성 모집 공고</CardTitle>
            <FileText className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">{clubInfo.activeRecruitments}</div>
          </CardContent>
        </Card>
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">새 지원자</CardTitle>
            <UserPlus className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">{clubInfo.newApplicants}</div>
          </CardContent>
        </Card>
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">새 알림</CardTitle>
            <Bell className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">{clubInfo.newNotifications}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
