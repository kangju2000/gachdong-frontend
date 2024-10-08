import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, UserPlus, Bell } from 'lucide-react';
import Image from 'next/image';

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

export function DashboardContent() {
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
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden relative">
              <Image src={clubInfo.logoUrl} alt={`${clubInfo.name} logo`} className="object-cover" fill />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-2">{clubInfo.name}</h2>
              <p className="text-sm sm:text-base text-gray-300 mb-2">{clubInfo.description}</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {clubInfo.categories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
            <Button
              variant="outline"
              className="text-gray-300 border-gray-600 w-full sm:w-auto bg-gray-800 hover:bg-gray-700 hover:border-gray-500 hover:text-gray-100"
            >
              동아리 정보 수정
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">모집 공고 생성</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">총 회원 수</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">{clubInfo.totalMembers}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">활성 모집 공고</CardTitle>
            <FileText className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">{clubInfo.activeRecruitments}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">새 지원자</CardTitle>
            <UserPlus className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-100">{clubInfo.newApplicants}</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
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
