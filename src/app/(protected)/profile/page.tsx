"use client";

import { useCallback, useEffect, useState } from "react";
import { ApartmentInfo } from "@/components/profile/apartment-info";
import { FamilyList } from "@/components/profile/family-list";
import { PersonalInfo } from "@/components/profile/personal-info";
import { ProfileHeader } from "@/components/profile/profile-header";
import { VehicleList } from "@/components/profile/vehicle-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { getOwnApartment } from "@/lib/apartments";
import type { Apartment, UserProfile } from "@/types";

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [apartment, setApartment] = useState<Apartment | null>(null);

  const fetchApartment = useCallback(async () => {
    try {
      const res = await getOwnApartment();
      setApartment(res);
    } catch (err) {
      console.log("Failed to fetch apartment:", err);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchApartment();
    }
  }, [user, fetchApartment]);

  if (authLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  // Map API User + Apartment to the UserProfile shape expected by sub-components
  const userProfile: UserProfile = {
    id: String(user.id),
    name: user.fullName ?? user.username,
    idNumber: "",
    email: user.email,
    phone: user.phoneNumber,
    avatarUrl: user.image,
    role: (user.role as UserProfile["role"]) ?? "resident",
    apartment: apartment ?? undefined,
    vehicles: [], // not yet available from API
    familyMembers: [], // not yet available from API
  };

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Hồ sơ của tôi
          </h2>
          <p className="text-muted-foreground">
            Quản lý thông tin cá nhân và chi tiết hộ gia đình.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <ProfileHeader user={userProfile} />
        </div>

        <div className="md:col-span-8">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Cá nhân</TabsTrigger>
              <TabsTrigger value="apartment">Căn hộ</TabsTrigger>
              <TabsTrigger value="family">Gia đình</TabsTrigger>
              <TabsTrigger value="vehicles">Xe</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalInfo user={userProfile} />
            </TabsContent>

            <TabsContent value="apartment">
              <ApartmentInfo apartment={userProfile.apartment} />
            </TabsContent>

            <TabsContent value="family">
              <FamilyList members={userProfile.familyMembers} />
            </TabsContent>

            <TabsContent value="vehicles">
              <VehicleList vehicles={userProfile.vehicles} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
