'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, LogOut, Settings, User, Users, Megaphone, Newspaper } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CookieManager } from '@/lib/auth/cookies';
import { useEffect, useState } from 'react';
import { useLogout } from '@/apis/auth';
import Image from 'next/image';

export function Header() {
  const [isLogin] = useState(CookieManager.getToken() ? true : false);
  const [isMounted, setIsMounted] = useState(false);
  const { mutate: logout } = useLogout();

  const notifications = [
    { id: 1, message: '새로운 동아리 지원이 있습니다.' },
    { id: 2, message: '프로필 업데이트를 완료해주세요.' },
  ];

  const pathname = usePathname();

  const navItems = [
    { href: '/clubs', label: '동아리', icon: Users },
    { href: '/recruits', label: '모집 공고', icon: Megaphone },
    { href: '/announcements', label: '공지사항', icon: Newspaper },
  ];

  // FIXME
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-background border-b">
      <div className="mx-auto flex min-h-[68px] max-w-[980px] items-center justify-between px-4 py-4">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold">
            <Image src="/text-logo.svg" alt="GACHDONG" width={100} height={30} />
          </Link>
          <nav className="hidden items-center space-x-4 sm:flex">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        {isMounted && (
          <div className="flex items-center space-x-4">
            {isLogin ? (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Bell className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">알림</h4>
                        <p className="text-muted-foreground text-sm">최근 알림 목록입니다.</p>
                      </div>
                      <ul className="space-y-2">
                        {notifications.map(notification => (
                          <li key={notification.id} className="text-sm">
                            {notification.message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </PopoverContent>
                </Popover>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarImage src="/placeholder.svg" alt="User" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>내 계정</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/mypage" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>마이페이지</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>설정</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => logout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>로그아웃</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild>
                <Link href="/login">로그인</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
