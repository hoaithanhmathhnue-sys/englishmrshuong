import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Volume2, 
  Copy, 
  Check, 
  RefreshCw, 
  Key, 
  Zap, 
  HandMetal, 
  Lightbulb,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { GradeLevel, GeneratedLessonCommand, LessonGeneratorForm } from '../types';
import { generateLessonCommandsWithGemini, getStoredAiConfig } from '../utils/geminiClient';
import { speakText, stopSpeaking } from '../utils/speech';

interface LessonAiGeneratorTabProps {
  onOpenApiKeyModal: () => void;
}

const SAMPLE_LESSONS: LessonGeneratorForm[] = [
  {
    grade: 'Lớp 1',
    subject: 'Toán học',
    lessonName: 'Phép cộng trong phạm vi 10',
    notes: 'Khởi động vui vẻ bằng vỗ tay và đếm ngón tay'
  },
  {
    grade: 'Lớp 2',
    subject: 'Toán học',
    lessonName: 'Hình tam giác - Hình tứ giác',
    notes: 'Lớp cần nhận diện hình và vẽ hình trong không trung'
  },
  {
    grade: 'Lớp 3',
    subject: 'Tự nhiên & Xã hội',
    lessonName: 'Các cơ quan trong cơ thể người',
    notes: 'Học sinh sờ tay vào tim, phổi và làm động tác thể dục'
  },
  {
    grade: 'Lớp 4',
    subject: 'Khoa học',
    lessonName: 'Nước có những tính chất gì?',
    notes: 'Thí nghiệm rót nước vào cốc và quan sát'
  }
];

export const LessonAiGeneratorTab: React.FC<LessonAiGeneratorTabProps> = ({
  onOpenApiKeyModal
}) => {
  const [grade, setGrade] = useState<GradeLevel>('Lớp 1');
  const [subject, setSubject] = useState('Toán học');
  const [lessonName, setLessonName] = useState('Phép cộng trong phạm vi 10');
  const [notes, setNotes] = useState('Khởi động vui vẻ và có hô đáp nhịp nhàng');

  const [isLoading, setIsLoading] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedCommands, setGeneratedCommands] = useState<GeneratedLessonCommand[] | null>(null);
  const [modelUsed, setModelUsed] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const aiConfig = getStoredAiConfig();
  const hasApiKey = Boolean(aiConfig.apiKey);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!lessonName.trim()) return;

    if (!hasApiKey) {
      onOpenApiKeyModal();
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setProgressStatus('Đang kết nối trí tuệ nhân tạo Google AI...');

    try {
      const response = await generateLessonCommandsWithGemini(
        { grade, subject, lessonName, notes },
        (status) => setProgressStatus(status)
      );

      setGeneratedCommands(response.commands);
      setModelUsed(response.modelUsed);
    } catch (err: any) {
      console.error('Error generating lesson commands:', err);
      setErrorMsg(err?.message || 'Có lỗi xảy ra khi tạo câu lệnh. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
      setProgressStatus('');
    }
  };

  const handleApplySample = (sample: LessonGeneratorForm) => {
    setGrade(sample.grade);
    setSubject(sample.subject);
    setLessonName(sample.lessonName);
    setNotes(sample.notes || '');
  };

  const handlePlayVoice = (id: string, text: string, rate: number = 1.0) => {
    stopSpeaking();
    setPlayingId(`${id}-${rate}`);
    speakText(text, {
      rate,
      tone: 'energetic',
      onEnd: () => setPlayingId(null)
    });
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-amber-500 via-yellow-500 to-amber-600 p-6 sm:p-8 text-white shadow-xl shadow-amber-500/20 border border-amber-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span>Trí Tuệ Nhân Tạo Google GenAI • Gemini 3.6</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              AI Soạn Câu Lệnh Theo Bài Học
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm leading-relaxed">
              Nhập tên bài dạy của bạn (Toán, Tiếng Việt, Tự nhiên & Xã hội, Khoa học...), AI của Mrs. Huong sẽ tự động thiết kế ngay 4 câu lệnh Tiếng Anh tích hợp tương ứng 4 giai đoạn lên lớp kèm phiên âm IPA và cử chỉ TPR sinh động!
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
            <button
              onClick={onOpenApiKeyModal}
              className="px-4 py-2 rounded-xl bg-white text-amber-900 font-extrabold text-xs hover:bg-amber-50 transition-all shadow-md flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5 text-amber-600" />
              <span>{hasApiKey ? 'Cài đặt API Key' : 'Nhập API Key'}</span>
            </button>
            <span className="text-[11px] text-amber-100">
              {hasApiKey ? `Đang dùng: ${aiConfig.provider === 'gemini' ? 'Google AI Studio' : 'Agent Platform'}` : 'Chưa nhập API Key'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Input Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              <BookOpen className="w-4 h-4" />
            </div>
            <h2 className="text-base font-extrabold text-slate-900">Thông Tin Tiết Dạy Của Bạn</h2>
          </div>

          {/* Quick template chips */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-500 font-medium">Gợi ý bài mẫu:</span>
            {SAMPLE_LESSONS.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplySample(sample)}
                className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-semibold transition-colors"
              >
                {sample.subject} ({sample.grade})
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Grade */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Khối Lớp</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value as GradeLevel)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-xs font-medium bg-white"
              >
                <option value="Lớp 1">Lớp 1</option>
                <option value="Lớp 2">Lớp 2</option>
                <option value="Lớp 3">Lớp 3</option>
                <option value="Lớp 4">Lớp 4</option>
                <option value="Lớp 5">Lớp 5</option>
              </select>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Môn Học</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="VD: Toán học, Tự nhiên & Xã hội..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-xs font-medium"
              />
            </div>

            {/* Lesson Name */}
            <div className="space-y-1 sm:col-span-2 lg:col-span-1">
              <label className="text-xs font-bold text-slate-700">Tên Bài Dạy / Chủ Đề</label>
              <input
                type="text"
                value={lessonName}
                onChange={e => setLessonName(e.target.value)}
                placeholder="VD: Phép trừ trong phạm vi 10..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-xs font-medium"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Ghi Chú Hoạt Động Cụ Thể (Tùy chọn)</label>
            <input
              type="text"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="VD: Cần hoạt động chia nhóm 4 người, dùng bảng con hoặc động tác tay sôi nổi..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 text-xs font-medium"
            />
          </div>

          {/* Error display */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold">Chưa tạo được câu lệnh: </span>
                <span>{errorMsg}</span>
                {!hasApiKey && (
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={onOpenApiKeyModal}
                      className="underline font-bold text-rose-900 hover:text-rose-700"
                    >
                      Bấm vào đây để nhập API Key Google AI miễn phí
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit CTA */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500">
              * Tích hợp tự động Fallback model chống quá tải 503
            </div>

            <button
              type="submit"
              disabled={isLoading || !lessonName.trim()}
              className="px-6 py-3 rounded-2xl bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-black text-xs sm:text-sm transition-all shadow-md shadow-amber-500/30 flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{progressStatus || 'Đang soạn câu lệnh...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-yellow-200" />
                  <span>Soạn Bộ 4 Câu Lệnh Bằng AI</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Result Cards Display */}
      {generatedCommands && generatedCommands.length > 0 && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌻</span>
              <h3 className="text-base font-extrabold text-slate-900">
                Bộ Câu Lệnh Sư Phạm Cho Tiết: <span className="text-amber-700">"{lessonName}"</span>
              </h3>
            </div>
            {modelUsed && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Sinh bởi {modelUsed}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedCommands.map((cmd, idx) => {
              const fullSpeechText = `${cmd.teacherCall}. ${cmd.studentResponse}`;
              return (
                <div
                  key={cmd.id || idx}
                  className="bg-white rounded-3xl p-5 border-2 border-amber-200/80 hover:border-amber-400 transition-all shadow-xs hover:shadow-md space-y-3 relative flex flex-col justify-between"
                >
                  {/* Card Header: Stage badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-white shadow-2xs">
                      Giai đoạn: {cmd.activityStage}
                    </span>
                    <button
                      onClick={() => handleCopy(cmd.id, `${cmd.teacherCall} -> ${cmd.studentResponse} (${cmd.vietnameseTranslation})`)}
                      title="Sao chép câu lệnh"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      {copiedId === cmd.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Teacher Call */}
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                      Cô hô (Teacher Call):
                    </div>
                    <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                      "{cmd.teacherCall}"
                    </div>
                    {cmd.callIpa && (
                      <div className="text-xs font-mono text-amber-700 font-medium">
                        {cmd.callIpa}
                      </div>
                    )}
                  </div>

                  {/* Student Response */}
                  <div className="space-y-1 bg-amber-50/60 p-3 rounded-2xl border border-amber-100">
                    <div className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                      Trò đáp (Student Response):
                    </div>
                    <div className="text-sm font-extrabold text-slate-800">
                      "{cmd.studentResponse}"
                    </div>
                    <div className="text-xs text-slate-600 pt-1 border-t border-amber-200/40">
                      Nghĩa: {cmd.vietnameseTranslation}
                    </div>
                  </div>

                  {/* TPR Gesture Suggestion */}
                  <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-start gap-2">
                    <HandMetal className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Cử chỉ TPR: </span>
                      <span>{cmd.tprSuggestion}</span>
                    </div>
                  </div>

                  {/* Voice buttons */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handlePlayVoice(cmd.id, fullSpeechText, 1.0)}
                      className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${playingId === `${cmd.id}-1` ? 'animate-bounce text-amber-600' : ''}`} />
                      <span>Nghe mẫu 1.0x</span>
                    </button>
                    <button
                      onClick={() => handlePlayVoice(cmd.id, fullSpeechText, 0.7)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                    >
                      <span>0.7x (Chậm)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
