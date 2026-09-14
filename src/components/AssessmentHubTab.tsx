import React, { useState } from 'react';
import { 
  Award, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Flame, 
  Volume2, 
  HandMetal, 
  GraduationCap, 
  Sparkles,
  ShieldCheck,
  RefreshCw,
  QrCode
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress, BadgeItem } from '../types';
import { MINI_QUIZ_QUESTIONS } from '../data/quizData';
import { ALL_BADGES } from '../data/badgesData';

interface AssessmentHubTabProps {
  progress: UserProgress;
  onUpdateProfile: (name: string, school: string) => void;
  onUnlockBadge: (badgeId: string) => void;
  onCompleteQuiz: (score: number) => void;
}

const BADGE_ICONS: Record<string, React.ElementType> = {
  Sparkles,
  Award,
  HandMetal,
  Volume2,
  GraduationCap,
  Flame
};

export const AssessmentHubTab: React.FC<AssessmentHubTabProps> = ({
  progress,
  onUpdateProfile,
  onUnlockBadge,
  onCompleteQuiz
}) => {
  // Profile state for certificate
  const [teacherName, setTeacherName] = useState(progress.profile.name);
  const [teacherSchool, setTeacherSchool] = useState(progress.profile.school);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showQuestionExplanation, setShowQuestionExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(progress.quizCompleted);
  const [quizScore, setQuizScore] = useState(progress.quizScore);

  const currentQ = MINI_QUIZ_QUESTIONS[currentQIndex];

  // Save profile updates
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(teacherName, teacherSchool);
    setIsEditingProfile(false);
  };

  // Handle Quiz answer
  const handleAnswerSelect = (optionIndex: number) => {
    if (selectedAnswers[currentQIndex] !== undefined) return;
    const updated = { ...selectedAnswers, [currentQIndex]: optionIndex };
    setSelectedAnswers(updated);
    setShowQuestionExplanation(true);
  };

  const handleNextQuizQuestion = () => {
    setShowQuestionExplanation(false);
    if (currentQIndex < MINI_QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Calculate final score
      let score = 0;
      MINI_QUIZ_QUESTIONS.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          score++;
        }
      });
      setQuizScore(score);
      setQuizFinished(true);
      onCompleteQuiz(score);

      if (score === MINI_QUIZ_QUESTIONS.length) {
        onUnlockBadge('badge-5');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setShowQuestionExplanation(false);
    setQuizFinished(false);
  };

  // Handle Print Certificate
  const handlePrintCertificate = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const certNumber = `VN-K5-2026-${Math.abs(teacherName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000))}`;

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-16">
      {/* Header section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-3 no-print">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Professional Teacher Certification & Assessment</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Trung tâm đánh giá & chứng nhận sư phạm
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-3xl">
          Kiểm tra nhanh phản xạ điều hành lớp, nhận bộ huy hiệu nghiệp vụ và xuất chứng chỉ điện tử chuẩn quốc gia dành cho giáo viên tiểu học.
        </p>
      </div>

      {/* SECTION 1: MINI-QUIZ SƯ PHẠM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <span>1. Mini-Quiz sư phạm: khẩu lệnh & phản xạ lớp học</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              5 câu hỏi trắc nghiệm thực chiến về kỹ thuật Call & Response và phản xạ TPR
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Câu {currentQIndex + 1} / {MINI_QUIZ_QUESTIONS.length}
            </span>
            {quizFinished && (
              <button
                onClick={handleRetakeQuiz}
                className="text-xs font-bold text-slate-600 hover:text-blue-600 flex items-center gap-1 p-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>
            )}
          </div>
        </div>

        {!quizFinished ? (
          <div className="space-y-5">
            {/* Situation box */}
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-xs sm:text-sm text-blue-950 font-medium">
              <span className="font-bold text-blue-900">Tình huống: </span>
              <span>{currentQ.situation}</span>
            </div>

            {/* Question title */}
            <div className="text-sm sm:text-base font-bold text-slate-900">
              {currentQ.question}
            </div>

            {/* 4 Options */}
            <div className="grid grid-cols-1 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQIndex] === idx;
                const isAnswered = selectedAnswers[currentQIndex] !== undefined;
                const isCorrect = idx === currentQ.correctIndex;

                let optStyle = 'border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300';
                if (isAnswered) {
                  if (isCorrect) {
                    optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrect) {
                    optStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                  } else {
                    optStyle = 'border-slate-200 bg-slate-50 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={isAnswered}
                    className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm flex items-center gap-3 transition-all ${optStyle}`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div className="flex-1">{opt}</div>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {showQuestionExplanation && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Giải thích chuyên môn:</span>
                </div>
                <p className="leading-relaxed">{currentQ.explanation}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuizQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-xs"
                  >
                    {currentQIndex < MINI_QUIZ_QUESTIONS.length - 1 ? 'Câu hỏi kế tiếp ➔' : 'Hoàn thành bài kiểm tra'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results Summary */
          <div className="bg-slate-50 rounded-2xl p-6 text-center space-y-4 border border-slate-200">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">
                Chúc mừng Thầy/Cô đã hoàn thành bài kiểm tra!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Điểm số đạt được: <strong className="text-blue-700 text-base">{quizScore} / {MINI_QUIZ_QUESTIONS.length} câu đúng</strong>
              </p>
            </div>

            <div className="text-xs text-slate-600 max-w-md mx-auto">
              {quizScore >= 4 
                ? 'Thầy/Cô đã nắm vững lý thuyết phản xạ và phương pháp TPR điều hành lớp học tiểu học xuất sắc!' 
                : 'Thầy/Cô hãy xem lại các gợi ý sư phạm và luyện tập thêm trong Thư viện khẩu lệnh nhé!'}
            </div>

            <button
              onClick={handleRetakeQuiz}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              Làm lại bài kiểm tra
            </button>
          </div>
        )}
      </div>

      {/* SECTION 2: DIGITAL CERTIFICATE PREVIEW & PRINT */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-600" />
              <span>2. Cấp chứng chỉ số nghiệp vụ sư phạm (Digital Certificate)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Chứng chỉ A4 ngang trang trọng, chuẩn sư phạm, có thể in màu hoặc lưu dạng PDF chất lượng cao
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditingProfile(prev => !prev)}
              className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
            >
              {isEditingProfile ? 'Đóng chỉnh sửa' : 'Đổi thông tin'}
            </button>

            <button
              onClick={handlePrintCertificate}
              id="btn-print-certificate"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>In / Lưu PDF (A4 Ngang)</span>
            </button>
          </div>
        </div>

        {/* Profile Edit Form if toggled */}
        {isEditingProfile && (
          <form onSubmit={handleSaveProfile} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 no-print">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ và tên Giáo viên:
                </label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  placeholder="Ví dụ: Cô Nguyễn Thu Hà"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Đơn vị công tác (Trường Tiểu học):
                </label>
                <input
                  type="text"
                  value={teacherSchool}
                  onChange={(e) => setTeacherSchool(e.target.value)}
                  placeholder="Ví dụ: Trường Tiểu học Chu Văn An"
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-2xs"
              >
                Cập nhật chứng chỉ
              </button>
            </div>
          </form>
        )}

        {/* A4 LANDSCAPE CERTIFICATE FRAME */}
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-slate-200/80 shadow-lg overflow-x-auto">
          <div 
            id="certificate-printable-card"
            className="w-full min-w-[760px] max-w-[940px] mx-auto bg-amber-50/30 border-[10px] border-double border-amber-800/60 p-8 sm:p-10 rounded-xl relative shadow-inner"
            style={{ minHeight: '520px' }}
          >
            {/* Corner Decorative Floral Flourishes */}
            <div className="absolute top-2 left-2 text-amber-700 text-2xl select-none">⚜</div>
            <div className="absolute top-2 right-2 text-amber-700 text-2xl select-none">⚜</div>
            <div className="absolute bottom-2 left-2 text-amber-700 text-2xl select-none">⚜</div>
            <div className="absolute bottom-2 right-2 text-amber-700 text-2xl select-none">⚜</div>

            {/* Inner Border */}
            <div className="border border-amber-600/40 p-6 rounded-lg text-center space-y-4 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="space-y-1">
                <div className="text-[10px] tracking-[0.25em] font-bold text-amber-900 uppercase font-sans">
                  Trường Tiểu Học Lê Kim Lăng • Đề Án Môi Trường Ngôn Ngữ Tiếng Anh 2025–2035
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-950 uppercase tracking-wider font-serif-cert">
                  Chứng Nhận Nghiệp Vụ Sư Phạm
                </div>
                <div className="text-xs italic text-amber-800 font-serif-body">
                  Certificate of Primary Classroom English Proficiency & Sunflower TPR Mastery
                </div>
                <div className="w-28 h-0.5 bg-amber-500 mx-auto mt-2" />
              </div>

              {/* Body Presentation */}
              <div className="space-y-2 py-2">
                <div className="text-xs text-slate-600 italic font-serif-body">Chứng nhận danh dự trao tặng cho Thầy/Cô:</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-900 tracking-wide font-serif-cert">
                  {teacherName || 'Cô Lê Thị Thu Hương'}
                </div>
                <div className="text-sm font-semibold text-slate-700 font-sans">
                  {teacherSchool || 'Trường Tiểu học Lê Kim Lăng'}
                </div>

                <p className="text-xs font-sans text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
                  Đã hoàn thành xuất sắc chương trình bồi dưỡng <strong>Khẩu Lệnh Tiếng Anh Sư Phạm Tiểu Học (Classroom English K-5 & Môn Toán)</strong>, làm chủ các khẩu lệnh điều hành lớp học, thuần thục kỹ năng phản xạ cử chỉ hình thể <strong>TPR</strong> và lan tỏa tinh thần <em>"Shine Together, Speak Together — Như Hoa Hướng Dương Vươn Tới Ánh Mặt Trời Tiếng Anh"</em>.
                </p>
              </div>

              {/* Signatures & Seal */}
              <div className="grid grid-cols-3 items-end pt-4 border-t border-amber-300/80 font-sans text-xs">
                {/* Left: Code & Date */}
                <div className="text-left space-y-1">
                  <div className="text-[10px] text-slate-500">Mã chứng nhận điện tử:</div>
                  <div className="font-mono font-bold text-amber-900 text-xs">{certNumber}</div>
                  <div className="text-[11px] text-slate-600">Ngày cấp: {currentDate}</div>
                  <div className="text-[10px] text-emerald-700 font-bold">✓ Xác thực chuẩn mực sư phạm</div>
                </div>

                {/* Center: Gold Verification Seal */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-4 border-amber-500/80 bg-linear-to-br from-amber-400 via-amber-500 to-yellow-600 text-white flex flex-col items-center justify-center shadow-md p-1">
                    <span className="text-lg">🌻</span>
                    <span className="text-[8px] font-black uppercase text-center leading-tight mt-0.5">
                      TH Lê Kim Lăng<br/>Sunflower 2026
                    </span>
                  </div>
                  <span className="text-[9px] text-amber-900 font-bold uppercase mt-1 font-sans">Dấu Ấn Mrs. Huong</span>
                </div>

                {/* Right: Signature */}
                <div className="text-right space-y-1">
                  <div className="text-[11px] text-slate-600">Ngày {currentDate}</div>
                  <div className="text-xs font-bold text-slate-900">Giáo Viên Phụ Trách Đề Án</div>
                  <div className="italic text-amber-900 text-sm pt-2 font-serif-cert">Cô Lê Thị Thu Hương</div>
                  <div className="text-[10px] text-slate-500 font-sans">Trường Tiểu học Lê Kim Lăng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: VÍ HUY HIỆU (BADGES) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6 no-print">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>3. Ví huy hiệu nghiệp vụ (Badges Collection)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mở khóa các cột mốc kỹ năng trong suốt quá trình tham gia câu lạc bộ
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_BADGES.map(badge => {
            const Icon = BADGE_ICONS[badge.iconName] || Award;
            const isUnlocked = progress.unlockedBadgeIds.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'border-amber-200 bg-amber-50/40 shadow-xs'
                    : 'border-slate-200 bg-slate-50/60 opacity-70'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-400 text-blue-950 shadow-md shadow-amber-400/20'
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {badge.title}
                      </h4>
                      {isUnlocked ? (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                          Đã đạt
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded-md">
                          Chưa mở
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      {badge.description}
                    </p>
                    <div className="text-[11px] text-slate-400 italic pt-0.5">
                      Điều kiện: {badge.requiredCondition}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
