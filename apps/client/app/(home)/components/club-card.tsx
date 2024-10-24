import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Club } from '@/types';

interface ClubCardProps {
  club: Club;
}

export function ClubCard({ club }: ClubCardProps) {
  return (
    <Link href={`/clubs/${club.id}`}>
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
                <span className={`h-2 w-2 rounded-full ${club.recruiting ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
                <span className={`text-sm ${club.recruiting ? 'text-green-600' : 'text-red-600'}`}>
                  {club.recruiting ? '모집중' : '모집 마감'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
