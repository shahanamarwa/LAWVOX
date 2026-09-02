import { LucideIcon } from 'lucide-react';

export interface PrecedentCase {
  id: string;
  name: string;
  citation?: string;
  year: number | string;
  court: string;
  benchSize?: string;
  coram?: string[];
  leadJudge?: string;
  judgmentDate?: string;
  doctrine?: string;
  articleReference?: string;
  duration?: string;
  currentTime?: string;
  progressPercent?: number;
  tags?: string[];
  summary?: string;
  ratioDecidendi?: string;
  facts?: string;
  petitionerArguments?: string[];
  respondentArguments?: string[];
  keyExcerpts?: string[];
  impact?: string;
  audioNarrationText?: string;
  isBookmarked?: boolean;
  matchScore?: number;
  category?: string;
}

export interface StatItem {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  accent: 'blue' | 'amber' | 'purple' | 'emerald';
  change?: string;
}

export interface CategoryItem {
  id: string;
  title: string;
  articleRange: string;
  caseCount: number;
  audioCount: number;
  icon: LucideIcon;
  colorScheme: 'navy' | 'amber' | 'purple' | 'blue' | 'indigo' | 'emerald';
  description: string;
  keyPrinciples?: string[];
  leadingCases?: string[];
}
