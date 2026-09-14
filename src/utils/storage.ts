import { UserProgress, CommunityPost, LearningHistoryEntry } from '../types';
import { INITIAL_COMMUNITY_POSTS } from '../data/communityData';

// Bumped to v2 to force-reset all demo data for existing users
const STORAGE_KEY_PROGRESS = 'ecc_primary_progress_v2';
const STORAGE_KEY_COMMUNITY = 'ecc_primary_community_v1';
const STORAGE_KEY_HISTORY = 'ecc_primary_history_v1';

const DEFAULT_PROGRESS: UserProgress = {
  streak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  goldenSeeds: 0,
  masteredIds: [],
  bookmarkedIds: [],
  practiceScores: {},
  profile: {
    name: '',
    school: 'Trường Tiểu học Lê Kim Lăng',
    title: 'Giáo viên Tiểu học'
  },
  unlockedBadgeIds: [],
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
      data.goldenSeeds = 0;
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

// --- Learning History CRUD ---
const MAX_HISTORY_ENTRIES = 50;

export function loadLearningHistory(): LearningHistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveLearningHistory(entries: LearningHistoryEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    // Keep only the most recent entries
    const trimmed = entries.slice(0, MAX_HISTORY_ENTRIES);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Error saving learning history:', e);
  }
}

export function addLearningHistoryEntry(entry: Omit<LearningHistoryEntry, 'id' | 'timestamp'>): LearningHistoryEntry[] {
  const entries = loadLearningHistory();
  const newEntry: LearningHistoryEntry = {
    ...entry,
    id: `hist-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString()
  };
  const updated = [newEntry, ...entries].slice(0, MAX_HISTORY_ENTRIES);
  saveLearningHistory(updated);
  return updated;
}
