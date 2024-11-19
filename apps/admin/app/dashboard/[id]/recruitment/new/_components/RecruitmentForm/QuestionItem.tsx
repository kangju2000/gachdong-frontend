'use client';

import { useFormContext, useFieldArray } from 'react-hook-form';
import { Draggable } from '@hello-pangea/dnd';
import { GripVertical, Trash2, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { RecruitmentFormData } from '../../schemas';
import { QUESTION_TYPES } from '../../constants';

interface QuestionItemProps {
  index: number;
  onRemove: () => void;
}

export function QuestionItem({ index, onRemove }: QuestionItemProps) {
  const { control, watch } = useFormContext<RecruitmentFormData>();
  const questionType = watch(`questions.${index}.type`);

  return (
    <Draggable draggableId={`question-${index}`} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`border ${snapshot.isDragging ? 'border-primary' : ''}`}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div {...provided.dragHandleProps} className="mt-2">
                <GripVertical className="text-muted-foreground h-5 w-5 cursor-move" />
              </div>

              <div className="flex-1 space-y-6">
                {/* 상단 컨트롤 영역 */}
                <div className="flex items-center justify-between gap-4">
                  <FormField
                    control={control}
                    name={`questions.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="w-[200px]">
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="질문 유형 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {QUESTION_TYPES.map(type => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`questions.${index}.required`}
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormLabel className="text-sm font-normal">필수 응답</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* 질문 입력 영역 */}
                <div className="space-y-4">
                  <FormField
                    control={control}
                    name={`questions.${index}.label`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} placeholder="질문을 입력하세요" className="text-lg font-medium" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`questions.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="질문에 대한 설명을 입력하세요 (선택사항)"
                            value={field.value || ''}
                            className="resize-none"
                            rows={2}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* 질문 유형별 추가 설정 */}
                <div className="pt-2">
                  {(questionType === 'select' || questionType === 'checkbox') && <OptionsField index={index} />}
                  {(questionType === 'shortText' || questionType === 'longText') && (
                    <div className="w-[200px]">
                      <FormField
                        control={control}
                        name={`questions.${index}.maxLength`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm">최대 글자수</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={0}
                                placeholder="제한 없음"
                                {...field}
                                onChange={e => field.onChange(e.target.valueAsNumber)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* 삭제 버튼 */}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}

function OptionsField({ index }: { index: number }) {
  const { control } = useFormContext<RecruitmentFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel className="text-sm">옵션 목록</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ label: '', value: '' })}
          className="h-8 px-3 text-xs"
        >
          <Plus className="mr-1 h-3 w-3" />
          옵션 추가
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field, optionIndex) => (
          <div
            key={field.id}
            className="bg-muted/50 hover:bg-muted group flex items-center gap-3 rounded-md border p-2"
          >
            <span className="bg-muted-foreground/20 text-muted-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs">
              {optionIndex + 1}
            </span>

            <div className="flex flex-1 items-center gap-3">
              <FormField
                control={control}
                name={`questions.${index}.options.${optionIndex}.label`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} placeholder="옵션 레이블" className="bg-background h-8" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`questions.${index}.options.${optionIndex}.value`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input {...field} placeholder="옵션 값" className="bg-background h-8" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(optionIndex)}
              disabled={fields.length <= 1}
              className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Trash2 className="text-destructive h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {fields.length === 0 && (
        <div className="rounded-md border border-dashed p-4 text-center">
          <p className="text-muted-foreground text-sm">옵션을 추가해주세요</p>
        </div>
      )}

      {fields.length > 0 && (
        <FormDescription className="text-xs">레이블: 사용자에게 보여질 텍스트 / 값: 실제 저장될 데이터</FormDescription>
      )}
    </div>
  );
}
