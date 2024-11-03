'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (code: string) => void;
};

export function InviteCodeModal({ isOpen, onOpenChange, onSubmit }: Props) {
  const [inviteCode, setInviteCode] = useState('');

  const handleSubmit = () => {
    if (inviteCode.trim()) {
      onSubmit(inviteCode);
      setInviteCode('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-gray-700 bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">초대코드 입력</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="inviteCode" className="text-right text-gray-300">
              초대코드
            </Label>
            <Input
              id="inviteCode"
              value={inviteCode}
              onChange={e => setInviteCode(e.target.value)}
              className="col-span-3 border-gray-600 bg-gray-700 text-white"
              placeholder="초대코드를 입력하세요"
            />
          </div>
        </div>
        <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
          제출
        </Button>
      </DialogContent>
    </Dialog>
  );
}
