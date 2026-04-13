from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import sys
import os

# Ensure the current directory is in sys.path so we can import agent
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from agent import search_legal_docs, client, SYSTEM_PROMPT

app = FastAPI(title="Legal AI Assistant API")

# Add CORS Middleware to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow any origin (for local development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str

@app.post("/api/chat")
async def chat_api(request: ChatRequest):
    try:
        # 1. Search legal documents via RAG (FAISS)
        context = search_legal_docs(request.query, k=5)
        
        # 2. Build the prompt
        prompt = f"""TÀI LIỆU THAM KHẢO TỪ HỆ THỐNG:
{context}

CÂU HỎI CỦA NGƯỜI DÙNG:
{request.query}"""

        # 3. Call OpenAI gpt-4o-mini
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )
        
        # 4. Return to frontend
        reply_content = response.choices[0].message.content
        return {"reply": reply_content}
        
    except Exception as e:
        return {"reply": f"Lỗi hệ thống khi truy vấn: {str(e)}"}

if __name__ == "__main__":
    print("Khởi động server FastAPI tại http://localhost:8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
