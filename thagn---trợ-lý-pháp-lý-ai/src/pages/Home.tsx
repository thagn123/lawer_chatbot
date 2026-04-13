import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Globe, 
  MessageSquare, 
  BookOpen, 
  FileText, 
  Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const categories = [
  { title: 'Dân sự', icon: Users, color: 'bg-blue-500', count: '1,240+' },
  { title: 'Lao động', icon: FileText, color: 'bg-emerald-500', count: '850+' },
  { title: 'Doanh nghiệp', icon: ShieldCheck, color: 'bg-indigo-500', count: '2,100+' },
  { title: 'Hình sự', icon: Zap, color: 'bg-amber-500', count: '420+' },
  { title: 'Đất đai', icon: Globe, color: 'bg-rose-500', count: '1,560+' },
  { title: 'Hôn nhân', icon: MessageSquare, color: 'bg-purple-500', count: '930+' },
];

export const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-authority-blue rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-signature-amber rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-authority-blue bg-authority-blue/10 rounded-full">
              Trí tuệ nhân tạo pháp lý hàng đầu
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold font-headline mb-8 tracking-tight text-authority-dark leading-[1.1]">
              Giải quyết mọi vấn đề <br />
              <span className="text-authority-blue">Pháp lý trong 1 giây</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-12 leading-relaxed">
              Thagn.AI kết hợp sức mạnh của mô hình ngôn ngữ lớn với cơ sở dữ liệu luật pháp Việt Nam đồ sộ để mang đến cho bạn sự tư vấn chính xác, tức thì.
            </p>

            <div className="max-w-3xl mx-auto relative mb-16">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Hỏi bất cứ điều gì về luật pháp (VD: Thủ tục mua bán nhà đất...)"
                  className="w-full h-18 pl-8 pr-40 rounded-2xl bg-white shadow-2xl border-none focus:ring-2 focus:ring-authority-blue text-lg transition-all"
                />
                <button className="absolute right-2 top-2 bottom-2 px-8 bg-authority-blue text-white rounded-xl font-bold flex items-center space-x-2 hover:bg-authority-dark transition-all">
                  <span>Hỏi AI</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/chat" className="px-8 py-4 bg-authority-dark text-white rounded-2xl font-bold shadow-xl hover:shadow-authority-blue/20 transition-all flex items-center space-x-2">
                <MessageSquare size={20} />
                <span>Bắt đầu tư vấn</span>
              </Link>
              <Link to="/library" className="px-8 py-4 bg-white text-authority-dark border border-slate-200 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center space-x-2">
                <BookOpen size={20} />
                <span>Tra cứu thư viện</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-4">Lĩnh vực phổ biến</h2>
              <p className="text-slate-500">Khám phá các tình huống pháp lý theo chuyên mục</p>
            </div>
            <Link to="/library" className="text-authority-blue font-bold flex items-center space-x-1 hover:underline">
              <span>Xem tất cả</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-pointer"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", cat.color)}>
                  <cat.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 font-headline group-hover:text-authority-blue transition-colors">{cat.title}</h3>
                <p className="text-slate-500 text-sm mb-4">Hơn {cat.count} tình huống pháp lý đã được giải quyết trong tuần qua.</p>
                <div className="flex items-center text-authority-blue font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Khám phá ngay</span>
                  <ArrowRight size={14} className="ml-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Preview Section */}
      <section className="py-24 juridical-gradient text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/30 rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-widest uppercase bg-white/10 rounded-full">
                Công nghệ vượt trội
              </span>
              <h2 className="text-4xl md:text-5xl font-bold font-headline mb-8 leading-tight">
                Trợ lý AI hiểu Luật Việt Nam <br />
                <span className="text-gold-light">như một chuyên gia</span>
              </h2>
              <ul className="space-y-6 mb-10">
                {[
                  'Cập nhật văn bản luật mới nhất hàng ngày',
                  'Phân tích tình huống đa chiều, khách quan',
                  'Trích dẫn chính xác điều khoản, nghị định',
                  'Bảo mật thông tin người dùng tuyệt đối'
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gold-light/20 rounded-full flex items-center justify-center text-gold-light">
                      <ShieldCheck size={16} />
                    </div>
                    <span className="text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="px-10 py-4 bg-gold-light text-authority-dark rounded-2xl font-bold shadow-xl hover:scale-105 transition-all">
                Thử ngay miễn phí
              </button>
            </div>

            <div className="relative">
              <div className="glass-morphism rounded-3xl p-6 border-white/10 shadow-2xl">
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 bg-authority-blue rounded-full flex items-center justify-center">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Thagn AI Assistant</p>
                    <p className="text-xs text-slate-400">Đang trực tuyến</p>
                  </div>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                    <p className="text-sm">Chào bạn! Tôi có thể giúp gì cho bạn về các vấn đề pháp lý hôm nay?</p>
                  </div>
                  <div className="bg-authority-blue/20 p-4 rounded-2xl rounded-tr-none max-w-[85%] ml-auto text-right">
                    <p className="text-sm">Tôi muốn hỏi về thủ tục ly hôn thuận tình khi có con nhỏ.</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[90%]">
                    <p className="text-sm leading-relaxed">
                      Theo Luật Hôn nhân và Gia đình 2014, thủ tục ly hôn thuận tình khi có con nhỏ bao gồm các bước sau: <br />
                      1. Chuẩn bị hồ sơ (Đơn yêu cầu, ĐKKH, Khai sinh con...) <br />
                      2. Nộp tại Tòa án nhân dân cấp Quận/Huyện...
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Nhập câu hỏi của bạn..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-1 focus:ring-gold-light"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
