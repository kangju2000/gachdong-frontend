"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [selectedClub, setSelectedClub] = useState("GDG On Campus Gachon");

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar selectedClub={selectedClub} onClubChange={setSelectedClub} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header clubName={selectedClub} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
