export type GradeLevel = 'All' | 'Lớp 1' | 'Lớp 2' | 'Lớp 3' | 'Lớp 4' | 'Lớp 5';

// 4 nhóm chính theo DOCX Vocabdaily.lklschool
export type VocabCategory = 
  | 'Greeting & Starting'
  | 'Classroom Instructions'
  | 'Praise & Encouragement'
  | 'Daily Communication';

export type CommandCategory = 
  | '10 Câu Lệnh Tháng'
  | 'Tiếng Anh Môn Toán'
  | 'Giao Tiếp Đồng Nghiệp'
  | 'Ổn định & Chú ý'
  | 'Chants vần điệu'
  | 'Khen thưởng & Sao vàng'
  | 'Chuyển tiết & Đồ dùng'
  | 'Trò chơi & Ghép nhóm'
  | 'Hỏi - Đáp';

export type PedagogicalTone = 
  | 'energetic' 
  | 'strict_gentle' 
  | 'calm_whisper' 
  | 'rhythm_chant';

export interface CommandItem {
  id: string;
  teacherCall: string;
  studentResponse: string;
  callIpa: string;
  responseIpa: string;
  vietnameseTranslation: string;
  context: string;
  gradeLevel: GradeLevel;
  category: CommandCategory;
  vocabCategory?: VocabCategory;
  isMonthlyRequired?: boolean;
  tprCue: {
    teacherAction: string;
    studentAction: string;
    iconTip: string;
  };
  toneRecommendation: PedagogicalTone;
  audioSampleNotes: string;
}

export interface TeacherProfile {
  name: string;
  school: string;
  title: string;
}

export interface UserProgress {
  streak: number;
  goldenSeeds: number;
  lastActiveDate: string; // YYYY-MM-DD
  masteredIds: string[];  // ids where score >= 85
  bookmarkedIds: string[];
  practiceScores: Record<string, number>;
  profile: TeacherProfile;
  unlockedBadgeIds: string[];
  quizCompleted: boolean;
  quizScore: number;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  requiredCondition: string;
  isUnlocked?: boolean;
}

export interface ScenarioOption {
  id: string;
  englishText: string;
  vietnameseText: string;
  rationale: string;
  isBest: boolean;
}

export interface ScenarioItem {
  id: string;
  title: string;
  grade: string;
  situation: string;
  options: ScenarioOption[];
  pedagogicalTip: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  situation: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  school: string;
  avatarColor: string;
  gradeTag: string;
  hashtags: string[];
  content: string;
  favoriteCommand: string;
  likes: number;
  hasLiked?: boolean;
  timestamp: string;
}

export type AiProvider = 'gemini' | 'agent-platform';

export interface GeneratedLessonCommand {
  id: string;
  activityStage: 'Khởi động' | 'Khám phá / Bài mới' | 'Luyện tập / Thực hành' | 'Vận dụng / Kết thúc';
  teacherCall: string;
  studentResponse: string;
  callIpa: string;
  vietnameseTranslation: string;
  tprSuggestion: string;
}

export interface LessonGeneratorForm {
  grade: GradeLevel;
  subject: string;
  lessonName: string;
  notes?: string;
}

export type SunflowerStage = 'seed' | 'sprout' | 'bud' | 'bloom' | 'golden';

export type HistoryEntryType = 'practice' | 'bookmark' | 'ai_generate' | 'scenario_custom' | 'mastered' | 'badge';

export interface LearningHistoryEntry {
  id: string;
  type: HistoryEntryType;
  timestamp: string; // ISO string
  title: string;
  details?: string;
}

