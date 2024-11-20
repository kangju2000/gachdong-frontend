'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { applicationQueries } from '@/apis/application';
import { useChangeApplicationStatus } from '@/apis/application/mutation';
import { clubQueries } from '@/apis/club';
import { formatDate } from '@/lib/date';

export default function ApplicantDetail() {
  const router = useRouter();
  const params = useParams();
  const {
    data: { result: applicant },
  } = useSuspenseQuery(applicationQueries.clubApplication(Number(params.applicantId)));
  const { data: recruitment } = useSuspenseQuery(
    clubQueries.recruitmentsDetail(Number(params.id), Number(params.recruitmentId))
  );
  const {
    data: { result: formInfo },
  } = useSuspenseQuery(applicationQueries.formInfoAdmin(recruitment.applicationFormId));

  const { mutate: changeApplicationStatus } = useChangeApplicationStatus();

  const handleStatusChange = (newStatus: string) => {
    changeApplicationStatus({ applicationId: Number(params.applicantId), status: newStatus });
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
          <CardTitle className="text-2xl font-bold">{applicant.userName}의 지원서</CardTitle>
          <Badge variant="default">
            {applicant.status === 'SAVED'
              ? recruitment.processData['process1']?.label
              : recruitment.processData[applicant.status]?.label}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground text-sm">이메일</p>
              <p>{applicant.userEmail}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">지원일</p>
              <p>{formatDate(applicant.submitDate, 'yyyy년 MM월 dd일 HH시 mm분')}</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-muted-foreground mb-2 text-sm">상태 변경</p>
            <Select
              defaultValue={applicant.status === 'SAVED' ? 'process1' : applicant.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="bg-input border-input text-foreground w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(recruitment.processData).map(([status, process]) => (
                  <SelectItem key={status} value={status}>
                    {process.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-6">
            {Object.entries(formInfo.formBody).map(([questionKey, question]) => {
              return (
                <div key={questionKey}>
                  <h3 className="mb-2 text-lg font-semibold">{question.label}</h3>
                  <p className="text-muted-foreground border-border whitespace-pre-wrap break-all rounded-md border p-4">
                    {applicant.applicationBody[question.name]}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
