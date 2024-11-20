'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useLogin } from '@/apis/auth';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login } = useLogin();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(
      { email: `${username}@gachon.ac.kr`, password },
      {
        onSuccess: () => {
          router.push('/dashboard');
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <Card className="w-full max-w-md border-gray-700 bg-gray-800 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="mb-4 flex justify-center">
            <Shield className="h-12 w-12 text-blue-400" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-white">운영진 로그인</CardTitle>
          <CardDescription className="text-center text-gray-400">GACHDONG에 오신 것을 환영합니다</CardDescription>
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
                  placeholder="아이디"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="flex-1 rounded-r-none border-0 bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  autoComplete="username"
                />
                <span className="flex items-center rounded-r-md bg-gray-600 px-3 text-gray-400">@gachon.ac.kr</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                비밀번호
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="비밀번호"
                  required
                  className="w-full border-0 bg-gray-700 pr-10 text-white focus:ring-2 focus:ring-blue-500"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" className="border-gray-500 text-blue-500" />
              <Label htmlFor="rememberMe" className="text-sm text-gray-300">
                로그인 상태 유지
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              disabled={username === '' || password === ''}
            >
              로그인
            </Button>
            <div className="space-y-2 text-center text-sm">
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
