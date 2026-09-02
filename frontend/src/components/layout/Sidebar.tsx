'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import {
  LayoutDashboard,
  Search,
  Library,
  Bookmark,
  History,
  FileText,
  User,
  Settings,
  LogOut,
  Scale,
  Headphones,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  onItemClick?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Search Cases', href: '/search', icon: Search },
    { name: 'Library', href: '/library', icon: Library },
    { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
    { name: 'Listening History', href: '/history', icon: History },
    { name: 'My Notes', href: '/notes', icon: FileText },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    showToast('You have been logged out (Mock Session ended)', 'info');
    if (onItemClick) onItemClick();
    router.push('/dashboard');
  };

  return (
    <>
      <aside className="w-64 h-full flex flex-col bg-slate-900 text-slate-200 border-r border-slate-800 select-none">
        {/* Branding / Logo */}
        <div className="p-6 border-b border-slate-800/80">
          <Link
            href="/dashboard"
            onClick={onItemClick}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 text-white flex items-center justify-center font-black shadow-purple-glow group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-wider text-lg text-white font-serif">LAWVOX</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/20">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-tight">
                Legal Audio & Research
              </p>
            </div>
          </Link>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-1 px-3 py-5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Navigation
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-400'
                  }`}
                />
                <span>{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Banner & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          {/* Quick Legal Audio Badge */}
          <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Audio Engine Active</p>
              <p className="text-[10px] text-slate-400">Lossless TTS Stream</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Logout Session</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirm Logout"
        subtitle="End your current LAWVOX session"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Are you sure you want to end your current research session? Your listening progress and bookmarked cases will remain safely stored.
          </p>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLogoutModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
              leftIcon={<LogOut className="w-4 h-4" />}
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
