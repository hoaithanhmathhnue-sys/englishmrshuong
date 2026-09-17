import { CommandItem } from '../types';

export const INITIAL_COMMANDS: CommandItem[] = [
  {
    id: 'cmd-01',
    teacherCall: '1, 2, 3, eyes on me!',
    studentResponse: '1, 2, eyes on you!',
    callIpa: '/wʌn, tuː, θriː, aɪz ɒn miː/',
    responseIpa: '/wʌn, tuː, aɪz ɒn juː/',
    vietnameseTranslation: 'Một, hai, ba, mắt nhìn về phía cô! -> Một, hai, mắt nhìn cô!',
    context: 'Dùng khi học sinh đang loay hoay, cần tập trung toàn bộ ánh nhìn lên bảng hoặc về phía giáo viên.',
    gradeLevel: 'Lớp 1',
    category: 'Ổn định & Chú ý',
    tprCue: {
      teacherAction: 'Giơ 3 ngón tay đếm 1-2-3 rồi trỏ 2 ngón tay vào 2 mắt mình.',
      studentAction: 'Giơ 2 ngón tay đếm 1-2 rồi cùng trỏ 2 ngón tay hướng về phía giáo viên.',
      iconTip: '👀 Chỉ tay vào mắt'
    },
    toneRecommendation: 'rhythm_chant',
    audioSampleNotes: 'Nhấn rõ các số đếm 1-2-3 và ngân cao từ "me"!'
  },
  {
    id: 'cmd-02',
    teacherCall: 'Flat tire, shhh...',
    studentResponse: 'Shhhhh...',
    callIpa: '/flæt ˈtaɪər, ʃʃʃ.../',
    responseIpa: '/ʃʃʃʃʃ.../',
    vietnameseTranslation: 'Xe bị thủng lốp rồi, xì xì... -> Xì xì xì...',
    context: 'Dùng để hạ nhiệt tiếng ồn trong lớp sau hoạt động trò chơi sôi nổi một cách vui vẻ, không cáu gắt.',
    gradeLevel: 'Lớp 1',
    category: 'Ổn định & Chú ý',
    tprCue: {
      teacherAction: 'Giơ hai tay cuộn tròn như bánh xe rồi từ từ hạ người xẹp xuống làm động tác xì hơi.',
      studentAction: 'Tất cả học sinh cùng đưa ngón tay lên môi làm "Shhh" và từ từ ngồi ngay ngắn lại.',
      iconTip: '🤫 Ngón tay lên môi'
    },
    toneRecommendation: 'calm_whisper',
    audioSampleNotes: 'Giọng từ to rồi thì thầm dần ở âm "shhh" kéo dài.'
  },
  {
    id: 'cmd-03',
    teacherCall: 'Hands on top...',
    studentResponse: 'That means stop!',
    callIpa: '/hændz ɒn tɒp/',
    responseIpa: '/ðæt miːnz stɒp/',
    vietnameseTranslation: 'Đặt hai tay lên đầu... -> Nghĩa là dừng lại ngay!',
    context: 'Dùng khi học sinh đang làm việc nhóm/vẽ tranh/chơi đồ chơi mà cô cần tất cả dừng tay ngay lập tức.',
    gradeLevel: 'Lớp 2',
    category: 'Ổn định & Chú ý',
    tprCue: {
      teacherAction: 'Đặt úp hai bàn tay lên đỉnh đầu.',
      studentAction: 'Lập tức buông bút/đồ dùng học tập và đồng thanh đặt hai tay lên đầu.',
      iconTip: '🙆 Đặt 2 tay lên đầu'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Nhấn dứt khoát âm cuối "stop" /stɒp/!'
  },
  {
    id: 'cmd-04',
    teacherCall: 'Hocus pocus...',
    studentResponse: 'Everybody focus!',
    callIpa: '/ˈhəʊkəs ˈpəʊkəs/',
    responseIpa: '/ˈevrɪbɒdi ˈfəʊkəs/',
    vietnameseTranslation: 'Úm ba la xì bùa... -> Tất cả cùng tập trung!',
    context: 'Câu thần chú vui nhộn đánh thức sự chú ý của học sinh trước khi giao bài tập mới.',
    gradeLevel: 'Lớp 2',
    category: 'Chants vần điệu',
    tprCue: {
      teacherAction: 'Vung hai tay múa vờ làm động tác phù thủy niệm thần chú rồi trỏ nhẹ về cả lớp.',
      studentAction: 'Khoanh tay ngay ngắn trước ngực, mắt nhìn thẳng vào cô.',
      iconTip: '✨ Múa tay phù thủy'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Giọng vui tươi, nhịp điệu nảy tưng bừng.'
  },
  {
    id: 'cmd-05',
    teacherCall: 'Show me your red pencil!',
    studentResponse: 'Here it is!',
    callIpa: '/ʃəʊ miː jɔː red ˈpensl/',
    responseIpa: '/hɪər ɪt ɪz/',
    vietnameseTranslation: 'Cho cô xem bút chì màu đỏ của các con nào! -> Nó ở đây ạ!',
    context: 'Kiểm tra đồ dùng học tập trước khi bắt đầu phần thực hành tô màu hoặc gạch chân từ vựng.',
    gradeLevel: 'Lớp 1',
    category: 'Chuyển tiết & Đồ dùng',
    tprCue: {
      teacherAction: 'Giơ một cây bút đỏ lên cao và quan sát khắp lượt học sinh.',
      studentAction: 'Cầm bút màu đỏ giơ lên ngang trán và hô vang "Here it is!".',
      iconTip: '✏️ Giơ bút lên cao'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Lên giọng tự nhiên ở cụm "red pencil!".'
  },
  {
    id: 'cmd-06',
    teacherCall: 'Good job, good job!',
    studentResponse: 'You did it, superstar!',
    callIpa: '/ɡʊd dʒɒb, ɡʊd dʒɒb/',
    responseIpa: '/juː dɪd ɪt, ˈsuːpəstɑːr/',
    vietnameseTranslation: 'Làm tốt lắm, làm tốt lắm! -> Bạn đã làm được rồi, siêu sao!',
    context: 'Cả lớp cùng vỗ tay khen thưởng một bạn hoặc một đội vừa trả lời đúng câu hỏi khó.',
    gradeLevel: 'Lớp 3',
    category: 'Khen thưởng & Sao vàng',
    tprCue: {
      teacherAction: 'Giơ 2 ngón tay cái (Thumbs up) và lắc nhẹ theo nhịp điệu.',
      studentAction: 'Vỗ tay 2 cái rồi chỉ 2 ngón tay cái về phía bạn được khen thưởng.',
      iconTip: '👍 Thumbs up khen ngợi'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Giọng phấn khởi, hào hứng tối đa để tạo cảm hứng!'
  },
  {
    id: 'cmd-07',
    teacherCall: 'Are you ready?',
    studentResponse: "Yes, I'm ready!",
    callIpa: '/ɑːr juː ˈredi/',
    responseIpa: '/jes, aɪm ˈredi/',
    vietnameseTranslation: 'Các con đã sẵn sàng chưa? -> Dạ rồi, con đã sẵn sàng!',
    context: 'Khởi động trước mỗi trò chơi, hoạt động nhóm hoặc phần kiểm tra nhanh kiến thức.',
    gradeLevel: 'Lớp 1',
    category: 'Chants vần điệu',
    tprCue: {
      teacherAction: 'Cúi nhẹ người về phía trước, hai tay gập khuỷu ngang ngực như vận động viên sẵn sàng xuất phát.',
      studentAction: 'Bật nhảy nhẹ tại chỗ hoặc vỗ tay 1 nhịp dứt khoát.',
      iconTip: '⚡ Tư thế xuất phát'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Lên giọng ở cuối câu hỏi "ready?"'
  },
  {
    id: 'cmd-08',
    teacherCall: 'Zip your lips...',
    studentResponse: 'Lock and key, click!',
    callIpa: '/zɪp jɔː lɪps/',
    responseIpa: '/lɒk ənd kiː, klɪk/',
    vietnameseTranslation: 'Kéo khóa miệng lại nào... -> Khóa lại và cất chìa, cạch!',
    context: 'Ổn định trật tự lớp 1 và lớp 2 khi các em đang mải nói chuyện riêng trong giờ học.',
    gradeLevel: 'Lớp 1',
    category: 'Ổn định & Chú ý',
    tprCue: {
      teacherAction: 'Dùng ngón cái và ngón trỏ làm động tác kéo dây khóa ngang qua môi.',
      studentAction: 'Làm động tác khóa miệng và vặn chìa khóa rồi giả vờ bỏ chìa vào túi áo.',
      iconTip: '🤐 Kéo khóa miệng'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Nói rõ âm bật /k/ ở từ "click" tạo âm thanh sinh động.'
  },
  {
    id: 'cmd-09',
    teacherCall: 'Clean up, clean up...',
    studentResponse: 'Everybody, everywhere!',
    callIpa: '/kliːn ʌp, kliːn ʌp/',
    responseIpa: '/ˈevrɪbɒdi, ˈevrɪweər/',
    vietnameseTranslation: 'Dọn dẹp nào, dọn dẹp nào... -> Mọi người cùng làm ở khắp mọi nơi!',
    context: 'Kết thúc hoạt động làm đồ dùng thủ công hoặc trước khi chuông tan học reo 5 phút.',
    gradeLevel: 'Lớp 2',
    category: 'Chuyển tiết & Đồ dùng',
    tprCue: {
      teacherAction: 'Vỗ tay theo nhịp 2/4 và chỉ nhẹ vào các khu vực bàn học cần sắp xếp.',
      studentAction: 'Vừa hát theo vừa nhanh chóng cất sách vở, bút sáp màu vào balo.',
      iconTip: '🧹 Động tác dọn dẹp'
    },
    toneRecommendation: 'rhythm_chant',
    audioSampleNotes: 'Hát vần điệu vui tươi, tốc độ vừa phải.'
  },
  {
    id: 'cmd-10',
    teacherCall: 'Give me five!',
    studentResponse: '1 - 2 - 3 - 4 - 5!',
    callIpa: '/ɡɪv miː faɪv/',
    responseIpa: '/wʌn, tuː, θriː, fɔːr, faɪv/',
    vietnameseTranslation: 'Quy tắc 5 điều lắng nghe! -> 1-2-3-4-5!',
    context: 'Nhắc lại 5 nguyên tắc tập trung: Mắt nhìn, Tai nghe, Miệng im lặng, Tay để trên bàn, Chân để ngay ngắn.',
    gradeLevel: 'Lớp 4',
    category: 'Ổn định & Chú ý',
    tprCue: {
      teacherAction: 'Xòe bàn tay 5 ngón lên cao trước ngực.',
      studentAction: 'Cùng xòe tay đếm từ 1 đến 5 rồi đặt tay lên bàn.',
      iconTip: '🖐️ Bàn tay 5 ngón'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Đếm từng số chậm rãi, rõ ràng từng nhịp.'
  },
  {
    id: 'cmd-11',
    teacherCall: 'Macaroni and cheese...',
    studentResponse: 'Everybody freeze!',
    callIpa: '/ˌmækəˈrəʊni ənd tʃiːz/',
    responseIpa: '/ˈevrɪbɒdi friːz/',
    vietnameseTranslation: 'Mì nui phô mai... -> Tất cả đứng bất động!',
    context: 'Trò chơi đóng băng chuyển trạng thái sau giờ nhảy hát múa sôi nổi.',
    gradeLevel: 'Lớp 3',
    category: 'Trò chơi & Ghép nhóm',
    tprCue: {
      teacherAction: 'Giơ 2 tay lên cao rồi bất ngờ giữ nguyên tư thế không cử động.',
      studentAction: 'Đứng yên như tượng như đang bị đóng băng trong 3 giây.',
      iconTip: '🧊 Đứng yên đóng băng'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Nhấn mạnh từ "freeze" kéo dài âm /z/.'
  },
  {
    id: 'cmd-12',
    teacherCall: 'To infinity...',
    studentResponse: 'And beyond!',
    callIpa: '/tuː ɪnˈfɪnəti/',
    responseIpa: '/ənd bɪˈjɒnd/',
    vietnameseTranslation: 'Vươn tới vô cực... -> Và xa hơn nữa!',
    context: 'Cổ vũ học sinh giải bài tập thử thách nâng cao hoặc khích lệ tinh thần cả lớp.',
    gradeLevel: 'Lớp 5',
    category: 'Khen thưởng & Sao vàng',
    tprCue: {
      teacherAction: 'Giơ một nắm tay hướng chéo lên bầu trời như siêu nhân.',
      studentAction: 'Cùng giơ tay bay lên và hô to câu đáp "And beyond!".',
      iconTip: '🚀 Phi thuyền bay cao'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Âm điệu hào hùng, phóng khoáng mang tinh thần khám phá.'
  },
  {
    id: 'cmd-13',
    teacherCall: 'Find a partner, 3-2-1!',
    studentResponse: 'Here we are, let’s have fun!',
    callIpa: '/faɪnd ə ˈpɑːtnər, θriː tuː wʌn/',
    responseIpa: '/hɪər wiː ɑːr, lets hæv fʌn/',
    vietnameseTranslation: 'Tìm bạn cùng cặp trong 3-2-1! -> Chúng mình đây rồi, cùng vui nào!',
    context: 'Chia lớp thành các cặp đôi để thực hành hội thoại tiếng Anh trong 5 giây.',
    gradeLevel: 'Lớp 3',
    category: 'Trò chơi & Ghép nhóm',
    tprCue: {
      teacherAction: 'Hai bàn tay đan nhẹ vào nhau mô phỏng đôi bạn.',
      studentAction: 'Học sinh quay sang bạn cạnh bàn bắt tay hoặc chạm khuỷu tay nhau.',
      iconTip: '🤝 Ghép đôi bạn học'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Tốc độ nhanh, tạo không khí hào hứng ghép đôi.'
  },
  {
    id: 'cmd-14',
    teacherCall: 'Mirror, mirror on the wall...',
    studentResponse: 'We are listening to your call!',
    callIpa: '/ˈmɪrər, ˈmɪrər ɒn ðə wɔːl/',
    responseIpa: '/wiː ɑːr ˈlɪsnɪŋ tuː jɔː kɔːl/',
    vietnameseTranslation: 'Gương kia ngự ở trên tường... -> Chúng con đang lắng nghe cô gọi!',
    context: 'Lấy lại sự tập trung khi học sinh đang phân tán tư tưởng trong tiết học buổi chiều.',
    gradeLevel: 'Lớp 4',
    category: 'Chants vần điệu',
    tprCue: {
      teacherAction: 'Hai bàn tay tạo thành hình tròn trước mặt như chiếc gương soi.',
      studentAction: 'Đặt 1 tay lên vành tai làm động tác tập trung lắng nghe.',
      iconTip: '🪞 Soi gương lắng nghe'
    },
    toneRecommendation: 'rhythm_chant',
    audioSampleNotes: 'Giọng du dương, ngân vang vần "wall" và "call".'
  },
  {
    id: 'cmd-15',
    teacherCall: 'Who wants to try?',
    studentResponse: 'Pick me, please! I will try!',
    callIpa: '/huː wɒnts tuː traɪ/',
    responseIpa: '/pɪk miː, pliːz! aɪ wɪl traɪ/',
    vietnameseTranslation: 'Ai muốn xung phong lên thử nào? -> Cô chọn con đi ạ! Con sẽ cố gắng!',
    context: 'Kêu gọi học sinh xung phong lên bảng đọc bài hoặc trả lời câu hỏi mẫu.',
    gradeLevel: 'Lớp 2',
    category: 'Hỏi - Đáp',
    tprCue: {
      teacherAction: 'Mở rộng hai lòng bàn tay hướng về phía học sinh với ánh mắt khích lệ.',
      studentAction: 'Ngồi thẳng lưng, giơ thẳng một cánh tay lên cao với nụ cười tự tin.',
      iconTip: '🙋 Giơ tay xung phong'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Ngữ điệu mời gọi, không gây áp lực cho các bạn nhút nhát.'
  },
  {
    id: 'cmd-16',
    teacherCall: 'Ready to switch?',
    studentResponse: 'Switch, switch, change!',
    callIpa: '/ˈredi tuː swɪtʃ/',
    responseIpa: '/swɪtʃ, swɪtʃ, tʃeɪndʒ/',
    vietnameseTranslation: 'Sẵn sàng đổi vai/đổi chỗ chưa? -> Đổi, đổi, chuyển nào!',
    context: 'Đổi vai người hỏi - người trả lời trong hoạt động Pair Work hoặc Role-play.',
    gradeLevel: 'Lớp 4',
    category: 'Trò chơi & Ghép nhóm',
    tprCue: {
      teacherAction: 'Xoay hai cổ tay quanh nhau theo vòng tròn mô phỏng sự luân chuyển.',
      studentAction: 'Đổi phiếu bài tập hoặc quay ghế đổi lượt nói cho bạn bên cạnh.',
      iconTip: '🔄 Xoay vòng đổi vai'
    },
    toneRecommendation: 'rhythm_chant',
    audioSampleNotes: 'Âm bật /tʃ/ ở "switch" và /dʒ/ ở "change" rõ ràng.'
  },
  {
    id: 'cmd-17',
    teacherCall: 'Holy moly...',
    studentResponse: 'Guacamole!',
    callIpa: '/ˈhəʊli ˈməʊli/',
    responseIpa: '/ˌɡwækəˈməʊli/',
    vietnameseTranslation: 'Ôi trời đất ơi... -> Sốt bơ thơm ngon!',
    context: 'Câu khẩu lệnh vui nhộn quốc tế giúp xua tan cảm giác buồn ngủ trong tiết học.',
    gradeLevel: 'Lớp 3',
    category: 'Chants vần điệu',
    tprCue: {
      teacherAction: 'Đặt 2 tay ôm má vờ ngạc nhiên vui vẻ.',
      studentAction: 'Cười tươi và làm động tác khuấy bát xốt thơm lừng.',
      iconTip: '🥑 Ôm má ngạc nhiên'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Hài hước, giọng nảy vui vẻ theo điệu nhạc.'
  },
  {
    id: 'cmd-18',
    teacherCall: 'Voices off in 3, 2, 1...',
    studentResponse: 'Zip!',
    callIpa: '/ˈvɔɪsɪz ɒf ɪn θriː tuː wʌn/',
    responseIpa: '/zɪp/',
    vietnameseTranslation: 'Tắt giọng nói trong 3, 2, 1... -> Khóa lại!',
    context: 'Đếm ngược nhanh để cả lớp chuyển sang trạng thái nghe hướng dẫn làm bài thi/bài kiểm tra.',
    gradeLevel: 'Lớp 5',
    category: 'Ổn định & Chú ý',
    tprCue: {
      teacherAction: 'Đếm ngược bằng ngón tay 3, 2, 1 rồi khép bàn tay lại thành nắm đấm.',
      studentAction: 'Dừng hoàn toàn nói chuyện, đặt bút xuống bàn.',
      iconTip: '🔇 Khép nắm tay'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Giọng dứt khoát, điềm tĩnh, không cần quát to.'
  },
  {
    id: 'cmd-19',
    teacherCall: 'Catch the bubble!',
    studentResponse: 'Pop! (Hold the air in cheeks)',
    callIpa: '/kætʃ ðə ˈbʌbl/',
    responseIpa: '/pɒp/',
    vietnameseTranslation: 'Bắt lấy quả bóng xà phòng nào! -> Bụp! (Phồng má giữ hơi im lặng)',
    context: 'Rất hiệu quả cho học sinh Lớp 1 khi xếp hàng di chuyển ra sân thể dục hoặc phòng Tin học.',
    gradeLevel: 'Lớp 1',
    category: 'Ổn định & Chú ý',
    tprCue: {
      teacherAction: 'Làm động tác chộp lấy bong bóng trên không và đưa lên miệng phồng má.',
      studentAction: 'Tất cả học sinh chộp bóng và phồng má giữ không khí trong miệng để giữ trật tự tuyệt đối.',
      iconTip: '🫧 Phồng má ngậm hơi'
    },
    toneRecommendation: 'calm_whisper',
    audioSampleNotes: 'Âm thanh ngộ nghĩnh, biến kỷ luật thành trò chơi thú vị.'
  },
  {
    id: 'cmd-20',
    teacherCall: 'Pack your bags, time to go!',
    studentResponse: 'Bye bye teacher, see you tomorrow!',
    callIpa: '/pæk jɔː bæɡz, taɪm tuː ɡəʊ/',
    responseIpa: '/baɪ baɪ ˈtiːtʃər, siː juː təˈmɒrəʊ/',
    vietnameseTranslation: 'Cất đồ vào cặp, đã đến giờ về rồi! -> Tạm biệt cô giáo, hẹn gặp cô ngày mai!',
    context: 'Khẩu lệnh kết thúc buổi học, chào tạm biệt văn minh và an toàn.',
    gradeLevel: 'Lớp 2',
    category: 'Chuyển tiết & Đồ dùng',
    tprCue: {
      teacherAction: 'Vẫy tay chào thân thiện với nụ cười ấm áp.',
      studentAction: 'Khoác balo và vẫy hai tay chào lại giáo viên trước khi bước ra cửa.',
      iconTip: '👋 Vẫy tay tạm biệt'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Ấm áp, tràn đầy tình cảm yêu thương học trò.'
  },
  {
    id: 'cmd-21',
    teacherCall: 'High five, give me ten!',
    studentResponse: 'We are learning English again!',
    callIpa: '/haɪ faɪv, ɡɪv miː ten/',
    responseIpa: '/wiː ɑːr ˈlɜːnɪŋ ˈɪŋɡlɪʃ əˈɡen/',
    vietnameseTranslation: 'Đập tay 5 cái, đập tay 10 cái! -> Chúng mình lại được học tiếng Anh rồi!',
    context: 'Mở đầu tiết học tiếng Anh để tạo tâm thế háo hức, tràn ngập năng lượng.',
    gradeLevel: 'Lớp 3',
    category: 'Khen thưởng & Sao vàng',
    tprCue: {
      teacherAction: 'Giơ hai bàn tay lên cao và làm động tác High-five trong không khí.',
      studentAction: 'Chạm tay vào không khí cùng hướng với cô và reo vui.',
      iconTip: '🙌 High five 10 ngón'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Hào hứng, nụ cười rạng rỡ.'
  },
  {
    id: 'cmd-22',
    teacherCall: 'Open your books to page ten!',
    studentResponse: 'Page ten, ready now!',
    callIpa: '/ˈəʊpən jɔː bʊks tuː peɪdʒ ten/',
    responseIpa: '/peɪdʒ ten, ˈredi naʊ/',
    vietnameseTranslation: 'Mở sách giáo khoa trang số 10 nào! -> Trang số 10, con sẵn sàng rồi!',
    context: 'Chỉ dẫn trang sách rõ ràng, tránh việc học sinh hỏi đi hỏi lại "Trang bao nhiêu ạ cô?".',
    gradeLevel: 'Lớp 3',
    category: 'Chuyển tiết & Đồ dùng',
    tprCue: {
      teacherAction: 'Mở rộng 2 lòng bàn tay như cuốn sách và giơ 10 ngón tay minh họa số trang.',
      studentAction: 'Lật sách tìm đúng trang và giơ ngón tay trỏ vào đầu trang sách.',
      iconTip: '📖 Mở trang sách'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Nhấn mạnh số trang "page ten" hai lần để học sinh nắm rõ.'
  },
  {
    id: 'cmd-23',
    teacherCall: 'Can you hear me at the back?',
    studentResponse: 'Loud and clear, no matter what!',
    callIpa: '/kæn juː hɪər miː æt ðə bæk/',
    responseIpa: '/laʊd ənd klɪər, nəʊ ˈmætər wɒt/',
    vietnameseTranslation: 'Các bạn ngồi bàn cuối có nghe rõ cô nói không? -> Rõ ràng và rành mạch ạ!',
    context: 'Kiểm tra âm thanh micro và mức độ phủ sóng giọng nói khắp phòng học lớn.',
    gradeLevel: 'Lớp 5',
    category: 'Hỏi - Đáp',
    tprCue: {
      teacherAction: 'Đặt bàn tay khum nhẹ sau tai và hướng ánh mắt về các bàn cuối lớp.',
      studentAction: 'Các học sinh ngồi cuối giơ biểu tượng OK bằng ngón tay.',
      iconTip: '👂 Lắng nghe cuối lớp'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Âm vực mở, nói to ấm áp.'
  },
  {
    id: 'cmd-24',
    teacherCall: 'Line up quietly by the door!',
    studentResponse: 'Straight line, feet on the floor!',
    callIpa: '/laɪn ʌp ˈkwaɪətli baɪ ðə dɔːr/',
    responseIpa: '/streɪt laɪn, fiːt ɒn ðə flɔːr/',
    vietnameseTranslation: 'Xếp hàng ngay ngắn bên cửa nào! -> Hàng thẳng tắp, chân bước đều!',
    context: 'Tập hợp học sinh xếp hàng di chuyển đến phòng chức năng hoặc ăn bán trú.',
    gradeLevel: 'Lớp 2',
    category: 'Ổn định & Chú ý',
    tprCue: {
      teacherAction: 'Dùng một cánh tay duỗi thẳng chỉ hướng đường thẳng từ bàn ra cửa lớp.',
      studentAction: 'Đứng lên không kéo lê bàn ghế, xếp thành một hàng dọc trật tự.',
      iconTip: '🚶 Xếp hàng thẳng'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Dứt khoát, điềm tĩnh, nhịp điệu đều đặn.'
  }
];

import { MATH_COMMANDS } from './mathCommandsData';
import { COLLEAGUE_COMMANDS } from './colleagueCommandsData';
import { VocabCategory } from '../types';

// Gán cờ 10 câu bắt buộc trong tháng cho 10 câu đầu tiên
INITIAL_COMMANDS.slice(0, 10).forEach(cmd => {
  cmd.isMonthlyRequired = true;
});

// 12 câu Daily Communication: Teacher - Students theo ảnh đề án trường
export const DAILY_COMMUNICATION_APP_COMMANDS: CommandItem[] = [
  {
    id: 'cmd-dc-01',
    teacherCall: 'Do you understand?',
    studentResponse: 'Yes, I do! / Not yet.',
    callIpa: '/duː juː ˌʌndəˈstænd/',
    responseIpa: '/jes, aɪ duː/',
    vietnameseTranslation: 'Các con có hiểu bài không? -> Dạ chúng con hiểu rồi ạ / Dạ chưa ạ.',
    context: 'Kiểm tra mức độ tiếp thu bài của học sinh trước khi chuyển sang nội dung mới.',
    gradeLevel: 'All',
    category: 'Hỏi - Đáp',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Nghiêng đầu nhẹ, hai tay mở rộng hướng về học sinh thăm dò.',
      studentAction: 'Gật đầu tự tin hoặc giơ tay nếu cần cô giải thích lại.',
      iconTip: '🤔 Nghiêng đầu thăm dò'
    },
    toneRecommendation: 'calm_whisper',
    audioSampleNotes: 'Giọng ân cần, lên giọng ở cuối câu hỏi.'
  },
  {
    id: 'cmd-dc-02',
    teacherCall: 'Can you repeat?',
    studentResponse: 'Yes, teacher!',
    callIpa: '/kæn juː rɪˈpiːt/',
    responseIpa: '/jes, ˈtiːtʃər/',
    vietnameseTranslation: 'Con có thể nhắc lại câu đó được không? -> Dạ được ạ.',
    context: 'Khuyến khích học sinh lặp lại câu vừa nghe để luyện phát âm và ngữ điệu.',
    gradeLevel: 'All',
    category: 'Hỏi - Đáp',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Khum nhẹ bàn tay bên tai ra hiệu lắng nghe.',
      studentAction: 'Đứng dậy hoặc ngồi thẳng nhắc lại rõ ràng.',
      iconTip: '🔁 Khum tay lắng nghe'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Nhẹ nhàng, khuyến khích sự tự tin.'
  },
  {
    id: 'cmd-dc-03',
    teacherCall: 'Anything else?',
    studentResponse: "That's all, teacher! / One more idea!",
    callIpa: '/ˈeniθɪŋ els/',
    responseIpa: '/ðæts ɔːl, ˈtiːtʃər/',
    vietnameseTranslation: 'Còn gì nữa không nào các con? / Có ai bổ sung thêm không? -> Dạ hết rồi ạ cô!',
    context: 'Mở rộng câu trả lời, khơi gợi học sinh tư duy sâu hơn.',
    gradeLevel: 'All',
    category: 'Hỏi - Đáp',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Hai bàn tay mở ngửa ra phía trước đón nhận ý kiến mới.',
      studentAction: 'Giơ tay nếu muốn bổ sung ý tưởng.',
      iconTip: '➕ Mở tay đón nhận'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Hào hứng, kích thích sự tò mò.'
  },
  {
    id: 'cmd-dc-04',
    teacherCall: 'Who else?',
    studentResponse: 'Me, teacher! / Let me try!',
    callIpa: '/huː els/',
    responseIpa: '/miː, ˈtiːtʃər/',
    vietnameseTranslation: 'Còn ai khác nữa không nào? / Ai xung phong nào? -> Em thưa cô/thầy!',
    context: 'Kêu gọi tinh thần xung phong từ các học sinh nhút nhát hoặc chưa phát biểu.',
    gradeLevel: 'All',
    category: 'Hỏi - Đáp',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Mỉm cười đảo mắt nhìn khắp lớp, đưa tay mời gọi.',
      studentAction: 'Hào hứng giơ tay "Me, teacher!".',
      iconTip: '🙋‍♂️ Mời gọi xung phong'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Ấm áp, thân thiện, tạo sự khích lệ.'
  },
  {
    id: 'cmd-dc-05',
    teacherCall: 'Can you say it in English?',
    studentResponse: 'Yes, I can!',
    callIpa: '/kæn juː seɪ ɪt ɪn ˈɪŋɡlɪʃ/',
    responseIpa: '/jes, aɪ kæn/',
    vietnameseTranslation: 'Con có thể nói câu đó bằng tiếng Anh được không? -> Dạ được ạ!',
    context: 'Nhắc nhở nhẹ nhàng giúp học sinh chuyển sang giao tiếp bằng tiếng Anh trong lớp.',
    gradeLevel: 'All',
    category: 'Hỏi - Đáp',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Trỏ nhẹ ngón tay vào tai và miệng mỉm cười động viên.',
      studentAction: 'Tự tin dịch câu vừa nói sang tiếng Anh.',
      iconTip: '🇬🇧 Động viên nói tiếng Anh'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Ngọt ngào, không gây áp lực cho học sinh.'
  },
  {
    id: 'cmd-dc-06',
    teacherCall: 'What do you think?',
    studentResponse: 'I think it is great! / I agree.',
    callIpa: '/wɒt duː juː θɪŋk/',
    responseIpa: '/aɪ θɪŋk ɪt ɪz ɡreɪt/',
    vietnameseTranslation: 'Con nghĩ thế nào về điều này? -> Con nghĩ điều này thật tuyệt vời!',
    context: 'Rèn luyện thói quen tự suy nghĩ, bày tỏ chính kiến và tư duy phản biện.',
    gradeLevel: 'All',
    category: 'Hỏi - Đáp',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Đặt ngón trỏ lên thái dương suy nghĩ rồi hướng về học sinh.',
      studentAction: 'Học sinh trình bày suy nghĩ của mình.',
      iconTip: '🧠 Đặt tay lên thái dương'
    },
    toneRecommendation: 'calm_whisper',
    audioSampleNotes: 'Trầm ấm, khuyến khích suy ngẫm.'
  },
  {
    id: 'cmd-dc-07',
    teacherCall: "Thank you so much/-You're welcome.",
    studentResponse: "You're welcome!",
    callIpa: '/θæŋk juː səʊ mʌtʃ/',
    responseIpa: '/jɔː ˈwelkəm/',
    vietnameseTranslation: 'Cảm ơn con rất nhiều! -> Dạ không có gì ạ!',
    context: 'Xây dựng văn hóa giao tiếp biết ơn và đáp lời lễ phép, thân thiện trong trường học.',
    gradeLevel: 'All',
    category: 'Hỏi - Đáp',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Đặt một bàn tay lên ngực trái gật đầu cảm ơn.',
      studentAction: 'Khoanh tay mỉm cười "You are welcome!".',
      iconTip: '💐 Đặt tay lên ngực'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Ân cần, ấm áp và chân thành.'
  },
  {
    id: 'cmd-dc-08',
    teacherCall: 'Look at the board, please!',
    studentResponse: 'Eyes on the board, teacher!',
    callIpa: '/lʊk æt ðə bɔːd, pliːz/',
    responseIpa: '/aɪz ɒn ðə bɔːd, ˈtiːtʃər/',
    vietnameseTranslation: 'Xin cả lớp hãy nhìn lên bảng nào! -> Mắt nhìn lên bảng ạ!',
    context: 'Kéo toàn bộ sự tập trung của học sinh về phía bài giảng trên bảng lớp.',
    gradeLevel: 'All',
    category: 'Ổn định & Chú ý',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Chỉ hai ngón tay hướng dứt khoát về phía bảng.',
      studentAction: 'Ngồi thẳng lưng, hướng ánh mắt lên bảng đen.',
      iconTip: '👀 Chỉ tay lên bảng'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Dõng dạc, rõ ràng, dứt khoát.'
  },
  {
    id: 'cmd-dc-09',
    teacherCall: 'Come in, please!',
    studentResponse: 'Thank you, teacher!',
    callIpa: '/kʌm ɪn, pliːz/',
    responseIpa: '/θæŋk juː, ˈtiːtʃər/',
    vietnameseTranslation: 'Mời em vào lớp! -> Em cảm ơn cô/thầy ạ!',
    context: 'Cho phép học sinh vào lớp học một cách lịch sự, ấm áp.',
    gradeLevel: 'All',
    category: 'Hỏi - Đáp',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Vẫy nhẹ bàn tay hướng vào trong lớp.',
      studentAction: 'Bước nhẹ nhàng vào chỗ ngồi trật tự.',
      iconTip: '🚪 Vẫy tay mời vào'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Âm sắc ấm áp, chào đón.'
  },
  {
    id: 'cmd-dc-10',
    teacherCall: 'One voice, please!',
    studentResponse: 'Listening ears on! Shhh...',
    callIpa: '/wʌn vɔɪs, pliːz/',
    responseIpa: '/ˈlɪsnɪŋ ɪəz ɒn, ʃʃʃ.../',
    vietnameseTranslation: 'Giữ trật tự, chỉ một người nói thôi nhé! -> Đôi tai lắng nghe, suỵt...',
    context: 'Quản lý trật tự lớp khi thảo luận quá sôi nổi, tôn trọng người đang phát biểu.',
    gradeLevel: 'All',
    category: 'Ổn định & Chú ý',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Giơ 1 ngón trỏ lên cao rồi khẽ đặt lên môi.',
      studentAction: 'Dừng nói chuyện và chăm chú lắng nghe bạn đang phát biểu.',
      iconTip: '🤫 Giơ 1 ngón tay lên môi'
    },
    toneRecommendation: 'strict_gentle',
    audioSampleNotes: 'Điềm tĩnh, uy lực nhẹ nhàng.'
  },
  {
    id: 'cmd-dc-11',
    teacherCall: 'Pay attention, please!',
    studentResponse: 'Yes, teacher! We are ready!',
    callIpa: '/peɪ əˈtenʃn, pliːz/',
    responseIpa: '/jes, ˈtiːtʃər! wiː ɑːr ˈredi/',
    vietnameseTranslation: 'Xin cả lớp hãy chú ý! / Tập trung nào các con! -> Dạ vâng, chúng con sẵn sàng rồi ạ!',
    context: 'Thu hút sự chú ý khi chuyển phần bài giảng hoặc thông báo quan trọng.',
    gradeLevel: 'All',
    category: 'Ổn định & Chú ý',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Vỗ tay 2 nhịp rồi đứng nghiêm trang nhìn quanh lớp.',
      studentAction: 'Ngồi ngay ngắn, hai tay để lên bàn.',
      iconTip: '📢 Vỗ tay 2 nhịp chú ý'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Dứt khoát, âm vực cao vừa phải, truyền cảm hứng.'
  },
  {
    id: 'cmd-dc-12',
    teacherCall: 'Have you finished?',
    studentResponse: 'Yes, I have! / Not yet, teacher!',
    callIpa: '/hæv juː ˈfɪnɪʃt/',
    responseIpa: '/jes, aɪ hæv/',
    vietnameseTranslation: 'Các con đã làm xong bài chưa? -> Dạ xong rồi ạ / Dạ chưa ạ!',
    context: 'Kiểm tra tốc độ hoàn thành bài tập của cả lớp để chuyển hoạt động.',
    gradeLevel: 'All',
    category: 'Hỏi - Đáp',
    vocabCategory: 'Daily Communication',
    tprCue: {
      teacherAction: 'Chỉ tay vào đồng hồ hoặc giơ hai tay hỏi han.',
      studentAction: 'Giơ ngón cái (Thumbs up) nếu đã xong, hoặc tiếp tục viết nếu chưa xong.',
      iconTip: '⏱️ Thăm dò tiến độ'
    },
    toneRecommendation: 'energetic',
    audioSampleNotes: 'Hào hứng, tạo nhịp độ học tập nhanh nhẹn.'
  }
];

// Toàn bộ thư viện câu lệnh tích hợp đầy đủ K-5, Môn Toán, Đồng nghiệp và Daily Communication
export const ALL_APP_COMMANDS: CommandItem[] = [
  ...INITIAL_COMMANDS,
  ...DAILY_COMMUNICATION_APP_COMMANDS,
  ...MATH_COMMANDS,
  ...COLLEAGUE_COMMANDS
];

// === vocabdaily.lklprimaryschool: Mapping 4 nhóm chính theo DOCX ===
const VOCAB_CATEGORY_MAP: Record<string, VocabCategory> = {
  // 🌅 Greeting & Starting — Chào hỏi, khởi động, tạo năng lượng đầu tiết
  'cmd-07': 'Greeting & Starting',   // Are you ready?
  'cmd-04': 'Greeting & Starting',   // Hocus pocus
  'cmd-21': 'Greeting & Starting',   // High five, give me ten!
  'cmd-14': 'Greeting & Starting',   // Mirror, mirror on the wall
  'cmd-17': 'Greeting & Starting',   // Holy moly
  'cmd-11': 'Greeting & Starting',   // Macaroni and cheese

  // 📚 Classroom Instructions — Ổn định, chú ý, quản lý lớp, đồ dùng
  'cmd-01': 'Classroom Instructions', // 1,2,3 eyes on me
  'cmd-02': 'Classroom Instructions', // Flat tire shhh
  'cmd-03': 'Classroom Instructions', // Hands on top
  'cmd-05': 'Classroom Instructions', // Show me your red pencil
  'cmd-08': 'Classroom Instructions', // Zip your lips
  'cmd-10': 'Classroom Instructions', // Give me five
  'cmd-18': 'Classroom Instructions', // Voices off in 3,2,1
  'cmd-19': 'Classroom Instructions', // Catch the bubble
  'cmd-22': 'Classroom Instructions', // Open your books to page ten
  'cmd-24': 'Classroom Instructions', // Line up quietly by the door
  'cmd-09': 'Classroom Instructions', // Clean up, clean up

  // ⭐ Praise & Encouragement — Khen thưởng, động viên
  'cmd-06': 'Praise & Encouragement', // Good job, good job!
  'cmd-12': 'Praise & Encouragement', // To infinity and beyond

  // 💬 Daily Communication — Giao tiếp hàng ngày, hỏi đáp, chia nhóm, kết thúc
  'cmd-13': 'Daily Communication',    // Find a partner
  'cmd-15': 'Daily Communication',    // Who wants to try?
  'cmd-16': 'Daily Communication',    // Ready to switch?
  'cmd-20': 'Daily Communication',    // Pack your bags, time to go
  'cmd-23': 'Daily Communication',    // Can you hear me at the back?
};

// Math commands → Classroom Instructions
MATH_COMMANDS.forEach(cmd => {
  VOCAB_CATEGORY_MAP[cmd.id] = 'Classroom Instructions';
});

// Colleague commands → Daily Communication
COLLEAGUE_COMMANDS.forEach(cmd => {
  VOCAB_CATEGORY_MAP[cmd.id] = 'Daily Communication';
});

// Daily communication Teacher-Students commands → Daily Communication
DAILY_COMMUNICATION_APP_COMMANDS.forEach(cmd => {
  VOCAB_CATEGORY_MAP[cmd.id] = 'Daily Communication';
});

// Apply vocabCategory to all commands
ALL_APP_COMMANDS.forEach(cmd => {
  cmd.vocabCategory = VOCAB_CATEGORY_MAP[cmd.id] || 'Classroom Instructions';
});

// Helper: get commands by VocabCategory
export function getCommandsByVocabCategory(category: VocabCategory): CommandItem[] {
  return ALL_APP_COMMANDS.filter(cmd => cmd.vocabCategory === category);
}

// Vocab category metadata for UI
export const VOCAB_CATEGORIES_META = [
  {
    id: 'Greeting & Starting' as VocabCategory,
    icon: '🌅',
    label: 'Greeting & Starting',
    description: 'Start the day with energy!',
    color: 'from-orange-400 to-amber-400',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-900',
  },
  {
    id: 'Classroom Instructions' as VocabCategory,
    icon: '📚',
    label: 'Classroom Instructions',
    description: 'Manage your class effectively',
    color: 'from-blue-400 to-indigo-400',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-900',
  },
  {
    id: 'Praise & Encouragement' as VocabCategory,
    icon: '⭐',
    label: 'Praise & Encouragement',
    description: 'Motivate and inspire students',
    color: 'from-yellow-400 to-amber-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-900',
  },
  {
    id: 'Daily Communication' as VocabCategory,
    icon: '💬',
    label: 'Daily Communication',
    description: 'Everyday phrases for teachers',
    color: 'from-emerald-400 to-teal-400',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-900',
  },
] as const;


