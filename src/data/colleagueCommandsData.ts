import { CommandItem } from '../types';

export const COLLEAGUE_COMMANDS: CommandItem[] = [
  {
    id: 'col-01',
    teacherCall: 'Good morning! How are you today?',
    studentResponse: "Good morning! I'm great, thank you!",
    callIpa: '/ɡʊd ˈmɔːnɪŋ! haʊ ɑː juː təˈdeɪ/',
    responseIpa: '/ɡʊd ˈmɔːnɪŋ! aɪm ɡreɪt, θæŋk juː/',
    vietnameseTranslation: 'Chào buổi sáng! Hôm nay cô thế nào?',
    context: 'Chào nhau đầu giờ sáng tại văn phòng giáo viên hoặc trước sảnh trường.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Mỉm cười rạng rỡ và khẽ gật đầu chào đồng nghiệp.',
      studentAction: 'Mỉm cười đáp lại và vẫy tay nhẹ thân thiện.',
      iconTip: '👋 Mỉm cười chào đầu ngày'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Ngữ điệu ấm áp, tràn đầy năng lượng tích cực.'
  },
  {
    id: 'col-02',
    teacherCall: 'Have a nice day!',
    studentResponse: 'Thank you, you too!',
    callIpa: '/hæv ə naɪs deɪ/',
    responseIpa: '/θæŋk juː, juː tuː/',
    vietnameseTranslation: 'Chúc đồng nghiệp một ngày tốt lành!',
    context: 'Lời chúc khi bắt đầu ngày làm việc hoặc khi chia tay nhau về lớp giảng dạy.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Đặt tay lên ngực trái thể hiện sự chân thành.',
      studentAction: 'Gật đầu cảm ơn và nở nụ cười tươi.',
      iconTip: '☀️ Chúc ngày làm việc tươi sáng'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Lên giọng nhẹ ở từ "day!".'
  },
  {
    id: 'col-03',
    teacherCall: 'Have a good lesson!',
    studentResponse: 'Thanks! Wish me luck!',
    callIpa: '/hæv ə ɡʊd ˈlesn/',
    responseIpa: '/θæŋks! wɪʃ miː lʌk/',
    vietnameseTranslation: 'Chúc cô có một tiết dạy thật tốt!',
    context: 'Động viên đồng nghiệp trước khi lên lớp hoặc chuẩn bị bước vào tiết thao giảng.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Nắm nhẹ nắm tay làm động tác "Fighting" cổ vũ đồng nghiệp.',
      studentAction: 'Tự tin gật đầu nhận lời chúc.',
      iconTip: '✊ Nắm tay cổ vũ tự tin lên lớp'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Giọng ấm áp, truyền cảm hứng và sự tự tin.'
  },
  {
    id: 'col-04',
    teacherCall: 'How was your lesson?',
    studentResponse: 'It was wonderful! The kids loved it!',
    callIpa: '/haʊ wɒz jɔː ˈlesn/',
    responseIpa: '/ɪt wɒz ˈwʌndəfl! ðə kɪdz lʌvd ɪt/',
    vietnameseTranslation: 'Tiết dạy của cô thế nào rồi?',
    context: 'Hỏi thăm và sẻ chia cảm xúc sau khi đồng nghiệp vừa hoàn thành tiết dạy.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Nghiêng đầu lắng nghe, ánh mắt quan tâm thân thiện.',
      studentAction: 'Hào hứng chia sẻ về hoạt động của các em học sinh.',
      iconTip: '👂 Lắng nghe và sẻ chia chân thành'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Hạ giọng nhẹ ở cuối câu hỏi "lesson".'
  },
  {
    id: 'col-05',
    teacherCall: 'Enjoy your break!',
    studentResponse: 'Thank you! You take a rest too!',
    callIpa: '/ɪnˈdʒɔɪ jɔː breɪk/',
    responseIpa: '/θæŋk juː! juː teɪk ə rest tuː/',
    vietnameseTranslation: 'Chúc cô giờ nghỉ giải lao vui vẻ!',
    context: 'Chào nhau giờ ra chơi giữa các tiết học.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Đưa hai tay hướng về phòng giáo viên như lời mời nghỉ ngơi.',
      studentAction: 'Vẫy tay nhẹ và thư giãn.',
      iconTip: '☕ Thư giãn giờ giải lao'
    },
    toneRecommendation: 'calm_whisper',
    audioSampleNotes: 'Giọng nhẹ nhàng, thư thái.'
  },
  {
    id: 'col-06',
    teacherCall: "Let's have some tea or coffee!",
    studentResponse: "Sounds great! Let's go!",
    callIpa: '/lets hæv sʌm tiː ɔːr ˈkɒfi/',
    responseIpa: '/saʊndz ɡreɪt! lets ɡəʊ/',
    vietnameseTranslation: 'Cùng uống trà hoặc cà phê nhé!',
    context: 'Rủ rê đồng nghiệp cùng thưởng thức tách trà, cà phê giờ giải lao.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Làm động tác nâng tách trà mời đồng nghiệp.',
      studentAction: 'Cười tươi và cùng đứng dậy đi pha nước.',
      iconTip: '🍵 Nâng tách trà gắn kết tình đồng nghiệp'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Ngữ điệu vui vẻ, mời gọi ấm cúng.'
  },
  {
    id: 'col-07',
    teacherCall: 'Shall we prepare teaching aids together?',
    studentResponse: 'Yes, of course! Two heads are better than one!',
    callIpa: '/ʃæl wiː prɪˈpeər ˈtiːtʃɪŋ eɪdz təˈɡeðər/',
    responseIpa: '/jes, əv kɔːs! tuː hedz ɑː ˈbetər ðæn wʌn/',
    vietnameseTranslation: 'Cùng làm đồ dùng dạy học nhé?',
    context: 'Rủ đồng nghiệp cùng thiết kế flashcards, tranh ảnh hoặc đạo cụ dạy học.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Hai tay cầm bìa/kéo tượng trưng cho việc chuẩn bị học cụ.',
      studentAction: 'Gật đầu đồng thuận và hào hứng hợp tác.',
      iconTip: '✂️ Cùng làm đồ dùng giảng dạy'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Nhấn rõ từ "teaching aids" và "together".'
  },
  {
    id: 'col-08',
    teacherCall: 'Can you help me with this?',
    studentResponse: "Sure! What's up?",
    callIpa: '/kæn juː help miː wɪð ðɪs/',
    responseIpa: '/ʃʊər! wɒts ʌp/',
    vietnameseTranslation: 'Cô giúp tôi một tay được không?',
    context: 'Nhờ đồng nghiệp hỗ trợ công việc (bê giáo cụ, kiểm tra máy chiếu, chuẩn bị phòng học).',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Hai bàn tay mở ra hướng về người đối diện với vẻ cầu thị.',
      studentAction: 'Sẵn sàng bước tới giúp một tay.',
      iconTip: '🤝 Đưa tay nhờ tương trợ đồng nghiệp'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Lên giọng ở cuối câu "with this?".'
  },
  {
    id: 'col-09',
    teacherCall: "Sure, I'd love to help!",
    studentResponse: "Thank you so much! You're a lifesaver!",
    callIpa: '/ʃʊər, aɪd lʌv tuː help/',
    responseIpa: '/θæŋk juː səʊ mʌtʃ! jʊər ə ˈlaɪfseɪvər/',
    vietnameseTranslation: 'Chắc chắn rồi, tôi rất sẵn lòng!',
    context: 'Đồng ý hỗ trợ đồng nghiệp một cách nhiệt tình và vui vẻ.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Đặt tay lên vai đồng nghiệp hoặc gật đầu dứt khoát.',
      studentAction: 'Cảm kích và thở phào nhẹ nhõm.',
      iconTip: '💖 Nhiệt tình tương trợ'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Nhấn mạnh từ "love" /lʌv/ để biểu lộ sự chân thành.'
  },
  {
    id: 'col-10',
    teacherCall: 'You did a great job today!',
    studentResponse: 'Thank you! It means a lot to me!',
    callIpa: '/juː dɪd ə ɡreɪt dʒɒb təˈdeɪ/',
    responseIpa: '/θæŋk juː! ɪt miːnz ə lɒt tuː miː/',
    vietnameseTranslation: 'Hôm nay cô làm tuyệt vời lắm!',
    context: 'Khen ngợi tiết dạy, bài thuyết trình hoặc hoạt động trải nghiệm của đồng nghiệp.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Giơ 2 ngón tay cái (double thumbs-up) khen ngợi.',
      studentAction: 'Cười rạng rỡ và cảm ơn chân thành.',
      iconTip: '👍👍 Giơ ngón tay cái ngợi khen'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Nhấn mạnh từ "great job" /ɡreɪt dʒɒb/.'
  },
  {
    id: 'col-11',
    teacherCall: "Let's practice English together!",
    studentResponse: 'Yes! Step by step on Mrs. Huong App!',
    callIpa: '/lets ˈpræktɪs ˈɪŋɡlɪʃ təˈɡeðər/',
    responseIpa: '/jes! step baɪ step ɒn ˈmɪsɪz huːŋ æp/',
    vietnameseTranslation: 'Chúng mình cùng luyện Tiếng Anh nhé!',
    context: 'Rủ nhau tự học và ghi âm luyện phát âm trên Web App của Mrs. Huong.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Cầm điện thoại mở app hướng dương và chỉ về phía bạn đồng nghiệp.',
      studentAction: 'Cùng mở app và hào hứng luyện giọng.',
      iconTip: '🌻 Cùng mở app Hướng Dương tự học'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Hào hứng, nhiệt huyết và tươi trẻ.'
  },
  {
    id: 'col-12',
    teacherCall: 'Step by step, we can do it!',
    studentResponse: 'Yes, we can! Shine together, speak together!',
    callIpa: '/step baɪ step, wiː kæn duː ɪt/',
    responseIpa: '/jes, wiː kæn! ʃaɪn təˈɡeðər, spiːk təˈɡeðər/',
    vietnameseTranslation: 'Từng bước một, chúng ta sẽ làm được!',
    context: 'Động viên nhau vượt qua rào cản sợ sai khi giao tiếp tiếng Anh học đường.',
    gradeLevel: 'All',
    category: 'Giao Tiếp Đồng Nghiệp',
    tprCue: {
      teacherAction: 'Hai bàn tay nắm lại đưa lên cao đầy quyết tâm.',
      studentAction: 'Đồng thanh hô vang thông điệp của trường TH Lê Kim Lăng.',
      iconTip: '🌟 Quyết tâm cùng tiến bộ'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Âm điệu kiên định, giàu cảm xúc và truyền cảm hứng.'
  }
];
