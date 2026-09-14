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
    { id: 'dashboard', label: 'Trang Chủ', icon: Home, badge: null },
    { id: 'library', label: 'Thư Viện 52 Câu', icon: BookOpen, badge: '52 câu' },
    { id: 'voicelab', label: 'Luyện Voice AI', icon: Mic, badge: 'Mrs. Huong' },
    { id: 'aigenerator', label: 'AI Soạn Bài', icon: Sparkles, badge: 'Mới' },
    { id: 'arcade', label: 'Sunflower Arcade', icon: Gamepad2, badge: 'Game' },
    { id: 'certification', label: 'Chứng Chỉ & Bảng Vàng', icon: Award, badge: progress.masteredIds.length >= 5 ? 'Sẵn sàng' : null },
    { id: 'soundboard', label: 'Soundboard Lớp Học', icon: Volume2, badge: '8 Âm' }
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

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Brand */}
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

          {/* Navigation Links - Desktop */}
          <nav className="hidden xl:flex items-center gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 relative ${
                    isActive 
                      ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30' 
                      : 'text-slate-600 hover:text-amber-800 hover:bg-amber-50/70'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-yellow-200' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && !isActive && (
                    <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Status Badges & Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
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
              className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 text-yellow-900 px-2.5 py-1.5 rounded-xl text-xs font-black shadow-2xs cursor-default"
            >
              <span className="text-sm">🌾</span>
              <span>{progress.goldenSeeds || 0}</span>
              <span className="hidden sm:inline text-yellow-700 text-[10px] font-bold">hạt</span>
            </div>

            {/* Streak Widget */}
            <div 
              title="Chuỗi ngày học liên tục"
              className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs cursor-default"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
              <span>{progress.streak}</span>
              <span className="hidden sm:inline text-amber-700 text-[10px] font-semibold">ngày</span>
            </div>

            {/* Teacher Profile Button */}
            <button
              onClick={onOpenProfileModal}
              id="btn-teacher-profile"
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition-all text-left bg-white text-xs font-medium text-slate-700 shadow-2xs"
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

      {/* Mobile / Tablet Horizontal Scroll Navigation */}
      <div className="xl:hidden border-t border-amber-100 bg-amber-50/60 px-2 py-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-amber-800 hover:bg-amber-100/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
