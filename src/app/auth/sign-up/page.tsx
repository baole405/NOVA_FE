import Image from "next/image";
import { RegisterForm } from "@/components/register-form";

export default function SignUpPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left column: Form */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>

      {/* Right column: Cover image */}
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2000&auto=format&fit=crop"
          alt="Nova Apartment Manager"
          fill
          className="object-cover dark:brightness-[0.4] dark:grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10 text-white">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium">
              "Tham gia NOVA để quản lý căn hộ dễ dàng, minh bạch và tiện lợi
              hơn mỗi ngày."
            </p>
            <footer className="text-sm opacity-80">NOVA Team - EXE202</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
