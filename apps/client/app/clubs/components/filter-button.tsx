import { Button } from '@/components/ui/button';
import { ChevronDown, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface FilterButtonProps {
  showRecruiting: boolean;
  onToggle: () => void;
}

export function FilterButton({ showRecruiting, onToggle }: FilterButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-10">
          <Filter className="mr-2 h-4 w-4" />
          {showRecruiting ? '모집 중인 동아리' : '전체 동아리'}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onToggle}>
          {showRecruiting ? '전체 동아리 보기' : '모집 중인 동아리만'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
