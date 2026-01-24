# NOVA Project Scope - EXE202

## 1. Functional Requirements Table (Bảng chức năng)

| ID           | Tên chức năng         | Mô tả chi tiết                                                          | Users (Actor) | Module         |
| :----------- | :-------------------- | :---------------------------------------------------------------------- | :------------ | :------------- |
| **AUTH-01**  | Đăng nhập Google      | Đăng nhập hệ thống thông qua tài khoản Google (SSO).                    | All           | Authentication |
| **AUTH-02**  | Xem Profile           | Xem thông tin cá nhân và thông tin gắn liền với căn hộ.                 | All           | Authentication |
| **DASH-01**  | Dashboard Tổng quan   | Hiển thị tổng dư nợ, số hóa đơn cần thanh toán, biểu đồ chi tiêu.       | Resident      | Dashboard      |
| **DASH-02**  | Widget Nhắc việc      | Hiển thị nhanh các sự kiện/hóa đơn sắp đến hạn (7 ngày tới).            | Resident      | Dashboard      |
| **BILL-01**  | Xem danh sách hóa đơn | Liệt kê hóa đơn phí dịch vụ. Hỗ trợ lọc (Chưa đóng/Đã đóng) và sắp xếp. | Resident      | Fees           |
| **BILL-02**  | Chi tiết hóa đơn      | Xem kỹ các mục chi phí trong một hóa đơn cụ thể.                        | Resident      | Fees           |
| **PAY-01**   | Thanh toán Online     | Thực hiện thanh toán hóa đơn (Mô phỏng quy trình Payment Gateway).      | Resident      | Payments       |
| **TRANS-01** | Lịch sử giao dịch     | Xem lại lịch sử các lần thanh toán trước đây.                           | Resident      | Payments       |
| **VIS-01**   | Đăng ký khách mời     | Tạo yêu cầu khách đến thăm, nhập thông tin xe và giờ đến.               | Resident      | Visitors       |
| **VIS-02**   | Tạo vé QR             | Hệ thống tạo mã QR (hoặc Access Code) để khách check-in tại cổng.       | System        | Visitors       |
| **FAC-01**   | Xem tiện ích          | Danh sách các tiện ích chung (Hồ bơi, BBQ, Gym) và trạng thái.          | Resident      | Facilities     |
| **FAC-02**   | Đặt chỗ (Booking)     | Đặt lịch sử dụng tiện ích theo khung giờ.                               | Resident      | Facilities     |
| **FAC-03**   | Quản lý đặt chỗ       | Xem và hủy các lịch đã đặt.                                             | Resident      | Facilities     |
| **COM-01**   | Bảng tin cư dân       | Xem các thông báo từ Ban quản lý (cắt điện, nước, sự kiện).             | Resident      | Community      |
| **SOS-01**   | Gọi khẩn cấp          | Nút tắt gọi nhanh cho Bảo vệ hoặc Y tế.                                 | Resident      | Emergency      |

---

## 2. UI Map List (Danh sách màn hình)

Dưới đây là danh sách các màn hình (UI Screens) cần thiết kế và phát triển:

**1. Nhóm Authentication (Xác thực)**

- **UI-01: Login Screen**
  - Nút "Sign in with Google".
  - Footer: Điều khoản sử dụng & Chính sách.
- **UI-02: Onboarding** (Optional)
  - Giới thiệu các tính năng chính khi vào lần đầu.

**2. Nhóm Dashboard (Trang chủ)**

- **UI-03: Resident Dashboard**
  - Header: Xin chào [User], Thông tin căn hộ [Unit].
  - Section: Financial Summary Card (Tổng nợ).
  - Section: Quick Actions (Thanh toán ngay, Mời khách, Đặt BBQ).
  - Section: Recent Activity (Lịch sử gần đây).

**3. Nhóm Service Fees (Phí & Hóa đơn)**

- **UI-04: Bills List**
  - Tabs: Unpaid | Paid | All.
  - List Item: Icon loại phí, Title, Amount, Due Date.
- **UI-05: Bill Detail Modal**
  - Thông tin chi tiết hóa đơn.
  - Nút hành động: "Pay Now".
- **UI-06: Payment Success**
  - Màn hình thông báo thanh toán thành công và Transaction ID.

**4. Nhóm Features (Tiện ích & Khách)**

- **UI-07: Facilities Catalog**
  - Grid view danh sách các tiện ích kèm ảnh.
- **UI-08: Booking Calendar**
  - Chọn ngày và khung giờ (Time slots).
- **UI-09: Visitor Management**
  - Form tạo mời khách.
  - Danh sách vé mời (Active/Expired).
- **UI-10: QR Ticket Display**
  - Hiển thị mã QR to rõ để đưa cho bảo vệ/gửi cho khách.

**5. Nhóm Account (Tài khoản)**

- **UI-11: Profile Settings**
  - Thông tin cá nhân.
  - Cài đặt nhận thông báo.
- **UI-12: Transaction History**
  - Bảng lịch sử giao dịch chi tiết.
