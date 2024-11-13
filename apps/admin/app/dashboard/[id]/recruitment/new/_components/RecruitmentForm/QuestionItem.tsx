'use client';

import { Draggable } from 'react-beautiful-dnd';
import { ArrowUp, ArrowDown, GripVertical, Plus, X } from 'lucide-react';
import { Question, questionTypes } from '../../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface QuestionItemProps {
  question: Question;
  index: number;
  onUpdate: (index: number, field: keyof Question, value: string | boolean | number | string[]) => void;
  onRemove: (index: number) => void;
  onAddOption: (questionIndex: number) => void;
  onUpdateOption: (questionIndex: number, optionIndex: number, value: string) => void;
  onRemoveOption: (questionIndex: number, optionIndex: number) => void;
}

export function QuestionItem({
  question,
  index,
  onUpdate,
  onRemove,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: QuestionItemProps) {
  return (
    <Draggable draggableId={`question-${index}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`rounded-lg border border-gray-700 p-4 ${snapshot.isDragging ? 'bg-gray-700' : 'bg-gray-800'}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ArrowUp className="h-4 w-4 cursor-pointer text-gray-400" />
              <ArrowDown className="h-4 w-4 cursor-pointer text-gray-400" />
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => onRemove(index)} variant="destructive" size="sm">
                삭제
              </Button>
              <div {...provided.dragHandleProps} className="flex cursor-move items-center space-x-2">
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-gray-200">질문 유형</Label>
              <Select value={question.type} onValueChange={value => onUpdate(index, 'type', value)}>
                <SelectTrigger className="border-gray-600 bg-gray-700 text-gray-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {questionTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-gray-200">질문 제목</Label>
              <Input
                value={question.title}
                onChange={e => onUpdate(index, 'title', e.target.value)}
                className="border-gray-600 bg-gray-700 text-gray-100"
              />
            </div>

            <div>
              <Label className="text-gray-200">질문 설명</Label>
              <Textarea
                value={question.description}
                onChange={e => onUpdate(index, 'description', e.target.value)}
                className="border-gray-600 bg-gray-700 text-gray-100"
              />
            </div>

            {(question.type === 'multiple' || question.type === 'checkbox') && (
              <div className="space-y-2">
                <Label className="text-gray-200">옵션</Label>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <Input
                      value={option}
                      onChange={e => onUpdateOption(index, optionIndex, e.target.value)}
                      className="border-gray-600 bg-gray-700 text-gray-100"
                      placeholder={`옵션 ${optionIndex + 1}`}
                    />
                    <Button
                      onClick={() => onRemoveOption(index, optionIndex)}
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-gray-100"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button onClick={() => onAddOption(index)} variant="outline" size="sm">
                  <Plus className="mr-2 h-4 w-4" /> 옵션 추가
                </Button>
              </div>
            )}

            {(question.type === 'short' || question.type === 'long') && (
              <div>
                <Label className="text-gray-200">최대 글자 수</Label>
                <Input
                  type="number"
                  value={question.maxLength}
                  onChange={e => onUpdate(index, 'maxLength', parseInt(e.target.value))}
                  className="border-gray-600 bg-gray-700 text-gray-100"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch checked={question.required} onCheckedChange={checked => onUpdate(index, 'required', checked)} />
              <Label className="text-gray-200">필수 항목</Label>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
