"use client";

import {
  Calendar,
  Eye,
  EyeOff,
  Fingerprint,
  Info,
  Mail,
  Pencil,
  Phone,
  Save,
  User as UserIcon,
  X,
} from "lucide-react";
import { useState } from "react";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { UserProfile } from "@/types";

export function PersonalInfo({ user }: { user: UserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showIdNumber, setShowIdNumber] = useState(false);

  const [formData, setFormData] = useState({
    name: user.name,
    idNumber: user.idNumber || "",
    email: user.email,
    phone: user.phone || "",
    dob: user.dob || "",
  });

  const maskId = (id: string) => {
    if (!id) return "";
    if (id.length <= 3) return id;
    return "●".repeat(id.length - 3) + id.slice(-3);
  };

  const handleSave = () => {
    console.log("Submitting changes:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      idNumber: user.idNumber || "",
      email: user.email,
      phone: user.phone || "",
      dob: user.dob || "",
    });
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-primary" />
            Thông Tin Cá Nhân
          </CardTitle>
          <CardDescription>
            Xem và quản lý thông tin cá nhân của bạn.
          </CardDescription>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="w-4 h-4 mr-2" /> Chỉnh sửa
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              Họ và tên
              {isEditing && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Tên phải trùng khớp với hợp đồng. Liên hệ BQL để thay đổi.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </Label>
            <Input
              id="name"
              value={formData.name}
              disabled
              className="bg-muted/50 cursor-not-allowed"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="idNumber" className="flex items-center gap-2">
              <Fingerprint className="h-4 w-4" /> CCCD / Hộ chiếu
            </Label>
            <div className="relative">
              <Input
                id="idNumber"
                value={
                  showIdNumber ? formData.idNumber : maskId(formData.idNumber)
                }
                disabled
                className="bg-muted/50 cursor-not-allowed font-mono pr-10"
                type={showIdNumber ? "text" : "password"}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                onClick={() => setShowIdNumber(!showIdNumber)}
              >
                {showIdNumber ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle ID visibility</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="dob" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Ngày sinh
            </Label>
            <Input
              id="dob"
              type="date"
              value={formData.dob}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, dob: e.target.value })
              }
              className={isEditing ? "bg-background" : "bg-muted/50"}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> Số điện thoại
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              disabled={!isEditing}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={isEditing ? "bg-background" : "bg-muted/50"}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> Địa chỉ Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            disabled={!isEditing}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={isEditing ? "bg-background" : "bg-muted/50"}
          />
          {isEditing && (
            <p className="text-xs text-muted-foreground mt-1">
              * Việc thay đổi email hoặc số điện thoại có thể yêu cầu xác thực
              OTP.
            </p>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end gap-2 mt-4 animate-in fade-in slide-in-from-top-2">
            <Button variant="ghost" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" /> Hủy
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
