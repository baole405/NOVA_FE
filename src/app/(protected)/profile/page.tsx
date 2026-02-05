"use client";

import { ApartmentInfo } from "@/components/profile/apartment-info";
import { FamilyList } from "@/components/profile/family-list";
import { PersonalInfo } from "@/components/profile/personal-info";
// Import các components con mới
import { ProfileHeader } from "@/components/profile/profile-header";
import { VehicleList } from "@/components/profile/vehicle-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockUser } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <div className="space-y-6 p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            My Profile
          </h2>
          <p className="text-muted-foreground">
            Manage your personal information and household details.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* --- LEFT COLUMN: Header & Stats (Chiếm 4/12 cột) --- */}
        <div className="md:col-span-4">
          <ProfileHeader user={mockUser} />
        </div>

        {/* --- RIGHT COLUMN: Detailed Tabs (Chiếm 8/12 cột) --- */}
        <div className="md:col-span-8">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="apartment">Apartment</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <PersonalInfo user={mockUser} />
            </TabsContent>

            <TabsContent value="apartment">
              <ApartmentInfo apartment={mockUser.apartment} />
            </TabsContent>

            <TabsContent value="family">
              <FamilyList members={mockUser.familyMembers} />
            </TabsContent>

            <TabsContent value="vehicles">
              <VehicleList vehicles={mockUser.vehicles} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
