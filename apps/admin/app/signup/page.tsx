"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Eye, EyeOff, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function AdminSignup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSendVerification = () => {
    console.log("Sending verification code to:", `${username}@gachon.ac.kr`);
    setIsVerificationSent(true);
  };

  const handleVerify = () => {
    console.log("Verifying code:", verificationCode);
    setIsVerified(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }
    console.log("Signup attempt", {
      name,
      username: `${username}@gachon.ac.kr`,
      password,
      agreeTerms,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-white">
            관리자 회원가입
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            GACHDONG 관리자 계정을 생성하세요
          </CardDescription>
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
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
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
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="rounded-r-none bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-600 bg-gray-600 text-gray-400 text-sm">
                  @gachon.ac.kr
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">
                비밀번호
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
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
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
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
                  onChange={(e) => setVerificationCode(e.target.value)}
                  disabled={!isVerificationSent || isVerified}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                {!isVerified ? (
                  <Button
                    type="button"
                    onClick={
                      isVerificationSent ? handleVerify : handleSendVerification
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {isVerificationSent ? "인증하기" : "인증 코드 전송"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    disabled
                    className="bg-gray-600 text-gray-400"
                  >
                    인증 완료
                  </Button>
                )}
              </div>
            </div>
            {isVerified && (
              <Alert className="bg-green-800 text-green-100 border-green-700">
                <AlertDescription>
                  이메일 인증이 완료되었습니다.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                required
                className="border-gray-600 text-blue-400"
              />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-300"
              >
                <span>이용약관 및 개인정보 처리방침에 동의합니다</span>
                <Link
                  href="/terms"
                  className="text-blue-400 hover:underline ml-1"
                >
                  (보기)
                </Link>
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              disabled={!agreeTerms || !isVerified}
            >
              회원가입
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full text-gray-400">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              로그인
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
