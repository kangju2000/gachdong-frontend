'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, ChevronRight } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import { applicationQueries } from '@/apis/application';
import { ToGetApplicationDTO } from '@gachdong/api/application';
import { format } from '@/lib/date';

function DroppableWrapper({ id, children }: { id: string; children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <div className="flex-1" style={{ minWidth: '300px' }}>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`h-full rounded-lg border border-gray-700 bg-gray-800 p-4 ${
              snapshot.isDraggingOver ? 'bg-gray-750 border-blue-500' : ''
            }`}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{id}</h3>
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
    </div>
  );
}

export default function RecruitmentPostDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const { data: recruitmentPost } = useSuspenseQuery(
    clubQueries.recruitmentsDetail(Number(params.id), Number(params.recruitmentId))
  );

  const {
    data: { result: { toGetApplicationDTO } = {} },
  } = useSuspenseQuery(applicationQueries.clubApplicationList(Number(params.recruitmentId)));

  const [searchTerm, setSearchTerm] = useState('');

  const applicants = toGetApplicationDTO ?? [];

  const filteredApplicants = applicants.filter(
    applicant =>
      applicant.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const processData = recruitmentPost.processData as Record<string, { title: string; order: number }>;
  const statusOptions = Object.values(processData).map(status => status.title);

  const [draggedGroupedApplicants, setDraggedGroupedApplicants] = useState<Record<string, ToGetApplicationDTO[]>>({});

  const initialGroupedApplicants = useMemo(() => {
    return Object.values(processData).reduce(
      (acc, status) => {
        acc[status.title] = filteredApplicants.filter(applicant => applicant.status === status.title);
        return acc;
      },
      {} as Record<string, ToGetApplicationDTO[]>
    );
  }, [processData, filteredApplicants, searchTerm]);

  const displayedGroupedApplicants =
    Object.keys(draggedGroupedApplicants).length > 0 ? draggedGroupedApplicants : initialGroupedApplicants;

  const passRate =
    applicants.length > 0
      ? ((applicants.filter(a => a.status === '최종 합격').length / applicants.length) * 100).toFixed(2)
      : 0;

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus !== destStatus) {
      const newGroupedApplicants = { ...displayedGroupedApplicants };

      const sourceApplicants = [...(newGroupedApplicants[sourceStatus] ?? [])];
      const [movedApplicant] = sourceApplicants.splice(source.index, 1);

      const destApplicants = [...(newGroupedApplicants[destStatus] ?? [])];
      if (movedApplicant) {
        movedApplicant.status = destStatus;
        destApplicants.splice(destination.index, 0, movedApplicant);
      }

      const updatedGroupedApplicants = {
        ...newGroupedApplicants,
        [sourceStatus]: sourceApplicants,
        [destStatus]: destApplicants,
      };

      setDraggedGroupedApplicants(updatedGroupedApplicants);

      try {
        // TODO: API 호출 구현
        // await applicationQueries.updateStatus({
        //   applicationId: Number(draggableId),
        //   status: destStatus,
        // });
      } catch (error) {
        // 에러 발생 시 원래 상태로 복구
        setDraggedGroupedApplicants(initialGroupedApplicants);
        console.error('Failed to update application status:', error);
      }
    }
  };

  return (
    <div className="space-y-6 text-gray-100">
      <Card className="border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">모집 공고 상세</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{recruitmentPost.title}</h2>
            <Badge variant="outline">{applicants.length} 지원자</Badge>
          </div>
          <p className="mb-2 text-sm text-gray-400">
            모집 기간: {format(recruitmentPost.startDate, 'yyyy.MM.dd')} ~{' '}
            {format(recruitmentPost.endDate, 'yyyy.MM.dd')}
          </p>
          <p className="text-sm text-gray-400">합격률: {passRate}%</p>
        </CardContent>
      </Card>

      <Card className="border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold">지원자 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="이름 또는 이메일로 검색"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border-gray-600 bg-gray-700 pl-10 text-gray-100"
              />
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className="overflow-x-auto pb-4">
              <div className="flex min-w-full gap-4" style={{ width: `max(100%, ${statusOptions.length * 320}px)` }}>
                {statusOptions.map(status => (
                  <DroppableWrapper key={status} id={status}>
                    {displayedGroupedApplicants[status]?.map((applicant, index) => (
                      <Draggable
                        key={applicant.applicationId}
                        draggableId={applicant.applicationId.toString()}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-2 rounded-md bg-gray-700 p-3 ${
                              snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
                            }`}
                            style={{
                              ...provided.draggableProps.style,
                              opacity: snapshot.isDragging ? 0.8 : 1,
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{applicant.userName}</p>
                                <p className="text-sm text-gray-400">{applicant.userEmail}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => router.push(`${pathname}/applicant/${applicant.applicationId}`)}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </DroppableWrapper>
                ))}
              </div>
            </div>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  );
}
