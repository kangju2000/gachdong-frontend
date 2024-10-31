'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, Filter } from 'lucide-react';
import { ClubCard } from './club-card';
import { useClubs } from '@/apis/club';
import { useRouter } from 'next/navigation';

export function ClubList() {
  const {
    data: { results: clubs },
  } = useClubs();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showRecruitingOnly, setShowRecruitingOnly] = useState(false);

  const filteredClubs = useMemo(() => {
    return clubs.filter(club => {
      const matchesSearch = club.clubName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '전체' || club.category === selectedCategory;
      const matchesRecruiting = !showRecruitingOnly || club.recruitingStatus;
      return matchesSearch && matchesCategory && matchesRecruiting;
    });
  }, [clubs, searchTerm, selectedCategory, showRecruitingOnly]);

  const handleClubClick = (clubId: number) => {
    router.push(`/clubs/${clubId}`);
  };

  return (
    <section className="flex-grow">
      <div className="mb-4 flex items-center justify-end sm:justify-between">
        <h2 className="hidden text-2xl font-semibold sm:block">동아리 목록</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              type="search"
              placeholder="동아리 검색"
              className="w-[200px] pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                필터
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setShowRecruitingOnly(!showRecruitingOnly)}>
                {showRecruitingOnly ? '모든 동아리 보기' : '모집 중인 동아리만'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Tabs defaultValue="전체" className="mb-4 w-full" onValueChange={setSelectedCategory}>
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
          <div key={club.clubId} onClick={() => handleClubClick(club.clubId)}>
            <ClubCard club={club} />
          </div>
        ))}
      </div>
    </section>
  );
}
