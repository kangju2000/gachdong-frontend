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
import ky from 'ky';
import { CookieManager } from '@/lib/auth/cookies';

export default function DashboardCard() {
  const { data: profile } = useSuspenseQuery(authQueries.profile());
  const { mutateAsync: createClub, isPending: isCreatingClub } = useCreateClub();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  const handleAddClub = async (newClubData: CreateClubRequest, imageFile?: File) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      const res = await ky.post(
        `https://iibli2f5x4.execute-api.ap-northeast-2.amazonaws.com/dev/club/profile-upload?clubName=${newClubData.name}`,
        {
          headers: { Authorization: `Bearer ${CookieManager.getClientAccessToken()}` },
          body: formData,
        }
      );

      const { url } = await res.json<{ url: string }>();
      await createClub({ ...newClubData, clubImageUrl: url });
    } else {
      await createClub(newClubData);
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
            <Plus className="h-4 w-4" />
            동아리 추가하기
          </Button>
          <Button
            variant="link"
            className="text-gray-400 hover:text-gray-300"
            onClick={() => setIsInviteDialogOpen(true)}
          >
            <Key className="h-4 w-4" />
            초대코드 입력
          </Button>
        </CardFooter>
      </Card>

      <CreateClubModal
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddClub}
        isLoading={isCreatingClub}
      />
      <InviteCodeModal
        isOpen={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        onSubmit={handleInviteCodeSubmit}
      />
    </div>
  );
}
