'use client';

import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  Volume2,
  BookmarkCheck,
  Shield,
  X,
  Command,
} from 'lucide-react';
import { CURRENT_USER } from '../../data/navigation';
import { NavItemId } from '../../types/navigation';

interface HeaderProps {
  activeItem: NavItemId;
  onOpenMobileNav: () => void;
  activeItemLabel: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeItemLabel,
  onOpenMobileNav,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jurisdiction] = useState('Supreme Court • Constitutional Benches');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(true);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 flex items-center justify-between shadow-xs">
      {/* Left Area: Mobile Trigger + Breadcrumb / Current View */}
      <div className="flex items-center gap-3 md:gap-5 flex-1 min-w-0">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Title */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium select-none">
          <span className="text-slate-400">LAWVOX</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-semibold">{activeItemLabel}</span>
        </div>

        {/* Global Precedent Search Bar */}
        <div className="relative flex-1 max-w-lg hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search constitutional precedents, articles, citations, judges (e.g. Kesavananda, Art 21)..."
              className="w-full pl-9.5 pr-20 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-800 placeholder-slate-400 rounded-lg border border-slate-200 focus:border-slate-400 focus:ring-2 focus:ring-slate-900/5 transition-all outline-none"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="absolute right-2.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-medium text-slate-400 shadow-2xs pointer-events-none">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Area: Jurisdiction Filter + Audio Quick Status + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Jurisdiction Quick Dropdown Pill */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
          <Shield className="w-3.5 h-3.5 text-amber-600" />
          <span className="truncate max-w-[200px]">{jurisdiction}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </div>

        {/* Audio Quick Status Pill */}
        <button
          type="button"
          onClick={() => setIsAudioReady(!isAudioReady)}
          title="Legal Audio Precedent Stream Status"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
        >
          <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          <span>Audio Engine</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </button>

        {/* Notifications Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
          </button>

          {/* Simple Notifications Popover (Light mode) */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3.5 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer flex gap-2.5">
                  <div className="p-1.5 bg-blue-50 text-blue-700 rounded-md h-fit">
                    <BookmarkCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      New Landmark Ruling Added
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      7-Judge Bench ruling on Article 300A is now transcribed and narrated.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">15m ago</span>
                  </div>
                </div>
                <div className="p-3 hover:bg-slate-50 transition-colors cursor-pointer flex gap-2.5">
                  <div className="p-1.5 bg-amber-50 text-amber-700 rounded-md h-fit">
                    <Volume2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">
                      Audio Briefing Ready
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Your requested oral argument digest for Kesavananda Bharati has finished processing.
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 block">1h ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

        {/* User Mini Profile */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-slate-900 text-amber-300 flex items-center justify-center font-bold text-xs shadow-xs border border-slate-700">
            {CURRENT_USER.initials}
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {CURRENT_USER.name}
            </span>
            <span className="text-[10px] text-slate-500 leading-tight">
              SCBA Member
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
