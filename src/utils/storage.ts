import { UserProgress, CommunityPost } from '../types';
import { INITIAL_COMMUNITY_POSTS } from '../data/communityData';

const STORAGE_KEY_PROGRESS = 'ecc_primary_progress_v1';
const STORAGE_KEY_COMMUNITY = 'ecc_primary_community_v1';

const DEFAULT_PROGRESS: UserProgress = {
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  goldenSeeds: 25,
  masteredIds: ['cmd-01', 'cmd-02', 'cmd-03'],
  bookmarkedIds: ['cmd-01', 'cmd-04', 'cmd-06'],
  practiceScores: {
    'cmd-01': 95,
    'cmd-02': 90,
    'cmd-03': 88
  },
  profile: {
    name: 'Cô Nguyễn Lan Anh',
    school: 'Trường Tiểu học Lê Kim Lăng',
    title: 'Giáo viên Tiểu học'
  },
  unlockedBadgeIds: ['badge-1', 'badge-3'],
  quizCompleted: false,
  quizScore: 0
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;

  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) {
      saveUserProgress(DEFAULT_PROGRESS);
      return DEFAULT_PROGRESS;
    }
    const data: UserProgress = JSON.parse(raw);
    if (data.goldenSeeds === undefined) {
      data.goldenSeeds = 25;
    }
    
    // Check and update streak
    const today = new Date().toISOString().split('T')[0];
    if (data.lastActiveDate !== today) {
      const last = new Date(data.lastActiveDate);
      const cur = new Date(today);
      const diffDays = Math.round((cur.getTime() - last.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        data.streak += 1;
      } else if (diffDays > 1) {
        data.streak = 1;
      }
      data.lastActiveDate = today;
      saveUserProgress(data);
    }

    return data;
  } catch (e) {
    console.error('Error loading progress from storage:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress to storage:', e);
  }
}

export function loadCommunityPosts(): CommunityPost[] {
  if (typeof window === 'undefined') return INITIAL_COMMUNITY_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMMUNITY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_COMMUNITY, JSON.stringify(INITIAL_COMMUNITY_POSTS));
      return INITIAL_COMMUNITY_POSTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_COMMUNITY_POSTS;
  }
}

export function saveCommunityPosts(posts: CommunityPost[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_COMMUNITY, JSON.stringify(posts));
  } catch (e) {
    console.error('Error saving community posts:', e);
  }
}
