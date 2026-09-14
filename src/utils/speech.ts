/**
 * Speech Synthesis (TTS) & Speech Recognition (Voice AI)
 * Fully native browser Web Speech API implementation
 */
import { VOICE_PRACTICE_ENCOURAGEMENTS, EXCELLENT_VOICE_FEEDBACK } from '../data/sunflowerFeedbackData';

export interface SpeechAnalysisResult {
  spokenText: string;
  targetText: string;
  accuracyScore: number; // 0 to 100
  wordsDiff: {
    word: string;
    status: 'correct' | 'missing' | 'incorrect';
  }[];
  pedagogicalFeedback: string;
  intonationTip: string;
  mrsHuongEncouragement: {
    english: string;
    vietnamese: string;
    icon: string;
  };
}

// Find preferred English voice
function getPreferredEnVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  // Prefer natural US English voices
  const usVoices = voices.filter(v => v.lang === 'en-US' || v.lang.startsWith('en'));
  const naturalVoice = usVoices.find(v => 
    v.name.includes('Google') || 
    v.name.includes('Natural') || 
    v.name.includes('Samantha') || 
    v.name.includes('Jenny') ||
    v.name.includes('US English')
  );
  return naturalVoice || usVoices[0] || voices[0] || null;
}

/**
 * Speak text with Web Speech API
 */
export function speakText(
  text: string, 
  options: {
    rate?: number; // 1.0 or 0.7
    pitch?: number; // 0.8 - 1.3
    tone?: 'energetic' | 'strict_gentle' | 'calm_whisper' | 'rhythm_chant' | 'standard';
    onStart?: () => void;
    onEnd?: () => void;
  } = {}
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    console.warn('Speech synthesis not supported in this environment');
    options.onEnd?.();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';

  // Apply tone modifications
  let rate = options.rate ?? 1.0;
  let pitch = options.pitch ?? 1.0;

  if (options.tone === 'energetic') {
    rate = Math.max(rate, 1.08);
    pitch = 1.25;
  } else if (options.tone === 'strict_gentle') {
    rate = 0.92;
    pitch = 0.98;
  } else if (options.tone === 'calm_whisper') {
    rate = 0.82;
    pitch = 0.9;
  } else if (options.tone === 'rhythm_chant') {
    rate = 0.95;
    pitch = 1.15;
  }

  utterance.rate = rate;
  utterance.pitch = pitch;

  const voice = getPreferredEnVoice();
  if (voice) {
    utterance.voice = voice;
  }

  if (options.onStart) utterance.onstart = options.onStart;
  if (options.onEnd) {
    utterance.onend = options.onEnd;
    utterance.onerror = () => options.onEnd?.();
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

// Clean and normalize strings for robust comparison
function cleanString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'!’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Compare spoken transcript with target command
 */
export function analyzeSpeechAccuracy(spoken: string, target: string): SpeechAnalysisResult {
  const normSpoken = cleanString(spoken);
  const normTarget = cleanString(target);

  const spokenWords = normSpoken ? normSpoken.split(' ') : [];
  const targetWords = normTarget ? normTarget.split(' ') : [];

  if (targetWords.length === 0) {
    return {
      spokenText: spoken,
      targetText: target,
      accuracyScore: 100,
      wordsDiff: [],
      pedagogicalFeedback: 'Tuyệt vời!',
      intonationTip: 'Giữ vững phản xạ khẩu lệnh tự nhiên.',
      mrsHuongEncouragement: EXCELLENT_VOICE_FEEDBACK[0]
    };
  }

  let matchedCount = 0;
  const spokenPool = [...spokenWords];

  const wordsDiff: SpeechAnalysisResult['wordsDiff'] = targetWords.map(tWord => {
    // Exact match
    const exactIdx = spokenPool.findIndex(sWord => sWord === tWord);
    if (exactIdx !== -1) {
      matchedCount++;
      spokenPool.splice(exactIdx, 1);
      return { word: tWord, status: 'correct' as const };
    }

    // Near match (Levenshtein distance <= 1 for short words, <= 2 for longer words)
    const nearIdx = spokenPool.findIndex(sWord => {
      const dist = levenshtein(sWord, tWord);
      return (tWord.length <= 4 && dist <= 1) || (tWord.length > 4 && dist <= 2);
    });

    if (nearIdx !== -1) {
      matchedCount += 0.85;
      spokenPool.splice(nearIdx, 1);
      return { word: tWord, status: 'correct' as const };
    }

    return { word: tWord, status: 'missing' as const };
  });

  // Calculate score percentage
  const rawScore = (matchedCount / targetWords.length) * 100;
  const accuracyScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  // Generate teacher-friendly pedagogical feedback
  let pedagogicalFeedback = '';
  let intonationTip = '';
  let mrsHuongEncouragement = VOICE_PRACTICE_ENCOURAGEMENTS[0];

  if (accuracyScore >= 90) {
    pedagogicalFeedback = 'Xuất sắc! Giọng phát âm rất rõ ràng, tròn vành rõ chữ, chuẩn phong thái sư phạm tiểu học.';
    intonationTip = 'Mẹo: Khi hô lệnh này trên lớp, cô/thầy hãy kết hợp vỗ tay 2 nhịp và mỉm cười để tạo năng lượng tích cực cho học sinh.';
    mrsHuongEncouragement = EXCELLENT_VOICE_FEEDBACK[Math.floor(Math.random() * EXCELLENT_VOICE_FEEDBACK.length)];
  } else if (accuracyScore >= 75) {
    pedagogicalFeedback = 'Rất tốt! Bạn đã phát âm đúng phần lớn từ khóa, học sinh sẽ dễ dàng tiếp thu khẩu lệnh này.';
    intonationTip = 'Mẹo: Hãy chú ý nhấn mạnh (stress) vào các động từ hành động và hạ giọng nhẹ ở cuối câu để tạo tính dứt khoát.';
    mrsHuongEncouragement = VOICE_PRACTICE_ENCOURAGEMENTS[1];
  } else if (accuracyScore >= 50) {
    pedagogicalFeedback = 'Khá tốt! Một số từ phát âm hơi nhanh hoặc chưa rõ âm đuôi (ending sounds).';
    intonationTip = 'Mẹo: Trẻ tiểu học cần nghe rõ âm bật cuối (như /s/, /t/, /k/). Bạn hãy nghe mẫu ở chế độ 0.7x và nói chậm lại một nhịp.';
    mrsHuongEncouragement = VOICE_PRACTICE_ENCOURAGEMENTS[2];
  } else {
    pedagogicalFeedback = 'Cần luyện tập thêm một chút. Hãy thư giãn cổ họng, nghe mẫu chậm 0.7x và nói to, dứt khoát vào micro.';
    intonationTip = 'Mẹo: Đừng ngại nói to hơn mức bình thường một chút, vì trong lớp học tiểu học, khẩu lệnh cần năng lượng và độ vang.';
    mrsHuongEncouragement = VOICE_PRACTICE_ENCOURAGEMENTS[3];
  }

  return {
    spokenText: spoken,
    targetText: target,
    accuracyScore,
    wordsDiff,
    pedagogicalFeedback,
    intonationTip,
    mrsHuongEncouragement
  };
}

// Simple Levenshtein distance for word comparison
function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Polyfill SpeechRecognition type for browser
interface IWindowSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onresult: ((event: unknown) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
}

export function createSpeechRecognizer(): IWindowSpeechRecognition | null {
  if (typeof window === 'undefined') return null;

  const SpeechRecognitionClass = 
    (window as unknown as { SpeechRecognition?: new () => IWindowSpeechRecognition }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: new () => IWindowSpeechRecognition }).webkitSpeechRecognition;

  if (!SpeechRecognitionClass) {
    return null;
  }

  try {
    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    return recognition;
  } catch (e) {
    console.error('Failed to initialize SpeechRecognition:', e);
    return null;
  }
}
