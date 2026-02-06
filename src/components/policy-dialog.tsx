"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PolicyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "terms" | "privacy";
}

export function PolicyDialog({
  open,
  onOpenChange,
  defaultTab = "terms",
}: PolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Thông tin Pháp lý</DialogTitle>
          <DialogDescription>
            Vui lòng xem xét cẩn thận Điều kiện Dịch vụ và Chính sách Bảo mật
            của chúng tôi.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          defaultValue={defaultTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <div className="px-6 py-2 bg-muted/30 border-b">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="terms">Điều khoản Dịch vụ</TabsTrigger>
              <TabsTrigger value="privacy">Chính sách Bảo mật</TabsTrigger>
            </TabsList>
          </div>

          {/* Nội dung Terms */}
          <TabsContent
            value="terms"
            className="flex-1 p-6 overflow-y-auto mt-0 space-y-4 text-sm text-muted-foreground"
          >
            <h3 className="text-lg font-bold text-foreground">1. Giới thiệu</h3>
            <p>
              Chào mừng đến với NOVA. Bằng cách truy cập trang web của chúng
              tôi, bạn đồng ý tuân thủ các điều khoản sau.
            </p>

            <h3 className="text-lg font-bold text-foreground">
              2. Trách nhiệm
            </h3>
            <p>
              Bạn chịu trách nhiệm giữ bảo mật thông tin tài khoản. Thông báo
              ngay cho chúng tôi nếu có truy cập trái phép.
            </p>

            <h3 className="text-lg font-bold text-foreground">3. Thanh toán</h3>
            <p>
              Bạn đồng ý thanh toán tất cả phí dịch vụ trước ngày hết hạn. Không
              thanh toán có thể dẫn đến phí quá hạn.
            </p>

            <h3 className="text-lg font-bold text-foreground">4. Chấm dứt</h3>
            <p>
              Chúng tôi bảo lưu quyền chấm dứt tài khoản nếu bạn vi phạm điều
              khoản.
            </p>
          </TabsContent>

          {/* Nội dung Privacy - ĐÃ SỬA LỖI HTML */}
          <TabsContent
            value="privacy"
            className="flex-1 p-6 overflow-y-auto mt-0 space-y-4 text-sm text-muted-foreground"
          >
            <h3 className="text-lg font-bold text-foreground">
              1. Data Collection
            </h3>
            <p>
              We collect information you provide directly to us, such as your
              name, email address, phone number, and apartment details when you
              register for an account.
            </p>

            <h3 className="text-lg font-bold text-foreground">
              2. How We Use Your Data
            </h3>
            {/* FIX: Đóng thẻ p trước khi mở thẻ ul, hoặc dùng div bao quanh */}
            <div>
              We use your information to:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Process your monthly bill payments.</li>
                <li>
                  Send you notifications about due dates and announcements.
                </li>
                <li>Improve our services and platform security.</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-foreground">
              3. Data Sharing
            </h3>
            <p>
              We do not sell your personal data. We may share your information
              with third-party service providers (e.g., payment processors like
              PayOS) strictly for the purpose of providing our services.
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
