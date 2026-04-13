import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Plus, 
  Search, 
  ArrowRight, 
  Download, 
  Eye, 
  Edit3, 
  CheckCircle2,
  Clock,
  ChevronDown
} from 'lucide-react';

const templates = [
  { id: '1', title: 'Hợp đồng Lao động', category: 'Lao động', usage: '1.2k', complexity: 'Trung bình' },
  { id: '2', title: 'Hợp đồng Thuê nhà', category: 'Dân sự', usage: '3.5k', complexity: 'Đơn giản' },
  { id: '3', title: 'Đơn xin Nghỉ việc', category: 'Lao động', usage: '800', complexity: 'Đơn giản' },
  { id: '4', title: 'Hợp đồng Mua bán Tài sản', category: 'Dân sự', usage: '2.1k', complexity: 'Phức tạp' },
  { id: '5', title: 'Biên bản Họp Hội đồng Quản trị', category: 'Doanh nghiệp', usage: '1.5k', complexity: 'Trung bình' },
  { id: '6', title: 'Đơn khởi kiện Dân sự', category: 'Tố tụng', usage: '600', complexity: 'Phức tạp' },
];

export const Drafter = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase text-authority-blue bg-authority-blue/10 rounded-full">
                Công cụ soạn thảo thông minh
              </span>
              <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-authority-dark leading-tight">
                Soạn thảo văn bản <br />
                <span className="text-authority-blue">Chuẩn pháp lý</span> trong phút chốc
              </h1>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                Sử dụng kho mẫu văn bản khổng lồ được kiểm duyệt bởi các luật sư hàng đầu, kết hợp với AI để tùy chỉnh theo nhu cầu riêng của bạn.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-authority-dark text-white rounded-2xl font-bold shadow-xl hover:bg-opacity-90 transition-all flex items-center space-x-2">
                  <Plus size={20} />
                  <span>Tạo văn bản mới</span>
                </button>
                <button className="px-8 py-4 bg-white text-authority-dark border border-slate-200 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center space-x-2">
                  <Eye size={20} />
                  <span>Xem hướng dẫn</span>
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="bg-slate-100 rounded-[40px] p-4 shadow-inner">
                <div className="bg-white rounded-[32px] shadow-2xl p-8 border border-slate-200">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-authority-blue/10 text-authority-blue rounded-xl flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <h3 className="font-bold font-headline">Hợp đồng Thuê nhà</h3>
                    </div>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">Đã kiểm duyệt</span>
                  </div>
                  <div className="space-y-4 mb-8">
                    <div className="h-4 bg-slate-50 rounded-full w-3/4" />
                    <div className="h-4 bg-slate-50 rounded-full w-full" />
                    <div className="h-4 bg-slate-50 rounded-full w-5/6" />
                    <div className="h-4 bg-slate-50 rounded-full w-2/3" />
                  </div>
                  <div className="p-4 bg-authority-blue/5 rounded-2xl border border-authority-blue/10">
                    <div className="flex items-start space-x-3">
                      <Edit3 size={18} className="text-authority-blue mt-1" />
                      <div>
                        <p className="text-xs font-bold text-authority-blue mb-1">Gợi ý từ Thagn AI</p>
                        <p className="text-[11px] text-slate-600">Bạn nên bổ sung điều khoản về việc đặt cọc và hoàn trả tiền cọc để đảm bảo quyền lợi.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-signature-amber text-white p-6 rounded-3xl shadow-2xl amber-glow">
                <p className="text-2xl font-bold mb-1">98%</p>
                <p className="text-[10px] font-medium opacity-80 uppercase tracking-wider">Độ chính xác pháp lý</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold font-headline text-authority-dark mb-2">Thư viện mẫu văn bản</h2>
            <p className="text-slate-500">Chọn một mẫu để bắt đầu hoặc tìm kiếm theo nhu cầu</p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Tìm mẫu văn bản..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-authority-blue transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tpl, idx) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-authority-blue/20 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-authority-blue/10 group-hover:text-authority-blue transition-all">
                  <FileText size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{tpl.category}</span>
                  <div className="flex items-center space-x-1 text-xs text-emerald-500 font-bold">
                    <CheckCircle2 size={12} />
                    <span>Mẫu chuẩn</span>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold font-headline text-authority-dark mb-4 group-hover:text-authority-blue transition-colors">
                {tpl.title}
              </h3>
              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-xs text-slate-400">
                    <Clock size={14} />
                    <span>{tpl.complexity}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-slate-400">
                    <Download size={14} />
                    <span>{tpl.usage} lượt</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-authority-blue group-hover:text-white transition-all">
                  <ArrowRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-10 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center space-x-2 mx-auto">
            <span>Xem thêm mẫu văn bản</span>
            <ChevronDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
