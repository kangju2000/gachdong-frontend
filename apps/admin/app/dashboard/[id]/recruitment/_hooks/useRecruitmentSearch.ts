'use client';

import { useState, useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ClubRecruitmentDetailResponse } from '@gachdong/api/club';

export function useRecruitmentSearch({ recruitmentPosts }: { recruitmentPosts: ClubRecruitmentDetailResponse[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return recruitmentPosts;

    const query = searchTerm.toLowerCase();
    return recruitmentPosts.filter(post => post.title.toLowerCase().includes(query));
  }, [recruitmentPosts, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const newSearchParams = new URLSearchParams(searchParams);
    if (value) {
      newSearchParams.set('search', value);
    } else {
      newSearchParams.delete('search');
    }
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  const handlePostClick = (postId: number) => {
    router.push(`${pathname}/${postId}`);
  };

  return {
    searchTerm,
    filteredPosts,
    handleSearch,
    handlePostClick,
  };
}
