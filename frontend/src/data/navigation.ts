import {
  LayoutDashboard,
  Search,
  BookOpen,
  Bookmark,
  Headphones,
  FileText,
  User,
  Settings,
  LogOut,
} from 'lucide-react';
import { NavItem, UserProfile } from '../types/navigation';

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    section: 'main',
    description: 'Overview, recent precedents & audio feeds',
  },
  {
    id: 'search-cases',
    label: 'Search Cases',
    href: '/search',
    icon: Search,
    section: 'main',
    badge: '18.4k+',
    badgeColor: 'blue',
    description: 'Constitutional citations & bench rulings',
  },
  {
    id: 'library',
    label: 'Library',
    href: '/library',
    icon: BookOpen,
    section: 'main',
    description: 'Full statutory corpus & judgment transcripts',
  },
  {
    id: 'bookmarks',
    label: 'Bookmarks',
    href: '/bookmarks',
    icon: Bookmark,
    section: 'main',
    badge: 24,
    badgeColor: 'amber',
    description: 'Saved landmark decisions & audio timestamps',
  },
  {
    id: 'listening-history',
    label: 'Listening History',
    href: '/history',
    icon: Headphones,
    section: 'main',
    badge: 'Live',
    badgeColor: 'emerald',
    description: 'Audio digests & oral argument archives',
  },
  {
    id: 'my-notes',
    label: 'My Notes',
    href: '/notes',
    icon: FileText,
    section: 'main',
    badge: 12,
    badgeColor: 'slate',
    description: 'Case briefs, annotations & timestamped notes',
  },
];

export const SYSTEM_NAV_ITEMS: NavItem[] = [
  {
    id: 'profile',
    label: 'Profile',
    href: '/profile',
    icon: User,
    section: 'system',
    description: 'Credentials, bar affiliation & research focus',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    section: 'system',
    description: 'Audio speed, citation styles & preferences',
  },
  {
    id: 'logout',
    label: 'Logout',
    href: '/logout',
    icon: LogOut,
    section: 'system',
    description: 'Sign out of current research session',
  },
];

export const CURRENT_USER: UserProfile = {
  name: 'Adv. Shahana Marwa',
  role: 'Constitutional Law Researcher',
  barAffiliation: 'Supreme Court Bar Association (SCBA)',
  initials: 'SM',
  isOnline: true,
};
