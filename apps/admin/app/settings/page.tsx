'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertCircle, Camera, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function AdminSettings() {
  const [user, setUser] = useState({
    name: '강주혁',
    email: 'kangju2000@gachon.ac.kr',
    birthdate: '2000-11-10',
    avatar: '/placeholder.svg?height=100&width=100',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the settings update logic
    console.log('Settings update attempt', user);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const handleAvatarChange = () => {
    // Here you would typically handle the avatar change logic
    console.log('Avatar change attempted');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    // Here you would typically handle the password change logic
    console.log('Password change attempt', { currentPassword, newPassword });
    setIsSuccess(true);
    setError('');
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100">
      <main className="mx-auto max-w-[980px] px-4 py-6">
        <h1 className="mb-6 text-3xl font-bold">설정</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-gray-700 bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-100">정보 수정</CardTitle>
              <CardDescription className="text-gray-400">프로필 정보를 수정할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative mx-auto mb-4 h-20 w-20">
                  <Avatar className="h-full w-full">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition-opacity hover:opacity-100">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={handleAvatarChange}
                      className="text-white"
                    >
                      <Camera className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">
                    이름
                  </Label>
                  <Input
                    id="name"
                    value={user.name}
                    onChange={e => setUser({ ...user, name: e.target.value })}
                    required
                    className="border-gray-600 bg-gray-700 text-gray-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="birthdate" className="text-gray-200">
                    생년월일
                  </Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={user.birthdate}
                    onChange={e => setUser({ ...user, birthdate: e.target.value })}
                    required
                    className="border-gray-600 bg-gray-700 text-gray-100"
                  />
                </div>
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                  변경사항 저장
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-gray-700 bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-100">계정 설정</CardTitle>
              <CardDescription className="text-gray-400">계정 관련 설정을 변경할 수 있습니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  로그인 계정
                </Label>
                <Input id="email" value={user.email} disabled className="border-gray-600 bg-gray-700 text-gray-400" />
              </div>
              {!isChangingPassword ? (
                <Button
                  variant="outline"
                  className="w-full border-gray-600 bg-gray-700 text-gray-100 hover:bg-gray-600"
                  onClick={() => setIsChangingPassword(true)}
                >
                  비밀번호 변경
                </Button>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-gray-200">
                      새 비밀번호
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        className="border-gray-600 bg-gray-700 text-gray-100"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full text-gray-400"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-200">
                      새 비밀번호 확인
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        className="border-gray-600 bg-gray-700 text-gray-100"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full text-gray-400"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                    비밀번호 변경
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full text-gray-300 hover:text-gray-100"
                    onClick={() => setIsChangingPassword(false)}
                  >
                    취소
                  </Button>
                </form>
              )}
              <Button variant="destructive" className="w-full">
                계정 삭제하기
              </Button>
            </CardContent>
          </Card>
        </div>

        {isSuccess && (
          <Alert className="mt-6 border-green-700 bg-green-800 text-green-100">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>설정이 성공적으로 저장되었습니다.</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert className="mt-6 border-red-700 bg-red-800 text-red-100" variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
}
