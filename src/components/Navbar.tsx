import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX,
  BookOpen, 
  Mic, 
  Sparkles, 
  Gamepad2, 
  Award, 
  ChevronDown, 
  Menu, 
  X,
  Smartphone,
  Layers,
  Settings,
  User
} from 'lucide-react';
import { UserProgress } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progress: UserProgress;
  onOpenProfileModal: () => void;
  onOpenApiKeyModal: () => void;
  onOpenMobileNotice?: () => void;
  onOpenFlashcard?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progress,
  onOpenProfileModal,
  onOpenApiKeyModal,
  onOpenMobileNotice,
  onOpenFlashcard
}) => {
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainTabs = [
    { id: 'dashboard', label: '4 Nhóm Câu', icon: BookOpen },
    { id: 'library', label: 'Thư Viện K-5', icon: BookOpen },
    { id: 'voicelab', label: 'Luyện Giọng AI', icon: Mic },
    { id: 'arcade', label: 'Đấu Trường Arcade', icon: Gamepad2 },
  ];

  const moreTabs = [
    { id: 'aigenerator', label: 'Soạn Lớp Học AI', icon: Sparkles },
    { id: 'certification', label: 'Chứng Chỉ Sư Phạm', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#FFB800]/25 shadow-xs no-print">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          
          {/* Left: Logo — 🌻 Vocabdaily | lklprimaryschool */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
            id="app-logo-brand"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFB800] flex items-center justify-center text-white shadow-md shadow-[#FFB800]/25 group-hover:scale-105 transition-transform duration-200 text-lg sm:text-xl sunflower-glow">
              🌻
            </div>
            <div>
              <span className="font-black text-[#1E293B] text-sm sm:text-base tracking-tight leading-none group-hover:text-[#FFB800] transition-colors block whitespace-nowrap">
                Vocabdaily
              </span>
              <span className="text-[10px] sm:text-[11px] text-amber-600 font-bold leading-tight block whitespace-nowrap">
                lklprimaryschool
              </span>
            </div>
          </div>

          {/* Center: Main Navigation (desktop) - rộng rãi, thoáng đãng */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {mainTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FFB800] text-slate-900 shadow-xs'
                      : 'text-slate-700 hover:bg-amber-50 hover:text-amber-800'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900' : 'text-amber-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Quick 3D Flashcard Button */}
            {onOpenFlashcard && (
              <button
                onClick={onOpenFlashcard}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-teal-50 text-teal-800 border border-teal-200 hover:bg-teal-100 transition-colors whitespace-nowrap"
                title="Mở bộ Flashcard 3D lật mặt"
              >
                <Layers className="w-4 h-4 text-teal-600" />
                <span>Flashcard 3D</span>
              </button>
            )}

            {/* Quick Mobile Tip Button */}
            {onOpenMobileNotice && (
              <button
                onClick={onOpenMobileNotice}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors whitespace-nowrap"
                title="Lưu ý quan trọng khi mở trên điện thoại (Zalo/Facebook)"
              >
                <Smartphone className="w-4 h-4 text-amber-600" />
                <span>Lưu ý ĐT</span>
              </button>
            )}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  moreTabs.some(t => t.id === activeTab)
                    ? 'bg-[#FFB800] text-slate-900 shadow-xs'
                    : 'text-slate-700 hover:bg-amber-50'
                }`}
              >
                <span>Thêm</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsMoreOpen(false)} />
                  <div className="absolute right-0 top-full mt-1.5 z-40 bg-white rounded-2xl shadow-xl border border-amber-100 py-2 w-56 animate-fadeInUp">
                    {moreTabs.map(tab => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => { setActiveTab(tab.id); setIsMoreOpen(false); }}
                          className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition-colors ${
                            activeTab === tab.id
                              ? 'bg-amber-50 text-amber-700'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-amber-500" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => { onOpenApiKeyModal(); setIsMoreOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-slate-400" />
                        <span>API Cấu Hình Gemini</span>
                      </button>
                      <button
                        onClick={() => { onOpenProfileModal(); setIsMoreOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        <span>Hồ Sơ Giáo Viên</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right: Sound Toggle + Mobile Menu (đã xóa slogan để tối ưu không gian) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Mobile Tip for small screen */}
            {onOpenMobileNotice && (
              <button
                onClick={onOpenMobileNotice}
                className="md:hidden p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors"
                title="Lưu ý khi mở trên điện thoại (Zalo/Facebook)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            )}

            {/* Quick Flashcard for small screen */}
            {onOpenFlashcard && (
              <button
                onClick={onOpenFlashcard}
                className="md:hidden p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 transition-colors"
                title="Flashcard 3D"
              >
                <Layers className="w-4 h-4" />
              </button>
            )}

            {/* Sound Toggle */}
            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              title={isSoundOn ? 'Âm thanh: BẬT' : 'Âm thanh: TẮT'}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all ${
                isSoundOn 
                  ? 'bg-amber-100/60 border-amber-300 text-amber-700 hover:bg-amber-100' 
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
              }`}
            >
              {isSoundOn 
                ? <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" /> 
                : <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              }
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              {isMoreOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMoreOpen && (
        <div className="md:hidden border-t border-amber-100 bg-white px-4 py-3 space-y-1 animate-fadeInUp shadow-lg">
          {[...mainTabs, ...moreTabs].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsMoreOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-[#FFB800] text-slate-900 shadow-xs'
                    : 'text-slate-700 hover:bg-amber-50'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-600" />
                <span>{tab.label}</span>
              </button>
            );
          })}
          
          <div className="border-t border-slate-100 pt-2 grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => { onOpenApiKeyModal(); setIsMoreOpen(false); }}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 text-center"
            >
              ⚙️ Cấu Hình API
            </button>
            <button
              onClick={() => { onOpenProfileModal(); setIsMoreOpen(false); }}
              className="px-3 py-2 rounded-xl text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 text-center"
            >
              👤 Hồ Sơ Giáo Viên
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
