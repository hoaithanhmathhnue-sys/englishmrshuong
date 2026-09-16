// Vocabdaily.lklschool — 4 nhóm câu chính xác theo DOCX/ảnh
import { VocabCategory } from '../types';

export interface VocabPhrase {
  id: string;
  phrase: string;
  response?: string;        // Student response or alternate
  emoji?: string;           // Visual icon
  vocabCategory: VocabCategory;
  subGroup?: string;        // e.g. "Greetings" / "Startings" / "Teacher ↔ Students"
  order: number;
  ipa: string;              // International Phonetic Alphabet
  vietnamese: string;       // Nghĩa tiếng Việt
  context?: string;         // Ngữ cảnh sư phạm / tình huống sử dụng
}

// ═══════════════════════════════════════════════
// 1. 🌅 GREETING & STARTING (Chào hỏi & Khởi động)
// ═══════════════════════════════════════════════

const GREETINGS: VocabPhrase[] = [
  { 
    id: 'gs-01', 
    phrase: 'Hi/Hello (Ms..., Mr..., teacher, class, everyone)', 
    ipa: '/haɪ/ /həˈləʊ/ (mɪz..., ˈmɪstər..., ˈtiːtʃər, klɑːs, ˈevriwʌn)/',
    vietnamese: 'Xin chào (Cô..., Thầy..., cô giáo, cả lớp, tất cả các con)!',
    context: 'Lời chào mở đầu thân thiện, tạo tâm lý vui tươi, hào hứng trước khi vào tiết học.',
    emoji: '👋', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Greetings', 
    order: 1 
  },
  { 
    id: 'gs-02', 
    phrase: 'Good morning.', 
    ipa: '/ɡʊd ˈmɔːnɪŋ/',
    vietnamese: 'Chào buổi sáng các con.',
    context: 'Lời chào chuẩn mực khi bắt đầu tiết học vào các buổi sáng.',
    emoji: '🌅', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Greetings', 
    order: 2 
  },
  { 
    id: 'gs-03', 
    phrase: 'Good afternoon.', 
    ipa: '/ɡʊd ˌɑːftəˈnuːn/',
    vietnamese: 'Chào buổi chiều các con.',
    context: 'Lời chào chuẩn mực khi bắt đầu tiết học vào các buổi chiều.',
    emoji: '☀️', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Greetings', 
    order: 3 
  },
  { 
    id: 'gs-04', 
    phrase: 'Good evening.', 
    ipa: '/ɡʊd ˈiːvnɪŋ/',
    vietnamese: 'Chào buổi tối các con.',
    context: 'Dùng khi có câu lạc bộ tiếng Anh ngoài giờ hoặc lớp học buổi tối.',
    emoji: '🌙', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Greetings', 
    order: 4 
  },
  { 
    id: 'gs-05', 
    phrase: 'How are you today?', 
    response: "I'm fine / good / ok / wonderful / happy", 
    ipa: '/haʊ ɑː juː təˈdeɪ/ -> /aɪm faɪn / ɡʊd / ˈwʌndəfl / ˈhæpi/',
    vietnamese: 'Hôm nay các con thế nào? -> Chúng con rất vui / khỏe / tuyệt vời ạ!',
    context: 'Hỏi thăm cảm xúc, năng lượng đầu giờ của học sinh để kết nối tương tác.',
    emoji: '😊', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Greetings', 
    order: 5 
  },
  { 
    id: 'gs-06', 
    phrase: "I'm not good / tired / hungry...", 
    response: "Don't worry, let's have fun together!",
    ipa: '/aɪm nɒt ɡʊd / ˈtaɪəd / ˈhʌŋɡri/',
    vietnamese: 'Hôm nay con hơi mệt / đói bụng... -> Đừng lo, cô trò mình cùng vui nhé!',
    context: 'Đồng cảm và khích lệ khi học sinh cảm thấy chưa sẵn sàng hoặc mệt mỏi.',
    emoji: '😔', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Greetings', 
    order: 6 
  },
  { 
    id: 'gs-07', 
    phrase: 'Nice to meet/see you.', 
    ipa: '/naɪs tuː miːt / siː juː/',
    vietnamese: 'Rất vui được gặp các con hôm nay.',
    context: 'Tạo cảm giác gắn kết, chào đón học sinh vào lớp học ấm áp.',
    emoji: '🤝', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Greetings', 
    order: 7 
  },
  { 
    id: 'gs-08', 
    phrase: 'Nice to meet/see you, too.', 
    ipa: '/naɪs tuː miːt / siː juː, tuː/',
    vietnamese: 'Chúng con cũng rất vui được gặp cô ạ.',
    context: 'Học sinh đáp lại lời chào của giáo viên một cách lịch thiệp.',
    emoji: '🤝', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Greetings', 
    order: 8 
  },
];

const STARTINGS: VocabPhrase[] = [
  { 
    id: 'gs-09', 
    phrase: 'Welcome to our lesson today.', 
    ipa: '/ˈwelkəm tuː ˈaʊər ˈlesn təˈdeɪ/',
    vietnamese: 'Chào mừng cả lớp đến với bài học hôm nay!',
    context: 'Khẩu lệnh mở màn tiết học trang trọng và tràn đầy cảm hứng.',
    emoji: '🎉', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Startings', 
    order: 9 
  },
  { 
    id: 'gs-10', 
    phrase: 'Are you ready?', 
    response: 'Yes, we are ready!',
    ipa: '/ɑː juː ˈredi/ -> /jes, wiː ɑː ˈredi/',
    vietnamese: 'Các con đã sẵn sàng chưa nào? -> Chúng con sẵn sàng rồi ạ!',
    context: 'Khẩu lệnh kiểm tra mức độ tập trung và tinh thần chuẩn bị của cả lớp.',
    emoji: '💪', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Startings', 
    order: 10 
  },
  { 
    id: 'gs-11', 
    phrase: "Let's get started.", 
    ipa: '/lets ɡet ˈstɑːtɪd/',
    vietnamese: 'Nào, chúng ta bắt đầu bài học thôi!',
    context: 'Chuyển trạng thái từ chào hỏi sang bước vào nội dung bài giảng chính.',
    emoji: '🚀', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Startings', 
    order: 11 
  },
  { 
    id: 'gs-12', 
    phrase: "Let's start with a game.", 
    ipa: '/lets stɑːt wɪð ə ɡeɪm/',
    vietnamese: 'Chúng ta hãy khởi động bằng một trò chơi nhỏ nhé!',
    context: 'Dẫn dắt vào hoạt động Warm-up bằng trò chơi tương tác sôi nổi.',
    emoji: '🎯', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Startings', 
    order: 12 
  },
  { 
    id: 'gs-13', 
    phrase: "Let's warm up before learning.", 
    ipa: '/lets wɔːm ʌp bɪˈfɔː ˈlɜːnɪŋ/',
    vietnamese: 'Hãy cùng khởi động tràn đầy năng lượng trước khi học nào!',
    context: 'Mời học sinh đứng lên làm động tác vận động nhẹ hoặc hát bài hát tiếng Anh.',
    emoji: '🔥', 
    vocabCategory: 'Greeting & Starting', 
    subGroup: 'Startings', 
    order: 13 
  },
];

// ═══════════════════════════════════════════════
// 2. 📚 CLASSROOM INSTRUCTIONS (16 khẩu lệnh điều hành)
// ═══════════════════════════════════════════════

const CLASSROOM_INSTRUCTIONS: VocabPhrase[] = [
  { 
    id: 'ci-01', 
    phrase: 'Line up, please!', 
    ipa: '/laɪn ʌp, pliːz/',
    vietnamese: 'Xếp hàng ngay ngắn nào các con!',
    context: 'Dùng khi xếp hàng đầu giờ, chuyển phòng bộ môn hoặc ra sân chơi.',
    emoji: '🧑‍🤝‍🧑', 
    vocabCategory: 'Classroom Instructions', 
    order: 1 
  },
  { 
    id: 'ci-02', 
    phrase: 'Stand up, please!', 
    ipa: '/stænd ʌp, pliːz/',
    vietnamese: 'Mời cả lớp đứng dậy nào!',
    context: 'Khẩu lệnh mời học sinh đứng lên chào hỏi, tham gia hát múa hoặc chơi trò chơi.',
    emoji: '🧍', 
    vocabCategory: 'Classroom Instructions', 
    order: 2 
  },
  { 
    id: 'ci-03', 
    phrase: 'Sit down, please!', 
    ipa: '/sɪt daʊn, pliːz/',
    vietnamese: 'Mời các con ngồi xuống.',
    context: 'Khẩu lệnh ổn định vị trí ngồi ngay ngắn sau khi hoàn thành hoạt động.',
    emoji: '🪑', 
    vocabCategory: 'Classroom Instructions', 
    order: 3 
  },
  { 
    id: 'ci-04', 
    phrase: 'Be quiet, please!', 
    ipa: '/biː ˈkwaɪət, pliːz/',
    vietnamese: 'Trật tự nào các con ơi!',
    context: 'Hạ nhiệt tiếng ồn trong lớp một cách lịch sự, nhẹ nhàng và kiên quyết.',
    emoji: '🤫', 
    vocabCategory: 'Classroom Instructions', 
    order: 4 
  },
  { 
    id: 'ci-05', 
    phrase: 'Open your books, page 10.', 
    ipa: '/ˈəʊpən jɔː bʊks, peɪdʒ ten/',
    vietnamese: 'Mở sách ra trang số 10 nào.',
    context: 'Hướng dẫn học sinh giở đúng trang sách bài học theo yêu cầu giáo viên.',
    emoji: '📖', 
    vocabCategory: 'Classroom Instructions', 
    order: 5 
  },
  { 
    id: 'ci-06', 
    phrase: 'Close your books!', 
    ipa: '/kləʊz jɔː bʊks/',
    vietnamese: 'Gấp sách lại nào các con!',
    context: 'Dùng khi kết thúc phần đọc sách để chuyển sang thảo luận hoặc chơi game.',
    emoji: '📕', 
    vocabCategory: 'Classroom Instructions', 
    order: 6 
  },
  { 
    id: 'ci-07', 
    phrase: 'Listen and repeat.', 
    ipa: '/ˈlɪsn ænd rɪˈpiːt/',
    vietnamese: 'Lắng nghe và nhắc lại theo cô nhé.',
    context: 'Khẩu lệnh luyện phát âm từ mới, mẫu câu hoặc ngữ điệu trong bài.',
    emoji: '👂', 
    vocabCategory: 'Classroom Instructions', 
    order: 7 
  },
  { 
    id: 'ci-08', 
    phrase: 'Look at the board, please!', 
    ipa: '/lʊk æt ðə bɔːd, pliːz/',
    vietnamese: 'Nhìn lên bảng nào các con!',
    context: 'Khẩu lệnh căn bản dùng khi giáo viên bắt đầu viết bài, chiếu slide hoặc giải thích mẫu câu.',
    emoji: '📋', 
    vocabCategory: 'Classroom Instructions', 
    order: 8 
  },
  { 
    id: 'ci-09', 
    phrase: 'Raise your hand!', 
    ipa: '/reɪz jɔː hænd/',
    vietnamese: 'Giơ tay phát biểu nào!',
    context: 'Khuyến khích học sinh xung phong trả lời câu hỏi có trật tự.',
    emoji: '✋', 
    vocabCategory: 'Classroom Instructions', 
    order: 9 
  },
  { 
    id: 'ci-10', 
    phrase: 'Hands down!', 
    ipa: '/hændz daʊn/',
    vietnamese: 'Bỏ tay xuống nào các con.',
    context: 'Ổn định tay sau khi đã chọn được bạn phát biểu hoặc kết thúc câu hỏi.',
    emoji: '👇', 
    vocabCategory: 'Classroom Instructions', 
    order: 10 
  },
  { 
    id: 'ci-11', 
    phrase: 'Hands up!', 
    ipa: '/hændz ʌp/',
    vietnamese: 'Cả lớp cùng giơ hai tay lên cao!',
    context: 'Tập thể dục não bộ, chơi trò Simon Says hoặc kiểm tra sự tập trung đồng loạt.',
    emoji: '🙌', 
    vocabCategory: 'Classroom Instructions', 
    order: 11 
  },
  { 
    id: 'ci-12', 
    phrase: 'Write it down.', 
    ipa: '/raɪt ɪt daʊn/',
    vietnamese: 'Viết nội dung này vào vở nhé.',
    context: 'Yêu cầu học sinh chép từ vựng mới hoặc đáp án bài tập vào vở.',
    emoji: '✍️', 
    vocabCategory: 'Classroom Instructions', 
    order: 12 
  },
  { 
    id: 'ci-13', 
    phrase: 'Read aloud.', 
    ipa: '/riːd əˈlaʊd/',
    vietnamese: 'Đọc to rõ ràng lên con nhé.',
    context: 'Rèn luyện sự tự tin, phát âm to rõ ràng trước cả lớp.',
    emoji: '🗣️', 
    vocabCategory: 'Classroom Instructions', 
    order: 13 
  },
  { 
    id: 'ci-14', 
    phrase: "Time's up.", 
    ipa: '/taɪmz ʌp/',
    vietnamese: 'Hết giờ làm bài rồi!',
    context: 'Báo hiệu kết thúc thời gian thảo luận nhóm hoặc thời gian làm bài tập.',
    emoji: '⏰', 
    vocabCategory: 'Classroom Instructions', 
    order: 14 
  },
  { 
    id: 'ci-15', 
    phrase: 'Take out your pens.', 
    ipa: '/teɪk aʊt jɔː penz/',
    vietnamese: 'Lấy bút ra nào các con.',
    context: 'Chuẩn bị đồ dùng học tập trước khi viết bài hoặc làm bài kiểm tra ngắn.',
    emoji: '🖊️', 
    vocabCategory: 'Classroom Instructions', 
    order: 15 
  },
  { 
    id: 'ci-16', 
    phrase: "Let's count together.", 
    ipa: '/lets kaʊnt təˈɡeðər/',
    vietnamese: 'Nào, cùng nhau đếm số nhé!',
    context: 'Kết hợp tiếng Anh và môn Toán hoặc đếm ngược thời gian thảo luận.',
    emoji: '🔢', 
    vocabCategory: 'Classroom Instructions', 
    order: 16 
  },
];

// ═══════════════════════════════════════════════
// 3. ⭐ PRAISE & ENCOURAGEMENT (Khen ngợi & Động viên)
// ═══════════════════════════════════════════════

const PRAISE_ENCOURAGEMENT: VocabPhrase[] = [
  { 
    id: 'pe-01', 
    phrase: 'Well done!', 
    ipa: '/wel dʌn/',
    vietnamese: 'Làm tốt lắm con!',
    context: 'Khen ngợi khi học sinh hoàn thành đúng nhiệm vụ được giao.',
    emoji: '👏', 
    vocabCategory: 'Praise & Encouragement', 
    order: 1 
  },
  { 
    id: 'pe-02', 
    phrase: 'Great job!', 
    ipa: '/ɡreɪt dʒɒb/',
    vietnamese: 'Tuyệt vời lắm!',
    context: 'Lời khen phổ biến mang lại cảm xúc phấn khởi cho học sinh.',
    emoji: '🏆', 
    vocabCategory: 'Praise & Encouragement', 
    order: 2 
  },
  { 
    id: 'pe-03', 
    phrase: 'Excellent!', 
    ipa: '/ˈeksələnt/',
    vietnamese: 'Xuất sắc!',
    context: 'Dành cho câu trả lời hoàn hảo, vượt trên sự mong đợi.',
    emoji: '🌟', 
    vocabCategory: 'Praise & Encouragement', 
    order: 3 
  },
  { 
    id: 'pe-04', 
    phrase: 'Wonderful!', 
    ipa: '/ˈwʌndəfl/',
    vietnamese: 'Thật kỳ diệu, rất tuyệt!',
    context: 'Bày tỏ sự hào hứng và ngợi khen phần thể hiện đầy sáng tạo.',
    emoji: '🌈', 
    vocabCategory: 'Praise & Encouragement', 
    order: 4 
  },
  { 
    id: 'pe-05', 
    phrase: "That's right!", 
    ipa: '/ðæts raɪt/',
    vietnamese: 'Đúng chính xác rồi!',
    context: 'Khẳng định câu trả lời đúng ngay lập tức để củng cố kiến thức.',
    emoji: '👍', 
    vocabCategory: 'Praise & Encouragement', 
    order: 5 
  },
  { 
    id: 'pe-06', 
    phrase: 'Fantastic!', 
    ipa: '/fænˈtæstɪk/',
    vietnamese: 'Tuyệt đỉnh luôn!',
    context: 'Khen ngợi sự nỗ lực vượt bậc của cá nhân hoặc một nhóm.',
    emoji: '🚀', 
    vocabCategory: 'Praise & Encouragement', 
    order: 6 
  },
  { 
    id: 'pe-07', 
    phrase: 'Keep it up!', 
    ipa: '/kiːp ɪt ʌp/',
    vietnamese: 'Hãy tiếp tục phát huy nhé con!',
    context: 'Động viên học sinh giữ vững phong độ và tinh thần học tập tốt.',
    emoji: '💪', 
    vocabCategory: 'Praise & Encouragement', 
    order: 7 
  },
  { 
    id: 'pe-08', 
    phrase: 'You did it!', 
    ipa: '/juː dɪd ɪt/',
    vietnamese: 'Con đã làm được rồi đấy!',
    context: 'Tôn vinh thành quả khi học sinh vượt qua một bài tập thử thách.',
    emoji: '🎉', 
    vocabCategory: 'Praise & Encouragement', 
    order: 8 
  },
  { 
    id: 'pe-09', 
    phrase: 'Very good!', 
    ipa: '/ˈveri ɡʊd/',
    vietnamese: 'Rất tốt con nhé!',
    context: 'Lời khen cơ bản, gần gũi và ấm áp cho mọi lứa tuổi học sinh.',
    emoji: '😊', 
    vocabCategory: 'Praise & Encouragement', 
    order: 9 
  },
  { 
    id: 'pe-10', 
    phrase: 'Good boy!', 
    ipa: '/ɡʊd bɔɪ/',
    vietnamese: 'Cậu bé ngoan / Làm tốt lắm con trai!',
    context: 'Dành cho các bạn nam tiểu học khi cư xử ngoan và chăm chỉ.',
    emoji: '👦', 
    vocabCategory: 'Praise & Encouragement', 
    order: 10 
  },
  { 
    id: 'pe-11', 
    phrase: 'Good girl!', 
    ipa: '/ɡʊd ɡɜːl/',
    vietnamese: 'Cô bé ngoan / Làm tốt lắm con gái!',
    context: 'Dành cho các bạn nữ tiểu học khi thể hiện xuất sắc và lễ phép.',
    emoji: '👧', 
    vocabCategory: 'Praise & Encouragement', 
    order: 11 
  },
  { 
    id: 'pe-12', 
    phrase: 'Try again!', 
    ipa: '/traɪ əˈɡen/',
    vietnamese: 'Cố gắng thử lại lần nữa nào con!',
    context: 'Động viên tích cực khi học sinh trả lời chưa đúng, không làm con tự ti.',
    emoji: '🔄', 
    vocabCategory: 'Praise & Encouragement', 
    order: 12 
  },
];

// ═══════════════════════════════════════════════
// 4. 💬 DAILY COMMUNICATION (Giao tiếp thường nhật)
// ═══════════════════════════════════════════════

const DAILY_TEACHER_STUDENTS: VocabPhrase[] = [
  { 
    id: 'dc-01', 
    phrase: 'Do you understand?', 
    response: 'Yes, I do / Not yet',
    ipa: '/duː juː ˌʌndəˈstænd/ -> /jes, aɪ duː/',
    vietnamese: 'Các con có hiểu bài không? -> Dạ chúng con hiểu rồi ạ.',
    context: 'Kiểm tra mức độ tiếp thu bài của học sinh trước khi chuyển phần mới.',
    emoji: '🤔', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Teacher ↔ Students', 
    order: 1 
  },
  { 
    id: 'dc-02', 
    phrase: 'Can you repeat that?', 
    ipa: '/kæn juː rɪˈpiːt ðæt/',
    vietnamese: 'Con có thể nhắc lại câu đó được không?',
    context: 'Yêu cầu học sinh nhắc lại câu vừa nói để rèn luyện phản xạ phát âm.',
    emoji: '🔁', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Teacher ↔ Students', 
    order: 2 
  },
  { 
    id: 'dc-03', 
    phrase: 'What does this word mean?', 
    ipa: '/wɒt dʌz ðɪs wɜːd miːn/',
    vietnamese: 'Từ này có nghĩa là gì nhỉ các con?',
    context: 'Khơi gợi học sinh tư duy giải nghĩa từ theo ngữ cảnh bài học.',
    emoji: '❓', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Teacher ↔ Students', 
    order: 3 
  },
  { 
    id: 'dc-04', 
    phrase: 'Can anyone help?', 
    ipa: '/kæn ˈeniwʌn help/',
    vietnamese: 'Có bạn nào giúp đỡ bạn được không nào?',
    context: 'Kêu gọi tinh thần tương trợ và tinh thần đồng đội giữa các bạn trong lớp.',
    emoji: '🙋', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Teacher ↔ Students', 
    order: 4 
  },
  { 
    id: 'dc-05', 
    phrase: 'Any questions?', 
    response: 'No questions, teacher!',
    ipa: '/ˈeni ˈkwestʃənz/ -> /nəʊ ˈkwestʃənz, ˈtiːtʃər/',
    vietnamese: 'Có bạn nào có thắc mắc gì không? -> Dạ không ạ!',
    context: 'Tạo không gian mở cho học sinh đặt câu hỏi nếu còn điểm chưa rõ.',
    emoji: '💭', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Teacher ↔ Students', 
    order: 5 
  },
  { 
    id: 'dc-06', 
    phrase: 'What do you think?', 
    ipa: '/wɒt duː juː θɪŋk/',
    vietnamese: 'Con nghĩ thế nào về điều này?',
    context: 'Khuyến khích học sinh nói lên ý kiến cá nhân và tư duy phản biện.',
    emoji: '🧠', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Teacher ↔ Students', 
    order: 6 
  },
  { 
    id: 'dc-07', 
    phrase: 'Can you say it in English?', 
    ipa: '/kæn juː seɪ ɪt ɪn ˈɪŋɡlɪʃ/',
    vietnamese: 'Con có thể diễn đạt bằng tiếng Anh được không nào?',
    context: 'Khích lệ học sinh chuyển ngữ sang tiếng Anh tự nhiên trong giờ học.',
    emoji: '🇬🇧', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Teacher ↔ Students', 
    order: 7 
  },
];

const DAILY_STUDENTS_STUDENTS: VocabPhrase[] = [
  { 
    id: 'dc-08', 
    phrase: 'Can I help you?', 
    response: 'Yes, please / No, thank you',
    ipa: '/kæn aɪ help juː/',
    vietnamese: 'Tớ có thể giúp gì cho bạn không?',
    context: 'Giao tiếp giữa học sinh với nhau khi làm việc nhóm hoặc hỗ trợ bạn cùng bàn.',
    emoji: '🤝', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Students ↔ Students', 
    order: 8 
  },
  { 
    id: 'dc-09', 
    phrase: "I don't understand.", 
    ipa: '/aɪ dəʊnt ˌʌndəˈstænd/',
    vietnamese: 'Tớ/Em chưa hiểu phần này lắm.',
    context: 'Mẫu câu trung thực giúp học sinh bày tỏ khó khăn mà không ngần ngại.',
    emoji: '😕', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Students ↔ Students', 
    order: 9 
  },
  { 
    id: 'dc-10', 
    phrase: 'Let me try.', 
    ipa: '/let miː traɪ/',
    vietnamese: 'Để tớ thử làm xem nào!',
    context: 'Thể hiện sự tự tin và tinh thần dám thử thách của học sinh.',
    emoji: '✨', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Students ↔ Students', 
    order: 10 
  },
  { 
    id: 'dc-11', 
    phrase: 'I think...', 
    ipa: '/aɪ θɪŋk.../',
    vietnamese: 'Tớ nghĩ là...',
    context: 'Khởi đầu để học sinh trình bày quan điểm cá nhân trong nhóm.',
    emoji: '💡', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Students ↔ Students', 
    order: 11 
  },
  { 
    id: 'dc-12', 
    phrase: 'I agree with you.', 
    ipa: '/aɪ əˈɡriː wɪð juː/',
    vietnamese: 'Tớ đồng ý với ý kiến của bạn.',
    context: 'Thể hiện sự đồng thuận tích cực trong thảo luận nhóm.',
    emoji: '✅', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Students ↔ Students', 
    order: 12 
  },
  { 
    id: 'dc-13', 
    phrase: 'Your turn.', 
    ipa: '/jɔː tɜːn/',
    vietnamese: 'Đến lượt của bạn rồi đấy!',
    context: 'Mẫu câu chia lượt lịch sự khi chơi trò chơi hoặc luân phiên đọc bài.',
    emoji: '👉', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Students ↔ Students', 
    order: 13 
  },
  { 
    id: 'dc-14', 
    phrase: 'Thank you very much.', 
    ipa: '/θæŋk juː ˈveri mʌtʃ/',
    vietnamese: 'Cảm ơn bạn rất nhiều nhé!',
    context: 'Lời cảm ơn lễ phép, xây dựng văn hóa ứng xử văn minh trong trường học.',
    emoji: '🙏', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Students ↔ Students', 
    order: 14 
  },
  { 
    id: 'dc-15', 
    phrase: "You're welcome.", 
    ipa: '/jɔː ˈwelkəm/',
    vietnamese: 'Không có gì đâu bạn ơi!',
    context: 'Đáp lại lời cảm ơn một cách thân thiện và cởi mở.',
    emoji: '😊', 
    vocabCategory: 'Daily Communication', 
    subGroup: 'Students ↔ Students', 
    order: 15 
  },
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
