"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, Filter, Calendar, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RECRUIT_LIST } from "@/constants/data";

export default function recruitmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredRecruitList = RECRUIT_LIST.filter(
    (announcement) =>
      (selectedCategory === "전체" ||
        announcement.category === selectedCategory) &&
      (announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.club.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="max-w-[980px] mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold mb-6">동아리 공고</h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
          <Tabs
            defaultValue="전체"
            className="w-full sm:w-auto"
            onValueChange={setSelectedCategory}
          >
            <TabsList>
              {[
                "전체",
                "IT · 프로그래밍",
                "학술 · 사회",
                "문화 · 예술",
                "체육 · 건강",
              ].map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-3 py-1.5 text-sm whitespace-nowrap"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="flex space-x-2 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="공고 검색"
                className="pl-10 pr-4 py-2 w-full sm:w-[200px]"
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
                <DropdownMenuItem>최신순</DropdownMenuItem>
                <DropdownMenuItem>마감 임박순</DropdownMenuItem>
                <DropdownMenuItem>조회수 순</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-4 flex flex-col">
          {filteredRecruitList.map((announcement) => (
            <Link href={`/recruits/${announcement.id}`} key={announcement.id}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 bg-muted rounded-full flex-shrink-0 overflow-hidden">
                      <Image
                        src={announcement.image}
                        alt={`${announcement.club} logo`}
                        className="object-cover"
                        fill
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">
                        {announcement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {announcement.club}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground mt-1 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {announcement.startDate} - {announcement.endDate}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {announcement.views}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        D-{announcement.daysLeft}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1">
                        {announcement.category}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredRecruitList.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            검색 결과가 없습니다.
          </div>
        )}
      </main>
    </div>
  );
}
