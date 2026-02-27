"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const defaultPreferences = [
  {
    id: "bill_email",
    label: "Email thông báo hóa đơn",
    description: "Nhận email khi có hóa đơn mới",
    enabled: true,
  },
  {
    id: "reminder_email",
    label: "Email nhắc nhở đến hạn",
    description: "Nhận email nhắc trước 3 ngày hạn thanh toán",
    enabled: true,
  },
  {
    id: "maintenance_notif",
    label: "Thông báo bảo trì",
    description: "Nhận thông báo khi có lịch bảo trì",
    enabled: true,
  },
  {
    id: "event_notif",
    label: "Thông báo sự kiện",
    description: "Nhận thông báo về sự kiện cộng đồng",
    enabled: false,
  },
  {
    id: "complaint_update",
    label: "Cập nhật phản ánh",
    description: "Nhận thông báo khi phản ánh được xử lý",
    enabled: true,
  },
];

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState(defaultPreferences);

  const togglePreference = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref,
      ),
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Thông báo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {preferences.map((pref) => (
          <div key={pref.id} className="flex items-center justify-between py-1">
            <div>
              <Label htmlFor={pref.id} className="text-sm font-medium">
                {pref.label}
              </Label>
              <p className="text-xs text-muted-foreground">
                {pref.description}
              </p>
            </div>
            <Switch
              id={pref.id}
              checked={pref.enabled}
              onCheckedChange={() => togglePreference(pref.id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
