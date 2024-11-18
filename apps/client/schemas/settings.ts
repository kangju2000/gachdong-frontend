import * as z from 'zod';

// 프로필 수정 스키마
export const profileFormSchema = z.object({
  profileImage: z.instanceof(File).nullable(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

// 비밀번호 변경 스키마
export const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요'),
    newPassword: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다'),
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type PasswordFormValues = z.infer<typeof passwordFormSchema>;
