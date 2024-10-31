'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, ArrowLeft, Calendar, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { RECRUIT_LIST } from '@/constants/data';
import { Recruitment } from '@/types';

export default function RecruitmentDetailPage({ params }: { params: { id: string } }) {
  const [announcement, setAnnouncement] = useState<Recruitment | null>(null);

  useEffect(() => {
    const foundAnnouncement = RECRUIT_LIST.find(a => a.id === Number(params.id));
    if (foundAnnouncement) {
      setAnnouncement(foundAnnouncement);
    } else {
      notFound();
    }
  }, [params.id]);

  if (!announcement) {
    return null;
  }

  return (
    <main className="mx-auto max-w-[980px] px-4 py-6">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/recruits" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          모든 공고 보기
        </Link>
      </Button>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="lg:w-2/3">
          <Card className="mb-6">
            <CardHeader className="border-b">
              <div className="flex items-center space-x-4">
                <div className="bg-muted h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={announcement.image}
                    alt={`${announcement.club} logo`}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-2xl">{announcement.title}</CardTitle>
                  <p className="text-muted-foreground mt-1">{announcement.club}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <Image
                src={announcement.image}
                alt={announcement.title}
                className="mb-6 h-64 w-full rounded-lg object-cover"
                width={800}
                height={400}
              />

              <div className="prose prose-sm text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-muted-foreground prose-pre:bg-transparent prose-pre:p-0 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-sm prose-ul:text-sm prose-ol:text-sm max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ node, ...props }) => <p className="whitespace-pre-wrap" {...props} />,
                  }}
                >
                  {announcement.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3">
          <div className="sticky top-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">모집 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    모집기간
                  </span>
                  <span className="font-medium">
                    {announcement.startDate} - {announcement.endDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    모집인원
                  </span>
                  <span className="font-medium">{announcement.recruitmentCount}명</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    조회수
                  </span>
                  <span className="font-medium">{announcement.views}</span>
                </div>
                <div className="pt-2">
                  <Badge variant="outline" className="w-full justify-center py-1 text-sm">
                    마감까지 D-{announcement.daysLeft}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg" asChild>
              <Link href={`/recruits/${announcement.id}/apply`}>지원하기</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
