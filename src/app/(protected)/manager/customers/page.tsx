import { UserPlus, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getCustomers } from "@/app/actions/customers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Quản lý khách hàng | NOVA",
  description: "Danh sách khách hàng và cư dân",
};

export default async function CustomersPage() {
  const { data: customers } = await getCustomers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Quản lý khách hàng
          </h1>
          <p className="text-muted-foreground mt-2">
            Quản lý tài khoản cư dân và thông tin căn hộ
          </p>
        </div>
        <Link href="/manager/customers/create">
          <Button size="lg" className="w-full sm:w-auto">
            <UserPlus className="mr-2 h-4 w-4" />
            Tạo tài khoản mới
          </Button>
        </Link>
      </div>

      {/* Customers List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khách hàng</CardTitle>
          <CardDescription>
            Tổng số: {customers?.length || 0} khách hàng
          </CardDescription>
        </CardHeader>
        <CardContent>
          {customers && customers.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Họ tên</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Vai trò</TableHead>
                    <TableHead>Căn hộ</TableHead>
                    <TableHead>Tòa nhà</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.name}
                      </TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        <span
                          className={
                            customer.role === "owner"
                              ? "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-primary/10 text-primary"
                              : "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-muted text-muted-foreground"
                          }
                        >
                          {customer.role === "owner" ? "Chủ hộ" : "Cư dân"}
                        </span>
                      </TableCell>
                      <TableCell>{customer.apartment.unitNumber}</TableCell>
                      <TableCell>{customer.apartment.block}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Xem chi tiết
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">Chưa có khách hàng</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Bắt đầu bằng cách tạo tài khoản khách hàng đầu tiên
              </p>
              <Link href="/manager/customers/create">
                <Button className="mt-4">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Tạo tài khoản mới
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
