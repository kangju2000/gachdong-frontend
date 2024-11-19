export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
    </div>
  );
}
