import React, { useState } from 'react';
import { 
  X, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  Volume2, 
  Sparkles, 
  HelpCircle,
  Download
} from 'lucide-react';
import { CommandItem } from '../types';
import { speakText, stopSpeaking } from '../utils/speech';

interface FlashcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  commands: CommandItem[];
}

export const FlashcardModal: React.FC<FlashcardModalProps> = ({
  isOpen,
  onClose,
  commands
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen) return null;

  const filteredCommands = categoryFilter === 'All'
    ? commands
    : commands.filter(c => c.category === categoryFilter);

  const currentCard = filteredCommands[currentIndex] || commands[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev + 1) % filteredCommands.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
  };

  const handlePlayAudio = (rate: number = 1.0) => {
    stopSpeaking();
    setIsPlayingAudio(true);
    const text = currentCard.studentResponse 
      ? `${currentCard.teacherCall}. ${currentCard.studentResponse}` 
      : currentCard.teacherCall;
    speakText(text, {
      rate,
      tone: currentCard.toneRecommendation,
      onEnd: () => setIsPlayingAudio(false)
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const categories = ['All', ...Array.from(new Set(commands.map(c => c.category)))];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-fadeInUp">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border-2 border-amber-300 relative flex flex-col max-h-[95vh] overflow-y-auto no-print">
        
        {/* Top Header */}
        <div className="flex items-center justify-between gap-2 border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🃏</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Flashcard 3D Lật Mặt Sư Phạm
                </h3>
                <span className="text-[10px] font-black uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                  {currentIndex + 1} / {filteredCommands.length}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Chạm vào thẻ để lật xem nghĩa & cử chỉ TPR • Sẵn sàng in PDF A4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Print / PDF Button */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
              title="In hoặc Lưu PDF khổ A4"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">In PDF (A4)</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 scrollbar-none text-xs">
          {categories.slice(0, 6).map(cat => (
            <button
              key={cat}
              onClick={() => {
                setCategoryFilter(cat);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? 'Tất cả câu lệnh' : cat}
            </button>
          ))}
        </div>

        {/* 3D Flip Card Container */}
        <div className="my-3 flex-1 flex flex-col items-center justify-center">
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full h-80 sm:h-96 cursor-pointer select-none perspective-1000 group"
          >
            <div 
              className={`relative w-full h-full duration-500 transform-style-3d transition-transform rounded-3xl shadow-xl ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* ══ FRONT OF CARD ══ */}
              <div className="absolute inset-0 w-full h-full bg-linear-to-br from-amber-50 via-white to-amber-100/60 rounded-3xl border-2 border-amber-300 p-6 sm:p-8 flex flex-col justify-between backface-hidden">
                
                {/* Card Top */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 text-xs font-black uppercase tracking-wider border border-teal-200">
                      {currentCard.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {currentCard.gradeLevel}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-amber-600 flex items-center gap-1 bg-amber-100/80 px-2.5 py-1 rounded-full">
                    <RotateCw className="w-3 h-3 animate-spin-slow" />
                    <span>Chạm để lật</span>
                  </span>
                </div>

                {/* Card Center: English & IPA */}
                <div className="text-center space-y-3 my-auto">
                  <div className="text-xs sm:text-sm font-mono text-slate-500 tracking-wide bg-white/70 py-1 px-3 rounded-full inline-block border border-slate-200">
                    {currentCard.callIpa}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                    "{currentCard.teacherCall}"
                  </h2>
                  {currentCard.studentResponse && (
                    <div className="text-base sm:text-lg font-bold text-amber-700 bg-amber-50/80 py-1.5 px-4 rounded-xl border border-amber-200/60 inline-block">
                      → "{currentCard.studentResponse}"
                    </div>
                  )}
                </div>

                {/* Card Bottom: 2 Speed Audio Buttons */}
                <div 
                  className="flex items-center justify-center gap-3 pt-4 border-t border-amber-200/60"
                  onClick={(e) => e.stopPropagation()} // don't flip when clicking audio
                >
                  <button
                    onClick={() => handlePlayAudio(1.0)}
                    disabled={isPlayingAudio}
                    className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>🔊 Phát âm chuẩn (1.0x)</span>
                  </button>

                  <button
                    onClick={() => handlePlayAudio(0.7)}
                    disabled={isPlayingAudio}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-all"
                  >
                    <span>🔄 Phát chậm rõ từ (0.7x)</span>
                  </button>
                </div>
              </div>

              {/* ══ BACK OF CARD (Flipped) ══ */}
              <div className="absolute inset-0 w-full h-full bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-3xl border-2 border-emerald-300 p-6 sm:p-8 flex flex-col justify-between backface-hidden rotate-y-180">
                
                {/* Back Top */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider border border-emerald-200">
                    Nghĩa & Hành Động Sư Phạm
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                    <RotateCw className="w-3 h-3" />
                    <span>Lật lại mặt trước</span>
                  </span>
                </div>

                {/* Back Center: Meaning & Context */}
                <div className="space-y-4 my-auto">
                  {/* Vietnamese Meaning */}
                  <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs space-y-1">
                    <div className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                      👉 Nghĩa tiếng Việt
                    </div>
                    <div className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {currentCard.vietnameseTranslation}
                    </div>
                  </div>

                  {/* Context */}
                  <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200 text-xs text-slate-700 leading-relaxed">
                    <strong>Tình huống sử dụng:</strong> {currentCard.context}
                  </div>

                  {/* TPR physical cue */}
                  {currentCard.tprCue && (
                    <div className="bg-blue-50/60 p-3 rounded-2xl border border-blue-200 text-xs text-blue-950 flex items-start gap-2">
                      <span className="text-base shrink-0">{currentCard.tprCue.iconTip.split(' ')[0]}</span>
                      <div>
                        <strong>Cử chỉ TPR sư phạm:</strong> {currentCard.tprCue.teacherAction}
                      </div>
                    </div>
                  )}
                </div>

                {/* Back Bottom */}
                <div className="text-center text-xs text-slate-400">
                  Phát huy tối đa phản xạ ngôn ngữ tự nhiên của học sinh tiểu học
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={handlePrev}
            className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Thẻ trước</span>
          </button>

          <div className="text-xs font-semibold text-slate-500">
            Dùng phím hoặc bấm để chuyển câu
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <span>Thẻ tiếp theo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* ═══ PRINT ONLY TEMPLATE (For A4 PDF) ═══ */}
      <div className="hidden print:block fixed inset-0 bg-white p-6 z-50 text-black">
        <div className="text-center mb-6 border-b-2 border-black pb-4">
          <h1 className="text-2xl font-bold uppercase tracking-tight">
            CLB Tiếng Anh Giáo Viên Tiểu Học — Bộ Thẻ Flashcard Khẩu Lệnh Lớp Học
          </h1>
          <p className="text-sm italic mt-1">
            "Together We Learn – Together We Shine" • Tiêu chuẩn K-5 Bộ Giáo dục & Đào tạo
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredCommands.slice(0, 8).map((cmd, idx) => (
            <div key={cmd.id} className="border-2 border-dashed border-gray-400 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                <span>#{idx + 1} • {cmd.category}</span>
                <span>{cmd.gradeLevel}</span>
              </div>
              <div className="text-xs font-mono text-gray-500">{cmd.callIpa}</div>
              <div className="text-lg font-bold text-black">"{cmd.teacherCall}"</div>
              {cmd.studentResponse && (
                <div className="text-sm font-medium text-gray-800">→ "{cmd.studentResponse}"</div>
              )}
              <div className="text-sm font-semibold text-gray-700 border-t pt-1">
                👉 {cmd.vietnameseTranslation}
              </div>
              <div className="text-xs text-gray-500 italic">
                {cmd.context}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
