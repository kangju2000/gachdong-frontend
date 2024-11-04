'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Search, Bell, ChevronRight, Send } from 'lucide-react';

interface Applicant {
  id: number;
  name: string;
  email: string;
  applyDate: string;
  status: string;
}

interface ClubInfo {
  name: string;
  presidentName: string;
  presidentEmail: string;
  presidentPhone: string;
}

const mockApplicants: Applicant[] = [
  { id: 1, name: '김철수', email: 'chulsoo@gachon.ac.kr', applyDate: '2024-03-01', status: '서류 심사 중' },
  { id: 2, name: '이영희', email: 'younghee@gachon.ac.kr', applyDate: '2024-03-02', status: '1차 합격' },
  { id: 3, name: '박민수', email: 'minsoo@gachon.ac.kr', applyDate: '2024-03-03', status: '최종 합격' },
  { id: 4, name: '정다은', email: 'daeun@gachon.ac.kr', applyDate: '2024-03-04', status: '불합격' },
];

const statusOptions = ['서류 심사 중', '1차 합격', '최종 합격', '불합격'];

const initialClubInfo: ClubInfo = {
  name: 'GDG On Campus Gachon University',
  presidentName: '홍길동',
  presidentEmail: 'president@gdg-gachon.com',
  presidentPhone: '010-1234-5678',
};

export default function RecruitmentPostDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notificationSubject, setNotificationSubject] = useState('');
  const [notificationBody, setNotificationBody] = useState('');
  const [clubInfo, setClubInfo] = useState<ClubInfo>(initialClubInfo);

  const filteredApplicants = applicants.filter(
    applicant =>
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedApplicants = statusOptions.reduce(
    (acc, status) => {
      acc[status] = filteredApplicants.filter(applicant => applicant.status === status);
      return acc;
    },
    {} as Record<string, Applicant[]>
  );

  const passRate = ((applicants.filter(a => a.status === '최종 합격').length / applicants.length) * 100).toFixed(2);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    if (sourceStatus !== destStatus) {
      const sourceApplicants = [...(groupedApplicants[sourceStatus] ?? [])];
      const destApplicants = [...(groupedApplicants[destStatus] ?? [])];
      const [movedApplicant] = sourceApplicants.splice(source.index, 1);
      if (movedApplicant) {
        movedApplicant.status = destStatus;
        destApplicants.splice(destination.index, 0, movedApplicant);
      }

      setApplicants(applicants.map(a => (a.id === movedApplicant?.id ? movedApplicant : a)));
    }
  };

  const handleNotificationTrigger = (status: string) => {
    setSelectedStatus(status);
    setNotificationSubject(`[${clubInfo.name}] 2024년 봄학기 신입 부원 모집 ${status} 결과 안내`);
    setNotificationBody(
      `안녕하세요, ${clubInfo.name}입니다.\n\n2024년 봄학기 신입 부원 모집 ${status} 결과를 안내드립니다.\n\n자세한 내용은 아래와 같습니다:\n\n[여기에 상세 내용 추가]\n\n문의사항이 있으시면 언제든 연락 주시기 바랍니다.\n\n감사합니다.\n\n${clubInfo.presidentName} 드림`
    );
    setIsNotificationModalOpen(true);
  };

  const handleSendNotification = () => {
    console.log('Sending notifications:', {
      subject: notificationSubject,
      body: notificationBody,
      status: selectedStatus,
      contact: clubInfo,
    });
    setIsNotificationModalOpen(false);
  };

  const renderEmailPreview = () => {
    return (
      <div className="rounded-md border border-gray-600 bg-gray-900 p-4">
        <div className="mb-4">
          <strong>제목:</strong> {notificationSubject}
        </div>
        <div className="mb-4">
          <strong>보내는 사람:</strong> {clubInfo.presidentName} &lt;{clubInfo.presidentEmail}&gt;
        </div>
        <div className="mb-4">
          <strong>내용:</strong>
          <div className="whitespace-pre-wrap">{notificationBody}</div>
        </div>
        <div>
          <strong>연락처:</strong>
          <div>{clubInfo.presidentName}</div>
          <div>{clubInfo.presidentEmail}</div>
          <div>{clubInfo.presidentPhone}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 text-gray-100">
      <Card className="border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">모집 공고 상세</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">2024년 봄학기 신입 부원 모집</h2>
            <Badge variant="outline">{applicants.length} 지원자</Badge>
          </div>
          <p className="mb-2 text-sm text-gray-400">모집 기간: 2024-03-01 ~ 2024-03-31</p>
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {statusOptions.map(status => (
                <Droppable key={status} droppableId={status}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="rounded-lg border border-gray-700 bg-gray-800 p-4"
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">{status}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleNotificationTrigger(status)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                      {groupedApplicants[status]?.map((applicant, index) => (
                        <Draggable key={applicant.id} draggableId={applicant.id.toString()} index={index}>
                          {provided => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="mb-2 rounded-md bg-gray-700 p-3"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{applicant.name}</p>
                                  <p className="text-sm text-gray-400">{applicant.email}</p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => router.push(`${pathname}/applicant/${applicant.id}`)}
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </CardContent>
      </Card>

      <Dialog open={isNotificationModalOpen} onOpenChange={setIsNotificationModalOpen}>
        <DialogContent className="max-w-4xl bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>알림 발송</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                제목
              </Label>
              <Input
                id="subject"
                value={notificationSubject}
                onChange={e => setNotificationSubject(e.target.value)}
                className="col-span-3 bg-gray-700 text-gray-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="presidentName" className="text-right">
                이름
              </Label>
              <Input
                id="presidentName"
                value={clubInfo.presidentName}
                onChange={e => setClubInfo({ ...clubInfo, presidentName: e.target.value })}
                className="col-span-3 bg-gray-700 text-gray-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="presidentEmail" className="text-right">
                이메일
              </Label>
              <Input
                id="presidentEmail"
                value={clubInfo.presidentEmail}
                onChange={e => setClubInfo({ ...clubInfo, presidentEmail: e.target.value })}
                className="col-span-3 bg-gray-700 text-gray-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="presidentPhone" className="text-right">
                전화번호
              </Label>
              <Input
                id="presidentPhone"
                value={clubInfo.presidentPhone}
                onChange={e => setClubInfo({ ...clubInfo, presidentPhone: e.target.value })}
                className="col-span-3 bg-gray-700 text-gray-100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="body" className="text-right">
                내용
              </Label>
              <Textarea
                id="body"
                value={notificationBody}
                onChange={e => setNotificationBody(e.target.value)}
                className="col-span-3 bg-gray-700 text-gray-100"
                rows={10}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">미리보기</Label>
              <div className="col-span-3">{renderEmailPreview()}</div>
            </div>
          </div>
          <Button onClick={handleSendNotification} className="bg-blue-600 text-white hover:bg-blue-700">
            <Send className="mr-2 h-4 w-4" />
            알림 발송
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
