'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Newspaper, Search, Calendar, Eye } from 'lucide-react';
import Link from 'next/link';
import { ANNOUNCEMENTS } from '@/constants/data';

export default function Announcements() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAnnouncements = ANNOUNCEMENTS.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background min-h-screen font-sans">
      <Header />

      <main className="mx-auto max-w-[980px] px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">공지사항</h1>
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2 transform" />
            <Input
              type="text"
              placeholder="공지사항 검색"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {filteredAnnouncements.map(announcement => (
            <Link key={announcement.id} href={`/announcements/${announcement.id}`}>
              <Card className="hover:bg-accent transition-colors">
                <CardHeader className="p-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <div className="text-muted-foreground flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        {announcement.createdAt.split('T')[0]}
                      </div>
                      <div className="flex items-center">
                        <Eye className="mr-1 h-4 w-4" />
                        {announcement.views}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="py-12 text-center">
            <Newspaper className="text-muted-foreground mx-auto h-12 w-12" />
            <h2 className="mt-4 text-lg font-semibold">공지사항이 없습니다</h2>
            <p className="text-muted-foreground mt-2">검색어와 일치하는 공지사항이 없습니다.</p>
          </div>
        )}
      </main>
    </div>
  );
}
