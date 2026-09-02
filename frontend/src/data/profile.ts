import { UserProfile } from '@/types';

export const initialProfile: UserProfile = {
  name: 'Aarav Sharma',
  salutation: 'Advocate',
  role: 'Constitutional Law Advocate & Researcher',
  email: 'aarav.sharma@lawchamber.in',
  institution: 'High Court & Supreme Court Bar Association',
  barCouncilNumber: 'D/1482/2019',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  researchInterests: [
    'Constitutional Precedents',
    'Basic Structure Doctrine',
    'Right to Privacy & Digital Laws',
    'Fundamental Rights Jurisprudence',
    'Judicial Review & Writs',
    'Administrative Law & Natural Justice',
  ],
  stats: {
    totalListeningTime: '18h 45m',
    totalListeningMinutes: 1125,
    casesListened: 28,
    bookmarksCount: 36,
    dailyAverage: '42m',
    notesCount: 14,
  },
};
