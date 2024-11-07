'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { authQueries } from '@/apis/auth';
import { applicationQueries } from '@/apis/application';
import { useUserStore } from '@/stores/user-store';
import { useApplicationStore } from '@/stores/application-store';
import { clubQueries } from '@/apis/club';
import { SuspenseQuery } from '@suspensive/react-query';

export default function MyPageContainer() {
  const { data: user } = useQuery(authQueries.profile());

  const localProfile = useUserStore();

  const { submittedApplications } = useApplicationStore();

  if (user == null) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">내 프로필</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
              <AvatarImage src={localProfile.profileUrl} alt={localProfile.name} />
              {/* <AvatarFallback>{user?.name?.[0]}</AvatarFallback> */}
            </Avatar>
            <div>
              {/* <h2 className="text-xl font-semibold">{user.name}</h2> */}
              <h2 className="text-xl font-semibold">{localProfile.name}</h2>
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
            {submittedApplications.map(app => (
              <SuspenseQuery {...clubQueries.club(app.clubId)}>
                {({ data: club }) => (
                  <li
                    key={`${app.clubId}-${app.recruitId}`}
                    className="hover:bg-muted/80 group flex flex-col rounded-lg border p-4 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{club.clubName || '동아리 이름'}</h3>
                          <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-medium">
                            {app.status === 'SUBMITTED' ? '지원완료' : '임시저장'}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">지원자: {app.name}</p>
                        <div className="text-muted-foreground flex flex-wrap gap-x-4 text-xs">
                          <span>
                            제출일:{' '}
                            {new Date(app.createdAt).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          <span>이메일: {app.email}</span>
                          <span>연락처: {app.phone}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100"
                        asChild
                      >
                        <Link href={`/clubs/${app.clubId}/recruits/${app.recruitId}`}>공고 보기</Link>
                      </Button>
                    </div>
                  </li>
                )}
              </SuspenseQuery>
            ))}
            {submittedApplications.length === 0 && (
              <div className="text-muted-foreground flex flex-col items-center py-8">
                <p>아직 지원한 동아리가 없습니다.</p>
                <Button variant="link" asChild className="mt-2">
                  <Link href="/clubs">동아리 둘러보기</Link>
                </Button>
              </div>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
