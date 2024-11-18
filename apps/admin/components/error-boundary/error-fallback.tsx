import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const router = useRouter();

  const handleNavigateBack = () => {
    resetErrorBoundary();
    try {
      router.back();
    } catch (e) {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-[400px] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <div className="mb-4 flex justify-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500" aria-hidden="true" />
        </div>

        <h2 className="mb-2 text-lg font-semibold text-gray-900">문제가 발생했습니다.</h2>

        <p className="mb-6 text-sm text-gray-600">
          {error.message || '일시적인 오류가 발생했습니다. 다시 시도해 주세요.'}
        </p>

        <div className="space-x-3">
          <button
            onClick={handleNavigateBack}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            이전 페이지로 돌아가기
          </button>

          <button
            onClick={resetErrorBoundary}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            다시 시도하기
          </button>
        </div>
      </div>
    </div>
  );
}
