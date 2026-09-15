// Vocabdaily.lklschool — 4 nhóm câu chính xác theo DOCX/ảnh
import { VocabCategory } from '../types';

export interface VocabPhrase {
  id: string;
  phrase: string;
  response?: string;        // Student response or alternate
  emoji?: string;            // Visual icon
  vocabCategory: VocabCategory;
  subGroup?: string;         // e.g. "Greetings" / "Startings" / "Teacher ↔ Students"
  order: number;
}

// ═══════════════════════════════════════════════
// 1. 🌅 GREETING & STARTING
// ═══════════════════════════════════════════════

const GREETINGS: VocabPhrase[] = [
  { id: 'gs-01', phrase: 'Hi/Hello (Ms..., Mr..., teacher, class, everyone)', emoji: '👋', vocabCategory: 'Greeting & Starting', subGroup: 'Greetings', order: 1 },
  { id: 'gs-02', phrase: 'Good morning.', emoji: '🌅', vocabCategory: 'Greeting & Starting', subGroup: 'Greetings', order: 2 },
  { id: 'gs-03', phrase: 'Good afternoon.', emoji: '☀️', vocabCategory: 'Greeting & Starting', subGroup: 'Greetings', order: 3 },
  { id: 'gs-04', phrase: 'Good evening.', emoji: '🌙', vocabCategory: 'Greeting & Starting', subGroup: 'Greetings', order: 4 },
  { id: 'gs-05', phrase: 'How are you today?', response: "I'm fine / good / ok / wonderful / happy (positive)", emoji: '😊', vocabCategory: 'Greeting & Starting', subGroup: 'Greetings', order: 5 },
  { id: 'gs-06', phrase: "I'm not good / tired / hungry... (negative)", emoji: '😔', vocabCategory: 'Greeting & Starting', subGroup: 'Greetings', order: 6 },
  { id: 'gs-07', phrase: 'Nice to meet/see you.', emoji: '🤝', vocabCategory: 'Greeting & Starting', subGroup: 'Greetings', order: 7 },
  { id: 'gs-08', phrase: 'Nice to meet/see you, too.', emoji: '🤝', vocabCategory: 'Greeting & Starting', subGroup: 'Greetings', order: 8 },
];

const STARTINGS: VocabPhrase[] = [
  { id: 'gs-09', phrase: 'Welcome to our lesson today.', emoji: '🎉', vocabCategory: 'Greeting & Starting', subGroup: 'Startings', order: 9 },
  { id: 'gs-10', phrase: 'Are you ready?', emoji: '💪', vocabCategory: 'Greeting & Starting', subGroup: 'Startings', order: 10 },
  { id: 'gs-11', phrase: "Let's get started.", emoji: '🚀', vocabCategory: 'Greeting & Starting', subGroup: 'Startings', order: 11 },
  { id: 'gs-12', phrase: "Let's start / begin with a question / game.", emoji: '🎯', vocabCategory: 'Greeting & Starting', subGroup: 'Startings', order: 12 },
  { id: 'gs-13', phrase: "Let's warm up before learning.", emoji: '🔥', vocabCategory: 'Greeting & Starting', subGroup: 'Startings', order: 13 },
];

// ═══════════════════════════════════════════════
// 2. 📚 CLASSROOM INSTRUCTIONS (16 câu)
// ═══════════════════════════════════════════════

const CLASSROOM_INSTRUCTIONS: VocabPhrase[] = [
  { id: 'ci-01', phrase: 'Line-up, please!', emoji: '🧑‍🤝‍🧑', vocabCategory: 'Classroom Instructions', order: 1 },
  { id: 'ci-02', phrase: 'Stand up, please!', emoji: '🧍', vocabCategory: 'Classroom Instructions', order: 2 },
  { id: 'ci-03', phrase: 'Sit down, please!', emoji: '🪑', vocabCategory: 'Classroom Instructions', order: 3 },
  { id: 'ci-04', phrase: 'Be quiet, please!', emoji: '🤫', vocabCategory: 'Classroom Instructions', order: 4 },
  { id: 'ci-05', phrase: 'Open your books, page 10.', emoji: '📖', vocabCategory: 'Classroom Instructions', order: 5 },
  { id: 'ci-06', phrase: 'Close your books!', emoji: '📕', vocabCategory: 'Classroom Instructions', order: 6 },
  { id: 'ci-07', phrase: 'Listen and repeat.', emoji: '👂', vocabCategory: 'Classroom Instructions', order: 7 },
  { id: 'ci-08', phrase: 'Look at the board.', emoji: '📋', vocabCategory: 'Classroom Instructions', order: 8 },
  { id: 'ci-09', phrase: 'Raise your hand!', emoji: '✋', vocabCategory: 'Classroom Instructions', order: 9 },
  { id: 'ci-10', phrase: 'Hands down!', emoji: '👇', vocabCategory: 'Classroom Instructions', order: 10 },
  { id: 'ci-11', phrase: 'Hands up!', emoji: '🙌', vocabCategory: 'Classroom Instructions', order: 11 },
  { id: 'ci-12', phrase: 'Write it down.', emoji: '✍️', vocabCategory: 'Classroom Instructions', order: 12 },
  { id: 'ci-13', phrase: 'Read aloud.', emoji: '🗣️', vocabCategory: 'Classroom Instructions', order: 13 },
  { id: 'ci-14', phrase: "Time's up.", emoji: '⏰', vocabCategory: 'Classroom Instructions', order: 14 },
  { id: 'ci-15', phrase: 'Line up.', emoji: '📏', vocabCategory: 'Classroom Instructions', order: 15 },
  { id: 'ci-16', phrase: "Let's count.", emoji: '🔢', vocabCategory: 'Classroom Instructions', order: 16 },
];

// ═══════════════════════════════════════════════
// 3. ⭐ PRAISE & ENCOURAGEMENT (12 câu)
// ═══════════════════════════════════════════════

const PRAISE_ENCOURAGEMENT: VocabPhrase[] = [
  { id: 'pe-01', phrase: 'Well done!', emoji: '👏', vocabCategory: 'Praise & Encouragement', order: 1 },
  { id: 'pe-02', phrase: 'Great job!', emoji: '🏆', vocabCategory: 'Praise & Encouragement', order: 2 },
  { id: 'pe-03', phrase: 'Excellent!', emoji: '🌟', vocabCategory: 'Praise & Encouragement', order: 3 },
  { id: 'pe-04', phrase: 'Wonderful!', emoji: '🌈', vocabCategory: 'Praise & Encouragement', order: 4 },
  { id: 'pe-05', phrase: "That's right!", emoji: '👍', vocabCategory: 'Praise & Encouragement', order: 5 },
  { id: 'pe-06', phrase: 'Fantastic!', emoji: '🚀', vocabCategory: 'Praise & Encouragement', order: 6 },
  { id: 'pe-07', phrase: 'Keep it up!', emoji: '💪', vocabCategory: 'Praise & Encouragement', order: 7 },
  { id: 'pe-08', phrase: 'You did it!', emoji: '🎉', vocabCategory: 'Praise & Encouragement', order: 8 },
  { id: 'pe-09', phrase: 'Good / Very good!', emoji: '😊', vocabCategory: 'Praise & Encouragement', order: 9 },
  { id: 'pe-10', phrase: 'Good boy!', emoji: '👦', vocabCategory: 'Praise & Encouragement', order: 10 },
  { id: 'pe-11', phrase: 'Good girl!', emoji: '👧', vocabCategory: 'Praise & Encouragement', order: 11 },
  { id: 'pe-12', phrase: 'Try again!', emoji: '🔄', vocabCategory: 'Praise & Encouragement', order: 12 },
];

// ═══════════════════════════════════════════════
// 4. 💬 DAILY COMMUNICATION
// ═══════════════════════════════════════════════

const DAILY_TEACHER_STUDENTS: VocabPhrase[] = [
  { id: 'dc-01', phrase: 'Do you understand?', emoji: '🤔', vocabCategory: 'Daily Communication', subGroup: 'Teacher ↔ Students', order: 1 },
  { id: 'dc-02', phrase: 'Can you repeat that?', emoji: '🔁', vocabCategory: 'Daily Communication', subGroup: 'Teacher ↔ Students', order: 2 },
  { id: 'dc-03', phrase: 'What does ... mean?', emoji: '❓', vocabCategory: 'Daily Communication', subGroup: 'Teacher ↔ Students', order: 3 },
  { id: 'dc-04', phrase: 'Can anyone help?', emoji: '🙋', vocabCategory: 'Daily Communication', subGroup: 'Teacher ↔ Students', order: 4 },
  { id: 'dc-05', phrase: 'Any questions?', emoji: '💭', vocabCategory: 'Daily Communication', subGroup: 'Teacher ↔ Students', order: 5 },
  { id: 'dc-06', phrase: 'What do you think?', emoji: '🧠', vocabCategory: 'Daily Communication', subGroup: 'Teacher ↔ Students', order: 6 },
  { id: 'dc-07', phrase: 'Can you say it in English?', emoji: '🇬🇧', vocabCategory: 'Daily Communication', subGroup: 'Teacher ↔ Students', order: 7 },
];

const DAILY_STUDENTS_STUDENTS: VocabPhrase[] = [
  { id: 'dc-08', phrase: 'Can I help you?', emoji: '🤝', vocabCategory: 'Daily Communication', subGroup: 'Students ↔ Students', order: 8 },
  { id: 'dc-09', phrase: "I don't understand.", emoji: '😕', vocabCategory: 'Daily Communication', subGroup: 'Students ↔ Students', order: 9 },
  { id: 'dc-10', phrase: 'Let me try.', emoji: '✨', vocabCategory: 'Daily Communication', subGroup: 'Students ↔ Students', order: 10 },
  { id: 'dc-11', phrase: 'I think...', emoji: '💡', vocabCategory: 'Daily Communication', subGroup: 'Students ↔ Students', order: 11 },
  { id: 'dc-12', phrase: 'I agree.', emoji: '✅', vocabCategory: 'Daily Communication', subGroup: 'Students ↔ Students', order: 12 },
  { id: 'dc-13', phrase: 'Your turn.', emoji: '👉', vocabCategory: 'Daily Communication', subGroup: 'Students ↔ Students', order: 13 },
  { id: 'dc-14', phrase: 'Thank you.', emoji: '🙏', vocabCategory: 'Daily Communication', subGroup: 'Students ↔ Students', order: 14 },
  { id: 'dc-15', phrase: "You're welcome.", emoji: '😊', vocabCategory: 'Daily Communication', subGroup: 'Students ↔ Students', order: 15 },
];

// ═══════════════════════════════════════════════
// ALL PHRASES combined
// ═══════════════════════════════════════════════

export const ALL_VOCAB_PHRASES: VocabPhrase[] = [
  ...GREETINGS,
  ...STARTINGS,
  ...CLASSROOM_INSTRUCTIONS,
  ...PRAISE_ENCOURAGEMENT,
  ...DAILY_TEACHER_STUDENTS,
  ...DAILY_STUDENTS_STUDENTS,
];

// Get phrases by category
export function getVocabPhrasesByCategory(category: VocabCategory): VocabPhrase[] {
  return ALL_VOCAB_PHRASES.filter(p => p.vocabCategory === category).sort((a, b) => a.order - b.order);
}

// Get subgroups within a category
export function getSubGroups(category: VocabCategory): string[] {
  const phrases = getVocabPhrasesByCategory(category);
  const groups = new Set(phrases.map(p => p.subGroup).filter(Boolean));
  return Array.from(groups) as string[];
}

// Category metadata for tabs
export const VOCAB_TAB_META = [
  {
    id: 'Greeting & Starting' as VocabCategory,
    icon: '🌅',
    label: 'Greeting & Starting',
    shortLabel: 'Greeting',
    color: '#FF6B35',
    bgGradient: 'from-orange-400 to-amber-400',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-300',
    headerBg: 'bg-gradient-to-r from-orange-500 to-amber-400',
    count: GREETINGS.length + STARTINGS.length,
  },
  {
    id: 'Classroom Instructions' as VocabCategory,
    icon: '📚',
    label: 'Classroom Instructions',
    shortLabel: 'Instructions',
    color: '#2563EB',
    bgGradient: 'from-blue-500 to-indigo-500',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-300',
    headerBg: 'bg-gradient-to-r from-blue-600 to-blue-400',
    count: CLASSROOM_INSTRUCTIONS.length,
  },
  {
    id: 'Praise & Encouragement' as VocabCategory,
    icon: '⭐',
    label: 'Praise & Encouragement',
    shortLabel: 'Praise',
    color: '#F59E0B',
    bgGradient: 'from-yellow-400 to-amber-500',
    bgLight: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    headerBg: 'bg-gradient-to-r from-yellow-500 to-amber-400',
    count: PRAISE_ENCOURAGEMENT.length,
  },
  {
    id: 'Daily Communication' as VocabCategory,
    icon: '💬',
    label: 'Daily Communication',
    shortLabel: 'Communication',
    color: '#8B5CF6',
    bgGradient: 'from-purple-500 to-violet-500',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-300',
    headerBg: 'bg-gradient-to-r from-purple-600 to-violet-400',
    count: DAILY_TEACHER_STUDENTS.length + DAILY_STUDENTS_STUDENTS.length,
  },
] as const;
