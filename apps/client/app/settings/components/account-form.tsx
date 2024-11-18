'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { authQueries, useChangePassword, useDeleteAccount } from '@/apis/auth';
import { toast } from '@/hooks/use-toast';
import { passwordFormSchema, type PasswordFormValues } from '@/schemas/settings';
import { usePasswordVisibility } from '@/hooks/use-password-visibility';
import { useSuspenseQuery } from '@tanstack/react-query';

export function AccountForm() {
  const { data: user } = useSuspenseQuery(authQueries.profile());
  const { mutateAsync: changePassword } = useChangePassword();
  const { mutateAsync: deleteAccount } = useDeleteAccount();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const currentPasswordVisibility = usePasswordVisibility();
  const newPasswordVisibility = usePasswordVisibility();
  const confirmPasswordVisibility = usePasswordVisibility();

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
  });

  const handleSubmit = async (data: PasswordFormValues) => {
    await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    setIsChangingPassword(false);
    form.reset();
  };

  const handleDeleteAccount = async () => {
    if (confirm('정말로 탈퇴하시겠습니까?')) {
      await deleteAccount();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>계정 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">로그인 계정</Label>
          <Input id="email" value={user.email} disabled />
        </div>

        {!isChangingPassword ? (
          <Button variant="outline" className="w-full" onClick={() => setIsChangingPassword(true)}>
            비밀번호 변경
          </Button>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>현재 비밀번호</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type={currentPasswordVisibility.type} {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={currentPasswordVisibility.toggle}
                      >
                        {currentPasswordVisibility.icon}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type={newPasswordVisibility.type} {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={newPasswordVisibility.toggle}
                      >
                        {newPasswordVisibility.icon}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>새 비밀번호 확인</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input type={confirmPasswordVisibility.type} {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={confirmPasswordVisibility.toggle}
                      >
                        {confirmPasswordVisibility.icon}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? '변경 중...' : '비밀번호 변경'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setIsChangingPassword(false);
                  form.reset();
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
  );
}
