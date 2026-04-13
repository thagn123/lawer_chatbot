import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, MessageSquare, BookOpen, FileText, Users, CreditCard, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Trang chủ', path: '/', icon: Scale },
    { name: 'Trợ lý AI', path: '/chat', icon: MessageSquare },
    { name: 'Thư viện', path: '/library', icon: BookOpen },
    { name: 'Soạn thảo', path: '/drafter', icon: FileText },
    { name: 'Chuyên gia', path: '/experts', icon: Users },
    { name: 'Bảng giá', path: '/pricing', icon: CreditCard },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-morphism border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 juridical-gradient rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                <Scale size={24} />
              </div>
              <span className="text-2xl font-extrabold font-headline tracking-tighter text-authority-dark">
                THAGN<span className="text-authority-blue">.AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-2",
                    isActive 
                      ? "bg-authority-blue text-white shadow-md" 
                      : "text-slate-600 hover:bg-slate-100 hover:text-authority-blue"
                  )}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="ml-4 pl-4 border-l border-slate-200">
              <button className="bg-authority-dark text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-authority-blue/20">
                Đăng nhập
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-authority-blue p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all",
                      isActive 
                        ? "bg-authority-blue/10 text-authority-blue" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="pt-4 px-4">
                <button className="w-full bg-authority-dark text-white py-3 rounded-xl font-bold">
                  Đăng nhập
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
