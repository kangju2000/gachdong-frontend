import { Button } from '@/components/ui/button';
import { SaveIcon, SendIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ActionButtonsProps {
  onPublish: () => Promise<void>;
  isValid: boolean;
  isSubmitting: boolean;
}

export function ActionButtons({ onPublish, isValid, isSubmitting }: ActionButtonsProps) {
  const getValidationMessage = () => {
    if (!isValid) {
      return '모든 필수 항목을 올바르게 입력해주세요';
    }
    if (isSubmitting) {
      return '처리 중입니다...';
    }
    return '';
  };

  return (
    <div className="sticky bottom-0 flex justify-end gap-4 p-4">
      <TooltipProvider>
        {/* <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button onClick={onSaveDraft} variant="outline" disabled={isSubmitting} className="min-w-[100px]">
                <SaveIcon className="mr-2 h-4 w-4" />
                임시 저장
              </Button>
            </div>
          </TooltipTrigger>
          {!isValid && (
            <TooltipContent side="top">
              <p>{getValidationMessage()}</p>
            </TooltipContent>
          )}
        </Tooltip> */}

        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button onClick={onPublish} disabled={!isValid || isSubmitting} className="min-w-[100px]">
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span className="ml-2">처리 중...</span>
                  </div>
                ) : (
                  <>
                    <SendIcon className="mr-2 h-4 w-4" />
                    공고 게시
                  </>
                )}
              </Button>
            </div>
          </TooltipTrigger>
          {!isValid && (
            <TooltipContent side="top">
              <p>{getValidationMessage()}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
