import os
import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer
from openai import OpenAI
from dotenv import load_dotenv

# 1. Khởi tạo chung
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
env_path = os.path.join(base_dir, ".env")
load_dotenv(dotenv_path=env_path)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    print(" LỖI: Không tìm thấy OPENAI_API_KEY. Vui lòng kiểm tra lại file .env!")
    exit(1)

# Khởi tạo OpenAI Client
client = OpenAI(api_key=OPENAI_API_KEY)

# 2. Setup Vector Store và Model Local
print(" Đang tải mô hình nhúng (Sentence-Transformers)...")
embedding_model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

print(" Đang tải Cơ Sở Dữ Liệu FAISS...")
index_file = os.path.join(base_dir, "data", "law_vector_index.faiss")
meta_file = os.path.join(base_dir, "data", "chunk_metadata.pkl")

try:
    vector_index = faiss.read_index(index_file)
    with open(meta_file, "rb") as f:
        meta_dict = pickle.load(f)
    print(" Tải dữ liệu thành công!\n" + "-"*50)
except Exception as e:
    print(f"Lỗi khi load DB: {e}. Vui lòng chạy file store.py trước!")
    exit(1)

# 3. Hàm truy xuất RAG
def search_legal_docs(query, k=5):
    # Vector hóa câu hỏi (Bật normalize để dùng Cosine Similarity tương thích với FlatIP)
    q_emb = embedding_model.encode([query], normalize_embeddings=True)
    q_emb = np.array(q_emb).astype('float32')
    
    # Tìm Top K
    distances, indices = vector_index.search(q_emb, k)
    
    # Rút trích văn bản
    results = []
    for idx in indices[0]:
        if idx != -1: # Fallback khi FAISS không tìm thấy
            chunk = meta_dict[idx]
            results.append(chunk['page_content'])
            
    return "\n\n---\n\n".join(results)

# 4. Agent Core
SYSTEM_PROMPT = """Bạn là một Luật sư và Chuyên gia Pháp lý xuất sắc tại Việt Nam.
Tôi sẽ cung cấp cho bạn một CÂU HỎI và một danh sách TÀI LIỆU THAM KHẢO (Được trích xuất trực tiếp từ các Bộ Luật).

NHIỆM VỤ CỦA BẠN:
1. Đọc và suy luận dựa hoàn toàn vào các TÀI LIỆU THAM KHẢO được cung cấp để trả lời.
2. Bắt buộc phải trích dẫn chi tiết (Ví dụ: "Theo Điều 12 của Bộ Luật Dân Sự...", "Theo Khoản 2, Điều 19 Luật Tố Tụng...").
3. Trả lời súc tích, dễ hiểu, trình bày mạch lạc rõ ràng.
4. NẾU Tài liệu tham khảo KHÔNG chứa thông tin để trả lời, HÃY TRẢ LỜI: "Dựa trên kho dữ liệu hiện tại, tôi không tìm thấy quy định pháp luật liên quan tới vấn đề này." và NGHIÊM CẤM tự bịa ra hay suy đoán thông tin ngoài lề."""

def chat():
    print("="*50)
    print(" CHÀO MỪNG ĐẾN VỚI TRỢ LÝ PHÁP LÝ AI (RAG CHATBOT)")
    print(" Mô hình LLM: gpt-4o-mini | CSDL: FAISS + Luật VN")
    print(" Gõ 'exit' hoặc 'quit' để thoát.")
    print("="*50)
    
    while True:
        try:
            user_input = input("\nBạn: ")
            if user_input.strip().lower() in ['exit', 'quit']:
                print("Tạm biệt!")
                break
            if not user_input.strip():
                continue
                
            # 1. RAG: Dò tìm tài liệu
            print("  [Thông báo] Hệ thống đang phân tích hồ sơ luật...")
            context = search_legal_docs(user_input, k=5)
            
            # 2. Xây dựng prompt
            prompt = f"""TÀI LIỆU THAM KHẢO TỪ HỆ THỐNG:
{context}

CÂU HỎI CỦA NGƯỜI DÙNG:
{user_input}"""

            # 3. Request LLM LLM Stream
            print("  [Luật Sư AI]: ", end="", flush=True)
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.2, # Giữ mức độ sáng tạo thấp để AI trung thành với văn bản luật
                stream=True
            )
            
            # 4. In kết quả mượt mà theo Style Streaming
            for chunk in response:
                if chunk.choices[0].delta.content is not None:
                    print(chunk.choices[0].delta.content, end="", flush=True)
            print() # Print newline
            
        except KeyboardInterrupt:
            print("\nTạm biệt!")
            break
        except Exception as e:
            print(f"\n[Lỗi kết nối tới Agent]: {e}")

if __name__ == "__main__":
    chat()
