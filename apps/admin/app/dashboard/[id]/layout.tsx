'use client';

import React, { useState } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { CLUBS } from '@/constants/data';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [selectedClubId, setSelectedClubId] = useState('1');

  const selectedClub = CLUBS.find(club => String(club.id) === selectedClubId)!;
  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar selectedClub={selectedClub} onClubChange={setSelectedClubId} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-950 p-6">{children}</main>
      </div>
    </div>
  );
}
