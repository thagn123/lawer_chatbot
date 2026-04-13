import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Star, 
  ShieldCheck, 
  MessageSquare, 
  Calendar, 
  MapPin, 
  Search, 
  Filter, 
  Award,
  CheckCircle2
} from 'lucide-react';

const experts = [
  {
    id: '1',
    name: 'Luật sư Nguyễn Văn A',
    title: 'Luật sư Điều hành - Đoàn Luật sư TP. Hà Nội',
    specialty: 'Doanh nghiệp & Đầu tư',
    experience: '15 năm',
    rating: 4.9,
    reviews: 124,
    image: 'https://picsum.photos/seed/lawyer1/300/300',
    verified: true,
    tags: ['Mua bán sáp nhập', 'Sở hữu trí tuệ']
  },
  {
    id: '2',
    name: 'Luật sư Trần Thị B',
    title: 'Luật sư Cao cấp - Đoàn Luật sư TP. HCM',
    specialty: 'Dân sự & Hôn nhân',
    experience: '12 năm',
    rating: 4.8,
    reviews: 98,
    image: 'https://picsum.photos/seed/lawyer2/300/300',
    verified: true,
    tags: ['Ly hôn', 'Tranh chấp đất đai']
  },
  {
    id: '3',
    name: 'Luật sư Lê Văn C',
    title: 'Chuyên gia Pháp lý Hình sự',
    specialty: 'Hình sự',
    experience: '20 năm',
    rating: 5.0,
    reviews: 156,
    image: 'https://picsum.photos/seed/lawyer3/300/300',
    verified: true,
    tags: ['Bào chữa hình sự', 'Tư vấn tố tụng']
  },
  {
    id: '4',
    name: 'Luật sư Phạm Thị D',
    title: 'Luật sư Tư vấn Lao động',
    specialty: 'Lao động',
    experience: '8 năm',
    rating: 4.7,
    reviews: 64,
    image: 'https://picsum.photos/seed/lawyer4/300/300',
    verified: true,
    tags: ['Tranh chấp lao động', 'BHXH']
  }
];

export const Experts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-authority-dark">
              Kết nối với <span className="text-authority-blue">Luật sư hàng đầu</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto mb-10">
              Đội ngũ chuyên gia pháp lý giàu kinh nghiệm luôn sẵn sàng lắng nghe và giải quyết các vấn đề phức tạp nhất của bạn.
            </p>
            
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm theo tên hoặc chuyên môn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-authority-blue focus:bg-white transition-all"
                />
              </div>
              <button className="h-14 px-8 bg-authority-dark text-white rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg hover:bg-opacity-90 transition-all">
                <Filter size={20} />
                <span>Lọc nâng cao</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Luật sư', value: '500+', icon: Users },
            { label: 'Tư vấn thành công', value: '10k+', icon: CheckCircle2 },
            { label: 'Đánh giá 5 sao', value: '95%', icon: Star },
            { label: 'Bảo mật tuyệt đối', value: '100%', icon: ShieldCheck },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center">
              <div className="w-10 h-10 bg-authority-blue/10 text-authority-blue rounded-full flex items-center justify-center mb-3">
                <stat.icon size={20} />
              </div>
              <p className="text-2xl font-bold text-authority-dark font-headline">{stat.value}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experts.map((expert, idx) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:border-authority-blue/20 transition-all group"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 sm:h-auto relative overflow-hidden">
                  <img 
                    src={expert.image} 
                    alt={expert.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    {expert.verified && (
                      <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full text-authority-blue shadow-lg">
                        <ShieldCheck size={18} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-grow p-8">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold font-headline text-authority-dark group-hover:text-authority-blue transition-colors">
                        {expert.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-medium">{expert.title}</p>
                    </div>
                    <div className="flex items-center space-x-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-bold">{expert.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 my-4">
                    {expert.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-slate-500">
                      <Award size={16} className="text-authority-blue" />
                      <span className="text-xs font-medium">{expert.experience} kinh nghiệm</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-500">
                      <MessageSquare size={16} className="text-authority-blue" />
                      <span className="text-xs font-medium">{expert.reviews} đánh giá</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-grow py-3 bg-authority-blue text-white rounded-xl font-bold text-sm shadow-lg shadow-authority-blue/20 hover:bg-authority-dark transition-all flex items-center justify-center space-x-2">
                      <Calendar size={16} />
                      <span>Đặt lịch tư vấn</span>
                    </button>
                    <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
                      <MessageSquare size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
