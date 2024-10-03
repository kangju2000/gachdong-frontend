"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { RECRUIT_LIST, CLUBS } from "@/constants/data";

const ANNOUNCEMENTS = [
  {
    id: 1,
    title: "2024학년도 1학기 동아리 등록 안내",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "동아리 공간 사용 규정 변경 안내",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "2024 동아리 박람회 개최 안내",
    image: "/placeholder.svg?height=200&width=400",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerItems = [...RECRUIT_LIST, ...ANNOUNCEMENTS];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [showRecruitingOnly, setShowRecruitingOnly] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + bannerItems.length) % bannerItems.length
    );
  };

  const filteredClubs = CLUBS.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || club.category === selectedCategory;
    const matchesRecruiting = !showRecruitingOnly || club.recruiting;
    return matchesSearch && matchesCategory && matchesRecruiting;
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      <main className="max-w-[980px] mx-auto px-4 py-8">
        <section className="mb-8">
          <Card className="w-full overflow-hidden">
            <div className="relative h-[200px]">
              {bannerItems.map((item, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white p-8">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                      <Link
                        href={
                          item.id
                            ? `/announcements/${item.id}`
                            : `/recruits/${item.id}`
                        }
                      >
                        <Button
                          variant="outline"
                          className="bg-white text-black border-white hover:bg-gray-200 hover:text-black"
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
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </Card>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          <section className="flex-grow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">동아리 목록</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="동아리 검색"
                    className="pl-8 w-[200px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      필터
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => setShowRecruitingOnly(!showRecruitingOnly)}
                    >
                      {showRecruitingOnly
                        ? "모든 동아리 보기"
                        : "모집 중인 동아리만"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Tabs
              defaultValue="전체"
              className="w-full mb-4"
              onValueChange={setSelectedCategory}
            >
              <TabsList>
                {[
                  "전체",
                  "IT · 프로그래밍",
                  "학술 · 사회",
                  "문화 · 예술",
                  "체육 · 건강",
                ].map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="px-3 py-1.5 text-sm whitespace-nowrap"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredClubs.map((club) => (
                <Link href={`/clubs/${club.id}`} key={club.id}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow h-24">
                    <CardContent className="p-3 h-full">
                      <div className="flex items-center space-x-3 h-full">
                        <div className="w-16 h-16 bg-muted rounded-full flex-shrink-0 overflow-hidden">
                          <Image
                            src={club.image}
                            alt={`${club.name} logo`}
                            width={64}
                            height={64}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-grow flex flex-col justify-between h-full py-1 overflow-hidden">
                          <div>
                            <h3 className="font-semibold text-lg leading-tight truncate">
                              {club.name}
                            </h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {club.category}
                            </p>
                          </div>
                          <div className="flex items-center mt-1">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                club.recruiting ? "bg-green-500" : "bg-red-500"
                              } mr-2`}
                            ></span>
                            <span
                              className={`text-sm ${
                                club.recruiting
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {club.recruiting ? "모집중" : "모집 마감"}
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
            <h2 className="text-2xl font-semibold mb-4">최근 올라온 공고</h2>
            <div className="space-y-3 flex flex-col">
              {RECRUIT_LIST.slice(0, 3).map((announcement) => (
                <Link
                  href={`/recruits/${announcement.id}`}
                  key={announcement.id}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex-shrink-0 overflow-hidden">
                          <Image
                            src={announcement.image}
                            alt={`${announcement.club} logo`}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h3 className="font-semibold text-sm truncate">
                            {announcement.title}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {announcement.club}
                          </p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1 space-x-2">
                            <span className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {announcement.endDate}
                            </span>
                            <span className="flex items-center">
                              <Eye className="h-3 w-3 mr-1" />
                              {announcement.views}
                            </span>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-1.5 py-0.5 rounded-full">
                            D-{announcement.daysLeft}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-4">
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
