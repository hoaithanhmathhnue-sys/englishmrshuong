import { QuizQuestion } from '../types';

export const MINI_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    situation: 'Bạn muốn cả lớp nhanh chóng dừng tay, buông đồ dùng học tập xuống bàn mà không cần phải gào to:',
    question: 'Khẩu lệnh tiếng Anh sư phạm nào dưới đây là phù hợp và giàu nhịp điệu nhất?',
    options: [
      'Stop touching everything or I will take it away!',
      'Hands on top... (Học sinh: That means stop!)',
      'Be quiet right now, please!',
      'Close your eyes for ten minutes!'
    ],
    correctIndex: 1,
    explanation: '"Hands on top... That means stop!" kết hợp động tác đặt hai tay lên đầu giúp học sinh tự động buông bút/đồ dùng học tập một cách vui vẻ và có phản xạ đồng nhất.'
  },
  {
    id: 'q2',
    situation: 'Khi bạn hô khẩu lệnh: "1, 2, 3, eyes on me!", câu đáp chuẩn hóa của học sinh là gì?',
    question: 'Lời đáp chuẩn hóa (Student Response) của học sinh là:',
    options: [
      '1, 2, eyes on you!',
      'Yes, we are listening to you!',
      'Hello teacher!',
      'Look at the teacher!'
    ],
    correctIndex: 0,
    explanation: 'Quy tắc Call & Response đảo ngược ngôi xưng "eyes on me" -> "eyes on you" với nhịp điệu ngắn gọn 1-2 giúp trẻ phản xạ tức thì trong vòng 1 giây.'
  },
  {
    id: 'q3',
    situation: 'Khẩu lệnh "Catch the bubble!" thường áp dụng hiệu quả nhất với đối tượng nào và cử chỉ TPR tương ứng là gì?',
    question: 'Mục đích và hành động của kỹ thuật "Catch the bubble":',
    options: [
      'Học sinh Lớp 5, giơ tay xung phong làm bài kiểm tra.',
      'Học sinh Lớp 1-2, chộp bóng trong không khí và phồng má giữ hơi im lặng khi xếp hàng.',
      'Học sinh Lớp 4, hát bài đồng dao kết thúc buổi học.',
      'Tất cả học sinh cùng nhảy múa quanh lớp học.'
    ],
    correctIndex: 1,
    explanation: '"Catch the bubble" biến việc giữ trật tự thành trò chơi đóng kịch dễ thương, học sinh phồng má ngậm hơi nên không thể nói chuyện mà không hề cảm thấy bị áp đặt.'
  },
  {
    id: 'q4',
    situation: 'Khi học sinh làm việc theo nhóm ồn ào nhưng vẫn tích cực, phương pháp hạ nhiệt tiếng ồn sư phạm tốt nhất là:',
    question: 'Cách xử lý nào thể hiện nghệ thuật điều hành lớp học tích cực?',
    options: [
      'Gõ thước thật mạnh xuống bàn giáo viên.',
      'Dùng âm thanh chuông thanh nhẹ (Attention Chime) hoặc câu chant "Flat tire, shhh...".',
      'Bật nhạc rock thật to để át tiếng học sinh.',
      'Phạt cả lớp đứng khoanh tay 15 phút.'
    ],
    correctIndex: 1,
    explanation: 'Tiếng chuông thanh nhẹ kích hoạt vùng thính giác tập trung mà không gây căng thẳng hệ thần kinh như tiếng đập thước chói tai.'
  },
  {
    id: 'q5',
    situation: 'Nguyên tắc cơ bản của phương pháp TPR (Total Physical Response) trong giảng dạy tiếng Anh tiểu học là gì?',
    question: 'Nguyên lý cốt lõi của TPR:',
    options: [
      'Bắt học sinh chép phạt từ mới 20 lần vào vở.',
      'Kết hợp ngôn ngữ lời nói với hành động, cử chỉ hình thể trực quan sinh động.',
      'Chỉ cho học sinh nghe đài cassette và không cần vận động.',
      'Dịch từng từ sang tiếng Việt rồi mới phát âm.'
    ],
    correctIndex: 1,
    explanation: 'Trẻ em tiểu học tiếp thu qua đa giác quan và vận động (Kinesthetic learning). TPR giúp khắc sâu nghĩa của khẩu lệnh vào trí nhớ vận động não bộ mà không cần dịch từng từ.'
  }
];
