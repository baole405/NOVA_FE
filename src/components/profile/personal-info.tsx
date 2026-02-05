"use client";

import {
  Calendar,
  Eye, // Mới
  EyeOff, // Mới
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
  const [showIdNumber, setShowIdNumber] = useState(false); // State quản lý ẩn/hiện CCCD

  const [formData, setFormData] = useState({
    name: user.name,
    idNumber: user.idNumber || "",
    email: user.email,
    phone: user.phone || "",
    dob: user.dob || "",
  });

  // Hàm che chuỗi ID, chỉ hiện 3 số cuối
  const maskId = (id: string) => {
    if (!id) return "";
    if (id.length <= 3) return id;
    // Thay thế tất cả ký tự trừ 3 ký tự cuối bằng dấu chấm tròn
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
            Personal Details
          </CardTitle>
          <CardDescription>
            View and manage your personal information.
          </CardDescription>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="w-4 h-4 mr-2" /> Edit Info
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* ROW 1: Name & ID Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              Full Name
              {isEditing && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Name must match the contract. Contact Admin to change.
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

          {/* ID NUMBER VỚI MASKING */}
          <div className="grid gap-2">
            <Label htmlFor="idNumber" className="flex items-center gap-2">
              <Fingerprint className="h-4 w-4" /> ID Card / Passport
            </Label>
            <div className="relative">
              <Input
                id="idNumber"
                // Logic hiển thị: Nếu đang bật showIdNumber thì hiện số thật, ngược lại hiện số đã che
                value={
                  showIdNumber ? formData.idNumber : maskId(formData.idNumber)
                }
                disabled
                className="bg-muted/50 cursor-not-allowed font-mono pr-10" // pr-10 để chừa chỗ cho icon
                type={showIdNumber ? "text" : "password"} // Kết hợp thêm type password để an toàn hơn
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

        {/* ROW 2: DOB & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="dob" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Date of Birth
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
              <Phone className="h-4 w-4" /> Phone Number
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

        {/* ROW 3: Email */}
        <div className="grid gap-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> Email Address
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
              * Changing email or phone may require OTP verification.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-2 mt-4 animate-in fade-in slide-in-from-top-2">
            <Button variant="ghost" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
