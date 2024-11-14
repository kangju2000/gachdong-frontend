'use client';

import { format, formatDate, formatDistance, ko } from '@/lib/date';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Activity, ArrowLeft } from 'lucide-react';
import { CATEGORY_MAP } from '@/constants/categories';
import { clubQueries } from '@/apis/club';
import { useSuspenseQueries } from '@tanstack/react-query';
import { SuspenseQuery } from '@suspensive/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ClubDetailPage({ params }: { params: { clubId: string } }) {
  const [
    { data: club },
    {
      data: { results: clubActivities = [] },
    },
  ] = useSuspenseQueries({
    queries: [clubQueries.club(Number(params.clubId)), clubQueries.activities(Number(params.clubId))],
  });

  return (
    <main className="mx-auto max-w-[980px] px-4 py-6">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/clubs" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          동아리 목록으로 돌아가기
        </Link>
      </Button>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <Avatar className="bg-muted relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-full">
              <AvatarImage src={club.clubImageUrl} alt={`${club.clubName} logo`} />
              <AvatarFallback>{club.clubName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <h1 className="mb-2 text-3xl font-bold">{club.clubName}</h1>
              <p className="text-muted-foreground mb-2">{CATEGORY_MAP[club.category]}</p>
              <p className="text-muted-foreground mb-4 text-sm">{club.shortDescription}</p>
              <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{format(club.establishedAt, 'yyyy년 MM월 dd일')} 설립</span>
                </div>
                <Badge variant={club.recruitingStatus ? 'default' : 'secondary'}>
                  {club.recruitingStatus ? '모집중' : '모집마감'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-2/3">
          <Tabs defaultValue="intro" className="w-full">
            <TabsList>
              <TabsTrigger value="intro">소개</TabsTrigger>
              <TabsTrigger value="activities">활동</TabsTrigger>
            </TabsList>
            <TabsContent value="intro">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="mb-4 text-xl font-semibold">동아리 소개</h2>
                  <div className="prose prose-sm text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-muted-foreground prose-pre:bg-transparent prose-pre:p-0 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-sm prose-ul:text-sm prose-ol:text-sm min-h-[350px] max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
                      }}
                    >
                      {club.introduction}
                    </ReactMarkdown>
                  </div>
                  <h3 className="mb-2 mt-6 font-semibold">주요 활동</h3>
                  <div className="flex flex-wrap gap-2">
                    {clubActivities.slice(0, 3).map((activity, index) => (
                      <Badge key={index} variant="outline">
                        <Activity className="mr-1 h-3 w-3" />
                        {activity.title}
                      </Badge>
                    ))}
                    {clubActivities.length === 0 && <p className="text-muted-foreground">주요 활동이 없습니다.</p>}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activities">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="mb-4 text-xl font-semibold">활동 내역</h2>
                  <div className="space-y-4">
                    {clubActivities.map((activity, index) => (
                      <div key={index}>
                        <h3 className="font-semibold">{activity.title}</h3>
                        <p className="text-muted-foreground text-sm">
                          {activity.date} - {activity.description}
                        </p>
                      </div>
                    ))}
                    {clubActivities.length === 0 && <p className="text-muted-foreground">활동 내역이 없습니다.</p>}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {/* FIXME: 레이아웃 개선하기 / 44px 계산된 것 제거하기 */}
        <div className="lg:relative lg:top-[44px] lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>모집 공고</CardTitle>
            </CardHeader>
            <CardContent>
              <SuspenseQuery {...clubQueries.recruitmentByClub(Number(params.clubId))}>
                {({ data: { results: clubRecruits = [] } }) => {
                  if (clubRecruits.length === 0) {
                    return <p className="text-muted-foreground">현재 진행 중인 모집 공고가 없습니다.</p>;
                  }

                  return (
                    <ul className="space-y-4">
                      {clubRecruits.map(recruit => (
                        <li key={recruit.clubId}>
                          <Link
                            href={`/clubs/${params.clubId}/recruits/${recruit.recruitmentId}`}
                            className="hover:bg-accent block rounded-lg p-3 transition-colors"
                          >
                            <h3 className="mb-1 font-semibold">{recruit.title}</h3>
                            <p className="text-muted-foreground mb-2 text-sm">
                              {formatDate(new Date(recruit.startDate ?? ''), 'yyyy년 MM월 dd일')} -{' '}
                              {formatDate(new Date(recruit.endDate ?? ''), 'yyyy년 MM월 dd일')}
                            </p>
                            <Badge variant="outline">
                              {formatDistance(new Date(recruit.endDate ?? ''), new Date(), {
                                locale: ko,
                                addSuffix: true,
                              })}{' '}
                              마감
                            </Badge>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  );
                }}
              </SuspenseQuery>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>문의하기</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                동아리에 대해 궁금한 점이 있으신가요? 아래 연락처로 문의해주세요.
              </p>
              <div className="space-y-2 text-sm">
                <SuspenseQuery {...clubQueries.contactInfo(Number(params.clubId))}>
                  {({ data: { results: clubContactInfo = [] } }) =>
                    clubContactInfo.map((contact, index) => (
                      <p key={index}>
                        {contact.contactMethod}: {contact.contactValue}
                      </p>
                    ))
                  }
                </SuspenseQuery>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
