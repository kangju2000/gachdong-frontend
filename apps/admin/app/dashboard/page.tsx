'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Plus, Key, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Club {
  id: string;
  name: string;
  memberCount: number;
  logoUrl: string;
}

export default function SelectClub() {
  const [email, setEmail] = useState('kangju2000@gachon.ac.kr');
  const [clubs, setClubs] = useState<Club[]>([
    {
      id: '1',
      name: 'GDG On Campus Gachon',
      memberCount: 50,
      logoUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    },
    {
      id: '2',
      name: 'AI 연구회',
      memberCount: 30,
      logoUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    },
    {
      id: '3',
      name: '웹 개발 동아리',
      memberCount: 40,
      logoUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    },
    {
      id: '4',
      name: '가천대 댄스 동아리',
      memberCount: 25,
      logoUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    },
    {
      id: '5',
      name: '영화 감상 클럽',
      memberCount: 20,
      logoUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    },
  ]);

  const [newClub, setNewClub] = useState({ name: '', description: '' });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState('');

  const handleAddClub = () => {
    if (newClub.name && newClub.description) {
      const newClubData: Club = {
        id: (clubs.length + 1).toString(),
        name: newClub.name,
        memberCount: 1,
        logoUrl:
          'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      };
      setClubs([...clubs, newClubData]);
      setNewClub({ name: '', description: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleInviteCodeSubmit = () => {
    console.log('Invite code submitted:', inviteCode);
    setInviteCode('');
    setIsInviteDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6 text-gray-100">
      <Card className="w-full max-w-md border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="mb-4 text-center text-2xl font-bold text-white">동아리를 선택해주세요</CardTitle>
          <div className="flex items-center justify-center space-x-2">
            <span className="rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300">{email}</span>
            <Button variant="ghost" size="sm" asChild className="text-gray-400">
              <Link href="/login">변경</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {clubs.map(club => (
            <Link
              key={club.id}
              href={`/dashboard/${club.id}`}
              className="flex items-center justify-between rounded-lg bg-gray-700 p-4"
            >
              <div className="flex items-center space-x-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-800">
                  <Image src={club.logoUrl} alt={`${club.name} logo`} className="object-cover" fill />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{club.name}</h3>
                  <p className="text-sm text-gray-400">{club.memberCount}명의 멤버</p>
                </div>
              </div>
              <ArrowRight className="text-gray-400" />
            </Link>
          ))}
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-blue-400 hover:text-blue-300">
                <Plus className="mr-2 h-4 w-4" /> 동아리 추가하기
              </Button>
            </DialogTrigger>
            <DialogContent className="border-gray-700 bg-gray-800">
              <DialogHeader>
                <DialogTitle className="text-white">새 동아리 추가</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-gray-300">
                    동아리명
                  </Label>
                  <Input
                    id="name"
                    value={newClub.name}
                    onChange={e => setNewClub({ ...newClub, name: e.target.value })}
                    className="col-span-3 border-gray-600 bg-gray-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right text-gray-300">
                    한 줄 설명
                  </Label>
                  <Textarea
                    id="description"
                    value={newClub.description}
                    onChange={e => setNewClub({ ...newClub, description: e.target.value })}
                    className="col-span-3 border-gray-600 bg-gray-700 text-white"
                  />
                </div>
              </div>
              <p className="mb-4 text-sm text-gray-400">나중에 더 자세한 정보를 추가할 수 있습니다.</p>
              <Button onClick={handleAddClub} className="bg-blue-600 text-white hover:bg-blue-700">
                추가
              </Button>
            </DialogContent>
          </Dialog>
          <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-gray-400 hover:text-gray-300">
                <Key className="mr-2 h-4 w-4" /> 초대코드 입력
              </Button>
            </DialogTrigger>
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
              <Button onClick={handleInviteCodeSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
                제출
              </Button>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
