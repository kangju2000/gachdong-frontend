'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSuspenseQuery } from '@tanstack/react-query';
import { clubQueries } from '@/apis/club';
import { format } from '@/lib/date';
import { useApplicationStore } from '@/stores/application-store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

export default function ApplyPage({ params }: { params: { clubId: string; recruitId: string } }) {
  const router = useRouter();
  const { clubId, recruitId } = params;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    motivation: '',
    techStack: [] as string[],
    preferredEnvironment: 'windows',
  });

  const { saveDraft, submitApplication, getDraft, removeDraft } = useApplicationStore();
  const draftKey = `${clubId}-${recruitId}`;

  // Load draft if exists
  useEffect(() => {
    const draft = getDraft(draftKey);

    if (draft) {
      const confirmed = confirm('임시저장된 지원서가 있습니다. 이어서 지원하시겠습니까?');
      if (confirmed) {
        setFormData({
          name: draft.name,
          phone: draft.phone,
          email: draft.email,
          motivation: draft.motivation,
          techStack: draft.techStack,
          preferredEnvironment: draft.preferredEnvironment,
        });
      } else {
        removeDraft(draftKey);
      }
    }
  }, [draftKey, getDraft]);

  const handleSaveDraft = () => {
    console.log(formData);
    saveDraft(draftKey, {
      clubId: Number(clubId),
      recruitId: Number(recruitId),
      ...formData,
      status: 'DRAFT',
      createdAt: new Date().toISOString(),
    });

    toast({
      title: '임시저장 완료',
      description: '지원서가 임시저장되었습니다.',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication({
      clubId: Number(clubId),
      recruitId: Number(recruitId),
      ...formData,
      status: 'SUBMITTED',
      createdAt: new Date().toISOString(),
    });

    toast({
      title: '지원 완료',
      description: '지원서가 제출되었습니다.',
    });
    router.push('/mypage');
  };

  const { data: recruitment } = useSuspenseQuery(clubQueries.recruitmentsDetail(Number(clubId), Number(recruitId)));

  // Add handleInputChange function
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Add handleCheckboxChange function
  const handleCheckboxChange = (techName: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      techStack: checked ? [...prev.techStack, techName] : prev.techStack.filter(tech => tech !== techName),
    }));
  };

  // Add handleRadioChange function
  const handleEnvironmentChange = (value: string) => {
    setFormData(prev => ({ ...prev, preferredEnvironment: value }));
  };

  return (
    <main className="mx-auto max-w-[980px] px-4 py-6">
      <Link
        href={`/clubs/${clubId}/recruits/${recruitId}`}
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center text-sm"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        공고로 돌아가기
      </Link>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="border-b p-6">
          <h1 className="text-2xl font-bold">{recruitment.title}</h1>
          <p className="text-muted-foreground">
            {format(recruitment.startDate, 'yyyy.MM.dd')} - {format(recruitment.endDate, 'yyyy.MM.dd')}
          </p>
        </div>

        <form className="space-y-6 p-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">지원 정보</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  이름 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="지원자 이름을 입력해주세요."
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  전화번호 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="연락 가능한 전화번호를 입력해주세요."
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  이메일 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="이메일 주소를 입력해주세요."
                  required
                />
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
                파일은 가급적 pdf 형식으로 올려주세요. 노션 등 웹 형태의 지원서는 지원서에 웹 링크를 함께 첨부해 주시면
                좋아요.
              </p>
            </div>
            <div>
              <Label htmlFor="portfolio" className="text-sm font-medium text-gray-700">
                포트폴리오
              </Label>
              <Input id="portfolio" name="portfolio" type="file" accept=".pdf,.zip" />
              <p className="text-muted-foreground mt-1 text-sm">
                파일은 가급적 pdf 형식으로 올려주세요. 노션 등 웹 형태의 지원서는 지원서에 웹 링크를 함께 첨부해 주시면
                좋아요.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">지원 동기</h2>
            <Textarea
              id="motivation"
              name="motivation"
              value={formData.motivation}
              onChange={handleInputChange}
              rows={6}
              placeholder="GDSC에 지원하게 된 동기와 활동 계획을 자유롭게 작성해주세요. (500자 이내)"
              required
            />
            <div className="text-muted-foreground text-right text-sm">{formData.motivation.length}/500</div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">기술 스택</h2>
            {['javascript', 'python', 'java'].map(tech => (
              <div key={tech} className="space-y-2">
                <Checkbox
                  id={tech}
                  checked={formData.techStack.includes(tech)}
                  onCheckedChange={checked => handleCheckboxChange(tech, checked as boolean)}
                />
                <Label htmlFor={tech} className="ml-2">
                  {tech.charAt(0).toUpperCase() + tech.slice(1)}
                </Label>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">선호하는 개발 환경</h2>
            <RadioGroup value={formData.preferredEnvironment} onValueChange={handleEnvironmentChange}>
              {['windows', 'mac', 'linux'].map(os => (
                <div key={os} className="flex items-center space-x-2">
                  <RadioGroupItem value={os} id={os} />
                  <Label htmlFor={os}>{os.charAt(0).toUpperCase() + os.slice(1)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* <div className="space-y-4">
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
          </div> */}

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={handleSaveDraft}>
              임시저장
            </Button>
            <Button type="submit">지원하기</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
