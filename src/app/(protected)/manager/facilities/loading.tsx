import { Skeleton } from "@/components/ui/skeleton";

export default function FacilitiesLoading() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-80" />
      <Skeleton className="h-96 rounded-xl" />
    </div>
  );
}
