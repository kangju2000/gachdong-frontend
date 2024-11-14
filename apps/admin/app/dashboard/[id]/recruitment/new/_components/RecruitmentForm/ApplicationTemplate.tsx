'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RecruitmentFormData, Question } from '../../schemas';
import { QuestionItem } from './QuestionItem';
import { DEFAULT_TEMPLATES, QUESTION_TYPES, TemplateKey, QuestionType } from '../../constants';

export function ApplicationTemplate() {
  const { control } = useFormContext<RecruitmentFormData>();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'questions',
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;
    move(sourceIndex, destinationIndex);
  };

  const handleAddQuestion = (type: QuestionType) => {
    const baseQuestion: Partial<Question> = {
      type,
      name: `question_${fields.length + 1}`,
      label: '',
      required: false,
      description: null,
    };

    const questionWithOptions =
      type === 'select' || type === 'checkbox'
        ? {
            ...baseQuestion,
            options: [{ label: '', value: '' }],
          }
        : baseQuestion;

    append(questionWithOptions as Question);
  };

  const handleAddTemplate = (templateKey: TemplateKey) => {
    const template = DEFAULT_TEMPLATES[templateKey];
    if (!template) return;

    template.forEach(question => {
      append({
        ...question,
        name: `${question.name}_${fields.length + 1}`,
      });
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>지원서 템플릿</CardTitle>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                템플릿 추가
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {(Object.keys(DEFAULT_TEMPLATES) as TemplateKey[]).map(key => (
                <DropdownMenuItem key={key} onClick={() => handleAddTemplate(key)}>
                  {key === 'personalInfo' && '기본 정보'}
                  {key === 'experience' && '자기소개'}
                  {key === 'availability' && '활동 가능 여부'}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                질문 추가
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {QUESTION_TYPES.map(type => (
                <DropdownMenuItem key={type.value} onClick={() => handleAddQuestion(type.value)}>
                  {type.label}
                  <span className="text-muted-foreground ml-2 text-xs">{type.description}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="questions">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {fields.length === 0 ? (
                  <div className="flex h-[200px] items-center justify-center rounded-lg border-2 border-dashed">
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">아직 추가된 질문이 없습니다.</p>
                      <p className="text-muted-foreground text-xs">템플릿을 추가하거나 새 질문을 추가해주세요.</p>
                    </div>
                  </div>
                ) : (
                  fields.map((field, index) => (
                    <QuestionItem key={field.id} index={index} onRemove={() => remove(index)} />
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  );
}
