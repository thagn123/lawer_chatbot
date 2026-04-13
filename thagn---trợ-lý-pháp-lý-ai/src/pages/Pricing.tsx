import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  Zap, 
  Shield, 
  Crown, 
  ArrowRight, 
  HelpCircle,
  MessageSquare,
  FileText,
  Users
} from 'lucide-react';

const plans = [
  {
    name: 'Cơ bản',
    price: '0',
    description: 'Dành cho cá nhân cần tra cứu thông tin pháp luật cơ bản.',
    icon: Zap,
    color: 'text-slate-400',
    bgColor: 'bg-slate-50',
    features: [
      'Tra cứu thư viện pháp luật (Giới hạn)',
      'Tư vấn AI (5 câu hỏi/ngày)',
      'Xem mẫu văn bản cơ bản',
      'Hỗ trợ qua email'
    ],
    buttonText: 'Bắt đầu miễn phí',
    recommended: false
  },
  {
    name: 'Chuyên nghiệp',
    price: '199.000',
    description: 'Giải pháp tối ưu cho cá nhân và hộ kinh doanh.',
    icon: Shield,
    color: 'text-authority-blue',
    bgColor: 'bg-authority-blue/5',
    features: [
      'Tra cứu thư viện không giới hạn',
      'Tư vấn AI không giới hạn 24/7',
      'Tải xuống tất cả mẫu văn bản',
      'Ưu tiên kết nối chuyên gia',
      'Phân tích văn bản bằng AI'
    ],
    buttonText: 'Nâng cấp ngay',
    recommended: true
  },
  {
    name: 'Doanh nghiệp',
    price: '999.000',
    description: 'Dịch vụ toàn diện cho doanh nghiệp và tổ chức.',
    icon: Crown,
    color: 'text-signature-amber',
    bgColor: 'bg-signature-amber/5',
    features: [
      'Tất cả tính năng gói Chuyên nghiệp',
      'Tư vấn trực tiếp với Luật sư (2h/tháng)',
      'Soạn thảo văn bản theo yêu cầu',
      'Quản lý hồ sơ pháp lý tập trung',
      'Hỗ trợ kỹ thuật 24/7 riêng biệt'
    ],
    buttonText: 'Liên hệ tư vấn',
    recommended: false
  }
];

export const Pricing = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline mb-6 text-authority-dark tracking-tight">
              Chọn gói dịch vụ <br />
              <span className="text-authority-blue">Phù hợp với bạn</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Đầu tư vào sự an tâm pháp lý với các gói dịch vụ linh hoạt, minh bạch và không có chi phí ẩn.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative bg-white p-10 rounded-[40px] shadow-xl border-2 transition-all hover:scale-[1.02] duration-500 ${
                plan.recommended ? 'border-authority-blue ring-4 ring-authority-blue/5' : 'border-transparent'
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-authority-blue text-white px-6 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Phổ biến nhất
                </div>
              )}

              <div className={`w-16 h-16 ${plan.bgColor} ${plan.color} rounded-3xl flex items-center justify-center mb-8 shadow-inner`}>
                <plan.icon size={32} />
              </div>

              <h3 className="text-2xl font-bold font-headline text-authority-dark mb-2">{plan.name}</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed h-10">{plan.description}</p>

              <div className="flex items-baseline mb-10">
                <span className="text-4xl font-extrabold font-headline text-authority-dark">{plan.price}</span>
                <span className="text-slate-400 ml-2 font-medium">VNĐ/tháng</span>
              </div>

              <div className="space-y-5 mb-10">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="mt-1 w-5 h-5 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center space-x-2 shadow-lg ${
                plan.recommended 
                  ? 'bg-authority-blue text-white hover:bg-authority-dark shadow-authority-blue/20' 
                  : 'bg-slate-100 text-authority-dark hover:bg-slate-200'
              }`}>
                <span>{plan.buttonText}</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-headline text-authority-dark mb-4">Câu hỏi thường gặp</h2>
          <p className="text-slate-500">Mọi thứ bạn cần biết về các gói dịch vụ của chúng tôi</p>
        </div>

        <div className="space-y-4">
          {[
            { q: 'Tôi có thể hủy gói dịch vụ bất cứ lúc nào không?', a: 'Có, bạn có thể hủy gói dịch vụ của mình bất cứ lúc nào trong phần cài đặt tài khoản. Bạn vẫn sẽ có quyền truy cập cho đến hết chu kỳ thanh toán hiện tại.' },
            { q: 'Thagn AI có thay thế được luật sư không?', a: 'Thagn AI là công cụ hỗ trợ tra cứu và tư vấn sơ bộ. Đối với các vụ việc phức tạp, chúng tôi luôn khuyến khích bạn kết nối với các luật sư chuyên gia trên nền tảng của chúng tôi.' },
            { q: 'Dữ liệu của tôi có được bảo mật không?', a: 'Chúng tôi cam kết bảo mật 100% thông tin cá nhân và nội dung tư vấn của bạn theo tiêu chuẩn mã hóa cao nhất.' }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="mt-1 text-authority-blue">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold font-headline text-authority-dark mb-2">{faq.q}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="juridical-gradient rounded-[48px] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold font-headline mb-8">Sẵn sàng để bắt đầu?</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-12">
              Tham gia cùng hơn 10.000 người dùng đã tin tưởng Thagn.AI để giải quyết các vấn đề pháp lý của họ.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button className="px-10 py-4 bg-white text-authority-dark rounded-2xl font-bold shadow-xl hover:scale-105 transition-all">
                Đăng ký ngay
              </button>
              <button className="px-10 py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition-all">
                Liên hệ hỗ trợ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
