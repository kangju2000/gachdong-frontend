'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Plus, Key } from 'lucide-react';
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
          <Button variant="link" className="text-blue-400 hover:text-blue-300">
            <Plus className="mr-2 h-4 w-4" /> 동아리 추가하기
          </Button>
          <Button variant="link" className="text-gray-400 hover:text-gray-300">
            <Key className="mr-2 h-4 w-4" /> 초대코드 입력
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
