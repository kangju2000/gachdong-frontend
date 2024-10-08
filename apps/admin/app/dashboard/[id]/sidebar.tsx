"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LayoutDashboard,
  Users,
  BarChart,
  Settings,
  FileText,
  UserCog,
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  selectedClub: string;
  onClubChange: (club: string) => void;
}

export function Sidebar({ selectedClub, onClubChange }: SidebarProps) {
  const menuItems = [
    {
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
      label: "대시보드",
      href: "/dashboard",
    },
    {
      icon: <FileText className="mr-2 h-4 w-4" />,
      label: "모집 공고 관리",
      href: "/recruitment",
    },
    {
      icon: <BarChart className="mr-2 h-4 w-4" />,
      label: "동아리 통계",
      href: "/statistics",
    },
    {
      icon: <Settings className="mr-2 h-4 w-4" />,
      label: "동아리 정보 수정",
      href: "/club-info",
    },
    {
      icon: <FileText className="mr-2 h-4 w-4" />,
      label: "템플릿 관리",
      href: "/templates",
    },
    {
      icon: <UserCog className="mr-2 h-4 w-4" />,
      label: "운영진 관리",
      href: "/admin-management",
    },
    {
      icon: <Users className="mr-2 h-4 w-4" />,
      label: "프로필 설정",
      href: "/profile",
    },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-900 border-r border-gray-800">
      <div className="p-4">
        <Select onValueChange={onClubChange} defaultValue={selectedClub}>
          <SelectTrigger className="w-full bg-gray-800 text-gray-100 border-gray-700">
            <SelectValue placeholder="동아리 선택" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
            <SelectItem value="GDG On Campus Gachon">
              GDG On Campus Gachon
            </SelectItem>
            <SelectItem value="AI 연구회">AI 연구회</SelectItem>
            <SelectItem value="웹 개발 동아리">웹 개발 동아리</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
            asChild
          >
            <Link href={item.href}>
              {item.icon}
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </div>
  );
}
