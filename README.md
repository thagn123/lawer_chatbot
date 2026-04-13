# ⚖️ Trợ Lý Pháp Lý AI (Legal RAG Chatbot Vietnam)

## 📖 Mô tả dự án
Đây là dự án xây dựng một hệ thống Chatbot tư vấn pháp luật thông minh sử dụng kỹ thuật RAG (Retrieval-Augmented Generation) chuyên biệt cho hệ thống văn bản pháp luật của Việt Nam. Hệ thống có khả năng ingest (đọc hiểu) các bộ luật gốc ở định dạng Word, sau đó sử dụng sức mạnh của trí tuệ nhân tạo (LLM) để trả lời, tư vấn trực tiếp cho người dùng bằng các trích dẫn điều khoản luật chính xác và uy tín.

**LƯU Ý QUAN TRỌNG (Dành cho triển khai AI Studio):** Tác vụ suy luận lõi của Agent (Logic LLM) được tối ưu hoá và bắt buộc sử dụng model model **`gpt-4o-mini` của OpenAI**. Mô hình này đáp ứng cực tốt việc suy luận nhanh, chính xác với chi phí rất tiết kiệm, tuân thủ chặt hệ thống prompt định hướng dành riêng cho Pháp Luật để không sinh ra ảo giác hay bịa thông tin.

---

## 🚀 Luồng hoạt động của hệ thống (Flow Code)
Dự án được kết cấu bài bản qua 4 giai đoạn xử lý luồng dữ liệu độc lập, nằm gọn trong thư mục `src/`:

### 1. Trích xuất văn bản thô (`src/extract_laws.py`)
- Quét các tài liệu Bộ luật, Nghị định định dạng Word (`.doc`, `.docx`) trong thư mục `craw_data/`. Tự động convert `.doc` cũ sang `.docx`.
- Phân tích cú pháp văn bản pháp quy: Quy tắc đọc Window Scanning tinh vi giúp nhận ra tên bộ luật dài nhiều dòng, tự động phân nhóm các cấp bậc: **Chương -> Mục -> Điều -> Khoản**.
- Xuất dữ liệu cấu trúc cực sạch (structured data) dưới định dạng JSON (`data/structured_laws.json`).

### 2. Phân tách theo logic phân cấp - Hierarchical Chunking (`src/chunking.py`)
- Thay vì dùng cách chia nhỏ text phổ thông hay chia bằng token dễ làm mất ngữ cảnh văn bản luật, dự án dùng logic bóc tách hướng lên (Bottom-up Contextualization).
- Ở mỗi đoạn (Chunk) luật nhỏ nhất (Khoản/Điều), mã nguồn tự động đính kèm thông tin gốc theo định dạng đồ sộ: *"[Tên Luật] -> [Chương] -> [Mục] -> [Điều] -> Phân tách nội dung chi tiết"*.
- Có thêm cơ chế *Fallback Recursive Splitter* để ngắt các câu luật quá khổ theo trật tự ngắt câu `(\n\n, dấu chấm)` linh hoạt.
- Kết quả lưu vào tệp `data/chunked_laws.json`. Cấu trúc này làm hệ thống RAG không bao giờ bị "mù lòa ngữ cảnh" khi nhúng thông tin.

### 3. Vector Hóa & Lưu Trữ DB (`src/store.py`)
- Sử dụng mô hình nhúng (Embedding Model) cục bộ là `paraphrase-multilingual-MiniLM-L12-v2` từ *Sentence-Transformers*. Đây là mạng nơ-ron miễn phí, chạy rất nhanh qua CPU và hỗ trợ tốt tiếng Việt.
- Chuyển toàn bộ Chunk luật thành véc-tơ đa chiều (Float32).
- Khởi tạo và lưu Vector Database qua **FAISS** sử dụng kĩ thuật `IndexFlatIP` (Cosine Similarity) để dò tìm sắc bén nhất.
- Xuất thành quả ra 2 tệp cho Agent sử dụng:  `data/law_vector_index.faiss` & `data/chunk_metadata.pkl`.

### 4. Trợ Lý AI Agent (`src/agent.py`)
- **Tích hợp API `gpt-4o-mini` (OpenAI)** đóng vai trò hạt nhân não bộ.
- Tiếp nhận câu hỏi người dùng theo thời gian thực (Real-time).
- Biến đổi câu hỏi thành vector, quét vào DB FAISS để trích xuất ra Top-K đoạn luật (Context) liên quan nhất.
- Nhét cả khối Context và Câu hỏi vào System Prompt chuyên biệt ép trí tuệ nhân tạo phải làm việc như "Một luật sư Việt Nam", lấy dữ kiện để trả lời, phải trích dẫn theo Điều khoản. Tuyệt đối được thiết lập chặn đứng mọi hành vi bịa đặt nếu hệ thống không cung cấp luật.
- Tốc độ trích xuất luồng câu qua giao diện hội thoại (Text Streaming) mượt mà như ChatGPT.

---

## 📂 Kiến trúc dự án
\`\`\`
.
├── craw_data/                # Thư mục lưu trữ văn bản luật gốc (Word, .docx)
├── data/                     # Thư mục chứa JSON & FAISS Vector DB đầu ra
├── src/                      # Source code hệ thống
│   ├── extract_laws.py       # Thu thập & xử lý cấu trúc
│   ├── chunking.py           # Phân tách nội dung Hierarchical Context
│   ├── store.py              # Đúc Vector với FAISS Local
│   └── agent.py              # Chạy Chatbot Agent bằng GPT-4o-mini
├── .env                      # [CẦN TẠO] Khóa mật khẩu bí mật api
├── requirements.txt          # Các gói cài đặt thư viện phụ thuộc
├── get_law_name.md           # [Bảo lưu] Giải pháp trích xuất tên luật
├── chunking.md               # [Bảo lưu] Lý thuyết Chunking logic
└── web_ui_roadmap.md         # Bản kế hoạch thiết lập lên giao diện Web cho nền tảng
\`\`\`

---

## 🔑 Khóa API & Setup Môi Trường
Để `agent.py` và luồng não bộ OpenAI nhận diện được tư cách hoạt động, bạn phải có biến môi trường OpenAI API Key.

1. Bạn cần tạo một file tên là `.env` ở đúng đường dẫn thư mục gốc.
2. Thêm nội dung sau vào file `.env` (thay các ký tự `sk-...` bằng API Key thật của bạn được cung cấp từ OpenAI Platform).
\`\`\`env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

---

## ⚙️ Hướng dẫn cài đặt & Chạy thủ công

**1. Cài đặt các Dependency:**
Mở Terminal/CMD ở thư mục nguồn dự án, chạy lệnh:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

**2. Tiền xử lý dữ liệu (Chỉ dùng khi cập nhật thêm luật mới):**
Nếu hệ thống đã có file `.faiss` ở trong vòng DB thì có thể bỏ qua bước này.
\`\`\`bash
python src/extract_laws.py
python src/chunking.py
python src/store.py
\`\`\`

**3. Khởi chạy RAG Agent Terminal:**
\`\`\`bash
python src/agent.py
\`\`\`

## 🌐 Triển khai giao diện (Deployment)
Hệ thống não bộ hiện tại tại file `src/agent.py` đã hoàn thiện đến mức độ có thể bọc qua FastAPI (Sử dụng Framework Back-End của Python) để làm API mở ra cho mọi hệ thống AI Studio của Frontend khác kết nối qua lại. Vui lòng tham khảo tệp \`web_ui_roadmap.md\` để nắm được cách nâng cấp bộ mã lên chuẩn Web Low-Code hoặc ứng dụng Full-stack.
