import { LucideIcon } from 'lucide-react';

export type NavItemId =
  | 'dashboard'
  | 'search-cases'
  | 'library'
  | 'bookmarks'
  | 'listening-history'
  | 'my-notes'
  | 'profile'
  | 'settings'
  | 'logout';

export interface NavItem {
  id: NavItemId;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  badgeColor?: 'blue' | 'amber' | 'emerald' | 'slate';
  section: 'main' | 'system';
  description?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  barAffiliation?: string;
  avatarUrl?: string;
  initials: string;
  isOnline: boolean;
}

export interface QuickStats {
  totalPrecedents: string;
  audioBriefs: string;
  activeResearchBench: string;
  lastUpdated: string;
}
