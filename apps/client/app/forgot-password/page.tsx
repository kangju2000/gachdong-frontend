'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = `${username}@gachon.ac.kr`;
    // Here you would typically handle the password reset logic
    console.log('Password reset attempt for email:', email);

    // Simulating an API call
    setTimeout(() => {
      if (username === 'error') {
        setError('이메일 전송에 실패했습니다. 다시 시도해 주세요.');
      } else {
        setIsSubmitted(true);
        setError('');
      }
    }, 1000);
  };

  return (
    <main className="mx-auto max-w-[400px] px-4 py-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">비밀번호 찾기</CardTitle>
          <CardDescription className="text-center">
            가입하신 아이디를 입력해 주세요. 비밀번호 재설정 링크를 보내드리겠습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">아이디</Label>
                <div className="flex">
                  <Input
                    id="username"
                    type="text"
                    placeholder="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                    className="rounded-r-none"
                  />
                  <span className="border-input bg-muted text-muted-foreground inline-flex items-center rounded-r-md border border-l-0 px-3 text-sm">
                    @gachon.ac.kr
                  </span>
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>오류</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                비밀번호 재설정 링크 보내기
              </Button>
            </form>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>이메일 전송 완료</AlertTitle>
              <AlertDescription>비밀번호 재설정 링크를 이메일로 전송했습니다. 이메일을 확인해 주세요.</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-sm">
            <Link href="/login" className="text-primary hover:underline">
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
