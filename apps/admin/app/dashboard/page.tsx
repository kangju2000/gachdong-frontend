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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex items-center justify-center">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white mb-4">동아리를 선택해주세요</CardTitle>
          <div className="flex justify-center items-center space-x-2">
            <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">{email}</span>
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
              className="flex items-center justify-between bg-gray-700 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800 relative">
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
            <Plus className="w-4 h-4 mr-2" /> 동아리 추가하기
          </Button>
          <Button variant="link" className="text-gray-400 hover:text-gray-300">
            <Key className="w-4 h-4 mr-2" /> 초대코드 입력
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
