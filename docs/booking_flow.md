# Facility Booking Module - Implementation Plan

## 1. Context

Tính năng **"Đặt tiện ích" (Facility Booking)** cho phép cư dân đặt trước các không gian chung.
Hạng mục đầu tiên triển khai: **Khu nướng BBQ (BBQ Zone)**.

## 2. User Journey (Luồng đặt tiệc BBQ)

1.  **Khám phá**: Cư dân vào mục "Tiện ích", xem danh sách (Hồ bơi, BBQ, Gym...). Chọn **BBQ Zone**.
2.  **Kiểm tra lịch**: Hệ thống hiển thị lịch (Calendar) với các khung giờ còn trống.
    - _Ví dụ_: BBQ Zone A đã kín lịch tối Thứ 7, nhưng còn trống tối Chủ Nhật.
3.  **Đặt chỗ**:
    - Chọn khung giờ (Ví dụ: 18:00 - 21:00).
    - Nhập ghi chú: "Tiệc sinh nhật bé Na".
4.  **Xác nhận**:
    - Hệ thống kiểm tra lại conflict (tránh double booking).
    - Tự động xác nhận (Auto-confirm) nếu hợp lệ.
    - Trừ vé/credit (nếu có - Future).
5.  **Quản lý**: Xem lại booking trong "Lịch của tôi". Có thể hủy trước giờ hẹn 2 tiếng.

---

## 3. Business Logic

- **Slot Validation**: Không cho phép đặt trùng giờ (Overlap check).
  - `NewStart < ExistingEnd` AND `NewEnd > ExistingStart`
- **Operating Hours**: Chỉ cho phép đặt trong giờ hoạt động (VD: 08:00 - 22:00).
- **Quota**: (Optional MVP) Mỗi căn hộ chỉ được đặt tối đa 2 slot BBQ/tuần.

---

## 4. Database Schema Design

Cần thêm 2 bảng mới: `facilities` và `bookings`.

```sql
CREATE TABLE facilities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL, -- "BBQ Zone A"
  description TEXT,
  location VARCHAR(100),      -- "Tầng thượng Block B"
  capacity INTEGER,           -- 20 người
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  facility_id INTEGER REFERENCES facilities(id),

  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,

  status VARCHAR(50) DEFAULT 'confirmed', -- confirmed | cancelled | pending
  purpose VARCHAR(255),
  notes TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Constraint: Đảm bảo EndTime > StartTime
  CONSTRAINT check_dates CHECK (end_time > start_time)
);
```

---

## 5. API Endpoints

1.  `GET /api/facilities`: Danh sách tiện ích.
2.  `GET /api/facilities/:id/slots?date=2026-01-25`: Lấy danh sách slot đã đặt trong ngày.
3.  `POST /api/bookings`: Tạo booking mới.
4.  `GET /api/bookings/my`: Lịch sử đặt chỗ của tôi.
5.  `PATCH /api/bookings/:id/cancel`: Hủy.

---

## 6. Frontend UI Components

1.  **Facility Card**: Ảnh, tên, vị trí, sức chứa.
2.  **Time Slot Picker**: Giao diện chọn giờ trực quan (như Google Calendar).
3.  **Booking Modal**: Form xác nhận thông tin.
