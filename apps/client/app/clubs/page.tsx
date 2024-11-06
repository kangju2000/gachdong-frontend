'use client';

import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import { Category } from '@/constants/categories';
import { SearchBar } from './components/search-bar';
import { FilterButton } from './components/filter-button';
import { CategoryTabs } from './components/category-tabs';
import { ClubGrid } from './components/club-grid';
import { EmptyState } from './components/empty-state';

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');
  const [showRecruiting, setShowRecruiting] = useState(false);

  const { data: { results: clubs = [] } = {} } = useSuspenseQuery(clubQueries.clubs());

  const filteredClubs = clubs.filter(club => {
    const matchesSearch =
      club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || club.category === selectedCategory;
    const matchesRecruiting = !showRecruiting || club.recruitingStatus;

    return matchesSearch && matchesCategory && matchesRecruiting;
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">동아리 목록</h1>
        <p className="mt-2 text-lg text-gray-600">다양한 동아리를 찾아보세요</p>
      </div>

      <div className="mb-8 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchBar value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <FilterButton showRecruiting={showRecruiting} onToggle={() => setShowRecruiting(!showRecruiting)} />
        </div>
        <CategoryTabs selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      </div>

      {filteredClubs.length === 0 ? (
        <EmptyState searchTerm={searchTerm} selectedCategory={selectedCategory} showRecruitingOnly={showRecruiting} />
      ) : (
        <ClubGrid clubs={filteredClubs} />
      )}
    </main>
  );
}
