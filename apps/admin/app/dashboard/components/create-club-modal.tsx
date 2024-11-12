import { CreateClubRequest } from '@/apis/__generated__/club/swagger';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CATEGORY_MAP } from '@/constants/categories';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateClubRequest, imageFile?: File) => void;
};

export function CreateClubModal({ isOpen, onOpenChange, onSubmit }: Props) {
  const [formData, setFormData] = useState<CreateClubRequest>({
    name: '',
    shortDescription: '',
    category: 'ACADEMIC',
    introduction: '',
    establishedAt: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = () => {
    if (formData.name && formData.shortDescription) {
      onSubmit(formData, imageFile || undefined);
      setFormData({
        name: '',
        shortDescription: '',
        category: 'ACADEMIC',
        introduction: '',
        establishedAt: '',
      });
      removeImage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-gray-700 bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white">새 동아리 추가</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-gray-300">
              동아리명 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="col-span-3 border-gray-600 bg-gray-700 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right text-gray-300">
              카테고리 <span className="text-red-500">*</span>
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
                {Object.entries(CATEGORY_MAP).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="shortDescription" className="text-right text-gray-300">
              한 줄 설명 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="shortDescription"
              required
              value={formData.shortDescription}
              onChange={e => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              className="col-span-3 border-gray-600 bg-gray-700 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="introduction" className="text-right text-gray-300">
              동아리 소개
            </Label>
            <Textarea
              id="introduction"
              value={formData.introduction}
              onChange={e => setFormData(prev => ({ ...prev, introduction: e.target.value }))}
              className="col-span-3 min-h-[150px] border-gray-600 bg-gray-700 text-white"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="establishedAt" className="text-right text-gray-300">
              설립일
            </Label>
            <Input
              id="establishedAt"
              type="datetime-local"
              value={formData.establishedAt}
              onChange={e => setFormData(prev => ({ ...prev, establishedAt: e.target.value }))}
              className="col-span-3 border-gray-600 bg-gray-700 text-white"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label className="text-right text-gray-300">동아리 이미지</Label>
          <div className="col-span-3 space-y-4">
            {previewUrl ? (
              <div className="relative inline-block">
                <Image src={previewUrl} alt="Preview" className="rounded-lg object-cover" width={160} height={160} />
                <button
                  onClick={removeImage}
                  className="absolute -right-2 -top-2 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-gray-200"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-700 hover:border-gray-500 hover:bg-gray-600">
                <ImageIcon className="mb-2 h-8 w-8 text-gray-400" />
                <span className="text-sm text-gray-400">이미지 업로드</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
            <p className="text-xs text-gray-400">권장 크기: 500x500px (1:1 비율)</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-400">* 표시는 필수 입력 항목입니다.</p>
          <Button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700">
            추가
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
