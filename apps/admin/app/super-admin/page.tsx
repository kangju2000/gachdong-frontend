'use client';

import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LogOut, Eye, Edit, Trash, Check, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const TiptapEditor = ({ content, onChange }: { content: string; onChange: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm prose-invert m-5 focus:outline-none prose-p:text-sm prose-headings:font-bold prose-h1:text-lg prose-h2:text-base prose-h3:text-sm',
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <EditorContent
      editor={editor}
      className="prose prose-invert prose-p:text-sm prose-headings:font-bold prose-h1:text-lg prose-h2:text-base prose-h3:text-sm min-h-[200px] max-w-none rounded-md border p-2 [&_p]:my-1"
    />
  );
};

interface Club {
  id: number;
  name: string;
  status: string;
}

interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  viewCount: number;
}

export default function SuperAdminPage() {
  const [clubs, setClubs] = useState<Club[]>([
    { id: 1, name: '프로그래밍 동아리', status: '승인 대기' },
    { id: 2, name: '독서 동아리', status: '승인 대기' },
    { id: 3, name: '축구 동아리', status: '승인됨' },
  ]);

  const [notices, setNotices] = useState<Notice[]>([
    {
      id: 1,
      title: '2024학년도 1학기 동아리 등록 안내',
      content: `
        <p>안녕하세요, 가천대학교 학생 여러분!</p>
        <p>2024학년도 1학기 동아리 등록 기간이 다가왔습니다. 아래 내용을 참고하여 동아리 등록을 진행해 주시기 바랍니다.</p>
        <h3>등록 기간</h3>
        <ul>
          <li>시작일: 2024년 2월 1일 (월)</li>
          <li>종료일: 2024년 2월 15일 (월)</li>
        </ul>
        <h3>등록 방법</h3>
        <ol>
          <li>학교 홈페이지 로그인</li>
          <li>'학생활동' 메뉴 -> '동아리 관리' 선택</li>
          <li>'동아리 등록 신청' 버튼 클릭</li>
          <li>필요 정보 입력 및 구비 서류 업로드</li>
          <li>제출 버튼 클릭</li>
        </ol>
        <h3>구비 서류</h3>
        <ul>
          <li>동아리 회칙</li>
          <li>연간 활동 계획서</li>
          <li>회원 명단 (최소 10명 이상)</li>
          <li>지도교수 승낙서</li>
        </ul>
        <h3>주의사항</h3>
        <ul>
          <li>기한 내 미등록 시 동아리 자격이 상실될 수 있습니다.</li>
          <li>허위 정보 기재 시 등록이 취소될 수 있습니다.</li>
        </ul>
        <p>문의사항이 있으시면 학생처로 연락 주시기 바랍니다.</p>
        <p>감사합니다.</p>
      `,
      date: '2024. 1. 15.',
      viewCount: 200,
    },
    {
      id: 2,
      title: '동아리 활동 보고서 제출 요청',
      content: '<p>모든 동아리는 활동 보고서를 제출해 주시기 바랍니다.</p>',
      date: '2024. 1. 20.',
      viewCount: 150,
    },
  ]);

  const [newNotice, setNewNotice] = useState<Notice>({ id: 0, title: '', content: '', date: '', viewCount: 0 });
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmMessage, setConfirmMessage] = useState('');

  const handleClubApproval = (id: number, approved: boolean) => {
    setConfirmMessage(`정말로 이 동아리를 ${approved ? '승인' : '거부'}하시겠습니까?`);
    setConfirmAction(() => () => {
      setClubs(clubs.map(club => (club.id === id ? { ...club, status: approved ? '승인됨' : '거부됨' } : club)));
      setIsConfirmDialogOpen(false);
    });
    setIsConfirmDialogOpen(true);
  };

  const handleAddNotice = () => {
    if (newNotice.title && newNotice.content) {
      const currentDate = new Date()
        .toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .replace(/\. /g, '.')
        .replace('.', '');
      setNotices([...notices, { ...newNotice, id: notices.length + 1, date: currentDate, viewCount: 0 }]);
      setNewNotice({ id: 0, title: '', content: '', date: '', viewCount: 0 });
    }
  };

  const handleDeleteNotice = (id: number) => {
    setConfirmMessage('정말로 이 공지사항을 삭제하시겠습니까?');
    setConfirmAction(() => () => {
      setNotices(notices.filter(notice => notice.id !== id));
      setIsConfirmDialogOpen(false);
    });
    setIsConfirmDialogOpen(true);
  };

  const handleEditNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsEditModalOpen(true);
  };

  const handleUpdateNotice = () => {
    if (selectedNotice) {
      setNotices(notices.map(notice => (notice.id === selectedNotice.id ? selectedNotice : notice)));
      setIsEditModalOpen(false);
      setSelectedNotice(null);
    }
  };

  const handleViewNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewModalOpen(true);
  };

  const handleLogout = () => {
    setConfirmMessage('정말로 로그아웃 하시겠습니까?');
    setConfirmAction(() => () => {
      console.log('Logging out...');
      setIsConfirmDialogOpen(false);
    });
    setIsConfirmDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">서비스 관리자 페이지</h1>
        <Button onClick={handleLogout} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>동아리 승인 관리</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>동아리명</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clubs.map(club => (
                    <TableRow key={club.id}>
                      <TableCell>{club.name}</TableCell>
                      <TableCell>{club.status}</TableCell>
                      <TableCell>
                        {club.status === '승인 대기' && (
                          <>
                            <Button onClick={() => handleClubApproval(club.id, true)} className="mr-2" size="sm">
                              <Check className="mr-1 h-4 w-4" />
                              승인
                            </Button>
                            <Button onClick={() => handleClubApproval(club.id, false)} variant="destructive" size="sm">
                              <X className="mr-1 h-4 w-4" />
                              거부
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>공지사항 관리</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="공지사항 제목"
                value={newNotice.title}
                onChange={e => setNewNotice({ ...newNotice, title: e.target.value })}
                className="mb-2"
              />
              <TiptapEditor content={newNotice.content} onChange={content => setNewNotice({ ...newNotice, content })} />
              <Button onClick={handleAddNotice} className="mt-2">
                공지사항 추가
              </Button>
            </div>
            <ScrollArea className="h-[300px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>제목</TableHead>
                    <TableHead>날짜</TableHead>
                    <TableHead>조회수</TableHead>
                    <TableHead>액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notices.map(notice => (
                    <TableRow key={notice.id}>
                      <TableCell>{notice.title}</TableCell>
                      <TableCell>{notice.date}</TableCell>
                      <TableCell>{notice.viewCount}</TableCell>
                      <TableCell>
                        <Button onClick={() => handleViewNotice(notice)} variant="outline" size="sm" className="mr-2">
                          <Eye className="mr-1 h-4 w-4" />
                          보기
                        </Button>
                        <Button onClick={() => handleEditNotice(notice)} variant="outline" size="sm" className="mr-2">
                          <Edit className="mr-1 h-4 w-4" />
                          수정
                        </Button>
                        <Button onClick={() => handleDeleteNotice(notice.id)} variant="destructive" size="sm">
                          <Trash className="mr-1 h-4 w-4" />
                          삭제
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="flex max-h-[80vh] max-w-3xl flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedNotice?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
            <span>{selectedNotice?.date}</span>
            <span>조회수 {selectedNotice?.viewCount}</span>
          </div>
          <ScrollArea className="mt-4 flex-grow pr-4">
            <div
              dangerouslySetInnerHTML={{ __html: selectedNotice?.content || '' }}
              className="prose prose-invert prose-p:text-sm prose-headings:font-bold prose-h1:text-lg prose-h2:text-base prose-h3:text-sm max-w-none [&_p]:my-1"
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="flex max-h-[80vh] max-w-3xl flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">공지사항 수정</DialogTitle>
          </DialogHeader>
          <div className="mt-4 flex-grow overflow-y-auto pr-4">
            <Input
              placeholder="공지사항 제목"
              value={selectedNotice?.title || ''}
              onChange={e => setSelectedNotice(prev => (prev ? { ...prev, title: e.target.value } : null))}
              className="mb-2"
            />
            <TiptapEditor
              content={selectedNotice?.content || ''}
              onChange={content => setSelectedNotice(prev => (prev ? { ...prev, content } : null))}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button onClick={() => setIsEditModalOpen(false)} variant="outline">
              취소
            </Button>
            <Button onClick={handleUpdateNotice}>수정 완료</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>확인</AlertDialogTitle>
            <AlertDialogDescription>{confirmMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
