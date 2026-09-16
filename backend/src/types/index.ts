// backend/src/types/index.ts

export interface Case {
  id: string;
  case_name: string;
  court: string;
  year: number;
  citation?: string;
  category: string;
  judge?: string;
  constitutional_provisions?: string;
  summary?: string;
  legal_issue?: string;
  decision?: string;
  keywords?: string;
  bench_size?: string;
  doctrine?: string;
  audio_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Bookmark {
  id: number;
  case_id: string;
  created_at?: string;
}

export interface ListeningHistory {
  id: number;
  case_id: string;
  duration_listened: number;
  completion_percentage: number;
  last_position: number;
  listened_at?: string;
}

export interface Note {
  id: number;
  title: string;
  case_id: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: number;
  name: string;
  profession?: string;
  email: string;
  institution?: string;
  research_interests?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Settings {
  id: number;
  notification_enabled: number;
  autoplay_enabled: number;
  playback_speed: number;
  language: string;
  appearance: string;
  updated_at?: string;
}

export interface SearchQuery {
  id: number;
  query: string;
  created_at?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  status?: number;
}

export interface DashboardData {
  totalCases: number;
  totalBookmarks: number;
  totalNotes: number;
  totalListeningHistory: number;
  recentCases: Case[];
  bookmarkedCases: Case[];
  recentNotes: Note[];
}
