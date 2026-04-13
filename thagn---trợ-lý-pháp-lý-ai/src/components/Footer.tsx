import React from 'react';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-authority-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-authority-blue rounded-xl flex items-center justify-center text-white">
                <Scale size={24} />
              </div>
              <span className="text-2xl font-extrabold font-headline tracking-tighter">
                THAGN<span className="text-authority-blue">.AI</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Trợ lý pháp lý AI thông minh nhất Việt Nam, giúp bạn giải quyết mọi vấn đề pháp lý một cách nhanh chóng và chính xác.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-headline">Dịch vụ</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-authority-blue transition-colors">Tư vấn AI 24/7</a></li>
              <li><a href="#" className="hover:text-authority-blue transition-colors">Thư viện pháp luật</a></li>
              <li><a href="#" className="hover:text-authority-blue transition-colors">Soạn thảo hợp đồng</a></li>
              <li><a href="#" className="hover:text-authority-blue transition-colors">Kết nối Luật sư</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-headline">Hỗ trợ</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-authority-blue transition-colors">Trung tâm trợ giúp</a></li>
              <li><a href="#" className="hover:text-authority-blue transition-colors">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="hover:text-authority-blue transition-colors">Chính sách bảo mật</a></li>
              <li><a href="#" className="hover:text-authority-blue transition-colors">Câu hỏi thường gặp</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 font-headline">Liên hệ</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-authority-blue" />
                <span>contact@thagn.ai</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-authority-blue" />
                <span>+84 (0) 123 456 789</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={18} className="text-authority-blue" />
                <span>Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} THAGN.AI. Tất cả quyền được bảo lưu. Thiết kế bởi Thagn.</p>
        </div>
      </div>
    </footer>
  );
};
