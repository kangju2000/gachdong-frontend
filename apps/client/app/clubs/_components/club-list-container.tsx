'use client';

import { useState } from 'react';
import { SearchBar } from './search-bar';
import { FilterButton } from './filter-button';
import { CategoryTabs } from './category-tabs';
import { EmptyState } from './empty-state';
import { ClubGrid } from './club-grid';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import { Category } from '@/constants/categories';

export function ClubListContainer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showRecruiting, setShowRecruiting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');

  const {
    data: { results: clubs = [] },
  } = useSuspenseQuery(clubQueries.clubs());

  const filteredClubs = clubs.filter(club => {
    const matchesSearch =
      club.clubName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ALL' || club.category === selectedCategory;
    const matchesRecruiting = !showRecruiting || club.recruitingStatus;

    return matchesSearch && matchesCategory && matchesRecruiting;
  });

  return (
    <>
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
    </>
  );
}
