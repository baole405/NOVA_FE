"use client";

import { format } from "date-fns";
import { Car, Loader2, Utensils } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";

interface Booking {
  id: number;
  serviceType: "parking" | "bbq";
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string;
  createdAt: string;
}

export default function BookingPage() {
  const { user, loading: authLoading } = useAuth();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [serviceType, setServiceType] = useState<"parking" | "bbq">("parking");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
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

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !endTime) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("accessToken");
      const formattedDate = format(date, "yyyy-MM-dd");

      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceType,
          date: formattedDate,
          startTime,
          endTime,
          notes,
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        alert(`Booking failed: ${error}`);
        return;
      }

      alert("Booking successful!");
      fetchBookings(); // Refresh list
      // Reset form (optional)
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-primary">
          Đặt chỗ tiện ích
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Booking Form */}
        <Card>
          <CardHeader>
            <CardTitle>Đăng ký mới</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBooking} className="space-y-4">
              <div className="space-y-2">
                <Label>Loại dịch vụ</Label>
                <Tabs
                  value={serviceType}
                  onValueChange={(v) => setServiceType(v as "parking" | "bbq")}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="parking" className="flex gap-2">
                      <Car className="h-4 w-4" /> Bãi đậu xe
                    </TabsTrigger>
                    <TabsTrigger value="bbq" className="flex gap-2">
                      <Utensils className="h-4 w-4" /> Khu BBQ
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-2">
                <Label>Ngày đặt</Label>
                <div className="border rounded-md p-2 flex justify-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow"
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Giờ bắt đầu</Label>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Giờ kết thúc</Label>
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Ghi chú</Label>
                <Input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Biển số xe / Số lượng người..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt chỗ"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Bookings List */}
        <Card>
          <CardHeader>
            <CardTitle>Lịch sử đặt chỗ</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingBookings ? (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center text-muted-foreground p-8">
                Bạn chưa có lịch đặt chỗ nào.
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {booking.serviceType === "parking" ? (
                          <Car className="h-4 w-4 text-primary" />
                        ) : (
                          <Utensils className="h-4 w-4 text-orange-500" />
                        )}
                        <span className="font-semibold capitalize">
                          {booking.serviceType === "parking"
                            ? "Bãi đậu xe"
                            : "Khu BBQ"}
                        </span>
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
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(booking.date), "dd/MM/yyyy")} •{" "}
                        {booking.startTime} - {booking.endTime}
                      </p>
                      {booking.notes && (
                        <p className="text-xs text-muted-foreground/80 italic">
                          "{booking.notes}"
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
