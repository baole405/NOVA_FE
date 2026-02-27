import { Badge } from "@/components/ui/badge";
import type { ComplaintStatus } from "@/types";

const statusConfig: Record<
  ComplaintStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Chờ xử lý",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  },
  in_progress: {
    label: "Đang xử lý",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  resolved: {
    label: "Đã giải quyết",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
};

interface ComplaintStatusBadgeProps {
  status: ComplaintStatus;
}

export function ComplaintStatusBadge({ status }: ComplaintStatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  );
}
