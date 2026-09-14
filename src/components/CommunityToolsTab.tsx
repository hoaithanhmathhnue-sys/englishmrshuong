import React, { useState } from 'react';
import { 
  Bell, 
  Sparkles, 
  Clapperboard, 
  Trophy, 
  Clock, 
  Volume2, 
  VolumeX, 
  Waves, 
  Printer, 
  CheckCircle2,
  Smile,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { 
  playAttentionChime, 
  playMagicWand, 
  playApplause, 
  playVictoryFanfare, 
  playSchoolBell, 
  playRainstick, 
  playGentleBuzzer, 
  playCountdownTick 
} from '../utils/soundEngine';
import { PRINTABLE_POSTERS, PosterTemplate } from '../data/communityData';

export const CommunityToolsTab: React.FC = () => {
  // Soundboard State
  const [activeSoundId, setActiveSoundId] = useState<string | null>(null);
  const [countdownRemaining, setCountdownRemaining] = useState<number | null>(null);
  const cancelCountdownRef = React.useRef<(() => void) | null>(null);

  // Poster State
  const [selectedPoster, setSelectedPoster] = useState<PosterTemplate>(PRINTABLE_POSTERS[0]);

  // Sound triggers
  const handleTriggerSound = (id: string, playFn: () => void) => {
    setActiveSoundId(id);
    playFn();
    setTimeout(() => {
      setActiveSoundId(null);
    }, 1200);
  };

  const handleTriggerCountdown = () => {
    if (cancelCountdownRef.current) {
      cancelCountdownRef.current();
      cancelCountdownRef.current = null;
      setCountdownRemaining(null);
      setActiveSoundId(null);
      return;
    }

    setActiveSoundId('countdown');
    cancelCountdownRef.current = playCountdownTick(
      (count) => setCountdownRemaining(count),
      () => {
        setCountdownRemaining(null);
        setActiveSoundId(null);
        cancelCountdownRef.current = null;
      }
    );
  };

  const soundboardButtons = [
    {
      id: 'chime',
      title: 'Attention Chime',
      description: 'Chuông thanh nhẹ ổn định trật tự lớp',
      icon: Bell,
      color: 'from-blue-600 to-indigo-600 text-white',
      badge: 'Ổn định',
      action: () => handleTriggerSound('chime', playAttentionChime)
    },
    {
      id: 'wand',
      title: 'Magic Wand',
      description: 'Đũa thần lung linh khen thưởng/hoạt động mới',
      icon: Sparkles,
      color: 'from-amber-500 to-yellow-500 text-slate-950',
      badge: 'Khen ngợi',
      action: () => handleTriggerSound('wand', playMagicWand)
    },
    {
      id: 'applause',
      title: 'Applause & Cheer',
      description: 'Tiếng vỗ tay hoan hô học sinh cả lớp',
      icon: Clapperboard,
      color: 'from-emerald-600 to-teal-600 text-white',
      badge: 'Vỗ tay',
      action: () => handleTriggerSound('applause', playApplause)
    },
    {
      id: 'fanfare',
      title: 'Victory Fanfare',
      description: 'Giai điệu chiến thắng khi thắng trò chơi',
      icon: Trophy,
      color: 'from-purple-600 to-pink-600 text-white',
      badge: 'Chiến thắng',
      action: () => handleTriggerSound('fanfare', playVictoryFanfare)
    },
    {
      id: 'bell',
      title: 'School Bell',
      description: 'Chuông báo chuyển trạm & đổi hoạt động',
      icon: Clock,
      color: 'from-cyan-600 to-blue-700 text-white',
      badge: 'Chuyển tiết',
      action: () => handleTriggerSound('bell', playSchoolBell)
    },
    {
      id: 'rainstick',
      title: 'Rainstick Soothing',
      description: 'Âm thanh sóng nước hạ nhiệt khi lớp ồn',
      icon: Waves,
      color: 'from-teal-600 to-emerald-700 text-white',
      badge: 'Hạ nhiệt',
      action: () => handleTriggerSound('rainstick', playRainstick)
    },
    {
      id: 'buzzer',
      title: 'Gentle Buzzer',
      description: 'Tiếng gỗ gõ nhắc nhở nhẹ nhàng (không phạt)',
      icon: Volume2,
      color: 'from-rose-500 to-orange-500 text-white',
      badge: 'Nhắc nhở',
      action: () => handleTriggerSound('buzzer', playGentleBuzzer)
    },
    {
      id: 'countdown',
      title: countdownRemaining !== null ? `Đếm: ${countdownRemaining}s` : '5-Second Countdown',
      description: 'Tích tắc đếm ngược 5 giây kèm chuông báo',
      icon: countdownRemaining !== null ? Flame : Clock,
      color: 'from-orange-600 to-red-600 text-white',
      badge: countdownRemaining !== null ? 'Đang chạy' : 'Đếm ngược',
      action: handleTriggerCountdown
    }
  ];



  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-16">
      {/* Header section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
          <Volume2 className="w-3.5 h-3.5 text-blue-600" />
          <span>Interactive Classroom Soundboard & Poster Tools</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Bàn âm thanh lớp học & poster in ấn
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-3xl">
          Công cụ hỗ trợ trực tiếp khi giảng dạy trên lớp: 8 hiệu ứng âm thanh tự tổng hợp bằng Web Audio API và poster nội quy in ấn A4/A3 chuẩn mực.
        </p>
      </div>

      {/* 1. INTERACTIVE SOUNDBOARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-blue-600" />
              <span>1. Bàn âm thanh lớp học (Interactive Classroom Soundboard)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              100% âm thanh tổng hợp trực tiếp bằng Web Audio API (OscillatorNode) — không sợ lỗi tải file, bấm là kêu ngay!
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Web Audio Engine Active</span>
          </div>
        </div>

        {/* 8 Big Soundboard Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {soundboardButtons.map((btn) => {
            const Icon = btn.icon;
            const isActive = activeSoundId === btn.id;

            return (
              <button
                key={btn.id}
                id={`btn-sound-${btn.id}`}
                onClick={btn.action}
                className={`p-5 rounded-2xl bg-linear-to-br ${btn.color} text-left shadow-md hover:shadow-lg transition-all hover:scale-102 active:scale-97 flex flex-col justify-between relative overflow-hidden group ${
                  isActive ? 'ring-4 ring-amber-300 scale-102' : ''
                }`}
                style={{ minHeight: '140px' }}
              >
                {/* Background decorative ring */}
                <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/10 group-hover:scale-125 transition-transform duration-300 pointer-events-none" />

                <div className="flex items-center justify-between w-full">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shadow-xs">
                    <Icon className={`w-5 h-5 ${isActive ? 'animate-bounce' : ''}`} />
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-black/20 text-white/90">
                    {btn.badge}
                  </span>
                </div>

                <div className="mt-3">
                  <div className="text-sm sm:text-base font-extrabold tracking-tight">
                    {btn.title}
                  </div>
                  <div className="text-[11px] text-white/80 line-clamp-2 mt-0.5 font-medium leading-snug">
                    {btn.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PRINTABLE POSTERS */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 no-print">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Printer className="w-5 h-5 text-amber-600" />
              <span>2. Poster khẩu lệnh in ấn góc lớp học (Printable Posters)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Thiết kế khổ A4 / A3 chuẩn mực để in và treo tại bảng tin góc lớp học tiếng Anh
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {PRINTABLE_POSTERS.map((poster) => (
                <button
                  key={poster.id}
                  onClick={() => setSelectedPoster(poster)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedPoster.id === poster.id
                      ? 'bg-white text-blue-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {poster.id === 'poster-rules' ? 'Nội Quy Vàng' : 'Khẩu Lệnh Daily'}
                </button>
              ))}
            </div>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>In poster này</span>
            </button>
          </div>
        </div>

        {/* Poster Visual Canvas */}
        <div className="rounded-3xl border-4 border-slate-800 p-6 sm:p-8 bg-linear-to-b from-slate-900 to-blue-950 text-white shadow-xl max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-1 border-b border-white/20 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
              {selectedPoster.gradeRecommendation}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-amber-300 pt-2">
              {selectedPoster.title}
            </h3>
            <p className="text-xs sm:text-sm text-blue-200">
              {selectedPoster.subtitle}
            </p>
          </div>

          {/* Poster Items */}
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {selectedPoster.items.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex items-center gap-4 hover:bg-white/15 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-blue-950 flex items-center justify-center text-2xl font-black shrink-0 shadow-md">
                  {item.actionIcon}
                </div>
                <div className="flex-1 space-y-0.5">
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    {item.ruleOrCommand}
                  </div>
                  <div className="text-xs text-blue-200 font-medium">
                    {item.translation}
                  </div>
                </div>
                <div className="hidden sm:block text-right text-xs text-amber-300 font-semibold bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  {item.gesture}
                </div>
              </div>
            ))}
          </div>

          {/* Poster Footer Note */}
          <div className="text-center text-[10px] text-blue-300/70 border-t border-white/10 pt-3">
            English Communication Club for Primary School Teachers • Phát hành miễn phí cho lớp học
          </div>
        </div>
      </div>

    </div>
  );
};
