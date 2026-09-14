# 🌻 Sunflower English Garden — Trường Tiểu học Lê Kim Lăng • Mrs. Huong

> **Slogan:** *"Mỗi câu lệnh là một tia nắng, mỗi nụ cười là một đóa hướng dương nở rộ."*  
> **Sáng kiến phát triển chuyên môn sư phạm (2025–2035)** — Dấu ấn tâm huyết của cô **Lê Thị Thu Hương (Mrs. Huong)** cùng tập thể sư phạm Trường Tiểu học Lê Kim Lăng.

---

## 🌟 Giới Thiệu Ứng Dụng

**Sunflower English Garden** là hệ sinh thái rèn luyện tiếng Anh sư phạm (Classroom English), cử chỉ hình thể (TPR), tiếng Anh dạy môn Toán, giao tiếp đồng nghiệp và AI trợ giảng thông minh dành riêng cho giáo viên tiểu học.

Ứng dụng được thiết kế tối ưu hóa theo tài liệu chỉ đạo chuyên môn:
1. **Chủ đề Hoa Hướng Dương (Sunflower Theme):** Tone màu vàng ấm - trắng tinh khôi, biểu tượng của sự kiên định, ấm áp và luôn hướng về phía mặt trời.
2. **5 Mô-đun 2.0 theo yêu cầu:**
   - **10 Khẩu lệnh trọng tâm theo tháng** (Bảng 1 trong kế hoạch).
   - **16 Mẫu câu Tiếng Anh dạy môn Toán chuẩn hóa** (Bảng 4).
   - **12 Mẫu câu Giao tiếp đồng nghiệp văn minh** (Bảng 5).
   - **Sunflower Arcade:** 3 trò chơi tương tác (Lật thẻ thông minh, Nối âm thanh, Xử lý tình huống sư phạm thực tế).
   - **AI Soạn câu lệnh theo bài học (Lesson Command Generator):** Tích hợp Google Gemini 3 Flash / 3.5 Flash giúp giáo viên tạo bộ câu lệnh theo chuẩn sách K-5 chỉ trong 3 giây.
   - **Vườn hoa Hướng Dương cá nhân hóa:** Cây hoa lớn dần theo tiến độ thực hành từ Hạt mầm -> Nảy mầm -> Nụ hoa -> Nở rộ -> Hoa Hướng Dương Vàng rực rỡ.
3. **Phản xạ Voice AI & Lời động viên ấm áp của Mrs. Huong:** 10 câu động viên chân thành theo Bảng 3, truyền cảm hứng tự tin cho giáo viên.
4. **Bàn phím Mini Floating Dock:** Thanh điều hành lớp học trực tiếp 1 tay trên bục giảng (Chuông Chime, Khen thưởng Magic Wand/Applause, Đếm ngược 5s, Eyes on me).
5. **Bộ đếm lượt truy cập server-side:** Tích hợp `counterapi.dev` hiển thị lượt giáo viên truy cập thực tế.
6. **Chứng chỉ số A4 trang trọng:** Khảo sát năng lực và xuất file in chứng chỉ chuẩn mực Trường Tiểu học Lê Kim Lăng.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local)

### Yêu Cầu Tiên Quyết
- [Node.js](https://nodejs.org/) phiên bản 18 trở lên (khuyến nghị Node 20 hoặc 22).

### Các Bước Thực Hiện
```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Kiểm tra type và cú pháp
npm run lint

# 3. Chạy môi trường phát triển (Development Server)
npm run dev
```
Truy cập trình duyệt tại địa chỉ: `http://localhost:5173`

---

## 🔑 Cấu Hình Google AI API Key

Ứng dụng hỗ trợ cả **Google AI Studio API** (`gemini-3.6-flash`, `gemini-3.5-flash`, `gemini-2.5-flash`) và **Agent Platform API**.
- Nhấp vào biểu tượng chìa khóa **"Cài đặt API Key"** trên thanh Menu để nhập khóa cá nhân.
- Hỗ trợ cả định dạng key cũ `AIzaSy...` và key xác thực mới `AQ...`.
- Tự động cơ chế **Fallback 6 cấp độ** phòng chống lỗi quá tải 503/429.
- Không cần nhập key vẫn có thể sử dụng chế độ **Mô phỏng sư phạm Offline thông minh** với 100% chức năng.

---

## 📦 Hướng Dẫn Đưa Lên GitHub & Deploy Qua Vercel

### Bước 1: Đưa Code Lên GitHub
```bash
# Khởi tạo git repository (nếu chưa có)
git init
git add .
git commit -m "feat: Sunflower English Garden v2.0 - Le Kim Lang Primary School"

# Đặt nhánh chính là main
git branch -M main

# Thêm remote và push lên GitHub của bạn
git remote add origin https://github.com/YOUR_USERNAME/sunflower-english-garden.git
git push -u origin main
```

### Bước 2: Deploy Trên Vercel
1. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
2. Bấm **"Add New Project"** -> Chọn repository vừa push lên.
3. Vercel sẽ tự động nhận diện:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. (Tùy chọn) Trong mục **Environment Variables**, bạn có thể thêm:
   - `VITE_GEMINI_API_KEY`: Khóa Gemini API của bạn (nếu muốn đặt mặc định).
5. Bấm **Deploy**. Sau khoảng 1 phút, website sẽ hoạt động hoàn hảo với file định tuyến `vercel.json` SPA rewrite đã được cấu hình sẵn.

---

## 🏛️ Bản Quyền & Tác Quyền

- **Đơn vị phát triển:** Trường Tiểu học Lê Kim Lăng.
- **Cố vấn chuyên môn:** Cô Lê Thị Thu Hương (Mrs. Huong).
- **Giai đoạn phát triển:** 2025 – 2035.
- Dành tặng tất cả các thầy cô giáo tiểu học trên mọi miền Tổ quốc! 🌻
