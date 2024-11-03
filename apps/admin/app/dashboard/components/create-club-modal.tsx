import { CreateClubRequest } from '@/apis/__generated__/club/swagger';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateClubRequest) => void;
};

export function CreateClubModal({ isOpen, onOpenChange, onSubmit }: Props) {
  const [formData, setFormData] = useState<CreateClubRequest>({
    name: '',
    shortDescription: '',
    category: 'OTHER',
  });

  const handleSubmit = () => {
    if (formData.name && formData.shortDescription) {
      onSubmit(formData);
      setFormData({ name: '', shortDescription: '', category: 'OTHER' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-gray-700 bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">새 동아리 추가</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-gray-300">
              동아리명
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="col-span-3 border-gray-600 bg-gray-700 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right text-gray-300">
              카테고리
            </Label>
            <Select
              value={formData.category}
              onValueChange={value =>
                setFormData(prev => ({ ...prev, category: value as CreateClubRequest['category'] }))
              }
            >
              <SelectTrigger className="col-span-3 border-gray-600 bg-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ART">예술</SelectItem>
                <SelectItem value="SPORTS">스포츠</SelectItem>
                <SelectItem value="SCIENCE">과학</SelectItem>
                <SelectItem value="MUSIC">음악</SelectItem>
                <SelectItem value="TECH">기술</SelectItem>
                <SelectItem value="OTHER">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shortDescription" className="text-right text-gray-300">
              한 줄 설명
            </Label>
            <Textarea
              id="shortDescription"
              value={formData.shortDescription}
              onChange={e => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              className="col-span-3 border-gray-600 bg-gray-700 text-white"
            />
          </div>
        </div>
        <p className="mb-4 text-sm text-gray-400">나중에 더 자세한 정보를 추가할 수 있습니다.</p>
        <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
          추가
        </Button>
      </DialogContent>
    </Dialog>
  );
}
