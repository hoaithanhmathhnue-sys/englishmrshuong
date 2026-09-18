import React, { useState } from 'react';
import { Volume2, Mic, Sparkles, Search, ArrowRight, Clock, FileText, Gamepad2, Layers, ChevronRight } from 'lucide-react';
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
  externalCategory?: VocabCategory | null;
}

// Category card data matching the mockup design
const CATEGORY_CARDS = [
  {
    id: 'Greeting & Starting' as VocabCategory,
    title: 'Chào hỏi & Làm quen',
    subtitle: 'Giao tiếp tự tin ngay từ những câu đơn giản',
    icon: '💬',
    gradient: 'from-orange-400 to-amber-400',
    lightBg: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-100',
    arrowColor: 'text-orange-500 bg-orange-100',
  },
  {
    id: 'Classroom Instructions' as VocabCategory,
    title: 'Lớp học & Kỷ luật',
    subtitle: 'Giao tiếp tích cực trong lớp học',
    icon: '📚',
    gradient: 'from-blue-500 to-indigo-500',
    lightBg: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    arrowColor: 'text-blue-500 bg-blue-100',
  },
  {
    id: 'Daily Communication' as VocabCategory,
    title: 'Hoạt động hàng ngày',
    subtitle: 'Câu nói quen thuộc trong đời sống lớp học mỗi ngày',
    icon: '☀️',
    gradient: 'from-purple-500 to-violet-500',
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-100',
    arrowColor: 'text-purple-500 bg-purple-100',
  },
  {
    id: 'Praise & Encouragement' as VocabCategory,
    title: 'Cảm xúc & Khen ngợi',
    subtitle: 'Truyền cảm hứng mỗi ngày',
    icon: '⭐',
    gradient: 'from-yellow-400 to-amber-500',
    lightBg: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconBg: 'bg-yellow-100',
    arrowColor: 'text-yellow-600 bg-yellow-100',
  },
  {
    id: null, // Placeholder — Học tập & Hướng dẫn
    title: 'Học tập & Hướng dẫn',
    subtitle: 'Hỗ trợ & đồng hành cùng học sinh',
    icon: '📖',
    gradient: 'from-teal-400 to-emerald-500',
    lightBg: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconBg: 'bg-teal-100',
    arrowColor: 'text-teal-500 bg-teal-100',
  },
  {
    id: null, // Placeholder — Gia đình & Bạn bè
    title: 'Gia đình & Bạn bè',
    subtitle: 'Kết nối trong mọi mối quan hệ',
    icon: '👨‍👩‍👧',
    gradient: 'from-rose-400 to-pink-500',
    lightBg: 'bg-rose-50',
    borderColor: 'border-rose-200',
    iconBg: 'bg-rose-100',
    arrowColor: 'text-rose-500 bg-rose-100',
  },
];

// Featured lesson cards data
const FEATURED_LESSONS = [
  {
    id: 'fl-1',
    category: 'Chào hỏi & Làm quen',
    categoryColor: 'bg-orange-100 text-orange-700 border-orange-200',
    title: 'Greetings & Introductions',
    subtitle: 'Hi / Hello! / How are you?',
    icon: '👋',
    iconBg: 'bg-orange-50',
    count: 10,
    time: '~5 phút',
    btnColor: 'bg-orange-500 hover:bg-orange-600',
    vocabCategory: 'Greeting & Starting' as VocabCategory,
  },
  {
    id: 'fl-2',
    category: 'Lớp học & Kỷ luật',
    categoryColor: 'bg-blue-100 text-blue-700 border-blue-200',
    title: 'Classroom Instructions',
    subtitle: 'Be quiet! / Open your book! / Sit down!',
    icon: '📚',
    iconBg: 'bg-blue-50',
    count: 12,
    time: '~7 phút',
    btnColor: 'bg-blue-500 hover:bg-blue-600',
    vocabCategory: 'Classroom Instructions' as VocabCategory,
  },
  {
    id: 'fl-3',
    category: 'Hoạt động hàng ngày',
    categoryColor: 'bg-purple-100 text-purple-700 border-purple-200',
    title: 'Daily Routines',
    subtitle: 'Get up! / Brush your teeth! / Go to school!',
    icon: '☀️',
    iconBg: 'bg-purple-50',
    count: 10,
    time: '~5 phút',
    btnColor: 'bg-purple-500 hover:bg-purple-600',
    vocabCategory: 'Daily Communication' as VocabCategory,
  },
  {
    id: 'fl-4',
    category: 'Cảm xúc & Khen ngợi',
    categoryColor: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    title: 'Feelings & Praise',
    subtitle: "I'm happy! / Well done! / You're amazing!",
    icon: '⭐',
    iconBg: 'bg-yellow-50',
    count: 8,
    time: '~4 phút',
    btnColor: 'bg-yellow-500 hover:bg-yellow-600',
    vocabCategory: 'Praise & Encouragement' as VocabCategory,
  },
  {
    id: 'fl-5',
    category: 'Học tập & Hướng dẫn',
    categoryColor: 'bg-teal-100 text-teal-700 border-teal-200',
    title: 'Learning & Support',
    subtitle: "Let's read! / Can you help me? / I don't understand.",
    icon: '📖',
    iconBg: 'bg-teal-50',
    count: 10,
    time: '~6 phút',
    btnColor: 'bg-teal-500 hover:bg-teal-600',
    vocabCategory: null,
  },
  {
    id: 'fl-6',
    category: 'Gia đình & Bạn bè',
    categoryColor: 'bg-rose-100 text-rose-700 border-rose-200',
    title: 'Family & Friends',
    subtitle: "This is my family. / Nice to meet you! / Let's be friends!",
    icon: '👨‍👩‍👧',
    iconBg: 'bg-rose-50',
    count: 10,
    time: '~5 phút',
    btnColor: 'bg-rose-500 hover:bg-rose-600',
    vocabCategory: null,
  },
];

export const DashboardTab: React.FC<DashboardTabProps> = ({
  progress,
  onNavigateTab,
  onOpenFlashcard,
  externalCategory,
}) => {
  const [activeCategory, setActiveCategory] = useState<VocabCategory>(externalCategory || 'Greeting & Starting');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [viewMode, setViewMode] = useState<'home' | 'category'>('home');

  // Sync external category from sidebar
  React.useEffect(() => {
    if (externalCategory) {
      setActiveCategory(externalCategory);
      setViewMode('category');
    }
  }, [externalCategory]);

  const activeMeta = VOCAB_TAB_META.find(t => t.id === activeCategory)!;
  const allPhrases = getVocabPhrasesByCategory(activeCategory);

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
    const cleanPhrase = phrase.phrase.replace(/\/ -|\/-|\//g, '. ');
    const text = phrase.response 
      ? `${cleanPhrase}. ${phrase.response}` 
      : cleanPhrase;
    speakText(text, {
      rate,
      onEnd: () => setPlayingId(null)
    });
  };

  const handleCategoryClick = (category: VocabCategory | null) => {
    if (category) {
      setActiveCategory(category);
      setViewMode('category');
      setSearchFilter('');
    } else {
      onNavigateTab('library');
    }
  };

  const handleBackToHome = () => {
    setViewMode('home');
    setSearchFilter('');
  };

  // Render phrase card
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
        {/* Top bar */}
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

        {/* English phrase */}
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

        {/* Vietnamese */}
        <div className="text-sm font-bold text-slate-800 flex items-start gap-1.5">
          <span className="text-base shrink-0">👉</span>
          <span>{phrase.vietnamese}</span>
        </div>

        {/* Context */}
        <p className="text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-100 italic leading-relaxed">
          💡 <span className="font-semibold text-amber-900 not-italic">Ngữ cảnh:</span> {phrase.context}
        </p>

        {/* Audio buttons */}
        <div className="pt-2 border-t border-amber-100 flex items-center gap-2">
          <button
            onClick={() => handleListen(phrase, 1.0)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              isPlayingNormal
                ? 'bg-amber-400 text-slate-900 shadow-sm scale-105'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Nghe 1.0x</span>
          </button>
          <button
            onClick={() => handleListen(phrase, 0.7)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
              isPlayingSlow
                ? 'bg-teal-400 text-slate-900 shadow-sm scale-105'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>🐢 0.7x</span>
          </button>
          <button
            onClick={() => onNavigateTab('voicelab', phrase.id)}
            className="ml-auto px-3 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-1.5 transition-colors"
          >
            <Mic className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Luyện giọng AI</span>
          </button>
        </div>
      </div>
    );
  };

  // ═══════════════════════════════════════════════
  // CATEGORY VIEW — shows phrase list
  // ═══════════════════════════════════════════════
  if (viewMode === 'category') {
    return (
      <div className="space-y-5 pb-16 animate-fadeInUp">
        {/* Back button */}
        <button
          onClick={handleBackToHome}
          className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-900 transition-colors"
        >
          ← Quay về Trang chủ
        </button>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {VOCAB_TAB_META.map(tab => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
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

        {/* Search */}
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

        {/* Phrases */}
        <div className="space-y-4">
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
  }

  // ═══════════════════════════════════════════════
  // HOME VIEW — Dashboard with hero, cards, featured
  // ═══════════════════════════════════════════════
  return (
    <div className="space-y-7 pb-16">

      {/* ═══ HERO BANNER ═══ */}
      <div className="rounded-3xl overflow-hidden border border-amber-300/70 shadow-md animate-fadeInUp relative" style={{ background: 'linear-gradient(135deg, #FFF3CC 0%, #FFE99A 25%, #FFFBE5 50%, #FFF3CC 75%, #FFE99A 100%)' }}>
        {/* Sunflower field decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 pointer-events-none select-none opacity-30 overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="text-2xl sm:text-3xl" style={{ transform: `translateY(${Math.random() * 8}px) rotate(${Math.random() * 20 - 10}deg)` }}>🌻</span>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-stretch relative z-10">
          {/* Left: Slogan */}
          <div className="flex-1 p-5 sm:p-7 lg:p-8 relative">
            {/* Decorative sunflower top-left */}
            <div className="absolute -left-3 -top-3 text-5xl sm:text-6xl opacity-40 select-none pointer-events-none animate-float-sunflower">🌻</div>
            
            <div className="relative z-10 space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-black leading-tight italic">
                <span className="text-amber-700">Nói tiếng Anh mỗi ngày</span><br/>
                <span className="text-slate-700 text-xl sm:text-2xl lg:text-3xl">– Kết nối yêu thương,</span><br/>
                <span className="text-slate-700 text-xl sm:text-2xl lg:text-3xl">lan tỏa nụ cười! </span>
                <span className="text-red-500 not-italic text-2xl sm:text-3xl">♥</span>
              </h1>
              
              <p className="text-[11px] sm:text-xs text-slate-500 italic max-w-sm">
                "Small phrases – Big connections for a brighter classroom!"
              </p>

              {/* Chalkboard-style Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full shadow-md" style={{ background: 'linear-gradient(135deg, #2D5016 0%, #3A6B1E 50%, #2D5016 100%)' }}>
                <span className="text-lg">🌻</span>
                <span className="text-xs sm:text-sm font-black text-white tracking-wide" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                  Better English · Brighter Future
                </span>
                <span className="text-sm">💛</span>
              </div>
            </div>
          </div>

          {/* Center: Sunflower Mascot */}
          <div className="hidden lg:flex items-center justify-center px-4 py-6 relative">
            {/* Big sunflower mascot */}
            <div className="relative">
              <div className="text-[80px] xl:text-[100px] animate-float-sunflower drop-shadow-lg select-none">
                🌻
              </div>
              {/* Small sunflowers around */}
              <div className="absolute -left-6 bottom-2 text-3xl animate-float-sunflower-reverse select-none opacity-70">🌻</div>
              <div className="absolute -right-5 bottom-4 text-2xl animate-float-sunflower select-none opacity-60" style={{ animationDelay: '1s' }}>🌻</div>
              <div className="absolute left-1 -top-2 text-xl animate-float-sunflower-reverse select-none opacity-50" style={{ animationDelay: '0.5s' }}>🌻</div>
            </div>
          </div>

          {/* Right: Quote card */}
          <div className="lg:w-[280px] xl:w-[300px] p-4 sm:p-5 lg:p-6 flex items-center shrink-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/80 shadow-sm space-y-2.5 w-full">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-base shrink-0 sunflower-glow">
                  🌻
                </div>
                <p className="text-[11px] sm:text-xs font-bold text-amber-800 leading-snug">
                  Hôm nay, hãy tạo những khoảnh khắc tiếng Anh thật ý nghĩa nhé! 🌈
                </p>
              </div>
              <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-100/80">
                <p className="text-[10px] sm:text-[11px] text-slate-500 italic leading-relaxed">
                  " Every word you teach plants a seed of confidence in your students."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 6 CATEGORY CARDS ═══ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {CATEGORY_CARDS.map((card, index) => (
          <button
            key={card.title}
            onClick={() => handleCategoryClick(card.id)}
            className={`category-card-hover ${card.lightBg} ${card.borderColor} border rounded-2xl p-4 text-left space-y-2.5 group animate-fadeInUp`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className={`w-10 h-10 ${card.iconBg} rounded-xl flex items-center justify-center text-xl shadow-xs`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-[13px] font-black text-slate-900 leading-snug">{card.title}</h3>
              <p className="text-[10px] text-slate-500 leading-snug mt-0.5 line-clamp-2">{card.subtitle}</p>
            </div>
            <div className={`w-7 h-7 ${card.arrowColor} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        ))}
      </div>

      {/* ═══ GLOBAL SEARCH BAR ═══ */}
      <div className="relative max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '200ms' }}>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => {
            setSearchFilter(e.target.value);
            if (e.target.value.trim()) {
              setViewMode('category');
            }
          }}
          placeholder='Tìm kiếm câu giao tiếp, từ vựng, chủ đề... (ví dụ: "classroom language", "be quiet", "good job"...)'
          className="w-full pl-12 pr-32 py-3.5 rounded-2xl border-2 border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all shadow-xs"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-900 rounded-xl text-xs font-black transition-colors">
          <Search className="w-3.5 h-3.5" />
          <span>Tìm kiếm</span>
          <span className="text-[10px] text-amber-800/60 font-mono hidden sm:inline">Ctrl + K</span>
        </button>
      </div>

      {/* ═══ FEATURED LESSONS ═══ */}
      <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <span>📚</span>
            <span>Bài học nổi bật</span>
          </h2>
          <button 
            onClick={() => onNavigateTab('library')}
            className="text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 transition-colors"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {FEATURED_LESSONS.map((lesson, index) => (
            <div
              key={lesson.id}
              className="featured-card bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs animate-fadeInUp"
              style={{ animationDelay: `${300 + index * 60}ms` }}
            >
              {/* Category badge */}
              <div className="px-3 pt-3">
                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${lesson.categoryColor}`}>
                  {lesson.category}
                </span>
              </div>

              {/* Icon area */}
              <div className={`mx-3 mt-2 ${lesson.iconBg} rounded-xl p-4 flex items-center justify-center`}>
                <span className="text-4xl">{lesson.icon}</span>
              </div>

              {/* Content */}
              <div className="p-3 space-y-2">
                <h3 className="text-sm font-black text-slate-900 leading-tight">{lesson.title}</h3>
                <p className="text-[10px] text-slate-500 leading-snug line-clamp-2">{lesson.subtitle}</p>
                
                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {lesson.count} câu
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {lesson.time}
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (lesson.vocabCategory) {
                      handleCategoryClick(lesson.vocabCategory);
                    } else {
                      onNavigateTab('library');
                    }
                  }}
                  className={`w-full py-2 rounded-xl text-xs font-bold text-white ${lesson.btnColor} transition-colors flex items-center justify-center gap-1.5`}
                >
                  <span>Học ngay</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ BOTTOM QUICK ACCESS BAR ═══ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
        <button
          onClick={() => onNavigateTab('voicelab')}
          className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Mic className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-emerald-900">Luyện giọng AI</h4>
            <p className="text-[10px] text-emerald-600">Phát âm chuẩn – Tự tin hơn</p>
          </div>
        </button>

        <button
          onClick={onOpenFlashcard}
          className="flex items-center gap-3 p-4 rounded-2xl bg-teal-50 border border-teal-200 hover:bg-teal-100 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-teal-900">Flashcard 3D</h4>
            <p className="text-[10px] text-teal-600">Học vui – Nhớ lâu</p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('arcade')}
          className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-amber-900">Đấu trường Arcade</h4>
            <p className="text-[10px] text-amber-600">Thử thách bản thân</p>
          </div>
        </button>

        <button
          onClick={() => onNavigateTab('aigenerator')}
          className="flex items-center gap-3 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h4 className="text-xs font-black text-indigo-900">Tài liệu tải về</h4>
            <p className="text-[10px] text-indigo-600">PDF + Hình ảnh</p>
          </div>
        </button>
      </div>

      {/* ═══ SUNFLOWER MASCOT (desktop only) ═══ */}
      <div className="hidden lg:block fixed -left-2 bottom-8 z-10 pointer-events-none select-none animate-float-sunflower">
        <div className="bg-amber-50/80 border border-amber-200/60 rounded-3xl p-4 shadow-lg backdrop-blur-sm rotate-[-5deg]">
          <div className="text-5xl mb-1 text-center">🌻</div>
          <p className="text-[11px] font-black text-amber-800 text-center italic leading-tight">
            Let's make<br/>English fun<br/>together!
          </p>
        </div>
      </div>
    </div>
  );
};
