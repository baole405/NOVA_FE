# NOVA Screen Flow

## Navigation Map

Biểu đồ dưới đây mô tả luồng di chuyển giữa các màn hình trong ứng dụng NOVA (Mobile/Web App).

```mermaid
flowchart TD
    %% Nodes
    Splash[Splash Screen]
    Login[Login Screen]
    Dashboard[resident Dashboard]

    subgraph Auth
        Splash --> Login
    end

    subgraph Core Features
        Dashboard --> Bills[Bills List]
        Dashboard --> History[Transaction History]
        Dashboard --> Profile[Profile Settings]
    end

    subgraph Bills Flow
        Bills -->|Select Bill| BillDetail[Bill Detail Modal]
        BillDetail -->|Click Pay| PaymentGateway[Mock Payment]
        PaymentGateway -->|Success| PaymentSuccess[Success Screen]
        PaymentSuccess --> Bills
    end

    subgraph Facilities Flow
        Dashboard --> Facilities[Facilities Catalog]
        Facilities -->|Select Facility| FacilityDetail[Facility Detail]
        FacilityDetail -->|Book| SlotPicker[Time Slot Picker]
        SlotPicker -->|Confirm| BookingSuccess[Booking Confirmed]
        Dashboard --> MyBookings[My Bookings]
    end

    subgraph Visitor Flow
        Dashboard --> Visitors[Visitor Management]
        Visitors -->|Create| InviteForm[Invite Guest Form]
        InviteForm -->|Submit| TicketView[QR Ticket View]
        Visitors -->|View| TicketView
    end

    subgraph Community Flow
        Dashboard --> News[News Feed]
        Dashboard --> SOS[SOS / Emergency]
    end

    %% Connections
    Profile --> Login
    PaymentSuccess --> History
```

## Screen Descriptions

1.  **Splash Screen**: Logo NOVA, loading state.
2.  **Login Screen**: "Sign in with Google" button.
3.  **Resident Dashboard**: Trung tâm điều khiển chính.
    - Bottom Tab Bar: Home, Bills, Facilities, Profile.
4.  **Bills List**: Danh sách hóa đơn (Tabs: Unpaid, All).
5.  **Bill Detail**: Chi tiết phí, nút thanh toán.
6.  **Facilities Catalog**: Danh sách tiện ích (Grid view).
7.  **Invite Guest Form**: Form nhập thông tin khách.
8.  **QR Ticket View**: Hiển thị mã QR để chia sẻ.
