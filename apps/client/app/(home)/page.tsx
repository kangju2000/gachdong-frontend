'use client';

import { motion } from 'framer-motion';
import { clubQueries } from '@/apis/club';
import { PrefetchHydration } from '@/components/PrefetchHydration';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { StatCard } from './_components/stat-card';
import { FeaturedClubs } from './_components/featured-clubs';
import { ActiveRecruitments } from './_components/active-recruitments';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-32 sm:py-40">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 blur-[100px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
            className="absolute left-20 top-40 -z-10 h-[310px] w-[310px] rounded-full bg-blue-400 blur-[100px]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', delay: 1 }}
            className="absolute right-20 top-60 -z-10 h-[310px] w-[310px] rounded-full bg-purple-400 blur-[100px]"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white ring-1 ring-inset ring-white/20"
            >
              새로운 동아리 모집 중 🎉
            </motion.div>

            {/* Animated heading */}
            <motion.h1
              className="mt-8 max-w-4xl bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-center text-5xl font-bold tracking-tight text-transparent sm:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.span
                className="relative block whitespace-nowrap text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                당신의 대학생활을
              </motion.span>
              <motion.span
                className="relative mt-2 block whitespace-nowrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-3/4 h-[0.58em] w-full fill-purple-500/40"
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                </motion.svg>
                <span className="relative text-white">더 풍요롭게</span>
              </motion.span>
            </motion.h1>
            <p className="relative mx-auto mt-8 max-w-2xl text-lg font-medium text-gray-700">
              <span className="absolute -inset-2 -z-10 block rounded-lg bg-white/50 backdrop-blur-sm"></span>
              <span className="relative block py-4">관심있는 동아리를 찾고, 새로운 친구들과 함께 성장하세요</span>
            </p>
            <div className="relative mt-10">
              <span className="absolute -inset-4 -z-10 block rounded-lg bg-white/50 backdrop-blur-sm"></span>
              <div className="relative flex justify-center gap-4 py-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 text-lg transition-all duration-200 hover:from-purple-700 hover:to-blue-700"
                >
                  <Link href="/clubs">동아리 둘러보기</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-white/80 px-8 text-lg backdrop-blur-sm transition-all duration-200 hover:bg-white"
                >
                  <Link href="/recruits">모집 공고 보기</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured & Active Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <FeaturedClubs />
            <ActiveRecruitments />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">다양한 동아리들과 함께하세요</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <StatCard number="100+" label="활성 동아리" />
            <StatCard number="50+" label="진행중인 모집" />
          </div>
        </div>
      </section>
    </main>
  );
}
