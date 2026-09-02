'use client';

import React from 'react';
import { LawvoxLogo } from './LawvoxLogo';
import { MAIN_NAV_ITEMS, SYSTEM_NAV_ITEMS, CURRENT_USER } from '../../data/navigation';
import { NavItemId } from '../../types/navigation';
import { Scale, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeItem: NavItemId;
  onNavigate: (item: NavItemId) => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  onNavigate,
  className = '',
}) => {
  const getBadgeStyle = (color?: string) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'emerald':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200 animate-pulse';
      case 'blue':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'slate':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <aside
      className={`w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between h-screen sticky top-0 select-none shadow-[1px_0_4px_rgba(0,0,0,0.02)] ${className}`}
    >
      {/* Top Section: Brand + Navigation */}
      <div className="flex flex-col flex-1 overflow-y-auto px-4 py-5 scrollbar-thin scrollbar-thumb-slate-200">
        {/* Brand Header */}
        <div className="pb-5 mb-4 border-b border-slate-100">
          <LawvoxLogo />
        </div>

        {/* Section Label: Legal Research & Audio */}
        <div className="px-3 mb-2 flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Legal Workspace
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
            <Scale className="w-3 h-3 text-amber-600" />
            Corpus v2.4
          </span>
        </div>

        {/* Main Navigation List */}
        <nav className="space-y-1" aria-label="Main Navigation">
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative text-left ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? 'text-amber-400'
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border leading-tight ${
                      isActive
                        ? 'bg-slate-800 text-amber-300 border-slate-700'
                        : getBadgeStyle(item.badgeColor)
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Section Label: Account & System */}
        <div className="px-3 mt-6 mb-2">
          <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Account & System
          </span>
        </div>

        {/* System Navigation List */}
        <div className="space-y-1">
          {SYSTEM_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isLogout = item.id === 'logout';

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative text-left ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm shadow-slate-900/10'
                    : isLogout
                    ? 'text-rose-600 hover:bg-rose-50 hover:text-rose-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive
                        ? 'text-amber-400'
                        : isLogout
                        ? 'text-rose-500 group-hover:text-rose-600'
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Legal Audio Sync Pill / Widget */}
        <div className="mt-6 p-3 rounded-xl bg-gradient-to-br from-amber-50/70 via-slate-50 to-blue-50/60 border border-amber-200/50">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="text-[11px] font-semibold text-slate-800 flex items-center gap-1">
              Constitutional Audio Engine
              <Sparkles className="w-3 h-3 text-amber-600" />
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            AI-narrated case summaries & bench transcript sync active.
          </p>
        </div>
      </div>

      {/* Bottom Section: User Profile Card */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/50">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-white border border-slate-200/60 shadow-xs">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-slate-900 to-blue-900 text-amber-400 flex items-center justify-center font-bold text-xs shadow-xs">
              {CURRENT_USER.initials}
            </div>
            {CURRENT_USER.isOnline && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-slate-900 truncate">
              {CURRENT_USER.name}
            </h4>
            <p className="text-[11px] text-slate-500 truncate">
              {CURRENT_USER.role}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
