'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRegister, useSendVerificationCode, useVerifyCode } from '@/apis/auth';

export default function AdminSignup() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [agreeTerms, setAgreeTerms] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const { mutateAsync: sendVerificationCode } = useSendVerificationCode();
  const { mutateAsync: verifyCode } = useVerifyCode();
  const { mutateAsync: completeRegistration } = useRegister();

  const handleSendVerification = () => {
    sendVerificationCode({ email: `${username}@gachon.ac.kr` }).then(() => {
      setIsVerificationSent(true);
    });
  };

  const handleVerify = () => {
    verifyCode({ email: `${username}@gachon.ac.kr`, code: verificationCode }).then(() => {
      setIsVerified(true);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    completeRegistration({ name, email: `${username}@gachon.ac.kr`, password, role: 'ADMIN' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-100">
      <Card className="w-full max-w-md border-gray-700 bg-gray-800">
        <CardHeader className="space-y-1">
          <div className="mb-4 flex justify-center">
            <Shield className="h-12 w-12 text-blue-400" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-white">운영진 회원가입</CardTitle>
          <CardDescription className="text-center text-gray-400">GACHDONG 운영진 계정을 생성하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">
                이름
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200">
                아이디
              </Label>
              <div className="flex">
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  className="rounded-r-none border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                  autoComplete="username"
                />
                <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-600 bg-gray-600 px-3 text-sm text-gray-400">
                  @gachon.ac.kr
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="verification" className="text-gray-200">
                이메일 인증
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="verification"
                  type="text"
                  placeholder="인증 코드"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  disabled={!isVerificationSent || isVerified}
                  className="border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                  autoComplete="verification"
                />
                {!isVerified ? (
                  <Button
                    type="button"
                    onClick={isVerificationSent ? handleVerify : handleSendVerification}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    disabled={username === ''}
                  >
                    {isVerificationSent ? '인증하기' : '인증 코드 전송'}
                  </Button>
                ) : (
                  <Button type="button" disabled className="bg-gray-600 text-gray-400">
                    인증 완료
                  </Button>
                )}
              </div>
            </div>
            {isVerified && (
              <Alert className="border-green-700 bg-green-800 text-green-100">
                <AlertDescription>이메일 인증이 완료되었습니다.</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                비밀번호
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="border-gray-600 bg-gray-700 text-white"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-200">
                비밀번호 확인
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="border-gray-600 bg-gray-700 text-white"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              disabled={!isVerified || name === '' || username === '' || password === '' || confirmPassword === ''}
            >
              회원가입
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-sm text-gray-400">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-blue-400 hover:underline">
              로그인
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
