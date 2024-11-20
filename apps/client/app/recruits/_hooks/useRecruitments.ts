import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import { Category } from '@/constants/categories';
import { SortOption } from '../types';

export function useRecruitments() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  const {
    data: { results: recruitments = [] },
  } = useSuspenseQuery(clubQueries.recruitments());

  const filteredRecruitments = recruitments.filter(recruitment => {
    const matchesCategory = selectedCategory === 'ALL' || recruitment.category === selectedCategory;
    const matchesSearch =
      recruitment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recruitment.clubName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedRecruitments =
    sortBy === 'latest'
      ? [...filteredRecruitments].reverse()
      : [...filteredRecruitments].sort((a, b) => {
          switch (sortBy) {
            case 'deadline':
              return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
            case 'views':
              return 0;
          }
        });

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    sortedRecruitments,
  };
}
