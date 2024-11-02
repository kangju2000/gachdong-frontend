'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useClubs } from '@/apis/club';

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showRecruiting, setShowRecruiting] = useState(false);

  const {
    data: { results: clubs },
  } = useClubs();

  const filteredClubs = clubs.filter(club => {
    const matchesSearch =
      club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || club.category === selectedCategory;
    const matchesRecruiting = !showRecruiting || club.recruitingStatus;

    return matchesSearch && matchesCategory && matchesRecruiting;
  });

  return (
    <main className="mx-auto max-w-[980px] px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl">동아리 목록</h1>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search className="text-muted-foreground absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            type="search"
            placeholder="동아리 검색"
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                필터
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setShowRecruiting(!showRecruiting)}>
                {showRecruiting ? '모든 동아리 보기' : '모집 중인 동아리만'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Tabs defaultValue="전체" className="mb-6 w-full" onValueChange={setSelectedCategory}>
        <TabsList>
          {['전체', 'IT · 프로그래밍', '학술 · 사회', '문화 · 예술', '체육 · 건강'].map(tab => (
            <TabsTrigger key={tab} value={tab} className="whitespace-nowrap px-3 py-1.5 text-sm">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filteredClubs.map(club => (
          <Link href={`/clubs/${club.clubId}`} key={club.clubId}>
            <Card className="overflow-hidden transition-shadow hover:shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-muted relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={club.clubImageUrl}
                      alt={`${club.clubName} logo`}
                      className="object-cover"
                      fill
                      sizes="100%"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{club.clubName}</h3>
                    <p className="text-muted-foreground text-sm">{club.category}</p>
                    <div className="mt-2 flex items-center">
                      <span
                        className={`h-2 w-2 rounded-full ${club.recruitingStatus ? 'bg-green-500' : 'bg-red-500'} mr-2`}
                      ></span>
                      <span className={`text-sm ${club.recruitingStatus ? 'text-green-600' : 'text-red-600'}`}>
                        {club.recruitingStatus ? '모집중' : '모집 마감'}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm">{club.shortDescription}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
