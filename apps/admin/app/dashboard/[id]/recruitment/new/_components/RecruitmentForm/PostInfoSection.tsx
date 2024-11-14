'use client';

import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MDEditor from '@uiw/react-md-editor';
import { RecruitmentFormData } from '../../schemas';

export function PostInfoSection() {
  const { control } = useFormContext<RecruitmentFormData>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>모집 공고 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="postInfo.title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input {...field} placeholder="모집 공고 제목을 입력하세요" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="postInfo.content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <div data-color-mode="dark">
                  <MDEditor
                    value={field.value}
                    onChange={value => field.onChange(value || '')}
                    height={400}
                    visibleDragbar={false}
                    hideToolbar={false}
                    enableScroll={true}
                    textareaProps={{
                      placeholder:
                        '모집 공고 내용을 입력하세요\n\n# 마크다운 문법을 지원합니다\n\n- 글머리 기호\n- **굵게**\n- *기울임*\n- [링크](url)\n- ![이미지](url)',
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="postInfo.startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시작일</FormLabel>
                <FormControl>
                  <Input {...field} type="date" min={new Date().toISOString().split('T')[0]} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="postInfo.endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>종료일</FormLabel>
                <FormControl>
                  <Input {...field} type="date" min={new Date().toISOString().split('T')[0]} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
