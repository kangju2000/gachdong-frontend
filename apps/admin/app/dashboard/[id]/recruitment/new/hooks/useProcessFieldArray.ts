import { useFieldArray, useFormContext } from 'react-hook-form';
import type { RecruitmentFormData } from '../schemas';

export function useProcessFieldArray() {
  const { control } = useFormContext<RecruitmentFormData>();

  return useFieldArray<RecruitmentFormData, 'processes'>({
    control,
    name: 'processes',
  });
}
