import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Volume2, 
  Mic, 
  Eye,
  EyeOff,
  Filter,
  X
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
  const [showVnMap, setShowVnMap] = useState<Record<string, boolean>>({});

  const toggleVn = (id: string) => {
    setShowVnMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePlaySound = (text: string) => {
    stopSpeaking();
    speakText(text, { rate: 1.0 });
  };

  // Filtered commands
  const filteredCommands = useMemo(() => {
    return commands.filter(item => {
      // Search filter
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesEn = item.teacherCall.toLowerCase().includes(q) || item.studentResponse.toLowerCase().includes(q);
        const matchesVi = item.vietnameseTranslation.toLowerCase().includes(q);
        if (!matchesEn && !matchesVi) return false;
      }

      // VocabCategory filter
      if (selectedVocabCategory !== 'All' && item.vocabCategory !== selectedVocabCategory) {
        return false;
      }

      return true;
    });
  }, [commands, searchQuery, selectedVocabCategory]);

  return (
    <div className="space-y-5 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <h1 className="text-lg sm:text-xl font-black text-[#222] tracking-tight">
            Phrase Library
          </h1>
          <span className="text-xs font-bold text-[#888] bg-gray-100 px-2 py-0.5 rounded-full">
            {commands.length} phrases
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa]" />
          <input
            type="text"
            id="library-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phrases in English or Vietnamese..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm text-[#222] placeholder-[#aaa] focus:outline-none focus:border-[#FFB800] focus:ring-2 focus:ring-[#FFB800]/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-[#888]" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedVocabCategory('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedVocabCategory === 'All'
                ? 'bg-[#222] text-white'
                : 'bg-gray-100 text-[#444] hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {VOCAB_CATEGORIES_META.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedVocabCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedVocabCategory === cat.id
                  ? 'bg-[#FFB800] text-white shadow-sm'
                  : `${cat.bgColor} ${cat.textColor} hover:opacity-80`
              }`}
            >
              <span>{cat.icon}</span>
              <span className="hidden sm:inline">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-xs font-semibold text-[#888]">
        {filteredCommands.length} result{filteredCommands.length !== 1 ? 's' : ''}
        {selectedVocabCategory !== 'All' && ` in ${selectedVocabCategory}`}
      </div>

      {/* Phrase Cards — Minimalist */}
      {filteredCommands.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-gray-200 space-y-3">
          <div className="text-3xl">🔍</div>
          <h3 className="text-sm font-bold text-[#222]">No phrases found</h3>
          <p className="text-xs text-[#888]">Try a different keyword or clear the filter.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedVocabCategory('All'); }}
            className="px-4 py-2 bg-[#FFB800] text-white rounded-xl text-xs font-bold hover:bg-[#E5A600] transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filteredCommands.map((item) => {
            const isMastered = progress.masteredIds.includes(item.id);
            const isVnVisible = showVnMap[item.id];

            return (
              <div 
                key={item.id}
                id={`card-${item.id}`}
                className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 hover:border-[#FFB800]/40 transition-all space-y-2.5 group"
              >
                {/* English phrase — BIG & BOLD */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-base sm:text-lg font-black text-[#222] tracking-tight leading-snug group-hover:text-[#E5A600] transition-colors">
                      "{item.teacherCall}"
                    </div>
                    {item.studentResponse && (
                      <div className="text-sm font-semibold text-[#444] mt-0.5">
                        → "{item.studentResponse}"
                      </div>
                    )}
                  </div>
                  {isMastered && (
                    <span className="shrink-0 text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                      ✓ Mastered
                    </span>
                  )}
                </div>

                {/* Vietnamese — hidden by default, small & muted */}
                <div>
                  <button
                    onClick={() => toggleVn(item.id)}
                    className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#bbb] hover:text-[#FFB800] transition-colors"
                  >
                    {isVnVisible ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                    <span>{isVnVisible ? 'Hide Vietnamese' : 'Tiếng Việt'}</span>
                  </button>
                  {isVnVisible && (
                    <p className="text-xs text-[#999] mt-0.5 italic animate-fadeInUp">
                      {item.vietnameseTranslation}
                    </p>
                  )}
                </div>

                {/* Action Buttons — Listen + Practice */}
                <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
                  <button
                    onClick={() => handlePlaySound(`${item.teacherCall}. ${item.studentResponse}`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFB800]/10 text-[#FFB800] text-xs font-bold hover:bg-[#FFB800]/20 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>🔊 Listen</span>
                  </button>

                  <button
                    onClick={() => onNavigateToVoiceLab(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] text-white text-xs font-bold hover:bg-[#333] transition-colors"
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>🎙️ Practice</span>
                  </button>

                  {/* Category pill */}
                  {item.vocabCategory && (
                    <span className="ml-auto text-[10px] font-semibold text-[#aaa] bg-gray-50 px-2 py-0.5 rounded-full hidden sm:inline">
                      {VOCAB_CATEGORIES_META.find(c => c.id === item.vocabCategory)?.icon} {item.vocabCategory}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
