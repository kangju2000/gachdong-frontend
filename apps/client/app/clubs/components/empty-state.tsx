import { UsersRound } from 'lucide-react';
import { Category, CATEGORY_MAP } from '@/constants/categories';

interface EmptyStateProps {
  searchTerm: string;
  selectedCategory: Category;
  showRecruitingOnly: boolean;
}

export function EmptyState({ searchTerm, selectedCategory, showRecruitingOnly }: EmptyStateProps) {
  const getMessage = () => {
    if (searchTerm) {
      return {
        title: `"${searchTerm}"에 대한 검색 결과가 없습니다`,
        description: '다른 검색어로 시도해보세요.',
      };
    }
    if (selectedCategory !== 'ALL') {
      return {
        title: `${CATEGORY_MAP[selectedCategory]} 카테고리에 동아리가 없습니다`,
        description: '다른 카테고리를 선택해보세요.',
      };
    }
    if (showRecruitingOnly) {
      return {
        title: '현재 모집 중인 동아리가 없습니다',
        description: '모든 동아리를 보시려면 필터를 해제하세요.',
      };
    }
    return {
      title: '등록된 동아리가 없습니다',
      description: '아직 등록된 동아리가 없습니다.',
    };
  };

  const { title, description } = getMessage();

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-300">
      <div className="flex flex-col items-center text-center">
        <div className="rounded-full bg-gray-100 p-3">
          <UsersRound className="h-6 w-6 text-gray-500" />
        </div>
        <h3 className="mt-4 text-sm font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
