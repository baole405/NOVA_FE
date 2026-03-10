"use client";

import { addDays, format } from "date-fns";
import { Car, Droplets, Loader2, Utensils } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { BBQArea } from "@/components/booking/bbq-area";
import { ParkingLot } from "@/components/booking/parking-lot";
import { SwimmingPool } from "@/components/booking/swimming-pool";
import { BookingDetailSheet } from "@/components/manager/bookings/booking-detail-sheet";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import { useBookings } from "@/hooks/use-bookings";
import type { Booking, CreateBookingPayload } from "@/lib/bookings";
import { createBooking } from "@/lib/bookings";
import { MOCK_BBQ_SLOTS, MOCK_POOL_SLOTS } from "@/lib/facilities";
import type { ManagerBooking } from "@/lib/manager-bookings";

// --- Helpers ---

const generateTimeOptions = (
  from: string,
  to: string,
  stepMin = 30,
): string[] => {
  const options: string[] = [];
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  let cur = fh * 60 + fm;
  const end = th * 60 + tm;
  while (cur <= end) {
    const h = Math.floor(cur / 60)
      .toString()
      .padStart(2, "0");
    const m = (cur % 60).toString().padStart(2, "0");
    options.push(`${h}:${m}`);
    cur += stepMin;
  }
  return options;
};

const START_TIMES = generateTimeOptions("08:00", "21:30");

const getEndTimes = (start: string): string[] => {
  if (!start) return [];
  const [h, m] = start.split(":").map(Number);
  const startMin = h * 60 + m;
  const endMin = Math.min(startMin + 240, 22 * 60);
  const fromMin = startMin + 30;
  const fromH = Math.floor(fromMin / 60)
    .toString()
    .padStart(2, "0");
  const fromM = (fromMin % 60).toString().padStart(2, "0");
  const toH = Math.floor(endMin / 60)
    .toString()
    .padStart(2, "0");
  const toM = (endMin % 60).toString().padStart(2, "0");
  return generateTimeOptions(`${fromH}:${fromM}`, `${toH}:${toM}`);
};

const calculateCost = (
  start: string,
  end: string,
  pricePerHour: number,
): number => {
  if (!start || !end) return 0;
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const hours = (eh * 60 + em - sh * 60 - sm) / 60;
  return Math.ceil(hours) * pricePerHour;
};

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

  // States for Parking (multi-select)
  const [isMonthly, setIsMonthly] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  // TODO: replace with user.vehicles.length when backend returns vehicles in auth/me response
  const maxParkingSlots = 1;

  // States for BBQ
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [bbqParticipants, setBbqParticipants] = useState("");

  // States for Pool
  const [selectedPoolId, setSelectedPoolId] = useState<string>("");
  const [poolStartTime, setPoolStartTime] = useState("");
  const [poolEndTime, setPoolEndTime] = useState("");
  const [poolParticipants, setPoolParticipants] = useState("");

  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Booking detail sheet
  const [selectedBooking, setSelectedBooking] = useState<ManagerBooking | null>(
    null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  const asManagerBooking = (b: Booking): ManagerBooking => ({
    ...b,
    status: b.status as ManagerBooking["status"],
    residentName: user?.fullName ?? user?.username ?? "",
    apartmentUnit: "",
  });

  const {
    bookings,
    loading: loadingBookings,
    refetch: refetchBookings,
  } = useBookings();

  const selectedBBQSlot = MOCK_BBQ_SLOTS.find((s) => s.id === selectedArea);
  const selectedPoolSlotData = MOCK_POOL_SLOTS.find(
    (p) => p.id === selectedPoolId,
  );

  const handleBooking = async (
    serviceType: "parking" | "bbq" | "swimming_pool",
  ) => {
    if (!date) {
      alert("Vui lòng chọn ngày");
      return;
    }

    const payload: CreateBookingPayload = {
      serviceType,
      date: format(date, "yyyy-MM-dd"),
      startTime: "00:00",
      endTime: "23:59",
      notes,
    };

    if (serviceType === "parking") {
      if (selectedSlots.length === 0) {
        alert("Vui lòng chọn ít nhất 1 vị trí đỗ xe");
        return;
      }
      payload.slotNumbers = selectedSlots;
      payload.slotNumber = selectedSlots[0];
      payload.startTime = "00:00";
      payload.endTime = "23:59";
      if (isMonthly) {
        payload.endDate = format(addDays(date, 30), "yyyy-MM-dd");
      }
    } else if (serviceType === "bbq") {
      if (!selectedArea) {
        alert("Vui lòng chọn khu vực BBQ");
        return;
      }
      if (!startTime || !endTime) {
        alert("Vui lòng chọn giờ bắt đầu và kết thúc");
        return;
      }
      if (!bbqParticipants || Number(bbqParticipants) < 1) {
        alert("Vui lòng nhập số người tham gia");
        return;
      }
      if (
        selectedBBQSlot &&
        Number(bbqParticipants) > selectedBBQSlot.capacity
      ) {
        alert(`Vượt quá sức chứa tối đa ${selectedBBQSlot.capacity} người`);
        return;
      }
      payload.slotNumber = selectedArea;
      payload.startTime = startTime;
      payload.endTime = endTime;
      payload.numberOfParticipants = Number(bbqParticipants);
      payload.price = calculateCost(
        startTime,
        endTime,
        selectedBBQSlot?.pricePerHour ?? 150000,
      );
    } else if (serviceType === "swimming_pool") {
      if (!selectedPoolId) {
        alert("Vui lòng chọn hồ bơi");
        return;
      }
      if (!poolStartTime || !poolEndTime) {
        alert("Vui lòng chọn giờ");
        return;
      }
      if (!poolParticipants || Number(poolParticipants) < 1) {
        alert("Vui lòng nhập số người tham gia");
        return;
      }
      if (
        selectedPoolSlotData &&
        Number(poolParticipants) > selectedPoolSlotData.capacity
      ) {
        alert(
          `Vượt quá sức chứa tối đa ${selectedPoolSlotData.capacity} người`,
        );
        return;
      }
      payload.slotNumber = selectedPoolId;
      payload.startTime = poolStartTime;
      payload.endTime = poolEndTime;
      payload.numberOfParticipants = Number(poolParticipants);
      payload.price = calculateCost(
        poolStartTime,
        poolEndTime,
        selectedPoolSlotData?.pricePerHour ?? 50000,
      );
    }

    setIsSubmitting(true);
    try {
      await createBooking(payload);
      alert("Đặt chỗ thành công!");
      refetchBookings();
      // Reset
      setSelectedSlots([]);
      setSelectedArea("");
      setStartTime("");
      setEndTime("");
      setBbqParticipants("");
      setSelectedPoolId("");
      setPoolStartTime("");
      setPoolEndTime("");
      setPoolParticipants("");
      setNotes("");
    } catch (error) {
      console.log("Booking error:", error);
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
        {/* Main Booking Area */}
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
            </TabsList>

            {/* === PARKING === */}
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
                        selectedSlots={selectedSlots}
                        onSelectSlots={setSelectedSlots}
                        maxSlots={maxParkingSlots}
                      />

                      {selectedSlots.length > 0 && (
                        <div className="mt-6 p-4 border rounded-lg bg-accent/20">
                          <h4 className="font-semibold mb-2">
                            Xác nhận đặt chỗ
                          </h4>
                          <p className="text-sm text-muted-foreground mb-1">
                            Vị trí:{" "}
                            <span className="font-bold text-foreground">
                              {selectedSlots.join(", ")}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground mb-1">
                            Tối đa {maxParkingSlots} vị trí (theo số phương
                            tiện)
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">
                            Thời gian:{" "}
                            {date ? format(date, "dd/MM/yyyy") : "..."}
                            {isMonthly &&
                              date &&
                              ` - ${format(addDays(date, 30), "dd/MM/yyyy")}`}
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

            {/* === BBQ === */}
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
                        onSelectArea={(id) => {
                          setSelectedArea(id);
                          setStartTime("");
                          setEndTime("");
                        }}
                      />

                      {selectedArea && selectedBBQSlot && (
                        <div className="p-4 border rounded-lg bg-accent/20 space-y-4">
                          <h4 className="font-semibold">
                            Chọn thời gian & xác nhận
                          </h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Bắt đầu</Label>
                              <Select
                                value={startTime}
                                onValueChange={(v) => {
                                  setStartTime(v);
                                  setEndTime("");
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Giờ bắt đầu" />
                                </SelectTrigger>
                                <SelectContent>
                                  {START_TIMES.map((t) => (
                                    <SelectItem key={t} value={t}>
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Kết thúc</Label>
                              <Select
                                value={endTime}
                                onValueChange={setEndTime}
                                disabled={!startTime}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Giờ kết thúc" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getEndTimes(startTime).map((t) => (
                                    <SelectItem key={t} value={t}>
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Số người tham gia (tối đa{" "}
                              {selectedBBQSlot.capacity})
                            </Label>
                            <Input
                              type="number"
                              min={1}
                              max={selectedBBQSlot.capacity}
                              value={bbqParticipants}
                              onChange={(e) =>
                                setBbqParticipants(e.target.value)
                              }
                              placeholder="Nhập số người..."
                              className="w-32"
                            />
                          </div>

                          {startTime && endTime && (
                            <div className="text-sm space-y-1">
                              <p>
                                Thời gian:{" "}
                                <strong>
                                  {startTime} – {endTime}
                                </strong>
                              </p>
                              <p>
                                Ngày:{" "}
                                <strong>
                                  {date ? format(date, "dd/MM/yyyy") : ""}
                                </strong>
                              </p>
                              <p>
                                Chi phí ước tính:{" "}
                                <strong className="text-primary">
                                  {calculateCost(
                                    startTime,
                                    endTime,
                                    selectedBBQSlot.pricePerHour,
                                  ).toLocaleString("vi-VN")}{" "}
                                  VNĐ
                                </strong>
                              </p>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label>Ghi chú</Label>
                            <Input
                              placeholder="Ghi chú thêm..."
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                            />
                          </div>

                          <Button
                            onClick={() => handleBooking("bbq")}
                            disabled={isSubmitting || !startTime || !endTime}
                            className="w-full"
                          >
                            {isSubmitting ? (
                              <Loader2 className="animate-spin mr-2" />
                            ) : null}
                            Xác nhận đặt BBQ
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* === POOL === */}
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
                        selectedPool={selectedPoolId}
                        onSelectPool={(id) => {
                          setSelectedPoolId(id);
                          setPoolStartTime("");
                          setPoolEndTime("");
                        }}
                      />

                      {selectedPoolId && selectedPoolSlotData && (
                        <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20 space-y-4">
                          <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                            Chọn thời gian & xác nhận
                          </h4>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Bắt đầu</Label>
                              <Select
                                value={poolStartTime}
                                onValueChange={(v) => {
                                  setPoolStartTime(v);
                                  setPoolEndTime("");
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Giờ bắt đầu" />
                                </SelectTrigger>
                                <SelectContent>
                                  {START_TIMES.map((t) => (
                                    <SelectItem key={t} value={t}>
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label>Kết thúc</Label>
                              <Select
                                value={poolEndTime}
                                onValueChange={setPoolEndTime}
                                disabled={!poolStartTime}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Giờ kết thúc" />
                                </SelectTrigger>
                                <SelectContent>
                                  {getEndTimes(poolStartTime).map((t) => (
                                    <SelectItem key={t} value={t}>
                                      {t}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>
                              Số người tham gia (tối đa{" "}
                              {selectedPoolSlotData.capacity})
                            </Label>
                            <Input
                              type="number"
                              min={1}
                              max={selectedPoolSlotData.capacity}
                              value={poolParticipants}
                              onChange={(e) =>
                                setPoolParticipants(e.target.value)
                              }
                              placeholder="Nhập số người..."
                              className="w-32"
                            />
                          </div>

                          {poolStartTime && poolEndTime && (
                            <div className="text-sm space-y-1">
                              <p>
                                Thời gian:{" "}
                                <strong>
                                  {poolStartTime} – {poolEndTime}
                                </strong>
                              </p>
                              <p>
                                Ngày:{" "}
                                <strong>
                                  {date ? format(date, "dd/MM/yyyy") : ""}
                                </strong>
                              </p>
                              <p>
                                Chi phí ước tính:{" "}
                                <strong className="text-blue-700">
                                  {calculateCost(
                                    poolStartTime,
                                    poolEndTime,
                                    selectedPoolSlotData.pricePerHour,
                                  ).toLocaleString("vi-VN")}{" "}
                                  VNĐ
                                </strong>
                              </p>
                            </div>
                          )}

                          <Button
                            onClick={() => handleBooking("swimming_pool")}
                            disabled={
                              isSubmitting || !poolStartTime || !poolEndTime
                            }
                            className="w-full bg-blue-600 hover:bg-blue-700"
                          >
                            {isSubmitting ? (
                              <Loader2 className="animate-spin mr-2" />
                            ) : null}
                            Xác nhận đặt hồ bơi
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                    <button
                      key={booking.id}
                      type="button"
                      className="w-full p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors cursor-pointer text-left"
                      onClick={() => {
                        setSelectedBooking(asManagerBooking(booking));
                        setSheetOpen(true);
                      }}
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
                    </button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <BookingDetailSheet
        booking={selectedBooking}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        userRole="resident"
        onUpdateStatus={async (id, payload) => {
          // TODO: gọi cancelBooking(id) khi BE sẵn
          console.log("Cancel booking", id, payload);
          refetchBookings();
        }}
        onUpdateBooking={async (id, payload) => {
          // TODO: gọi updateBooking(id, payload) khi BE sẵn
          console.log("Update booking notes", id, payload);
        }}
      />
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
