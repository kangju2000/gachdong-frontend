'use client';

import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ApplyPage() {
  return (
    <div className="bg-background min-h-screen font-sans">
      <Header />

      <main className="mx-auto max-w-[980px] px-4 py-6">
        <Link
          href="/recruits/1"
          className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          공고로 돌아가기
        </Link>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="border-b p-6">
            <h1 className="text-2xl font-bold">채용 정보</h1>
            <p className="text-muted-foreground mt-1">GDSC Gachon 24-25 Member 모집</p>
            <p className="text-muted-foreground">xx.xx.xx - xx.xx.xx</p>
          </div>

          <form className="space-y-6 p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">지원 정보</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    이름 <span className="text-red-500">*</span>
                  </Label>
                  <Input id="name" name="name" placeholder="지원자 이름을 입력해주세요." required />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    전화번호 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="연락 가능한 전화번호를 입력해주세요."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    이메일 <span className="text-red-500">*</span>
                  </Label>
                  <Input id="email" name="email" type="email" placeholder="이메일 주소를 입력해주세요." required />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">이력서 및 경력기술서</h2>
              <div>
                <Label htmlFor="resume" className="text-sm font-medium text-gray-700">
                  이력서 <span className="text-red-500">*</span>
                </Label>
                <Input id="resume" name="resume" type="file" accept=".pdf" required />
                <p className="text-muted-foreground mt-1 text-sm">
                  파일은 가급적 pdf 형식으로 올려주세요. 노션 등 웹 형태의 지원서는 지원서에 웹 링크를 함께 첨부해
                  주시면 좋아요.
                </p>
              </div>
              <div>
                <Label htmlFor="portfolio" className="text-sm font-medium text-gray-700">
                  포트폴리오
                </Label>
                <Input id="portfolio" name="portfolio" type="file" accept=".pdf,.zip" />
                <p className="text-muted-foreground mt-1 text-sm">
                  파일은 가급적 pdf 형식으로 올려주세요. 노션 등 웹 형태의 지원서는 지원서에 웹 링크를 함께 첨부해
                  주시면 좋아요.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">지원 동기</h2>
              <Textarea
                id="motivation"
                name="motivation"
                rows={6}
                placeholder="GDSC에 지원하게 된 동기와 활동 계획을 자유롭게 작성해주세요. (500자 이내)"
                required
              />
              <div className="text-muted-foreground text-right text-sm">0/500</div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">기술 스택</h2>
              <div className="space-y-2">
                <Checkbox id="javascript" />
                <Label htmlFor="javascript" className="ml-2">
                  JavaScript
                </Label>
              </div>
              <div className="space-y-2">
                <Checkbox id="python" />
                <Label htmlFor="python" className="ml-2">
                  Python
                </Label>
              </div>
              <div className="space-y-2">
                <Checkbox id="java" />
                <Label htmlFor="java" className="ml-2">
                  Java
                </Label>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">선호하는 개발 환경</h2>
              <RadioGroup defaultValue="windows">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="windows" id="windows" />
                  <Label htmlFor="windows">Windows</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mac" id="mac" />
                  <Label htmlFor="mac">Mac</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="linux" id="linux" />
                  <Label htmlFor="linux">Linux</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">개인정보 수집 및 이용 동의</h2>
              <div className="bg-muted rounded-md p-4 text-sm">
                <p>1. 수집하는 개인정보 항목: 이름, 전화번호, 이메일</p>
                <p>2. 개인정보의 수집 및 이용목적: 동아리 지원 및 선발 과정</p>
                <p>3. 개인정보의 보유 및 이용기간: 선발 과정 종료 시까지</p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="agreement" name="agreement" required />
                <Label
                  htmlFor="agreement"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  개인정보 수집 및 이용에 동의합니다.
                </Label>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                임시저장
              </Button>
              <Button type="submit">지원하기</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
