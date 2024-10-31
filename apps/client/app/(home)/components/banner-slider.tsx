'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RECRUIT_LIST } from '@/constants/data';

export function BannerSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const bannerItems = RECRUIT_LIST;

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

  return (
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
              <Image src={item.image} alt={item.title} className="object-cover" fill sizes="100%" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-8 text-white">
                <div className="text-center">
                  <h2 className="mb-2 text-2xl font-bold">{item.title}</h2>
                  <Link href={`/announcements/${item.id}`}>
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
  );
}
