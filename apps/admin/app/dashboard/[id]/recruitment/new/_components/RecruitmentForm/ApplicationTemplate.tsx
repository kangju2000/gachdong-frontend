'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Plus } from 'lucide-react';
import { Question } from '../../types';
import { QuestionList } from './QuestionList';
import { QuestionPreview } from './QuestionPreview';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface ApplicationTemplateProps {
  questions: Question[];
  onAdd: () => void;
  onUpdate: (index: number, field: keyof Question, value: string | boolean | number | string[]) => void;
  onRemove: (index: number) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  onAddOption: (questionIndex: number) => void;
  onUpdateOption: (questionIndex: number, optionIndex: number, value: string) => void;
  onRemoveOption: (questionIndex: number, optionIndex: number) => void;
}

export function ApplicationTemplate({
  questions,
  onAdd,
  onUpdate,
  onRemove,
  onReorder,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: ApplicationTemplateProps) {
  return (
    <Card className="border-gray-700 bg-gray-800 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-gray-100">지원서 템플릿</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <Eye className="mr-2 h-4 w-4" /> 미리보기
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto bg-gray-800 text-gray-100">
            <DialogHeader>
              <DialogTitle>지원서 미리보기</DialogTitle>
            </DialogHeader>
            <QuestionPreview questions={questions} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button onClick={onAdd} className="bg-blue-600 text-white hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> 질문 추가
        </Button>
        <QuestionList
          questions={questions}
          onUpdate={onUpdate}
          onRemove={onRemove}
          onReorder={onReorder}
          onAddOption={onAddOption}
          onUpdateOption={onUpdateOption}
          onRemoveOption={onRemoveOption}
        />
      </CardContent>
    </Card>
  );
}
