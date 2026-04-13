# Cách thức trích xuất đầy đủ tên Bộ luật bị ngắt dòng

Trong cấu trúc soạn thảo văn bản quy phạm pháp luật của Việt Nam, tên phân loại văn bản (như "BỘ LUẬT", "LUẬT", "NGHỊ ĐỊNH") thường được đặt ở một dòng riêng biệt, và phần "TÊN CHI TIẾT" sẽ bị bẻ xuống các dòng phía dưới. Tất cả các dòng này đều được viết **IN HOA**. 

Ví dụ:
```text
BỘ LUẬT
LAO ĐỘNG
Căn cứ Hiến pháp nước Cộng hòa xã hội chủ nghĩa Việt Nam;
```
Nếu chỉ quét tìm một dòng có chứa chữ "LUẬT", kết quả nhận được sẽ chỉ là dở dang (ví dụ chỉ lấy được mỗi chữ `BỘ LUẬT`).

Đê giải quyết sự cố này, thuật toán xử lý trong đoạn mã Python đã được cập nhật thành một cơ chế **Window Scanning** (Quét mảng dữ liệu) cho 15 đoạn (paragraphs) đầu tiên của văn bản.

## Thuật toán chi tiết

1. **Khởi tạo trạng thái**:
   Tạo ra một danh sách rỗng (list) `law_name_parts` để chứa các câu cấu thành nên tên, và biến cờ hiệu `start_collecting = False`.

2. **Kích hoạt việc thu thập dữ liệu (Triggers)**:
   Thuật toán duyệt qua từng đoạn văn, chuyển văn bản thành chữ in hoa (uppercase). Nếu phát hiện dòng nào có chứa các từ định danh như `LUẬT`, `NGHỊ ĐỊNH`, `HIẾN PHÁP` thì bật cờ hiệu `start_collecting = True`.

3. **Gom dữ liệu liên tiếp**:
   Khi cờ hiệu `start_collecting` đang bật, mọi dòng tiếp theo được quét (kể cả có chữ luật hay không, ví dụ như "LAO ĐỘNG") đều sẽ được đẩy vào danh sách `law_name_parts`. 

4. **Kết thúc thu thập (Break Points)**:
   Nếu gặp các từ khóa báo hiệu việc kết thúc khu vực tiêu đề và chuyển sang phần thân bài/căn cứ pháp lý cốt lõi, như: `CĂN CỨ`, `QUỐC HỘI`, `CHƯƠNG `, `ĐIỀU 1`, thuật toán sẽ dừng vòng lặp (break) ngay chốc lát nếu như đang trong trạng thái đã thu thập (`start_collecting == True`).

5. **Lắp ráp tên đầy đủ**:
   Dùng lệnh nối mảng bằng khoảng trắng `" ".join(law_name_parts).strip()`, kết quả ta sẽ cộng gộp được tất cả những dòng đã bẻ của tên đạo luật thành một chuỗi văn bản hoàn chỉnh.

## Đoạn Mã Nguồn (Python)

```python
# Cố gắng tìm và ghép tên Luật (xử lý trường hợp có nhiều dòng)
law_name_parts = []
start_collecting = False

for txt in paragraphs[:15]:  # Chỉ kiểm tra 15 đoạn văn bản đầu tiên
    upper_txt = txt.upper()
    
    # Điều kiện DỪNG (Break Points)
    if "CĂN CỨ" in upper_txt or "QUỐC HỘI" in upper_txt or "CHƯƠNG " in upper_txt or "ĐIỀU 1" in upper_txt:
        if start_collecting:
            break  # Nhảy ra khỏi vòng lặp khi đã lấy xong tên bài
            
    # Điều kiện BẮT ĐẦU VÀO LUỒNG lấy dữ liệu
    if "LUẬT" in upper_txt or "NGHỊ ĐỊNH" in upper_txt or "HIẾN PHÁP" in upper_txt:
        start_collecting = True
        
    # Ghi nhận nội dung dòng khi đang ở luồng thu thập
    if start_collecting:
        law_name_parts.append(txt)
        
# Gom chuỗi bằng khoảng trắng
law_struct["law_name"] = " ".join(law_name_parts).strip()
```

## Kết Quả Demo
Trước khi có cơ chế này:
- Đầu vào: `LUẬT \n SỬA ĐỔI, BỔ SUNG MỘT SỐ ĐIỀU CỦA BỘ LUẬT TỐ TỤNG HÌNH SỰ` 
- Đầu ra bị thiếu hụt: `"LUẬT"`

Sau khi bổ sung cơ chế quét luồng (Flow Collection), kết quả trích xuất được sẽ vẹn toàn tuyệt đối:
- `"LUẬT SỬA ĐỔI, BỔ SUNG MỘT SỐ ĐIỀU CỦA BỘ LUẬT TỐ TỤNG HÌNH SỰ"`
