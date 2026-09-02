'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { CaseCard } from '@/components/cases/CaseCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAudio } from '@/context/AudioContext';
import { useToast } from '@/context/ToastContext';
import { mockCases } from '@/data/cases';
import { mockCategories } from '@/data/categories';
import { mockBookmarks, mockRecentSearches } from '@/data/dashboard';
import { initialProfile } from '@/data/profile';
import {
  Search,
  Play,
  Pause,
  Clock,
  BookOpen,
  Bookmark,
  TrendingUp,
  Headphones,
  ArrowRight,
  Sparkles,
  Shield,
  FileEdit,
  Lock,
  MessageSquare,
  Scale,
  Gavel,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { currentCase, isPlaying, playCase, togglePlay, toggleBookmark, isBookmarked, openCaseModal } = useAudio();
  const { showToast } = useToast();
  const [searchInput, setSearchInput] = useState('');

  // Primary continue listening case: Kesavananda Bharati
  const continueCase = mockCases.find((c) => c.id === 'case-kesavananda') || mockCases[0];
  const isContinuePlaying = currentCase?.id === continueCase.id && isPlaying;
  const isContinueBookmarked = isBookmarked(continueCase.id);

  // Recently Added cases (3 requested cases)
  const recentlyAddedCases = mockCases.filter((c) =>
    ['case-shreya', 'case-sabarimala', 'case-olga'].includes(c.id)
  );

  // Bookmarks cases (3 requested)
  const dashboardBookmarks = mockCases.filter((c) =>
    ['case-kesavananda', 'case-maneka', 'case-vishaka'].includes(c.id)
  );

  // Recommended cases (3 requested)
  const recommendedCases = mockCases.filter((c) =>
    ['case-maneka', 'case-puttaswamy', 'case-golaknath'].includes(c.id)
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const handleContinueListening = () => {
    if (currentCase?.id === continueCase.id) {
      togglePlay();
    } else {
      // Start from 08:45 (525 seconds)
      playCase(continueCase, 525, continueCase.chapters[4]);
    }
    showToast(`Continuing: ${continueCase.shortTitle}`, 'info');
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'FileEdit':
        return <FileEdit className="w-5 h-5" />;
      case 'Lock':
        return <Lock className="w-5 h-5" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5" />;
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'Gavel':
        return <Gavel className="w-5 h-5" />;
      default:
        return <Scale className="w-5 h-5" />;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* 1. Welcome & Hero Search Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-950 text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-purple-800/30">
          {/* Subtle decorative glow circles */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-semibold mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Constitutional Precedent Audio AI</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-serif text-white leading-tight">
              Good morning, Advocate
            </h2>
            <p className="mt-2 text-sm sm:text-base text-purple-100/90 font-normal leading-relaxed">
              Research constitutional precedents and listen to important judgments.
            </p>

            {/* Prominent Search Bar */}
            <form onSubmit={handleSearchSubmit} className="mt-6 flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search cases, judgments, judges, articles..."
                  className="w-full bg-white/95 hover:bg-white text-slate-900 placeholder-slate-400 text-sm sm:text-base pl-11 pr-4 py-3.5 rounded-2xl shadow-lg border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all"
                />
                <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="rounded-2xl px-6 py-3.5 shadow-gold-glow flex-shrink-0 font-bold"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Search Precedents
              </Button>
            </form>
          </div>
        </section>

        {/* 2. Continue Listening Hero Card & Listening Summary Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Continue Listening Card (Spans 2 columns on desktop) */}
          <section className="lg:col-span-2 bg-gradient-to-br from-purple-50 via-white to-indigo-50/40 rounded-3xl p-6 sm:p-7 border border-purple-200/80 shadow-soft flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping inline-block" />
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                  Continue Listening
                </span>
              </div>
              <Badge variant="purple" size="sm">
                Judgment • 63% Completed
              </Badge>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif leading-snug">
                {continueCase.shortTitle}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-purple-700">
                {continueCase.court} • {continueCase.citation}
              </p>
              <p className="text-xs text-slate-600 line-clamp-2">
                Chapter 5: Pronouncement of Basic Structure Doctrine & Article 368 parliamentary limits.
              </p>

              {/* Progress Bar & Timestamps */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1.5 text-purple-700">
                    <Clock className="w-3.5 h-3.5" /> Current: 08:45
                  </span>
                  <span className="text-slate-500">Duration: 13:30</span>
                </div>
                <div className="w-full h-2.5 bg-purple-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                    style={{ width: '63%' }}
                  />
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="mt-6 pt-4 border-t border-purple-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleContinueListening}
                  leftIcon={isContinuePlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  className="rounded-xl shadow-md font-bold"
                >
                  {isContinuePlaying ? 'Pause Audio' : 'Continue Listening'}
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={() => openCaseModal(continueCase)}
                  className="rounded-xl"
                >
                  View Case Details
                </Button>
              </div>

              <button
                onClick={() => {
                  const now = toggleBookmark(continueCase.id);
                  showToast(now ? 'Bookmarked Kesavananda Bharati' : 'Removed bookmark', now ? 'success' : 'info');
                }}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isContinueBookmarked
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                }`}
                title={isContinueBookmarked ? 'Remove Bookmark' : 'Add to Bookmarks'}
                aria-label="Toggle Bookmark"
              >
                <Bookmark className={`w-5 h-5 ${isContinueBookmarked ? 'fill-amber-500' : ''}`} />
              </button>
            </div>
          </section>

          {/* 3. Listening Summary Statistics (1 column) */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-extrabold text-base text-slate-900 font-serif flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-purple-600" />
                  Listening Summary
                </h3>
                <span className="text-[11px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full">
                  This Month
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3.5 mt-4">
                {/* Metric 1 */}
                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-100">
                  <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-2 shadow-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-extrabold text-slate-900">18h 45m</p>
                  <p className="text-[11px] font-semibold text-slate-500">Total Listening</p>
                </div>

                {/* Metric 2 */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100">
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-2 shadow-sm">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-extrabold text-slate-900">28</p>
                  <p className="text-[11px] font-semibold text-slate-500">Cases Listened</p>
                </div>

                {/* Metric 3 */}
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-100">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-2 shadow-sm">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-extrabold text-slate-900">36</p>
                  <p className="text-[11px] font-semibold text-slate-500">Bookmarks</p>
                </div>

                {/* Metric 4 */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-sm">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <p className="text-lg font-extrabold text-slate-900">42m</p>
                  <p className="text-[11px] font-semibold text-slate-500">Daily Average</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Goal: 45m / day</span>
              <Link href="/history" className="text-purple-600 hover:text-purple-700 font-bold flex items-center gap-0.5">
                View History <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        {/* 4. Constitutional Law Categories */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-serif">
                Constitutional Precedent Categories
              </h3>
              <p className="text-xs text-slate-500">
                Explore jurisprudence by constitutional domain
              </p>
            </div>
            <Link
              href="/search"
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group"
            >
              Browse All Categories <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {mockCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/search?category=${cat.slug}`}
                className="group p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-purple-300 shadow-soft-sm hover:shadow-soft transition-all duration-200 flex flex-col justify-between"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.accentColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-tight">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium mt-1">
                    {cat.caseCount} precedents
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Recently Added Cases */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 font-serif">
                Recently Added Cases
              </h3>
              <p className="text-xs text-slate-500">
                Newly processed judicial audio and structured benchmark judgments
              </p>
            </div>
            <Link
              href="/library"
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 group"
            >
              View Full Library <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentlyAddedCases.map((caseItem) => (
              <CaseCard key={caseItem.id} legalCase={caseItem} />
            ))}
          </div>
        </section>

        {/* 6. Your Bookmarks & Recommended Cases Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Bookmarks Section */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-amber-600 fill-amber-500" />
                  <h3 className="text-lg font-extrabold text-slate-900 font-serif">
                    Your Bookmarks
                  </h3>
                </div>
                <Link
                  href="/bookmarks"
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  View All Bookmarks <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {dashboardBookmarks.map((bmCase) => (
                  <CaseCard key={bmCase.id} legalCase={bmCase} variant="compact" />
                ))}
              </div>
            </div>
          </section>

          {/* Recommended for You Section */}
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-extrabold text-slate-900 font-serif">
                    Recommended for You
                  </h3>
                </div>
                <Link
                  href="/search"
                  className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
                >
                  Explore More <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-2.5">
                {recommendedCases.map((recCase) => (
                  <CaseCard key={recCase.id} legalCase={recCase} variant="compact" />
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 7. Recent Searches Section */}
        <section className="p-6 bg-slate-100/70 rounded-3xl border border-slate-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2 font-serif">
              <Search className="w-4 h-4 text-purple-600" />
              Recent Precedent Searches
            </h4>
            <span className="text-xs text-slate-400">Click query to search</span>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {mockRecentSearches.map((item) => (
              <Link
                key={item.id}
                href={`/search?q=${encodeURIComponent(item.query)}`}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:border-purple-300 text-xs font-semibold text-slate-700 hover:text-purple-700 shadow-soft-sm transition-all"
              >
                <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                <span>{item.query}</span>
                <span className="text-[10px] text-slate-400 font-normal">({item.timeAgo})</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
