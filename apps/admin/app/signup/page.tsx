'use client';

import { Shield } from 'lucide-react';
import { useSignupForm } from './hooks/useSignupForm';
import { PasswordInput } from './components/PasswordInput';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function AdminSignup() {
  const { state, updateField, togglePasswordVisibility, handleSendVerification, handleVerify, handleSubmit } =
    useSignupForm();

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
            {/* 이름 입력 필드 */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-200">
                이름
              </Label>
              <Input
                id="name"
                value={state.form.name}
                onChange={e => updateField('name', e.target.value)}
                required
                className="border-gray-600 bg-gray-700 text-white"
                placeholder="이름"
              />
            </div>

            {/* 아이디 입력 필드 */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200">
                아이디
              </Label>
              <div className="flex">
                <Input
                  id="username"
                  value={state.form.username}
                  onChange={e => updateField('username', e.target.value)}
                  required
                  className="rounded-r-none border-gray-600 bg-gray-700 text-white"
                  placeholder="아이디"
                />
                <span className="inline-flex items-center rounded-r-md border border-l-0 border-gray-600 bg-gray-600 px-3 text-sm text-gray-400">
                  @gachon.ac.kr
                </span>
              </div>
            </div>

            {/* 이메일 인증 섹션 */}
            <div className="space-y-2">
              <Label htmlFor="verification" className="text-gray-200">
                이메일 인증
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="verification"
                  value={state.form.verificationCode}
                  onChange={e => updateField('verificationCode', e.target.value)}
                  disabled={!state.verification.isSent || state.verification.isVerified}
                  className="border-gray-600 bg-gray-700 text-white"
                  placeholder="인증 코드"
                  autoComplete="off"
                />
                {!state.verification.isVerified ? (
                  <Button
                    type="button"
                    onClick={state.verification.isSent ? handleVerify : handleSendVerification}
                    disabled={state.verification.isLoading || !state.form.username}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    {state.verification.isSent ? '인증하기' : '인증 코드 전송'}
                  </Button>
                ) : (
                  <Button type="button" disabled className="bg-gray-600 text-gray-400">
                    인증 완료
                  </Button>
                )}
              </div>
            </div>

            {/* 비밀번호 입력 필드들 */}
            <PasswordInput
              id="password"
              value={state.form.password}
              onChange={value => updateField('password', value)}
              show={state.ui.showPassword}
              onToggle={() => togglePasswordVisibility('showPassword')}
              label="비밀번호"
            />

            <PasswordInput
              id="confirmPassword"
              value={state.form.confirmPassword}
              onChange={value => updateField('confirmPassword', value)}
              show={state.ui.showConfirmPassword}
              onToggle={() => togglePasswordVisibility('showConfirmPassword')}
              label="비밀번호 확인"
            />

            {/* 제출 버튼 */}
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600"
              disabled={
                !state.verification.isVerified ||
                state.verification.isLoading ||
                !state.form.name ||
                !state.form.username ||
                !state.form.password ||
                !state.form.confirmPassword
              }
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
