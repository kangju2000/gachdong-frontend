'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const initialClubData = {
  clubName: 'GDG On Campus Gachon University',
  category: 'IT · 프로그래밍',
  shortDescription: 'GDG On Campus Gachon University는 구글 개발자 기술에 관심이 있는 대학생 커뮤니티 그룹입니다.',
  clubImageUrl:
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
  recruitingStatus: true,
  description: 'GDG On Campus Gachon University는 구글 개발자 기술에 관심이 있는 대학생 커뮤니티 그룹입니다.',
  establishedAt: '2024-10-09T15:16:40.244Z',
  updatedAt: '2024-10-09T15:16:40.244Z',
};

export default function ClubInfoEdit() {
  const [clubData, setClubData] = useState(initialClubData);
  const [imagePreview, setImagePreview] = useState(initialClubData.clubImageUrl);
  const [imageError, setImageError] = useState(false);

  const handleInputChange = e => {
    const { id, value } = e.target;
    setClubData(prev => ({ ...prev, [id]: value }));
  };

  const handleSwitchChange = checked => {
    setClubData(prev => ({ ...prev, recruitingStatus: checked }));
  };

  const formatDate = dateString => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  useEffect(() => {
    setImagePreview(clubData.clubImageUrl);
    setImageError(false);
  }, [clubData.clubImageUrl]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="border-gray-700 bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-100">동아리 설정</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="clubName" className="text-gray-200">
            동아리 이름
          </Label>
          <Input
            id="clubName"
            value={clubData.clubName}
            onChange={handleInputChange}
            className="border-gray-600 bg-gray-700 text-gray-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-gray-200">
            카테고리
          </Label>
          <Select
            value={clubData.category}
            onValueChange={value => setClubData(prev => ({ ...prev, category: value }))}
          >
            <SelectTrigger id="category" className="border-gray-600 bg-gray-700 text-gray-100">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent className="border-gray-600 bg-gray-700 text-gray-100">
              <SelectItem value="IT · 프로그래밍">IT · 프로그래밍</SelectItem>
              <SelectItem value="학술 · 사회">학술 · 사회</SelectItem>
              <SelectItem value="문화 · 예술">문화 · 예술</SelectItem>
              <SelectItem value="체육 · 건강">체육 · 건강</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortDescription" className="text-gray-200">
            짧은 소개
          </Label>
          <Input
            id="shortDescription"
            value={clubData.shortDescription}
            onChange={handleInputChange}
            className="border-gray-600 bg-gray-700 text-gray-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-200">
            상세 소개
          </Label>
          <Textarea
            id="description"
            value={clubData.description}
            onChange={handleInputChange}
            className="min-h-[100px] border-gray-600 bg-gray-700 text-gray-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clubImageUrl" className="text-gray-200">
            동아리 이미지 URL
          </Label>
          <Input
            id="clubImageUrl"
            type="url"
            value={clubData.clubImageUrl}
            onChange={handleInputChange}
            className="border-gray-600 bg-gray-700 text-gray-100"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-200">이미지 미리보기</Label>
          <div className="relative h-32 w-32 overflow-hidden rounded-full border border-gray-600 bg-gray-700">
            {imageError ? (
              <div className="flex h-full items-center justify-center bg-gray-700 text-gray-400">
                <ImageIcon className="h-12 w-12" />
                <span className="ml-2">이미지를 불러올 수 없습니다</span>
              </div>
            ) : (
              <Image
                src={imagePreview}
                alt="동아리 이미지 미리보기"
                layout="fill"
                objectFit="cover"
                onError={handleImageError}
              />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="establishedAt" className="text-gray-200">
            설립일
          </Label>
          <div className="relative">
            <Input
              id="establishedAt"
              type="date"
              value={formatDate(clubData.establishedAt)}
              onChange={handleInputChange}
              className="border-gray-600 bg-gray-700 pl-10 text-gray-100"
            />
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" className="border-gray-600 bg-gray-700 text-gray-100 hover:bg-gray-600">
            취소
          </Button>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">저장</Button>
        </div>
      </CardContent>
    </Card>
  );
}
