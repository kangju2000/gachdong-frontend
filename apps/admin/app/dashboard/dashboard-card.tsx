'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Key } from 'lucide-react';
import Link from 'next/link';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useCreateClub } from '@/apis/club';
import { CreateClubRequest } from '@gachdong/api/club';
import { InviteCodeModal } from './components/invite-code-modal';
import { CreateClubModal } from './components/create-club-modal';
import { ClubList } from './components/club-list';
import { authQueries } from '@/apis/auth';

export default function DashboardCard() {
  const { data: profile } = useSuspenseQuery(authQueries.profile());

  const { mutate: createClub } = useCreateClub();
  // const { mutate: uploadProfileImage } = useUploadProfileImage();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const handleAddClub = (newClubData: CreateClubRequest, imageFile?: File) => {
    createClub(newClubData);
    if (imageFile) {
      // uploadProfileImage({ image: imageFile });
    }
    setIsAddDialogOpen(false);
  };

  const handleInviteCodeSubmit = (code: string) => {
    console.log('Invite code submitted:', code);
    setIsInviteDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6 text-gray-100">
      <Card className="w-full max-w-md border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-white">동아리를 선택해주세요</CardTitle>
          <div className="flex items-center justify-center space-x-2">
            <span className="rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300">{profile?.email}</span>
            <Button variant="ghost" size="sm" className="text-gray-400" asChild>
              <Link href="/login">변경</Link>
            </Button>
          </div>
        </CardHeader>
        <div className="mb-4 h-px bg-gray-700" />
        <CardContent className="min-h-[200px] space-y-4">
          <ClubList />
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="link" className="text-blue-400 hover:text-blue-300" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> 동아리 추가하기
          </Button>
          <Button
            variant="link"
            className="text-gray-400 hover:text-gray-300"
            onClick={() => setIsInviteDialogOpen(true)}
          >
            <Key className="mr-2 h-4 w-4" /> 초대코드 입력
          </Button>
        </CardFooter>
      </Card>

      <CreateClubModal isOpen={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onSubmit={handleAddClub} />
      <InviteCodeModal
        isOpen={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onSubmit={handleInviteCodeSubmit}
      />
    </div>
  );
}
