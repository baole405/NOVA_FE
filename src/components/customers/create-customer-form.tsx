"use client";

import { Loader2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCustomerAccount } from "@/app/actions/customers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CreateCustomerFormProps extends React.ComponentPropsWithoutRef<"div"> {}

export function CreateCustomerForm({
  className,
  ...props
}: Readonly<CreateCustomerFormProps>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    idNumber: "",
    dob: "",
    role: "resident" as "resident" | "owner",
    // Apartment details
    unitNumber: "",
    block: "",
    floor: "",
    area: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: "resident" | "owner") => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.unitNumber ||
        !formData.block
      ) {
        setError("Vui lòng điền đầy đủ các trường bắt buộc");
        setIsLoading(false);
        return;
      }

      // Call server action
      const result = await createCustomerAccount({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        idNumber: formData.idNumber,
        dob: formData.dob,
        role: formData.role,
        apartment: {
          unitNumber: formData.unitNumber,
          block: formData.block,
          floor: Number.parseInt(formData.floor, 10) || 1,
          area: Number.parseFloat(formData.area) || 50,
        },
      });

      if (result.success) {
        setSuccess("Tạo tài khoản thành công!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          idNumber: "",
          dob: "",
          role: "resident",
          unitNumber: "",
          block: "",
          floor: "",
          area: "",
        });
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/manager/customers");
        }, 2000);
      } else {
        setError(result.message || "Có lỗi xảy ra khi tạo tài khoản");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại sau.");
      console.error("Error creating customer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            <CardTitle>Tạo tài khoản khách hàng</CardTitle>
          </div>
          <CardDescription>
            Điền thông tin để tạo tài khoản mới cho cư dân
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Alert messages */}
            {error && (
              <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500/15 text-green-600 dark:text-green-400 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Thông tin cá nhân
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Họ và tên <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0912345678"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">
                    Số CMND/CCCD <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    placeholder="001234567890"
                    value={formData.idNumber}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Ngày sinh</Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <Select
                    value={formData.role}
                    onValueChange={handleRoleChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resident">Cư dân</SelectItem>
                      <SelectItem value="owner">Chủ hộ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Apartment Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Thông tin căn hộ
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unitNumber">
                    Số căn hộ <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="unitNumber"
                    name="unitNumber"
                    type="text"
                    placeholder="A101"
                    value={formData.unitNumber}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="block">
                    Tòa nhà <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="block"
                    name="block"
                    type="text"
                    placeholder="Block A"
                    value={formData.block}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="floor">Tầng</Label>
                  <Input
                    id="floor"
                    name="floor"
                    type="number"
                    placeholder="1"
                    value={formData.floor}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    min="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Diện tích (m²)</Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    placeholder="50"
                    value={formData.area}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    min="1"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 md:flex-initial"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Tạo tài khoản
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Hủy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
