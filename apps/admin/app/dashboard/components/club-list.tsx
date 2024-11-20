import { ArrowRight } from 'lucide-react';

import Link from 'next/link';
import { clubQueries } from '@/apis/club';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AdminAuthorizedClubResponse } from '@gachdong/api/club';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

export function ClubList() {
  const { data: clubs } = useSuspenseQuery(clubQueries.authorizedClubs());

  return (
    <>
      {clubs.map(club => (
        <ClubItem key={club.clubId} club={club} />
      ))}
      {clubs.length === 0 && <div className="text-center text-gray-400">가입된 동아리가 없습니다. </div>}
    </>
  );
}

function ClubItem({ club }: { club: AdminAuthorizedClubResponse }) {
  return (
    <Link
      key={club.clubId}
      href={`/dashboard/${club.clubId}`}
      className="flex items-center justify-between rounded-lg bg-gray-700 p-4"
    >
      <div className="flex items-center space-x-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-800">
          <Avatar className="h-12 w-12">
            <AvatarImage src={club.clubImageUrl} asChild>
              <Image src={club.clubImageUrl ?? ''} alt={`${club.clubName} logo`} sizes="32px" fill priority />
            </AvatarImage>
            <AvatarFallback delayMs={600}>{club.clubName.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h3 className="font-semibold text-white">{club.clubName}</h3>
        </div>
      </div>
      <ArrowRight className="text-gray-400" />
    </Link>
  );
}
