'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Bell,
  Menu,
  User,
  Settings,
  Bookmark,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { initialProfile } from '@/data/profile';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const getPageTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Constitutional Research Dashboard';
      case '/search':
        return 'Precedent & Case Search';
      case '/library':
        return 'Legal Audio Library';
      case '/bookmarks':
        return 'Saved & Bookmarked Precedents';
      case '/history':
        return 'Listening History & Logs';
      case '/notes':
        return 'Advocate Research Notes';
      case '/profile':
        return 'Advocate Profile';
      case '/settings':
        return 'Application Settings';
      default:
        return 'LAWVOX Legal Precedents';
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'New Landmark Judgment Audio Available',
      desc: 'Justice K.S. Puttaswamy v. Union of India Chapter 4 audio added.',
      time: '10m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Listening Goal Progress',
      desc: 'You completed 42 minutes of constitutional precedent listening today.',
      time: '2h ago',
      unread: false,
    },
    {
      id: 3,
      title: 'Constitution Bench Sitting Notice',
      desc: '5-Judge Bench judgments added to fundamental rights library.',
      time: '1d ago',
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Mobile Menu & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Open mobile navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-tight">
            {getPageTitle()}
          </h1>
          <p className="hidden sm:block text-xs text-slate-500 font-medium">
            Supreme Court & High Court Precedents
          </p>
        </div>
      </div>

      {/* Center: Global Header Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search cases, judgments, articles (e.g. Art 21, Kesavananda)..."
            className="w-full bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </form>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileMenuOpen(false);
            }}
            className="p-2.5 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-colors relative"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-purple-600 ring-2 ring-white" />
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-900">Notifications</span>
                <span className="text-[11px] text-purple-600 font-semibold bg-purple-50 px-2 py-0.5 rounded-full">
                  1 New
                </span>
              </div>

              <div className="divide-y divide-slate-100 mt-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="py-3 group hover:bg-slate-50 p-2 rounded-xl transition-colors">
                    <div className="flex items-start gap-2.5">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-purple-600' : 'bg-slate-300'}`} />
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                          {n.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.desc}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {n.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            onClick={() => {
              setIsProfileMenuOpen(!isProfileMenuOpen);
              setIsNotificationsOpen(false);
            }}
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 transition-all text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              AS
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {initialProfile.salutation} {initialProfile.name.split(' ')[0]}
              </p>
              <p className="text-[10px] text-purple-700 font-semibold tracking-tight">Supreme Court Bar</p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">{initialProfile.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{initialProfile.email}</p>
              </div>

              <Link
                href="/profile"
                onClick={() => setIsProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>My Profile & Bar Stats</span>
              </Link>

              <Link
                href="/bookmarks"
                onClick={() => setIsProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
              >
                <Bookmark className="w-4 h-4 text-slate-500" />
                <span>Saved Bookmarks</span>
              </Link>

              <Link
                href="/settings"
                onClick={() => setIsProfileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-purple-700 hover:bg-purple-50 rounded-xl transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Settings & Preferences</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
