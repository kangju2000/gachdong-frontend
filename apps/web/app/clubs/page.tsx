"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
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
import { ChevronDown, Search, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CLUBS } from "@/constants/data";

export default function ClubsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [showRecruiting, setShowRecruiting] = useState(false);

  const filteredClubs = CLUBS.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || club.category === selectedCategory;
    const matchesRecruiting = !showRecruiting || club.recruiting;

    return matchesSearch && matchesCategory && matchesRecruiting;
  });

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="max-w-[980px] mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">동아리 목록</h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="동아리 검색"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
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
                  onClick={() => setShowRecruiting(!showRecruiting)}
                >
                  {showRecruiting ? "모든 동아리 보기" : "모집 중인 동아리만"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs
          defaultValue="전체"
          className="w-full mb-6"
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
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex-shrink-0 overflow-hidden">
                      <Image
                        src={club.image}
                        alt={`${club.name} logo`}
                        width={64}
                        height={64}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg">{club.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {club.category}
                      </p>
                      <div className="flex items-center mt-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            club.recruiting ? "bg-green-500" : "bg-red-500"
                          } mr-2`}
                        ></span>
                        <span
                          className={`text-sm ${
                            club.recruiting ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {club.recruiting ? "모집중" : "모집 마감"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm mt-2 line-clamp-2">
                    {club.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
