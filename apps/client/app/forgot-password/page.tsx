'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useResetPassword, useSendVerificationCode } from '@/apis/auth';

export default function ForgotPasswordPage() {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const { mutateAsync: sendResetPassword } = useResetPassword();
  const { mutateAsync: sendVerificationCode } = useSendVerificationCode();

  const handleSendVerificationCode = async () => {
    await sendVerificationCode({ email: `${username}@gachon.ac.kr` });
    setIsVerificationSent(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetPassword({ email: `${username}@gachon.ac.kr`, code });
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
                  disabled={isVerificationSent}
                />
                <span className="border-input bg-muted text-muted-foreground inline-flex items-center rounded-r-md border border-l-0 px-3 text-sm">
                  @gachon.ac.kr
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">이메일 인증</Label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  type="text"
                  placeholder="인증 코드를 입력하세요"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  required
                  disabled={username === ''}
                />
                {!isVerificationSent && (
                  <Button type="button" onClick={handleSendVerificationCode} disabled={username === ''}>
                    인증코드 전송
                  </Button>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!isVerificationSent}>
              비밀번호 재설정 링크 보내기
            </Button>
          </form>
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
