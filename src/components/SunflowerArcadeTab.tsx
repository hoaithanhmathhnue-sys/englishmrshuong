import React, { useState } from 'react';
import { 
  Gamepad2, 
  RotateCcw, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  Award, 
  Eye, 
  Zap, 
  Layers,
  Smile
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CommandItem, ScenarioItem } from '../types';
import { CLASSROOM_SCENARIOS } from '../data/scenariosData';
import { QUIZ_ARCADE_ENCOURAGEMENTS } from '../data/sunflowerFeedbackData';
import { speakText, stopSpeaking } from '../utils/speech';

interface SunflowerArcadeTabProps {
  commands: CommandItem[];
  onRewardSeeds?: (amount: number) => void;
}

type ArcadeMode = 'flashcards' | 'audio_match' | 'scenarios';

export const SunflowerArcadeTab: React.FC<SunflowerArcadeTabProps> = ({
  commands,
  onRewardSeeds
}) => {
  const [activeMode, setActiveMode] = useState<ArcadeMode>('flashcards');

  // 1. Flashcards State
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<string[]>([]);

  // 2. Audio Matching State
  const [audioMatchIndex, setAudioMatchIndex] = useState(0);
  const [selectedMatchOption, setSelectedMatchOption] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<'correct' | 'wrong' | null>(null);
  const [matchScore, setMatchScore] = useState(0);

  // 3. Scenario Quiz State
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedScenarioOption, setSelectedScenarioOption] = useState<string | null>(null);
  const [scenarioAnswered, setScenarioAnswered] = useState(false);

  // Encouragement toast state
  const [encouragementToast, setEncouragementToast] = useState<{ english: string; vietnamese: string } | null>(null);

  const currentCard = commands[cardIndex] || commands[0];
  const currentScenario: ScenarioItem = CLASSROOM_SCENARIOS[scenarioIndex] || CLASSROOM_SCENARIOS[0];

  // Helper trigger audio
  const handlePlayVoice = (text: string, rate: number = 1.0) => {
    stopSpeaking();
    speakText(text, { rate, tone: 'energetic' });
  };

  // Flashcards navigation
  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex(prev => (prev + 1) % commands.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex(prev => (prev - 1 + commands.length) % commands.length);
  };

  const handleMarkCardKnown = () => {
    if (!knownCards.includes(currentCard.id)) {
      setKnownCards(prev => [...prev, currentCard.id]);
      onRewardSeeds?.(5);
    }
    handleNextCard();
  };

  // Audio match logic: 1 câu đúng + 3 câu nhiễu
  const currentMatchTarget = commands[audioMatchIndex % commands.length];
  // Tạo 4 options: 1 đúng + 3 ngẫu nhiên
  const matchOptions = React.useMemo(() => {
    const distractors = commands.filter(c => c.id !== currentMatchTarget.id).slice(0, 3);
    const combined = [currentMatchTarget, ...distractors];
    // Sắp xếp ngẫu nhiên dựa theo id
    return combined.sort((a, b) => a.id.localeCompare(b.id));
  }, [currentMatchTarget, commands]);

  const handleSelectMatch = (optionId: string) => {
    if (selectedMatchOption !== null) return;
    setSelectedMatchOption(optionId);

    if (optionId === currentMatchTarget.id) {
      setMatchResult('correct');
      setMatchScore(prev => prev + 1);
      onRewardSeeds?.(10);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      setMatchResult('wrong');
      const randomEnc = QUIZ_ARCADE_ENCOURAGEMENTS[Math.floor(Math.random() * QUIZ_ARCADE_ENCOURAGEMENTS.length)];
      setEncouragementToast(randomEnc);
      setTimeout(() => setEncouragementToast(null), 4000);
    }
  };

  const handleNextMatch = () => {
    setSelectedMatchOption(null);
    setMatchResult(null);
    setAudioMatchIndex(prev => prev + 1);
  };

  // Scenario selection
  const handleSelectScenario = (optionId: string) => {
    if (scenarioAnswered) return;
    setSelectedScenarioOption(optionId);
    setScenarioAnswered(true);

    const chosen = currentScenario.options.find(o => o.id === optionId);
    if (chosen?.isBest) {
      onRewardSeeds?.(15);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      const randomEnc = QUIZ_ARCADE_ENCOURAGEMENTS[Math.floor(Math.random() * QUIZ_ARCADE_ENCOURAGEMENTS.length)];
      setEncouragementToast(randomEnc);
      setTimeout(() => setEncouragementToast(null), 4000);
    }
  };

  const handleNextScenario = () => {
    setSelectedScenarioOption(null);
    setScenarioAnswered(false);
    setScenarioIndex(prev => (prev + 1) % CLASSROOM_SCENARIOS.length);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Banner */}
      <div className="rounded-3xl bg-linear-to-r from-amber-500 via-amber-600 to-yellow-600 p-6 sm:p-8 text-white shadow-xl shadow-amber-500/20 border border-amber-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
              <Gamepad2 className="w-3.5 h-3.5 text-yellow-200" />
              <span>Phân Khu Trò Chơi Phản Xạ • Sunflower Arcade</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Đấu Trường Phản Xạ Tiếng Anh Lớp Học
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm max-w-2xl">
              Rèn luyện phản xạ nghe hiểu, lật thẻ từ thông minh và giải quyết các tình huống sư phạm thực tế theo cách dí dỏm, không áp lực!
            </p>
          </div>

          <div className="shrink-0 bg-white/15 backdrop-blur-xs p-3 rounded-2xl border border-white/30 text-center">
            <div className="text-xs text-amber-100 font-medium">Đã thuộc thẻ</div>
            <div className="text-xl font-black text-white">{knownCards.length}/{commands.length}</div>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 mt-6 bg-amber-900/30 p-1.5 rounded-2xl border border-amber-400/30">
          <button
            onClick={() => setActiveMode('flashcards')}
            className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeMode === 'flashcards'
                ? 'bg-white text-amber-900 shadow-md'
                : 'text-amber-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Thẻ Lật Thông Minh</span>
          </button>

          <button
            onClick={() => setActiveMode('audio_match')}
            className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeMode === 'audio_match'
                ? 'bg-white text-amber-900 shadow-md'
                : 'text-amber-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>Nối Âm Thanh</span>
          </button>

          <button
            onClick={() => setActiveMode('scenarios')}
            className={`py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
              activeMode === 'scenarios'
                ? 'bg-white text-amber-900 shadow-md'
                : 'text-amber-100 hover:text-white hover:bg-white/10'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Tình Huống Sư Phạm</span>
          </button>
        </div>
      </div>

      {/* Encouragement Toast Message */}
      {encouragementToast && (
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-900 shadow-md flex items-start gap-3 animate-fadeIn">
          <span className="text-2xl shrink-0">🌻</span>
          <div className="space-y-0.5">
            <div className="text-xs font-extrabold text-amber-800">
              Mrs. Huong AI: "{encouragementToast.english}"
            </div>
            <div className="text-xs text-amber-700 font-medium">
              👉 {encouragementToast.vietnamese}
            </div>
          </div>
        </div>
      )}

      {/* MODE 1: SMART FLASHCARDS */}
      {activeMode === 'flashcards' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Thẻ số {cardIndex + 1} / {commands.length}</span>
            <span>Bấm vào thẻ để lật mặt sau</span>
          </div>

          {/* Flashcard 3D Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full min-h-[320px] bg-white rounded-3xl border-2 border-amber-300 hover:border-amber-500 transition-all duration-300 p-6 sm:p-8 cursor-pointer shadow-lg shadow-amber-500/10 flex flex-col justify-between select-none relative group"
          >
            {/* Top Tag & Flip indicator */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                {currentCard.category} ({currentCard.gradeLevel})
              </span>
              <span className="text-xs text-slate-400 group-hover:text-amber-600 transition-colors flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Mặt sau (Nghĩa & TPR)' : 'Mặt trước (Tiếng Anh)'}</span>
              </span>
            </div>

            {/* Content Area */}
            {!isFlipped ? (
              /* Mặt trước: Tiếng Anh */
              <div className="text-center py-6 space-y-3">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Khẩu lệnh tiếng Anh:
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                  "{currentCard.teacherCall}"
                </div>
                <div className="text-sm font-mono text-amber-600">
                  {currentCard.callIpa}
                </div>
                <div className="text-xs text-slate-500 italic pt-2">
                  (Bấm vào thẻ để xem nghĩa và hành động TPR)
                </div>
              </div>
            ) : (
              /* Mặt sau: Nghĩa & TPR */
              <div className="text-center py-6 space-y-4">
                <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Trò đáp & Dịch nghĩa:
                </div>
                <div className="text-lg sm:text-xl font-black text-slate-800">
                  "{currentCard.studentResponse}"
                </div>
                <div className="text-sm font-semibold text-slate-700 bg-amber-50 p-3 rounded-2xl border border-amber-200/80 max-w-md mx-auto">
                  {currentCard.vietnameseTranslation}
                </div>
                <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200 max-w-md mx-auto">
                  <span className="font-bold text-amber-700">Cử chỉ TPR: </span>
                  <span>{currentCard.tprCue.iconTip} — {currentCard.tprCue.teacherAction}</span>
                </div>
              </div>
            )}

            {/* Bottom Audio Controls */}
            <div 
              className="flex items-center justify-between pt-4 border-t border-slate-100"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePlayVoice(currentCard.teacherCall, 1.0)}
                  className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe 1.0x</span>
                </button>
                <button
                  onClick={() => handlePlayVoice(currentCard.teacherCall, 0.7)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <span>0.7x</span>
                </button>
              </div>

              <div className="text-xs text-amber-700 font-bold">
                {knownCards.includes(currentCard.id) ? '✅ Đã thuộc' : 'Chưa thuộc'}
              </div>
            </div>
          </div>

          {/* Controls below card */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2.5 rounded-2xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Thẻ trước</span>
            </button>

            <button
              onClick={handleMarkCardKnown}
              className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Đã Thuộc (+5 Hạt Vàng)</span>
            </button>

            <button
              onClick={handleNextCard}
              className="px-4 py-2.5 rounded-2xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center gap-1"
            >
              <span>Thẻ tiếp</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: AUDIO MATCHING GAME */}
      {activeMode === 'audio_match' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Lắng Nghe & Nối Khẩu Lệnh Phù Hợp
              </h2>
              <p className="text-xs text-slate-500">
                Bấm loa để nghe âm thanh mẫu, sau đó chọn câu lệnh đúng nhất.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              Điểm số: {matchScore} câu đúng
            </div>
          </div>

          {/* Big Speaker Button */}
          <div className="flex flex-col items-center justify-center py-6 space-y-3 bg-linear-to-b from-amber-50 to-white rounded-3xl border border-amber-200/80">
            <button
              onClick={() => handlePlayVoice(currentMatchTarget.teacherCall, 1.0)}
              className="w-20 h-20 rounded-3xl bg-linear-to-tr from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-xl shadow-amber-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
            >
              <Volume2 className="w-10 h-10 animate-pulse" />
            </button>
            <div className="text-xs font-bold text-slate-700">
              Bấm vào loa để nghe khẩu lệnh mẫu
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlayVoice(currentMatchTarget.teacherCall, 0.7)}
                className="text-[11px] text-amber-800 hover:underline font-semibold"
              >
                (Nghe chậm 0.7x)
              </button>
            </div>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {matchOptions.map((opt, idx) => {
              const isSelected = selectedMatchOption === opt.id;
              const isCorrect = opt.id === currentMatchTarget.id;
              let btnStyle = 'border-slate-200 hover:border-amber-400 bg-white text-slate-800';

              if (selectedMatchOption !== null) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
                } else if (isSelected) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectMatch(opt.id)}
                  disabled={selectedMatchOption !== null}
                  className={`p-4 rounded-2xl border-2 text-left transition-all text-xs font-semibold flex items-start gap-2.5 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="space-y-1">
                    <div className="font-extrabold text-sm text-slate-900">"{opt.teacherCall}"</div>
                    <div className="text-slate-500">{opt.vietnameseTranslation}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button after answering */}
          {selectedMatchOption !== null && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-xs">
                {matchResult === 'correct' ? (
                  <span className="font-bold text-emerald-600">🎉 Xuất sắc! Bạn đã chọn đúng khẩu lệnh.</span>
                ) : (
                  <span className="font-bold text-amber-700">🌻 Hãy cùng Mrs. Huong nghe lại câu đúng nhé!</span>
                )}
              </div>
              <button
                onClick={handleNextMatch}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
              >
                <span>Câu Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: PEDAGOGICAL SCENARIOS */}
      {activeMode === 'scenarios' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
              Tình huống {scenarioIndex + 1} / {CLASSROOM_SCENARIOS.length}: {currentScenario.title}
            </span>
            <span className="text-xs text-slate-500 font-semibold">{currentScenario.grade}</span>
          </div>

          {/* Scenario Situation */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Bối cảnh lớp học:
            </div>
            <div className="text-sm text-slate-800 font-medium leading-relaxed">
              {currentScenario.situation}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700">
              Theo bạn, khẩu lệnh tiếng Anh và phản xạ nào là phù hợp nhất?
            </div>
            <div className="grid grid-cols-1 gap-3">
              {currentScenario.options.map((opt, idx) => {
                const isSelected = selectedScenarioOption === opt.id;
                let btnStyle = 'border-slate-200 hover:border-amber-400 bg-white text-slate-800';

                if (scenarioAnswered) {
                  if (opt.isBest) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-900';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectScenario(opt.id)}
                    disabled={scenarioAnswered}
                    className={`p-4 rounded-2xl border-2 text-left transition-all text-xs flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="space-y-1 flex-1">
                      <div className="font-extrabold text-sm text-slate-900">"{opt.englishText}"</div>
                      <div className="text-slate-600">{opt.vietnameseText}</div>
                      {scenarioAnswered && opt.rationale && (
                        <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/50">
                          💡 <span className="font-semibold">Phân tích:</span> {opt.rationale}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pedagogical tip & Next */}
          {scenarioAnswered && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                <span className="font-bold">Lời khuyên sư phạm của Mrs. Huong: </span>
                <span>{currentScenario.pedagogicalTip}</span>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextScenario}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
                >
                  <span>Tình Huống Tiếp Theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
