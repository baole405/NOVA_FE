import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartPlaceholderProps {
  title: string;
  description: string;
}

export function ChartPlaceholder({ title, description }: ChartPlaceholderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-muted-foreground/20 rounded-lg bg-muted/10">
          <BarChart3 className="h-10 w-10 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Biểu đồ sẽ được tích hợp sau
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
