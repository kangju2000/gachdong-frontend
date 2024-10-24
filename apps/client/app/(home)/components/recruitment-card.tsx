// components/home/RecruitmentCard.tsx
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Eye } from 'lucide-react';
import { Recruitment } from '@/types';

interface RecruitmentCardProps {
  recruitment: Recruitment;
  onClick: (id: number) => void;
}

export function RecruitmentCard({ recruitment, onClick }: RecruitmentCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md" onClick={() => onClick(recruitment.id)}>
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div className="bg-muted relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
            <Image src={recruitment.image} alt={`${recruitment.club} logo`} className="object-cover" fill />
          </div>
          <div className="min-w-0 flex-grow">
            <h3 className="truncate text-sm font-semibold">{recruitment.title}</h3>
            <p className="text-muted-foreground truncate text-xs">{recruitment.club}</p>
            <div className="text-muted-foreground mt-1 flex items-center space-x-2 text-xs">
              <span className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                {recruitment.endDate}
              </span>
              <span className="flex items-center">
                <Eye className="mr-1 h-3 w-3" />
                {recruitment.views}
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <span className="bg-primary/10 text-primary inline-block rounded-full px-1.5 py-0.5 text-xs font-semibold">
              D-{recruitment.daysLeft}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
