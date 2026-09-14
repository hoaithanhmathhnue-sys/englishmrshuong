export interface EncouragementFeedback {
  id: string;
  english: string;
  vietnamese: string;
  icon: string;
}

export const SUNFLOWER_SLOGAN = {
  english: 'Shine Together, Speak Together',
  vietnamese: 'Như Hoa Hướng Dương Vươn Tới Ánh Mặt Trời Tiếng Anh',
  school: 'Trường Tiểu học Lê Kim Lăng — Môi trường ngôn ngữ giao tiếp 2025–2035',
  author: 'Cô Lê Thị Thu Hương (Mrs. Huong) — Giáo viên Trường TH Lê Kim Lăng'
};

export const FOUNDER_NOTE = {
  title: 'Lời Nhắn Truyền Cảm Hứng Từ Mrs. Huong',
  author: 'Cô Lê Thị Thu Hương',
  school: 'Trường Tiểu học Lê Kim Lăng',
  content: `Chào quý thầy cô thân thương,

Giống như những bông hoa hướng dương luôn kiên trì vươn mình về phía ánh mặt trời, hành trình đưa Tiếng Anh vào lớp học của chúng ta cũng cần sự bền bỉ và năng lượng tích cực mỗi ngày.

Thầy cô đừng lo lắng và đừng bỏ cuộc nhé! Hãy cố gắng mỗi ngày một câu, mỗi tháng 10 câu — từng bước một, "góp gió thành bão", rồi chúng ta sẽ thấy Tiếng Anh trở nên thật quen thuộc và không còn đáng sợ nữa.

Chúc thầy cô luôn giữ trọn ngọn lửa yêu nghề và niềm vui học tập!`
};

export const VOICE_PRACTICE_ENCOURAGEMENTS: EncouragementFeedback[] = [
  {
    id: 'enc-01',
    english: "Don't worry! Every sunflower needs time to bloom. Let me hear you again!",
    vietnamese: 'Đừng lo lắng! Bông hoa hướng dương nào cũng cần thời gian để nở. Cùng thử lại nào!',
    icon: '🌻'
  },
  {
    id: 'enc-02',
    english: 'So close! Practice makes perfect. One more try, teachers!',
    vietnamese: 'Gần đúng rồi ạ! Luyện tập tạo nên sự hoàn hảo. Thử thêm một lần nữa nhé thầy cô!',
    icon: '🎯'
  },
  {
    id: 'enc-03',
    english: 'Great effort! Press the mic and try again for 3 golden stars! ⭐️⭐️⭐️',
    vietnamese: 'Cố gắng lắm ạ! Nhấn micro và thử lại để nhận trọn 3 sao hướng dương nhé!',
    icon: '⭐️'
  },
  {
    id: 'enc-04',
    english: 'You can do it! Step by step, we learn together!',
    vietnamese: 'Thầy cô làm được mà! Từng bước một, chúng ta cùng học với nhau!',
    icon: '🤝'
  }
];

export const EXCELLENT_VOICE_FEEDBACK: EncouragementFeedback[] = [
  {
    id: 'exc-01',
    english: 'Splendid! Your sunflower is shining so brightly today! 🌻✨',
    vietnamese: 'Xuất sắc tuyệt vời! Bông hoa hướng dương của thầy cô đang rạng rỡ tỏa sáng!',
    icon: '🌟'
  },
  {
    id: 'exc-02',
    english: 'Superb pronunciation! You sound like an inspiring primary educator! 👏',
    vietnamese: 'Phát âm tuyệt vời! Chuẩn phong thái sư phạm tự tin và truyền cảm hứng!',
    icon: '🏆'
  }
];

export const QUIZ_ARCADE_ENCOURAGEMENTS: EncouragementFeedback[] = [
  {
    id: 'qenc-01',
    english: 'Nice try! Turn the flashcard to check hint!',
    vietnamese: 'Rất cố gắng! Hãy lật mặt thẻ từ để xem gợi ý nhé!',
    icon: '💡'
  },
  {
    id: 'qenc-02',
    english: 'Never mind! Every mistake helps us learn better. Try again!',
    vietnamese: 'Không sao cả! Mỗi lần thử là một lần giúp chúng ta nhớ sâu hơn. Chọn lại nào!',
    icon: '🌱'
  },
  {
    id: 'qenc-03',
    english: 'Keep going! You are getting better every day!',
    vietnamese: 'Cố lên nào! Thầy cô đang tiến bộ hơn mỗi ngày đấy!',
    icon: '✨'
  }
];

export interface SunflowerGardenLevel {
  stage: 'seed' | 'sprout' | 'bud' | 'bloom' | 'golden';
  title: string;
  minStreak: number;
  emoji: string;
  description: string;
  seedMultiplier: number;
}

export const SUNFLOWER_LEVELS: SunflowerGardenLevel[] = [
  {
    stage: 'seed',
    title: 'Hạt Mầm Hướng Dương',
    minStreak: 0,
    emoji: '🌱',
    description: 'Hạt mầm vừa được gieo vào mảnh đất tri thức. Hãy rèn luyện mỗi ngày một câu!',
    seedMultiplier: 10
  },
  {
    stage: 'sprout',
    title: 'Chồi Non Vươn Lên',
    minStreak: 3,
    emoji: '🌿',
    description: 'Chồi non nhú lên hai lá xanh tươi tắn, hướng về phía ánh ban mai.',
    seedMultiplier: 20
  },
  {
    stage: 'bud',
    title: 'Nụ Hoa Chớm Nở',
    minStreak: 7,
    emoji: '🌼',
    description: 'Nụ hoa e ấp chuẩn bị khoe sắc vàng rạng ngời cùng lớp học.',
    seedMultiplier: 35
  },
  {
    stage: 'bloom',
    title: 'Hướng Dương Nở Rộ',
    minStreak: 14,
    emoji: '🌻',
    description: 'Bông hoa hướng dương nở xòe rực rỡ, lan tỏa năng lượng tích cực tới học sinh.',
    seedMultiplier: 50
  },
  {
    stage: 'golden',
    title: 'Vườn Hoa Hoàng Gia Vàng Óng',
    minStreak: 21,
    emoji: '👑🌻',
    description: 'Vườn hướng dương trĩu hạt vàng óng ánh — Biểu tượng kiên trì bền bỉ của Mrs. Huong!',
    seedMultiplier: 100
  }
];

export function getSunflowerGardenState(streak: number): SunflowerGardenLevel {
  if (streak >= 21) return SUNFLOWER_LEVELS[4];
  if (streak >= 14) return SUNFLOWER_LEVELS[3];
  if (streak >= 7) return SUNFLOWER_LEVELS[2];
  if (streak >= 3) return SUNFLOWER_LEVELS[1];
  return SUNFLOWER_LEVELS[0];
}
