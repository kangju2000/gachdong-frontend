'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/date';
import { ClubRecruitmentDetailResponse } from '@gachdong/api/club';

interface RecruitmentTableProps {
  posts: ClubRecruitmentDetailResponse[];
  searchTerm: string;
  onPostClick: (postId: number) => void;
}

export function RecruitmentTable({ posts, searchTerm, onPostClick }: RecruitmentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-gray-700 hover:bg-gray-800">
          <TableHead className="text-gray-300">제목</TableHead>
          <TableHead className="text-gray-300">상태</TableHead>
          <TableHead className="text-gray-300">생성일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map(post => (
          <TableRow
            key={post.recruitmentId}
            className="cursor-pointer border-b border-gray-700 hover:bg-gray-700"
            onClick={() => onPostClick(post.recruitmentId)}
          >
            <TableCell className="font-medium text-gray-100">{post.title}</TableCell>
            <TableCell>
              <Badge
                variant="default"
                className={cn({
                  'bg-blue-600 text-white': post.recruitmentStatus === 'RECRUITING',
                  'bg-gray-600 text-white': post.recruitmentStatus === 'RECRUITMENT_END',
                })}
              >
                {post.recruitmentStatus === 'RECRUITING' ? '진행 중' : '마감'}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-300">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-green-400" />
                {formatDate(new Date(post.startDate), 'yyyy.MM.dd')}
              </div>
            </TableCell>
          </TableRow>
        ))}
        {posts.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center text-gray-300">
              {searchTerm ? '검색 결과가 없습니다.' : '모집 공고가 없습니다.'}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
