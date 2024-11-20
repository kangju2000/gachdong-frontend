'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LayoutDashboard, BarChart, Settings, FileText, UserCog } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { clubQueries } from '@/apis/club';
import { useSuspenseQuery } from '@tanstack/react-query';

const menuItems = [
  {
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    label: '홈',
    href: '/',
  },
  {
    icon: <FileText className="mr-2 h-4 w-4" />,
    label: '모집 공고',
    href: '/recruitment',
  },
  {
    icon: <BarChart className="mr-2 h-4 w-4" />,
    label: '동아리 통계',
    href: '/statistics',
  },
  {
    icon: <UserCog className="mr-2 h-4 w-4" />,
    label: '운영진 목록',
    href: '/admin-list',
  },
  {
    icon: <Settings className="mr-2 h-4 w-4" />,
    label: '동아리 설정',
    href: '/settings',
  },
];

export function Sidebar() {
  const params = useParams();
  const router = useRouter();
  const { data: authorizedClubs } = useSuspenseQuery(clubQueries.authorizedClubs());

  const handleClubChange = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  return (
    <div className="flex w-64 flex-col border-r border-gray-800 bg-gray-900">
      <div className="p-4">
        <Select defaultValue={String(params.id)} onValueChange={handleClubChange}>
          <SelectTrigger className="w-full border-gray-700 bg-gray-800 text-gray-100">
            <SelectValue placeholder="동아리 선택" />
          </SelectTrigger>
          <SelectContent className="border-gray-700 bg-gray-800 text-gray-100">
            {authorizedClubs.map((club, index) => (
              <SelectItem key={index} value={String(club.clubId)}>
                {club.clubName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
            asChild
          >
            <Link href={`/dashboard/${params.id}${item.href}`}>
              {item.icon}
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
}
