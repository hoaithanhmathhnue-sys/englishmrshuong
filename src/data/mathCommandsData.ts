import { CommandItem } from '../types';

export const MATH_COMMANDS: CommandItem[] = [
  {
    id: 'math-01',
    teacherCall: 'Count from 1 to 20.',
    studentResponse: '1, 2, 3, 4, 5... 20!',
    callIpa: '/kaʊnt frɒm wʌn tuː ˈtwenti/',
    responseIpa: '/wʌn, tuː, θriː... ˈtwenti/',
    vietnameseTranslation: 'Đếm từ 1 đến 20.',
    context: 'Khởi động tiết học Số học — Cả lớp cùng đếm nhịp nhàng để tạo không khí sôi nổi.',
    gradeLevel: 'Lớp 1',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Xòe từng ngón tay theo nhịp đếm 1, 2, 3...',
      studentAction: 'Cùng giơ ngón tay đếm to theo cô từ 1 đến 20.',
      iconTip: '🔢 Đếm nhịp ngón tay'
    },
    toneRecommendation: 'rhythm_chant',
    audioSampleNotes: 'Giọng vui tươi, nhịp đếm dứt khoát từng số.'
  },
  {
    id: 'math-02',
    teacherCall: 'How many stars are there?',
    studentResponse: 'There are five stars!',
    callIpa: '/haʊ ˈmeni stɑːz ɑː ðeə/',
    responseIpa: '/ðeər ɑː faɪv stɑːz/',
    vietnameseTranslation: 'Có bao nhiêu ngôi sao?',
    context: 'Đếm số lượng đồ vật / hình ảnh trực quan trên bảng hoặc phiếu học tập.',
    gradeLevel: 'Lớp 1',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Chỉ tay lên hình ngôi sao trên bảng rồi ngửa tay hỏi học sinh.',
      studentAction: 'Chỉ tay đếm và đồng thanh hô câu trả lời.',
      iconTip: '⭐ Chỉ tay vào hình'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Lên giọng ở cuối câu hỏi "are there?".'
  },
  {
    id: 'math-03',
    teacherCall: 'What is 5 plus 3?',
    studentResponse: 'It is 8! / 5 plus 3 is 8!',
    callIpa: '/wɒt ɪz faɪv plʌs θriː/',
    responseIpa: '/ɪt ɪz eɪt/',
    vietnameseTranslation: '5 cộng 3 bằng mấy?',
    context: 'Hướng dẫn phép cộng đơn giản trong phạm vi 10.',
    gradeLevel: 'Lớp 1',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Giơ 5 ngón tay trái, sau đó bắt chéo 2 ngón trỏ làm dấu cộng (+), rồi giơ 3 ngón tay phải.',
      studentAction: 'Tính nhanh và giơ 8 ngón tay lên cao.',
      iconTip: '➕ Đan chéo ngón tay tạo dấu cộng'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Nhấn rõ từ "plus" /plʌs/.'
  },
  {
    id: 'math-04',
    teacherCall: 'What is 10 minus 4?',
    studentResponse: 'It is 6! / 10 minus 4 is 6!',
    callIpa: '/wɒt ɪz ten ˈmaɪnəs fɔː/',
    responseIpa: '/ɪt ɪz sɪks/',
    vietnameseTranslation: '10 trừ 4 bằng mấy?',
    context: 'Hướng dẫn phép trừ đơn giản trong phạm vi 10.',
    gradeLevel: 'Lớp 1',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Giơ 10 ngón tay, sau đó gạt ngang 1 ngón trỏ làm dấu trừ (-), rồi cụp 4 ngón tay lại.',
      studentAction: 'Đếm số ngón còn lại và hô to đáp án.',
      iconTip: '➖ Gạt ngang ngón tay làm dấu trừ'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Nhấn rõ từ "minus" /ˈmaɪnəs/.'
  },
  {
    id: 'math-05',
    teacherCall: '5 plus 3 equals 8.',
    studentResponse: '5 plus 3 equals 8!',
    callIpa: '/faɪv plʌs θriː ˈiːkwəlz eɪt/',
    responseIpa: '/faɪv plʌs θriː ˈiːkwəlz eɪt/',
    vietnameseTranslation: '5 cộng 3 bằng 8.',
    context: 'Mẫu câu kết quả phép tính hoàn chỉnh để rèn luyện tư duy ngôn ngữ toán.',
    gradeLevel: 'Lớp 1',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Đặt song song 2 ngón tay nằm ngang làm dấu bằng (=).',
      studentAction: 'Cùng làm dấu bằng và nhắc lại mẫu câu.',
      iconTip: '🟰 Hai ngón tay song song làm dấu bằng'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Nhấn âm đuôi /z/ ở từ "equals" /ˈiːkwəlz/.'
  },
  {
    id: 'math-06',
    teacherCall: 'Look at this shape.',
    studentResponse: 'I am looking!',
    callIpa: '/lʊk æt ðɪs ʃeɪp/',
    responseIpa: '/aɪ æm ˈlʊkɪŋ/',
    vietnameseTranslation: 'Hãy nhìn vào hình này.',
    context: 'Giới thiệu bài học Hình học trực quan (tam giác, vuông, tròn, chữ nhật).',
    gradeLevel: 'Lớp 2',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Hai bàn tay chụm lại quanh mắt như ống nhòm rồi hướng về phía mô hình.',
      studentAction: 'Mắt nhìn chăm chú vào mô hình hình học.',
      iconTip: '📐 Làm động tác ống nhòm nhìn hình'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Nhấn rõ âm đuôi /p/ ở từ "shape".'
  },
  {
    id: 'math-07',
    teacherCall: "It's a triangle.",
    studentResponse: 'Triangle! 3 sides!',
    callIpa: '/ɪts ə ˈtraɪæŋɡl/',
    responseIpa: '/ˈtraɪæŋɡl, θriː saɪdz/',
    vietnameseTranslation: 'Đó là một hình tam giác.',
    context: 'Nhận biết hình tam giác và 3 cạnh.',
    gradeLevel: 'Lớp 2',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Hai bàn tay áp 2 ngón trỏ và ngón cái tạo thành hình tam giác.',
      studentAction: 'Làm hình tam giác bằng bàn tay và hô to "Triangle!".',
      iconTip: '🔺 Chụm ngón tay tạo hình tam giác'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Phát âm chuẩn trọng âm đầu: /ˈtraɪ.æŋ.ɡl/.'
  },
  {
    id: 'math-08',
    teacherCall: "It's a square.",
    studentResponse: 'Square! 4 equal sides!',
    callIpa: '/ɪts ə skweə/',
    responseIpa: '/skweə, fɔːr ˈiːkwəl saɪdz/',
    vietnameseTranslation: 'Đó là một hình vuông.',
    context: 'Nhận biết hình vuông với 4 cạnh bằng nhau.',
    gradeLevel: 'Lớp 2',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Dùng 2 ngón trỏ vẽ trong không trung một hình vuông 4 góc.',
      studentAction: 'Vẽ hình vuông trong không trung.',
      iconTip: '⏹️ Vẽ hình vuông trong không trung'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Bật âm /sk/ đầu: /skweə/.'
  },
  {
    id: 'math-09',
    teacherCall: "It's a circle.",
    studentResponse: 'Circle! Round and round!',
    callIpa: '/ɪts ə ˈsɜːkl/',
    responseIpa: '/ˈsɜːkl, raʊnd ænd raʊnd/',
    vietnameseTranslation: 'Đó là một hình tròn.',
    context: 'Nhận biết hình tròn không có góc cạnh.',
    gradeLevel: 'Lớp 2',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Hai cánh tay uốn cong tròn phía trước ngực.',
      studentAction: 'Vung ngón tay vẽ một vòng tròn to.',
      iconTip: '⭕ Uốn cong tay làm hình tròn'
    },
    toneRecommendation: 'rhythm_chant',
    audioSampleNotes: 'Âm dài /ɜː/ trong /ˈsɜːkl/.'
  },
  {
    id: 'math-10',
    teacherCall: "It's a rectangle.",
    studentResponse: 'Rectangle! Long and short!',
    callIpa: '/ɪts ə ˈrektæŋɡl/',
    responseIpa: '/ˈrektæŋɡl, lɒŋ ænd ʃɔːt/',
    vietnameseTranslation: 'Đó là một hình chữ nhật.',
    context: 'Nhận biết hình chữ nhật với 2 cạnh dài và 2 cạnh ngắn.',
    gradeLevel: 'Lớp 2',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Kéo hai tay sang ngang tạo chiều dài rồi hạ xuống tạo chiều rộng.',
      studentAction: 'Lặp lại động tác vẽ hình chữ nhật.',
      iconTip: '▭ Giăng tay vẽ chiều dài chữ nhật'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Trọng âm rơi vào âm tiết đầu: /ˈrek.tæŋ.ɡl/.'
  },
  {
    id: 'math-11',
    teacherCall: 'Draw a straight line.',
    studentResponse: 'Straight line, done!',
    callIpa: '/drɔː ə streɪt laɪn/',
    responseIpa: '/streɪt laɪn, dʌn/',
    vietnameseTranslation: 'Vẽ một đường thẳng.',
    context: 'Hoạt động thực hành vẽ hình và đoạn thẳng trên bảng con hoặc vở bài tập.',
    gradeLevel: 'Lớp 2',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Cầm thước kẻ đưa thẳng từ trái qua phải.',
      studentAction: 'Cầm thước kẻ và vạch một đường thẳng trên bảng con.',
      iconTip: '📏 Đặt thước kẻ đường thẳng'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Âm /str/ trong "straight" /streɪt/ cần rõ ràng.'
  },
  {
    id: 'math-12',
    teacherCall: 'Which number is bigger?',
    studentResponse: '8 is bigger than 5!',
    callIpa: '/wɪtʃ ˈnʌmbər ɪz ˈbɪɡər/',
    responseIpa: '/eɪt ɪz ˈbɪɡər ðæn faɪv/',
    vietnameseTranslation: 'Số nào lớn hơn?',
    context: 'So sánh hai số trong phạm vi đã học.',
    gradeLevel: 'Lớp 1',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Hai tay dang rộng sang hai bên thể hiện sự to lớn.',
      studentAction: 'Giơ cao tay phía số lớn hơn.',
      iconTip: '👐 Dang rộng tay biểu thị số lớn'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Nhấn rõ từ "bigger" /ˈbɪɡər/.'
  },
  {
    id: 'math-13',
    teacherCall: 'Which number is smaller?',
    studentResponse: '3 is smaller than 7!',
    callIpa: '/wɪtʃ ˈnʌmbər ɪz ˈsmɔːlər/',
    responseIpa: '/θriː ɪz ˈsmɔːlər ðæn ˈsevn/',
    vietnameseTranslation: 'Số nào nhỏ hơn?',
    context: 'So sánh hai số nhỏ hơn.',
    gradeLevel: 'Lớp 1',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Chụm ngón cái và ngón trỏ sát nhau biểu thị sự nhỏ bé.',
      studentAction: 'Chụm ngón tay và chỉ vào số nhỏ.',
      iconTip: '🤏 Chụm ngón tay biểu thị số nhỏ'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Âm dài /ɔː/ trong "smaller" /ˈsmɔːlər/.'
  },
  {
    id: 'math-14',
    teacherCall: 'Read the math problem.',
    studentResponse: 'Reading together now!',
    callIpa: '/riːd ðə mæθ ˈprɒbləm/',
    responseIpa: '/ˈriːdɪŋ təˈɡeðər naʊ/',
    vietnameseTranslation: 'Đọc đề bài toán.',
    context: 'Hướng dẫn làm bài tập có lời văn — Yêu cầu học sinh đọc kỹ đề bài trước khi giải.',
    gradeLevel: 'Lớp 3',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Mở hai bàn tay như trang sách và chỉ mắt nhìn vào.',
      studentAction: 'Cùng mở sách và đọc to đề bài.',
      iconTip: '📖 Mở bàn tay như quyển sách'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Âm thổi /θ/ trong "math" /mæθ/.'
  },
  {
    id: 'math-15',
    teacherCall: 'Who can come to the board?',
    studentResponse: 'Me, teacher! / Pick me please!',
    callIpa: '/huː kæn kʌm tuː ðə bɔːd/',
    responseIpa: '/miː ˈtiːtʃər, pɪk miː pliːz/',
    vietnameseTranslation: 'Ai có thể lên bảng làm bài?',
    context: 'Mời học sinh lên bảng giải toán hoặc đính thẻ số.',
    gradeLevel: 'Lớp 2',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Một tay cầm phấn, một tay đưa mời về phía cả lớp.',
      studentAction: 'Ngồi ngay ngắn, giơ tay đẹp xin lên bảng.',
      iconTip: '🙋 Giơ tay xung phong lên bảng'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Giọng ấm áp, khích lệ tinh thần tự tin của học sinh.'
  },
  {
    id: 'math-16',
    teacherCall: 'Write the answer on your board.',
    studentResponse: 'Writing now, 3, 2, 1, show!',
    callIpa: '/raɪt ði ˈɑːnsər ɒn jɔː bɔːd/',
    responseIpa: '/ˈraɪtɪŋ naʊ, θriː, tuː, wʌn, ʃəʊ/',
    vietnameseTranslation: 'Viết kết quả vào bảng con.',
    context: 'Thực hành làm bài trên bảng con — Hoạt động kiểm tra nhanh mức độ hiểu bài.',
    gradeLevel: 'Lớp 1',
    category: 'Tiếng Anh Môn Toán',
    tprCue: {
      teacherAction: 'Làm động tác cầm bút viết lên lòng bàn tay trái.',
      studentAction: 'Cầm bút dạ viết nhanh kết quả lên bảng con.',
      iconTip: '✍️ Viết nhanh lên bảng con'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Nhấn mạnh từ "Write" và "board".'
  }
];
