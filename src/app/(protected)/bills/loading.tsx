import { Skeleton } from "@/components/ui/skeleton";

export default function BillsLoading() {
  return (
    <div className="space-y-6 p-4 md:p-8">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-10 w-full max-w-sm" />
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
