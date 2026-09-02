'use client';

import React, { useEffect } from 'react';
import { X, Scale, Sparkles } from 'lucide-react';
import { LawvoxLogo } from './LawvoxLogo';
import { MAIN_NAV_ITEMS, SYSTEM_NAV_ITEMS, CURRENT_USER } from '../../data/navigation';
import { NavItemId } from '../../types/navigation';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: NavItemId;
  onNavigate: (item: NavItemId) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  activeItem,
  onNavigate,
}) => {
  // Prevent body scrolling when mobile navigation is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleItemClick = (id: NavItemId) => {
    onNavigate(id);
    onClose();
  };

  const getBadgeStyle = (color?: string) => {
    switch (color) {
      case 'amber':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'emerald':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'blue':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'slate':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white h-full shadow-2xl z-10 animate-in slide-in-from-left duration-250">
        {/* Header with Brand and Close button */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <LawvoxLogo />
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Main Legal Workspace Navigation */}
          <div>
            <div className="px-2 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Legal Workspace
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60">
                <Scale className="w-3 h-3 text-amber-600" />
                Corpus v2.4
              </span>
            </div>

            <nav className="space-y-1">
              {MAIN_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? 'text-amber-400' : 'text-slate-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
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
          </div>

          {/* Account & System Navigation */}
          <div>
            <div className="px-2 mb-2">
              <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                Account & System
              </span>
            </div>

            <div className="space-y-1">
              {SYSTEM_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeItem === item.id;
                const isLogout = item.id === 'logout';

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : isLogout
                        ? 'text-rose-600 hover:bg-rose-50'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive
                            ? 'text-amber-400'
                            : isLogout
                            ? 'text-rose-500'
                            : 'text-slate-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audio Engine Information */}
          <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 via-slate-50 to-blue-50 border border-amber-200/50">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                Constitutional Audio Engine
                <Sparkles className="w-3 h-3 text-amber-600" />
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Synced with Constitutional precedents & oral argument digests.
            </p>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs">
              {CURRENT_USER.initials}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-semibold text-slate-900 truncate">
                {CURRENT_USER.name}
              </h4>
              <p className="text-[11px] text-slate-500 truncate">
                {CURRENT_USER.barAffiliation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
