import { ClubSummaryResponse } from '@/apis/__generated__/club/swagger';
import { ClubCard } from './club-card';

interface ClubGridProps {
  clubs: ClubSummaryResponse[];
}

export function ClubGrid({ clubs }: ClubGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {clubs.map(club => (
        <ClubCard key={club.clubId} club={club} />
      ))}
    </div>
  );
}
