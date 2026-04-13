# YÊU CẦU XÂY DỰNG FRONTEND & TÍCH HỢP GIAO DIỆN (PROMPT DÀNH CHO AI BUILDER)

> **Hướng dẫn cho bạn:** Hãy chép toàn bộ nội dung trong file này dán vào giao diện chat của các công cụ AI tạo Website (như v0.dev, Bolt.new, Lovable, Claude Artifacts, hoặc Cursor) để AI tự động đẻ ra toàn bộ mã nguồn Frontend cho dự án Web của bạn.

---
*(Bắt đầu copy từ đây)*

**ROLE:** 
Bạn là một Fullstack Expert Developer xuất sắc với tư duy Thẩm mỹ UI/UX đỉnh cao. Bạn đang tiếp nhận nhiệm vụ xây dựng Giao diện người dùng (Frontend Web) và cổng API backend cho một trợ lý ảo "Luật Sư AI" (Legal RAG Chatbot) chuyên nghiệp.

## 1. BỐI CẢNH DỰ ÁN
Bộ não cốt lõi của Chatbot bằng Python hiện đã hoàn thiện (xử lý RAG bằng FAISS Vector + mô hình LLM gpt-4o-mini của OpenAI). Tên file não bộ đã có sẵn trên máy là `src/agent.py` chứa hàm trích xuất là `search_legal_docs()` và client openai. 
Bây giờ, hệ thống cần được bao bọc dưới dạng Web App để phục vụ người dùng cuối thay vì chạy qua CLI Terminal.

## 2. YÊU CẦU CÔNG NGHỆ CHỈ ĐỊNH
- **Frontend:** Sử dụng React.js (hoặc Next.js App Router).
- **Styling:** Bắt buộc dùng TailwindCSS. Có thể ứng dụng thêm thiết kế của thư viện shadcn/ui để các Form kiểm soát, nút bấm, thông báo nhìn uy tín và mượt mà.
- **Backend API:** Sử dụng FastAPI của Python để tạo trạm kết nối cổng localhost.

## 3. YÊU CẦU VỀ THIẾT KẾ UI/UX (RẤT QUAN TRỌNG)
Tôi muốn giao diện làm người dùng phải "WOW" và toát lên khí chất Đẳng Cấp, Cao Cấp và Chuyên Nghiệp của ngành Luật:
- **Bố cục (Layout):** Một cửa sổ Chat bung toàn màn hình kiểu ChatGPT hiện đại. Phía bên trái có thể có thanh Sidebar mảnh mai (chứa các đoạn chat cũ hoặc thông tin hệ thống). Khu vực trung tâm là khung tin nhắn, dưới cùng là thanh nhập Text input dính sát khung dưới.
- **Màu sắc (Color Palette):** Sử dụng tông màu "Luật Sư" sang trọng. Khuyến nghị nền nền tối pha ánh xanh Slate đậm (Dark mode) kết hợp với các vệt màu Vàng Gold nhạt hoặc Trắng Kem (Đại diện cho cán cân công lý) để tạo cảm giác uy nghiêm.
- **Hiệu ứng (Animations):** Thêm các micro-animations cực mượt khi bấm vào nút Send. Khi AI đang suy nghĩ, cần có biểu tượng "Luật sư đang tra cứu Bộ Luật..." nhấp nháy hoặc loading spinner xịn xò.
- **Tin nhắn:** Tin nhắn của Bot AI căn lề trái (màu nền tối chìm), tin nhắn của Người dùng căn lề phải (màu xanh navy hoặc vàng gold tĩnh). Cửa sổ chat phải tự động scroll xuống dưới khi có tin nhắn mới. Hỗ trợ hiển thị và định dạng được chữ in đậm, xuống dòng trong bong bóng chat Bot.

## 4. ĐẶC TẢ GIAO TIẾP API (DATA FLOW)
Phía Frontend khi người dùng bấm Gửi (Send) phải thực hiện một thao tác REST API theo đúng chuẩn sau:
- **Endpoint:** `POST http://localhost:8000/api/chat`
- **Headers:** `{"Content-Type": "application/json"}`
- **Body Input (JSON):**
  ```json
  {
    "query": "Tin nhắn câu hỏi người dùng vừa gõ"
  }
  ```
- **Response Output (JSON):** Server sẽ trả về cục dữ liệu có giao thức:
  ```json
  {
    "reply": "Nội dung câu trả lời của AI"
  }
  ```
- Frontend bắt buộc lấy biến string trong "reply" hiển thị lên thành bong bóng chat bot. Cần xử lý kịch bản `try/catch` hiện thông báo Alert/Toast màu đỏ nếu API tịt ngòi hoặc không kết nối được tới Backend.

## 5. CÁC TỆP MÃ NGUỒN (FILES) BẠN CẦN TẠO RA CHO TÔI:
Xin hãy code cho tôi 2 khối file sau:

**A. KHỐI BACKEND (SERVER PYTHON API):**
- Xin hãy sinh ra code cho file `src/server.py` sử dụng thư viện `FastAPI`.
- Mở CORS (tất cả Allow Origin = `*`) để Frontend kết nối không bị chặn.
- Ở function API Endpoint `/api/chat`, giả lập kịch bản Import cấu trúc hàm gọi não bộ cũ như sau (bạn chỉ cần viết code ví dụ mẫu gọi hàm này, không cần code lại RAG vì tôi đã có rồi):
  ```python
  # (Đoạn này đã có bên máy tôi, AI hãy tự import vào code FastAPI nhé)
  # from src.agent import search_legal_docs, client, SYSTEM_PROMPT
  ```
  Nhận request `query`, gọi API open AI gpt-4o-mini sinh chữ lấy `reply` trả vào file JSON.

**B. KHỐI FRONTEND (REACT/WEB APP):**
- Sinh ra code Cấu trúc Component đầy đủ cho Giao diện Chat. Bao gồm File Main/Page, Component Nút bấm, Ô chat (Chat Bubble), Cây DOM thư mục cấu trúc tĩnh với CSS Tailwind tuyệt đẹp kèm hàm `handleSendMessage` fetch API chuẩn luồng 4.

**Hành động tiếp theo:** Vui lòng suy nghĩ thiết kế và viết ra toàn bộ các File code đầy đủ nhất dựa trên bản yêu cầu trên.
*(Kết thúc việc Copy)*
----------
