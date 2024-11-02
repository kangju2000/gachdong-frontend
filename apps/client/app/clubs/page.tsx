'use client';

import { useState } from 'react';
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
import { ChevronDown, Search, Filter, UsersRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useClubs } from '@/apis/club';
import { ClubSummaryResponse } from '@/apis/__generated__/club/swagger';

// 상수 정의
const CATEGORIES = ['전체', 'IT · 프로그래밍', '학술 · 사회', '문화 · 예술', '체육 · 건강'];

// 컴포넌트 분리
const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="relative w-full sm:w-64">
    <Search className="text-muted-foreground absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
    <Input type="search" placeholder="동아리 검색" className="pl-8" value={value} onChange={onChange} />
  </div>
);

const FilterButton = ({ showRecruiting, onToggle }: { showRecruiting: boolean; onToggle: () => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm">
        <Filter className="mr-2 h-4 w-4" />
        필터
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={onToggle}>
        {showRecruiting ? '모든 동아리 보기' : '모집 중인 동아리만'}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const CategoryTabs = ({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
}) => (
  <Tabs defaultValue={selectedCategory} className="mb-6 w-full" onValueChange={onCategoryChange}>
    <TabsList>
      {CATEGORIES.map(category => (
        <TabsTrigger key={category} value={category} className="whitespace-nowrap px-3 py-1.5 text-sm">
          {category}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
);

const ClubCard = ({ club }: { club: ClubSummaryResponse }) => (
  <Link href={`/clubs/${club.clubId}`}>
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="bg-muted relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
            <Image src={club.clubImageUrl} alt={`${club.clubName} logo`} className="object-cover" fill sizes="100%" />
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{club.clubName}</h3>
            <p className="text-muted-foreground text-sm">{club.category}</p>
            <div className="mt-2 flex items-center">
              <span className={`h-2 w-2 rounded-full ${club.recruitingStatus ? 'bg-green-500' : 'bg-red-500'} mr-2`} />
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
);

const EmptyState = ({
  searchTerm,
  selectedCategory,
  showRecruitingOnly,
}: {
  searchTerm: string;
  selectedCategory: string;
  showRecruitingOnly: boolean;
}) => {
  const getMessage = () => {
    if (searchTerm) {
      return {
        title: `"${searchTerm}"와 일치하는 동아리가 없습니다.`,
        description: '다른 검색어로 시도해보세요.',
      };
    }
    if (selectedCategory !== '전체') {
      return {
        title: `${selectedCategory} 카테고리에 동아리가 없습니다.`,
        description: '다른 카테고리를 선택해보세요.',
      };
    }
    if (showRecruitingOnly) {
      return {
        title: '현재 모집 중인 동아리가 없습니다.',
        description: '모든 동아리를 보시려면 필터를 해제하세요.',
      };
    }
    return {
      title: '등록된 동아리가 없습니다.',
      description: '',
    };
  };

  const { title, description } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
      <UsersRound className="text-muted-foreground mb-4 h-12 w-12" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </div>
  );
};
export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showRecruiting, setShowRecruiting] = useState(false);

  const { data: { results: clubs = [] } = {} } = useClubs();

  const filteredClubs = clubs.filter(club => {
    const matchesSearch =
      club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || club.category === selectedCategory;
    const matchesRecruiting = !showRecruiting || club.recruitingStatus;

    console.log(filteredClubs);

    return matchesSearch && matchesCategory && matchesRecruiting;
  });

  return (
    <main className="mx-auto max-w-[980px] px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl">동아리 목록</h1>

      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <div className="flex items-center space-x-2">
          <FilterButton showRecruiting={showRecruiting} onToggle={() => setShowRecruiting(!showRecruiting)} />
        </div>
      </div>

      <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {filteredClubs.length === 0 ? (
        <EmptyState searchTerm={searchTerm} selectedCategory={selectedCategory} showRecruitingOnly={showRecruiting} />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredClubs.map(club => (
            <ClubCard key={club.clubId} club={club} />
          ))}
        </div>
      )}
    </main>
  );
}
