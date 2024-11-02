'use client';

import { useProfile } from '@/apis/auth/queries';
import { useLogout } from '@/apis/auth/mutations';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bell, LogOut, Settings, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfileResponse } from '@/apis/__generated__/auth/swagger';

export function AuthSection() {
  const { data: profile } = useProfile();

  if (!profile) {
    return (
      <Button asChild>
        <Link href="/login">로그인</Link>
      </Button>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <NotificationPopover />
      <UserDropdown profile={profile} />
    </div>
  );
}

function NotificationPopover() {
  const notifications = [
    { id: 1, message: '새로운 동아리 지원이 있습니다.' },
    { id: 2, message: '프로필 업데이트를 완료해주세요.' },
  ];

  return (
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
  );
}

function UserDropdown({ profile }: { profile: UserProfileResponse }) {
  const { mutate: logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer">
          {/* <AvatarImage src={profile.avatar} alt="User" /> */}
          <AvatarFallback>{profile.name?.[0] ?? 'U'}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
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
  );
}
