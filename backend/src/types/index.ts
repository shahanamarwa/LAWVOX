export interface Case {
  id: string;
  case_name: string;
  court: string;
  year: number;
  citation: string | null;
  category: string;
  judge: string | null;
  constitutional_provisions: string | null;
  summary: string | null;
  legal_issue?: string | null;
  decision?: string | null;
  keywords?: string | null;
  bench_size?: string | null;
  doctrine?: string | null;
  audio_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateCaseInput {
  id?: string;
  case_name: string;
  court: string;
  year: number;
  citation?: string | null;
  category: string;
  judge?: string | null;
  constitutional_provisions?: string | null;
  summary?: string | null;
  legal_issue?: string | null;
  decision?: string | null;
  keywords?: string | null;
  bench_size?: string | null;
  doctrine?: string | null;
  audio_url?: string | null;
}

export interface UpdateCaseInput {
  case_name?: string;
  court?: string;
  year?: number;
  citation?: string | null;
  category?: string;
  judge?: string | null;
  constitutional_provisions?: string | null;
  summary?: string | null;
  legal_issue?: string | null;
  decision?: string | null;
  keywords?: string | null;
  bench_size?: string | null;
  doctrine?: string | null;
  audio_url?: string | null;
}

export interface Bookmark {
  id: number;
  case_id: string;
  created_at: string;
  case_name?: string;
  court?: string;
  year?: number;
  citation?: string | null;
  category?: string;
  judge?: string | null;
  summary?: string | null;
  doctrine?: string | null;
  audio_url?: string | null;
}

export interface ListeningHistory {
  id: number;
  case_id: string;
  duration_listened: number; // in seconds
  completion_percentage: number;
  last_position: number; // in seconds
  listened_at: string;
  case_name?: string;
  court?: string;
  year?: number;
  citation?: string | null;
  category?: string;
  doctrine?: string | null;
  audio_url?: string | null;
}

export interface CreateHistoryInput {
  case_id: string;
  duration_listened?: number;
  completion_percentage?: number;
  last_position?: number;
}

export interface UpdateHistoryInput {
  duration_listened?: number;
  completion_percentage?: number;
  last_position?: number;
}

export interface Note {
  id: number;
  title: string;
  case_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  case_name?: string;
  citation?: string | null;
}

export interface CreateNoteInput {
  title: string;
  case_id: string;
  content: string;
}

export interface UpdateNoteInput {
  title?: string;
  content?: string;
}

export interface Profile {
  id: number;
  name: string;
  profession: string | null;
  email: string;
  institution: string | null;
  research_interests: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileInput {
  name?: string;
  profession?: string | null;
  email?: string;
  institution?: string | null;
  research_interests?: string | null;
  avatar_url?: string | null;
}

export interface Settings {
  id: number;
  notification_enabled: boolean;
  autoplay_enabled: boolean;
  playback_speed: number;
  language: string;
  appearance: string;
  updated_at: string;
}

export interface UpdateSettingsInput {
  notification_enabled?: boolean;
  autoplay_enabled?: boolean;
  playback_speed?: number;
  language?: string;
  appearance?: string;
}

export interface RecentSearch {
  id: number;
  query: string;
  created_at: string;
}

export interface DashboardStatistics {
  totalListeningTimeSeconds: number;
  totalListeningTimeFormatted: string;
  casesListened: number;
  bookmarksCount: number;
  dailyAverageMinutes: number;
}

export interface CategorySummary {
  category: string;
  caseCount: number;
  articleRange: string;
  description: string;
}

export interface DashboardData {
  welcome: {
    userName: string;
    profession: string | null;
    institution: string | null;
    greeting: string;
  };
  statistics: DashboardStatistics;
  continueListening: ListeningHistory | null;
  recentCases: Case[];
  bookmarks: Bookmark[];
  categories: CategorySummary[];
  recommendations: Case[];
  recentSearches: RecentSearch[];
}

export interface CaseFilterOptions {
  q?: string;
  court?: string;
  year?: number;
  category?: string;
  judge?: string;
  doctrine?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    message: string;
    details?: unknown;
  };
}
