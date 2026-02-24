"use client";

import { addDays, format } from "date-fns";
import { Car, Droplets, Loader2, Users, Utensils } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { BBQArea } from "@/components/booking/bbq-area";
import { GuestRegistration } from "@/components/booking/guest-registration";
import { ParkingLot } from "@/components/booking/parking-lot";
import { SwimmingPool } from "@/components/booking/swimming-pool";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";

interface Booking {
  id: number;
  serviceType: "parking" | "bbq" | "swimming_pool";
  slotNumber?: string;
  date: string;
  endDate?: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string;
  createdAt: string;
}

function BookingPageContent() {
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab");
  const [currentTab, setCurrentTab] = useState<string>(tabParam || "parking");

  useEffect(() => {
    if (tabParam) {
      setCurrentTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    router.push(`/booking?tab=${value}`, { scroll: false });
  };

  const [date, setDate] = useState<Date | undefined>(new Date());

  // States for Parking
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  // States for BBQ
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // States for Pool
  const [selectedPoolSlot, setSelectedPoolSlot] = useState<string>("");

  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  const fetchBookings = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      const res = await fetch(`${API_URL}/bookings/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoadingBookings(false);
    }
  }, [API_URL]);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user, fetchBookings]);

  const handleBooking = async (
    serviceType: "parking" | "bbq" | "swimming_pool",
  ) => {
    if (!date) {
      alert("Vui lòng chọn ngày");
      return;
    }

    // Validation
    if (serviceType === "parking" && !selectedSlot) {
      alert("Vui lòng chọn vị trí đỗ xe");
      return;
    }
    if (serviceType === "bbq") {
      if (!selectedArea) {
        alert("Vui lòng chọn khu vực BBQ");
        return;
      }
      if (!startTime || !endTime) {
        alert("Vui lòng chọn giờ bắt đầu và kết thúc");
        return;
      }
    }

    if (serviceType === "swimming_pool") {
      if (!selectedPoolSlot) {
        alert("Vui lòng chọn khung giờ bơi");
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken");
      const formattedDate = format(date, "yyyy-MM-dd");

      const payload: any = {
        serviceType,
        date: formattedDate,
        notes,
      };

      if (serviceType === "parking") {
        payload.slotNumber = selectedSlot;
        payload.startTime = "00:00";
        payload.endTime = "23:59";
        if (isMonthly) {
          payload.endDate = format(addDays(date, 30), "yyyy-MM-dd");
        }
      } else if (serviceType === "bbq") {
        payload.slotNumber = selectedArea;
        payload.startTime = startTime;
        payload.endTime = endTime;
      } else if (serviceType === "swimming_pool") {
        // Slot format "06:00-07:00"
        const [start, end] = selectedPoolSlot.split("-");
        payload.startTime = start;
        payload.endTime = end;
        payload.price = 50000;
      }

      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(`Booking failed: ${error.message || "Unknown error"}`);
        return;
      }

      alert("Đặt chỗ thành công!");
      fetchBookings();
      // Reset logic
      setSelectedSlot("");
      setSelectedArea("");
      setSelectedPoolSlot("");
      setStartTime("");
      setEndTime("");
      setNotes("");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6 p-4 md:p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Đặt chỗ tiện ích
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Booking Area (Takes up 2 cols on large screens) */}
        <div className="lg:col-span-2">
          <Tabs
            defaultValue="parking"
            value={currentTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="parking" className="flex gap-2">
                <Car className="h-4 w-4" /> Bãi đậu xe
              </TabsTrigger>
              <TabsTrigger value="bbq" className="flex gap-2">
                <Utensils className="h-4 w-4" /> Khu BBQ
              </TabsTrigger>
              <TabsTrigger value="pool" className="flex gap-2">
                <Droplets className="h-4 w-4" /> Hồ bơi
              </TabsTrigger>
              <TabsTrigger value="guest" className="flex gap-2">
                <Users className="h-4 w-4" /> Khách ra vào
              </TabsTrigger>
            </TabsList>

            <TabsContent value="parking">
              <Card>
                <CardHeader>
                  <CardTitle>Sơ đồ bãi xe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="space-y-4">
                      <Label>Ngày bắt đầu</Label>
                      <div className="border rounded-md p-2 w-fit">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) =>
                            d < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch
                          id="monthly-mode"
                          checked={isMonthly}
                          onCheckedChange={setIsMonthly}
                        />
                        <Label htmlFor="monthly-mode">
                          Gửi theo tháng (30 ngày)
                        </Label>
                      </div>
                    </div>

                    <div className="flex-1">
                      <ParkingLot
                        selectedDate={date}
                        selectedSlot={selectedSlot}
                        onSelectSlot={setSelectedSlot}
                      />

                      {selectedSlot && (
                        <div className="mt-6 p-4 border rounded-lg bg-accent/20">
                          <h4 className="font-semibold mb-2">
                            Xác nhận đặt chỗ
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Vị trí:{" "}
                            <span className="font-bold text-foreground">
                              {selectedSlot}
                            </span>
                            <br />
                            Thời gian:{" "}
                            {date ? format(date, "dd/MM/yyyy") : "..."}
                            {isMonthly &&
                              ` - ${format(addDays(date!, 30), "dd/MM/yyyy")}`}
                          </p>
                          <Button
                            onClick={() => handleBooking("parking")}
                            disabled={isSubmitting}
                            className="w-full"
                          >
                            {isSubmitting ? (
                              <Loader2 className="animate-spin mr-2" />
                            ) : (
                              "Đặt vị trí này"
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bbq">
              <Card>
                <CardHeader>
                  <CardTitle>Đặt khu vực BBQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="space-y-4">
                      <Label>Ngày tổ chức</Label>
                      <div className="border rounded-md p-2 w-fit">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) =>
                            d < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-6">
                      <BBQArea
                        selectedDate={date}
                        selectedArea={selectedArea}
                        onSelectArea={setSelectedArea}
                      />

                      {selectedArea && (
                        <div className="p-4 border rounded-lg bg-accent/20 space-y-4">
                          <h4 className="font-semibold">Chọn thời gian</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Bắt đầu</Label>
                              <Input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Kết thúc</Label>
                              <Input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Ghi chú</Label>
                            <Input
                              placeholder="Số lượng người..."
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                            />
                          </div>
                          <Button
                            onClick={() => handleBooking("bbq")}
                            disabled={isSubmitting}
                            className="w-full"
                          >
                            {isSubmitting ? (
                              <Loader2 className="animate-spin mr-2" />
                            ) : (
                              "Xác nhận đặt BBQ"
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pool">
              <Card>
                <CardHeader>
                  <CardTitle>Đặt vé hồ bơi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="space-y-4">
                      <Label>Ngày bơi</Label>
                      <div className="border rounded-md p-2 w-fit">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) =>
                            d < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-6">
                      <SwimmingPool
                        selectedDate={date}
                        selectedTimeSlot={selectedPoolSlot}
                        onSelectTimeSlot={setSelectedPoolSlot}
                      />

                      {selectedPoolSlot && (
                        <div className="p-4 border rounded-lg bg-blue-50 space-y-4">
                          <h4 className="font-semibold text-blue-900">
                            Xác nhận đặt vé bơi
                          </h4>
                          <p className="text-sm">
                            Thời gian:{" "}
                            <span className="font-bold">
                              {selectedPoolSlot}
                            </span>{" "}
                            <br />
                            Ngày:{" "}
                            <span className="font-bold">
                              {date ? format(date, "dd/MM/yyyy") : ""}
                            </span>
                          </p>
                          <Button
                            onClick={() => handleBooking("swimming_pool")}
                            disabled={isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            {isSubmitting ? (
                              <Loader2 className="animate-spin mr-2" />
                            ) : (
                              "Thanh toán & Đặt vé (50.000 VNĐ)"
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guest">
              <GuestRegistration />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar: Booking History */}
        <div>
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Lịch sử đặt chỗ</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              {loadingBookings ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center text-muted-foreground p-8">
                  Bạn chưa có lịch đặt chỗ nào.
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {booking.serviceType === "parking" ? (
                              <Car className="h-4 w-4 text-primary" />
                            ) : booking.serviceType === "bbq" ? (
                              <Utensils className="h-4 w-4 text-orange-500" />
                            ) : (
                              <Droplets className="h-4 w-4 text-blue-500" />
                            )}
                            <span className="font-semibold capitalize">
                              {booking.serviceType === "parking" &&
                                `Bãi xe - ${booking.slotNumber || "?"}`}
                              {booking.serviceType === "bbq" &&
                                `BBQ - ${booking.slotNumber || "?"}`}
                              {booking.serviceType === "swimming_pool" &&
                                `Bơi - ${booking.startTime}`}
                            </span>
                          </div>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <p className="text-sm text-foreground">
                          {format(new Date(booking.date), "dd/MM/yyyy")}
                          {booking.endDate &&
                            ` - ${format(new Date(booking.endDate), "dd/MM/yyyy")}`}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.startTime.slice(0, 5)} -{" "}
                          {booking.endTime.slice(0, 5)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-20">
          <Loader2 className="animate-spin h-10 w-10 text-primary" />
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}
