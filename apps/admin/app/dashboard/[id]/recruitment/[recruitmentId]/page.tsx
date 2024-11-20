'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, ChevronRight, Save } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import { applicationQueries } from '@/apis/application';
import { format } from '@/lib/date';
import { useChangeApplicationStatus } from '@/apis/application/mutation';

// 드롭 영역 컴포넌트
const ProcessColumn = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`h-full flex-1 rounded-lg border border-gray-700 bg-gray-800 p-4 ${
            snapshot.isDraggingOver ? 'bg-gray-750 border-blue-500' : ''
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
          <div className="h-[calc(100vh-400px)] overflow-y-auto">
            {children}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

// 드래그 가능한 지원자 카드 컴포넌트
const ApplicantCard = ({ id, index, name, email }: { id: number; index: number; name: string; email: string }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`mb-2 rounded-md bg-gray-700 p-3 ${snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-gray-400">{email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-400 hover:text-blue-300"
              onClick={() => router.push(`/dashboard/${params.id}/recruitment/${params.recruitmentId}/applicant/${id}`)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

interface StatusUpdate {
  applicationId: number;
  status: string;
}

export default function RecruitmentPostDetail() {
  const params = useParams();

  // 모집 공고 & 지원자 데이터 조회
  const { data: clubRecruitment } = useSuspenseQuery(
    clubQueries.recruitmentsDetail(Number(params.id), Number(params.recruitmentId))
  );

  // FIXME: Hydration 문제 해결 필요 (Server, Client의 status 값 불일치)
  const { data: applicants } = useSuspenseQuery(applicationQueries.clubApplicationList(Number(params.recruitmentId)));
  const { mutateAsync: changeStatusMutateAsync, isPending: isChangeStatusPending } = useChangeApplicationStatus();

  // 상태 업데이트를 위한 변경사항 추적
  const [modifiedStatuses, setModifiedStatuses] = useState<StatusUpdate[]>([]);
  const [draggedApplicants, setDraggedApplicants] = useState(applicants);

  // 프로세스 데이터 파싱
  const processData = clubRecruitment.processData as Record<string, { label: string; order: number }>;
  const processes = Object.entries(processData)
    .map(([key, process]) => ({
      ...process,
      key,
    }))
    .sort((a, b) => a.order - b.order);

  // 드래그 앤 드롭 핸들러
  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination, draggableId } = result;

      if (!destination) {
        return;
      }

      const sourceStatus = source.droppableId;
      const destStatus = destination.droppableId;

      if (sourceStatus === destStatus) {
        return;
      }

      const applicationId = Number(draggableId);

      // 드래그된 지원자 상태 업데이트
      const updatedApplicants = draggedApplicants.map(applicant =>
        applicant.applicationId === applicationId ? { ...applicant, status: destStatus } : applicant
      );

      setDraggedApplicants(updatedApplicants);

      // 변경사항 추적
      setModifiedStatuses(prev => {
        const filtered = prev.filter(update => update.applicationId !== applicationId);
        return [...filtered, { applicationId, status: destStatus }];
      });
    },
    [draggedApplicants]
  );

  // 페이지 이탈 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (modifiedStatuses.length > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [modifiedStatuses]);

  // 저장 핸들러
  const handleSave = async () => {
    if (modifiedStatuses.length > 0) {
      for (const status of modifiedStatuses) {
        await changeStatusMutateAsync(status);
      }

      setModifiedStatuses([]);
    }
  };

  // 합격률 계산
  const passRate =
    applicants.length > 0
      ? (
          (applicants.filter(a => a.status === processes[processes.length - 1]?.label).length / applicants.length) *
          100
        ).toFixed(1)
      : '0.0';

  return (
    <div className="relative min-w-[350px] space-y-6 text-gray-100">
      {/* 모집 공고 정보 카드 */}
      <Card className="border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">모집 공고 상세</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{clubRecruitment.title}</h2>
            <Badge variant="outline">{applicants.length} 지원자</Badge>
          </div>
          <p className="mb-2 text-sm text-gray-400">
            모집 기간: {format(clubRecruitment.startDate, 'yyyy.MM.dd')} ~{' '}
            {format(clubRecruitment.endDate, 'yyyy.MM.dd')}
          </p>
          <p className="text-sm text-gray-400">합격률: {passRate}%</p>
        </CardContent>
      </Card>

      {/* 지원자 관리 카드 */}
      <Card className="border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold">지원자 관리</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 검색 영역 */}
          <div className="mb-6">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="이름 또는 이메일로 검색"
                className="border-gray-600 bg-gray-700 pl-10 text-gray-100"
              />
            </div>
          </div>

          {/* 칸반 보드 영역 */}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="overflow-x-auto pb-4">
              <div className="flex min-w-full gap-4" style={{ width: `max(100%, ${processes.length * 320}px)` }}>
                {processes.map(process => (
                  <ProcessColumn key={process.key} id={process.key} title={process.label}>
                    {draggedApplicants
                      .filter(
                        applicant =>
                          (process.key === 'process1' && applicant.status === 'SAVED') ||
                          applicant.status === process.key
                      )
                      .map((applicant, index) => (
                        <ApplicantCard
                          key={applicant.applicationId}
                          id={applicant.applicationId}
                          index={index}
                          name={applicant.userName}
                          email={applicant.userEmail}
                        />
                      ))}
                  </ProcessColumn>
                ))}
              </div>
            </div>
          </DragDropContext>
        </CardContent>
      </Card>

      {/* 플로팅 저장 버튼 */}
      {modifiedStatuses.length > 0 && (
        <div className="fixed bottom-6 right-6 z-10">
          <Button size="lg" onClick={handleSave} disabled={isChangeStatusPending} className="shadow-lg">
            {isChangeStatusPending ? (
              '저장 중...'
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                변경사항 저장
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
