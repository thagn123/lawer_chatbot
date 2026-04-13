# Lộ Trình Đưa RAG Chatbot Lên Giao Diện Web (Web UI)

Để biến mã nguồn Python dạng dòng lệnh (CLI) ở thư mục `src/agent.py` thành một ứng dụng web hoạt động mượt mà như ChatGPT, bạn sẽ có các hướng đi từ cơ bản (nhanh nhất) đến chuyên nghiệp (Scale lớn). Dưới đây là những thứ bạn cần:

---

## Lựa chọn 1: Dùng hệ sinh thái Low-code Python (Dành cho bản thử nghiệm/Nội bộ)

Nếu bạn chỉ muốn có một giao diện cửa sổ Chat lộng lẫy trong thời gian ngắn nhất (Chỉ tốn vài chục phút) mà không phải học cách code Web Frontend (HTML/CSS/JS), hãy sử dụng các thư viện Low-Code của Python.

**Những thứ bạn cần cài đặt:**
1. **Streamlit** (`pip install streamlit`): Công cụ số 1 thế giới AI để vẽ giao diện web bằng Python thuần. Bạn có thể chắp vá các components như "Tin nhắn người dùng", "Tin nhắn Bot" cực kỳ trơn tru.
2. **Chainlit** (`pip install chainlit`): Chuyên môn hóa đặc biệt mảng Chatbot LLM, hỗ trợ sẵn tính năng Streaming (hiển thị từng chữ), giao diện bong bóng chat y hệt ChatGPT mà không cần setup phức tạp.

**Quy trình kết nối:**
Bạn chỉ cần tạo một file `app.py`, gắn hàm `search_legal_docs` và thiết lập kết nối OpenAI từ thư mục `src/agent.py` sang. Sau đó dùng lệnh rẽ nhánh của UI (như `st.chat_message()` của Streamlit) để bọc lại khối LLM.

---

## Lựa chọn 2: Cấu trúc Fullstack API + Frontend (Chuẩn thương mại - Sản phẩm thực tế)

Nếu bạn muốn tạo một website thương mại, cho phép hệ thống chịu tải với nhiều người dùng khác nhau đăng nhập, lưu lại lịch sử tin nhắn và có giao diện (UI/UX) lộng lẫy tùy ý tinh chỉnh, thì bạn phải tách riêng 2 mảng: **Backend (Xử lý não bộ)** và **Frontend (Giao diện hiển thị)**.

### A. Đối với Backend (Phần não bộ):
Bạn KHÔNG THỂ để hệ thống chạy bằng cái vòng lặp `while True:` được nữa. Thay vào đó bạn cần một bộ khởi tạo API.
- Cần cài đặt **FastAPI** (`pip install fastapi uvicorn`): Đây là Framework siêu nhẹ và siêu tốc độ của Python.
- Công dụng: Quấn ứng dụng `src/agent.py` lại thành một HTTP API (Ví dụ đường dẫn `POST /chat`). Cứ Web Giao Diện đẩy 1 câu hỏi lên URL đó bằng định dạng JSON, FastAPI sẽ kích hoạt nhúng câu hỏi, đào FAISS DB, lấy phản hồi từ OpenAI rồi nhả (Return) kết quả ra cho Web.
- Bạn sẽ phải đổi hệ thống trả kết quả Stream của OpenAI thành một mô hình **Server-Sent Events (SSE)** hoặc **WebSockets** để chữ hiện trơn tru ra trên giao diện người dùng theo thời gian thực (giống Chat GPT), chứ không phải ngâm bot suy nghĩ 5 giây rồi mới lòi ra một đoạn văn dài.

### B. Đối với Frontend (Giao diện người dùng):
Bạn sẽ phải code lại nguyên một nền tảng Web trên ngôn ngữ **Javascript / Typescript**.
- Khuyên dùng: **ReactJS** hoặc **Next.js**. 
- Thư viện tối thượng: **Vercel AI SDK**. Giúp bạn kết nối thẳng vào FastAPI ở phía Backend kia với móc khóa móc giao diện Chat UI ra chỉ bằng vài dòng (`useChat`).
- Giao diện (CSS): Dùng framework **TailwindCSS** kết hợp với **Shadcn UI** để mang lại phong cách thẩm mỹ tối tân, màu sắc mượt mà nhất.

---

## Nền tảng AI tự động tạo Code (Như v0.dev, Bolt.new, Claude Artifacts, AI Studio)

Đây là một hướng giải quyết **hiện đại, năng suất nhất** trong năm nay. Bạn hoàn toàn có thể yêu cầu trí tuệ nhân tạo thiết kế giao diện theo ý mình ("Vẽ cho tôi một cửa sổ chat phong cách luật sư tối màu, xịn xò"), sau đó tải về các file Zip chứa code gốc (bằng ReactJS hoặc HTML/CSS/JS thuần). 

Tuy nhiên, giao diện đó chỉ là một **bức tranh rỗng (Mock UI)**. Để làm cho giao diện đó hoạt động với "Não bộ" Luật Sư mà chúng ta vừa đúc kết trong `agent.py`, hãy thực hiện 3 công đoạn sau:

**1. Lược đồ file Backend (Phần Hậu Cần Python):**
Sau khi tải hệ thống UI về, Python không thể chạy theo vòng lặp bằng Terminal đen xì. Bạn phải viết file `src/server.py` thay thế hàm chat, biến nó thành trạm phát sóng (API).
Cụ thể, file `server.py` sẽ sử dụng FastAPI:

```python
# Tệp: src/server.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import search_legal_docs, client, SYSTEM_PROMPT # Import "não bộ" cũ sang

app = FastAPI()

# BẮT BUỘC: Mở cửa khẩu (CORS) để trình duyệt web không chặn kết nối
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Cho phép Frontend từ mọi host truy cập tới
    allow_methods=["*"],
    allow_headers=["*"],
)

# Kiểu dữ liệu nhận vào (Nơi Frontend sẽ vứt câu hỏi qua chữ "query")
class ChatRequest(BaseModel):
    query: str

@app.post("/api/chat")
async def chat_api(request: ChatRequest):
    # 1. Đi nhúng và tìm luật từ FAISS
    context = search_legal_docs(request.query)
    prompt = f"TÀI LIỆU:\n{context}\n\nCÂU HỎI:\n{request.query}"
    
    # 2. Bắn đi cho OpenAI 
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        temperature=0.2
    )
    # 3. Vo tròn ném cục dữ liệu chữ này trả lại cho Frontend 
    return {"reply": response.choices[0].message.content}
```

**2. Đấu nối dây thần kinh trên Frontend (Phần Giao Diện Web):**
Giả sử bạn dùng AI Studio vẽ ra được một file Web Code tên `App.jsx` (Hoặc HTML Javascript thuần). Ban đầu hàm gửi tin nhắn của AI viết sẽ RỖNG TUẾCH kiểu như này:
```javascript
// Giao diện cũ của AI VẼ RA: Trả lời tự động giả vờ
const handleSendMessage = () => {
   setMessages([...messages, { text: userInput, sender: "user" }]);
   // Mã Fake của AI
   setTimeout(() => {
       setMessages(prev => [...prev, { text: "Xin chào, tôi là AI ảo", sender: "bot" } 
   }, 1000); 
}
```

Bạn chỉ cần bôi đen xóa đoạn Fake phản hồi đó, rồi châm dây điện chạy hàm `fetch()` hút mạng dữ liệu gọi đích danh cổng `8000` của Python ở ví dụ 1:
```javascript
// PHẢI SỬA THÀNH: Hàm gọi trạm sóng của Luật Sư Thật
const handleSendMessage = async () => {
   // Hiển thị bóng chat User lên trước
   setMessages(prev => [...prev, { text: userInput, sender: "user" }]);
   const currentInput = userInput; // Sao lưu tin nhắn
   setUserInput(''); // Xóa thanh chat
   
   try {
       // KẾT NỐI VÀO SERVER PYTHON
       const response = await fetch("http://localhost:8000/api/chat", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ query: currentInput })  // Bọc câu hỏi thành hộp JSON
       });
       // Nhận hộp JSON bóc ra lấy chữ
       const data = await response.json(); 
       
       // Hiển thị bóng chat Luật sư
       setMessages(prev => [...prev, { text: data.reply, sender: "bot" }]);

   } catch (error) {
       console.error("Lỗi khi gọi luật sư:", error);
   }
}
```

**3. Khởi chạy 2 mảng song song:**
- Bạn mở Terminal số 1 gõ: `uvicorn src.server:app --reload` (Mở điện API cổng 8000).
- Mở Terminal số 2 gõ: `npm run dev` (Kích hoạt máy chủ Code UI của AI Studio vừa tải về ở cổng giao diện ví dụ 3000). Lúc này Web App gốc (cổng 3000) sẽ tự động ném câu hỏi sang Backend Python (cổng 8000), bạn chờ 2 giây lấy được câu trả lời và đưa trải nghiệm người dùng lên mây!

Bất kể bạn chọn cách nào ở trên (Low-Code hay Fullstack), để sản phẩm chạy thực tế 24/7 trên mạng mượt mà, bạn cần các thiết bị "Host":

1. **Khối lượng lưu trữ Vector Store:** Bản FAISS nội bộ (Local) của hệ thống hiện tại đang phục vụ rất hiệu quả vì dữ liệu khá gọn, máy tính nào cũng có thể chạy mượt. Nhưng nếu sau này nâng lên vài trăm nghìn luật, bạn cần kết nối ứng dụng với CSDL Vector qua Cloud như **Pinecone**, **Milvus**, hay **Qdrant**.
2. **Nền tảng Hosting:**
   - **Với Streamlit/Chainlit**: Bạn có thể ném miễn phí kho Github này lên **Hugging Face Spaces**, **Streamlit Community Cloud** hoặc **Render**. Vài phút là cả thế giới truy cập được trang web của bạn.
   - **Với Fullstack**: Cần đẩy Frontend lên hệ thống **Vercel** (Siêu mượt), còn Backend FastAPI có thể thuê các máy chủ của **Render**, **Railway**, hoặc **AWS EC2** để kích hoạt file Python chạy xuyên ngày đêm.
