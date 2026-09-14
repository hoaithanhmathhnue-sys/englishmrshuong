import React, { useState, useRef, useCallback } from 'react';
import { 
  Bell, 
  Sparkles, 
  Trophy, 
  Clock, 
  Volume2, 
  ChevronUp, 
  ChevronDown, 
  Eye, 
  VolumeX, 
  Zap, 
  ShieldAlert,
  Flame,
  Mic
} from 'lucide-react';
import { 
  playAttentionChime, 
  playMagicWand, 
  playApplause, 
  playCountdownTick 
} from '../utils/soundEngine';
import { speakText, stopSpeaking } from '../utils/speech';

interface MiniFloatingDockProps {
  onNavigateTab?: (tab: string) => void;
}

export const MiniFloatingDock: React.FC<MiniFloatingDockProps> = ({ onNavigateTab }) => {

  const [isExpanded, setIsExpanded] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [countdownNum, setCountdownNum] = useState<number | null>(null);
  const [countdownSec, setCountdownSec] = useState(5);
  const cancelCountdownRef = useRef<(() => void) | null>(null);

  // Trigger sound effect — fire-and-forget, instant visual feedback
  const triggerAudio = useCallback((id: string, fn: () => void) => {
    setActiveButton(id);
    fn();
    setTimeout(() => setActiveButton(null), 800);
  }, []);

  // Trigger quick command speech — instant visual, async speech
  const triggerSpeech = useCallback((id: string, text: string) => {
    setActiveButton(id);
    stopSpeaking();
    // Defer speech to next microtask so UI updates instantly
    requestAnimationFrame(() => {
      speakText(text, {
        rate: 1.0,
        tone: 'energetic',
        onEnd: () => setActiveButton(null)
      });
    });
  }, []);

  // Trigger 5s Countdown
  const triggerCountdown = () => {
    if (cancelCountdownRef.current) {
      cancelCountdownRef.current();
      cancelCountdownRef.current = null;
      setCountdownNum(null);
      setActiveButton(null);
      return;
    }

    setActiveButton('countdown');
    cancelCountdownRef.current = playCountdownTick(
      (count) => setCountdownNum(count),
      () => {
        setCountdownNum(null);
        setActiveButton(null);
        cancelCountdownRef.current = null;
      },
      countdownSec
    );
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 no-print select-none">
      {/* Expanded Dock Panel */}
      {isExpanded && (
        <div className="bg-slate-900/95 border-2 border-amber-400/80 rounded-3xl p-3 shadow-2xl shadow-slate-950/40 text-white w-72 sm:w-80 animate-slideUp" style={{ willChange: 'transform, opacity' }}>
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-700/80">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-amber-300">
                Bục Giảng Nhanh (Floating Dock)
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons Grid - Large Tap Targets >= 44px */}
          <div className="grid grid-cols-2 gap-2">
            {/* 1. Attention Chime */}
            <button
              onClick={() => triggerAudio('chime', playAttentionChime)}
              className={`p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left font-bold text-xs ${
                activeButton === 'chime'
                  ? 'bg-amber-400 text-slate-950 scale-95 ring-2 ring-white'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="leading-tight">Chuông lớp</div>
                <div className="text-[10px] text-amber-200/80 font-normal">Ổn định trật tự</div>
              </div>
            </button>

            {/* 2. Magic Wand */}
            <button
              onClick={() => triggerAudio('magic', playMagicWand)}
              className={`p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left font-bold text-xs ${
                activeButton === 'magic'
                  ? 'bg-emerald-400 text-slate-950 scale-95 ring-2 ring-white'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="leading-tight">Khen thưởng</div>
                <div className="text-[10px] text-emerald-200/80 font-normal">Tặng sao vàng</div>
              </div>
            </button>

            {/* 3. Applause */}
            <button
              onClick={() => triggerAudio('applause', playApplause)}
              className={`p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left font-bold text-xs ${
                activeButton === 'applause'
                  ? 'bg-yellow-400 text-slate-950 scale-95 ring-2 ring-white'
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 hover:bg-yellow-500/30'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-yellow-400 text-slate-950 flex items-center justify-center shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="leading-tight">Vỗ tay</div>
                <div className="text-[10px] text-yellow-200/80 font-normal">Tuyên dương lớp</div>
              </div>
            </button>

            {/* 4. Customizable Countdown */}
            <div className={`p-3 rounded-2xl transition-all text-left font-bold text-xs col-span-2 ${
              activeButton === 'countdown'
                ? 'bg-rose-500 text-white scale-[0.98] ring-2 ring-white'
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}>
              <div className="flex items-center gap-2.5 mb-2">
                <button
                  onClick={triggerCountdown}
                  className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 text-sm font-black hover:bg-rose-600 active:scale-90 transition-all"
                >
                  {countdownNum !== null ? countdownNum : `${countdownSec}s`}
                </button>
                <div className="flex-1">
                  <div className="leading-tight">Đếm ngược</div>
                  <div className="text-[10px] text-rose-200/80 font-normal">
                    {countdownNum !== null ? 'Bấm để hủy' : 'Bấm số để bắt đầu'}
                  </div>
                </div>
              </div>

              {/* Seconds selector — only show when NOT counting */}
              {countdownNum === null && (
                <div className="flex items-center gap-1.5">
                  {/* Minus button */}
                  <button
                    onClick={() => setCountdownSec(s => Math.max(1, s - 1))}
                    className="w-7 h-7 rounded-lg bg-rose-600/40 hover:bg-rose-600/60 text-white flex items-center justify-center text-sm font-bold transition-colors active:scale-90"
                  >
                    −
                  </button>

                  {/* Preset chips */}
                  {[3, 5, 10, 15, 30].map(s => (
                    <button
                      key={s}
                      onClick={() => setCountdownSec(s)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all active:scale-90 ${
                        countdownSec === s
                          ? 'bg-rose-500 text-white ring-1 ring-white/60'
                          : 'bg-rose-600/30 text-rose-200 hover:bg-rose-600/50'
                      }`}
                    >
                      {s}s
                    </button>
                  ))}

                  {/* Plus button */}
                  <button
                    onClick={() => setCountdownSec(s => Math.min(60, s + 1))}
                    className="w-7 h-7 rounded-lg bg-rose-600/40 hover:bg-rose-600/60 text-white flex items-center justify-center text-sm font-bold transition-colors active:scale-90"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* 5. Quick Call 1: Eyes on me */}
            <button
              onClick={() => triggerSpeech('eyes', '1, 2, 3, eyes on me!')}
              className={`p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left font-bold text-xs col-span-2 ${
                activeButton === 'eyes'
                  ? 'bg-blue-400 text-slate-950 scale-98 ring-2 ring-white'
                  : 'bg-blue-500/20 text-blue-200 border border-blue-500/40 hover:bg-blue-500/30'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                <Eye className="w-4 h-4" />
              </div>
              <div>
                <div className="leading-tight text-white font-extrabold">"1, 2, 3, eyes on me!"</div>
                <div className="text-[10px] text-blue-300/80 font-normal">Tập trung mắt nhìn lên bảng</div>
              </div>
            </button>

            {/* 6. Quick Voice Lab Shortcut */}
            {onNavigateTab && (
              <button
                onClick={() => { onNavigateTab('voicelab'); setIsExpanded(false); }}
                className="p-3 rounded-2xl flex items-center gap-2.5 transition-all text-left font-bold text-xs col-span-2 bg-purple-500/20 text-purple-200 border border-purple-500/40 hover:bg-purple-500/30"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <div className="leading-tight text-white font-extrabold">Mở Voice Lab • Luyện phát âm</div>
                  <div className="text-[10px] text-purple-300/80 font-normal">Chuyển nhanh sang phòng luyện giọng</div>
                </div>
              </button>
            )}
          </div>
        </div>
      )}


      {/* Main Toggle Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        id="btn-mini-floating-dock"
        className="h-14 px-4 rounded-full bg-linear-to-r from-amber-500 via-amber-600 to-yellow-600 text-white shadow-xl shadow-amber-500/40 border-2 border-white/80 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 font-extrabold text-xs sm:text-sm"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-300"></span>
        </span>
        <span>🌻 Lên Lớp Nhanh</span>
        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>
    </div>
  );
};
