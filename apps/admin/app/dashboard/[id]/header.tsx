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
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Header() {
  const pathname = usePathname();
  const breadcrumbs = pathname
    .split('/')
    .slice(3)
    .map((path, index, paths) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      return {
        label: path,
        href: index === paths.length - 1 ? undefined : href,
      };
    });

  return (
    <header className="border-b border-gray-800 bg-gray-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          <a href="/dashboard" className="text-gray-400 hover:text-gray-100">
            대시보드
          </a>
          {breadcrumbs.length > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
              {item.href ? (
                <a
                  href={item.href}
                  className={`hover:text-gray-100 ${
                    index === breadcrumbs.length - 1 ? 'text-gray-100' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <span className={index === breadcrumbs.length - 1 ? 'text-gray-100' : 'text-gray-400'}>
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="프로필 이미지" />
                <AvatarFallback>사용자</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 border-gray-700 bg-gray-800 text-gray-100" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">사용자 이름</p>
                <p className="text-xs leading-none text-gray-400">user@example.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="hover:bg-gray-700">
              <Link href="/settings" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>설정</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-700">
              <LogOut className="mr-2 h-4 w-4" />
              <span>로그아웃</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
