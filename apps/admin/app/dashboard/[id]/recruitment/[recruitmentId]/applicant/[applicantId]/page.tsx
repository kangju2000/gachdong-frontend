'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

interface ApplicantDetail {
  id: number;
  name: string;
  email: string;
  applyDate: string;
  status: string;
  applicationForm: {
    [key: string]: string;
  };
}

const mockApplicantDetail: ApplicantDetail = {
  id: 1,
  name: '김철수',
  email: 'chulsoo@gachon.ac.kr',
  applyDate: '2024-03-01',
  status: '서류 심사 중',
  applicationForm: {
    '지원 동기':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    '관련 경험':
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    '자기 소개':
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    '프로젝트 경험':
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};

const statusOptions = ['서류 심사 중', '1차 합격', '최종 합격', '불합격'];

export default function ApplicantDetail() {
  const router = useRouter();
  const [applicant, setApplicant] = useState<ApplicantDetail>(mockApplicantDetail);

  const handleStatusChange = (newStatus: string) => {
    setApplicant({ ...applicant, status: newStatus });
    // TODO: Implement API call to update status
  };

  return (
    <div className="min-w-[350px] space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        뒤로 가기
      </Button>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">{applicant.name}의 지원서</CardTitle>
          <Badge variant={applicant.status === '최종 합격' ? 'default' : 'secondary'}>{applicant.status}</Badge>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm">이메일</p>
              <p>{applicant.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">지원일</p>
              <p>{applicant.applyDate}</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-muted-foreground mb-2 text-sm">상태 변경</p>
            <Select defaultValue={applicant.status} onValueChange={handleStatusChange}>
              <SelectTrigger className="bg-input border-input text-foreground w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-6">
            {Object.entries(applicant.applicationForm).map(([question, answer]) => (
              <div key={question}>
                <h3 className="mb-2 text-lg font-semibold">{question}</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{answer}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
