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
  X
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
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const mainTabs = [
    { id: 'dashboard', label: 'Phrases', icon: BookOpen },
    { id: 'voicelab', label: 'Voice Lab', icon: Mic },
  ];

  const moreTabs = [
    { id: 'aigenerator', label: 'AI Generator', icon: Sparkles },
    { id: 'arcade', label: 'Arcade', icon: Gamepad2 },
    { id: 'certification', label: 'Certificates', icon: Award },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#FFB800]/20 shadow-sm no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
          {/* Left: Logo — 🌻 Vocabdaily | lklschool */}
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
            id="app-logo-brand"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFB800] flex items-center justify-center text-white shadow-md shadow-[#FFB800]/25 group-hover:scale-105 transition-transform duration-200 text-lg sm:text-xl sunflower-glow">
              🌻
            </div>
            <div>
              <span className="font-black text-[#222222] text-sm sm:text-base tracking-tight leading-none group-hover:text-[#FFB800] transition-colors block">
                Vocabdaily
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#888] font-semibold leading-tight block">
                lklschool
              </span>
            </div>
          </div>

          {/* Center: Main Navigation (desktop) */}
          <nav className="hidden sm:flex items-center gap-1">
            {mainTabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id || 
                (tab.id === 'dashboard' && activeTab === 'library');
              return (
                <button
                  key={tab.id}
                  id={`nav-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#FFB800] text-white shadow-md shadow-[#FFB800]/25'
                      : 'text-[#444] hover:bg-[#FFB800]/10 hover:text-[#222]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#FFB800]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            {/* More dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  moreTabs.some(t => t.id === activeTab)
                    ? 'bg-[#FFB800] text-white shadow-md shadow-[#FFB800]/25'
                    : 'text-[#444] hover:bg-[#FFB800]/10'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isMoreOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMoreOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsMoreOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 z-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-48 animate-fadeInUp">
                    {moreTabs.map(tab => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => { setActiveTab(tab.id); setIsMoreOpen(false); }}
                          className={`w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold transition-colors ${
                            activeTab === tab.id
                              ? 'bg-[#FFB800]/10 text-[#FFB800]'
                              : 'text-[#444] hover:bg-gray-50'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => { onOpenApiKeyModal(); setIsMoreOpen(false); }}
                        className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-[#888] hover:bg-gray-50 transition-colors"
                      >
                        <span>⚙️</span>
                        <span>API Settings</span>
                      </button>
                      <button
                        onClick={() => { onOpenProfileModal(); setIsMoreOpen(false); }}
                        className="w-full flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium text-[#888] hover:bg-gray-50 transition-colors"
                      >
                        <span>👤</span>
                        <span>Profile</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>

          {/* Right: Slogan + Sound Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="hidden md:inline text-xs font-bold text-[#FFB800] tracking-wide">
              Shine Every Day! 🌻
            </span>

            {/* Sound Toggle */}
            <button
              onClick={() => setIsSoundOn(!isSoundOn)}
              title={isSoundOn ? 'Sound ON' : 'Sound OFF'}
              className={`p-2 rounded-xl border transition-all ${
                isSoundOn 
                  ? 'bg-[#FFB800]/10 border-[#FFB800]/30 text-[#FFB800]' 
                  : 'bg-gray-100 border-gray-200 text-gray-400'
              }`}
            >
              {isSoundOn 
                ? <Volume2 className="w-4 h-4" /> 
                : <VolumeX className="w-4 h-4" />
              }
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="sm:hidden p-2 rounded-xl border border-gray-200 text-[#444] hover:bg-gray-50 transition-colors"
            >
              {isMoreOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMoreOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1 animate-fadeInUp">
          {[...mainTabs, ...moreTabs].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id || 
              (tab.id === 'dashboard' && activeTab === 'library');
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsMoreOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#FFB800] text-white'
                    : 'text-[#444] hover:bg-[#FFB800]/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#FFB800]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
          <div className="border-t border-gray-100 pt-2 mt-2 flex gap-2">
            <button
              onClick={() => { onOpenApiKeyModal(); setIsMoreOpen(false); }}
              className="flex-1 text-center px-3 py-2 rounded-xl text-xs font-medium text-[#888] bg-gray-50 hover:bg-gray-100"
            >
              ⚙️ Settings
            </button>
            <button
              onClick={() => { onOpenProfileModal(); setIsMoreOpen(false); }}
              className="flex-1 text-center px-3 py-2 rounded-xl text-xs font-medium text-[#888] bg-gray-50 hover:bg-gray-100"
            >
              👤 Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
