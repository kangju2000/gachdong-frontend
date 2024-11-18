'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form } from '@/components/ui/form';
import { useUploadProfileImage } from '@/apis/user';
import { toast } from '@/hooks/use-toast';
import { profileFormSchema, type ProfileFormValues } from '@/schemas/settings';
import { useSuspenseQuery } from '@tanstack/react-query';
import { authQueries } from '@/apis/auth';
import Image from 'next/image';

export function ProfileForm() {
  const { data: user } = useSuspenseQuery(authQueries.profile());
  const { mutate: uploadProfileImage } = useUploadProfileImage();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });

  const handleSubmit = async (data: ProfileFormValues) => {
    if (data.profileImage == null) {
      return;
    }

    try {
      uploadProfileImage({ image: data.profileImage });

      setPreviewImage(null);
      form.reset();

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
    form.setValue('profileImage', file);

    // 미리보기 설정
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreviewImage(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필 수정</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="relative mx-auto mb-4 h-20 w-20">
              <Avatar className="h-24 w-24">
                <AvatarImage src={previewImage ?? user.profileImageUrl} asChild>
                  <Image
                    src={previewImage ?? user.profileImageUrl ?? ''}
                    alt="프로필 이미지 미리보기"
                    sizes="96px"
                    fill
                    priority
                  />
                </AvatarImage>
                <AvatarFallback delayMs={600}>{user.name?.slice(0, 2)}</AvatarFallback>
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
                    form.setValue('profileImage', null);
                  }}
                >
                  취소
                </Button>
              )}
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? '업데이트 중...' : '변경사항 저장'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
