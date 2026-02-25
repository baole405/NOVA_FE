"use client";

import { Car, Droplets, Utensils, Warehouse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ParkingConfig } from "@/components/manager/facilities/parking-config";
import { BBQConfig } from "@/components/manager/facilities/bbq-config";
import { PoolConfig } from "@/components/manager/facilities/pool-config";

export default function ManagerFacilitiesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Warehouse className="h-8 w-8 text-primary" />
          Quản lý tiện ích
        </h1>
        <p className="text-muted-foreground mt-2">
          Cấu hình bãi xe, khu BBQ và hồ bơi
        </p>
      </div>

      <Tabs defaultValue="parking" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="parking" className="flex gap-2">
            <Car className="h-4 w-4" />
            Bãi xe
          </TabsTrigger>
          <TabsTrigger value="bbq" className="flex gap-2">
            <Utensils className="h-4 w-4" />
            Khu BBQ
          </TabsTrigger>
          <TabsTrigger value="pool" className="flex gap-2">
            <Droplets className="h-4 w-4" />
            Hồ bơi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="parking" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình bãi đậu xe</CardTitle>
            </CardHeader>
            <CardContent>
              <ParkingConfig />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bbq" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình khu BBQ</CardTitle>
            </CardHeader>
            <CardContent>
              <BBQConfig />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pool" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình hồ bơi</CardTitle>
            </CardHeader>
            <CardContent>
              <PoolConfig />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
