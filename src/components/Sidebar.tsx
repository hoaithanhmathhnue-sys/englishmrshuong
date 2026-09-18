import React from 'react';
import {
  Home,
  MessageCircle,
  BookOpen,
  Sun,
  Star,
  GraduationCap,
  Users,
  Package,
  Zap,
  Mic,
  FileText,
  Heart,
} from 'lucide-react';
import { VocabCategory } from '../types';

interface SidebarProps {
  activeTab: string;
  activeCategory: VocabCategory | null;
  onNavigateTab: (tab: string) => void;
  onSelectCategory: (category: VocabCategory) => void;
  onOpenFlashcard?: () => void;
}

const TOPIC_ITEMS: { id: VocabCategory; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'Greeting & Starting', label: 'Chào hỏi & Làm quen', icon: MessageCircle, color: 'text-orange-500' },
  { id: 'Classroom Instructions', label: 'Lớp học & Kỷ luật', icon: BookOpen, color: 'text-blue-500' },
  { id: 'Daily Communication', label: 'Hoạt động hàng ngày', icon: Sun, color: 'text-purple-500' },
  { id: 'Praise & Encouragement', label: 'Cảm xúc & Khen ngợi', icon: Star, color: 'text-yellow-500' },
];

const TOOL_ITEMS = [
  { id: 'vocab-quick', label: 'Từ vựng nhanh', icon: Zap, action: 'dashboard' },
  { id: 'voice-lab', label: 'Ghi âm & Luyện nói', icon: Mic, action: 'voicelab' },
  { id: 'docs', label: 'Tài tài liệu', icon: FileText, action: 'aigenerator' },
  { id: 'favorites', label: 'Yêu thích', icon: Heart, action: 'library' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  activeCategory,
  onNavigateTab,
  onSelectCategory,
}) => {
  return (
    <aside className="hidden lg:flex flex-col w-[240px] min-w-[240px] h-[calc(100vh-56px)] sticky top-14 bg-white border-r border-slate-200/80 no-print">
      <div className="flex-1 overflow-y-auto sidebar-scrollbar px-3 py-4 space-y-5">

        {/* Home */}
        <button
          onClick={() => onNavigateTab('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'dashboard'
              ? 'bg-amber-50 text-amber-800 border border-amber-200'
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Home className={`w-4.5 h-4.5 ${activeTab === 'dashboard' ? 'text-amber-600' : 'text-slate-400'}`} />
          <span>Trang chủ</span>
        </button>

        {/* Topic Navigation */}
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3">
            Học theo chủ đề
          </h4>
          {TOPIC_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === 'dashboard' && activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigateTab('dashboard');
                  onSelectCategory(item.id);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-600' : item.color}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}

          {/* Placeholder: Học tập & Hướng dẫn */}
          <button
            onClick={() => onNavigateTab('library')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all"
          >
            <GraduationCap className="w-4 h-4 shrink-0 text-teal-500" />
            <span className="truncate">Học tập & Hướng dẫn</span>
          </button>

          {/* Placeholder: Gia đình & Bạn bè */}
          <button
            onClick={() => onNavigateTab('library')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all"
          >
            <Users className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="truncate">Gia đình & Bạn bè</span>
          </button>

          {/* Khác */}
          <button
            onClick={() => onNavigateTab('library')}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-all"
          >
            <Package className="w-4 h-4 shrink-0 text-slate-400" />
            <span className="truncate">Khác</span>
          </button>
        </div>

        {/* Support Tools */}
        <div className="space-y-1.5">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3">
            Công cụ hỗ trợ
          </h4>
          {TOOL_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.action && item.id !== 'vocab-quick';
            return (
              <button
                key={item.id}
                onClick={() => onNavigateTab(item.action)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-600' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom sunflower mascot area */}
      <div className="px-4 py-3 border-t border-slate-100">
        <div className="bg-amber-50/80 rounded-2xl p-3 text-center border border-amber-200/60">
          <div className="text-3xl mb-1">🌻</div>
          <p className="text-[10px] font-bold text-amber-800 italic leading-snug">
            "Small Talks,<br/>Big Impact"
          </p>
        </div>
      </div>
    </aside>
  );
};
