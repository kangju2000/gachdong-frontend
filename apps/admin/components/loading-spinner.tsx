export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
      <div className="relative flex h-full w-full items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    </div>
  );
}
