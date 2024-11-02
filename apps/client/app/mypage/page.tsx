'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useProfile } from '@/apis/auth/queries';
import { useApplicationHistory } from '@/apis/application';

export default function MyPage() {
  const { data: user } = useProfile();

  const {
    data: { result: applications },
  } = useApplicationHistory();

  // const [applications, setApplications] = useState([
  //   {
  //     id: 1,
  //     club: '프로그래밍 동아리',
  //     date: '2024-03-15',
  //     status: '서류 심사 중',
  //   },
  //   {
  //     id: 2,
  //     club: '영화 감상 동아리',
  //     date: '2024-03-10',
  //     status: '면접 대기 중',
  //   },
  //   {
  //     id: 3,
  //     club: '독서 토론 동아리',
  //     date: '2024-03-05',
  //     status: '최종 합격',
  //   },
  // ]);

  if (!user) return null;

  return (
    <main className="mx-auto max-w-[980px] px-4 py-6">
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">내 프로필</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
              </div>
            </div>
            <Button asChild className="mt-4 w-full">
              <Link href="/settings">프로필 설정</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">지원 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {applications?.toGetApplicationHistoryDTO?.map(app => (
                <li key={app.applicationId} className="bg-muted flex items-center justify-between rounded-lg p-3">
                  <div>
                    <h3 className="font-semibold">{app.clubName}</h3>
                  </div>
                  <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-sm font-medium">
                    {app.status}
                  </span>
                </li>
              ))}
              {applications?.toGetApplicationHistoryDTO?.length === 0 && (
                <p className="text-muted-foreground">지원한 동아리가 없습니다.</p>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
