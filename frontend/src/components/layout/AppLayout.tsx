'use client';

import React, { useState, ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileDrawer } from './MobileDrawer';
import { GlobalAudioPlayer } from '@/components/audio/GlobalAudioPlayer';
import { CaseDetailModal } from '@/components/cases/CaseDetailModal';
import { useAudio } from '@/context/AudioContext';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const { selectedCaseForModal, closeCaseModal } = useAudio();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-row">
      {/* Desktop Sidebar (Fixed Left) */}
      <div className="hidden lg:block w-64 flex-shrink-0 fixed inset-y-0 left-0 z-30 shadow-sm">
        <Sidebar />
      </div>

      {/* Mobile Drawer (Responsive slide-out) */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Top Header */}
        <Header onMenuToggle={() => setIsMobileDrawerOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl w-full mx-auto pb-32">
          {children}
        </main>
      </div>

      {/* Persistent Global Audio Player */}
      <GlobalAudioPlayer />

      {/* Global Case Details Modal */}
      <CaseDetailModal
        legalCase={selectedCaseForModal}
        isOpen={!!selectedCaseForModal}
        onClose={closeCaseModal}
      />
    </div>
  );
};
