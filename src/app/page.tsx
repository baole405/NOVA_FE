"use client";

import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  LayoutDashboard,
  ShieldCheck,
  Smartphone,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-background">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <Badge
              variant="outline"
              className="px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/5 text-primary animate-in fade-in zoom-in duration-500"
            >
              🚀 Giải pháp quản lý phí căn hộ thông minh
            </Badge>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              Quản lý hóa đơn căn hộ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Dễ dàng & Minh bạch
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-5 duration-800 delay-100">
              Không còn lo lắng về thanh toán trễ hạn. NOVA giúp bạn theo dõi
              hóa đơn, nhận nhắc nhở và xem lịch sử thanh toán chỉ với vài lần
              chạm.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              {loading ? (
                <Button
                  size="lg"
                  disabled
                  className="h-12 px-8 rounded-full opacity-50"
                >
                  <span className="animate-pulse">Đang kiểm tra...</span>
                </Button>
              ) : user ? (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-lg font-medium text-foreground">
                    Xin chào,{" "}
                    <span className="text-primary">
                      {user.fullName || user.username}
                    </span>{" "}
                    👋
                  </p>
                  <Button
                    size="lg"
                    className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/25"
                    asChild
                  >
                    <Link href="/dashboard">
                      Vào Bảng điều khiển{" "}
                      <LayoutDashboard className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="h-12 px-8 text-lg rounded-full shadow-lg shadow-primary/25"
                    asChild
                  >
                    <Link href="/auth/sign-up">
                      Đăng ký miễn phí <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-8 text-lg rounded-full"
                    asChild
                  >
                    <Link href="/login">Đăng nhập</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />
      </section>

      <section className="pb-20">
        <div className="container px-4 mx-auto">
          <div className="relative rounded-xl border bg-muted/50 p-2 shadow-2xl max-w-5xl mx-auto">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-background">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                alt="Xem trước Giao diện Bảng điều khiển"
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="text-white font-bold text-xl md:text-3xl">
                  Giao diện Bảng điều khiển Người dùng
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Tại sao chọn NOVA?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Chúng tôi tập trung vào giải quyết vấn đề lớn nhất cho cư dân:
              Minh bạch và tiện lợi trong thanh toán.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<CreditCard className="w-10 h-10 text-blue-500" />}
              title="Minh bạch Phí dịch vụ"
              description="Xem chi tiết từng hạng mục: Phí quản lý, điện, nước, đỗ xe. Không còn thắc mắc về các khoản phí."
            />
            <FeatureCard
              icon={<Clock className="w-10 h-10 text-orange-500" />}
              title="Nhắc nhở Tự động"
              description="Hệ thống tự động gửi thông báo khi phí đến hạn. Nói tạm biệt với lo lắng về phạt trễ hạn."
            />
            <FeatureCard
              icon={<Smartphone className="w-10 h-10 text-green-500" />}
              title="Truy cập từ mọi nơi"
              description="Giao diện di động được tối ưu hóa. Kiểm tra hóa đơn và lịch sử thanh toán ngay cả khi đang di chuyển."
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 mx-auto space-y-24">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold">
                Theo dõi Trạng thái Hóa đơn Ngay lập tức
              </h3>
              <p className="text-lg text-muted-foreground">
                Phân loại hóa đơn một cách rõ ràng:{" "}
                <span className="text-amber-600 font-medium">
                  Chưa thanh toán
                </span>
                , <span className="text-red-600 font-medium">Quá hạn</span>, và{" "}
                <span className="text-green-600 font-medium">
                  Đã thanh toán
                </span>
                . Giúp bạn quản lý tài chính cá nhân hiệu quả hơn.
              </p>
              <ul className="space-y-3">
                <ListItem text="Cập nhật dữ liệu thực tế" />
                <ListItem text="Hiển thị chi tiết số tiền và thời hạn" />
                <ListItem text="Cảnh báo quá hạn" />
              </ul>
            </div>
            <div className="flex-1 relative aspect-square md:aspect-video bg-muted rounded-2xl overflow-hidden shadow-xl border">
              <Image
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2000&auto=format&fit=crop"
                alt="Theo dõi hóa đơn"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold">
                Lịch sử Giao dịch Minh bạch
              </h3>
              <p className="text-lg text-muted-foreground">
                Lưu trữ toàn bộ lịch sử thanh toán của bạn. Dễ dàng tra cứu các
                khoản thanh toán từ những tháng trước để xác minh khi cần.
              </p>
              <ul className="space-y-3">
                <ListItem text="Lưu trữ vĩnh viễn" />
                <ListItem text="Xuất hóa đơn PDF (Sắp ra mắt)" />
                <ListItem text="Tìm kiếm theo tháng/năm" />
              </ul>
            </div>
            <div className="flex-1 relative aspect-square md:aspect-video bg-muted rounded-2xl overflow-hidden shadow-xl border">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
                alt="Minh bạch Lịch sử"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="container px-4 mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn sàng trải nghiệm cuộc sống tiện lợi?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
            Tham gia hàng trăm cư dân đang sử dụng NOVA để quản lý căn hộ ngày
            hôm nay.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="h-14 px-10 text-lg rounded-full text-primary font-bold shadow-2xl"
            asChild
          >
            <Link href="/auth/sign-up">Tạo Tài khoản Ngay</Link>
          </Button>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </section>

      <footer className="py-12 bg-background border-t">
        <div className="container px-4 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            NOVA
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Dự án NOVA - Đại học FPT. MVP cho Khóa học EXE202.
          </p>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary">
              Điều khoản
            </Link>
            <Link href="#" className="hover:text-primary">
              Bảo mật
            </Link>
            <Link href="#" className="hover:text-primary">
              Liên hệ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
      <div className="mb-4 bg-muted/50 w-16 h-16 rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
      <span className="text-foreground/80">{text}</span>
    </li>
  );
}
