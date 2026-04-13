import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Bot, 
  User, 
  Scale, 
  Info, 
  RefreshCw, 
  Trash2, 
  ChevronRight,
  AlertCircle,
  Loader2
} from 'lucide-react';
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Xin chào! Tôi là Thagn AI, trợ lý pháp lý của bạn. Tôi có thể giúp gì cho bạn về các vấn đề pháp luật Việt Nam hôm nay?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage.content })
      });
      
      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply || 'Xin lỗi, tôi không thể xử lý yêu cầu này lúc này.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error("Chat Error:", err);
      setError("Đã có lỗi xảy ra khi kết nối với máy chủ AI. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện?")) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: 'Xin chào! Tôi là Thagn AI, trợ lý pháp lý của bạn. Tôi có thể giúp gì cho bạn về các vấn đề pháp luật Việt Nam hôm nay?',
          timestamp: new Date(),
        }
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 juridical-gradient rounded-xl flex items-center justify-center text-white">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="font-bold font-headline text-authority-dark">Trợ lý Pháp lý AI</h2>
            <div className="flex items-center text-xs text-emerald-500 font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
              Đang trực tuyến
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={clearChat}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
            title="Xóa lịch sử"
          >
            <Trash2 size={20} />
          </button>
          <button className="p-2 text-slate-400 hover:text-authority-blue hover:bg-slate-100 rounded-lg transition-all">
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                  msg.role === 'user' ? 'bg-authority-blue ml-3' : 'bg-slate-200 mr-3'
                }`}>
                  {msg.role === 'user' ? <User size={16} className="text-white" /> : <Scale size={16} className="text-authority-dark" />}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-authority-blue text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                    {msg.content}
                  </div>
                  <div className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-center space-x-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-100 rounded-tl-none">
                <Loader2 size={18} className="animate-spin text-authority-blue" />
                <span className="text-sm text-slate-500 font-medium">Thagn AI đang phân tích...</span>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <div className="bg-rose-50 text-rose-600 px-4 py-2 rounded-lg text-sm flex items-center space-x-2 border border-rose-100">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Nhập câu hỏi pháp lý của bạn tại đây..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-authority-blue focus:bg-white transition-all resize-none max-h-32"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`absolute right-2 p-3 rounded-xl transition-all ${
                !input.trim() || isLoading 
                  ? 'bg-slate-100 text-slate-400' 
                  : 'bg-authority-blue text-white shadow-lg hover:bg-authority-dark'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-3 text-center">
            Lưu ý: Phản hồi của AI chỉ mang tính chất tham khảo. Vui lòng tham vấn luật sư cho các trường hợp cụ thể.
          </p>
        </div>
      </div>
    </div>
  );
};
