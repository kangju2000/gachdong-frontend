'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

export function RecruitmentNotifications() {
  return (
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
  );
}
