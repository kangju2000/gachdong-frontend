import { Button } from '@/components/ui/button';

interface ActionButtonsProps {
  onSaveDraft: () => Promise<void>;
  onPublish: () => Promise<void>;
}

export function ActionButtons({ onSaveDraft, onPublish }: ActionButtonsProps) {
  return (
    <div className="flex justify-end space-x-4">
      <Button
        onClick={onSaveDraft}
        variant="outline"
        className="border-gray-600 bg-gray-700 text-gray-100 hover:bg-gray-600"
      >
        임시 저장
      </Button>
      <Button onClick={onPublish} className="bg-blue-600 text-white hover:bg-blue-700">
        공고 게시
      </Button>
    </div>
  );
}
