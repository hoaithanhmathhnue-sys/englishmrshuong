import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX,
  BookOpen, 
  Mic, 
  Sparkles, 
  Gamepad2, 
  Award, 
  Menu, 
  X,
  Smartphone,
  Layers,
  Settings,
  User,
  Home
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

  const allTabs = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home },
    { id: 'dashboard', label: 'Nhóm câu', icon: BookOpen, tabOverride: 'dashboard' },
    { id: 'library', label: 'Thư viện K-5', icon: BookOpen },
    { id: 'voicelab', label: 'Luyện giọng AI', icon: Mic },
    { id: 'arcade', label: 'Đấu trường Arcade', icon: Gamepad2 },
  ];

  // Deduplicate: use only unique tab ids for navigation
  const mainTabs = [
    { id: 'dashboard', label: 'Trang chủ', icon: Home },
    { id: 'library', label: 'Thư Viện K-5', icon: BookOpen },
    { id: 'voicelab', label: 'Luyện giọng AI', icon: Mic },
    { id: 'arcade', label: 'Đấu Trường Arcade', icon: Gamepad2 },
  ];

  const extraTabs = [
    { id: 'aigenerator', label: 'Soạn Lớp Học AI', icon: Sparkles },
    { id: 'certification', label: 'Chứng Chỉ Sư Phạm', icon: Award },
  ];

  const mobileTabs = [...mainTabs, ...extraTabs];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#FFB800]/25 shadow-xs no-print">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5">
        <div className="flex items-center justify-between h-14 gap-2">
          
          {/* Left: Logo — 🌻 Vocabdaily */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
            id="app-logo-brand"
          >
            <div className="w-9 h-9 rounded-xl bg-[#FFB800] flex items-center justify-center text-white shadow-md shadow-[#FFB800]/25 group-hover:scale-105 transition-transform duration-200 text-lg sunflower-glow">
              🌻
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-[#1E293B] text-sm tracking-tight leading-none group-hover:text-[#FFB800] transition-colors block whitespace-nowrap">
                Vocabdaily
              </span>
              <span className="text-[10px] text-amber-600 font-bold leading-tight block whitespace-nowrap">
                Teacher's English Hub
              </span>
            </div>
          </div>

          {/* Center: Navigation (desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {mainTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#FFB800]/15 text-amber-800 border border-amber-300/60'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* Flashcard 3D */}
            {onOpenFlashcard && (
              <button
                onClick={onOpenFlashcard}
                className="flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-bold text-teal-700 hover:bg-teal-50 border border-teal-200/60 transition-colors whitespace-nowrap"
                title="Flashcard 3D"
              >
                <Layers className="w-3.5 h-3.5 text-teal-500" />
                <span>Flashcard 3D</span>
              </button>
            )}

            {/* Mobile Notice */}
            {onOpenMobileNotice && (
              <button
                onClick={onOpenMobileNotice}
                className="flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-full text-xs font-bold text-amber-700 hover:bg-amber-50 border border-amber-200/60 transition-colors whitespace-nowrap"
                title="Lưu ý ĐT"
              >
                <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden lg:inline">Lưu ý ĐT</span>
              </button>
            )}
          </nav>

          {/* Right: Utilities + Avatar */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick Mobile Tip for small screen */}
            {onOpenMobileNotice && (
              <button
                onClick={onOpenMobileNotice}
                className="md:hidden p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors"
                title="Lưu ý khi mở trên điện thoại"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            )}

            {/* Flashcard for small screen */}
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
              className={`p-2 rounded-xl border transition-all ${
                isSoundOn 
                  ? 'bg-amber-100/60 border-amber-300 text-amber-700 hover:bg-amber-100' 
                  : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200'
              }`}
            >
              {isSoundOn 
                ? <Volume2 className="w-4 h-4" /> 
                : <VolumeX className="w-4 h-4" />
              }
            </button>

            {/* Avatar / Profile */}
            <button
              onClick={onOpenProfileModal}
              className="hidden md:flex w-9 h-9 rounded-full bg-amber-100 border-2 border-amber-300 items-center justify-center text-amber-700 hover:bg-amber-200 transition-colors"
              title="Hồ Sơ Giáo Viên"
            >
              <User className="w-4 h-4" />
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
          {mobileTabs.map(tab => {
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
