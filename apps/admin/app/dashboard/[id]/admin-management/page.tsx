'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { Copy, UserPlus, Crown } from 'lucide-react';

const initialAdmins = [
  { id: 1, name: '김철수', email: 'chulsoo@gachon.ac.kr', role: '회장' },
  { id: 2, name: '이영희', email: 'younghee@gachon.ac.kr', role: '부회장' },
  { id: 3, name: '박민수', email: 'minsoo@gachon.ac.kr', role: '총무' },
];

export default function ClubAdminManagementComponent() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [inviteCode, setInviteCode] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const generateInviteCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setInviteCode(code);
    setIsInviteModalOpen(true);
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast({
      title: '초대 코드가 복사되었습니다',
      description: '새 운영진에게 이 코드를 공유하세요.',
    });
  };

  const initiateTransfer = admin => {
    setSelectedAdmin(admin);
    setIsTransferModalOpen(true);
  };

  const confirmTransfer = () => {
    toast({
      title: '권한 이전 요청이 전송되었습니다',
      description: `${selectedAdmin.name}님에게 권한 이전 요청을 보냈습니다. 승인 시 즉시 권한이 이전됩니다.`,
    });
    setIsTransferModalOpen(false);
  };

  return (
    <div className="min-w-[350px] space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-100">운영진 관리</h1>
        <Button onClick={generateInviteCode}>
          <UserPlus className="mr-2 h-4 w-4" /> 운영진 초대
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>권한 이전</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map(admin => (
            <TableRow key={admin.id}>
              <TableCell>{admin.name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>
                {admin.role !== '회장' && (
                  <Button variant="outline" size="sm" onClick={() => initiateTransfer(admin)}>
                    <Crown className="mr-2 h-4 w-4" /> 권한 이전
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>운영진 초대 코드</DialogTitle>
            <DialogDescription>
              아래의 코드를 새 운영진에게 공유하세요. 이 코드는 24시간 동안 유효합니다.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input value={inviteCode} readOnly />
            <Button size="icon" onClick={copyInviteCode}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsInviteModalOpen(false)}>닫기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isTransferModalOpen} onOpenChange={setIsTransferModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>동아리 권한 이전 확인</DialogTitle>
            <DialogDescription>
              {selectedAdmin &&
                `${selectedAdmin.name}님에게 동아리 회장 권한을 이전하시겠습니까? 
              이 작업은 되돌릴 수 없으며, 현재 계정은 삭제됩니다.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransferModalOpen(false)}>
              취소
            </Button>
            <Button onClick={confirmTransfer}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
