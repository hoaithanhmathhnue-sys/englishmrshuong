import { CommunityPost } from '../types';

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'Cô Nguyễn Thu Hà',
    school: 'Trường Tiểu học Chu Văn An, Hà Nội',
    avatarColor: 'bg-emerald-500',
    gradeTag: 'Lớp 1 & 2',
    hashtags: ['#Lớp1', '#KỷLuậtTíchCực', '#TPR'],
    content: 'Trước đây mỗi lần chuyển tiết từ hoạt động múa hát sang làm bài tập, lớp 1 của mình rất ồn. Sau khi áp dụng câu "Flat tire, shhh..." kèm động tác phồng má xì hơi, các bé cười khúc khích rồi tự giác trật tự ngay chỉ sau đúng 3 giây! Cực kỳ nhẹ nhàng cho dây thanh quản của cô.',
    favoriteCommand: 'Flat tire, shhh...',
    likes: 38,
    timestamp: 'Hôm qua, 15:30'
  },
  {
    id: 'post-2',
    authorName: 'Thầy Trần Minh Đức',
    school: 'Trường Tiểu học Lê Quý Đôn, TP. Hồ Chí Minh',
    avatarColor: 'bg-blue-600',
    gradeTag: 'Lớp 4 & 5',
    hashtags: ['#TròChơi', '#KỷLuậtTíchCực', '#Lớp5'],
    content: 'Chia sẻ kinh nghiệm với các thầy cô dạy lớp lớn: Học sinh lớp 4-5 rất thích câu "To infinity... And beyond!" khi bắt đầu các câu hỏi thử thách. Các em hưởng ứng hào hứng như siêu nhân và giảm hẳn tâm lý ngại phát biểu!',
    favoriteCommand: 'To infinity... And beyond!',
    likes: 45,
    timestamp: '2 ngày trước'
  },
  {
    id: 'post-3',
    authorName: 'Cô Lê Hoàng Mai',
    school: 'Trường Tiểu học Võ Thị Sáu, Đà Nẵng',
    avatarColor: 'bg-amber-500',
    gradeTag: 'Lớp 3',
    hashtags: ['#TPR', '#Chants', '#TròChơi'],
    content: 'Bộ bàn âm thanh Soundboard trong ứng dụng này dùng siêu tiện trên màn hình tương tác! Mình hay bấm Magic Wand mỗi khi học sinh hoàn thành sao vàng và Attention Chime để gọi lớp. Trò rất mê!',
    favoriteCommand: 'Macaroni and cheese... Everybody freeze!',
    likes: 52,
    timestamp: '4 ngày trước'
  },
  {
    id: 'post-4',
    authorName: 'Cô Bùi Thanh Thảo',
    school: 'Trường Tiểu học Kim Đồng, Cần Thơ',
    avatarColor: 'bg-indigo-500',
    gradeTag: 'Lớp 2',
    hashtags: ['#Lớp1', '#TròChơi'],
    content: 'Mẹo nhỏ: Khi hô "Hands on top... That means stop!", thầy cô nhớ đặt 2 tay lên đầu thật chậm và dứt khoát. Cả lớp sẽ làm gương theo cô ngay mà không cần nhắc tên bất kỳ em nào.',
    favoriteCommand: 'Hands on top... That means stop!',
    likes: 29,
    timestamp: '5 ngày trước'
  }
];

export interface PosterTemplate {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  gradeRecommendation: string;
  items: {
    ruleOrCommand: string;
    translation: string;
    actionIcon: string;
    gesture: string;
  }[];
}

export const PRINTABLE_POSTERS: PosterTemplate[] = [
  {
    id: 'poster-rules',
    title: '5 CLASSROOM GOLDEN RULES',
    subtitle: 'Nội Quy Vàng Lớp Học Tiếng Anh Tiểu Học Thân Thiện',
    theme: 'bg-blue-900 text-white',
    gradeRecommendation: 'Khối 1 - Khối 5',
    items: [
      {
        ruleOrCommand: 'Eyes on the teacher',
        translation: 'Mắt luôn dõi theo cô giáo và bảng',
        actionIcon: '👀',
        gesture: 'Chỉ 2 ngón tay vào mắt'
      },
      {
        ruleOrCommand: 'Listen with your heart',
        translation: 'Lắng nghe bạn và cô bằng sự tôn trọng',
        actionIcon: '👂',
        gesture: 'Khum nhẹ bàn tay sau vành tai'
      },
      {
        ruleOrCommand: 'Raise your hand to speak',
        translation: 'Giơ tay ngay ngắn trước khi phát biểu',
        actionIcon: '🙋',
        gesture: 'Giơ thẳng một cánh tay lên cao'
      },
      {
        ruleOrCommand: 'Be kind and helpful',
        translation: 'Thân thiện, sẻ chia đồ dùng cùng bạn bè',
        actionIcon: '🤝',
        gesture: 'Bắt tay hoặc mỉm cười với bạn'
      },
      {
        ruleOrCommand: 'Always try your best',
        translation: 'Luôn tự tin, không sợ sai lầm khi học',
        actionIcon: '⭐',
        gesture: 'Giơ 2 ngón tay cái Thumbs Up'
      }
    ]
  },
  {
    id: 'poster-commands',
    title: 'DAILY CALL & RESPONSE CHANTS',
    subtitle: 'Bảng Khẩu Lệnh Hô - Đáp Thần Tốc Mỗi Ngày',
    theme: 'bg-amber-600 text-white',
    gradeRecommendation: 'Khối 1 - Khối 3',
    items: [
      {
        ruleOrCommand: 'Teacher: "1, 2, 3, eyes on me!" ➔ Class: "1, 2, eyes on you!"',
        translation: 'Tập trung ánh nhìn về giáo viên',
        actionIcon: '🎯',
        gesture: 'Đếm 1-2-3 và hướng tay về cô'
      },
      {
        ruleOrCommand: 'Teacher: "Flat tire, shhh..." ➔ Class: "Shhhhh..."',
        translation: 'Hạ nhiệt tiếng ồn trong 3 giây',
        actionIcon: '🤫',
        gesture: 'Ngón tay trỏ lên môi'
      },
      {
        ruleOrCommand: 'Teacher: "Hands on top..." ➔ Class: "That means stop!"',
        translation: 'Buông bút và dừng tay ngay lập tức',
        actionIcon: '🙆',
        gesture: 'Đặt 2 tay lên đỉnh đầu'
      },
      {
        ruleOrCommand: 'Teacher: "Hocus pocus..." ➔ Class: "Everybody focus!"',
        translation: 'Đánh thức tinh thần trước bài học mới',
        actionIcon: '✨',
        gesture: 'Khoanh tay ngay ngắn trước ngực'
      },
      {
        ruleOrCommand: 'Teacher: "Clean up, clean up..." ➔ Class: "Everybody, everywhere!"',
        translation: 'Gọn gàng thu dọn sách vở sau hoạt động',
        actionIcon: '🧹',
        gesture: 'Cất đồ dùng vào ngăn bàn'
      }
    ]
  }
];
