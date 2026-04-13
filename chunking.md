# Khái Niệm Phân Tách Dữ Liệu (Chunking) Cho Văn Bản Pháp Lý

Trong quá trình xây dựng hệ thống Retrieval-Augmented Generation (RAG) đối với văn bản pháp luật, công đoạn cắt xén dữ liệu thô (Chunking) đóng vai trò sống còn quyết định năng lực truy xuất của Agent. 

Nếu áp dụng các thuật toán chia nhỏ kỹ thuật số thông dụng — ví dụ như chia để trị bằng `RecursiveCharacterTextSplitter` (cắt mỗi 1.000 từ ra làm 1 khối) — AI sẽ rơi vào "mê hồn trận" mất ngữ cảnh nghiêm trọng khi phải đọc các văn bản Việt Nam do điểm yếu về tính mồ côi dư liệu. 

Ví dụ, nếu vô tình cắt tại cụm từ: _"1. Phạt tiền từ 1.000.000 đến 2.000.000 VNĐ."_, LLM sẽ hoàn toàn **không biết** khoản tiền phạt này dành cho tội lỗi gì, nằm trong khung hình phạt ở Điều mấy, và của Bộ luật nào.

Giải pháp tối ưu đã được thiết lập trong dự án này là **Logical / Hierarchical Chunking (Cắt dữ liệu dựa theo logic phân cấp).**

## Cơ chế Hierarchical Chunking Được Sử Dụng
Thuật toán `chunking.py` tiến hành đi theo trình tự sâu dần từ dưới lên (Bottom-up Contextualization). Ở mỗi cấp bậc phân nhánh nhỏ nhất dĩ vãng (Khoản, hoặc nếu không có Khoản thì là Điều), ta đều gắn kết các thành phần dữ liệu cấp Cha lên cùng khối văn bản để tạo ra một **Chunk siêu ngữ cảnh** duy nhất.

Cấu trúc lưu vào Vector Store như sau:

```json
{
  "metadata": {
    "law_name": "BỘ LUẬT DÂN SỰ",
    "chapter": "Chương I: NHỮNG QUY ĐỊNH CHUNG",
    "section": "Mục 1: GIỚI HẠN QUYỀN",
    "article": "Điều 10. Giới hạn việc thực hiện quyền dân sự",
    "clause": "1"
  },
  "content": "1. Cá nhân, pháp nhân không được lạm dụng quyền dân sự của mình...",
  "page_content": "[Văn Bản]: BỘ LUẬT DÂN SỰ\n[Chương]: Chương I: NHỮNG QUY ĐỊNH CHUNG\n[Mục]: Mục 1: GIỚI HẠN QUYỀN\n[Điều]: Điều 10. Giới hạn việc thực hiện quyền dân sự\n[Nội dung]: 1. Cá nhân, pháp nhân không được lạm dụng quyền dân sự của mình gây thiệt hại cho người khác, để vi phạm nghĩa vụ của mình hoặc thực hiện mục đích khác trái pháp luật."
}
```

### Các thành phần chính của 1 Chunk Luật

**1. Khối nội dung gốc (`page_content`):**
Cung cấp chuỗi ngữ cảnh hoành tráng nhất chứa thông tin chiết xuất. Đầu vào nhúng (Embedding) vào Vector DB sẽ đọc thẳng theo trường này. Lúc LLM search nội dung, nó sẽ thấy ngay từ khóa `[BỘ LUẬT DÂN SỰ]` và `[Điều 10]` làm tham chiếu cực kỳ chi tiết thay vì bị mù lòa như cách cắt chia thô.

**2. Khởi tạo Metadata (`metadata`):**
Song hành với văn bản là kho Metadata, có tác dụng rất lớn trong khâu Query Filtering (Lọc kết quả truy vấn Vector). 
Ví dụ, nếu thao tác RAG hỏi hệ thống: _"Điều 1 của luật hình sự quy định gì?"_, bộ lọc sẽ chủ động loại bỏ tắt mọi chunk nào có `law_name` là "DÂN SỰ" hay "LAO ĐỘNG" ra, Agent chỉ tập trung quét tài liệu chứa thông tin liên quan tới "HÌNH SỰ" đảm bảo độ chính xác lên đến 99%.

### 3. Cơ chế Khẩn Cấp (Fallback Text Splitter)
Ở một số trường hợp ngoại lệ, có những nội dung (Khoản) chưa được chia rõ nhưng khối lượng nội dung lại siêu khủng (vượt qua 2000 ký tự gây tràn độ dài token - Token Overflow khi embed). 
Chính vì vậy, đoạn mã `chunking.py` có tích hợp thêm thuật toán **Fallback Recursive Splitter**. Cơ chế phụ này có khả năng nhẹ nhàng xẻ đôi câu chữ ưu tiên bẻ tách qua:
1. Dấu ngắt hai lần xuống dòng (`\n\n`) -> (Ngắt đoạn)
2. Dấu kết câu (`. `) 

Việc nương theo các dấu phẩy, kết câu này đảm bảo không cắn xé ngang một câu văn hoàn chỉnh, giữ gìn được sự thống nhất về mặt ý nghĩa (Semantic). Các Chunk con tạo thành từ lệnh chẻ này vẫn được thừa kế toàn bộ cấu trúc định danh của Chunk gốc.
