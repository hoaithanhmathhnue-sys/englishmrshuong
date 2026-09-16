import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Volume2, 
  Mic, 
  Bookmark, 
  X,
  Sparkles,
  Check
} from 'lucide-react';
import { CommandItem, UserProgress, VocabCategory } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';
import { VOCAB_CATEGORIES_META } from '../data/commandsData';

interface CommandLibraryTabProps {
  commands: CommandItem[];
  progress: UserProgress;
  onNavigateToVoiceLab: (commandId: string) => void;
  onToggleBookmark: (commandId: string) => void;
}

export const CommandLibraryTab: React.FC<CommandLibraryTabProps> = ({
  commands,
  progress,
  onNavigateToVoiceLab,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<VocabCategory | 'All'>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [playingAudioKey, setPlayingAudioKey] = useState<string | null>(null);

  const handlePlaySound = (cmd: CommandItem, rate: number = 1.0) => {
    stopSpeaking();
    const key = `${cmd.id}-${rate}`;
    setPlayingAudioKey(key);
    const text = cmd.studentResponse 
      ? `${cmd.teacherCall}. ${cmd.studentResponse}` 
      : cmd.teacherCall;
    speakText(text, { 
      rate,
      tone: cmd.toneRecommendation,
      onEnd: () => setPlayingAudioKey(null)
    });
  };

  // Filtered commands
  const filteredCommands = useMemo(() => {
    return commands.filter(item => {
      // Search filter
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesEn = item.teacherCall.toLowerCase().includes(q) || item.studentResponse.toLowerCase().includes(q);
        const matchesVi = item.vietnameseTranslation.toLowerCase().includes(q);
        const matchesContext = item.context.toLowerCase().includes(q);
        if (!matchesEn && !matchesVi && !matchesContext) return false;
      }

      // VocabCategory filter
      if (selectedVocabCategory !== 'All' && item.vocabCategory !== selectedVocabCategory) {
        return false;
      }

      // Grade filter
      if (selectedGrade !== 'All' && item.gradeLevel !== selectedGrade) {
        return false;
      }

      return true;
    });
  }, [commands, searchQuery, selectedVocabCategory, selectedGrade]);

  const grades = ['All', 'Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📚</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Thư Viện Khẩu Lệnh K-5
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Tra cứu khẩu lệnh chuẩn xác kèm IPA, nghĩa tiếng Việt và 2 tốc độ audio
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 self-start sm:self-auto">
            {filteredCommands.length} / {commands.length} câu lệnh
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            id="library-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm khẩu lệnh tiếng Anh, dịch nghĩa tiếng Việt hoặc tình huống sử dụng..."
            className="w-full pl-10 pr-10 py-3 rounded-2xl border border-amber-200 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}
        </div>

        {/* Filters: Category Pills & Grade Levels */}
        <div className="space-y-2">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setSelectedVocabCategory('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedVocabCategory === 'All'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Tất cả nhóm
            </button>
            {VOCAB_CATEGORIES_META.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedVocabCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  selectedVocabCategory === cat.id
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-amber-300'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Grade filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Khối lớp:</span>
            {grades.map(g => (
              <button
                key={g}
                onClick={() => setSelectedGrade(g)}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  selectedGrade === g
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Phrase Cards Matching Image 1 from edit.docx */}
      {filteredCommands.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-amber-200 space-y-3 shadow-xs">
          <div className="text-4xl">🔍</div>
          <h3 className="text-sm font-bold text-slate-800">Không tìm thấy câu lệnh phù hợp</h3>
          <p className="text-xs text-slate-500">Hãy thử nhập từ khóa khác hoặc xóa bộ lọc để xem toàn bộ thư viện.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedVocabCategory('All'); setSelectedGrade('All'); }}
            className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-600 transition-colors shadow-xs"
          >
            Xóa bộ lọc tìm kiếm
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCommands.map((item, index) => {
            const isMastered = progress.masteredIds.includes(item.id);
            const isBookmarked = progress.bookmarkedIds.includes(item.id);
            const isPlayingNormal = playingAudioKey === `${item.id}-1`;
            const isPlayingSlow = playingAudioKey === `${item.id}-0.7`;

            return (
              <div 
                key={item.id}
                id={`card-${item.id}`}
                className="bg-white/95 rounded-2xl p-4 sm:p-5 border-2 border-amber-200 hover:border-amber-400 shadow-xs hover:shadow-md transition-all space-y-3 group animate-fadeInUp"
                style={{ animationDelay: `${Math.min(index * 25, 300)}ms` }}
              >
                {/* Top: Badge Category, IPA & Grade */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Category Badge */}
                    <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 text-[11px] font-black uppercase tracking-wider border border-teal-200">
                      {item.category}
                    </span>

                    {/* IPA Pronunciation */}
                    <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {item.callIpa}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {item.gradeLevel && (
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                        {item.gradeLevel}
                      </span>
                    )}

                    {isMastered && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-300">
                        <Check className="w-3 h-3" /> Thành thục
                      </span>
                    )}

                    {/* Bookmark */}
                    <button
                      onClick={() => onToggleBookmark(item.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked 
                          ? 'text-amber-500 bg-amber-50' 
                          : 'text-slate-300 hover:text-amber-400 hover:bg-slate-50'
                      }`}
                      title={isBookmarked ? 'Bỏ ghim' : 'Ghim bài giảng'}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* English phrase — BIG & BOLD */}
                <div className="space-y-1">
                  <div className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    "{item.teacherCall}"
                  </div>
                  {item.studentResponse && (
                    <div className="text-xs sm:text-sm font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200 inline-block">
                      → "{item.studentResponse}"
                    </div>
                  )}
                </div>

                {/* Vietnamese Meaning — Clearly visible with hand pointer */}
                <div className="text-sm font-bold text-slate-800 flex items-start gap-1.5">
                  <span className="text-base shrink-0">👉</span>
                  <span>{item.vietnameseTranslation}</span>
                </div>

                {/* Context / Situation */}
                {item.context && (
                  <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/40 p-2.5 rounded-xl border border-amber-100">
                    {item.context}
                  </p>
                )}

                {/* Bottom: 2 Audio Buttons (1.0x & 0.7x) + Practice in VoiceLab */}
                <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-amber-100">
                  {/* Normal 1.0x */}
                  <button
                    onClick={() => handlePlaySound(item, 1.0)}
                    disabled={isPlayingNormal || isPlayingSlow}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-xs ${
                      isPlayingNormal
                        ? 'bg-teal-800 text-white animate-pulse'
                        : 'bg-teal-700 hover:bg-teal-800 text-white'
                    }`}
                    title="Phát âm chuẩn tốc độ 1.0x"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Phát âm chuẩn (1.0x)</span>
                  </button>

                  {/* Slow 0.7x */}
                  <button
                    onClick={() => handlePlaySound(item, 0.7)}
                    disabled={isPlayingNormal || isPlayingSlow}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                      isPlayingSlow
                        ? 'bg-amber-100 border-amber-400 text-amber-900'
                        : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
                    }`}
                    title="Phát âm chậm rõ từng âm 0.7x"
                  >
                    <span>🔄 Phát chậm rõ từ (0.7x)</span>
                  </button>

                  {/* Voice Lab practice */}
                  <button
                    onClick={() => onNavigateToVoiceLab(item.id)}
                    className="ml-auto px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Mic className="w-3.5 h-3.5 text-amber-400" />
                    <span>Luyện giọng AI</span>
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
