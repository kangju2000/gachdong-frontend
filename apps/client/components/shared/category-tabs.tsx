import { Category, CATEGORY_MAP } from '@/constants/categories';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface CategoryTabsProps {
  selectedCategory: Category;
  onCategoryChange: (value: Category) => void;
}

export function CategoryTabs({ selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <Tabs
      defaultValue={selectedCategory}
      className="w-full"
      onValueChange={value => onCategoryChange(value as Category)}
    >
      <ScrollArea className="w-full whitespace-nowrap">
        <TabsList className="inline-flex w-full justify-start px-1">
          {Object.entries(CATEGORY_MAP).map(([key, value]) => (
            <TabsTrigger
              key={key}
              value={key}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground min-w-fit"
            >
              {value}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Tabs>
  );
}
