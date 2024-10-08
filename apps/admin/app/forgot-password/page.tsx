'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 비밀번호 재설정 로직을 구현하세요
    console.log('비밀번호 재설정 링크 전송:', email + '@gachon.ac.kr');
    // 예시: 성공 메시지 표시
    setSuccess(true);
    setError('');
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
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                아이디
              </Label>
              <div className="flex">
                <Input
                  id="email"
                  type="text"
                  placeholder="아이디 입력"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 border-0 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
                <span className="flex items-center rounded-r-md bg-gray-600 px-3 text-gray-400">@gachon.ac.kr</span>
              </div>
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle size={20} />
                <p className="text-sm">{error}</p>
              </div>
            )}
            {success && <div className="text-sm text-green-400">비밀번호 재설정 링크가 이메일로 전송되었습니다.</div>}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
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
