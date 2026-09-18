import { ScenarioItem } from '../types';

export const CLASSROOM_SCENARIOS: ScenarioItem[] = [
  {
    id: 'scen-1',
    title: 'Học sinh mải nói chuyện riêng trong giờ học',
    grade: 'Lớp 1 - 3',
    situation: 'Khi cô giáo đang giảng bài ngữ pháp mới, hai bạn nam ở bàn ba đang hí hoáy chơi rubik và nói chuyện cười khúc khích, làm các bạn xung quanh phân tâm.',
    options: [
      {
        id: 'opt-1a',
        englishText: 'Stop talking right now! Why are you playing with your toy in my class?!',
        vietnameseText: 'Dừng nói chuyện ngay! Tại sao các em lại chơi đồ chơi trong lớp của tôi?!',
        rationale: 'Ngôn từ mang tính quở trách tiêu cực, dễ làm học sinh tiểu học sợ hãi, xấu hổ và chống đối ngầm.',
        isBest: false
      },
      {
        id: 'opt-1b',
        englishText: '1, 2, 3, eyes on me! Put your toys in your bag, please.',
        vietnameseText: 'Một, hai, ba, mắt nhìn về phía cô! Hãy cất đồ chơi vào cặp nào các con.',
        rationale: 'Rất chuẩn mực sư phạm: dùng Call & Response kéo sự chú ý chung mà không bêu xấu cá nhân, sau đó ra chỉ dẫn hành động cụ thể kèm "please".',
        isBest: true
      },
      {
        id: 'opt-1c',
        englishText: 'Quiet! Everybody shut up!',
        vietnameseText: 'Im lặng! Hãy im lặng ngay cho tôi!',
        rationale: 'Vi phạm chuẩn mực đạo đức nhà giáo và tạo môi trường học tập căng thẳng, thô lỗ.',
        isBest: false
      }
    ],
    pedagogicalTip: 'Với lứa tuổi tiểu học, hạn chế quát mắng tên riêng. Hãy kích hoạt phản xạ đồng thanh chung bằng khẩu lệnh vần điệu để các em tự điều chỉnh hành vi.'
  },
  {
    id: 'scen-2',
    title: 'Học sinh quên mang hộp bút chì màu',
    grade: 'Lớp 1 - 2',
    situation: 'Đến hoạt động vẽ tranh gia đình, một học sinh nữ cúi gằm mặt rơm rớm nước mắt vì em để quên hộp bút màu ở nhà.',
    options: [
      {
        id: 'opt-2a',
        englishText: "Why did you forget your colors? You can't draw anything today!",
        vietnameseText: 'Tại sao em lại quên bút màu? Hôm nay em sẽ không được vẽ gì hết!',
        rationale: 'Gây tổn thương tâm lý cho trẻ nhỏ, triệt tiêu niềm yêu thích môn học của bé.',
        isBest: false
      },
      {
        id: 'opt-2b',
        englishText: "It's okay, sweetheart! Who can share a green pencil with Lan?",
        vietnameseText: 'Không sao đâu con yêu! Ai có thể chia sẻ một cây bút xanh lá cho bạn Lan nào?',
        rationale: 'Xoa dịu cảm xúc bất an của trẻ, đồng thời giáo dục tinh thần sẻ chia (Sharing & Caring) cho cả lớp bằng tiếng Anh thân thiện.',
        isBest: true
      },
      {
        id: 'opt-2c',
        englishText: 'Go outside and ask the teacher next door for a pencil.',
        vietnameseText: 'Ra ngoài hành lang sang xin cô lớp bên cạnh cây bút đi.',
        rationale: 'Mất trật tự hành lang và không đảm bảo an toàn quản lý học sinh tiểu học.',
        isBest: false
      }
    ],
    pedagogicalTip: 'Học sinh lớp 1-2 rất dễ hoảng sợ khi quên đồ. Biến sự cố thành cơ hội rèn luyện từ vựng "share" và "thank you" một cách tự nhiên.'
  },
  {
    id: 'scen-3',
    title: 'Lớp học quá ồn ào và mất kiểm soát sau giờ thể dục',
    grade: 'Lớp 3 - 5',
    situation: 'Học sinh vừa chạy nhảy tiết thể dục ngoài trời vào lớp học, mồ hôi nhễ nhại, nói chuyện ầm ĩ và chen lấn uống nước, chưa thể ngồi yên vào chỗ.',
    options: [
      {
        id: 'opt-3a',
        englishText: 'Flat tire, shhhhh... Deep breath in, breath out. Sit nicely, please!',
        vietnameseText: 'Xe xì lốp rồi, xì xì... Hít vào thật sâu, thở ra nào. Ngồi ngay ngắn lại nhé các con!',
        rationale: 'Sử dụng kỹ thuật điều hòa nhịp thở kết hợp khẩu lệnh hạ nhiệt (cooling down) giúp nhịp tim và tâm lý của học sinh bình tĩnh lại nhanh chóng.',
        isBest: true
      },
      {
        id: 'opt-3b',
        englishText: 'I will give zero marks to anyone who is still standing!',
        vietnameseText: 'Cô sẽ cho 0 điểm bất kỳ ai còn đang đứng!',
        rationale: 'Đe dọa bằng điểm số không có tác dụng lâu dài và làm giảm động lực nội tại của trẻ.',
        isBest: false
      },
      {
        id: 'opt-3c',
        englishText: 'Quickly open your grammar book to page 50 and do exercise 1!',
        vietnameseText: 'Nhanh chóng mở sách ngữ pháp trang 50 và làm bài tập 1 ngay!',
        rationale: 'Khi não bộ học sinh chưa ổn định nhịp thở, việc ép làm bài tập ngay sẽ dẫn đến uể oải và chán ghét.',
        isBest: false
      }
    ],
    pedagogicalTip: 'Chuyển trạng thái từ động sang tĩnh cần từ 60 đến 90 giây thông qua các bài tập hít thở kết hợp cử chỉ vươn vai thả lỏng bằng tiếng Anh.'
  },
  {
    id: 'scen-4',
    title: 'Học sinh nhút nhát sợ phát biểu sai',
    grade: 'Lớp 2 - 4',
    situation: 'Bạn Minh được mời lên trả lời câu hỏi "What is your favorite animal?", em đứng run rẩy, ngập ngừng không dám phát âm vì sợ các bạn cười.',
    options: [
      {
        id: 'opt-4a',
        englishText: 'Take your time, Minh! Just try your best, we are all friends here!',
        vietnameseText: 'Cứ bình tĩnh con nhé! Chỉ cần cố gắng hết sức, chúng mình đều là bạn bè ở đây mà!',
        rationale: 'Xây dựng môi trường tâm lý an toàn (Psychological Safety), khuyến khích tinh thần thử nghiệm và không sợ sai sót.',
        isBest: true
      },
      {
        id: 'opt-4b',
        englishText: 'Hurry up, we have only 5 minutes left for this lesson!',
        vietnameseText: 'Nhanh lên nào, chúng ta chỉ còn 5 phút cho bài học này thôi!',
        rationale: 'Gia tăng áp lực thời gian khiến học sinh càng thêm hoảng loạn và có thể bật khóc.',
        isBest: false
      },
      {
        id: 'opt-4c',
        englishText: "You don't know? Sit down, another student please!",
        vietnameseText: 'Em không biết à? Ngồi xuống đi, mời bạn khác!',
        rationale: 'Làm tổn thương lòng tự trọng của học sinh nhút nhát và dập tắt ý chí cố gắng lần sau.',
        isBest: false
      }
    ],
    pedagogicalTip: 'Lời động viên ấm áp kèm cử chỉ gật đầu kiên nhẫn của giáo viên có giá trị hơn mọi bài giảng lý thuyết đối với một đứa trẻ nhút nhát.'
  }
];
