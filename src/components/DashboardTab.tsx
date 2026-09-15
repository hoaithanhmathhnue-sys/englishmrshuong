import React, { useState } from 'react';
import { Volume2, Mic } from 'lucide-react';
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
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  progress,
  onNavigateTab,
}) => {
  const [activeCategory, setActiveCategory] = useState<VocabCategory>('Greeting & Starting');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const activeMeta = VOCAB_TAB_META.find(t => t.id === activeCategory)!;
  const phrases = getVocabPhrasesByCategory(activeCategory);
  const subGroups = getSubGroups(activeCategory);

  const handleListen = (phrase: VocabPhrase) => {
    stopSpeaking();
    setPlayingId(phrase.id);
    const text = phrase.response 
      ? `${phrase.phrase}. ${phrase.response}` 
      : phrase.phrase;
    speakText(text, {
      rate: 0.9,
      onEnd: () => setPlayingId(null)
    });
  };

  // Render phrase item
  const renderPhrase = (phrase: VocabPhrase, index: number, compact = false) => (
    <div
      key={phrase.id}
      className={`group flex items-center gap-3 rounded-xl border border-gray-100 bg-white hover:border-[#FFB800]/40 hover:shadow-sm transition-all cursor-pointer animate-fadeInUp ${
        compact ? 'px-3 py-2.5' : 'px-4 py-3'
      }`}
      style={{ animationDelay: `${index * 30}ms` }}
      onClick={() => handleListen(phrase)}
    >
      {/* Number or Emoji */}
      <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-base ${
        activeCategory === 'Classroom Instructions' 
          ? 'bg-blue-100 text-blue-700 font-black text-sm'
          : 'bg-gray-50'
      }`}>
        {activeCategory === 'Classroom Instructions' ? phrase.order : phrase.emoji}
      </div>

      {/* Phrase text */}
      <div className="flex-1 min-w-0">
        <span className={`font-bold text-[#222] leading-snug ${compact ? 'text-sm' : 'text-sm sm:text-base'}`}>
          {phrase.phrase}
        </span>
        {phrase.response && (
          <span className="block text-xs text-[#888] mt-0.5 truncate">
            → {phrase.response}
          </span>
        )}
      </div>

      {/* Listen button */}
      <button
        onClick={(e) => { e.stopPropagation(); handleListen(phrase); }}
        className={`shrink-0 p-2 rounded-lg transition-all ${
          playingId === phrase.id
            ? 'bg-[#FFB800] text-white shadow-md shadow-[#FFB800]/30'
            : 'bg-gray-100 text-[#888] hover:bg-[#FFB800]/20 hover:text-[#FFB800]'
        }`}
        title="Listen"
      >
        <Volume2 className={`w-4 h-4 ${playingId === phrase.id ? 'animate-pulse' : ''}`} />
      </button>
    </div>
  );

  // Render category content based on type
  const renderCategoryContent = () => {
    // === Greeting & Starting: 2 subgroups stacked ===
    if (activeCategory === 'Greeting & Starting') {
      return (
        <div className="space-y-6">
          {subGroups.map(group => {
            const groupPhrases = phrases.filter(p => p.subGroup === group);
            return (
              <div key={group}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white text-xs font-black uppercase tracking-wider shadow-sm">
                    {group}
                  </div>
                  <span className="text-[10px] font-bold text-[#aaa]">{groupPhrases.length} phrases</span>
                </div>
                <div className="space-y-1.5">
                  {groupPhrases.map((p, i) => renderPhrase(p, i))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // === Classroom Instructions: Grid 2 cột (1-8 / 9-16) ===
    if (activeCategory === 'Classroom Instructions') {
      const half = Math.ceil(phrases.length / 2);
      const col1 = phrases.slice(0, half);
      const col2 = phrases.slice(half);
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
          <div className="space-y-1.5">
            {col1.map((p, i) => renderPhrase(p, i, true))}
          </div>
          <div className="space-y-1.5">
            {col2.map((p, i) => renderPhrase(p, i + half, true))}
          </div>
        </div>
      );
    }

    // === Praise & Encouragement: Grid 2 cột ===
    if (activeCategory === 'Praise & Encouragement') {
      const half = Math.ceil(phrases.length / 2);
      const col1 = phrases.slice(0, half);
      const col2 = phrases.slice(half);
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
          <div className="space-y-1.5">
            {col1.map((p, i) => renderPhrase(p, i))}
          </div>
          <div className="space-y-1.5">
            {col2.map((p, i) => renderPhrase(p, i + half))}
          </div>
        </div>
      );
    }

    // === Daily Communication: 2 subgroups side by side ===
    if (activeCategory === 'Daily Communication') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {subGroups.map(group => {
            const groupPhrases = phrases.filter(p => p.subGroup === group);
            return (
              <div key={group}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-violet-400 text-white text-xs font-black tracking-wide shadow-sm">
                    {group}
                  </div>
                </div>
                <div className="space-y-1.5">
                  {groupPhrases.map((p, i) => renderPhrase(p, i))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-16">

      {/* ═══ HERO — Compact ═══ */}
      <div className="text-center py-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-[#222] tracking-tight">
          🌻 Vocabdaily
        </h1>
        <p className="text-sm font-semibold text-[#888]">
          "Small phrases, big changes." — <span className="text-[#FFB800]">Shine Every Day!</span>
        </p>
      </div>

      {/* ═══ 4 CATEGORY TABS (Grid 2×2) ═══ */}
      <div className="grid grid-cols-2 gap-2">
        {VOCAB_TAB_META.map(tab => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              id={`vocab-tab-${tab.shortLabel.toLowerCase()}`}
              onClick={() => setActiveCategory(tab.id)}
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all border-2 ${
                isActive
                  ? `bg-gradient-to-r ${tab.bgGradient} text-white border-transparent shadow-lg`
                  : `bg-white ${tab.borderColor} text-[#444] hover:shadow-sm`
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span className="truncate">{tab.label}</span>
              <span className={`shrink-0 px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-[#888]'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ═══ CATEGORY CONTENT CARD ═══ */}
      <div className={`rounded-2xl border-2 ${activeMeta.borderColor} bg-white shadow-sm overflow-hidden`}>
        {/* Category Header Banner */}
        <div className={`${activeMeta.headerBg} px-5 py-3.5 flex items-center justify-between`}>
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{activeMeta.icon}</span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white tracking-tight">
                {activeMeta.label}
              </h2>
            </div>
          </div>
          <span className="text-xs font-bold text-white/80 bg-white/20 px-2.5 py-1 rounded-lg">
            {activeMeta.count} phrases
          </span>
        </div>

        {/* Phrases List */}
        <div className="p-4 sm:p-5">
          {renderCategoryContent()}
        </div>
      </div>

      {/* ═══ Voice Lab CTA ═══ */}
      <div className="flex justify-center">
        <button
          onClick={() => onNavigateTab('voicelab')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#222] text-white text-sm font-bold hover:bg-[#333] transition-colors shadow-md"
        >
          <Mic className="w-4 h-4" />
          <span>🎙️ Open Voice Lab — Practice Pronunciation</span>
        </button>
      </div>

      {/* ═══ Quick Stats ═══ */}
      <div className="flex items-center justify-center gap-6 py-3 text-center">
        <div>
          <div className="text-lg font-black text-[#FFB800]">56</div>
          <div className="text-[10px] font-bold text-[#888] uppercase">Total Phrases</div>
        </div>
        <div className="w-px h-8 bg-gray-200" />
        <div>
          <div className="text-lg font-black text-emerald-500">{progress.masteredIds.length}</div>
          <div className="text-[10px] font-bold text-[#888] uppercase">Mastered</div>
        </div>
        <div className="w-px h-8 bg-gray-200" />
        <div>
          <div className="text-lg font-black text-[#222]">{progress.streak}</div>
          <div className="text-[10px] font-bold text-[#888] uppercase">Day Streak 🔥</div>
        </div>
      </div>

      {/* Footer credit */}
      <p className="text-center text-[10px] text-[#bbb] font-medium">
        Click any phrase to listen 🔊 • Open Voice Lab to practice 🎙️
      </p>
    </div>
  );
};
