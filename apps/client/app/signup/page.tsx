'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useRegister, useSendVerificationCode, useVerifyCode } from '@/apis/auth';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [agreeTerms, setAgreeTerms] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerificationSuccess, setIsVerificationSuccess] = useState(false);
  const { mutate: sendVerificationCode } = useSendVerificationCode();
  const { mutateAsync: registerAsync } = useRegister();
  const { mutateAsync: verifyCode } = useVerifyCode();
  const router = useRouter();

  const handleSendVerification = () => {
    sendVerificationCode({ email: `${email}@gachon.ac.kr` });
    // TODO: 실패 처리?
    setIsVerificationSent(true);
  };

  const handleVerifyCode = () => {
    verifyCode({ code: verificationCode, email: `${email}@gachon.ac.kr` }).then(() => {
      setIsVerificationSuccess(true);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const result = await registerAsync({
      name,
      email: `${email}@gachon.ac.kr`,
      password,
      role: 'USER',
    });
    if (result) {
      // TODO: toast로 변경
      alert('회원가입이 완료되었습니다.');
      router.replace('/login');
    }
  };

  return (
    <main className="mx-auto max-w-[400px] px-4 py-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">회원가입</CardTitle>
          <CardDescription className="text-center">
            GACHDONG 회원이 되어 다양한 동아리 활동을 즐겨보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일</Label>
              <div className="flex">
                <Input
                  id="email"
                  type="text"
                  placeholder="이메일"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="rounded-r-none"
                  disabled={isVerificationSent || isVerificationSuccess}
                />
                <span className="border-input bg-muted text-muted-foreground inline-flex items-center rounded-r-md border border-l-0 px-3 text-sm">
                  @gachon.ac.kr
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="verification">이메일 인증</Label>
              <div className="flex space-x-2">
                <Input
                  id="verification"
                  type="text"
                  placeholder="인증 코드를 입력하세요"
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value)}
                  disabled={!isVerificationSent || isVerificationSuccess}
                />
                {!isVerificationSent && (
                  <Button type="button" onClick={handleSendVerification} disabled={!email}>
                    인증 코드 전송
                  </Button>
                )}
                {isVerificationSent && !isVerificationSuccess && (
                  <Button type="button" onClick={handleVerifyCode}>
                    인증하기
                  </Button>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={checked => setAgreeTerms(checked as boolean)}
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <span>이용약관 및 개인정보 처리방침에 동의합니다</span>
                  <Link href="/terms" className="text-primary ml-1 hover:underline">
                    (보기)
                  </Link>
                </Label>
              </div> */}
            <Button
              type="submit"
              className="w-full"
              disabled={
                verificationCode === '' ||
                password === '' ||
                confirmPassword === '' ||
                !isVerificationSuccess ||
                email === '' ||
                name === ''
              }
            >
              회원가입
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full text-center text-sm">
            이미 계정이 있으신가요?{' '}
            <Link href="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
