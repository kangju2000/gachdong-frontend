interface StatCardProps {
  number: string;
  label: string;
}

export function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="rounded-xl bg-white p-8 text-center shadow-lg ring-1 ring-gray-100/5">
      <div className="text-primary text-4xl font-bold">{number}</div>
      <div className="mt-2 text-gray-600">{label}</div>
    </div>
  );
}
