"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { toast } from "sonner" // Assuming sonner or use-toast is available

export function GuestRegistration() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gate: "",
    startTime: "",
    endTime: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success (Replace with actual toast if available, defaulting to alert for compatibility)
    alert("Đăng ký khách thành công! Mã QR đã được gửi (Check console).");
    console.log("Registered Guest:", formData);

    setLoading(false);
    setFormData({
      name: "",
      phone: "",
      gate: "",
      startTime: "",
      endTime: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Đăng ký khách ra vào</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 rounded-md bg-yellow-50 p-4 text-sm text-yellow-800 border border-yellow-200">
          <p className="font-semibold">Lưu ý:</p>
          <ul className="list-disc pl-5 mt-1 space-y-1">
            <li>Quý cư dân chịu trách nhiệm về khách mời của mình.</li>
            <li>
              Nếu khách ở lại quá giờ đăng ký, hệ thống sẽ tính phí{" "}
              <strong>10.000 VNĐ / 1 giờ</strong>.
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Tên khách</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0901234567"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gate">Cổng vào dự kiến</Label>
            <Input
              id="gate"
              value={formData.gate}
              onChange={handleChange}
              placeholder="Cổng 1 (Nguyễn Xiển)"
              required
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startTime">Giờ đến</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">Giờ về</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Đang đăng ký..." : "Xác nhận đăng ký"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
