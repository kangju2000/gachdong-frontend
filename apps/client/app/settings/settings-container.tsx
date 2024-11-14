'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Eye, EyeOff } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { authQueries } from '@/apis/auth';
import { useChangePassword, useDeleteAccount } from '@/apis/auth';
import { useUpdateProfileImage, useUploadProfileImage } from '@/apis/user';
import { toast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// 프로필 수정 스키마
const profileFormSchema = z.object({
  profileImage: z.instanceof(File).nullable(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// 비밀번호 변경 스키마
const passwordFormSchema = z
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

type PasswordFormValues = z.infer<typeof passwordFormSchema>;

export default function SettingsContainer() {
  const { data: user } = useQuery(authQueries.profile());
  const { mutateAsync: changePassword } = useChangePassword();
  const { mutateAsync: deleteAccount } = useDeleteAccount();
  const { mutate: uploadProfileImage } = useUploadProfileImage();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 프로필 폼
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  // 비밀번호 폼
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
  });

  const handleProfileSubmit = async (data: ProfileFormValues) => {
    if (data.profileImage == null) {
      return;
    }

    try {
      uploadProfileImage({ image: data.profileImage });

      setPreviewImage(null);
      profileForm.reset();

      toast({
        title: '프로필이 업데이트되었습니다.',
      });
    } catch (error) {
      toast({
        title: '프로필 업데이트에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  const handlePasswordSubmit = async (data: PasswordFormValues) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      setIsChangingPassword(false);
      passwordForm.reset();

      toast({
        title: '비밀번호가 변경되었습니다.',
      });
    } catch (error) {
      toast({
        title: '비밀번호 변경에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: '이미지 파일만 업로드 가능합니다.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: '파일 크기는 5MB 이하여야 합니다.',
        variant: 'destructive',
      });
      return;
    }

    // 폼 값 설정
    profileForm.setValue('profileImage', file);

    // 미리보기 설정
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreviewImage(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAccount = async () => {
    if (confirm('정말로 탈퇴하시겠습니까?')) {
      await deleteAccount();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>프로필 수정</CardTitle>
          <CardDescription>프로필을 수정할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-4">
              <div className="relative mx-auto mb-4 h-20 w-20">
                <Avatar className="h-full w-full">
                  <AvatarImage src={previewImage || user.profileImageUrl} alt={user.name} />
                  <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                </Avatar>
                <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100">
                  <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
                  <Camera className="h-6 w-6 text-white" />
                </label>
              </div>
              <div className="flex justify-end gap-2">
                {previewImage && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setPreviewImage(null);
                      profileForm.setValue('profileImage', null);
                    }}
                  >
                    취소
                  </Button>
                )}
                <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                  {profileForm.formState.isSubmitting ? '업데이트 중...' : '변경사항 저장'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>계정 설정</CardTitle>
          <CardDescription>계정 관련 설정을 변경할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">로그인 계정</Label>
            <Input id="email" value={user?.email} disabled />
          </div>
          {!isChangingPassword ? (
            <Button variant="outline" className="w-full" onClick={() => setIsChangingPassword(true)}>
              비밀번호 변경
            </Button>
          ) : (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>현재 비밀번호</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input type={showCurrentPassword ? 'text' : 'password'} {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>새 비밀번호</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input type={showNewPassword ? 'text' : 'password'} {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>새 비밀번호 확인</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input type={showConfirmPassword ? 'text' : 'password'} {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={passwordForm.formState.isSubmitting}>
                  {passwordForm.formState.isSubmitting ? '변경 중...' : '비밀번호 변경'}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setIsChangingPassword(false);
                    passwordForm.reset();
                  }}
                >
                  취소
                </Button>
              </form>
            </Form>
          )}
          <Button variant="destructive" className="w-full" onClick={handleDeleteAccount}>
            계정 삭제하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
