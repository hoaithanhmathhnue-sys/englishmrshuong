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
  Footer 
} from './components/Footer';
import { 
  MobileNoticeModal 
} from './components/MobileNoticeModal';
import { 
  FlashcardModal 
} from './components/FlashcardModal';
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

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedVoiceCommandId, setSelectedVoiceCommandId] = useState<string | null>(null);
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress);
  const [posts, setPosts] = useState<CommunityPost[]>(loadCommunityPosts);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isMobileNoticeOpen, setIsMobileNoticeOpen] = useState(false);
  const [isFlashcardOpen, setIsFlashcardOpen] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5] text-slate-900 sunflower-bg-pattern relative overflow-x-hidden">
      
      {/* 2 Bông hoa hướng dương background kích thước lớn to đẹp ở hai bên */}
      <div 
        className="fixed -left-8 sm:-left-12 lg:-left-16 top-1/4 text-7xl sm:text-8xl lg:text-9xl select-none pointer-events-none opacity-25 filter drop-shadow-xl z-0 animate-float-sunflower hidden md:block" 
        aria-hidden="true"
      >
        🌻
      </div>
      <div 
        className="fixed -right-8 sm:-right-12 lg:-right-16 top-1/2 text-7xl sm:text-8xl lg:text-9xl select-none pointer-events-none opacity-25 filter drop-shadow-xl z-0 animate-float-sunflower-reverse hidden md:block" 
        aria-hidden="true"
      >
        🌻
      </div>

      {/* Sticky Top Navigation with Sunflower theme */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        progress={progress}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        onOpenMobileNotice={() => setIsMobileNoticeOpen(true)}
        onOpenFlashcard={() => setIsFlashcardOpen(true)}
      />

      {/* Main Tab Content Viewport */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && (
          <DashboardTab
            commands={ALL_APP_COMMANDS}
            progress={progress}
            learningHistory={learningHistory}
            onNavigateTab={handleNavigateTab}
            onToggleBookmark={handleToggleBookmark}
            onOpenMobileNotice={() => setIsMobileNoticeOpen(true)}
            onOpenFlashcard={() => setIsFlashcardOpen(true)}
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

      {/* Mobile Notice Modal for Zalo/Facebook */}
      <MobileNoticeModal
        isOpen={isMobileNoticeOpen}
        onClose={() => setIsMobileNoticeOpen(false)}
      />

      {/* Flashcard 3D Interactive & PDF Print Modal */}
      <FlashcardModal
        isOpen={isFlashcardOpen}
        onClose={() => setIsFlashcardOpen(false)}
        commands={ALL_APP_COMMANDS}
      />

      {/* Professional Footer inspired by cô Bình reference app */}
      <Footer 
        onNavigateTab={handleNavigateTab} 
        onOpenMobileNotice={() => setIsMobileNoticeOpen(true)}
        onOpenFlashcard={() => setIsFlashcardOpen(true)}
      />
    </div>
  );
}
