"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AccountSettingsProps {
  name: string;
  email: string;
  phone: string;
}

export function AccountSettings({
  name: initialName,
  email,
  phone: initialPhone,
}: AccountSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base">Tài khoản</CardTitle>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Chỉnh sửa
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Họ và tên</Label>
          {isEditing ? (
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <p className="text-sm text-foreground">{name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <p className="text-sm text-muted-foreground">{email}</p>
          <p className="text-xs text-muted-foreground">
            Email không thể thay đổi
          </p>
        </div>

        <div className="space-y-2">
          <Label>Số điện thoại</Label>
          {isEditing ? (
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          ) : (
            <p className="text-sm text-foreground">{phone || "Chưa cập nhật"}</p>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" onClick={handleSave}>
              Lưu thay đổi
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Hủy
            </Button>
          </div>
        )}

        <Separator />

        <div>
          <Button variant="outline" size="sm">
            Đổi mật khẩu
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
