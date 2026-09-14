import React, { useState, useEffect } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  DashboardTab 
} from './components/DashboardTab';
import { 
  CommandLibraryTab 
} from './components/CommandLibraryTab';
import { 
  VoiceLabTab 
} from './components/VoiceLabTab';
import { 
  AssessmentHubTab 
} from './components/AssessmentHubTab';
import { 
  CommunityToolsTab 
} from './components/CommunityToolsTab';
import { 
  LessonAiGeneratorTab 
} from './components/LessonAiGeneratorTab';
import { 
  SunflowerArcadeTab 
} from './components/SunflowerArcadeTab';
import { 
  MiniFloatingDock 
} from './components/MiniFloatingDock';
import { 
  ApiKeyModal 
} from './components/ApiKeyModal';
import { 
  TeacherProfileModal 
} from './components/TeacherProfileModal';
import { 
  ALL_APP_COMMANDS 
} from './data/commandsData';
import { 
  loadUserProgress, 
  saveUserProgress, 
  loadCommunityPosts, 
  saveCommunityPosts,
  loadLearningHistory,
  addLearningHistoryEntry
} from './utils/storage';
import { 
  UserProgress, 
  CommunityPost,
  LearningHistoryEntry,
  HistoryEntryType
} from './types';
import { 
  Sun,
  GraduationCap, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Key,
  BookOpen,
  Gamepad2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedVoiceCommandId, setSelectedVoiceCommandId] = useState<string | null>(null);
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [posts, setPosts] = useState<CommunityPost[]>(loadCommunityPosts);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [learningHistory, setLearningHistory] = useState<LearningHistoryEntry[]>(loadLearningHistory);

  // Helper to add a history entry
  const logHistory = (type: HistoryEntryType, title: string, details?: string) => {
    const updated = addLearningHistoryEntry({ type, title, details });
    setLearningHistory(updated);
  };

  // Sync progress to localStorage
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  // Sync community posts to localStorage
  useEffect(() => {
    saveCommunityPosts(posts);
  }, [posts]);

  // Navigation helper with command preselection
  const handleNavigateTab = (tab: string, commandId?: string) => {
    if (commandId) {
      setSelectedVoiceCommandId(commandId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Bookmark
  const handleToggleBookmark = (commandId: string) => {
    const wasBookmarked = progress.bookmarkedIds.includes(commandId);
    setProgress(prev => {
      const isBookmarked = prev.bookmarkedIds.includes(commandId);
      const newBookmarks = isBookmarked
        ? prev.bookmarkedIds.filter(id => id !== commandId)
        : [...prev.bookmarkedIds, commandId];

      const newBadges = [...prev.unlockedBadgeIds];
      if (newBookmarks.length >= 5 && !newBadges.includes('badge-3')) {
        newBadges.push('badge-3'); // Chiến binh TPR
      }

      return {
        ...prev,
        bookmarkedIds: newBookmarks,
        unlockedBadgeIds: newBadges
      };
    });
    // Log history
    const cmd = ALL_APP_COMMANDS.find(c => c.id === commandId);
    if (cmd) {
      logHistory(
        'bookmark',
        wasBookmarked ? `Bỏ ghim: ${cmd.teacherCall}` : `Ghim bài: ${cmd.teacherCall}`,
        cmd.vietnameseTranslation
      );
    }
  };

  // Reward Golden Seeds (túi hạt giống hoa hướng dương vàng)
  const handleRewardSeeds = (amount: number) => {
    setProgress(prev => {
      const newSeeds = (prev.goldenSeeds || 0) + amount;
      const newBadges = new Set(prev.unlockedBadgeIds);
      if (newSeeds >= 100 && !newBadges.has('badge-7')) {
        newBadges.add('badge-7'); // Huy hiệu hoa hướng dương vàng
      }
      return {
        ...prev,
        goldenSeeds: newSeeds,
        unlockedBadgeIds: Array.from(newBadges)
      };
    });
  };

  // Record practice score from Voice AI
  const handleRecordScore = (commandId: string, score: number) => {
    setProgress(prev => {
      const currentBest = prev.practiceScores[commandId] || 0;
      const newBest = Math.max(currentBest, score);

      const newScores = {
        ...prev.practiceScores,
        [commandId]: newBest
      };

      const newMastered = new Set(prev.masteredIds);
      if (newBest >= 85) {
        newMastered.add(commandId);
      }

      // Tặng hạt giống hoa hướng dương vàng khi luyện tập tốt
      const currentSeeds = prev.goldenSeeds || 0;
      const earnedSeeds = score >= 90 ? 5 : score >= 80 ? 3 : 1;

      const newBadges = new Set(prev.unlockedBadgeIds);
      // Badge 1: first practice
      newBadges.add('badge-1');
      // Badge 2: 5 mastered commands
      if (newMastered.size >= 5) {
        newBadges.add('badge-2');
      }
      if (currentSeeds + earnedSeeds >= 100) {
        newBadges.add('badge-7');
      }

      return {
        ...prev,
        goldenSeeds: currentSeeds + earnedSeeds,
        practiceScores: newScores,
        masteredIds: Array.from(newMastered),
        unlockedBadgeIds: Array.from(newBadges)
      };
    });
    // Log history
    const cmd = ALL_APP_COMMANDS.find(c => c.id === commandId);
    logHistory(
      score >= 85 ? 'mastered' : 'practice',
      score >= 85 ? `Thành thục: ${cmd?.teacherCall || commandId}` : `Luyện tập: ${cmd?.teacherCall || commandId}`,
      `Điểm: ${score}/100`
    );
  };

  // Update teacher profile
  const handleUpdateProfile = (name: string, school: string) => {
    setProgress(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        name,
        school
      }
    }));
  };

  // Unlock badge
  const handleUnlockBadge = (badgeId: string) => {
    setProgress(prev => {
      if (prev.unlockedBadgeIds.includes(badgeId)) return prev;
      return {
        ...prev,
        unlockedBadgeIds: [...prev.unlockedBadgeIds, badgeId]
      };
    });
  };

  // Complete Quiz
  const handleCompleteQuiz = (score: number) => {
    setProgress(prev => {
      const newBadges = new Set(prev.unlockedBadgeIds);
      if (score === 5) {
        newBadges.add('badge-5');
      }
      return {
        ...prev,
        quizCompleted: true,
        quizScore: score,
        goldenSeeds: (prev.goldenSeeds || 0) + (score * 5),
        unlockedBadgeIds: Array.from(newBadges)
      };
    });
  };

  // Add new forum post
  const handleAddPost = (newPostData: Omit<CommunityPost, 'id' | 'likes' | 'hasLiked' | 'timestamp'>) => {
    const newPost: CommunityPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      likes: 1,
      hasLiked: true,
      timestamp: 'Vừa xong'
    };
    setPosts(prev => [newPost, ...prev]);
  };

  // Toggle like post
  const handleToggleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === postId) {
          const hasLiked = !p.hasLiked;
          return {
            ...p,
            hasLiked,
            likes: hasLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-900 pb-20 sm:pb-12">
      {/* Sticky Top Navigation with Sunflower theme */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        progress={progress}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* Main Tab Content Viewport */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <DashboardTab
            commands={ALL_APP_COMMANDS}
            progress={progress}
            learningHistory={learningHistory}
            onNavigateTab={handleNavigateTab}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'library' && (
          <CommandLibraryTab
            commands={ALL_APP_COMMANDS}
            progress={progress}
            onNavigateToVoiceLab={(cmdId) => handleNavigateTab('voicelab', cmdId)}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeTab === 'voicelab' && (
          <VoiceLabTab
            commands={ALL_APP_COMMANDS}
            initialCommandId={selectedVoiceCommandId}
            progress={progress}
            onRecordScore={handleRecordScore}
          />
        )}

        {activeTab === 'aigenerator' && (
          <LessonAiGeneratorTab
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            onNavigateToVoiceLab={(cmdId) => handleNavigateTab('voicelab', cmdId)}
          />
        )}

        {activeTab === 'arcade' && (
          <SunflowerArcadeTab
            commands={ALL_APP_COMMANDS}
            onRewardSeeds={handleRewardSeeds}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            onAddHistory={(type, title, details) => logHistory(type, title, details)}
          />
        )}

        {activeTab === 'certification' && (
          <AssessmentHubTab
            progress={progress}
            onUpdateProfile={handleUpdateProfile}
            onUnlockBadge={handleUnlockBadge}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}

        {activeTab === 'soundboard' && (
          <CommunityToolsTab />
        )}
      </main>

      {/* Mini Floating Dock điều hành lớp học trực tiếp trên bục giảng */}
      <MiniFloatingDock onNavigateTab={handleNavigateTab} />

      {/* Teacher Profile Quick Modal */}
      <TeacherProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        progress={progress}
        onSaveProfile={handleUpdateProfile}
      />

      {/* Google Gemini API Key Settings Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />

      {/* Footer Sunflower - Trường TH Lê Kim Lăng & Mrs. Huong */}
      <footer className="bg-white border-t border-amber-200 mt-16 text-slate-600 no-print shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Slogan */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-900 flex items-center justify-center font-bold shadow-sm shadow-amber-200">
                  <Sun className="w-5 h-5 text-amber-800 animate-spin-slow" />
                </div>
                <div>
                  <span className="text-base font-extrabold text-slate-900 block leading-tight">
                    Sunflower English Garden • Trường TH Lê Kim Lăng
                  </span>
                  <span className="text-[11px] font-semibold text-amber-600">
                    Sáng kiến phát triển chuyên môn 2025–2035 • Dấu ấn cô Lê Thị Thu Hương
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
                &ldquo;Mỗi câu lệnh là một tia nắng, mỗi nụ cười là một đóa hướng dương nở rộ.&rdquo; Hệ sinh thái rèn luyện tiếng Anh sư phạm kết hợp phản xạ TPR, AI hỗ trợ soạn bài và sân chơi mini-games dành riêng cho thầy cô giáo tiểu học.
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  Đồng hành giáo viên K-5
                </span>
                <button
                  onClick={() => setIsApiKeyModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800 hover:underline font-semibold"
                >
                  <Key className="w-3.5 h-3.5" />
                  Cấu hình Google AI Key
                </button>
              </div>
            </div>

            {/* Col 2: Fast Navigation */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Danh Mục Tính Năng 2.0
              </div>
              <div>
                <button onClick={() => handleNavigateTab('dashboard')} className="hover:text-amber-600 transition">
                  🌻 Vườn Hướng Dương & 10 Câu Tháng
                </button>
              </div>
              <div>
                <button onClick={() => handleNavigateTab('library')} className="hover:text-amber-600 transition">
                  📚 Thư viện 52 câu lệnh (Toán, Đồng nghiệp)
                </button>
              </div>
              <div>
                <button onClick={() => handleNavigateTab('voicelab')} className="hover:text-amber-600 transition">
                  🎙️ Voice Lab & Lời động viên Mrs. Huong
                </button>
              </div>
              <div>
                <button onClick={() => handleNavigateTab('aigenerator')} className="hover:text-amber-600 transition font-semibold text-amber-700">
                  ✨ AI Soạn câu lệnh theo bài học
                </button>
              </div>
              <div>
                <button onClick={() => handleNavigateTab('arcade')} className="hover:text-amber-600 transition font-semibold text-emerald-700">
                  🎮 Sunflower Arcade (Game tương tác)
                </button>
              </div>
              <div>
                <button onClick={() => handleNavigateTab('certification')} className="hover:text-amber-600 transition">
                  🎓 Khảo sát & Chứng chỉ Lê Kim Lăng
                </button>
              </div>
            </div>

            {/* Col 3: Pedagogical Standards */}
            <div className="space-y-2 text-xs">
              <div className="font-bold text-slate-900 uppercase tracking-wider mb-2">
                Trụ Cột Sư Phạm 2025–2035
              </div>
              <div className="text-slate-500">
                • 10 Khẩu lệnh trọng tâm theo tháng
              </div>
              <div className="text-slate-500">
                • 16 Mẫu câu Tiếng Anh dạy Toán (Table 4)
              </div>
              <div className="text-slate-500">
                • 12 Mẫu câu Giao tiếp đồng nghiệp (Table 5)
              </div>
              <div className="text-slate-500">
                • Mini Floating Dock điều hành lớp học 1 tay
              </div>
              <div className="text-slate-500">
                • Trí tuệ nhân tạo Google Gemini 3 Flash
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
            <div>
              © 2025–2035 Sunflower English Garden • Trường Tiểu học Lê Kim Lăng. Đồng hành bởi cô Lê Thị Thu Hương.
            </div>
            <div className="flex items-center gap-1 text-slate-500">
              <span>Được xây dựng với tình yêu thương dành cho giáo viên và học trò tiểu học</span>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

