import React, { useState, useMemo } from 'react';
import { 
  Volume2, 
  Mic, 
  RefreshCw, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Play
} from 'lucide-react';
import { CommandItem, UserProgress, LearningHistoryEntry, VocabCategory } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';
import { ALL_APP_COMMANDS, VOCAB_CATEGORIES_META, getCommandsByVocabCategory } from '../data/commandsData';

interface DashboardTabProps {
  commands: CommandItem[];
  progress: UserProgress;
  learningHistory: LearningHistoryEntry[];
  onNavigateTab: (tab: string, selectedCommandId?: string) => void;
  onToggleBookmark: (commandId: string) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  commands,
  progress,
  learningHistory,
  onNavigateTab,
  onToggleBookmark
}) => {
  // Phrase of the Day: random from all commands
  const [phraseIndex, setPhraseIndex] = useState(() => Math.floor(Math.random() * commands.length));
  const [showVietnamese, setShowVietnamese] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<VocabCategory | null>(null);
  const [cardShowVn, setCardShowVn] = useState<Record<string, boolean>>({});

  const phraseOfDay = commands[phraseIndex % commands.length];

  const handleNextPhrase = () => {
    stopSpeaking();
    setIsPlayingAudio(false);
    setShowVietnamese(false);
    setPhraseIndex(prev => (prev + 1) % commands.length);
  };

  const handlePlayAudio = () => {
    stopSpeaking();
    setIsPlayingAudio(true);
    speakText(`${phraseOfDay.teacherCall}. ${phraseOfDay.studentResponse}`, {
      rate: 1.0,
      onEnd: () => setIsPlayingAudio(false)
    });
  };

  const handlePlayCardAudio = (text: string) => {
    stopSpeaking();
    speakText(text, { rate: 1.0 });
  };

  const toggleCardVn = (id: string) => {
    setCardShowVn(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Get commands for expanded category
  const expandedCommands = expandedCategory 
    ? getCommandsByVocabCategory(expandedCategory) 
    : [];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      
      {/* ═══ HERO SECTION ═══ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFB800] via-[#FFD54F] to-[#FFB800] text-white p-6 sm:p-8 shadow-lg shadow-[#FFB800]/20">
        {/* Decorative glow */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-56 h-56 rounded-full bg-yellow-200/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center space-y-3">
          <div className="text-4xl sm:text-5xl animate-bounce">🌻</div>
          
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-[#222]">
            "Small phrases, big changes."
          </h1>
          <p className="text-sm sm:text-base font-semibold text-[#222]/70 max-w-lg mx-auto">
            Inspire your students today! 
            <span className="text-[#222]/40 text-xs block mt-1">
              (Click each phrase to listen and practice)
            </span>
          </p>
        </div>
      </div>

      {/* ═══ PHRASE OF THE DAY WIDGET ═══ */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-[#FFB800]/30 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB800] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-[#FFB800]">
              Phrase of the Day
            </span>
          </div>
          <button
            onClick={handleNextPhrase}
            className="text-xs font-bold text-[#888] hover:text-[#222] flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Next</span>
          </button>
        </div>

        {/* Phrase Content */}
        <div className="space-y-2">
          <div className="text-xl sm:text-2xl font-black text-[#222] tracking-tight leading-snug">
            "{phraseOfDay.teacherCall}"
          </div>
          <div className="text-sm font-bold text-[#444]">
            → "{phraseOfDay.studentResponse}"
          </div>

          {/* Vietnamese toggle */}
          <div>
            <button
              onClick={() => setShowVietnamese(!showVietnamese)}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#888] hover:text-[#FFB800] transition-colors"
            >
              {showVietnamese ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              <span>{showVietnamese ? 'Hide Vietnamese' : 'Show Vietnamese'}</span>
            </button>
            {showVietnamese && (
              <p className="text-xs text-[#888] mt-1 italic animate-fadeInUp">
                {phraseOfDay.vietnameseTranslation}
              </p>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <button
            onClick={handlePlayAudio}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isPlayingAudio
                ? 'bg-[#FFB800] text-white shadow-md shadow-[#FFB800]/25'
                : 'bg-[#FFB800]/10 text-[#FFB800] hover:bg-[#FFB800]/20'
            }`}
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
            <span>🔊 Listen</span>
          </button>

          <button
            onClick={() => onNavigateTab('voicelab', phraseOfDay.id)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#222] text-white text-xs font-bold hover:bg-[#333] transition-colors"
          >
            <Mic className="w-4 h-4" />
            <span>🎙️ Practice</span>
          </button>
        </div>
      </div>

      {/* ═══ 4 CATEGORY CARDS (Grid 2×2) ═══ */}
      <div className="space-y-3">
        <h2 className="text-sm font-black text-[#222] uppercase tracking-wider px-1">
          Browse by Category
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {VOCAB_CATEGORIES_META.map((cat, idx) => {
            const catCommands = getCommandsByVocabCategory(cat.id);
            const isExpanded = expandedCategory === cat.id;
            const masteredInCat = catCommands.filter(c => progress.masteredIds.includes(c.id)).length;

            return (
              <div key={cat.id} className="animate-fadeInUp" style={{ animationDelay: `${idx * 80}ms` }}>
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                  className={`w-full text-left rounded-2xl p-4 sm:p-5 border-2 transition-all hover:shadow-md group ${
                    isExpanded
                      ? `${cat.bgColor} ${cat.borderColor} shadow-md`
                      : `bg-white ${cat.borderColor} hover:${cat.bgColor}`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform">
                        {cat.icon}
                      </span>
                      <div>
                        <h3 className="text-sm sm:text-base font-black text-[#222]">
                          {cat.label}
                        </h3>
                        <p className="text-[11px] text-[#888] font-medium">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-[#888] bg-gray-100 px-2 py-0.5 rounded-full">
                        {catCommands.length} phrases
                      </span>
                      {isExpanded 
                        ? <ChevronUp className="w-4 h-4 text-[#888]" />
                        : <ChevronDown className="w-4 h-4 text-[#888]" />
                      }
                    </div>
                  </div>
                  
                  {masteredInCat > 0 && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-500`}
                          style={{ width: `${Math.min(100, (masteredInCat / catCommands.length) * 100)}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#888]">
                        {masteredInCat}/{catCommands.length}
                      </span>
                    </div>
                  )}
                </button>

                {/* Expanded Phrase Cards */}
                {isExpanded && (
                  <div className="mt-2 space-y-2 animate-fadeInUp">
                    {catCommands.map(cmd => (
                      <div 
                        key={cmd.id}
                        className="bg-white rounded-xl p-4 border border-gray-200 hover:border-[#FFB800]/40 transition-all space-y-2"
                      >
                        {/* English phrase — big & bold */}
                        <div className="text-base sm:text-lg font-black text-[#222] leading-snug">
                          "{cmd.teacherCall}"
                        </div>
                        
                        {cmd.studentResponse && (
                          <div className="text-sm font-semibold text-[#444]">
                            → "{cmd.studentResponse}"
                          </div>
                        )}

                        {/* Vietnamese — hidden by default */}
                        <div>
                          <button
                            onClick={() => toggleCardVn(cmd.id)}
                            className="text-[10px] font-semibold text-[#aaa] hover:text-[#FFB800] flex items-center gap-1 transition-colors"
                          >
                            {cardShowVn[cmd.id] ? <EyeOff className="w-2.5 h-2.5" /> : <Eye className="w-2.5 h-2.5" />}
                            <span>{cardShowVn[cmd.id] ? 'Hide' : 'Tiếng Việt'}</span>
                          </button>
                          {cardShowVn[cmd.id] && (
                            <p className="text-xs text-[#999] mt-0.5 italic">
                              {cmd.vietnameseTranslation}
                            </p>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handlePlayCardAudio(`${cmd.teacherCall}. ${cmd.studentResponse}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFB800]/10 text-[#FFB800] text-xs font-bold hover:bg-[#FFB800]/20 transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Listen</span>
                          </button>
                          <button
                            onClick={() => onNavigateTab('voicelab', cmd.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] text-white text-xs font-bold hover:bg-[#333] transition-colors"
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span>Practice</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══ Quick Stats (compact) ═══ */}
      <div className="flex items-center justify-center gap-6 py-4 text-center">
        <div>
          <div className="text-lg font-black text-[#FFB800]">{commands.length}</div>
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
    </div>
  );
};
