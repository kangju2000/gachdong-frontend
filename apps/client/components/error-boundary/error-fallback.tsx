import { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error }: FallbackProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-red-200 bg-red-50 p-6">
      <div className="text-2xl font-bold text-red-600">오류가 발생했습니다</div>
      <p className="text-center text-gray-600">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        페이지 새로고침
      </button>
    </div>
  );
}
