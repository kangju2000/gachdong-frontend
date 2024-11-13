import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PostInfo } from '../../types';

interface PostInfoSectionProps {
  postInfo: PostInfo;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function PostInfoSection({ postInfo, onChange }: PostInfoSectionProps) {
  return (
    <Card className="border-gray-700 bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-100">모집 공고 생성</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-200">
            제목
          </Label>
          <Input
            id="title"
            name="title"
            value={postInfo.title}
            onChange={onChange}
            className="border-gray-600 bg-gray-700 text-gray-100"
          />
        </div>

        {/* Content Textarea */}
        <div className="space-y-2">
          <Label htmlFor="content" className="text-gray-200">
            공고 내용
          </Label>
          <Textarea
            id="content"
            name="content"
            value={postInfo.content}
            onChange={onChange}
            className="min-h-[200px] border-gray-600 bg-gray-700 text-gray-100"
          />
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <DateInput id="startDate" label="시작 날짜" value={postInfo.startDate} onChange={onChange} />
          <DateInput id="endDate" label="마감 날짜" value={postInfo.endDate} onChange={onChange} />
        </div>
      </CardContent>
    </Card>
  );
}

interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DateInput({ id, label, value, onChange }: DateInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-gray-200">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          name={id}
          type="date"
          value={value}
          onChange={onChange}
          className="border-gray-600 bg-gray-700 pl-10 text-gray-100"
        />
        <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
}
