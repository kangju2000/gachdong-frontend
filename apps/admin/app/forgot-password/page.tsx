'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';
import { useResetPassword, useSendVerificationCode } from '@/apis/auth';

export default function AdminForgotPassword() {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [error, setError] = useState('');

  const { mutateAsync: sendResetPassword } = useResetPassword();
  const { mutateAsync: sendVerificationCode } = useSendVerificationCode();

  const handleSendVerificationCode = async () => {
    try {
      await sendVerificationCode({ email: `${username}@gachon.ac.kr` });
      setIsVerificationSent(true);
      setError('');
    } catch (err) {
      setError('인증 코드 전송에 실패했습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendResetPassword({ email: `${username}@gachon.ac.kr`, code });
      setError('');
    } catch (err) {
      setError('비밀번호 재설정 요청에 실패했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <Card className="w-full max-w-md border-gray-700 bg-gray-800 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="mb-4 flex justify-center">
            <Shield className="h-12 w-12 text-blue-400" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-white">비밀번호 찾기</CardTitle>
          <CardDescription className="text-center text-gray-400">
            가입하신 아이디를 입력해 주세요. 비밀번호 재설정 링크를 보내드립니다.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-300">
                아이디
              </Label>
              <div className="flex">
                <Input
                  id="username"
                  type="text"
                  placeholder="아이디 입력"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="flex-1 rounded-r-none border-0 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  disabled={isVerificationSent}
                />
                <span className="flex items-center rounded-r-md bg-gray-600 px-3 text-gray-400">@gachon.ac.kr</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium text-gray-300">
                이메일 인증
              </Label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  type="text"
                  placeholder="인증 코드를 입력하세요"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  required
                  className="flex-1 border-0 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  disabled={username === ''}
                />
                {!isVerificationSent && (
                  <Button
                    type="button"
                    onClick={handleSendVerificationCode}
                    disabled={username === ''}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    인증코드 전송
                  </Button>
                )}
              </div>
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              disabled={!isVerificationSent}
            >
              비밀번호 재설정 링크 보내기
            </Button>
            <Link href="/login" className="flex items-center justify-center text-sm text-gray-400 hover:text-blue-400">
              <ArrowLeft size={16} className="mr-2" />
              로그인 페이지로 돌아가기
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
