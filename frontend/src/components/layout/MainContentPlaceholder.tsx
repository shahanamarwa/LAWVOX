'use client';

import React from 'react';
import { NavItemId } from '../../types/navigation';
import { MAIN_NAV_ITEMS, SYSTEM_NAV_ITEMS } from '../../data/navigation';
import {
  Scale,
  Headphones,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface MainContentPlaceholderProps {
  activeItem: NavItemId;
  onNavigate: (item: NavItemId) => void;
}

export const MainContentPlaceholder: React.FC<MainContentPlaceholderProps> = ({
  activeItem,
  onNavigate,
}) => {
  const allItems = [...MAIN_NAV_ITEMS, ...SYSTEM_NAV_ITEMS];
  const currentItem = allItems.find((item) => item.id === activeItem) || allItems[0];
  const Icon = currentItem.icon;

  return (
    <div className="flex-1 bg-slate-50/60 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Page Context Banner */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-amber-500/5 via-blue-500/5 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900 text-amber-400 shadow-sm shadow-slate-900/10">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif tracking-tight">
                    {currentItem.label}
                  </h1>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60">
                    Workspace Shell
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                  {currentItem.description ||
                    'Constitutional precedent research repository and legal audio intelligence environment.'}
                </p>
              </div>
            </div>

            {/* Quick Metrics Badge Group */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80 text-left">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Precedents Corpus
                </span>
                <span className="text-xs font-bold text-slate-800">18,450+ Indexed</span>
              </div>
              <div className="px-3 py-2 rounded-xl bg-amber-50/60 border border-amber-200/80 text-left">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-amber-700">
                  Audio Digests
                </span>
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                  <Headphones className="w-3 h-3 text-amber-600" />
                  4,820+ Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Visual Blueprint & Placeholder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Primary View Placeholder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Architectural Layout Demonstration Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-600" />
                  <h2 className="text-sm font-bold text-slate-900">
                    Active View Content Area
                  </h2>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  route: {currentItem.href}
                </span>
              </div>

              {/* Wireframe Placeholder Preview */}
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/50 flex flex-col items-center justify-center text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-slate-700" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-800 font-serif">
                    {currentItem.label} Module Container
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mt-1 leading-relaxed">
                    This designated main content container renders under the responsive layout shell with clean light-mode borders, fluid padding, and top header sync.
                  </p>
                  
                  <div className="mt-5 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Layout Initialized
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      Module Ready for Page Implementation
                    </span>
                  </div>
                </div>

                {/* Sample Skeleton Rows to represent future precedent data tables / cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      §
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="h-3 w-3/4 bg-slate-200 rounded mb-1.5"></div>
                      <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/70 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="h-3 w-4/5 bg-slate-200 rounded mb-1.5"></div>
                      <div className="h-2 w-2/3 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Navigation Switcher Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Sidebar Navigation Items Verification
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {allItems.map((item) => {
                  const ItemIcon = item.icon;
                  const isSelected = item.id === activeItem;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50/80 border-slate-200/80 text-slate-700 hover:bg-slate-100/80'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <ItemIcon
                          className={`w-4 h-4 ${
                            isSelected ? 'text-amber-400' : 'text-slate-400'
                          }`}
                        />
                        {item.badge !== undefined && (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                              isSelected
                                ? 'bg-slate-800 text-amber-300'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-semibold truncate">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Sidebar Auxiliary Panel (Constitutional System Info) */}
          <div className="space-y-6">
            {/* Legal Research Scope Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Platform Architecture
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                LAWVOX provides unified constitutional benchmark citation retrieval, audio-narrated judgments, and synchronized notes.
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Layout Theme</span>
                  <span className="font-semibold text-slate-900">Executive Light Mode</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Navigation Sizing</span>
                  <span className="font-semibold text-slate-900">256px Collapsible / Drawer</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">Header Status</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Sticky & Blur Synced
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps / Architectural Note */}
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Phase 1 Milestone
                </span>
              </div>
              <h4 className="text-sm font-bold font-serif mb-1">
                Foundation Layout Complete
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Header, Left Navigation, Brand Mark, Responsive Mobile Drawer, and Design Tokens are fully assembled.
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>LAWVOX Constitutional AI</span>
                <span className="font-mono text-amber-400">v1.0.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
