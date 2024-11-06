'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronRight, LogOut, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSuspenseQuery } from '@tanstack/react-query';
import { authQueries, useLogout } from '@/apis/auth';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: profile } = useSuspenseQuery(authQueries.profile());
  const { mutate: logout } = useLogout();

  const breadcrumbs = pathname
    .split('/')
    .filter(v => isNaN(Number(v)))
    .map((path, index, paths) => {
      const href = paths.slice(0, index + 1).join('/');
      return {
        label: path,
        href: index === paths.length - 1 ? undefined : href,
      };
    });

  return (
    <header className="border-b border-gray-800 bg-gray-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
              <Link
                href={item.href ?? '#'}
                className={`hover:text-gray-100 ${
                  index === breadcrumbs.length - 1 ? 'text-gray-100' : 'text-gray-400'
                }`}
              >
                {{
                  dashboard: '홈',
                  recruitment: '모집 공고',
                  recruitmentId: '모집 공고 상세',
                  applicant: '지원자 목록',
                  applicantId: '지원자 상세',
                  statistics: '동아리 통계',
                  settings: '동아리 설정',
                  'admin-management': '운영진 관리',
                  new: '생성',
                }[item.label] ?? item.label}
              </Link>
            </React.Fragment>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="프로필 이미지" />
                <AvatarFallback>{profile.name?.[0] ?? 'A'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border-gray-700 bg-gray-800 text-gray-100" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{profile.name}</p>
                <p className="text-xs leading-none text-gray-400">{profile.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="hover:bg-gray-700" onSelect={() => router.push(`/settings`)}>
              <User className="mr-2 h-4 w-4" />
              <span>설정</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-700" onSelect={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
