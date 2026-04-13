import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  FileText, 
  Download, 
  ExternalLink, 
  ChevronRight,
  Calendar,
  Tag
} from 'lucide-react';

const mockLaws = [
  {
    id: '1',
    title: 'Bộ luật Dân sự 2015',
    code: '91/2015/QH13',
    category: 'Dân sự',
    date: '24/11/2015',
    status: 'Còn hiệu lực',
    description: 'Quy định địa vị pháp lý, chuẩn mực hành xử của cá nhân, pháp nhân; quyền, nghĩa vụ về nhân thân và tài sản của cá nhân, pháp nhân trong các quan hệ được hình thành trên cơ sở bình đẳng, tự do ý chí, độc lập về tài sản và tự chịu trách nhiệm.'
  },
  {
    id: '2',
    title: 'Luật Đất đai 2024',
    code: '31/2024/QH15',
    category: 'Đất đai',
    date: '18/01/2024',
    status: 'Sắp có hiệu lực',
    description: 'Quy định về chế độ sở hữu đất đai, quyền hạn và trách nhiệm của Nhà nước đại diện chủ sở hữu toàn dân về đất đai và thống nhất quản lý về đất đai, chế độ quản lý và sử dụng đất đai, quyền và nghĩa vụ của công dân, người sử dụng đất đối với đất đai thuộc lãnh thổ của nước Cộng hòa xã hội chủ nghĩa Việt Nam.'
  },
  {
    id: '3',
    title: 'Luật Doanh nghiệp 2020',
    code: '59/2020/QH14',
    category: 'Doanh nghiệp',
    date: '17/06/2020',
    status: 'Còn hiệu lực',
    description: 'Quy định về việc thành lập, tổ chức quản lý, tổ chức lại, giải thể và hoạt động có liên quan của doanh nghiệp, bao gồm công ty trách nhiệm hữu hạn, công ty cổ phần, công ty hợp danh và doanh nghiệp tư nhân; quy định về nhóm công ty.'
  },
  {
    id: '4',
    title: 'Bộ luật Hình sự 2015 (Sửa đổi 2017)',
    code: '100/2015/QH13',
    category: 'Hình sự',
    date: '27/11/2015',
    status: 'Còn hiệu lực',
    description: 'Quy định về tội phạm và hình phạt.'
  },
  {
    id: '5',
    title: 'Luật Lao động 2019',
    code: '45/2019/QH14',
    category: 'Lao động',
    date: '20/11/2019',
    status: 'Còn hiệu lực',
    description: 'Quy định tiêu chuẩn lao động; quyền, nghĩa vụ, trách nhiệm của người lao động, người sử dụng lao động, tổ chức đại diện người lao động tại cơ sở, tổ chức đại diện người sử dụng lao động trong quan hệ lao động và các quan hệ khác liên quan trực tiếp đến quan hệ lao động; quản lý nhà nước về lao động.'
  }
];

const categories = ['Tất cả', 'Dân sự', 'Hình sự', 'Đất đai', 'Doanh nghiệp', 'Lao động', 'Hành chính', 'Thuế'];

export const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const filteredLaws = mockLaws.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         law.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || law.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <div className="juridical-gradient pt-16 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-headline mb-6"
          >
            Thư viện Pháp luật
          </motion.h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-10">
            Tra cứu hàng ngàn văn bản luật, nghị định, thông tư mới nhất được cập nhật liên tục từ cơ sở dữ liệu quốc gia.
          </p>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
              <input 
                type="text" 
                placeholder="Tìm kiếm theo tên văn bản, số hiệu hoặc từ khóa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-16 pl-16 pr-8 rounded-2xl bg-white text-slate-900 shadow-2xl border-none focus:ring-2 focus:ring-authority-blue text-lg transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <div className="flex items-center space-x-2 mb-6 pb-4 border-b border-slate-50">
                <Filter size={20} className="text-authority-blue" />
                <h3 className="font-bold font-headline text-authority-dark">Lọc theo lĩnh vực</h3>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                      selectedCategory === cat 
                        ? 'bg-authority-blue text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <ChevronRight size={16} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-authority-dark p-8 rounded-3xl text-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-authority-blue/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-lg font-bold mb-4 font-headline relative z-10">Bạn không tìm thấy văn bản cần thiết?</h4>
              <p className="text-slate-400 text-sm mb-6 relative z-10">Hãy yêu cầu trợ lý AI tìm kiếm và phân tích giúp bạn ngay lập tức.</p>
              <button className="w-full py-3 bg-authority-blue text-white rounded-xl font-bold text-sm hover:bg-opacity-90 transition-all relative z-10">
                Hỏi Thagn AI
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-500 text-sm font-medium">
                Tìm thấy <span className="text-authority-dark font-bold">{filteredLaws.length}</span> văn bản phù hợp
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Sắp xếp:</span>
                <select className="bg-transparent border-none text-xs font-bold text-authority-dark focus:ring-0 cursor-pointer">
                  <option>Mới nhất</option>
                  <option>Phổ biến nhất</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredLaws.length > 0 ? (
                filteredLaws.map((law, idx) => (
                  <motion.div
                    key={law.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-authority-blue/20 transition-all group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            {law.code}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            law.status === 'Còn hiệu lực' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                          }`}>
                            {law.status}
                          </span>
                          <span className="flex items-center space-x-1 text-slate-400 text-[10px] font-bold">
                            <Tag size={12} />
                            <span>{law.category}</span>
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-headline text-authority-dark mb-4 group-hover:text-authority-blue transition-colors">
                          {law.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                          {law.description}
                        </p>
                        <div className="flex items-center space-x-6 text-xs text-slate-400 font-medium">
                          <div className="flex items-center space-x-2">
                            <Calendar size={14} />
                            <span>Ban hành: {law.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen size={14} />
                            <span>Văn bản gốc</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:flex-col gap-3">
                        <button className="flex-grow md:flex-grow-0 p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-authority-blue hover:text-white transition-all shadow-sm" title="Tải xuống PDF">
                          <Download size={20} />
                        </button>
                        <button className="flex-grow md:flex-grow-0 p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-authority-blue hover:text-white transition-all shadow-sm" title="Xem chi tiết">
                          <ExternalLink size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="bg-white p-20 rounded-3xl border border-dashed border-slate-200 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <Search size={40} />
                  </div>
                  <h3 className="text-xl font-bold font-headline text-authority-dark mb-2">Không tìm thấy kết quả</h3>
                  <p className="text-slate-500">Hãy thử tìm kiếm với từ khóa khác hoặc lọc theo lĩnh vực khác.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
