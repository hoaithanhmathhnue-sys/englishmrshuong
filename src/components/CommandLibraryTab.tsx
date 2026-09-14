import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Heart, 
  Volume2, 
  Mic, 
  CheckCircle2, 
  Filter, 
  Play, 
  Sparkles,
  Users,
  Smile,
  BookOpen
} from 'lucide-react';
import { CommandItem, GradeLevel, CommandCategory, UserProgress } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';

interface CommandLibraryTabProps {
  commands: CommandItem[];
  progress: UserProgress;
  onNavigateToVoiceLab: (commandId: string) => void;
  onToggleBookmark: (commandId: string) => void;
}

const CATEGORIES = [
  'Tất cả',
  '10 Câu Lệnh Tháng',
  'Tiếng Anh Môn Toán',
  'Giao Tiếp Đồng Nghiệp',
  'Ổn định & Chú ý',
  'Chants vần điệu',
  'Khen thưởng & Sao vàng',
  'Chuyển tiết & Đồ dùng',
  'Trò chơi & Ghép nhóm',
  'Hỏi - Đáp'
] as const;

type FilterCategory = typeof CATEGORIES[number];

const GRADE_LEVELS: GradeLevel[] = [
  'All',
  'Lớp 1',
  'Lớp 2',
  'Lớp 3',
  'Lớp 4',
  'Lớp 5'
];

export const CommandLibraryTab: React.FC<CommandLibraryTabProps> = ({
  commands,
  progress,
  onNavigateToVoiceLab,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('All');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('Tất cả');
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  // Audio helper
  const handlePlaySound = (text: string, id: string, rate: number = 1.0) => {
    stopSpeaking();
    setPlayingAudioId(`${id}-${rate}`);
    speakText(text, {
      rate,
      onEnd: () => setPlayingAudioId(null)
    });
  };

  // Filtered commands
  const filteredCommands = useMemo(() => {
    return commands.filter(item => {
      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesEn = item.teacherCall.toLowerCase().includes(q) || item.studentResponse.toLowerCase().includes(q);
        const matchesVi = item.vietnameseTranslation.toLowerCase().includes(q) || item.context.toLowerCase().includes(q);
        const matchesTpr = item.tprCue.teacherAction.toLowerCase().includes(q) || item.tprCue.studentAction.toLowerCase().includes(q);
        if (!matchesEn && !matchesVi && !matchesTpr) return false;
      }

      // Grade filter
      if (selectedGrade !== 'All' && item.gradeLevel !== 'All' && item.gradeLevel !== selectedGrade) {
        return false;
      }

      // Category filter
      if (selectedCategory === '10 Câu Lệnh Tháng') {
        if (!item.isMonthlyRequired && item.category !== '10 Câu Lệnh Tháng') return false;
      } else if (selectedCategory !== 'Tất cả' && item.category !== selectedCategory) {
        return false;
      }

      // Bookmark filter
      if (onlyBookmarks && !progress.bookmarkedIds.includes(item.id)) {
        return false;
      }

      return true;
    });
  }, [commands, searchQuery, selectedGrade, selectedCategory, onlyBookmarks, progress.bookmarkedIds]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
              <span className="text-sm">🌻</span>
              <span>Kho tư liệu sư phạm chuẩn hóa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Thư viện câu lệnh đút túi 2.0
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 max-w-2xl">
              Hơn 50 câu khẩu lệnh thực tế phân chia rõ ràng: 10 câu bắt buộc trong tháng, Tiếng Anh môn Toán, Giao tiếp đồng nghiệp và Quản lý lớp học K-5.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-2 self-start md:self-auto bg-amber-50/60 p-2.5 rounded-2xl border border-amber-200">
            <div className="text-center px-3 py-1 border-r border-amber-200">
              <div className="text-lg font-black text-amber-700">{commands.length}</div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Tổng số câu</div>
            </div>
            <div className="text-center px-3 py-1 border-r border-amber-200">
              <div className="text-lg font-black text-emerald-600">{progress.masteredIds.length}</div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Đã thuần thục</div>
            </div>
            <div className="text-center px-3 py-1">
              <div className="text-lg font-black text-rose-500">{progress.bookmarkedIds.length}</div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase">Đã ghim</div>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            id="library-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo từ khóa tiếng Anh hoặc tiếng Việt (Ví dụ: 'eyes on me', 'Toán', 'đồng nghiệp', 'plus', 'minus')..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-amber-200 bg-amber-50/20 hover:bg-white focus:bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 px-2 py-1 rounded-md bg-slate-200/60"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Grade Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-slate-500 mr-1.5 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Khối lớp:
          </span>
          {GRADE_LEVELS.map(grade => (
            <button
              key={grade}
              onClick={() => setSelectedGrade(grade)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedGrade === grade
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {grade === 'All' ? 'Tất cả khối' : grade}
            </button>
          ))}

          {/* Bookmark filter pill */}
          <button
            onClick={() => setOnlyBookmarks(prev => !prev)}
            className={`ml-auto px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              onlyBookmarks
                ? 'bg-rose-500 text-white shadow-xs'
                : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyBookmarks ? 'fill-white' : 'fill-rose-400'}`} />
            <span>Chỉ xem câu đã ghim ({progress.bookmarkedIds.length})</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-1.5">Phân loại:</span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-xs'
                  : cat === '10 Câu Lệnh Tháng'
                  ? 'bg-yellow-100 text-amber-900 border border-amber-300 font-extrabold hover:bg-yellow-200'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
              }`}
            >
              {cat === '10 Câu Lệnh Tháng' ? '⭐ 10 Câu Tháng' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Commands Grid */}
      {filteredCommands.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 space-y-3">
          <Smile className="w-12 h-12 text-amber-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Không tìm thấy câu khẩu lệnh phù hợp</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Hãy thử tìm kiếm bằng từ khóa khác hoặc bấm nút bên dưới để hiển thị toàn bộ câu lệnh.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedGrade('All');
              setSelectedCategory('Tất cả');
              setOnlyBookmarks(false);
            }}
            className="px-5 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-all shadow-md shadow-amber-500/20"
          >
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCommands.map((item) => {
            const isBookmarked = progress.bookmarkedIds.includes(item.id);
            const score = progress.practiceScores[item.id];
            const isMastered = progress.masteredIds.includes(item.id);

            return (
              <div 
                key={item.id}
                id={`card-${item.id}`}
                className="bg-white rounded-3xl p-6 border-2 border-amber-200/80 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                {/* Top Row: Badges & Bookmark */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
                        {item.gradeLevel}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                        {item.category}
                      </span>
                      {item.isMonthlyRequired && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-yellow-400 text-slate-950">
                          ⭐️ 10 Câu Tháng
                        </span>
                      )}
                      {isMastered && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Thuần thục ({score}đ)</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleBookmark(item.id)}
                      title={isBookmarked ? 'Bỏ lưu câu lệnh' : 'Lưu câu lệnh'}
                      className="p-1.5 rounded-full hover:bg-slate-100 transition-colors"
                    >
                      <Heart 
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          isBookmarked 
                            ? 'fill-rose-500 text-rose-500' 
                            : 'text-slate-300 hover:text-slate-400'
                        }`} 
                      />
                    </button>
                  </div>

                  {/* Teacher Call & IPA */}
                  <div className="space-y-1 mb-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                      Cô hô (Teacher Call)
                    </div>
                    <div className="text-xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-amber-700 transition-colors">
                      "{item.teacherCall}"
                    </div>
                    <div className="text-xs font-mono text-amber-600 font-medium">
                      {item.callIpa}
                    </div>
                  </div>

                  {/* Student Response & Translation */}
                  <div className="bg-amber-50/60 rounded-2xl p-3 border border-amber-100 space-y-1 mb-3">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                      Trò đáp (Student Response)
                    </div>
                    <div className="text-sm font-extrabold text-slate-800">
                      "{item.studentResponse}"
                    </div>
                    {item.responseIpa && (
                      <div className="text-[11px] font-mono text-amber-600">
                        {item.responseIpa}
                      </div>
                    )}
                    <div className="text-xs text-slate-600 pt-1 border-t border-amber-200/40">
                      {item.vietnameseTranslation}
                    </div>
                  </div>

                  {/* TPR Hint */}
                  <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{item.tprCue.iconTip}</span>
                      <span>Hành động TPR</span>
                    </div>
                    <div className="text-slate-600 text-[11px] leading-relaxed">
                      • Cô: {item.tprCue.teacherAction}
                    </div>
                    <div className="text-slate-600 text-[11px] leading-relaxed">
                      • Trò: {item.tprCue.studentAction}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Voice Controls & Navigate to Voice Lab */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePlaySound(`${item.teacherCall}. ${item.studentResponse}`, item.id, 1.0)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                        playingAudioId === `${item.id}-1`
                          ? 'bg-amber-500 text-white'
                          : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>1.0x</span>
                    </button>

                    <button
                      onClick={() => handlePlaySound(`${item.teacherCall}. ${item.studentResponse}`, item.id, 0.7)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        playingAudioId === `${item.id}-0.7`
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <span>0.7x (Chậm)</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onNavigateToVoiceLab(item.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Luyện giọng</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
