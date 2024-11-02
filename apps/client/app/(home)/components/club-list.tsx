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
import { ChevronDown, Search, Filter, UsersRound } from 'lucide-react';
import { ClubCard } from './club-card';
import { useClubs } from '@/apis/club';
import { useRouter } from 'next/navigation';
import { ClubSummaryResponse } from '@/apis/__generated__/club/swagger';

const CATEGORIES = ['전체', 'IT · 프로그래밍', '학술 · 사회', '문화 · 예술', '체육 · 건강'] as const;

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

// 검색 및 필터 헤더 컴포넌트
const ListHeader = ({
  searchTerm,
  onSearchChange,
  showRecruitingOnly,
  onRecruitingToggle,
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showRecruitingOnly: boolean;
  onRecruitingToggle: () => void;
}) => (
  <div className="mb-4 flex items-center justify-end sm:justify-between">
    <h2 className="hidden text-2xl font-semibold sm:block">동아리 목록</h2>
    <div className="flex items-center space-x-2">
      <SearchInput value={searchTerm} onChange={onSearchChange} />
      <FilterDropdown showRecruitingOnly={showRecruitingOnly} onToggle={onRecruitingToggle} />
    </div>
  </div>
);

// 검색 입력 컴포넌트
const SearchInput = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="relative">
    <Search className="text-muted-foreground absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
    <Input
      type="search"
      placeholder="동아리 검색"
      className="w-[200px] pl-8"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

// 필터 드롭다운 컴포넌트
const FilterDropdown = ({ showRecruitingOnly, onToggle }: { showRecruitingOnly: boolean; onToggle: () => void }) => (
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
        {showRecruitingOnly ? '모든 동아리 보기' : '모집 중인 동아리만'}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

// 카테고리 탭 컴포넌트
const CategoryTabs = ({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) => (
  <Tabs defaultValue={selectedCategory} className="mb-4 w-full" onValueChange={onCategoryChange}>
    <TabsList>
      {CATEGORIES.map(category => (
        <TabsTrigger key={category} value={category} className="whitespace-nowrap px-3 py-1.5 text-sm">
          {category}
        </TabsTrigger>
      ))}
    </TabsList>
  </Tabs>
);

// 클럽 목록 그리드 컴포넌트
const ClubGrid = ({
  clubs,
  onClubClick,
  searchTerm,
  selectedCategory,
  showRecruitingOnly,
}: {
  clubs: ClubSummaryResponse[];
  onClubClick: (clubId: number) => void;
  searchTerm: string;
  selectedCategory: string;
  showRecruitingOnly: boolean;
}) => {
  if (!clubs?.length) {
    return (
      <EmptyState searchTerm={searchTerm} selectedCategory={selectedCategory} showRecruitingOnly={showRecruitingOnly} />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {clubs.map(club => (
        <div key={club.clubId} onClick={() => onClubClick(club.clubId)}>
          <ClubCard club={club} />
        </div>
      ))}
    </div>
  );
};

export function ClubList() {
  const router = useRouter();
  const {
    data: { results: clubs = [] },
  } = useClubs();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showRecruitingOnly, setShowRecruitingOnly] = useState(false);

  const filteredClubs = useMemo(() => {
    return clubs?.filter(club => {
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
      <ListHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        showRecruitingOnly={showRecruitingOnly}
        onRecruitingToggle={() => setShowRecruitingOnly(!showRecruitingOnly)}
      />

      <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      <ClubGrid
        clubs={filteredClubs}
        onClubClick={handleClubClick}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        showRecruitingOnly={showRecruitingOnly}
      />
    </section>
  );
}
