'use client';

import { TextLogo } from '@/components/icons/TextLogo';
import { cn } from '@/lib/utils';
import { Users, Megaphone, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/clubs', label: '동아리', icon: Users },
  { href: '/recruits', label: '모집 공고', icon: Megaphone },
  { href: '/announcements', label: '공지사항', icon: Newspaper },
];

export function NavigationSection() {
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-6">
      <Link href="/" className="text-2xl font-bold">
        <TextLogo />
      </Link>
      <nav className="flex items-center space-x-2 sm:space-x-4">
        {navItems.map(item => (
          <NavItem key={item.href} item={item} isActive={pathname === item.href} />
        ))}
      </nav>
    </div>
  );
}

function NavItem({ item, isActive }: { item: (typeof navItems)[number]; isActive: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn('flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium', {
        'text-muted-foreground hover:bg-accent hover:text-accent-foreground': !isActive,
        'bg-primary text-primary-foreground': isActive,
      })}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:block">{item.label}</span>
    </Link>
  );
}
