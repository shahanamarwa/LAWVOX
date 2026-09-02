export interface Chapter {
  id: string;
  number: number;
  title: string;
  duration: string;
  durationSeconds: number;
  timestamp: number;
  spokenScript?: string;
}

export interface LegalCase {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  citation: string;
  court: string;
  year: number;
  date: string;
  category: string;
  categorySlug: string;
  summary: string;
  significance: string;
  constitutionalProvisions: string[];
  keyPrinciples: string[];
  judges: string[];
  petitioner: string;
  respondent: string;
  bench: string;
  duration: string;
  durationSeconds: number;
  audioSrc: string;
  spokenScript?: string;
  initialProgress?: number;
  isBookmarked?: boolean;
  isDownloaded?: boolean;
  fileSize?: string;
  chapters: Chapter[];
}

export interface BookmarkItem {
  id: string;
  caseId: string;
  caseSlug: string;
  caseTitle: string;
  court: string;
  year: number;
  citation: string;
  section: string;
  dateAdded: string;
  audioSrc: string;
  progress: number;
}

export interface ListeningHistoryItem {
  id: string;
  caseId: string;
  caseSlug: string;
  caseTitle: string;
  court: string;
  citation: string;
  contentType: string;
  durationListened: string;
  totalDuration: string;
  progress: number;
  listenedDate: string;
  audioSrc: string;
}

export interface ResearchNote {
  id: string;
  title: string;
  caseId: string;
  caseTitle: string;
  chapterTitle?: string;
  timestamp?: string;
  dateCreated: string;
  content: string;
  tags: string[];
}

export interface UserProfile {
  name: string;
  salutation: string;
  role: string;
  email: string;
  institution: string;
  barCouncilNumber: string;
  avatarUrl: string;
  researchInterests: string[];
  stats: {
    totalListeningTime: string;
    totalListeningMinutes: number;
    casesListened: number;
    bookmarksCount: number;
    dailyAverage: string;
    notesCount: number;
  };
}

export interface LawCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  caseCount: number;
  iconName: string;
  accentColor: string;
}

export interface AudioPlaybackState {
  currentCase: LegalCase | null;
  currentChapter: Chapter | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  playbackSpeed: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  showPlayer: boolean;
  useVoiceSynthesis: boolean;
}
