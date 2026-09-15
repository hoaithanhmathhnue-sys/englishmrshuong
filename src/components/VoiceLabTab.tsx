import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  RefreshCw, 
  Smile, 
  Zap, 
  ShieldAlert, 
  Music, 
  HeartHandshake,
  HelpCircle,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  CommandItem, 
  PedagogicalTone, 
  UserProgress, 
  ScenarioItem 
} from '../types';
import { 
  speakText, 
  stopSpeaking, 
  createSpeechRecognizer, 
  analyzeSpeechAccuracy, 
  SpeechAnalysisResult 
} from '../utils/speech';
import { CLASSROOM_SCENARIOS } from '../data/scenariosData';

interface VoiceLabTabProps {
  commands: CommandItem[];
  initialCommandId?: string | null;
  progress: UserProgress;
  onRecordScore: (commandId: string, score: number) => void;
}

const TONES: {
  id: PedagogicalTone;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  badgeColor: string;
  borderActive: string;
}[] = [
  {
    id: 'energetic',
    label: 'Vui Tươi & Hào Hứng',
    sublabel: 'Khởi động, chơi game, thi đua sao vàng',
    icon: Zap,
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    borderActive: 'border-amber-400 bg-amber-50/70'
  },
  {
    id: 'strict_gentle',
    label: 'Nghiêm Túc & Dịu Dàng',
    sublabel: 'Ổn định trật tự, kỷ luật tích cực',
    icon: ShieldAlert,
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    borderActive: 'border-blue-500 bg-blue-50/70'
  },
  {
    id: 'calm_whisper',
    label: 'Thì Thầm & Xoa Dịu',
    sublabel: 'Hạ nhiệt tiếng ồn, dỗ dành học sinh',
    icon: HeartHandshake,
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    borderActive: 'border-emerald-500 bg-emerald-50/70'
  },
  {
    id: 'rhythm_chant',
    label: 'Vần Điệu Nhịp Nhàng',
    sublabel: 'Đồng dao, bài vè hô đáp vui nhộn',
    icon: Music,
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    borderActive: 'border-purple-500 bg-purple-50/70'
  }
];

export const VoiceLabTab: React.FC<VoiceLabTabProps> = ({
  commands,
  initialCommandId,
  progress,
  onRecordScore
}) => {
  // 1. Voice Practice State
  const [selectedCommandId, setSelectedCommandId] = useState<string>(
    initialCommandId || (commands[0]?.id ?? 'cmd-01')
  );
  const [selectedTone, setSelectedTone] = useState<PedagogicalTone>('energetic');
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [analysisResult, setAnalysisResult] = useState<SpeechAnalysisResult | null>(null);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [isPlayingModel, setIsPlayingModel] = useState(false);

  // 2. Scenario Quiz State
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [scenarioAnswered, setScenarioAnswered] = useState(false);

  const recognizerRef = useRef<ReturnType<typeof createSpeechRecognizer> | null>(null);

  // Current active command
  const currentCommand = commands.find(c => c.id === selectedCommandId) || commands[0];
  const currentScenario: ScenarioItem = CLASSROOM_SCENARIOS[scenarioIndex] || CLASSROOM_SCENARIOS[0];

  // If initialCommandId changes from external props, update
  useEffect(() => {
    if (initialCommandId) {
      setSelectedCommandId(initialCommandId);
    }
  }, [initialCommandId]);

  // Set tone when command changes
  useEffect(() => {
    if (currentCommand) {
      setSelectedTone(currentCommand.toneRecommendation);
      setAnalysisResult(null);
      setSpokenTranscript('');
      setRecognitionError(null);
    }
  }, [selectedCommandId, currentCommand]);

  // Check speech recognition support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasRec = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
      setIsSpeechSupported(Boolean(hasRec));
    }
  }, []);

  // Handle Model Voice Sample
  const handlePlayModelAudio = (rate: number = 1.0) => {
    stopSpeaking();
    setIsPlayingModel(true);
    speakText(currentCommand.teacherCall, {
      rate,
      tone: selectedTone,
      onEnd: () => setIsPlayingModel(false)
    });
  };

  // Start Voice AI Recording
  const handleStartRecording = () => {
    setRecognitionError(null);
    setSpokenTranscript('');
    setAnalysisResult(null);
    stopSpeaking();

    const recognizer = createSpeechRecognizer();
    if (!recognizer) {
      setRecognitionError('Trình duyệt hiện tại không hỗ trợ Web Speech Recognition hoặc quyền Microphone bị từ chối.');
      return;
    }

    recognizerRef.current = recognizer;

    recognizer.onstart = () => {
      setIsRecording(true);
    };

    recognizer.onresult = (event: unknown) => {
      const ev = event as {
        results: {
          [index: number]: {
            [index: number]: {
              transcript: string;
            };
          };
        };
      };
      if (ev.results && ev.results[0] && ev.results[0][0]) {
        const transcript = ev.results[0][0].transcript;
        setSpokenTranscript(transcript);
      }
    };

    recognizer.onerror = (event: unknown) => {
      const ev = event as { error?: string };
      console.warn('Speech recognition error event:', ev);
      setIsRecording(false);
      if (ev.error === 'not-allowed') {
        setRecognitionError('Vui lòng cấp quyền Microphone trong trình duyệt để luyện nói.');
      } else if (ev.error === 'no-speech') {
        setRecognitionError('Chưa nhận được âm thanh nói. Thầy/Cô hãy nói to hơn vào micro.');
      } else {
        setRecognitionError(`Lỗi thu âm (${ev.error || 'không xác định'}). Bạn có thể thử lại.`);
      }
    };

    recognizer.onend = () => {
      setIsRecording(false);
    };

    try {
      recognizer.start();
    } catch (err) {
      console.error('Error starting recognition:', err);
      setIsRecording(false);
      setRecognitionError('Không thể khởi động microphone. Hãy kiểm tra cài đặt trình duyệt.');
    }
  };

  // Stop recording manually & evaluate
  const handleStopRecording = () => {
    if (recognizerRef.current && isRecording) {
      try {
        recognizerRef.current.stop();
      } catch (err) {
        console.error(err);
      }
    }
    setIsRecording(false);
  };

  // When speech transcript completes, analyze score
  useEffect(() => {
    if (!isRecording && spokenTranscript) {
      const result = analyzeSpeechAccuracy(spokenTranscript, currentCommand.teacherCall);
      setAnalysisResult(result);
      onRecordScore(currentCommand.id, result.accuracyScore);

      if (result.accuracyScore >= 85) {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.7 },
          decay: 0.92,
          ticks: 80,
          scalar: 0.8,
          gravity: 1.2,
          disableForReducedMotion: true
        });
      }
    }
  }, [isRecording, spokenTranscript, currentCommand.teacherCall, currentCommand.id, onRecordScore]);

  // Simulated Voice Test for preview / offline demonstration when mic is blocked
  const handleSimulateSpeech = (customSentence?: string) => {
    const textToSimulate = customSentence || currentCommand.teacherCall;
    setSpokenTranscript(textToSimulate);
    const result = analyzeSpeechAccuracy(textToSimulate, currentCommand.teacherCall);
    setAnalysisResult(result);
    onRecordScore(currentCommand.id, result.accuracyScore);
    if (result.accuracyScore >= 85) {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 },
        decay: 0.92,
        ticks: 80,
        scalar: 0.8,
        gravity: 1.2,
        disableForReducedMotion: true
      });
    }
  };

  // Scenario Quiz Handlers
  const handleSelectScenarioOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    setScenarioAnswered(true);
    const chosen = currentScenario.options.find(o => o.id === optionId);
    if (chosen?.isBest) {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.8 },
        decay: 0.92,
        ticks: 60,
        scalar: 0.7,
        gravity: 1.2,
        disableForReducedMotion: true
      });
    }
  };

  const handleNextScenario = () => {
    setSelectedOptionId(null);
    setScenarioAnswered(false);
    setScenarioIndex((prev) => (prev + 1) % CLASSROOM_SCENARIOS.length);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* Top Section Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Interactive Pedagogical Voice Lab • Trợ lý AI</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Phòng luyện tương tác Voice AI sư phạm
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-3xl leading-relaxed">
          Hệ thống nhận diện giọng nói Web Speech AI so khớp thời gian thực, đánh giá độ chuẩn xác và phản hồi bằng lời động viên sư phạm ấm áp, giúp thầy cô tự tin làm chủ 4 sắc thái biểu cảm sư phạm tiểu học.
        </p>

        {/* Mobile Technical Notice (Table 6) */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
          <span className="text-base shrink-0">📱</span>
          <div className="space-y-0.5">
            <span className="font-extrabold text-amber-900">Lưu ý kỹ thuật quan trọng khi dùng điện thoại: </span>
            <span className="text-slate-700">
              Nếu thầy cô nhận link qua Zalo hoặc Facebook, hãy bấm vào dấu 3 chấm góc trên bên phải màn hình và chọn <strong>"Mở bằng trình duyệt" (Chrome / Safari)</strong> để trình duyệt cấp quyền Micro toàn diện cho tính năng thu âm và nhận diện Voice AI.
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: VOICE TONE PRACTICE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <Mic className="w-5 h-5 text-blue-600" />
              <span>1. Luyện giọng & 4 sắc thái biểu cảm sư phạm</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Chọn câu khẩu lệnh và lựa chọn âm hưởng giọng nói phù hợp với hoàn cảnh lớp học
            </p>
          </div>

          {/* Command Dropdown Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 shrink-0">Chọn khẩu lệnh:</span>
            <select
              value={selectedCommandId}
              onChange={(e) => setSelectedCommandId(e.target.value)}
              id="voice-command-select"
              className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 max-w-[260px] truncate"
            >
              {commands.map((cmd) => (
                <option key={cmd.id} value={cmd.id}>
                  {cmd.gradeLevel} - {cmd.teacherCall}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Command Card Display */}
        <div className="rounded-2xl bg-slate-50/80 border border-slate-200/80 p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-blue-100 text-blue-800">
                {currentCommand.gradeLevel}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-white border border-slate-200 text-slate-700">
                {currentCommand.category}
              </span>
            </div>
            <div className="text-xs text-slate-500">
              Điểm rèn luyện cao nhất: {' '}
              <strong className="text-blue-700">
                {progress.practiceScores[currentCommand.id] ? `${progress.practiceScores[currentCommand.id]}%` : 'Chưa thử'}
              </strong>
            </div>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-black text-blue-950">
              "{currentCommand.teacherCall}"
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-500 mt-0.5">
              {currentCommand.callIpa}
            </div>
          </div>

          <div className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/70">
            <span className="font-bold text-slate-800">Cử chỉ hình thể (TPR): </span>
            <span>{currentCommand.tprCue.teacherAction}</span>
          </div>
        </div>

        {/* 4 Pedagogical Tones Selection */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
            <span>Chọn 1 trong 4 sắc thái biểu cảm sư phạm:</span>
            <span className="text-blue-600 font-semibold normal-case">
              Gợi ý tối ưu cho câu này: <strong>{currentCommand.toneRecommendation}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {TONES.map(tone => {
              const Icon = tone.icon;
              const isSelected = selectedTone === tone.id;
              return (
                <button
                  key={tone.id}
                  onClick={() => setSelectedTone(tone.id)}
                  id={`tone-btn-${tone.id}`}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? `${tone.borderActive} shadow-xs ring-2 ring-blue-400/30`
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white shadow-2xs' : 'bg-slate-100'}`}>
                      <Icon className="w-4 h-4 text-slate-700" />
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        Đang chọn
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {tone.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {tone.sublabel}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Listen Model & Recording Controls */}
        <div className="rounded-2xl border border-slate-200 bg-linear-to-r from-blue-50/50 via-slate-50 to-indigo-50/40 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Model Voice Button */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handlePlayModelAudio(1.0)}
                disabled={isPlayingModel}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-2xs w-full sm:w-auto disabled:opacity-50"
              >
                <Play className={`w-4 h-4 text-blue-600 ${isPlayingModel ? 'animate-spin' : ''}`} />
                <span>Nghe giọng mẫu ({selectedTone})</span>
              </button>

              <button
                onClick={() => handlePlayModelAudio(0.7)}
                disabled={isPlayingModel}
                className="px-3 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold transition-all disabled:opacity-50"
                title="Nghe mẫu chậm 0.7x"
              >
                0.7x
              </button>
            </div>

            {/* Mic Record Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  id="btn-voice-record-start"
                  className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 transition-all hover:scale-102 active:scale-98 w-full sm:w-auto"
                >
                  <Mic className="w-5 h-5 text-amber-300" />
                  <span>Bấm micro để thu âm</span>
                </button>
              ) : (
                <button
                  onClick={handleStopRecording}
                  id="btn-voice-record-stop"
                  className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-rose-600/30 transition-all animate-pulse w-full sm:w-auto"
                >
                  <MicOff className="w-5 h-5 text-white" />
                  <span>Đang thu âm... (bấm để dừng)</span>
                </button>
              )}
            </div>
          </div>

          {/* Live Recording Animation */}
          {isRecording && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-center justify-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
              <span className="text-xs font-bold text-rose-800">
                Hệ thống đang lắng nghe... Thầy/Cô hãy đọc to: "{currentCommand.teacherCall}"
              </span>
            </div>
          )}

          {/* Recognition Error Warning */}
          {recognitionError && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div>{recognitionError}</div>
                <div className="mt-1 text-[11px] text-amber-800 flex items-center gap-2">
                  <span>Hoặc bấm để thử nghiệm phát âm chuẩn mẫu:</span>
                  <button
                    onClick={() => handleSimulateSpeech()}
                    className="underline font-bold text-blue-700 hover:text-blue-900"
                  >
                    Chấm điểm phát âm mẫu
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Evaluation Results Card */}
          {analysisResult && (
            <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-sm space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm ${
                    analysisResult.accuracyScore >= 85 
                      ? 'bg-emerald-500' 
                      : analysisResult.accuracyScore >= 60 
                      ? 'bg-amber-500' 
                      : 'bg-rose-500'
                  }`}>
                    {analysisResult.accuracyScore}%
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Điểm Độ Chính Xác Phát Âm (Accuracy Score)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {analysisResult.accuracyScore >= 85 ? 'Đạt chuẩn sư phạm xuất sắc' : 'Cần rèn luyện thêm'}
                    </div>
                  </div>
                </div>

                {analysisResult.accuracyScore >= 85 && (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1 self-start sm:self-auto">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Đã Thuần Thục Khẩu Lệnh!
                  </span>
                )}
              </div>

              {/* Word-by-word diff matching */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase">
                  So khớp từng từ ngữ (Word Alignment):
                </div>
                <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm font-semibold">
                  {analysisResult.wordsDiff.map((item, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-1 rounded-lg border text-xs sm:text-sm font-bold ${
                        item.status === 'correct'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-rose-100 text-rose-800 border-rose-300 line-through'
                      }`}
                    >
                      {item.word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Spoken Text Recorded */}
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-700">Giọng nói ghi nhận: </span>
                <span className="italic">"{analysisResult.spokenText || 'Chưa nhận diện rõ'}"</span>
              </div>

              {/* Pedagogical Warm Encouragement (Table 3) */}
              {analysisResult.pedagogicalEncouragement && (
                <div className="p-4 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-amber-900 shadow-2xs flex items-start gap-3">
                  <span className="text-2xl shrink-0">{analysisResult.pedagogicalEncouragement.icon || '🌻'}</span>
                  <div className="space-y-0.5 flex-1">
                    <div className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                      <span>Lời động viên sư phạm:</span>
                      <span className="text-amber-800">"{analysisResult.pedagogicalEncouragement.english}"</span>
                    </div>
                    <div className="text-xs text-amber-800 font-semibold">
                      👉 {analysisResult.pedagogicalEncouragement.vietnamese}
                    </div>
                  </div>
                </div>
              )}

              {/* Pedagogical Feedback & Tone Tip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-950">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Nhận xét sư phạm khích lệ:</span>
                  </div>
                  <p className="leading-relaxed">{analysisResult.pedagogicalFeedback}</p>
                </div>

                <div className="p-3 rounded-xl bg-yellow-50/70 border border-yellow-200/80 text-yellow-950">
                  <div className="font-bold flex items-center gap-1.5 text-yellow-900 mb-1">
                    <Sparkles className="w-4 h-4 text-yellow-600" />
                    <span>Mẹo nhấn nhá ngữ điệu cho trẻ:</span>
                  </div>
                  <p className="leading-relaxed">{analysisResult.intonationTip}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: CLASSROOM SCENARIO QUIZ */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <span>2. Tình huống sư phạm thực tế (Classroom Scenario Quiz)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Rèn luyện tư duy phản xạ tiếng Anh tích cực trong các tình huống thực tế tại lớp học tiểu học
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <span>Tình huống {scenarioIndex + 1} / {CLASSROOM_SCENARIOS.length}</span>
            <button
              onClick={handleNextScenario}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-blue-600 flex items-center gap-1"
              title="Chuyển tình huống tiếp theo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Đổi câu</span>
            </button>
          </div>
        </div>

        {/* Situation Description Box */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wide">
              {currentScenario.grade} • Tình huống thực tế:
            </span>
            <span className="text-xs font-bold text-amber-800 bg-amber-200/70 px-2.5 py-0.5 rounded-md">
              {currentScenario.title}
            </span>
          </div>
          <p className="text-sm font-medium text-amber-950 leading-relaxed">
            "{currentScenario.situation}"
          </p>
        </div>

        {/* 3 Options */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Thầy/Cô sẽ chọn cách xử lý bằng tiếng Anh nào dưới đây?
          </div>

          <div className="space-y-3">
            {currentScenario.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              let btnStyle = 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300';

              if (scenarioAnswered) {
                if (option.isBest) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-300';
                } else if (isSelected && !option.isBest) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 opacity-60';
                }
              }

              return (
                <div key={option.id} className="space-y-2">
                  <button
                    onClick={() => handleSelectScenarioOption(option.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all ${btnStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="text-sm font-bold text-slate-900">
                          "{option.englishText}"
                        </div>
                        <div className="text-xs text-slate-500">
                          {option.vietnameseText}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Rationale explanation if answered */}
                  {scenarioAnswered && (isSelected || option.isBest) && (
                    <div className={`p-3 rounded-xl text-xs space-y-1 ${
                      option.isBest
                        ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                        : 'bg-rose-50 border border-rose-200 text-rose-900'
                    }`}>
                      <div className="font-bold flex items-center gap-1">
                        {option.isBest ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Phương án tối ưu sư phạm:</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            <span>Chưa phù hợp sư phạm tiểu học:</span>
                          </>
                        )}
                      </div>
                      <p>{option.rationale}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Pedagogical Rationale Tip & Next Button */}
        {scenarioAnswered && (
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs text-blue-950 space-y-0.5">
              <span className="font-bold text-blue-900">Lời khuyên chuyên môn: </span>
              <span>{currentScenario.pedagogicalTip}</span>
            </div>

            <button
              onClick={handleNextScenario}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <span>Tình huống tiếp theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
