import React from 'react';
import { BookOpen, Sparkles, Phone, Mail, FileText, Volume2, ShieldCheck, Heart, Smartphone } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenMobileNotice: () => void;
  onOpenFlashcard: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateTab, 
  onOpenMobileNotice, 
  onOpenFlashcard 
}) => {
  return (
    <footer className="bg-[#111F24] text-slate-300 border-t border-slate-800 mt-16 pt-12 pb-8 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Top Grid: 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Brand & Mission (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-xl shadow-xs">
                🌻
              </div>
              <div>
                <h3 className="text-base font-black text-white tracking-tight">
                  Primary English Club
                </h3>
                <p className="text-xs font-semibold text-amber-400">
                  CLB Tiếng Anh Giao Tiếp Giáo Viên Tiểu Học
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Sứ mệnh đồng hành cùng giáo viên tiểu học xây dựng môi trường lớp học tiếng Anh tương tác cao, tràn ngập niềm vui và chuẩn mực sư phạm quốc tế.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-bold text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>"Tự tin tiếng Anh, bừng sáng lớp học tiểu học"</span>
            </div>
          </div>

          {/* 6 Phân hệ học tập (md:col-span-3) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-teal-400" />
              <span>6 Phân Hệ Học Tập</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigateTab('library')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Thư viện khẩu lệnh K-5
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('voicelab')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Phòng luyện giọng & Sắc thái AI
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenFlashcard}
                  className="hover:text-amber-300 transition-colors text-left text-amber-400 font-bold flex items-center gap-1.5"
                >
                  <span>Flashcard tình huống 3D</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded">Mới</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('arcade')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Đấu trường Hoa Hướng Dương (Arcade)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('aigenerator')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Trợ lý Soạn Giáo Án AI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('certification')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Chứng chỉ số sư phạm & Quiz
                </button>
              </li>
            </ul>
          </div>

          {/* Tài liệu & Công cụ (md:col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Tài Liệu & Công Cụ</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={onOpenFlashcard}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Tải Flashcard & Poster in ấn (A4)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('arcade')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Bàn âm thanh lớp học (Soundboard)
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenMobileNotice}
                  className="hover:text-amber-300 transition-colors text-left flex items-center gap-1 text-amber-400 font-medium"
                >
                  <Smartphone className="w-3 h-3" />
                  <span>Lưu ý dùng điện thoại</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateTab('dashboard')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  Kho 4 nhóm Vocabdaily
                </button>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ giáo viên (md:col-span-2) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hỗ Trợ Giáo Viên</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-bold text-white">1900 6868</span>
              </div>
              <div className="text-[11px] text-slate-500 pl-5">
                (8:00 - 20:00 hàng ngày)
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:hotro@primaryenglish.edu.vn" className="hover:underline text-[11px] text-slate-300">
                  hotro@primaryenglish.edu.vn
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & dedication */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © 2026 English Communication Club for Primary School Teachers. Bản quyền thuộc về CLB Tiếng Anh Tiểu Học.
          </div>
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <span>Được thiết kế với</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse inline" />
            <span>dành tặng các thầy cô giáo tiểu học Việt Nam</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
