"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, Activity, ArrowLeft } from "lucide-react";
import { CLUBS, RECRUIT_LIST } from "@/constants/data";
import { Club, Recruit } from "@/types";

export default function ClubDetailPage({ params }: { params: { id: string } }) {
  const [club, setClub] = useState<Club | null>(null);
  const [clubRecruits, setClubRecruits] = useState<Recruit[]>([]);

  useEffect(() => {
    const foundClub = CLUBS.find((c) => c.id === Number(params.id));
    if (foundClub) {
      setClub(foundClub);
      const recruits = RECRUIT_LIST.filter(
        (recruit) => recruit.club === foundClub.name
      );
      setClubRecruits(recruits);
    } else {
      notFound();
    }
  }, [params.id]);

  if (!club) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="max-w-[980px] mx-auto py-6 px-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/clubs" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            동아리 목록으로 돌아가기
          </Link>
        </Button>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-24 h-24 bg-muted rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={club.image}
                  alt={`${club.name} logo`}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div className="flex-grow">
                <h1 className="text-3xl font-bold mb-2">{club.name}</h1>
                <p className="text-muted-foreground mb-2">{club.category}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {club.description}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{club.establishedYear}년 설립</span>
                  </div>
                  <Badge variant={club.recruiting ? "default" : "secondary"}>
                    {club.recruiting ? "모집중" : "모집마감"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <Tabs defaultValue="intro" className="w-full">
              <TabsList>
                <TabsTrigger value="intro">소개</TabsTrigger>
                <TabsTrigger value="activities">활동</TabsTrigger>
              </TabsList>
              <TabsContent value="intro">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">동아리 소개</h2>
                    <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-muted-foreground prose-pre:bg-transparent prose-pre:p-0 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-sm prose-ul:text-sm prose-ol:text-sm">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ node, ...props }) => (
                            <p className="whitespace-pre-wrap" {...props} />
                          ),
                        }}
                      >
                        {club.introduction}
                      </ReactMarkdown>
                    </div>
                    <h3 className="font-semibold mb-2 mt-6">주요 활동</h3>
                    <div className="flex flex-wrap gap-2">
                      {club.activities.map((activity, index) => (
                        <Badge key={index} variant="outline">
                          <Activity className="mr-1 h-3 w-3" />
                          {activity}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="activities">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-4">활동 내역</h2>
                    <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-muted-foreground prose-pre:bg-transparent prose-pre:p-0 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-sm prose-ul:text-sm prose-ol:text-sm">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ node, ...props }) => (
                            <p className="whitespace-pre-wrap" {...props} />
                          ),
                        }}
                      >
                        {`
- **2023년 가을 MT**
  2023.10.15 - 회원 간 친목 도모 및 팀 빌딩 활동

- **2023년 여름 프로젝트**
  2023.07.01 - 2023.08.31 - 팀별 프로젝트 진행 및 발표

- **2023년 봄 세미나**
  2023.04.10 - 최신 기술 트렌드 공유 및 토론
                        `}
                      </ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>모집 공고</CardTitle>
              </CardHeader>
              <CardContent>
                {clubRecruits.length > 0 ? (
                  <ul className="space-y-4">
                    {clubRecruits.map((recruit) => (
                      <li key={recruit.id}>
                        <Link
                          href={`/recruits/${recruit.id}`}
                          className="block hover:bg-accent p-3 rounded-lg transition-colors"
                        >
                          <h3 className="font-semibold mb-1">
                            {recruit.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {recruit.startDate} - {recruit.endDate}
                          </p>
                          <Badge variant="outline">D-{recruit.daysLeft}</Badge>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">
                    현재 진행 중인 모집 공고가 없습니다.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>문의하기</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  동아리에 대해 궁금한 점이 있으신가요? 아래 연락처로
                  문의해주세요.
                </p>
                <div className="space-y-2 text-sm">
                  <p>이메일: {club.name.toLowerCase()}@gachon.ac.kr</p>
                  <p>인스타그램: @{club.name.toLowerCase()}_gachon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
