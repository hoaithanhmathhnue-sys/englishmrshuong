import React, { useState } from 'react';
import { 
  Sparkles, 
  Volume2, 
  RefreshCw, 
  Mic, 
  Award, 
  CheckCircle2, 
  Heart, 
  Layers, 
  ArrowRight,
  Flame,
  Star,
  BookOpen,
  GraduationCap,
  Play,
  Calculator,
  Users,
  MessageSquareHeart,
  Gamepad2,
  HelpCircle,
  Clock,
  Zap
} from 'lucide-react';
import { CommandItem, UserProgress, LearningHistoryEntry, HistoryEntryType } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';
import { SUNFLOWER_SLOGAN, FOUNDER_NOTE, getSunflowerGardenState } from '../data/sunflowerFeedbackData';

interface DashboardTabProps {
  commands: CommandItem[];
  progress: UserProgress;
  learningHistory: LearningHistoryEntry[];
  onNavigateTab: (tab: string, selectedCommandId?: string) => void;
  onToggleBookmark: (commandId: string) => void;
}

// Helper: format relative time in Vietnamese
const formatRelativeTime = (isoString: string): string => {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Vừa xong';
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ngày trước`;
  return new Date(isoString).toLocaleDateString('vi-VN');
};

// Helper: icon + color per history type
const HISTORY_TYPE_META: Record<HistoryEntryType, { icon: string; color: string }> = {
  practice: { icon: '🎙️', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  bookmark: { icon: '💛', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  ai_generate: { icon: '✨', color: 'bg-amber-100 text-amber-800 border-amber-200' },
  scenario_custom: { icon: '⚡', color: 'bg-purple-100 text-purple-800 border-purple-200' },
  mastered: { icon: '⭐', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  badge: { icon: '🏅', color: 'bg-rose-100 text-rose-800 border-rose-200' }
};

export const DashboardTab: React.FC<DashboardTabProps> = ({
  commands,
  progress,
  learningHistory,
  onNavigateTab,
  onToggleBookmark
}) => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isPlayingNormal, setIsPlayingNormal] = useState(false);
  const [isPlayingSlow, setIsPlayingSlow] = useState(false);

  // Focus commands for this month (10 required commands)
  const monthlyCommands = commands.filter(c => c.isMonthlyRequired || c.category === '10 Câu Lệnh Tháng');
  const activePool = monthlyCommands.length > 0 ? monthlyCommands : commands;
  const featuredCommand = activePool[featuredIndex % activePool.length] || commands[0];
  const isBookmarked = progress.bookmarkedIds.includes(featuredCommand.id);
  const isMastered = progress.masteredIds.includes(featuredCommand.id);

  // Garden state
  const gardenLevel = getSunflowerGardenState(progress.streak);

  // Switch to next command
  const handleNextFeatured = () => {
    stopSpeaking();
    setFeaturedIndex((prev) => (prev + 1) % activePool.length);
  };

  const handlePlayAudio = (rate: number) => {
    stopSpeaking();
    if (rate === 1.0) setIsPlayingNormal(true);
    if (rate === 0.7) setIsPlayingSlow(true);

    const textToSpeak = `${featuredCommand.teacherCall}. ${featuredCommand.studentResponse}`;

    speakText(textToSpeak, {
      rate,
      tone: featuredCommand.toneRecommendation,
      onEnd: () => {
        setIsPlayingNormal(false);
        setIsPlayingSlow(false);
      }
    });
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* 1. Hero Sunflower Slogan Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-500 via-amber-600 to-yellow-600 text-white p-6 sm:p-8 md:p-10 shadow-xl shadow-amber-500/20 border border-amber-300">
        {/* Decorative background sun & blooms */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-yellow-300/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-black tracking-wide border border-white/30">
              <span className="text-sm">🌻</span>
              <span>ĐỀ ÁN MÔI TRƯỜNG NGÔN NGỮ TIỂU HỌC 2025–2035</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              "{SUNFLOWER_SLOGAN.english}"
            </h1>

            <p className="text-yellow-100 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
              {SUNFLOWER_SLOGAN.vietnamese} — Dấu ấn tâm huyết từ cô Lê Thị Thu Hương (Mrs. Huong), Trường Tiểu học Lê Kim Lăng. Giúp mỗi giáo viên tiểu học tự tin trao đổi, lan tỏa môi trường Tiếng Anh tự nhiên tới học trò thân yêu.
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigateTab('library')}
                className="px-5 py-2.5 rounded-2xl bg-white hover:bg-yellow-50 text-amber-950 font-black text-xs sm:text-sm transition-all shadow-md shadow-amber-950/10 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Khám phá 52 Khẩu Lệnh</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateTab('aigenerator')}
                className="px-5 py-2.5 rounded-2xl bg-amber-800/80 hover:bg-amber-900 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border border-white/20 backdrop-blur-xs hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>AI soạn câu lệnh theo bài</span>
              </button>

              <button
                onClick={() => onNavigateTab('arcade')}
                className="px-5 py-2.5 rounded-2xl bg-yellow-400/90 hover:bg-yellow-300 text-amber-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs hover:scale-[1.02]"
              >
                <Gamepad2 className="w-4 h-4 text-amber-900" />
                <span>Sunflower Arcade</span>
              </button>
            </div>
          </div>

          {/* Right Hero Badge Card */}
          <div className="lg:col-span-4 bg-white/15 backdrop-blur-md rounded-3xl p-5 border border-white/30 text-center space-y-3">
            <div className="text-4xl animate-bounce">🌻</div>
            <div className="text-base font-black text-white">
              Vườn hướng dương Mrs. Huong
            </div>
            <p className="text-xs text-amber-100 leading-relaxed">
              "Mỗi ngày một câu, mỗi tháng mười câu — Từng bước một, góp gió thành bão!"
            </p>
            <div className="pt-2 border-t border-white/20 flex items-center justify-around text-xs font-bold">
              <div>
                <span className="block text-xl font-black text-white">{progress.streak}</span>
                <span className="text-amber-200 text-[10px]">Ngày Chuỗi 🔥</span>
              </div>
              <div>
                <span className="block text-xl font-black text-white">{progress.goldenSeeds || 0}</span>
                <span className="text-amber-200 text-[10px]">Hạt Vàng 🌾</span>
              </div>
              <div>
                <span className="block text-xl font-black text-white">{progress.masteredIds.length}</span>
                <span className="text-amber-200 text-[10px]">Thành Thục ⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Lịch Sử Học Gần Đây (thay thế Visit Counter) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-amber-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-extrabold text-slate-900">Lịch sử học gần đây</h2>
          </div>
          {learningHistory.length > 0 && (
            <span className="text-[11px] text-slate-500 font-medium">
              {learningHistory.length} hoạt động
            </span>
          )}
        </div>

        {learningHistory.length === 0 ? (
          <div className="text-center py-6 space-y-2">
            <div className="text-3xl">🌱</div>
            <p className="text-xs text-slate-500 font-medium">
              Chưa có hoạt động nào. Bắt đầu luyện tập để ghi lại dấu ấn đầu tiên!
            </p>
            <button
              onClick={() => onNavigateTab('library')}
              className="px-4 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors"
            >
              Khám phá thư viện câu lệnh
            </button>
          </div>
        ) : (
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto">
            {learningHistory.slice(0, 8).map(entry => {
              const meta = HISTORY_TYPE_META[entry.type] || HISTORY_TYPE_META.practice;
              return (
                <div
                  key={entry.id}
                  className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${meta.color} transition-colors text-xs`}
                >
                  <span className="text-base shrink-0 mt-0.5">{meta.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-slate-900 truncate">{entry.title}</div>
                    {entry.details && (
                      <div className="text-slate-600 truncate">{entry.details}</div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium shrink-0 whitespace-nowrap">
                    {formatRelativeTime(entry.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Founder's Note from Mrs. Huong & Digital Sunflower Garden */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Founder's Note (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-amber-100">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0">
              💌
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                {FOUNDER_NOTE.title}
              </h2>
              <p className="text-xs text-amber-800 font-semibold">
                {FOUNDER_NOTE.author} • {FOUNDER_NOTE.school}
              </p>
            </div>
          </div>

          <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line italic bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
            "{FOUNDER_NOTE.content}"
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span className="flex items-center gap-1.5 font-semibold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Phương pháp phản xạ TPR & Kỷ luật tích cực</span>
            </span>
            <span className="font-bold text-amber-700">Trường TH Lê Kim Lăng</span>
          </div>
        </div>

        {/* Digital Garden Status (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                Chậu Hoa Cá Nhân
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                {gardenLevel.title}
              </span>
            </div>
            <h3 className="text-lg font-black text-slate-900">
              Vườn hướng dương của bạn
            </h3>
          </div>

          <div className="text-center py-4 space-y-2 bg-linear-to-b from-yellow-50 to-amber-50/50 rounded-2xl border border-amber-200/60">
            <div className="text-5xl animate-pulse">{gardenLevel.emoji}</div>
            <div className="font-extrabold text-sm text-slate-900">{gardenLevel.title}</div>
            <p className="text-xs text-slate-600 px-4 leading-relaxed">
              {gardenLevel.description}
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between font-bold text-slate-700">
              <span>Chuỗi chuyên cần: {progress.streak} ngày</span>
              <span className="text-amber-700">Thu hoạch: {progress.goldenSeeds || 0} hạt vàng</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-linear-to-r from-amber-400 to-yellow-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (progress.streak / 21) * 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Duy trì liên tục 21 ngày để đạt danh hiệu Vườn Hoa Hoàng Gia Vàng Óng!
            </p>
          </div>
        </div>
      </div>

      {/* 4. Featured Classroom Command Spotlight */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-800">
              Khẩu Lệnh Tiêu Biểu Trong Tháng (10 Câu Bắt Buộc)
            </span>
          </div>

          <button
            onClick={handleNextFeatured}
            className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Đổi câu khác</span>
          </button>
        </div>

        {/* Command Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                {featuredCommand.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                {featuredCommand.gradeLevel}
              </span>
              {featuredCommand.isMonthlyRequired && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-400 text-slate-950">
                  ⭐️ Trọng tâm tháng
                </span>
              )}
            </div>

            {/* Teacher Call */}
            <div>
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                Cô hô (Teacher Call):
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                "{featuredCommand.teacherCall}"
              </div>
              <div className="text-xs font-mono text-amber-700 font-medium pt-0.5">
                {featuredCommand.callIpa}
              </div>
            </div>

            {/* Student Response */}
            <div className="bg-amber-50/80 p-3.5 rounded-2xl border border-amber-200/80 space-y-1">
              <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                Trò đáp (Student Response):
              </div>
              <div className="text-base sm:text-lg font-black text-slate-800">
                "{featuredCommand.studentResponse}"
              </div>
              <div className="text-xs text-slate-600 font-medium">
                👉 Nghĩa: {featuredCommand.vietnameseTranslation}
              </div>
            </div>

            {/* TPR Gesture Tip */}
            <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2">
              <span className="text-base shrink-0">{featuredCommand.tprCue.iconTip.split(' ')[0]}</span>
              <div>
                <span className="font-bold text-slate-900">Cử chỉ hình thể (TPR): </span>
                <span>{featuredCommand.tprCue.teacherAction}</span>
              </div>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-4 bg-linear-to-b from-amber-50 to-yellow-50 p-5 rounded-3xl border border-amber-200 space-y-3 text-center">
            <div className="text-xs font-bold text-slate-700">Luyện nghe mẫu tức thì</div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => handlePlayAudio(1.0)}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Volume2 className={`w-4 h-4 ${isPlayingNormal ? 'animate-bounce text-yellow-200' : ''}`} />
                <span>Nghe mẫu chuẩn 1.0x</span>
              </button>

              <button
                onClick={() => handlePlayAudio(0.7)}
                className="w-full py-2 px-4 rounded-xl bg-white hover:bg-amber-100/60 text-slate-800 font-bold text-xs border border-amber-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Nghe chậm 0.7x (rõ âm đuôi)</span>
              </button>
            </div>

            <div className="pt-2 border-t border-amber-200/60 flex items-center justify-around">
              <button
                onClick={() => onToggleBookmark(featuredCommand.id)}
                className={`text-xs font-semibold flex items-center gap-1 ${
                  isBookmarked ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Heart className={`w-4 h-4 ${isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isBookmarked ? 'Đã ghim' : 'Ghim bài'}</span>
              </button>

              <button
                onClick={() => onNavigateTab('voicelab', featuredCommand.id)}
                className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                <Mic className="w-4 h-4 text-amber-600" />
                <span>Luyện giọng AI</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Four Quick Exploration Portals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 10 Monthly Required Commands */}
        <div 
          onClick={() => onNavigateTab('library')}
          className="bg-white rounded-3xl p-5 border-2 border-amber-200 hover:border-amber-400 cursor-pointer transition-all hover:shadow-md space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            🌟
          </div>
          <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
            10 Câu Lệnh Trong Tháng
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Bộ 10 câu trọng tâm bắt buộc rèn luyện để áp dụng trôi chảy vào giờ dạy.
          </p>
          <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
            <span>Vào học ngay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 2: Math Classroom Language */}
        <div 
          onClick={() => onNavigateTab('library')}
          className="bg-white rounded-3xl p-5 border-2 border-amber-200 hover:border-amber-400 cursor-pointer transition-all hover:shadow-md space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-yellow-100 text-yellow-900 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            📐
          </div>
          <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
            Tiếng Anh Môn Toán
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            16 câu lệnh chuẩn cho tiết Toán: số đếm, cộng/trừ, hình học, bảng con.
          </p>
          <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
            <span>Xem 16 câu Toán</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 3: Colleague Communication */}
        <div 
          onClick={() => onNavigateTab('library')}
          className="bg-white rounded-3xl p-5 border-2 border-amber-200 hover:border-amber-400 cursor-pointer transition-all hover:shadow-md space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-900 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            👥
          </div>
          <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
            Giao Tiếp Đồng Nghiệp
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            12 câu giao tiếp tự nhiên ngoài hành lang, văn phòng và giờ giải lao.
          </p>
          <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
            <span>Xem 12 câu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Card 4: AI Generator */}
        <div 
          onClick={() => onNavigateTab('aigenerator')}
          className="bg-white rounded-3xl p-5 border-2 border-amber-200 hover:border-amber-400 cursor-pointer transition-all hover:shadow-md space-y-2 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm">
            ✨
          </div>
          <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">
            AI soạn câu lệnh theo bài
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Chỉ cần nhập tên bài, AI sẽ tạo 4 khẩu lệnh ứng dụng trực tiếp tiết dạy.
          </p>
          <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
            <span>Trải nghiệm AI</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
