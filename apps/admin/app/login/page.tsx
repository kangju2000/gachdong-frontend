'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Shield } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // console.log("관리자 로그인 시도:", email + "@gachon.ac.kr", password);
    // setError("이메일 또는 비밀번호가 올바르지 않습니다.");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">관리자 로그인</CardTitle>
          <CardDescription className="text-center text-gray-400">관리자 계정으로 로그인하세요</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                이메일
              </Label>
              <div className="flex">
                <Input
                  id="email"
                  type="text"
                  placeholder="아이디 입력"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-gray-700 border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
                <span className="flex items-center px-3 text-gray-400 bg-gray-600 rounded-r-md">@gachon.ac.kr</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                비밀번호
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-gray-700 border-0 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" className="border-gray-500 text-blue-500" />
              <Label htmlFor="rememberMe" className="text-sm text-gray-300">
                로그인 상태 유지
              </Label>
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
              // type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => router.push('/dashboard')}
            >
              로그인
            </Button>
            <div className="text-sm text-center space-y-2">
              <Link href="/forgot-password" className="text-blue-400 hover:underline">
                비밀번호를 잊으셨나요?
              </Link>
              <div className="text-gray-400">
                계정이 없으신가요?{' '}
                <Link href="/signup" className="text-blue-400 hover:underline">
                  회원가입
                </Link>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
