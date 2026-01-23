import { Building, Mail, Phone, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockUser } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          My Profile
        </h2>
        <p className="text-muted-foreground">
          Manage your account and apartment details.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Cột trái: Avatar & Info cơ bản */}
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center pt-6 text-center">
            <Avatar className="h-24 w-24 mb-4 border-4 border-background shadow-lg">
              <AvatarImage src={mockUser.avatarUrl} />
              <AvatarFallback className="text-xl">NM</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{mockUser.name}</h3>
            <p className="text-sm text-muted-foreground capitalize">
              {mockUser.role}
            </p>
            <div className="mt-6 w-full space-y-2">
              <Button variant="outline" className="w-full">
                Change Avatar
              </Button>
              <Button
                variant="ghost"
                className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cột phải: Form chi tiết & Căn hộ */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input defaultValue={mockUser.name} readOnly />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email
                  </Label>
                  <Input defaultValue={mockUser.email} readOnly />
                </div>
                <div className="grid gap-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone
                  </Label>
                  <Input defaultValue={mockUser.phone} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-primary" />
                Apartment Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Block</p>
                  <p className="font-medium text-lg">
                    {mockUser.apartment?.block}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Unit Number</p>
                  <p className="font-medium text-lg">
                    {mockUser.apartment?.unitNumber}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Floor</p>
                  <p className="font-medium text-lg">
                    {mockUser.apartment?.floor}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Area</p>
                  <p className="font-medium text-lg">
                    {mockUser.apartment?.area} m²
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
