"use client";

import { Settings } from "lucide-react";
import { AccountSettings } from "@/components/settings/account-settings";
import { NotificationPreferences } from "@/components/settings/notification-preferences";
import { ThemeToggle } from "@/components/settings/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-3xl mx-auto animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
          <Settings className="h-8 w-8" />
          Cài đặt
        </h2>
        <p className="text-muted-foreground mt-1">
          Quản lý tài khoản và tùy chỉnh trải nghiệm
        </p>
      </div>

      <AccountSettings
        name="Nguyễn Minh Nhật"
        email="nhatnm@example.com"
        phone="0909123456"
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
