"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Newspaper, Search, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import { ANNOUNCEMENTS } from "@/constants/data";

export default function Announcements() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAnnouncements = ANNOUNCEMENTS.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background font-sans">
      <Header />

      <main className="max-w-[980px] mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">공지사항</h1>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="공지사항 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="space-y-4 flex flex-col">
          {filteredAnnouncements.map((announcement) => (
            <Link
              key={announcement.id}
              href={`/announcements/${announcement.id}`}
            >
              <Card className="hover:bg-accent transition-colors">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {announcement.title}
                    </CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {announcement.createdAt.split("T")[0]}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {announcement.views}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12">
            <Newspaper className="mx-auto h-12 w-12 text-muted-foreground" />
            <h2 className="mt-4 text-lg font-semibold">공지사항이 없습니다</h2>
            <p className="mt-2 text-muted-foreground">
              검색어와 일치하는 공지사항이 없습니다.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
