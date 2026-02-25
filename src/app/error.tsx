"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          <div className="mb-6">
            <AlertTriangle className="h-16 w-16 mx-auto text-destructive" />
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">Lỗi</h1>

          <h2 className="text-xl font-semibold text-foreground mb-4">
            Đã xảy ra lỗi
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            Rất tiếc, đã có lỗi xảy ra khi tải trang. Vui lòng thử lại hoặc
            quay về trang chủ.
          </p>

          <div className="flex flex-col gap-3">
            <Button onClick={reset} className="w-full" size="lg">
              <RefreshCw className="h-4 w-4 mr-2" />
              Thử lại
            </Button>
            <Link href="/">
              <Button variant="outline" className="w-full" size="lg">
                <Home className="h-4 w-4 mr-2" />
                Về trang chủ
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
