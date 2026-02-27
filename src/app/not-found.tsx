import { Home, Search, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          {/* Icon illustration */}
          <div className="relative mb-6">
            <Search className="h-16 w-16 mx-auto text-muted-foreground" />
            <X className="h-8 w-8 absolute -top-1 -right-1 text-destructive" />
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>

          {/* Subheading */}
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Không tìm thấy trang
          </h2>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            Trang bạn đang tìm không tồn tại. Có thể trang đã được di chuyển,
            xóa, hoặc bạn đã nhập sai đường dẫn.
          </p>

          <Link href="/">
            <Button className="w-full" size="lg">
              <Home className="h-4 w-4 mr-2" />
              Về trang chủ
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
