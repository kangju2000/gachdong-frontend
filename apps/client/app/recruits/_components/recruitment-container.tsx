'use client';

import { SearchBar } from './search-bar';
import { SortButton } from './sort-button';
import { CategoryTabs } from '@/components/shared/category-tabs';
import { EmptyState } from './empty-state';
import { RecruitmentCard } from './recruitment-card';
import { useRecruitments } from '../_hooks/useRecruitments';

export function RecruitmentContainer() {
  const { searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, sortBy, setSortBy, sortedRecruitments } =
    useRecruitments();

  return (
    <>
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
          {sortedRecruitments.map(recruitment => (
            <RecruitmentCard key={recruitment.recruitmentId} recruitment={recruitment} />
          ))}
        </div>
      )}
    </>
  );
}
