import { ArrowRight } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';

const clubs = [
  {
    id: 1,
    name: 'GDG On Campus Gachon',
    memberCount: 50,
    logoUrl:
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
  },
];

export function ClubList() {
  return (
    <>
      {clubs.map(club => (
        <ClubItem key={club.id} club={club} />
      ))}
    </>
  );
}

function ClubItem({ club }: { club: (typeof clubs)[0] }) {
  return (
    <Link
      key={club.id}
      href={`/dashboard/${club.id}`}
      className="flex items-center justify-between rounded-lg bg-gray-700 p-4"
    >
      <div className="flex items-center space-x-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gray-800">
          <Image src={club.logoUrl} alt={`${club.name} logo`} className="object-cover" fill />
        </div>
        <div>
          <h3 className="font-semibold text-white">{club.name}</h3>
          <p className="text-sm text-gray-400">{club.memberCount}명의 멤버</p>
        </div>
      </div>
      <ArrowRight className="text-gray-400" />
    </Link>
  );
}
