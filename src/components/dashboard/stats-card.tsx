import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  className?: string;
  trend?: "neutral" | "positive" | "negative";
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  className,
  trend = "neutral",
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4 text-muted-foreground")} />
      </CardHeader>
      <CardContent>
        {/* Logic màu sắc: Negative = Red (Destructive), Positive = Green, Neutral = Primary */}
        <div
          className={cn("text-2xl font-bold tracking-tight", {
            "text-destructive": trend === "negative",
            "text-primary": trend === "neutral",
            "text-green-600 dark:text-green-500": trend === "positive",
          })}
        >
          {value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
