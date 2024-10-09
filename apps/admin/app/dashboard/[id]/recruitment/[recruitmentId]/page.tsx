'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, SortAsc, SortDesc, Filter, ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface Applicant {
  id: number;
  name: string;
  email: string;
  applyDate: string;
  status: string;
}

const mockApplicants: Applicant[] = [
  { id: 1, name: '김철수', email: 'chulsoo@gachon.ac.kr', applyDate: '2024-03-01', status: '서류 심사 중' },
  { id: 2, name: '이영희', email: 'younghee@gachon.ac.kr', applyDate: '2024-03-02', status: '1차 합격' },
  { id: 3, name: '박민수', email: 'minsoo@gachon.ac.kr', applyDate: '2024-03-03', status: '최종 합격' },
  { id: 4, name: '정다은', email: 'daeun@gachon.ac.kr', applyDate: '2024-03-04', status: '불합격' },
];

const statusOptions = ['서류 심사 중', '1차 합격', '최종 합격', '불합격'];

export default function RecruitmentPostDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);
  const [filteredApplicants, setFilteredApplicants] = useState<Applicant[]>(mockApplicants);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Applicant; direction: 'asc' | 'desc' } | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    let result = applicants;

    if (searchTerm) {
      result = result.filter(
        applicant =>
          applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      result = result.filter(applicant => applicant.status === statusFilter);
    }

    if (sortConfig) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredApplicants(result);
  }, [applicants, searchTerm, sortConfig, statusFilter]);

  const handleSort = (key: keyof Applicant) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const passRate = ((applicants.filter(a => a.status === '최종 합격').length / applicants.length) * 100).toFixed(2);

  return (
    <div className="space-y-6 text-gray-100">
      <Card className="border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">모집 공고 상세</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">2024년 봄학기 신입 부원 모집</h2>
            <Badge variant="outline">{applicants.length} 지원자</Badge>
          </div>
          <p className="mb-2 text-sm text-gray-400">모집 기간: 2024-03-01 ~ 2024-03-31</p>
          <p className="text-sm text-gray-400">합격률: {passRate}%</p>
        </CardContent>
      </Card>

      <Card className="border-gray-700 bg-gray-800">
        <CardHeader>
          <CardTitle className="text-xl font-bold">지원자 명단</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center justify-between">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="이름 또는 이메일로 검색"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="border-gray-600 bg-gray-700 pl-10 text-gray-100"
              />
            </div>
            <Select onValueChange={value => setStatusFilter(value === 'all' ? null : value)}>
              <SelectTrigger className="w-[180px] border-gray-600 bg-gray-700 text-gray-100">
                <SelectValue placeholder="상태로 필터링" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-800">
                  <TableHead className="text-gray-300">
                    이름
                    <Button variant="ghost" size="sm" onClick={() => handleSort('name')} className="ml-2">
                      {sortConfig?.key === 'name' ? (
                        sortConfig.direction === 'asc' ? (
                          <SortAsc className="h-4 w-4" />
                        ) : (
                          <SortDesc className="h-4 w-4" />
                        )
                      ) : (
                        <Filter className="h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="text-gray-300">이메일</TableHead>
                  <TableHead className="text-gray-300">
                    지원일
                    <Button variant="ghost" size="sm" onClick={() => handleSort('applyDate')} className="ml-2">
                      {sortConfig?.key === 'applyDate' ? (
                        sortConfig.direction === 'asc' ? (
                          <SortAsc className="h-4 w-4" />
                        ) : (
                          <SortDesc className="h-4 w-4" />
                        )
                      ) : (
                        <Filter className="h-4 w-4" />
                      )}
                    </Button>
                  </TableHead>
                  <TableHead className="text-gray-300">상태</TableHead>
                  <TableHead className="text-gray-300">액션</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplicants.map(applicant => (
                  <TableRow key={applicant.id} className="hover:bg-gray-700">
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.email}</TableCell>
                    <TableCell>{applicant.applyDate}</TableCell>
                    <TableCell>
                      <Badge variant={applicant.status === '최종 합격' ? 'success' : 'secondary'}>
                        {applicant.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`${pathname}/applicant/${applicant.id}`)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        상세보기
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
