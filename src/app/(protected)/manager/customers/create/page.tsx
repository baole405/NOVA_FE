import type { Metadata } from "next";
import { CreateCustomerForm } from "@/components/customers/create-customer-form";

export const metadata: Metadata = {
  title: "Tạo tài khoản khách hàng | NOVA",
  description: "Tạo tài khoản mới cho cư dân",
};

export default function CreateCustomerPage() {
  return (
    <div className="container mx-auto max-w-4xl py-6">
      <CreateCustomerForm />
    </div>
  );
}
