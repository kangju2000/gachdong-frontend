'use client';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import { Category } from '@/constants/categories';
import { CategoryTabs } from '@/components/shared/category-tabs';
import { SearchBar } from './_components/search-bar';
import { SortButton } from './_components/sort-button';
import { EmptyState } from './_components/empty-state';
import { RecruitmentCard } from './_components/recruitment-card';

export type SortOption = 'latest' | 'deadline' | 'views';

export default function RecruitmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  const {
    data: { results: recruitments = [] },
  } = useSuspenseQuery(clubQueries.recruitments());

  const filteredRecruitments = recruitments.filter(
    recruitment =>
      (selectedCategory === 'ALL' || recruitment.category === selectedCategory) &&
      (recruitment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recruitment.clubName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedRecruitments = [...filteredRecruitments].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case 'views':
        return 0;
      // return (b.views || 0) - (a.views || 0);
      default:
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    }
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">동아리 모집 공고</h1>
        <p className="mt-2 text-lg text-gray-600">새로운 동아리원을 모집하고 있어요</p>
      </div>

      <div className="mb-8 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <SortButton value={sortBy} onChange={setSortBy} />
        </div>
        <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </div>

      {sortedRecruitments.length === 0 ? (
        <EmptyState searchTerm={searchTerm} selectedCategory={selectedCategory} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recruitments.map(recruitment => (
            <RecruitmentCard recruitment={recruitment} />
          ))}
        </div>
      )}
    </main>
  );
}
