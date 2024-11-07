'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { SuspenseQuery } from '@suspensive/react-query';
import { clubQueries, useCreateClubActivity } from '@/apis/club';
import { ClubActivityResponse } from '@/apis/__generated__/club/swagger';

interface ActivitiesCardProps {
  clubId: number;
}

export function ActivitiesCard({ clubId }: ActivitiesCardProps) {
  const [editingActivity, setEditingActivity] = useState<ClubActivityResponse | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { mutate: createActivity } = useCreateClubActivity();

  const handleAddActivity = () => {
    if (editingActivity && editingActivity.title && editingActivity.date && editingActivity.description) {
      createActivity({
        clubId,
        ...editingActivity,
      });
      setEditingActivity(null);
      setIsAddDialogOpen(false);
    }
  };

  const handleEditActivity = () => {
    if (editingActivity) {
      setEditingActivity(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteActivity = () => {
    alert('아직 구현되지 않은 기능입니다.');
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">활동 내역</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              활동 추가
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>새로운 활동 추가</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">활동명</Label>
                <Input
                  id="title"
                  value={editingActivity?.title ?? ''}
                  onChange={e => setEditingActivity({ ...editingActivity!, title: e.target.value })}
                  placeholder="활동명을 입력하세요"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">날짜</Label>
                <Input
                  id="date"
                  type="date"
                  value={editingActivity?.date ?? ''}
                  onChange={e => setEditingActivity({ ...editingActivity!, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">설명</Label>
                <Textarea
                  id="description"
                  value={editingActivity?.description ?? ''}
                  onChange={e => setEditingActivity({ ...editingActivity!, description: e.target.value })}
                  placeholder="활동에 대한 설명을 입력하세요"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleAddActivity}>추가</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>활동명</TableHead>
                <TableHead>날짜</TableHead>
                <TableHead>설명</TableHead>
                <TableHead className="w-[100px]">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SuspenseQuery {...clubQueries.activities(clubId)}>
                {({ data: { results: activities = [] } }) =>
                  activities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-muted-foreground text-center">
                        등록된 활동이 없습니다
                      </TableCell>
                    </TableRow>
                  ) : (
                    activities.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{activity.title}</TableCell>
                        <TableCell>{activity.date}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{activity.description}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingActivity({
                                  title: activity.title,
                                  date: activity.date,
                                  description: activity.description,
                                });
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteActivity()}>
                              <Trash2 className="text-destructive h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )
                }
              </SuspenseQuery>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
