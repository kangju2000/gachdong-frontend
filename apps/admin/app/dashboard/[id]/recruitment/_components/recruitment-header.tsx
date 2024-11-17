'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import Link from 'next/link';

interface RecruitmentHeaderProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  pathname: string;
}

export function RecruitmentHeader({ searchTerm, onSearch, pathname }: RecruitmentHeaderProps) {
  return (
    <Card className="border-gray-700 bg-gray-800 shadow-lg">
      <CardHeader className="border-b border-gray-700">
        <CardTitle className="text-2xl font-bold text-gray-100">모집 공고 관리</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="공고 검색"
              className="border-gray-600 bg-gray-700 pl-10 text-gray-100"
              value={searchTerm}
              onChange={e => onSearch(e.target.value)}
            />
          </div>
          <Link href={`${pathname}/new`}>
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">
              <Plus className="mr-2 h-5 w-5" /> 새 공고 생성
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
