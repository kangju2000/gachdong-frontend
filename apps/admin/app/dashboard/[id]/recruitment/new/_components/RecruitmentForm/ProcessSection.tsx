'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Users, FileCode, Presentation, CheckCircle, Trash2, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useFormContext } from 'react-hook-form';
import { Process, RecruitmentFormData } from '../../schemas';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useProcessFieldArray } from '../../hooks/useProcessFieldArray';
import { RECRUITMENT_PROCESS_TYPES } from '../../constants';

const PROCESS_ICONS = {
  FileText,
  Users,
  FileCode,
  Presentation,
  CheckCircle,
} as const;

export function ProcessSection() {
  const { control } = useFormContext<RecruitmentFormData>();
  const { fields, append, remove } = useProcessFieldArray();

  const handleAddProcess = (processType: (typeof RECRUITMENT_PROCESS_TYPES)[number]) => {
    append({
      label: processType.label,
      order: fields.length + 1,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>전형 프로세스</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              프로세스 추가
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {RECRUITMENT_PROCESS_TYPES.map(processType => {
              const Icon = PROCESS_ICONS[processType.icon as keyof typeof PROCESS_ICONS];
              return (
                <DropdownMenuItem
                  key={processType.id}
                  onClick={() => handleAddProcess(processType)}
                  className="cursor-pointer"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {processType.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <FormField
              control={control}
              name={`processes.${index}.label`}
              render={({ field: formField }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <div className="flex items-center gap-2">
                      {RECRUITMENT_PROCESS_TYPES.map(type => {
                        if (type.label === formField.value) {
                          const Icon = PROCESS_ICONS[type.icon as keyof typeof PROCESS_ICONS];
                          return <Icon key={type.id} className="text-muted-foreground h-4 w-4" />;
                        }
                        return null;
                      })}
                      <Input {...formField} className="flex-1" placeholder={`${index + 1}차 전형`} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              disabled={fields.length <= 1}
              className="text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
