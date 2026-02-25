"use client";

import { Building2, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { NotificationPreferences } from "@/components/settings/notification-preferences";
import { AccountSettings } from "@/components/settings/account-settings";

export default function ManagerSettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          Cài đặt
        </h1>
        <p className="text-muted-foreground mt-2">
          Quản lý tài khoản và cấu hình hệ thống
        </p>
      </div>

      {/* Building info - manager specific */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Thông tin tòa nhà
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tên tòa nhà</Label>
              <Input defaultValue="NOVA Smart Living" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Địa chỉ</Label>
              <Input
                defaultValue="123 Đường Nguyễn Huệ, Quận 1, TP.HCM"
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label>Tổng số căn hộ</Label>
              <Input defaultValue="120" readOnly />
            </div>
            <div className="space-y-2">
              <Label>Số tòa</Label>
              <Input defaultValue="3 (A, B, C)" readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <AccountSettings
        name="Admin NOVA"
        email="admin@nova.vn"
        phone="1900-NOVA"
      />

      <ThemeToggle />

      <NotificationPreferences />

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Ngôn ngữ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Ngôn ngữ hiển thị</Label>
              <p className="text-xs text-muted-foreground">
                Chọn ngôn ngữ cho giao diện
              </p>
            </div>
            <Select defaultValue="vi">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Tiếng Việt</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
