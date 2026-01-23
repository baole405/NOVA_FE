# NOVA (Homix) - Functional Specification

> **Tài liệu mô tả chức năng chi tiết**  
> Dự án: NOVA (Homix) - EXE202  
> Phiên bản: 1.0 (MVP Focus)

---

## 1. Tổng quan

Tài liệu này mô tả chi tiết các chức năng của hệ thống quản lý chung cư NOVA, tập trung vào giải quyết vấn đề cốt lõi: **Quản lý và thanh toán phí dịch vụ**.

### Phân loại chức năng

- **🟢 MVP (Core)**: Các chức năng bắt buộc phải có trong giai đoạn hiện tại (EXE202).
- **⚪ Future**: Các chức năng mở rộng cho các giai đoạn phát triển sau.

---

## 2. Actors (Người dùng)

| Actor                   | Mô tả                 | Quyền hạn chính                                                         |
| ----------------------- | --------------------- | ----------------------------------------------------------------------- |
| **Resident (Cư dân)**   | Người sống tại căn hộ | Xem hóa đơn, thanh toán, nhận thông báo, xem lịch sử.                   |
| **Admin (Ban quản lý)** | Người vận hành        | Tạo hóa đơn, gửi thông báo, quản lý căn hộ (Backend/Dashboard quản lý). |

---

## 3. Chức năng chi tiết

### 3.1 Authentication & User Profile

**Trạng thái**: 🟢 MVP

| ID          | Tên chức năng             | Mô tả chi tiết                                                                                             |
| ----------- | ------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **AUTH-01** | **Đăng nhập Google**      | Người dùng đăng nhập bằng tài khoản Google. Hệ thống tự động liên kết email với thông tin cư dân trong DB. |
| **AUTH-02** | **Session Management**    | Tự động duy trì phiên đăng nhập. Logout an toàn.                                                           |
| **PROF-01** | **Xem thông tin cá nhân** | Hiển thị tên, email, số điện thoại.                                                                        |
| **PROF-02** | **Thông tin căn hộ**      | Hiển thị mã căn hộ, tầng, block tòa nhà user đang ở.                                                       |

---

### 3.2 Service Fees Management (Quản lý Phí)

**Trạng thái**: 🟢 MVP (Trọng tâm)

Đây là module quan trọng nhất giải quyết "Core Problem".

| ID         | Tên chức năng           | Mô tả chi tiết                                                                                                  |
| ---------- | ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| **FEE-01** | **Dashboard Tổng quan** | Hiển thị ngay khi login: Tổng tiền cần đóng tháng này, số lượng hóa đơn đến hạn/quá hạn.                        |
| **FEE-02** | **Danh sách hóa đơn**   | Liệt kê tất cả hóa đơn. Bộ lọc: "Tất cả", "Chờ thanh toán", "Đã thanh toán". Sắp xếp theo hạn chót (Mới → Cũ).  |
| **FEE-03** | **Chi tiết hóa đơn**    | Xem chi tiết 1 hóa đơn: Loại phí, Kỳ thanh toán (Tháng/Năm), Hạn chót, Số tiền, Trạng thái.                     |
| **FEE-04** | **Thanh toán (Mock)**   | Nút "Thanh toán ngay". Trong MVP: Chuyển trạng thái hóa đơn sang "Đã thanh toán" và ghi nhận giao dịch giả lập. |
| **FEE-05** | **Lịch sử thanh toán**  | Xem lại các giao dịch cũ: Ngày trả, Số tiền, Hình thức thanh toán (Bank/E-wallet).                              |
| **FEE-06** | **Badge Nhắc hạn**      | Hiển thị số lượng hóa đơn chưa đóng trên icon chuông hoặc menu điều hướng.                                      |

---

### 3.3 Repair & Maintenance (Bảo trì & Sửa chữa)

**Trạng thái**: ⚪ Future (Có UI Demo, chưa logic sâu)

| ID          | Tên chức năng        | Mô tả chi tiết                                                            |
| ----------- | -------------------- | ------------------------------------------------------------------------- |
| **MAIN-01** | **Gửi yêu cầu**      | Form điền thông tin sự cố (điện, nước...), đính kèm ảnh chụp hiện trường. |
| **MAIN-02** | **Theo dõi tiến độ** | Xem trạng thái yêu cầu: "Đã tiếp nhận" → "Đang xử lý" → "Hoàn thành".     |
| **MAIN-03** | **Đánh giá**         | Rate sao và comment sau khi thợ hoàn thành sửa chữa.                      |

---

### 3.4 Feedback & Communication (Phản ánh & Tin tức)

**Trạng thái**: ⚪ Future

| ID          | Tên chức năng            | Mô tả chi tiết                                                                        |
| ----------- | ------------------------ | ------------------------------------------------------------------------------------- |
| **COMM-01** | **Bảng tin (News Feed)** | Admin đăng thông báo (cắt nước, bảo trì thang máy...). Cư dân nhận được notification. |
| **COMM-02** | **Gửi phản ánh**         | Gửi khiếu nại về dịch vụ chung (vệ sinh, an ninh).                                    |
| **COMM-03** | **Chatbot AI (Mixabo)**  | Chatbot hỗ trợ trả lời các câu hỏi thường gặp (Quy định, giờ giấc, hotline...).       |

---

## 4. Yêu cầu Phi chức năng (Non-functional)

1.  **Giao diện (UI/UX)**:
    - Mobile-first: Tối ưu cho trải nghiệm trên điện thoại.
    - Clean & Simple: Hạn chế thao tác thừa, tập trung vào việc đóng tiền nhanh.
    - Màu sắc: Sử dụng tông xanh (Blue/Cyan) tạo cảm giác tin cậy, hiện đại.

2.  **Hiệu năng (Performance)**:
    - Tải danh sách hóa đơn < 1s.
    - Phản hồi thao tác người dùng tức thì (Optimistic UI).

3.  **Bảo mật (Security)**:
    - Chỉ cư dân đã xác thực mới xem được hóa đơn của mình.
    - Bảo vệ API bằng JWT Token.

---

## 5. Quy trình nghiệp vụ chính (MVP Flow)

**Kịch bản: Cư dân thanh toán phí tháng**

1.  Cư dân nhận thông báo (email/push) có phí mới.
2.  Mở web app → Login Google.
3.  Vào **Dashboard** thấy "Tổng tiền: 1,500,000đ".
4.  Click vào "Xem chi tiết" → Chuyển sang **Danh sách hóa đơn**.
5.  Chọn hóa đơn "Phí quản lý T1/2026".
6.  Xem chi tiết → Nhấn "Thanh toán".
7.  Hệ thống xử lý (giả lập) → Thông báo "Thành công".
8.  Hóa đơn cập nhật trạng thái "Đã thanh toán".
9.  Giao dịch lưu vào **Lịch sử**.
