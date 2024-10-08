'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Search, Filter, ChevronLeft, ChevronRight, Calendar, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { RECRUIT_LIST, CLUBS } from '@/constants/data';

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: '2024학년도 1학기 동아리 등록 안내',
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 2,
    title: '동아리 공간 사용 규정 변경 안내',
    image: '/placeholder.svg?height=200&width=400',
  },
  {
    id: 3,
    title: '2024 동아리 박람회 개최 안내',
    image: '/placeholder.svg?height=200&width=400',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerItems = [...RECRUIT_LIST, ...ANNOUNCEMENTS];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showRecruitingOnly, setShowRecruitingOnly] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % bannerItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerItems.length]);

  const nextSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide + 1) % bannerItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prevSlide => (prevSlide - 1 + bannerItems.length) % bannerItems.length);
  };

  const filteredClubs = CLUBS.filter(club => {
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '전체' || club.category === selectedCategory;
    const matchesRecruiting = !showRecruitingOnly || club.recruiting;
    return matchesSearch && matchesCategory && matchesRecruiting;
  });

  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <Header />
      <main className="mx-auto max-w-[980px] px-4 py-8">
        <section className="mb-8">
          <Card className="w-full overflow-hidden">
            <div className="relative h-[200px]">
              {bannerItems.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Image src={item.image} alt={item.title} layout="fill" objectFit="cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-8 text-white">
                    <div className="text-center">
                      <h2 className="mb-2 text-2xl font-bold">{item.title}</h2>
                      <Link href={item.id ? `/announcements/${item.id}` : `/recruits/${item.id}`}>
                        <Button
                          variant="outline"
                          className="border-white bg-white text-black hover:bg-gray-200 hover:text-black"
                        >
                          자세히 보기
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-50 p-2 text-white"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </Card>
        </section>

        <div className="flex flex-col gap-8 lg:flex-row">
          <section className="flex-grow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">동아리 목록</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="text-muted-foreground absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    type="search"
                    placeholder="동아리 검색"
                    className="w-[200px] pl-8"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      필터
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setShowRecruitingOnly(!showRecruitingOnly)}>
                      {showRecruitingOnly ? '모든 동아리 보기' : '모집 중인 동아리만'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Tabs defaultValue="전체" className="mb-4 w-full" onValueChange={setSelectedCategory}>
              <TabsList>
                {['전체', 'IT · 프로그래밍', '학술 · 사회', '문화 · 예술', '체육 · 건강'].map(tab => (
                  <TabsTrigger key={tab} value={tab} className="whitespace-nowrap px-3 py-1.5 text-sm">
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {filteredClubs.map(club => (
                <Link href={`/clubs/${club.id}`} key={club.id}>
                  <Card className="h-24 overflow-hidden transition-shadow hover:shadow-md">
                    <CardContent className="h-full p-3">
                      <div className="flex h-full items-center space-x-3">
                        <div className="bg-muted h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={club.image}
                            alt={`${club.name} logo`}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="flex h-full flex-grow flex-col justify-between overflow-hidden py-1">
                          <div>
                            <h3 className="truncate text-lg font-semibold leading-tight">{club.name}</h3>
                            <p className="text-muted-foreground truncate text-sm">{club.category}</p>
                          </div>
                          <div className="mt-1 flex items-center">
                            <span
                              className={`h-2 w-2 rounded-full ${club.recruiting ? 'bg-green-500' : 'bg-red-500'} mr-2`}
                            ></span>
                            <span className={`text-sm ${club.recruiting ? 'text-green-600' : 'text-red-600'}`}>
                              {club.recruiting ? '모집중' : '모집 마감'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="lg:w-1/3">
            <h2 className="mb-4 text-2xl font-semibold">최근 올라온 공고</h2>
            <div className="flex flex-col space-y-3">
              {RECRUIT_LIST.slice(0, 3).map(announcement => (
                <Link href={`/recruits/${announcement.id}`} key={announcement.id}>
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-muted h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={announcement.image}
                            alt={`${announcement.club} logo`}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-grow">
                          <h3 className="truncate text-sm font-semibold">{announcement.title}</h3>
                          <p className="text-muted-foreground truncate text-xs">{announcement.club}</p>
                          <div className="text-muted-foreground mt-1 flex items-center space-x-2 text-xs">
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              {announcement.endDate}
                            </span>
                            <span className="flex items-center">
                              <Eye className="mr-1 h-3 w-3" />
                              {announcement.views}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <span className="bg-primary/10 text-primary inline-block rounded-full px-1.5 py-0.5 text-xs font-semibold">
                            D-{announcement.daysLeft}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/recruits">+ 더보기</Link>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
