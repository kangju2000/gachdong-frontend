'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { FileText, Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ClubInfo {
  name: string;
  description: string;
  logoUrl: string;
  category: string;
}

interface Activity {
  id: number;
  title: string;
  date: string;
  description: string;
}

export default function Dashboard() {
  const pathname = usePathname();
  const clubInfo: ClubInfo = {
    name: 'GDG On Campus Gachon University',
    description: 'GDG On Campus Gachon University는 구글 개발자 기술에 관심이 있는 대학생 커뮤니티 그룹입니다.',
    logoUrl:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
    category: 'IT · 프로그래밍',
  };

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      title: '2024 신입 회원 OT',
      date: '2024-03-15',
      description: '신입 회원들을 위한 오리엔테이션을 진행했습니다.',
    },
    {
      id: 2,
      title: 'Flutter 스터디',
      date: '2024-03-22',
      description: 'Flutter를 이용한 모바일 앱 개발 스터디를 시작했습니다.',
    },
    {
      id: 3,
      title: 'Google I/O Extended',
      date: '2024-05-10',
      description: 'Google I/O Extended 행사를 개최했습니다.',
    },
  ]);

  const [newActivity, setNewActivity] = useState<Omit<Activity, 'id'>>({
    title: '',
    date: '',
    description: '',
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddActivity = () => {
    if (newActivity.title && newActivity.date && newActivity.description) {
      setActivities([...activities, { ...newActivity, id: activities.length + 1 }]);
      setNewActivity({ title: '', date: '', description: '' });
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteActivity = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="border-border bg-card">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
            <div className="relative h-20 w-20 overflow-hidden rounded-full sm:h-24 sm:w-24">
              <Image src={clubInfo.logoUrl} alt={`${clubInfo.name} logo`} className="object-cover" fill />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="mb-2 text-xl font-bold sm:text-2xl">{clubInfo.name}</h2>
              <p className="text-muted-foreground mb-2 text-sm sm:text-base">{clubInfo.description}</p>
              <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                <Badge variant="secondary">{clubInfo.category}</Badge>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col justify-center space-y-2 sm:flex-row sm:justify-end sm:space-x-4 sm:space-y-0">
            <Link href={`${pathname}/settings`}>
              <Button variant="outline" className="w-full sm:w-auto">
                동아리 설정
              </Button>
            </Link>
            <Link href={`${pathname}/recruitment/new`}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                모집 공고 생성
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold">활동 내역</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" /> 활동 추가
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background border-border">
              <DialogHeader>
                <DialogTitle>새 활동 추가</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    제목
                  </Label>
                  <Input
                    id="title"
                    value={newActivity.title}
                    onChange={e => setNewActivity({ ...newActivity, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    날짜
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newActivity.date}
                    onChange={e => setNewActivity({ ...newActivity, date: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    설명
                  </Label>
                  <Textarea
                    id="description"
                    value={newActivity.description}
                    onChange={e => setNewActivity({ ...newActivity, description: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleAddActivity} className="bg-primary text-primary-foreground hover:bg-primary/90">
                추가
              </Button>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>날짜</TableHead>
                <TableHead>설명</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map(activity => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.title}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive/80"
                      onClick={() => handleDeleteActivity(activity.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
