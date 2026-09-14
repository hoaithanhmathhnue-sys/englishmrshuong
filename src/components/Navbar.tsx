import React from 'react';
import { 
  Flame, 
  BookOpen, 
  Mic, 
  Award, 
  Volume2, 
  Home, 
  User,
  Sparkles,
  Key,
  Gamepad2,
  Cpu
} from 'lucide-react';
import { UserProgress } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progress: UserProgress;
  onOpenProfileModal: () => void;
  onOpenApiKeyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progress,
  onOpenProfileModal,
  onOpenApiKeyModal
}) => {
  const tabs = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home, badge: null },
    { id: 'library', label: 'Thư viện 52 câu', icon: BookOpen, badge: '52 câu' },
    { id: 'voicelab', label: 'Luyện Voice AI', icon: Mic, badge: 'Mrs. Huong' },
    { id: 'aigenerator', label: 'AI soạn bài', icon: Sparkles, badge: 'Mới' },
    { id: 'arcade', label: 'Sunflower Arcade', icon: Gamepad2, badge: 'Game' },
    { id: 'certification', label: 'Chứng chỉ & Bảng vàng', icon: Award, badge: progress.masteredIds.length >= 5 ? 'Sẵn sàng' : null },
    { id: 'soundboard', label: 'Soundboard lớp học', icon: Volume2, badge: '8 âm' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs no-print">
      {/* Top micro announcement bar with Sunflower theme */}
      <div className="bg-linear-to-r from-amber-600 via-amber-500 to-yellow-600 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium tracking-wide">
            <span className="inline-flex items-center justify-center bg-white text-amber-900 font-extrabold px-1.5 py-0.5 rounded-sm text-[10px]">
              🌻 2025–2035
            </span>
            <span className="hidden sm:inline">Trường Tiểu học Lê Kim Lăng — Môi trường ngôn ngữ giao tiếp</span>
            <span className="sm:hidden font-bold">TH Lê Kim Lăng • Mrs. Huong</span>
          </div>
          <div className="flex items-center gap-3 text-amber-100 text-[11px]">
            <span className="hidden md:flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>Chủ đề Hoa Hướng Dương • Dấu ấn Mrs. Huong</span>
            </span>
            <span className="hidden md:inline text-amber-200/60">|</span>
            <span className="text-white font-semibold">Mỗi ngày 1 câu • Mỗi tháng 10 câu</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Top Row: Logo, Trang chủ & Tiện ích */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Left: Logo & Brand + Nút Trang chủ */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none shrink-0"
              id="app-logo-brand"
            >
              <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-amber-400 via-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform duration-200 text-xl">
                🌻
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight leading-none group-hover:text-amber-600 transition-colors">
                    Sunflower English
                  </span>
                  <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-md hidden sm:inline-block border border-amber-200">
                    Mrs. Huong
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 font-semibold hidden sm:block leading-tight mt-0.5">
                  Trường Tiểu học Lê Kim Lăng
                </p>
              </div>
            </div>

            {/* Nút Trang chủ riêng biệt trên hàng tiêu đề app */}
            <button
              id="nav-tab-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0 ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500 text-white shadow-amber-500/30 ring-2 ring-amber-300/70'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100/90 hover:text-amber-950 border border-amber-200/90'
              }`}
            >
              <Home className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-white' : 'text-amber-600'}`} />
              <span>Trang chủ</span>
            </button>
          </div>

          {/* Right Status Badges & Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* API Key Modal Button */}
            <button
              onClick={onOpenApiKeyModal}
              title="Cài đặt API Key Google AI (Gemini / Agent Platform)"
              className="p-2 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors flex items-center gap-1 text-xs font-bold shadow-2xs"
            >
              <Key className="w-4 h-4 text-amber-600" />
              <span className="hidden md:inline">API Key</span>
            </button>

            {/* Golden Seeds Bag */}
            <div 
              title="Túi hạt vàng Hướng Dương tích lũy"
              className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 text-yellow-900 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-black shadow-2xs cursor-default"
            >
              <span className="text-sm">🌾</span>
              <span>{progress.goldenSeeds || 0}</span>
              <span className="hidden sm:inline text-yellow-700 text-[10px] font-bold">hạt</span>
            </div>

            {/* Streak Widget */}
            <div 
              title="Chuỗi ngày học liên tục"
              className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs cursor-default"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{progress.streak}</span>
              <span className="hidden sm:inline text-amber-700 text-[10px] font-semibold">ngày</span>
            </div>

            {/* Teacher Profile Button */}
            <button
              onClick={onOpenProfileModal}
              id="btn-teacher-profile"
              className="flex items-center gap-1.5 sm:gap-2 pl-2 pr-2.5 sm:pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all text-left bg-white text-xs font-medium text-slate-700 shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0">
                <User className="w-3.5 h-3.5 text-amber-700" />
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-[11px] font-bold text-slate-800 truncate max-w-[100px]">
                  {progress.profile.name || 'Giáo viên'}
                </div>
                <div className="text-[10px] text-slate-500 truncate max-w-[100px]">
                  {progress.profile.school ? progress.profile.school.split(',')[0] : 'TH Lê Kim Lăng'}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Menu chức năng mới: 2 hàng 3 cột ở giữa tiêu đề app và mục Đề án */}
      <div className="border-t border-amber-200/70 bg-gradient-to-b from-amber-50/70 to-white/90 py-2.5 sm:py-3 px-3 sm:px-6 shadow-xs">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
            {tabs.filter(t => t.id !== 'dashboard').map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-between sm:justify-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 border cursor-pointer select-none ${
                    isActive
                      ? 'bg-linear-to-r from-amber-500 via-amber-500 to-yellow-500 text-white shadow-md shadow-amber-500/25 border-amber-400 font-black ring-2 ring-amber-300/70 translate-y-[-1px]'
                      : 'bg-white hover:bg-amber-50/90 text-slate-700 hover:text-amber-900 border-amber-200/80 shadow-2xs hover:shadow-xs hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-yellow-100' : 'text-amber-600'}`} />
                    <span className="truncate">{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`shrink-0 text-[9px] sm:text-[10px] font-extrabold px-1.5 py-0.5 rounded-full border ${
                      isActive
                        ? 'bg-white/20 text-white border-white/30'
                        : 'bg-amber-100 text-amber-900 border-amber-200'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
