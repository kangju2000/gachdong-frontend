import { FileSearch } from 'lucide-react';
import { Category, CATEGORY_MAP } from '@/constants/categories';

interface EmptyStateProps {
  searchTerm: string;
  selectedCategory: Category;
}

export function EmptyState({ searchTerm, selectedCategory }: EmptyStateProps) {
  const getMessage = () => {
    if (searchTerm) {
      return {
        title: `"${searchTerm}"에 대한 검색 결과가 없습니다`,
        description: '다른 검색어로 시도해보세요.',
      };
    }
    if (selectedCategory !== 'ALL') {
      return {
        title: `${CATEGORY_MAP[selectedCategory]} 카테고리의 모집 공고가 없습니다`,
        description: '다른 카테고리를 선택하거나 나중에 다시 확인해주세요.',
      };
    }
    return {
      title: '현재 진행 중인 모집 공고가 없습니다',
      description: '다른 카테고리를 선택하거나 나중에 다시 확인해주세요.',
    };
  };

  const { title, description } = getMessage();

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <FileSearch className="text-muted-foreground mb-4 h-16 w-16" />
      <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
      <p className="text-muted-foreground text-center">{description}</p>
    </div>
  );
}
