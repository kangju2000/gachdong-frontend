import { ArrowRight } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';
import { clubQueries } from '@/apis/club';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AdminAuthorizedClubResponse } from '@gachdong/api/club';

export function ClubList() {
  const {
    data: { results: clubs = [] },
  } = useSuspenseQuery(clubQueries.authorizedClubs());

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
          {/* FIXME: 이미지가 없을 경우 대체 이미지를 표시해야 함 */}
          <Image src={club.clubImageUrl ?? ''} alt={`${club.clubName} logo`} className="object-cover" fill />
        </div>
        <div>
          <h3 className="font-semibold text-white">{club.clubName}</h3>
        </div>
      </div>
      <ArrowRight className="text-gray-400" />
    </Link>
  );
}
