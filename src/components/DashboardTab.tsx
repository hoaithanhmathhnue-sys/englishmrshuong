import React, { useState } from 'react';
import { Volume2, Mic, Sparkles, Smartphone, Layers, Search, Filter } from 'lucide-react';
import { UserProgress, LearningHistoryEntry, VocabCategory } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';
import { 
  getVocabPhrasesByCategory, 
  getSubGroups, 
  VOCAB_TAB_META,
  VocabPhrase
} from '../data/vocabPhrasesData';

interface DashboardTabProps {
  commands: any[];
  progress: UserProgress;
  learningHistory: LearningHistoryEntry[];
  onNavigateTab: (tab: string, selectedCommandId?: string) => void;
  onToggleBookmark: (commandId: string) => void;
  onOpenMobileNotice?: () => void;
  onOpenFlashcard?: () => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  progress,
  onNavigateTab,
  onOpenMobileNotice,
  onOpenFlashcard
}) => {
  const [activeCategory, setActiveCategory] = useState<VocabCategory>('Greeting & Starting');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  const activeMeta = VOCAB_TAB_META.find(t => t.id === activeCategory)!;
  const allPhrases = getVocabPhrasesByCategory(activeCategory);
  const subGroups = getSubGroups(activeCategory);

  const phrases = searchFilter.trim() === ''
    ? allPhrases
    : allPhrases.filter(p => 
        p.phrase.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.vietnamese.toLowerCase().includes(searchFilter.toLowerCase()) ||
        (p.response && p.response.toLowerCase().includes(searchFilter.toLowerCase()))
      );

  const handleListen = (phrase: VocabPhrase, rate: number = 1.0) => {
    stopSpeaking();
    setPlayingId(`${phrase.id}-${rate}`);
    const text = phrase.response 
      ? `${phrase.phrase}. ${phrase.response}` 
      : phrase.phrase;
    speakText(text, {
      rate,
      onEnd: () => setPlayingId(null)
    });
  };

  // Render a rich card matching Image 1 from edit.docx
  const renderRichPhraseCard = (phrase: VocabPhrase, index: number) => {
    const isPlayingNormal = playingId === `${phrase.id}-1`;
    const isPlayingSlow = playingId === `${phrase.id}-0.7`;

    return (
      <div
        key={phrase.id}
        id={`vocab-card-${phrase.id}`}
        className="rounded-2xl border-2 border-amber-200/80 bg-white/90 hover:border-amber-400 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all space-y-3 relative overflow-hidden group animate-fadeInUp"
        style={{ animationDelay: `${index * 30}ms` }}
      >
        {/* Top bar: Category badge & IPA */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
              {phrase.subGroup || activeMeta.shortLabel}
            </span>
            <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
              {phrase.ipa}
            </span>
          </div>

          <span className="text-lg select-none" title={phrase.vocabCategory}>
            {phrase.emoji || '🌻'}
          </span>
        </div>

        {/* English phrase — Big & Bold */}
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
            "{phrase.phrase}"
          </h3>
          {phrase.response && (
            <div className="text-xs sm:text-sm font-bold text-amber-700 bg-amber-50/80 px-3 py-1 rounded-lg border border-amber-200/60 inline-block">
              → "{phrase.response}"
            </div>
          )}
        </div>

        {/* Vietnamese translation with pointer icon */}
        <div className="text-sm font-bold text-slate-800 flex items-start gap-1.5">
          <span className="text-base shrink-0">👉</span>
          <span>{phrase.vietnamese}</span>
        </div>

        {/* Pedagogical context / situation */}
        {phrase.context && (
          <p className="text-xs text-slate-600 leading-relaxed bg-amber-50/40 p-2.5 rounded-xl border border-amber-100">
            {phrase.context}
          </p>
        )}

        {/* Bottom Audio & Action Buttons — exact design as Image 1 */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-amber-100">
          {/* 1.0x Normal Audio Button */}
          <button
            onClick={() => handleListen(phrase, 1.0)}
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

          {/* 0.7x Slow Audio Button */}
          <button
            onClick={() => handleListen(phrase, 0.7)}
            disabled={isPlayingNormal || isPlayingSlow}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
              isPlayingSlow
                ? 'bg-amber-100 border-amber-400 text-amber-900'
                : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-700'
            }`}
            title="Phát chậm rõ từng âm 0.7x"
          >
            <span>🔄 Phát chậm rõ từ (0.7x)</span>
          </button>

          {/* Practice in VoiceLab Button */}
          <button
            onClick={() => onNavigateTab('voicelab', phrase.id)}
            className="ml-auto px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-colors"
            title="Chuyển sang phòng luyện giọng AI"
          >
            <Mic className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Luyện giọng AI</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">

      {/* ═══ HERO — Sunflower & Slogan ═══ */}
      <div className="text-center py-2 space-y-2 relative">
        
        {/* Floating decorative cartoon sunflowers */}
        <div className="hidden sm:block absolute -left-4 top-2 text-4xl select-none animate-float-sunflower pointer-events-none opacity-80">
          🌻
        </div>
        <div className="hidden sm:block absolute -right-4 top-4 text-4xl select-none animate-float-sunflower-reverse pointer-events-none opacity-80">
          🌻
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-800 text-xs font-black uppercase tracking-wider mb-1">
          <span>🌻</span>
          <span>Kho Ngữ Liệu Giao Tiếp Lớp Học K-5</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Vocabdaily
        </h1>

        {/* Updated Slogan from docx: Together We Learn – Together We Shine */}
        <p className="text-xs sm:text-sm font-bold text-amber-700 max-w-xl mx-auto">
          "Together We Learn – Together We Shine" <br className="sm:hidden" />
          <span className="text-slate-600 font-semibold">(Cùng nhau học tập – Cùng nhau tỏa sáng)</span>
        </p>

        {/* ═══ INSPIRING QUOTE (Image 4 from docx) ═══ */}
        <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-linear-to-r from-amber-100/90 via-amber-50 to-yellow-100/80 border-2 border-amber-300/90 shadow-sm max-w-2xl mx-auto relative overflow-hidden text-left">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-xl shrink-0 shadow-xs sunflower-glow">
              🌻
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Thông điệp người gieo hạt</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed italic">
                "Mỗi giáo viên là một bông hoa hướng dương luôn rực rỡ, tự tin trao đổi và lan tỏa môi trường Tiếng Anh tự nhiên tới các em học sinh thân yêu."
              </p>
            </div>
          </div>
        </div>

        {/* Quick action bar: Mobile notice & 3D Flashcard */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          {onOpenFlashcard && (
            <button
              onClick={onOpenFlashcard}
              className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>🃏 Mở Flashcard 3D & In PDF</span>
            </button>
          )}

          {onOpenMobileNotice && (
            <button
              onClick={onOpenMobileNotice}
              className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all"
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-600" />
              <span>📱 Lưu ý mở trên Zalo/Điện thoại</span>
            </button>
          )}
        </div>
      </div>

      {/* ═══ 4 CATEGORY TABS (Grid 2×2) ═══ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {VOCAB_TAB_META.map(tab => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              id={`vocab-tab-${tab.shortLabel.toLowerCase()}`}
              onClick={() => {
                setActiveCategory(tab.id);
                setSearchFilter('');
              }}
              className={`flex flex-col sm:flex-row items-center justify-center sm:justify-between p-3 sm:p-3.5 rounded-2xl text-xs sm:text-sm font-bold transition-all border-2 ${
                isActive
                  ? `bg-linear-to-r ${tab.bgGradient} text-white border-transparent shadow-md scale-[1.02]`
                  : `bg-white ${tab.borderColor} text-slate-700 hover:shadow-sm hover:border-amber-300`
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-lg">{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </div>
              <span className={`mt-1 sm:mt-0 px-2 py-0.5 rounded-md text-[10px] font-black ${
                isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count} câu
              </span>
            </button>
          );
        })}
      </div>

      {/* ═══ SEARCH & FILTER WITHIN CATEGORY ═══ */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder={`Tìm kiếm trong "${activeCategory}" theo từ tiếng Anh hoặc tiếng Việt...`}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-amber-200 bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all"
        />
      </div>

      {/* ═══ PHRASES LIST ═══ */}
      <div className="space-y-4">
        {/* Category Header */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{activeMeta.icon}</span>
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              {activeMeta.label}
            </h2>
            <span className="text-xs font-semibold text-slate-500">
              ({phrases.length} mẫu câu)
            </span>
          </div>

          <span className="text-xs font-medium text-amber-700">
            Kèm IPA & 2 tốc độ audio
          </span>
        </div>

        {/* Phrases Render */}
        {phrases.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-amber-200 text-slate-500 text-xs">
            Không tìm thấy mẫu câu phù hợp với từ khóa "{searchFilter}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {phrases.map((phrase, index) => renderRichPhraseCard(phrase, index))}
          </div>
        )}
      </div>

    </div>
  );
};
