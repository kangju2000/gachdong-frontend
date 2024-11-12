'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { SuspenseQuery } from '@suspensive/react-query';
import { clubQueries, useCreateClubContactInfo } from '@/apis/club';
import { ClubContactInfoResponse } from '@gachdong/api/club';

export function ContactInfoCard({ clubId }: { clubId: number }) {
  const [editingContact, setEditingContact] = useState<ClubContactInfoResponse | null>(null);
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [isEditContactDialogOpen, setIsEditContactDialogOpen] = useState(false);

  const { mutate: createContactInfo } = useCreateClubContactInfo();

  const handleAddContact = () => {
    if (editingContact && editingContact.contactMethod && editingContact.contactValue) {
      createContactInfo({
        clubId,
        type: editingContact.contactMethod,
        contact: editingContact.contactValue,
      });
      setEditingContact(null);
      setIsAddContactDialogOpen(false);
    }
  };

  const handleDeleteContact = () => {
    alert('아직 구현되지 않은 기능입니다.');
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">연락처 정보</CardTitle>
        <Dialog open={isAddContactDialogOpen} onOpenChange={setIsAddContactDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              연락처 추가
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>새로운 연락처 추가</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">유형</Label>
                <Input
                  id="type"
                  value={editingContact?.contactMethod ?? ''}
                  onChange={e => setEditingContact({ ...editingContact!, contactMethod: e.target.value })}
                  placeholder="예: 이메일, 전화번호, 카카오톡"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">연락처</Label>
                <Input
                  id="value"
                  value={editingContact?.contactValue ?? ''}
                  onChange={e => setEditingContact({ ...editingContact!, contactValue: e.target.value })}
                  placeholder="연락처 정보를 입력하세요"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddContactDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleAddContact}>추가</Button>
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
                <TableHead>연락 수단</TableHead>
                <TableHead>연락처 정보</TableHead>
                <TableHead className="w-[100px]">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <SuspenseQuery {...clubQueries.contactInfo(clubId)}>
                {({ data: { results: contactInfo = [] } }) =>
                  contactInfo.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-muted-foreground text-center">
                        등록된 연락처가 없습니다
                      </TableCell>
                    </TableRow>
                  ) : (
                    contactInfo.map((contact, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{contact.contactMethod}</TableCell>
                        <TableCell>{contact.contactValue}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingContact(contact);
                                setIsEditContactDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteContact()}>
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
