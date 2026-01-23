# TÀI LIỆU ĐẶC TẢ YÊU CẦU HỆ THỐNG NOVA (HOMIX)

**Dự án**: NOVA - Smart Living Solutions for Apartment Residents  
**Khóa học**: EXE202 - FPT University  
**Phiên bản**: 1.0 (MVP)  
**Ngày**: 23/01/2026

---

## 1. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

### 1.1 Quản lý Người dùng và Xác thực

#### FR-1.1: Đăng nhập bằng Google OAuth

- **Mô tả**: Người dùng có thể đăng nhập vào hệ thống bằng tài khoản Google.
- **Input**: Tài khoản Google (email).
- **Output**: Phiên đăng nhập hợp lệ, JWT token.
- **Quy tắc nghiệp vụ**:
  - Email phải tồn tại trong hệ thống (đã được Admin đăng ký trước).
  - Tự động liên kết email Google với thông tin cư dân trong database.
- **Độ ưu tiên**: 🔴 Cao (MVP)

#### FR-1.2: Quản lý phiên đăng nhập

- **Mô tả**: Hệ thống duy trì phiên đăng nhập và cho phép đăng xuất.
- **Quy tắc nghiệp vụ**:
  - Session timeout: 24 giờ.
  - Tự động refresh token khi sắp hết hạn.
- **Độ ưu tiên**: 🔴 Cao (MVP)

#### FR-1.3: Xem thông tin cá nhân

- **Mô tả**: Người dùng xem được thông tin cá nhân và căn hộ.
- **Output**: Tên, email, số điện thoại, mã căn hộ, tầng, block.
- **Độ ưu tiên**: 🟡 Trung bình (MVP)

---

### 1.2 Quản lý Phí Dịch vụ (Service Fees Management)

#### FR-2.1: Dashboard tổng quan

- **Mô tả**: Hiển thị tổng quan các khoản phí cần thanh toán.
- **Output**:
  - Tổng số tiền cần đóng tháng hiện tại.
  - Số lượng hóa đơn đến hạn.
  - Số lượng hóa đơn quá hạn.
- **Quy tắc nghiệp vụ**:
  - Chỉ hiển thị hóa đơn của căn hộ mà user đang sở hữu.
  - Cập nhật real-time khi có hóa đơn mới.
- **Độ ưu tiên**: 🔴 Cao (MVP)

#### FR-2.2: Danh sách hóa đơn

- **Mô tả**: Liệt kê tất cả hóa đơn của người dùng.
- **Chức năng**:
  - Lọc theo trạng thái: "Tất cả", "Chờ thanh toán", "Đã thanh toán", "Quá hạn".
  - Sắp xếp theo hạn chót (gần nhất → xa nhất).
- **Output**: Danh sách hóa đơn với: Tên phí, Số tiền, Hạn đóng, Trạng thái.
- **Độ ưu tiên**: 🔴 Cao (MVP)

#### FR-2.3: Chi tiết hóa đơn

- **Mô tả**: Xem chi tiết một hóa đơn cụ thể.
- **Output**:
  - Loại phí (Phí quản lý, Phí gửi xe, Điện, Nước...).
  - Kỳ thanh toán (Tháng/Năm).
  - Hạn chót thanh toán.
  - Số tiền.
  - Trạng thái (Chờ thanh toán / Đã thanh toán / Quá hạn).
  - Phân tích chi phí (nếu có).
- **Độ ưu tiên**: 🔴 Cao (MVP)

#### FR-2.4: Thanh toán hóa đơn (Mock)

- **Mô tả**: Người dùng đánh dấu hóa đơn đã thanh toán.
- **Input**: ID hóa đơn.
- **Output**:
  - Cập nhật trạng thái hóa đơn thành "Đã thanh toán".
  - Tạo bản ghi giao dịch giả lập.
- **Quy tắc nghiệp vụ**:
  - Chỉ cho phép đánh dấu hóa đơn có trạng thái "Chờ thanh toán".
  - Ghi nhận thời gian thanh toán.
- **Lưu ý**: Trong MVP không tích hợp cổng thanh toán thực tế.
- **Độ ưu tiên**: 🔴 Cao (MVP)

#### FR-2.5: Lịch sử thanh toán

- **Mô tả**: Xem lại các giao dịch đã thực hiện.
- **Output**:
  - Danh sách giao dịch: Ngày thanh toán, Tên hóa đơn, Số tiền, Phương thức.
  - Nhóm theo tháng.
- **Độ ưu tiên**: 🔴 Cao (MVP)

#### FR-2.6: Thông báo nhắc hạn

- **Mô tả**: Hiển thị badge số lượng hóa đơn chưa thanh toán.
- **Output**: Icon chuông với số đếm.
- **Quy tắc nghiệp vụ**:
  - Cập nhật real-time.
  - Chỉ đếm hóa đơn "Chờ thanh toán" và "Quá hạn".
- **Độ ưu tiên**: 🟡 Trung bình (MVP)

---

### 1.3 Quản lý Bảo trì & Sửa chữa (Future)

#### FR-3.1: Gửi yêu cầu sửa chữa

- **Mô tả**: Cư dân gửi yêu cầu sửa chữa/bảo trì.
- **Input**: Loại sự cố, Mô tả, Ảnh đính kèm.
- **Output**: Mã yêu cầu, Trạng thái "Đã tiếp nhận".
- **Độ ưu tiên**: ⚪ Thấp (Future)

#### FR-3.2: Theo dõi tiến độ

- **Mô tả**: Xem trạng thái xử lý yêu cầu.
- **Output**: Timeline: Đã tiếp nhận → Đang xử lý → Hoàn thành.
- **Độ ưu tiên**: ⚪ Thấp (Future)

---

### 1.4 Thông báo & Tin tức (Future)

#### FR-4.1: Bảng tin

- **Mô tả**: Hiển thị thông báo từ Ban quản lý.
- **Output**: Danh sách tin tức (Tiêu đề, Nội dung, Ngày đăng).
- **Độ ưu tiên**: ⚪ Thấp (Future)

#### FR-4.2: Chatbot AI

- **Mô tả**: Trợ lý ảo hỗ trợ trả lời câu hỏi.
- **Input**: Câu hỏi từ người dùng.
- **Output**: Câu trả lời tự động.
- **Độ ưu tiên**: ⚪ Thấp (Future)

---

## 2. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS)

### 2.1 Hiệu năng (Performance)

#### NFR-1.1: Thời gian tải trang

- **Yêu cầu**: Trang Dashboard phải tải xong trong vòng **< 2 giây** trên kết nối 4G.
- **Đo lường**: Sử dụng Lighthouse Performance Score ≥ 90.

#### NFR-1.2: Thời gian phản hồi API

- **Yêu cầu**:
  - API lấy danh sách hóa đơn: **< 500ms**.
  - API chi tiết hóa đơn: **< 300ms**.
- **Đo lường**: P95 response time.

#### NFR-1.3: Concurrent Users

- **Yêu cầu**: Hệ thống phải xử lý được **100 concurrent users** mà không giảm hiệu năng.

---

### 2.2 Khả năng sử dụng (Usability)

#### NFR-2.1: Mobile-First Design

- **Yêu cầu**: Giao diện phải tối ưu cho màn hình điện thoại (320px - 768px).
- **Đo lường**: Lighthouse Mobile Score ≥ 90.

#### NFR-2.2: Accessibility

- **Yêu cầu**: Tuân thủ WCAG 2.1 Level AA.
- **Đo lường**: Lighthouse Accessibility Score ≥ 85.

#### NFR-2.3: Đơn giản hóa

- **Yêu cầu**: Người dùng có thể hoàn thành thanh toán trong **≤ 3 bước**.

---

### 2.3 Bảo mật (Security)

#### NFR-3.1: Xác thực

- **Yêu cầu**: Sử dụng OAuth 2.0 (Google) và JWT token.
- **Thời gian sống token**: 24 giờ.

#### NFR-3.2: Phân quyền

- **Yêu cầu**: Cư dân chỉ xem được hóa đơn của căn hộ mình.
- **Cơ chế**: Middleware kiểm tra `user_id` và `apartment_id`.

#### NFR-3.3: HTTPS

- **Yêu cầu**: Toàn bộ traffic phải qua HTTPS.

#### NFR-3.4: Data Privacy

- **Yêu cầu**: Tuân thủ GDPR/PDPA (không chia sẻ thông tin cá nhân).

---

### 2.4 Độ tin cậy (Reliability)

#### NFR-4.1: Uptime

- **Yêu cầu**: Hệ thống phải đạt **99% uptime** trong giờ cao điểm (8h-22h).

#### NFR-4.2: Error Handling

- **Yêu cầu**:
  - Hiển thị thông báo lỗi rõ ràng cho người dùng.
  - Log lỗi vào hệ thống giám sát.

#### NFR-4.3: Data Backup

- **Yêu cầu**: Backup database hàng ngày (Neon Serverless tự động).

---

### 2.5 Khả năng mở rộng (Scalability)

#### NFR-5.1: Horizontal Scaling

- **Yêu cầu**: Backend có thể scale theo số lượng người dùng.
- **Giải pháp**: Sử dụng serverless (Vercel, Neon).

#### NFR-5.2: Database

- **Yêu cầu**: PostgreSQL phải hỗ trợ **≥ 10,000 hóa đơn/tháng**.

---

### 2.6 Khả năng bảo trì (Maintainability)

#### NFR-6.1: Code Quality

- **Yêu cầu**:
  - TypeScript strict mode.
  - Biome lint pass 100%.
  - Test coverage ≥ 70% (Future).

#### NFR-6.2: Documentation

- **Yêu cầu**:
  - API documentation (Swagger/OpenAPI).
  - README với hướng dẫn setup.

---

## 3. CÁC VẤN ĐỀ CẦN THỐNG NHẤT VÀ HỖ TRỢ (STAKEHOLDER ALIGNMENT)

### 3.1 Vấn đề cần quyết định

#### ISSUE-1: Tích hợp thanh toán thực tế

- **Hiện trạng**: MVP chỉ mock thanh toán.
- **Câu hỏi**: Có cần tích hợp PayOS/VNPay trong giai đoạn sau không?
- **Stakeholder**: Product Owner, Dev Team.
- **Deadline**: Sau khi MVP hoàn thành.

#### ISSUE-2: Quản lý căn hộ

- **Hiện trạng**: Chưa có UI cho Admin tạo căn hộ và gán user.
- **Câu hỏi**: Admin tạo căn hộ qua Dashboard hay SQL trực tiếp?
- **Stakeholder**: Admin, Dev Team.
- **Quyết định tạm thời**: SQL trực tiếp trong MVP.

#### ISSUE-3: Notification System

- **Hiện trạng**: Chưa có push notification.
- **Câu hỏi**: Sử dụng email hay push notification (Firebase)?
- **Stakeholder**: Product Owner, Dev Team.
- **Quyết định tạm thời**: Email notification (Future).

---

### 3.2 Hỗ trợ cần thiết từ Stakeholders

#### SUPPORT-1: Dữ liệu mẫu

- **Yêu cầu**: Cần danh sách căn hộ thực tế và loại phí từ Ban quản lý.
- **Stakeholder**: Ban quản lý chung cư.
- **Trạng thái**: Đang chờ.

#### SUPPORT-2: Thiết kế UI/UX

- **Yêu cầu**: Hoàn thiện wireframes cho màn hình History và Profile.
- **Stakeholder**: Designer.
- **Trạng thái**: Đã có bản nháp (Canva).

#### SUPPORT-3: Hosting & Domain

- **Yêu cầu**:
  - Frontend: Vercel (Free tier).
  - Backend: Railway/Render (Free tier).
  - Database: Neon Serverless (Free tier).
- **Stakeholder**: DevOps/Admin.
- **Trạng thái**: Đã setup Neon.

---

### 3.3 Rủi ro và Giải pháp

#### RISK-1: Người dùng quên mật khẩu Google

- **Mức độ**: Thấp.
- **Giải pháp**: Hướng dẫn reset qua Google Account Recovery.

#### RISK-2: Database connection timeout

- **Mức độ**: Trung bình.
- **Giải pháp**:
  - Sử dụng connection pooling.
  - Retry logic trong API.

#### RISK-3: Thiếu dữ liệu test

- **Mức độ**: Cao.
- **Giải pháp**: Tạo mock data script để seed database.

---

## 4. PHẠM VI NGOÀI DỰ ÁN (OUT OF SCOPE)

Các chức năng sau **KHÔNG** được triển khai trong MVP:

1. ❌ Tích hợp thanh toán thực tế (PayOS, VNPay).
2. ❌ Quản lý sửa chữa/bảo trì (chỉ có UI demo).
3. ❌ IoT sensors và AI anomaly detection.
4. ❌ Dashboard quản lý cho Admin (Backend only).
5. ❌ Push notification (chỉ có email).
6. ❌ Multi-language support.
7. ❌ Dark mode.

---

## 5. TIÊU CHÍ CHẤP NHẬN (ACCEPTANCE CRITERIA)

### 5.1 Chức năng

- [ ] Người dùng đăng nhập thành công bằng Google.
- [ ] Dashboard hiển thị đúng tổng tiền và số lượng hóa đơn.
- [ ] Danh sách hóa đơn lọc và sắp xếp chính xác.
- [ ] Chi tiết hóa đơn hiển thị đầy đủ thông tin.
- [ ] Thanh toán (mock) cập nhật trạng thái hóa đơn.
- [ ] Lịch sử giao dịch hiển thị đúng dữ liệu.

### 5.2 Phi chức năng

- [ ] Lighthouse Performance Score ≥ 90.
- [ ] Mobile responsive (320px - 1920px).
- [ ] Không có TypeScript errors.
- [ ] Biome lint pass 100%.
- [ ] API response time < 500ms.

---

## 6. PHỤ LỤC

### 6.1 Thuật ngữ (Glossary)

| Thuật ngữ        | Định nghĩa                                        |
| ---------------- | ------------------------------------------------- |
| **Bill**         | Hóa đơn phí dịch vụ (Phí quản lý, Phí gửi xe...). |
| **Transaction**  | Giao dịch thanh toán.                             |
| **Apartment**    | Căn hộ (Unit).                                    |
| **Fee Type**     | Loại phí (Management, Parking, Electricity...).   |
| **Due Date**     | Hạn chót thanh toán.                              |
| **Mock Payment** | Thanh toán giả lập (không qua cổng thực tế).      |

### 6.2 Tham khảo

- [Neon Auth Documentation](https://neon.com/docs/guides/neon-auth)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Drizzle ORM](https://orm.drizzle.team)

---

**Ngày cập nhật**: 23/01/2026  
**Người soạn**: NOVA Team - EXE202  
**Phê duyệt**: [Pending]
